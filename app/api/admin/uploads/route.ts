import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin/session";

export const runtime = "nodejs";

const allowedImageTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

export async function POST(request: Request) {
  await requireAdminSession();

  const required = [
    "R2_ACCOUNT_ID",
    "R2_ACCESS_KEY_ID",
    "R2_SECRET_ACCESS_KEY",
    "R2_BUCKET",
    "R2_PUBLIC_BASE_URL",
  ] as const;
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length) {
    return NextResponse.json(
      { error: `Missing storage env: ${missing.join(", ")}` },
      { status: 503 },
    );
  }

  const body = (await request.json()) as { filename?: string; contentType?: string };
  const contentType = body.contentType || "application/octet-stream";
  const safeExtension = allowedImageTypes.get(contentType);

  if (!safeExtension) {
    return NextResponse.json(
      { error: "Only JPG, PNG, WebP, or GIF images are allowed." },
      { status: 400 },
    );
  }

  const key = `products/${crypto.randomUUID()}.${safeExtension}`;
  const client = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
  const uploadUrl = await getSignedUrl(
    client,
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
      ContentType: contentType,
    }),
    { expiresIn: 60 },
  );
  const publicUrl = `${process.env.R2_PUBLIC_BASE_URL!.replace(/\/$/, "")}/${key}`;

  return NextResponse.json({ uploadUrl, publicUrl });
}
