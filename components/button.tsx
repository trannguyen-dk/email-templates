import { Button as EmailButton, Img } from "@react-email/components";

import { Block, CDN, textBase } from "./layout.js";

const ARROW_URL = `${CDN}/icon-arrow-right.png`; // 64×64, white on transparent

/**
 * Figma "button-icon-right": 36px brand pill with a trailing arrow,
 * centred inside an "action" row with 8px vertical padding (+12px group gap).
 *
 * The trailing arrow is the hosted PNG drawn at 16px, per the Figma vector.
 * Clients that block remote images fall back to the alt glyph U+2192.
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
                <Img src={ARROW_URL} alt={"\u2192"} width={16} height={16} style={buttonArrow} />
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
  marginLeft: 4,
  border: 0,
};
