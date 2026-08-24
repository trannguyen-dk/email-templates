import { Body, Column, Container, Font, Head, Html, Row } from "@react-email/components";

import { fontStack } from "./email-base.js";
import { EmailBody, type EmailBodyProps } from "./email-body.js";
import { EmailFooter } from "./email-footer.js";
import { EmailHeader } from "./email-header.js";

/**
 * Shared shell for DK Bank notification emails: document, font, panel, and the
 * header / body / footer sections.
 *
 * The sections live in their own files — `email-header.tsx`, `email-body.tsx`,
 * `email-footer.tsx` — over the foundation in `email-base.tsx`. This module
 * composes them and re-exports the API templates import.
 *
 * Figma: DK.Notif › "Content" frames (343 wide; e.g. 2453:3411).
 */

export interface EmailLayoutProps extends EmailBodyProps {}

export function EmailLayout({ statusIconUrl, iconSize, children }: EmailLayoutProps) {
  return (
    <Html lang="en">
      <Head>
        {/* Inter variable font (400–600); clients without @font-face support use the system stack. */}
        <Font
          fontFamily="Inter"
          fallbackFontFamily={["Helvetica", "Arial", "sans-serif"]}
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v20/UcC73FwrK3iLTeHuS_nVMrMxCp50SjIa1ZL7W0Q5nw.woff2",
            format: "woff2",
          }}
          fontWeight="400 600"
          fontStyle="normal"
        />
      </Head>
      <Body style={body}>
        <Container style={container}>
          <Row>
            <Column style={containerInner}>
              <EmailHeader />

              <EmailBody statusIconUrl={statusIconUrl} iconSize={iconSize}>
                {children}
              </EmailBody>

              <EmailFooter />
            </Column>
          </Row>
        </Container>
      </Body>
    </Html>
  );
}

/** Sections, for anything that needs them without the document shell. */
export { EmailHeader } from "./email-header.js";
export { EmailBody, type EmailBodyProps } from "./email-body.js";
export { EmailFooter, type EmailFooterProps } from "./email-footer.js";

/** Foundation re-exported so templates keep a single import site. */
export {
  Block,
  CDN,
  LOGO_URL,
  M,
  SUPPORT_EMAIL,
  emphasis,
  fontStack,
  heading,
  inlineLink,
  monoStack,
  paragraph,
  paragraphDark,
  textBase,
} from "./email-base.js";

/* ── styles (values lifted from Figma) ─────────────────────────── */

const body: React.CSSProperties = {
  margin: 0,
  padding: 0,
  backgroundColor: "#ffffff",
  fontFamily: fontStack,
  WebkitTextSizeAdjust: "100%",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
};

const container: React.CSSProperties = {
  width: "100%",
  maxWidth: 600,
  margin: "0 auto",
  backgroundColor: "#fcfcfc",
};

const containerInner: React.CSSProperties = {
  padding: "32px 16px",
};
