import { Text } from "@react-email/components";

import { EmailLayout, paragraph, paragraphDark } from "../../components/layout.js";

/**
 * Applicant notification — the onboarding application was cancelled.
 * Figma: DK.Notif › node 2464:4525, "Content" frame.
 *
 * UNVERIFIED against the frame — the Figma MCP was unreachable when this was
 * written, so the copy is carried from the superseded node 1390:8390 and the
 * spacing/colour follow CONVENTIONS.md. Three things to re-check once Figma is
 * reachable: the wording, whether the frame keeps the `cancelled` status icon,
 * and the greeting — 1390:8390 served both audiences with "Dear
 * Applicant/Approver," and this split assumes the new frame says "Dear
 * Applicant,".
 */
export interface ApplicationCancelledApplicantEmailProps {
}

export default function ApplicationCancelledApplicantEmail({
}: ApplicationCancelledApplicantEmailProps) {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-blocked.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear Applicant,</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        We would like to inform you that your onboarding application with DK Bank has been cancelled.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        If you believe this cancellation was made in error or if you require further clarification,
        please contact your Relationship Manager or our Customer Service team for assistance.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>We appreciate your understanding.</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Thank you for your interest in DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}

ApplicationCancelledApplicantEmail.PreviewProps =
  {} satisfies ApplicationCancelledApplicantEmailProps;
