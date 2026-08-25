import { Text } from "@react-email/components";

import { Block, EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";


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
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Your Fixed Deposit will mature on{" "}
        <strong style={emphasis}>{maturityDate}</strong>. Now you can manage your rollover
        instructions.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Details are below:</Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Total maturity amount", value: totalMaturityAmount },
            { label: "Maturity date", value: maturityDate },
            { label: "Reference ID", value: referenceId },
          ]}
        />
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>Thank you for banking with us.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

FixedDepositMaturityEmail.PreviewProps = {} satisfies FixedDepositMaturityEmailProps;