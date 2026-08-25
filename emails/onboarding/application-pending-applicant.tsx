import { Text } from "@react-email/components";

import { EmailLayout, paragraph, paragraphDark } from "../../components/layout.js";

/**
 * Applicant acknowledgement — the account opening application was received and
 * is now queued for the company's approvers.
 * The applicant-side counterpart to `application-pending-approver`.
 * Figma: DK.Notif › the applicant "pending review" frame — pending icon.
 *
 * NOTE: the Figma node id is not recorded here — the MCP connector was
 * unauthorised when this was written, so the frame was worked from a render
 * rather than read off the file. Fill the id in once Figma is reachable.
 *
 * Deliberately propless: the frame carries no merge fields and no CTA. The
 * approvers are referred to generically ("your company's designated
 * approver(s)") and the applicant has nothing to act on yet, so there is
 * nothing to parameterise. Not an unfinished template.
 */
export default function ApplicationPendingApplicantEmail() {
  return (
    <EmailLayout statusIconUrl="https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-pending.png">
      <Text style={{ ...paragraph, marginTop: 16 }}>Dear Applicant,</Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        Your application has been successfully received and is currently pending review by your
        company&rsquo;s designated approver(s).
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>
        You will be notified once the review process is complete or if any further action is
        required from your side.
      </Text>

      <Text style={{ ...paragraph, marginTop: 16 }}>Thank you for your interest in DK Bank.</Text>

      <Text style={{ ...paragraphDark, marginTop: 16 }}>Best regards,</Text>
      <Text style={{ ...paragraphDark, fontWeight: 600, marginTop: 2 }}>DK Bank Team</Text>
    </EmailLayout>
  );
}
