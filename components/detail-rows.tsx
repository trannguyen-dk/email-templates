import { emphasis, paragraph, textBase } from "./layout.js";

/**
 * Figma transaction summary card: a rounded, hairline-bordered panel with
 * label/value rows separated by dashed rules.
 * Figma: DK.Notif › node 2417:2189.
 */
export interface DetailRow {
  label: string;
  value: string;
  /** Optional second line under the value, e.g. a masked account number. */
  sub?: string;
}

export function DetailRows({ rows }: { rows: readonly DetailRow[] }) {
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
                {rows.map((r, i) => {
                  // The card border closes the group, so rules sit between rows only.
                  const edge = i === 0 ? null : rule;
                  return (
                    <tr key={r.label}>
                      <td style={{ ...labelCell, ...edge }}>{r.label}</td>
                      <td style={{ ...valueCell, ...edge }}>
                        <span style={emphasis}>{r.value}</span>
                        {r.sub ? <div style={subText}>{r.sub}</div> : null}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
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

/** Figma divider: #000932 at 12.16%, dashed. */
const rule: React.CSSProperties = { borderTop: "1px dashed #dddee3" };

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

const subText: React.CSSProperties = {
  ...textBase,
  marginTop: 2,
  fontSize: 14,
  fontWeight: 400,
  lineHeight: "22px",
  letterSpacing: "-0.084px",
  color: "#60646c",
};
