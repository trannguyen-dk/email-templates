import { Column, Hr, Row, Text } from "@react-email/components";

import { EmailLayout, paragraph, paragraphDark } from "../../components/layout.js";

export interface FixedDepositMaturityEmailProps {
  userName?: string;
  maturityDate?: string;
  totalMaturityAmount?: string;
  referenceId?: string;
}

export default function FixedDepositMaturityEmail({
  userName = "{User's Name}",
  maturityDate = "{DD MM YYYY}",
  totalMaturityAmount = "{Amount}",
  referenceId = "{REF ID}",
}: FixedDepositMaturityEmailProps) {
  return (
    <EmailLayout>
      <Text style={{ ...paragraph, marginTop: 20 }}>
        Dear <strong>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Your Fixed Deposit will mature on  <span style={{ fontWeight: 600 }}>{maturityDate}</span>. Now you can manage your rollover
        instructions.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Details are below:</Text>

      <Row style={{ marginTop: 16 }}>
        <Column style={card}>
          <Row>
            <Column style={detailCell}>
              <Row>
                <Column style={detailLabel}>Total maturity amount</Column>
                <Column style={detailValue}>{totalMaturityAmount}</Column>
              </Row>
            </Column>
          </Row>
          <Hr style={dottedDivider} />

          <Row>
            <Column style={detailCell}>
              <Row>
                <Column style={detailLabel}>Maturity date</Column>
                <Column style={detailValue}>{maturityDate}</Column>
              </Row>
            </Column>
          </Row>
          <Hr style={dottedDivider} />

          <Row>
            <Column style={detailCell}>
              <Row>
                <Column style={detailLabel}>Reference ID</Column>
                <Column style={detailValue}>{referenceId}</Column>
              </Row>
            </Column>
          </Row>
        </Column>
      </Row>

      <Text style={{ ...paragraph, marginTop: 20 }}>Thank you for banking with us.</Text>

      <Text style={{ ...paragraphDark, marginTop: 20 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

FixedDepositMaturityEmail.PreviewProps = {} satisfies FixedDepositMaturityEmailProps;

/* ── styles ─────────────────────────────────────────────────────── */

const card: React.CSSProperties = {
  border: "1px solid #e3e6ea",
  borderRadius: 12,
  padding: "4px 20px",
};

const detailCell: React.CSSProperties = {
  paddingTop: 16,
  paddingBottom: 16,
};

const detailLabel: React.CSSProperties = {
  ...paragraph,
  textAlign: "left",
};

const detailValue: React.CSSProperties = {
  ...paragraph,
  fontWeight: 600,
  color: "#1d2a3d",
  textAlign: "right",
};

const dottedDivider: React.CSSProperties = {
  margin: 0,
  border: 0,
  borderTop: "1px dotted #d7dbe0",
  width: "100%",
};