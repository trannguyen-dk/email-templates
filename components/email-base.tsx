import { Column, Row } from "@react-email/components";

/**
 * Foundation shared by the header / body / footer sections and by templates:
 * hosts, measurements, the `Block` spacing primitive, and the text styles.
 *
 * Kept separate from `layout.tsx` so the sections can import these without
 * importing the shell that composes them.
 */

export const CDN = "https://notification-email-s3.s3.ap-southeast-1.amazonaws.com";
export const LOGO_URL = `${CDN}/logo-dkbank.png`; // 526×135

export const SUPPORT_EMAIL = "business.care@dk.bt";

/** Measurements shared by every frame. See CONVENTIONS.md § Spacing. */
export const M = {
  headerLogo: { width: 93, height: 24 },
  /** Logo -> status icon. Measured ~30px in Figma; snapped to gap-8. */
  iconGap: 32,
  /**
   * Body content -> footer (mt-11 = 44px). Applied as padding-top on the <td>:
   * Outlook ignores margins here, so padding is the email-safe equivalent.
   */
  contentGap: 44,
  /** Rule -> legal block. gap-6 = 24px. */
  footerGap: 24,
  /** Legal block -> Help / Privacy Policy row. gap-2 = 8px. */
  footerLinksGap: 8,
  metaLineHeight: "16px",
  linkGap: 10,
} as const;

/** Vertical spacing lives on a <td>; Outlook ignores padding on <table>. */
export function Block({
  paddingTop = 0,
  paddingBottom = 0,
  align,
  children,
}: {
  paddingTop?: number;
  paddingBottom?: number;
  align?: "center";
  children: React.ReactNode;
}) {
  return (
    <Row>
      <Column style={{ paddingTop, paddingBottom, textAlign: align }}>{children}</Column>
    </Row>
  );
}

/* ── styles (values lifted from Figma) ─────────────────────────── */

export const fontStack =
  "Inter, ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'";

/**
 * The project's `font-mono` face, with a system fallback for the clients
 * that will not have JetBrains Mono installed.
 */
export const monoStack =
  '"JetBrains Mono", ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace';

/** Inline emphasis inside body copy — Figma "Inter Semi Bold". */
export const emphasis: React.CSSProperties = { fontWeight: 600 };

/** Inter text base shared by every text style (Figma "body 2" / "subtext"). */
export const textBase: React.CSSProperties = {
  fontFamily: fontStack,
  fontStyle: "normal",
  fontVariantNumeric: "lining-nums proportional-nums",
  fontFeatureSettings: "'cv01' on, 'cv03' on, 'cv04' on, 'cv05' on, 'cv09' on, 'cv11' on",
};

/** body 2 – 14px/regular, content/primary */
export const paragraph: React.CSSProperties = {
  ...textBase,
  margin: 0,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: "22px",
  letterSpacing: "-0.084px",
  color: "#262a2e",
};

/** h6 - 18px/semibold */
export const heading: React.CSSProperties = {
  ...textBase,
  margin: 0,
  fontSize: 18,
  fontWeight: 600,
  lineHeight: "24px",
  letterSpacing: "-0.252px",
  color: "#262a2e",
};

/** Same scale as `paragraph`; kept for the slightly tighter sign-off tracking. */
export const paragraphDark: React.CSSProperties = {
  ...paragraph,
  letterSpacing: "-0.09px",
  color: "#262a2e",
};

export const inlineLink: React.CSSProperties = {
  color: "#262a2e",
  textDecoration: "underline",
};
