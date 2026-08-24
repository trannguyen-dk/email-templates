import { Img } from "@react-email/components";

import { Block, M } from "./email-base.js";

export interface EmailBodyProps {
  /**
   * Hosted status icon shown under the logo, as an absolute URL, e.g.
   * "https://notification-email-s3.s3.ap-southeast-1.amazonaws.com/icon-success.png".
   * See CONVENTIONS.md for the full set. Omit it for the frames that go
   * straight from the logo to the copy.
   */
  statusIconUrl?: string;
  /**
   * Rendered icon size. Figma's icon slot is 64x64; the hosted assets are
   * larger (96x96 across the set in use) and scale down, which keeps them
   * crisp on high-DPI displays.
   */
  iconSize?: number;
  children: React.ReactNode;
}

/**
 * Email body — the optional status icon, then the template's own copy.
 * Templates supply `children`; everything else is fixed by the frame.
 */
export function EmailBody({ statusIconUrl, iconSize = 64, children }: EmailBodyProps) {
  return (
    <>
      {statusIconUrl ? (
        <Block paddingTop={M.iconGap} align="center">
          <Img
            src={statusIconUrl}
            alt=""
            width={iconSize}
            height={iconSize}
            style={{ display: "block", margin: "0 auto" }}
          />
        </Block>
      ) : null}

      {children}
    </>
  );
}
