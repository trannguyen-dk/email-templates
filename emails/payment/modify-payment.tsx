import { Text } from "@react-email/components";

import { Button } from "../../components/button.js";
import { EmailLayout, emphasis, paragraph, paragraphDark } from "../../components/layout.js";

/**
 * Approver notification — a pending payment was edited by another user and
 * needs looking at again. Sits between `pending-approval` and a fresh decision:
 * the earlier review is stale, so the approver is sent back to the payment.
 * Figma: DK.Notif › node 2464:5785, "Content" frame — pending (hourglass) icon.
 *
 * The frame carries no summary card: the changed values are the whole point,
 * so the copy points at the payment rather than restating a snapshot of it.
 */
export interface ModifyPaymentEmailProps {
  /** Recipient — the approver being asked to look again. */
  userName?: string;
  /** Reference of the edited payment; rendered after a literal "#". */
  referenceId?: string;
  /** Whoever made the edit. */
  editedBy?: string;
  reviewUrl?: string;
}

export default function ModifyPaymentEmail({
  userName = "{User's Name}",
  referenceId = "{reference_id}",
  editedBy = "{User's Name}",
  reviewUrl = "https://cibs-gmc.uat.digitalkidu.bt/uatonebank/66666666_default/h5/53000001-1.0.46.0/html/www/index.html#/login",
}: ModifyPaymentEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-pending.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>
        Dear <strong style={emphasis}>{userName}</strong>,
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Payment <strong style={emphasis}>#{referenceId}</strong> has been edited by{" "}
        <strong style={emphasis}>{editedBy}</strong>. Please review the updated details.
      </Text>

      <Button href={reviewUrl}>Review payment</Button>

      <Text style={{ ...paragraphDark, marginTop: 0 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ModifyPaymentEmail.PreviewProps = {} satisfies ModifyPaymentEmailProps;
