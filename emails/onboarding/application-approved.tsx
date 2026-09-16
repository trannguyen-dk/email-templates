import { Text } from "@react-email/components";

import { EmailLayout, paragraph, paragraphDark } from "../../components/layout.js";

/**
 * Applicant notification — signed off by all approvers, in final processing.
 * Figma: DK.Notif › node 2464:4140, "corp-onboarding / approved-by-approver"
 * — success icon; both sentences are one paragraph in the frame.
 */
export interface ApplicationApprovedEmailProps {
}

export default function ApplicationApprovedEmail({
}: ApplicationApprovedEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-success-v2.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear Applicant,</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Your account opening form has been signed off by all approvers and is now going through
        final processing at DK Bank. We will contact you once it&rsquo;s complete.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Thank you for choosing DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApplicationApprovedEmail.PreviewProps = {} satisfies ApplicationApprovedEmailProps;
