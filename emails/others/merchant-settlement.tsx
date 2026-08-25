import { Text } from "@react-email/components";

import { Block, EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";

/**
 * Merchant notification — a settlement was credited to the DK Bank Business
 * account, with a settlement summary. No CTA.
 * Figma: DK.Notif › node 2464:14952, "email-body" ("Content") frame.
 *
 * The frame's card shows sample data ("+10,000.00 USD" in the credit green,
 * "24 Jun 2026, 12:58 PM", "123ABC456"); replaced with snake_case tokens per
 * CONVENTIONS.md § Content, keeping the signed spelling and credit tone the
 * inbound-credit frames use.
 */
export interface MerchantSettlementEmailProps {
  userName?: string;
  /** Signed settlement amount for the summary card, e.g. "+10,000.00 USD". */
  settlementAmount?: string;
  settlementDate?: string;
  batchId?: string;
}

export default function MerchantSettlementEmail({
  userName = "{User's Name}",
  settlementAmount = "+{amount}{ccy}",
  settlementDate = "{date_time}",
  batchId = "{batch_id}",
}: MerchantSettlementEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-processing.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Your merchant settlement has been credited to your DK Bank Business account.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Details are below:</Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Settlement amount", value: settlementAmount, tone: "credit" },
            { label: "Settlement date", value: settlementDate },
            { label: "Batch ID", value: batchId },
          ]}
        />
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>Thank you for banking with us.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

MerchantSettlementEmail.PreviewProps = {} satisfies MerchantSettlementEmailProps;
