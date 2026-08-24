import { Hr, Img, Link, Text } from "@react-email/components";

import { Block, M, SUPPORT_EMAIL, textBase } from "./email-base.js";

/**
 * Email footer — rule / automated-message note / rule, the legal block, an
 * optional app-promo block, then Help · Privacy Policy.
 *
 * Carries no logo and no social icons; both were removed to match the Figma
 * footer frame (2446:3244). See CONVENTIONS.md § Structure.
 */

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

export interface EmailFooterProps {
  /** Appends the "get the DK Bank app" block above the footer links. */
  appPromo?: boolean;
  supportEmail?: string;
  helpUrl?: string;
  privacyUrl?: string;
  /**
   * Copyright year in the legal block. Defaults to the current year, so the
   * committed `out/*.html` changes on 1 January — re-run `pnpm export` then.
   */
  year?: number;
}

export function EmailFooter({
  appPromo = false,
  supportEmail = SUPPORT_EMAIL,
  helpUrl = `mailto:${SUPPORT_EMAIL}`,
  privacyUrl = "https://www.dk.bt/privacy-policy",
  year = new Date().getFullYear(),
}: EmailFooterProps) {
  return (
    <>
      <Block paddingTop={M.contentGap}>
        <Hr style={divider} />
        <Text style={footerNote}>
          This is an automated message. Please do not reply to this email. For any questions or
          support, please contact us at{" "}
          <Link href={`mailto:${supportEmail}`} style={footerNoteLink}>
            {supportEmail}
          </Link>
        </Text>
        <Hr style={divider} />
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
          <Text style={promoText}>For your personal banking needs, get the DK Bank app.</Text>
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

      <Block paddingTop={M.footerLinksGap}>
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
    </>
  );
}

/* ── styles (values lifted from Figma) ─────────────────────────── */

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
  color: "#262a2e",
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
