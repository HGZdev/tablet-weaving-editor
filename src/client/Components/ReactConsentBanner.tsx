import React from "react";
import CookieConsent from "react-cookie-consent";

interface ConsentBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

const ReactConsentBanner: React.FC<ConsentBannerProps> = ({
  onAccept,
  onDecline,
}) => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="analyticsConsent"
      onAccept={onAccept}
      onDecline={onDecline}
      expires={365}
      style={{background: "#3C3C3C", color: "#fff"}}
      buttonStyle={{
        backgroundColor: "#D17A44",
        color: "#FAF7F2",
        border: "none",
        borderRadius: "5px",
        padding: "0.5em 1em",
      }}
      declineButtonStyle={{
        backgroundColor: "#ccc",
        color: "#3C3C3C",
        border: "none",
        borderRadius: "5px",
        padding: "0.5em 1em",
      }}
    >
      We use cookies to enhance your experience. By accepting, you agree to our
      use of analytics cookies.
    </CookieConsent>
  );
};

export default ReactConsentBanner;
