import {
  Body,
  Column,
  Container,
  Font,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Row,
  Text,
} from "@react-email/components";

/**
 * Shared shell for DK Bank notification emails.
 * Figma: DK.Notif › "Email content" frames (e.g. 1347:7105, 1370:6946).
 */

export const CDN = "https://notification-email-s3.s3.ap-southeast-1.amazonaws.com";
export const ICONS_CDN = CDN;
export const LOGO_URL = `${CDN}/logo-dkbank.png`; // 526×135

export const SUPPORT_EMAIL = "business.care@dk.bt";

/** Store badges are only published on this bucket. 203×60 rendered at 80×24. */
const BADGE_CDN = "https://prod-terlogo.s3.ap-southeast-1.amazonaws.com";

const APP_BADGES = [
  {
    name: "Download on the App Store",
    src: `${BADGE_CDN}/app-store.png`,
    href: "https://apps.apple.com/us/app/dk-bank/id6462849899",
  },
  {
    name: "Get it on Google Play",
    src: `${BADGE_CDN}/google-play.png`,
    href: "https://play.google.com/store/apps/details?id=bt.digitalkidu.DigitalKidu",
  },
] as const;

const SOCIALS = [
  { name: "X", src: `${CDN}/icon-social-x.png`, href: "https://x.com/dkbank_" },
  {
    name: "Facebook",
    src: `${CDN}/icon-social-facebook.png`,
    href: "https://www.facebook.com/profile.php?id=61576188276124",
  },
  {
    name: "LinkedIn",
    src: `${CDN}/icon-social-linkedin.png`,
    href: "https://bt.linkedin.com/company/dkbank",
  },
  {
    name: "TikTok",
    src: `${CDN}/icon-social-tiktok.png`,
    href: "https://www.tiktok.com/@digitalkidubank",
  },
  {
    name: "Instagram",
    src: `${CDN}/icon-social-instagram.png`,
    href: "https://www.instagram.com/dkbank_official",
  },
] as const;

/** Measurements shared by every frame. */
const M = {
  headerLogo: { width: 78, height: 20 },
  footerLogo: { width: 86, height: 22 },
  iconGap: 20,
  footerGap: 24,
  metaLineHeight: "16px",
  linkGap: 10,
} as const;

export interface EmailLayoutProps {
  /**
   * Hosted status icon shown under the logo, e.g. `${ICONS_CDN}/icon-success.png`.
   * Omit it for the frames that go straight from the logo to the copy.
   */
  statusIconUrl?: string;
  /** Rendered icon size; smaller icons are padded so the slot always measures 100px. */
  statusIconSize?: number;
  /** Appends the "get the DK Bank app" block above the footer links. */
  appPromo?: boolean;
  supportEmail?: string;
  helpUrl?: string;
  privacyUrl?: string;
  year?: number;
  children: React.ReactNode;
}

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

export function EmailLayout({
  statusIconUrl,
  statusIconSize = 100,
  appPromo = false,
  supportEmail = SUPPORT_EMAIL,
  helpUrl = `mailto:${SUPPORT_EMAIL}`,
  privacyUrl = "https://www.dk.bt/privacy-policy",
  year = 2026,
  children,
}: EmailLayoutProps) {
  const iconInset = (100 - statusIconSize) / 2;
  return (
    <Html lang="en">
      <Head>
        {/* Inter variable font (400–600); clients without @font-face support use the system stack. */}
        <Font
          fontFamily="Inter"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2",
            format: "woff2",
          }}
          fontWeight="400 600"
          fontStyle="normal"
        />
      </Head>
      <Body style={body}>
        <Container style={container}>
          <Row>
            <Column style={containerInner}>
              {/* ── BODY ─────────────────────────────────────────── */}
              <Block align="center">
                <Img src={LOGO_URL} alt="DK Bank" {...M.headerLogo} style={logo} />
              </Block>

              {statusIconUrl ? (
                <Block paddingTop={M.iconGap + iconInset} paddingBottom={iconInset} align="center">
                  <Img
                    src={statusIconUrl}
                    alt=""
                    width={statusIconSize}
                    height={statusIconSize}
                    style={{ display: "block", margin: "0 auto" }}
                  />
                </Block>
              ) : null}

              {children}

              {/* ── FOOTER ───────────────────────────────────────── */}
              <Block paddingTop={48}>
                <Hr style={divider} />
                <Text style={footerNote}>
                  This is an automated message. Please do not reply to this email. For any questions
                  or support, please contact us at{" "}
                  <Link href={`mailto:${supportEmail}`} style={footerNoteLink}>
                    {supportEmail}
                  </Link>
                </Text>
                <Hr style={divider} />
              </Block>

              <Block paddingTop={M.footerGap} align="center">
                <Img src={LOGO_URL} alt="DK Bank" {...M.footerLogo} style={logo} />
              </Block>

              <Block paddingTop={M.footerGap}>
                <table
                  role="presentation"
                  cellPadding={0}
                  cellSpacing={0}
                  border={0}
                  align="center"
                  style={{ margin: "0 auto" }}
                >
                  <tbody>
                    <tr>
                      {SOCIALS.map((s, i) => (
                        <td
                          key={s.name}
                          style={{
                            padding: `8px 0 8px ${i === 0 ? 0 : 8}px`,
                            width: 28,
                            height: 28,
                            textAlign: "center",
                            verticalAlign: "middle",
                          }}
                        >
                          <Link href={s.href} style={{ display: "inline-block", lineHeight: 0 }}>
                            <Img
                              src={s.src}
                              alt={s.name}
                              width={28}
                              height={28}
                              style={{ display: "block", border: 0 }}
                            />
                          </Link>
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </Block>

              <Block paddingTop={M.footerGap}>
                <Text style={{ ...footerMeta, lineHeight: M.metaLineHeight }}>
                  © {year} DK Bank
                  <br />
                  Registration no.: L20211025BHU0635
                  <br />
                  No. 43, Norzin Lam, Thimphu, Bhutan 11001
                </Text>
              </Block>

              {appPromo ? (
                <Block paddingTop={M.footerGap}>
                  <Hr style={promoDivider} />
                  <Text style={promoText}>
                    For your personal banking needs, get the DK Bank app.
                  </Text>
                  <table
                    role="presentation"
                    cellPadding={0}
                    cellSpacing={0}
                    border={0}
                    align="center"
                    style={{ margin: "0 auto" }}
                  >
                    <tbody>
                      <tr>
                        {APP_BADGES.map((b, i) => (
                          <td key={b.name} style={{ paddingLeft: i === 0 ? 0 : 8 }}>
                            <Link href={b.href}>
                              <Img
                                src={b.src}
                                alt={b.name}
                                width={80}
                                height={24}
                                style={{ display: "block", border: 0 }}
                              />
                            </Link>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </Block>
              ) : null}

              <Block paddingTop={M.footerGap}>
                <table
                  role="presentation"
                  cellPadding={0}
                  cellSpacing={0}
                  border={0}
                  align="center"
                  style={{ margin: "0 auto" }}
                >
                  <tbody>
                    <tr>
                      <td style={{ paddingRight: M.linkGap }}>
                        <Link href={helpUrl} style={footerLink}>
                          Help
                        </Link>
                      </td>
                      <td style={{ paddingLeft: M.linkGap }}>
                        <Link href={privacyUrl} style={footerLink}>
                          Privacy Policy
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Block>
            </Column>
          </Row>
        </Container>
      </Body>
    </Html>
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

const body: React.CSSProperties = {
  margin: 0,
  padding: 0,
  backgroundColor: "#ffffff",
  fontFamily: fontStack,
  WebkitTextSizeAdjust: "100%",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
};

const container: React.CSSProperties = {
  width: "100%",
  maxWidth: 600,
  margin: "0 auto",
  backgroundColor: "#fcfcfc",
};

const containerInner: React.CSSProperties = {
  padding: "32px 16px",
};

const logo: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  border: 0,
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
  color: "#1d2a3d",
};

/** Same scale, the darker `#1d2a3d` used for sign-off copy in Figma. */
export const paragraphDark: React.CSSProperties = {
  ...paragraph,
  letterSpacing: "-0.09px",
  color: "#1d2a3d",
};

export const inlineLink: React.CSSProperties = {
  color: "#1d2a3d",
  textDecoration: "underline",
};

const divider: React.CSSProperties = {
  margin: 0,
  border: 0,
  borderTop: "1px solid #56606c",
  width: "100%",
};

const footerNote: React.CSSProperties = {
  ...textBase,
  margin: "24px 0",
  fontSize: 12,
  lineHeight: "16px",
  color: "#60646c",
  textAlign: "center",
};

const footerNoteLink: React.CSSProperties = {
  color: "#60646c",
  fontWeight: 500,
  textDecoration: "none",
};

const footerMeta: React.CSSProperties = {
  ...textBase,
  margin: 0,
  fontSize: 12,
  lineHeight: "16px",
  color: "#60646c",
  textAlign: "center",
};

/** Figma divider: #000932 at 12.16% over the #fcfcfc panel. */
const promoDivider: React.CSSProperties = {
  margin: 0,
  border: 0,
  borderTop: "1px solid #dddee3",
  width: "100%",
};

const promoText: React.CSSProperties = {
  ...textBase,
  margin: "24px auto 8px",
  maxWidth: 228,
  fontSize: 12,
  lineHeight: "16px",
  color: "#60646c",
  textAlign: "center",
};

const footerLink: React.CSSProperties = {
  ...textBase,
  fontSize: 12,
  lineHeight: "16px",
  color: "#56606c",
  textDecoration: "none",
};
