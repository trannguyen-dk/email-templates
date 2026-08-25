import { Text } from "@react-email/components";

import { Button } from "../../components/button.js";
import { Block, EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";

/**
 * Approver notification — a maker submitted a loan repayment request that is
 * waiting for the approver's sign-off, with a "Review request" CTA to the
 * banking portal. No status icon; the frame goes straight from the logo to
 * the greeting. The approval gate that precedes the approved / declined
 * outcome emails.
 * Figma: DK.Notif › node 2590:18428, "email-body" ("Content") frame.
 *
 * The frame is named "repayment-request-submitted" like the maker's copy
 * (built as `repayment-request-submitted.tsx`); named with the -approver
 * suffix the onboarding pair uses. The button instance exports the
 * component-default label ("Default"); the frame renders "Review request",
 * which is what ships.
 */
export interface RepaymentRequestPendingApproverEmailProps {
  userName?: string;
  makerName?: string;
  companyName?: string;
  accountNumber?: string;
  /** Amount as it reads in the summary card, e.g. "10,000.00 BTN". */
  repaymentAmount?: string;
  reviewUrl?: string;
}

export default function RepaymentRequestPendingApproverEmail({
  userName = "{User's Name}",
  makerName = "{Maker Name}",
  companyName = "{Company Name}",
  accountNumber = "{account_number}",
  repaymentAmount = "{amount}",
  reviewUrl = "https://cibs-gmc.uat.digitalkidu.bt/uatonebank/66666666_default/h5/53000001-1.0.46.0/html/www/index.html#/login",
}: RepaymentRequestPendingApproverEmailProps) {
  return (
    <EmailLayout>
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        <strong style={emphasis}>{makerName}</strong> has submitted a loan repayment request for{" "}
        {companyName}, which is now pending your approval.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Details are below:</Text>

      <Block paddingTop={16} paddingBottom={0}>
        <Table
          rows={[
            { label: "Loan account no.", value: accountNumber },
            { label: "Repayment amount", value: repaymentAmount },
          ]}
        />
      </Block>

      <Button href={reviewUrl}>Review request</Button>

      <Text style={{ ...paragraph, marginTop: 0 }}>
        Thank you for your prompt attention to this matter.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

RepaymentRequestPendingApproverEmail.PreviewProps =
  {} satisfies RepaymentRequestPendingApproverEmailProps;
