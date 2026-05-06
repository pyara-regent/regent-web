import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { adminTurnstilePlugin } from "@/lib/auth-turnstile-plugin";
import { db, schema } from "@/lib/db";
import { sendEmail } from "@/lib/email/send";
import { getSiteUrl, siteConfig } from "@/lib/site-config";

const allowAdminSeed = process.env.BETTER_AUTH_ALLOW_ADMIN_SEED === "true";
const fallbackBuildSecret = "development-build-only-secret-change-in-production";

function getAuthSecret() {
  if (process.env.BETTER_AUTH_SECRET) {
    return process.env.BETTER_AUTH_SECRET;
  }

  if (process.env.NODE_ENV === "production" && process.env.DATABASE_URL) {
    throw new Error("BETTER_AUTH_SECRET is required when admin auth is enabled.");
  }

  return fallbackBuildSecret;
}

export const auth = betterAuth({
  appName: siteConfig.name,
  baseURL: process.env.BETTER_AUTH_URL || getSiteUrl(),
  secret: getAuthSecret(),
  database: db
    ? drizzleAdapter(db, {
        provider: "pg",
        schema,
      })
    : undefined,
  emailAndPassword: {
    enabled: true,
    disableSignUp: !allowAdminSeed,
    minPasswordLength: 12,
    maxPasswordLength: 256,
    resetPasswordTokenExpiresIn: 60 * 30,
    revokeSessionsOnPasswordReset: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your Regent Technologies admin password",
        text: `Use this link to reset your admin password. The link expires soon.\n\n${url}`,
      });
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  telemetry: {
    enabled: false,
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL, process.env.NEXT_PUBLIC_SITE_URL]
    .filter(Boolean)
    .map(String),
  plugins: [adminTurnstilePlugin(), nextCookies()],
});

export type AuthSession = typeof auth.$Infer.Session;
