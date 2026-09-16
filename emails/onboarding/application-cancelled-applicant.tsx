import { Text } from "@react-email/components";

import { EmailLayout, paragraph, paragraphDark } from "../../components/layout.js";

/**
 * Approver notification — the onboarding application was cancelled by the
 * applicant, so no further action is needed from the approver(s).
 * Figma: DK.Notif › node 2464:4521, "corp-onboarding / cancelled" — the
 * `declined` icon variant, which is the hosted `blocked` glyph.
 *
 * Named for who cancelled, not who receives: the frame greets the approver.
 * The DK-Bank-initiated counterpart (sent to both audiences) is
 * `application-cancelled`.
 */
export default function ApplicationCancelledApplicantEmail() {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-blocked-v2.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear Approver,</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        We would like to inform you that the onboarding application for your company has been
        cancelled by the applicant.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        No further action is required from you at this time.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Thank you for your interest in DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}
