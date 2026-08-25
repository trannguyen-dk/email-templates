import { Text } from "@react-email/components";

import { Button } from "../../components/button.js";
import { EmailLayout, emphasis, paragraphDark } from "../../components/layout.js";

/**
 * Approver notification — an account opening application awaits review.
 * The approver-side counterpart to `application-pending-applicant`.
 * Figma: DK.Notif › node 2464:3996, "Content" frame (343x808).
 */
export interface ApplicationPendingApproverEmailProps {
  companyName?: string;
  reviewUrl?: string;
}

export default function ApplicationPendingApproverEmail({
  companyName = "{Company Name}",
  reviewUrl = "https://onboarding.uat.digitalkidu.bt/auth/login",
}: ApplicationPendingApproverEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-pending.png">
      <Text style={{ ...paragraphDark, marginTop: 16 }}>Dear Approver,</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>
        The account opening application for <strong style={emphasis}>{companyName}</strong> has been
        successfully submitted and now pending your review and approval.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>
        Please review the application details and complete the approval process.
      </Text>

      <Button href={reviewUrl}>
        Review application
      </Button>

      <Text style={{ ...paragraphDark, marginTop: 0 }}>
        Thank you for your attention and prompt action.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApplicationPendingApproverEmail.PreviewProps = {
  companyName: "{Company Name}",
} satisfies ApplicationPendingApproverEmailProps;
