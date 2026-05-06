process.env.BETTER_AUTH_ALLOW_ADMIN_SEED = "true";

async function main() {
  const { and, eq } = await import("drizzle-orm");
  const { loadEnvConfig } = await import("@next/env");
  loadEnvConfig(process.cwd());

  const { auth } = await import("../lib/auth");
  const { hashPassword } = await import("better-auth/crypto");
  const { getDb } = await import("../lib/db");
  const { account, faqs, products, services, user } = await import("../lib/db/schema");
  const { initialFaqs, initialProducts, initialServices } = await import("../lib/products/seed-data");

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_INITIAL_PASSWORD are required for seeding.");
  }

  const db = getDb();
  const [existingAdmin] = await db.select().from(user).where(eq(user.email, adminEmail)).limit(1);

  if (!existingAdmin) {
    await auth.api.signUpEmail({
      body: {
        name: "Regent Admin",
        email: adminEmail,
        password: adminPassword,
      },
    });
    await db.update(user).set({ emailVerified: true }).where(eq(user.email, adminEmail));
  } else {
    const passwordHash = await hashPassword(adminPassword);
    const [existingCredentialAccount] = await db
      .select()
      .from(account)
      .where(and(eq(account.userId, existingAdmin.id), eq(account.providerId, "credential")))
      .limit(1);

    if (existingCredentialAccount) {
      await db
        .update(account)
        .set({
          accountId: existingAdmin.id,
          providerId: "credential",
          userId: existingAdmin.id,
          password: passwordHash,
          updatedAt: new Date(),
        })
        .where(eq(account.id, existingCredentialAccount.id));
    } else {
      await db.insert(account).values({
        accountId: existingAdmin.id,
        providerId: "credential",
        userId: existingAdmin.id,
        password: passwordHash,
      });
    }

    await db.update(user).set({ emailVerified: true }).where(eq(user.email, adminEmail));
  }

  for (const item of initialProducts) {
    await db
      .insert(products)
      .values({
        ...item,
        images: [...item.images],
      })
      .onConflictDoUpdate({
        target: products.slug,
        set: {
          name: item.name,
          description: item.description,
          metaTitle: item.metaTitle,
          metaDescription: item.metaDescription,
          images: [...item.images],
          isPublished: true,
          sortOrder: item.sortOrder,
          updatedAt: new Date(),
        },
      });
  }

  for (const item of initialServices) {
    await db
      .insert(services)
      .values({
        ...item,
        details: [...item.details],
      })
      .onConflictDoUpdate({
        target: services.slug,
        set: {
          title: item.title,
          description: item.description,
          image: item.image,
          cta: item.cta,
          modalIntro: item.modalIntro,
          details: [...item.details],
          bestFor: item.bestFor,
          isPublished: true,
          sortOrder: item.sortOrder,
          updatedAt: new Date(),
        },
      });
  }

  for (const item of initialFaqs) {
    const [existingFaq] = await db
      .select()
      .from(faqs)
      .where(eq(faqs.question, item.question))
      .limit(1);

    if (existingFaq) {
      await db
        .update(faqs)
        .set({
          answer: item.answer,
          isPublished: item.isPublished,
          sortOrder: item.sortOrder,
          updatedAt: new Date(),
        })
        .where(eq(faqs.id, existingFaq.id));
    } else {
      await db.insert(faqs).values(item);
    }
  }

  console.log("Seed completed.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
