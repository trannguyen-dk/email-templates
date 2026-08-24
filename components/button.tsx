import { Button as EmailButton } from "@react-email/components";

import { Block, textBase } from "./layout.js";

/**
 * Figma "button-icon-right": 36px brand pill with a trailing arrow,
 * centred inside an "action" row with 8px vertical padding (+12px group gap).
 *
 * The trailing arrow is the text glyph U+2192, not an image. An image needs an
 * absolute URL to load in a mail client, and the arrow is the one asset not on
 * the S3 bucket — a relative `src` only ever resolved in a local browser
 * preview. Host `static/arrow-right.png` and swap this span back for an <Img>
 * if the vector is required.
 */
export function Button({
  href,
  children,
}: {
  href: string;
    children: React.ReactNode;
}) {
  return (
    <Block paddingTop={20} paddingBottom={20}>
      <table role="presentation" cellPadding={0} cellSpacing={0} border={0} align="center">
        <tbody>
          <tr>
            <td>
              <EmailButton href={href} style={button}>
                <span style={buttonLabel}>{children}</span>
                <span style={buttonArrow}>{"\u2192"}</span>
              </EmailButton>
            </td>
          </tr>
        </tbody>
      </table>
    </Block>
  );
}

/* ── styles (values lifted from Figma) ─────────────────────────── */

const button: React.CSSProperties = {
  ...textBase,
  display: "inline-block",
  padding: "7px 10px 7px 12px",
  borderRadius: 999,
  backgroundColor: "#113264",
  color: "#ffffff",
  fontSize: 14,
  fontWeight: 500,
  lineHeight: "22px",
  letterSpacing: "-0.084px",
  textDecoration: "none",
  whiteSpace: "nowrap",
};

const buttonLabel: React.CSSProperties = {
  display: "inline-block",
  verticalAlign: "middle",
  lineHeight: "22px",
};

const buttonArrow: React.CSSProperties = {
  display: "inline-block",
  verticalAlign: "middle",
  marginLeft: 6,
  fontSize: 16,
  lineHeight: "22px",
};
