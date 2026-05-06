CREATE TABLE "services" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"description" text NOT NULL,
	"image" text NOT NULL,
	"cta" text NOT NULL,
	"modal_intro" text NOT NULL,
	"details" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"best_for" text NOT NULL,
	"is_published" boolean DEFAULT true NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "services_published_sort_idx" ON "services" USING btree ("is_published","sort_order");--> statement-breakpoint
CREATE INDEX "services_slug_idx" ON "services" USING btree ("slug");