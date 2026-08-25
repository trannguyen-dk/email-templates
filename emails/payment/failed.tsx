import { Text } from "@react-email/components";

import { Button } from "../../components/button.js";
import { Block, EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";

/**
 * Initiator notification — the payment could not be completed, with the
 * failure reason and a retry. Unlike `rejected-by-approver` no one declined
 * it; it failed in execution.
 * Figma: DK.Notif › node 2464:6316, "Content" frame.
 *
 * Two things worth knowing about this frame:
 *
 * - The CTA sits ABOVE the details card, inverting the order the other
 *   templates use. That is what the frame shows.
 * - The status icon is `icon-rejected` — a circled arrow with an orange cross
 *   badge. It is 100x100 rather than the canonical 96x96, but it is what the
 *   frame draws, so the grid is not a reliable guide here. It is not
 *   `icon-failed`, which is a sad face and appears in no frame.
 *
 * One deliberate divergence: the frame annotates the sign-off -> footer gap as
 * `gap/20`, but the shell uses `M.contentGap = 44` (CONVENTIONS.md § Spacing,
 * which overrides the frame and is shared by every template). Left at 44.
 */
export interface FailedEmailProps {
  userName?: string;
  /** Reference as it reads in the body copy, rendered after a "#". */
  paymentRef?: string;
  /** Amount as it reads in the body copy, e.g. "10,000.00 USD". */
  amount?: string;
  /** Why the payment failed, as supplied by the payment engine. */
  reason?: string;
  /** Signed amount for the summary card, e.g. "-10,000.00 USD". */
  debitAmount?: string;
  accountName?: string;
  accountMasked?: string;
  beneficiaryName?: string;
  beneficiaryMasked?: string;
  referenceId?: string;
  retryUrl?: string;
}

export default function FailedEmail({
  userName = "{User's Name}",
  paymentRef = "{Reference ID}",
  amount = "{Amount}",
  reason = "{Reason}",
  debitAmount = "-{amount}{ccy}",
  accountName = "{account_name}",
  accountMasked = "***{account_last4}",
  beneficiaryName = "{beneficiary_name}",
  beneficiaryMasked = "***{beneficiary_last4}",
  referenceId = "{reference_id}",
  retryUrl = "https://cibs-gmc.uat.digitalkidu.bt/uatonebank/66666666_default/h5/53000001-1.0.46.0/html/www/index.html#/login",
}: FailedEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-rejected.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Payment <strong style={emphasis}>#{paymentRef}</strong> for{" "}
        <strong style={emphasis}>{amount}</strong> couldn’t be completed.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        <strong style={emphasis}>Reason</strong>: {reason}
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Please try to transfer again. We’re sorry for this inconvenience.
      </Text>

      <Button href={retryUrl}>Transfer again</Button>

      <Text style={{ ...paragraph, marginTop: 0 }}>Payment details are below:</Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Amount", value: debitAmount },
            { label: "From", value: accountName, sub: accountMasked },
            { label: "To", value: beneficiaryName, sub: beneficiaryMasked },
            { label: "Reference ID", value: referenceId },
          ]}
        />
      </Block>

      <Text style={{ ...paragraph, marginTop: 0 }}>Thank you for choosing DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

FailedEmail.PreviewProps = {} satisfies FailedEmailProps;
