import { Text } from "@react-email/components";

import { Block, EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";
import { Table } from "../../components/table.js";

/**
 * Initiator notification — an approver declined the payment outright.
 * Terminal: unlike `modify-payment` there is nothing to resubmit, and unlike
 * `debited-success` nothing was debited.
 * Figma: DK.Notif › node 2464:5944, "Content" frame — blocked icon.
 *
 * The frame carries the approver's free-text reason above the summary card,
 * and the card omits the "Date & time" row the sibling payment frames carry:
 * a declined payment never got a settlement timestamp worth quoting.
 */
export interface RejectedByApproverEmailProps {
  userName?: string;
  referenceId?: string;
  /** The approver's free-text decline reason, rendered after a bold "Reason". */
  reason?: string;
  /** Amount for the summary card — unsigned; nothing has moved. */
  paymentAmount?: string;
  accountName?: string;
  accountMasked?: string;
  beneficiaryName?: string;
  beneficiaryMasked?: string;
}

export default function RejectedByApproverEmail({
  userName = "{User's Name}",
  referenceId = "{reference_id}",
  reason = "{reason goes here}",
  paymentAmount = "{amount}{ccy}",
  accountName = "{account_name}",
  accountMasked = "***{account_last4}",
  beneficiaryName = "{beneficiary_name}",
  beneficiaryMasked = "***{beneficiary_last4}",
}: RejectedByApproverEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-blocked.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Payment <strong style={emphasis}>#{referenceId}</strong> has been declined by the approver.
      </Text>

      {/* Inverted emphasis: the label is bold here, not the merge field. */}
      <Text style={{ ...paragraph, marginTop: 16 }}>
        <strong style={emphasis}>Reason</strong>: {reason}
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Payment details are below:</Text>

      <Block paddingTop={16} paddingBottom={16}>
        <Table
          rows={[
            { label: "Amount", value: paymentAmount },
            { label: "From", value: accountName, sub: accountMasked },
            { label: "To", value: beneficiaryName, sub: beneficiaryMasked },
            { label: "Reference ID", value: referenceId },
          ]}
        />
      </Block>

      <Text style={{ ...paragraphDark, marginTop: 0 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

RejectedByApproverEmail.PreviewProps = {} satisfies RejectedByApproverEmailProps;
