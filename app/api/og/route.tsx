/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

const size = {
  width: 1200,
  height: 630,
};

const navItems = ["Services", "Products", "Industries", "Contact"];

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const title = truncate(searchParams.get("title") ?? siteConfig.name, 82);
  const description = truncate(
    searchParams.get("description") ?? siteConfig.description,
    170,
  );
  const path = normalizePath(searchParams.get("path"));
  const fit = searchParams.get("fit") === "contain" ? "contain" : "cover";
  const image = resolveImageUrl(
    searchParams.get("image") ?? "/regent/hero.png",
    origin,
  );
  const logo = resolveImageUrl("/regent/brand/regent-logo-transparent.png", origin);
  const isLegal = path.includes("privacy") || path.includes("terms");

  return new ImageResponse(
    (
      <div style={styles.canvas}>
        <div style={styles.viewport}>
          <div style={styles.browserChrome}>
            <div style={styles.windowDots}>
              <span style={{ ...styles.dot, background: "#dc2626" }} />
              <span style={{ ...styles.dot, background: "#f59e0b" }} />
              <span style={{ ...styles.dot, background: "#16a34a" }} />
            </div>
            <div style={styles.addressBar}>{siteConfig.url.replace(/\/$/, "")}{path}</div>
          </div>

          <div style={styles.header}>
            <div style={styles.brand}>
              <div style={styles.logoWrap}>
                <img src={logo} alt="" style={styles.logo} />
              </div>
              <div style={styles.brandText}>
                <span style={styles.brandName}>Regent Technologies</span>
                <span style={styles.brandSubline}>Industrial Tool Sharpening</span>
              </div>
            </div>
            <div style={styles.nav}>
              {navItems.map((item) => (
                <span key={item} style={styles.navItem}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div style={styles.page}>
            <div style={styles.copy}>
              <div style={styles.eyebrowRow}>
                <span style={styles.eyebrow}>
                  {isLegal ? "Regent Information" : "Regent Technologies"}
                </span>
                <span style={styles.location}>Sri Lanka</span>
              </div>
              <h1 style={styles.title}>{title}</h1>
              <p style={styles.description}>{description}</p>
              <div style={styles.actions}>
                <span style={styles.primaryAction}>View Page</span>
                <span style={styles.secondaryAction}>Production Tool Support</span>
              </div>
            </div>

            <div style={styles.visualPanel}>
              <div style={styles.visualBackdrop} />
              <div style={styles.imageFrame}>
                <img
                  src={image}
                  alt=""
                  style={{
                    ...styles.heroImage,
                    objectFit: fit,
                    padding: fit === "contain" ? 28 : 0,
                    background: fit === "contain" ? "#ffffff" : "#0b1d49",
                  }}
                />
              </div>
              <div style={styles.metricCard}>
                <span style={styles.metricLabel}>Service Area</span>
                <strong style={styles.metricValue}>Moratuwa, Sri Lanka</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}

function resolveImageUrl(path: string, origin: string) {
  try {
    return new URL(path, origin).toString();
  } catch {
    return new URL("/regent/hero.png", origin).toString();
  }
}

function normalizePath(path: string | null) {
  if (!path || !path.startsWith("/")) {
    return "/";
  }

  return path;
}

function truncate(value: string, maxLength: number) {
  const normalized = value.replace(/\s+/g, " ").trim();

  if (normalized.length <= maxLength) {
    return normalized;
  }

  return `${normalized.slice(0, maxLength - 1).trim()}...`;
}

const styles = {
  canvas: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #dfe7f2 0%, #f7f9fc 46%, #d7e1ee 100%)",
    color: "#111827",
    fontFamily: "Inter, Arial, sans-serif",
    padding: 36,
  },
  viewport: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    borderRadius: 28,
    background: "#ffffff",
    border: "1px solid rgba(10, 30, 75, 0.12)",
    boxShadow: "0 30px 90px rgba(10, 30, 75, 0.20)",
  },
  browserChrome: {
    height: 42,
    display: "flex",
    alignItems: "center",
    gap: 18,
    padding: "0 24px",
    background: "#edf2f7",
    borderBottom: "1px solid rgba(10, 30, 75, 0.10)",
  },
  windowDots: {
    display: "flex",
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  addressBar: {
    height: 24,
    minWidth: 0,
    flex: 1,
    display: "flex",
    alignItems: "center",
    borderRadius: 999,
    background: "#ffffff",
    color: "#526170",
    fontSize: 12,
    padding: "0 18px",
  },
  header: {
    height: 82,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 38px",
    background: "#ffffff",
    borderBottom: "1px solid rgba(10, 30, 75, 0.08)",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  logoWrap: {
    width: 58,
    height: 58,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    background: "#ffffff",
    border: "1px solid rgba(10, 30, 75, 0.12)",
  },
  logo: {
    width: 48,
    height: 48,
    objectFit: "contain",
  },
  brandText: {
    display: "flex",
    flexDirection: "column",
  },
  brandName: {
    color: "#0b2d69",
    fontSize: 24,
    fontWeight: 800,
    lineHeight: 1.05,
  },
  brandSubline: {
    marginTop: 4,
    color: "#ba1520",
    fontSize: 13,
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 20,
  },
  navItem: {
    color: "#243447",
    fontSize: 14,
    fontWeight: 700,
    textTransform: "uppercase",
  },
  page: {
    flex: 1,
    display: "flex",
    minHeight: 0,
    background: "#f8fafc",
  },
  copy: {
    width: "53%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "34px 36px 42px 48px",
    background: "#ffffff",
  },
  eyebrowRow: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 22,
  },
  eyebrow: {
    display: "flex",
    alignItems: "center",
    borderRadius: 999,
    background: "#e9f0fb",
    color: "#0b2d69",
    fontSize: 14,
    fontWeight: 800,
    padding: "8px 14px",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  location: {
    display: "flex",
    alignItems: "center",
    borderRadius: 999,
    background: "#fff0f1",
    color: "#b5121b",
    fontSize: 14,
    fontWeight: 800,
    padding: "8px 14px",
  },
  title: {
    color: "#101827",
    fontSize: 48,
    fontWeight: 850,
    lineHeight: 1.04,
    letterSpacing: 0,
    margin: 0,
  },
  description: {
    color: "#4b5563",
    fontSize: 22,
    lineHeight: 1.38,
    marginTop: 22,
    marginBottom: 0,
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginTop: 32,
  },
  primaryAction: {
    display: "flex",
    alignItems: "center",
    borderRadius: 999,
    background: "#b5121b",
    color: "#ffffff",
    fontSize: 17,
    fontWeight: 800,
    padding: "14px 20px",
  },
  secondaryAction: {
    display: "flex",
    alignItems: "center",
    borderRadius: 999,
    border: "1px solid rgba(10, 30, 75, 0.14)",
    color: "#0b2d69",
    fontSize: 17,
    fontWeight: 800,
    padding: "13px 18px",
    background: "#ffffff",
  },
  visualPanel: {
    position: "relative",
    width: "47%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    background: "#0b1d49",
  },
  visualBackdrop: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(181,18,27,0.52), rgba(11,45,105,0.18) 38%, rgba(8,21,50,0.88))",
  },
  imageFrame: {
    position: "relative",
    width: 420,
    height: 326,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    borderRadius: 24,
    border: "1px solid rgba(255,255,255,0.32)",
    background: "#ffffff",
    boxShadow: "0 26px 70px rgba(0,0,0,0.28)",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  metricCard: {
    position: "absolute",
    left: 30,
    bottom: 28,
    display: "flex",
    flexDirection: "column",
    borderRadius: 18,
    background: "rgba(255,255,255,0.94)",
    padding: "16px 18px",
    boxShadow: "0 18px 44px rgba(0,0,0,0.20)",
  },
  metricLabel: {
    color: "#b5121b",
    fontSize: 12,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
  },
  metricValue: {
    color: "#0b2d69",
    fontSize: 19,
    marginTop: 4,
  },
} satisfies Record<string, CSSProperties>;
