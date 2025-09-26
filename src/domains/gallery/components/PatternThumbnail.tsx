import React, { useEffect } from "react";
import ThreadsPanel from "../../editor/components/ThreadsPanel";
import { DraftProvider } from "../../editor/context/DraftContext/DraftContextProvider";
import { useDraft } from "../../editor/context/DraftContext/useDraft";
import type { Draft } from "../../editor/components/types";

interface PatternThumbnailProps {
  draft: Draft;
  className?: string;
}

// Inner component that uses the draft context
const ThumbnailContent: React.FC<{ draft: Draft }> = ({ draft }) => {
  const { onUploaded } = useDraft();

  useEffect(() => {
    onUploaded(draft);
  }, [draft, onUploaded]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="scale-50 origin-center overflow-hidden">
        <ThreadsPanel />
      </div>
    </div>
  );
};

const PatternThumbnail: React.FC<PatternThumbnailProps> = ({
  draft,
  className = "",
}) => {
  return (
    <div
      className={`relative bg-neutral-100 rounded-lg overflow-hidden ${className}`}
    >
      {/* Create a temporary draft context for this thumbnail */}
      <DraftProvider>
        <ThumbnailContent draft={draft} />
      </DraftProvider>

      {/* Pattern info overlay */}
      <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
        {draft.tablets.length}×{draft.picks}
      </div>
    </div>
  );
};

export default PatternThumbnail;
