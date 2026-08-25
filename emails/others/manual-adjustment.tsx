import { Text } from "@react-email/components";

import { Block, EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";

/**
 * Account-holder notification — a manual adjustment was debited from the
 * account, with the reason and a transaction summary. No CTA.
 * Figma: DK.Notif › node 2464:14780, "email-body" ("Content") frame.
 *
 * The frame writes prose placeholders in square brackets ([User's Name],
 * [Reason]) and the card's reference as {REF ID}; shipped as the repo's
 * curly-brace / snake_case tokens per CONVENTIONS.md § Content. The card's
 * amount reads {amount}{currency} in the frame; shipped as {amount}{ccy} —
 * the currency token every other card in the repo uses — unsigned, as the
 * frame shows. The frame should be updated.
 */
export interface ManualAdjustmentEmailProps {
  userName?: string;
  /** Why the adjustment was made, as supplied by operations. */
  reason?: string;
  /** Amount for the summary card, e.g. "10.00 USD". */
  amount?: string;
  accountName?: string;
  accountMasked?: string;
  referenceId?: string;
  dateTime?: string;
}

export default function ManualAdjustmentEmail({
  userName = "{User's Name}",
  reason = "{Reason}",
  amount = "{amount}{ccy}",
  accountName = "{account_name}",
  accountMasked = "***{account_last4}",
  referenceId = "{reference_id}",
  dateTime = "{date_time}",
}: ManualAdjustmentEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-outgoing.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        A manual adjustment has been debited from your account.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        <strong style={emphasis}>Reason</strong>: {reason}
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Details are below:</Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Amount", value: amount },
            { label: "From", value: accountName, sub: accountMasked },
            { label: "Reference ID", value: referenceId },
            { label: "Date & time", value: dateTime },
          ]}
        />
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>Thank you for choosing DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ManualAdjustmentEmail.PreviewProps = {} satisfies ManualAdjustmentEmailProps;
