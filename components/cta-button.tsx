import { Button, Img } from "@react-email/components";

import { Block, textBase } from "./layout.js";

/**
 * Figma "button-icon-right": 36px brand pill with a trailing arrow,
 * centred inside an "action" row with 8px vertical padding (+12px group gap).
 */
export function CtaButton({
  href,
  children,
  assetBaseUrl = "static",
}: {
  href: string;
  children: React.ReactNode;
  /** Base URL where the files in `static/` are hosted (no trailing slash). */
  assetBaseUrl?: string;
}) {
  return (
    <Block paddingTop={20} paddingBottom={20}>
      <table role="presentation" cellPadding={0} cellSpacing={0} border={0} align="center">
        <tbody>
          <tr>
            <td>
              <Button href={href} style={button}>
                <span style={buttonLabel}>{children}</span>
                <Img
                  src={`${assetBaseUrl}/arrow-right.png`}
                  alt=""
                  width={16}
                  height={16}
                  style={buttonIcon}
                />
              </Button>
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

const buttonIcon: React.CSSProperties = {
  display: "inline-block",
  verticalAlign: "middle",
  marginLeft: 4,
  border: 0,
};
