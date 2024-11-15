import React, {createContext, useState, useEffect, useCallback} from "react";
import ReactGA from "react-ga4";

// Initialize Google Analytics
export const initGA = (measurementId: string): void => {
  ReactGA.initialize(measurementId);
};

export const logPageViewGA = (path: string): void => {
  ReactGA.send({hitType: "pageview", page: path});
};

// Interface for Google Analytics Context
interface GoogleAnalyticsContextProps {
  logPageView: (path: string) => void;
  isConsentGiven: boolean;
  grantConsent: () => void;
  revokeConsent: () => void;
}

export const GoogleAnalyticsContext = createContext<
  GoogleAnalyticsContextProps | undefined
>(undefined);

interface GoogleAnalyticsProviderProps {
  measurementId: string;
  ConsentBanner: React.ComponentType<ConsentBannerProps>;
  children: React.ReactNode;
}

// Interface for ConsentBanner Props
interface ConsentBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

// Google Analytics Provider Component
export const GoogleAnalyticsProvider: React.FC<
  GoogleAnalyticsProviderProps
> = ({measurementId, ConsentBanner, children}) => {
  if (!measurementId) {
    throw new Error(
      "Measurement ID is required to initialize Google Analytics."
    );
  }
  if (!ConsentBanner) {
    throw new Error(
      "GoogleAnalyticsProvider: ConsentBanner is required but not provided."
    );
  }

  const [isConsentGiven, setConsentGiven] = useState(
    localStorage.getItem("analyticsConsent") === "true"
  );

  const grantConsent = useCallback(() => {
    setConsentGiven(true);
    localStorage.setItem("analyticsConsent", "true");
    initGA(measurementId);
  }, [measurementId]);

  const revokeConsent = useCallback(() => {
    setConsentGiven(false);
    localStorage.setItem("analyticsConsent", "false");
    console.log("User consent revoked. Analytics will not track further.");
  }, []);

  // Initialize GA on consent
  useEffect(() => {
    if (isConsentGiven) {
      initGA(measurementId);
    }
  }, [isConsentGiven, measurementId]);

  // Function to log page views
  const logPageView = useCallback(
    (path: string) => {
      if (isConsentGiven) {
        logPageViewGA(path);
        console.log("Pageview logged for:", path);
      }
    },
    [isConsentGiven]
  );

  return (
    <GoogleAnalyticsContext.Provider
      value={{logPageView, isConsentGiven, grantConsent, revokeConsent}}
    >
      {children}
      {!isConsentGiven && (
        <ConsentBanner onAccept={grantConsent} onDecline={revokeConsent} />
      )}
    </GoogleAnalyticsContext.Provider>
  );
};
