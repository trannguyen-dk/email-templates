import { Text } from "@react-email/components";

import { EmailLayout, paragraphDark } from "../../components/layout.js";

/**
 * The onboarding application was cancelled by DK Bank — sent to both the
 * applicant and the approver(s).
 * Figma: DK.Notif › node 2464:4615, "Content" frame (343x756).
 */
export interface ApplicationCancelledEmailProps {
}

export default function ApplicationCancelledEmail({
}: ApplicationCancelledEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-blocked.png">
      <Text style={{ ...paragraphDark, marginTop: 16 }}>Dear Applicant / Approver,</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>
        We are writing to inform you that your onboarding application has been cancelled by DK Bank.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>
        If you believe this is in error or would like to discuss next steps, please contact your
        relationship manager or the Customer Service team.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>
        Thank you for your interest in DK Bank.
      </Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApplicationCancelledEmail.PreviewProps = {} satisfies ApplicationCancelledEmailProps;
