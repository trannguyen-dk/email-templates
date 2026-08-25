import { Text } from "@react-email/components";

import { Block, EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";

/**
 * Inbound credit alert — funds have landed in the business account. The
 * mirror of `debited-success`, minus the balance row: the frame reports the
 * arrival, not the resulting position.
 * Figma: DK.Notif › node 2464:15388, "Content" frame.
 *
 * The status icon is `icon-processing`, whose glyph is an arrow entering a box
 * — the inbound counterpart to `icon-outgoing`, despite the name. There is no
 * `icon-incoming` on the bucket (403).
 *
 * The signed amount is the one green value in the project; see `tone` in
 * `components/table.tsx`.
 */
export interface IncomingPaymentEmailProps {
  userName?: string;
  /** Amount as it reads in the body copy, e.g. "10,000.00 USD". */
  amount?: string;
  /** Signed amount for the summary card, e.g. "+10,000.00 USD". Rendered green. */
  creditAmount?: string;
  /** The remitter the funds came from; the frame shows no masked line for it. */
  senderName?: string;
  /** The business account the funds landed in. */
  accountName?: string;
  accountMasked?: string;
  referenceId?: string;
  dateTime?: string;
}

export default function IncomingPaymentEmail({
  userName = "{User's Name}",
  amount = "{Amount}",
  creditAmount = "+{amount}{ccy}",
  senderName = "{sender_name}",
  accountName = "{account_name}",
  accountMasked = "***{account_last4}",
  referenceId = "{reference_id}",
  dateTime = "{date_time}",
}: IncomingPaymentEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-processing.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        A payment of <strong style={emphasis}>{amount}</strong> has been credited to your DK Bank
        Business account.
      </Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Amount", value: creditAmount, tone: "credit" },
            { label: "From", value: senderName },
            { label: "To", value: accountName, sub: accountMasked },
            { label: "Reference ID", value: referenceId },
            { label: "Date & time", value: dateTime },
          ]}
        />
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>Thank you for banking with us.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

IncomingPaymentEmail.PreviewProps = {} satisfies IncomingPaymentEmailProps;
