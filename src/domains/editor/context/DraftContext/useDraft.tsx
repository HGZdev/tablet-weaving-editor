import {useContext} from "react";
import {DraftContextType, DraftContext} from "./DraftContextProvider";

export const useDraft = (): DraftContextType => {
  const context = useContext(DraftContext);
  if (!context) {
    throw new Error("useDraft must be used within a DraftProvider");
  }
  return context;
};
