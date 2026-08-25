import { Fragment } from "react";

import { emphasis, paragraph, textBase } from "./layout.js";

/**
 * Figma transaction summary card: a rounded, hairline-bordered panel with
 * label/value rows separated by dashed rules.
 * Figma: DK.Notif › node 2417:2189.
 */
export interface Row {
  label: string;
  value: string;
  /** Optional second line under the value, e.g. a masked account number. */
  sub?: string;
  /**
   * Semantic colour for the value. Omit for the body colour; "credit" renders
   * the green the inbound-credit frame uses on its signed amount.
   *
   * A tone rather than a colour string, so the green lives here once instead of
   * being re-picked by every template that shows money moving.
   */
  tone?: "credit";
}

export function Table({ rows }: { rows: readonly Row[] }) {
  return (
    <table role="presentation" cellPadding={0} cellSpacing={0} border={0} width="100%" style={card}>
      <tbody>
        <tr>
          <td style={cardInner}>
            <table
              role="presentation"
              cellPadding={0}
              cellSpacing={0}
              border={0}
              width="100%"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <tbody>
                {rows.map((r, i) => (
                  <Fragment key={r.label}>
                    {/* The card border closes the group, so rules sit between rows only. */}
                    {i > 0 ? <TableDivider /> : null}
                    <tr>
                      <td style={labelCell}>{r.label}</td>
                      <td style={valueCell}>
                        <span style={r.tone === "credit" ? creditValue : emphasis}>
                          {r.value}
                        </span>
                        {r.sub ? <div style={subText}>{r.sub}</div> : null}
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

/**
 * Dashed rule between table rows. Spans the card's padded content width, so it
 * sits 16px inside the rounded border on both sides — matching the frame.
 *
 * Drawn as a border on a zero-height `<td>` rather than a nested `<div>`: an
 * empty block element inside a table cell picks up a line-box in Outlook and
 * shows as a thick gap instead of a hairline.
 */
export function TableDivider() {
  return (
    <tr>
      <td colSpan={2} style={dividerCell} />
    </tr>
  );
}

/* ── styles (values lifted from Figma) ─────────────────────────── */

/** border/subtle — rgba(0,0,51,0.06) composited over the #fcfcfc panel. */
const card: React.CSSProperties = {
  width: "100%",
  border: "1px solid #ededf0",
  borderRadius: 16,
  borderCollapse: "separate",
};

const cardInner: React.CSSProperties = { padding: "8px 16px" };

/** Figma divider: #000932 at 12.16% over the panel, dashed. */
const dividerCell: React.CSSProperties = {
  borderTop: "1px dashed #dddee3",
  height: 1,
  padding: 0,
  fontSize: 1,
  lineHeight: "1px",
};

const labelCell: React.CSSProperties = {
  ...paragraph,
  padding: "12px 8px 12px 0",
  verticalAlign: "top",
  whiteSpace: "nowrap",
};

const valueCell: React.CSSProperties = {
  ...paragraph,
  padding: "12px 0",
  verticalAlign: "top",
  textAlign: "right",
};

/**
 * Credit green for a positive amount. The one text colour in the project that
 * is not #262A2E, so it is deliberately scoped to this cell.
 *
 * UNVERIFIED: read off the frame by eye, not from Figma (the MCP connector was
 * unauthorised). Confirm the token before sending.
 */
const creditValue: React.CSSProperties = {
  ...emphasis,
  color: "#218358",
};

const subText: React.CSSProperties = {
  ...textBase,
  marginTop: 2,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: "22px",
  letterSpacing: "-0.084px",
  color: "#262a2e",
};
