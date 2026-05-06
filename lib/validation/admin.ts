import { z } from "zod";
import { metaFrom, slugify } from "@/lib/utils";

const imageUrlSchema = z
  .string()
  .trim()
  .min(1, "Image is required.")
  .refine(
    (value) => {
      if (value.startsWith("/")) {
        return true;
      }

      const publicUploadBase = process.env.R2_PUBLIC_BASE_URL?.replace(/\/$/, "");

      try {
        const url = new URL(value);

        return Boolean(
          url.protocol === "https:" &&
            publicUploadBase &&
            value.startsWith(`${publicUploadBase}/`),
        );
      } catch {
        return false;
      }
    },
    "Use a local site asset path or an uploaded image URL from the configured R2 public base.",
  );

export const productInputSchema = z
  .object({
    id: z.string().optional(),
    name: z.string().trim().min(2, "Name is required.").max(120),
    slug: z.string().trim().max(120).optional(),
    description: z.string().trim().min(20, "Description is required.").max(1200),
    metaTitle: z.string().trim().max(70).optional(),
    metaDescription: z.string().trim().max(165).optional(),
    images: z.array(imageUrlSchema).max(3, "Use up to 3 images.").default([]),
    isPublished: z.boolean().default(true),
    sortOrder: z.coerce.number().int().min(0).max(9999).default(100),
  })
  .transform((value) => ({
    ...value,
    slug: slugify(value.slug || value.name),
    metaTitle: value.metaTitle?.trim() || metaFrom(value.name, 60),
    metaDescription: value.metaDescription?.trim() || metaFrom(value.description, 155),
  }))
  .refine((value) => value.slug.length > 0, {
    path: ["slug"],
    message: "Slug is required.",
  });

export const faqInputSchema = z.object({
  id: z.string().optional(),
  question: z.string().trim().min(8, "Question is required.").max(180),
  answer: z.string().trim().min(12, "Answer is required.").max(1200),
  isPublished: z.boolean().default(true),
  sortOrder: z.coerce.number().int().min(0).max(9999).default(100),
});

const serviceDetailsSchema = z
  .array(z.string().trim().min(8).max(220))
  .min(1, "Add at least one service detail.")
  .max(8, "Use up to 8 service details.");

export const serviceInputSchema = z
  .object({
    id: z.string().optional(),
    title: z.string().trim().min(3, "Title is required.").max(120),
    slug: z.string().trim().max(120).optional(),
    description: z.string().trim().min(20, "Description is required.").max(700),
    image: imageUrlSchema,
    cta: z.string().trim().min(3, "CTA is required.").max(80),
    modalIntro: z.string().trim().min(20, "Modal intro is required.").max(700),
    details: serviceDetailsSchema,
    bestFor: z.string().trim().min(20, "Best-for text is required.").max(500),
    isPublished: z.boolean().default(true),
    sortOrder: z.coerce.number().int().min(0).max(9999).default(100),
  })
  .transform((value) => ({
    ...value,
    slug: slugify(value.slug || value.title),
  }))
  .refine((value) => value.slug.length > 0, {
    path: ["slug"],
    message: "Slug is required.",
  });

export const profileInputSchema = z.object({
  name: z.string().trim().min(2, "Name is required.").max(80),
  image: z.string().trim().url("Use a valid image URL.").optional().or(z.literal("")),
});

export const contactInputSchema = z.object({
  name: z.string().trim().min(2, "Name is required.").max(80),
  email: z.string().trim().email("Use a valid email address.").max(160),
  phone: z.string().trim().max(40).optional(),
  message: z.string().trim().min(12, "Message is required.").max(1500),
  subject: z.string().trim().max(160).optional(),
  productName: z.string().trim().max(120).optional(),
  productSlug: z.string().trim().max(120).optional(),
  productUrl: z.string().trim().max(300).optional(),
  turnstileToken: z.string().optional(),
});

export type ProductInput = z.infer<typeof productInputSchema>;
export type ServiceInput = z.infer<typeof serviceInputSchema>;
export type FaqInput = z.infer<typeof faqInputSchema>;
