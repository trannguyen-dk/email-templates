import { Img } from "@react-email/components";

import { Block, LOGO_URL, M } from "./email-base.js";

/**
 * Email header — the centred DK Bank wordmark, and nothing else.
 * Figma: DK.Notif › "Content" frames, 98x28 at the top of every email.
 */
export interface EmailHeaderProps {
  /** Overrides the shared wordmark dimensions, e.g. to keep the asset's true ratio. */
  logoSize?: { width: number; height: number };
}

export function EmailHeader({ logoSize }: EmailHeaderProps) {
  return (
    <Block align="center">
      <Img src={LOGO_URL} alt="DK Bank" {...M.headerLogo} {...logoSize} style={logo} />
    </Block>
  );
}

const logo: React.CSSProperties = {
  display: "block",
  margin: "0 auto",
  border: 0,
};
