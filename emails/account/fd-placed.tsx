import { Text } from "@react-email/components";

import { Block, EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";


export interface FixedDepositPlacedEmailProps {
  userName?: string;
  amount?: string;
  tenure?: string;
  interestRate?: string;
  maturityDate?: string;
}

export default function FixedDepositPlacedEmail({
  userName = "{User's Name}",
  amount = "{amount}",
  tenure = "{tenure}",
  interestRate = "{X}",
  maturityDate = "{DD MM YYYY}",
}: FixedDepositPlacedEmailProps) {
  return (
    <EmailLayout>
      <Text style={{ ...paragraph, marginTop: 20 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Your Fixed Deposit has been successfully placed
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Details are below:</Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Amount", value: amount },
            { label: "Tenure", value: tenure },
            { label: "Interest rate", value: `${interestRate}% p.a.` },
            { label: "Maturity date", value: maturityDate },
          ]}
        />
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>Thank you for banking with us.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

FixedDepositPlacedEmail.PreviewProps = {} satisfies FixedDepositPlacedEmailProps;