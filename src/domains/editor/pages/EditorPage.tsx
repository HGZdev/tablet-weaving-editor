import React, { useState } from "react";
import ThreadsPanel from "../components/ThreadsPanel";
import TabletsPanel from "../components/TabletsPanel";
import { useDraft } from "../context/DraftContext/useDraft";
import { galleryStorage } from "../../gallery/services/galleryStorage";
import { HiRefresh, HiDownload, HiUpload, HiBookmark } from "react-icons/hi";
import type { Skew, MakeDirChange } from "../components/types";

const EditorContent: React.FC = () => {
  const { draft, setTablets, setDirsChanges, setSkews } = useDraft();
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [draftName, setDraftName] = useState("");

  const handleResetPattern = () => {
    // Reset to original black and white pattern
    const originalTablets = [
      ["black", "white", "black", "black"], // A
      ["black", "black", "white", "black"], // B
      ["black", "black", "white", "black"], // C
      ["black", "white", "black", "black"], // D
    ];
    const originalSkews: Skew[] = [1, 1, -1, -1];
    const originalDirsChanges: MakeDirChange[][] = [
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ];

    setTablets(originalTablets);
    setSkews(originalSkews);
    setDirsChanges(originalDirsChanges);
  };

  const handleSaveToGallery = () => {
    setShowSaveDialog(true);
  };

  const confirmSaveToGallery = () => {
    if (draftName.trim()) {
      try {
        galleryStorage.saveCustomDraft(draft, draftName.trim());
        setShowSaveDialog(false);
        setDraftName("");
        alert("Pattern saved to gallery successfully!");
      } catch (error) {
        alert("Failed to save pattern to gallery. Please try again.");
      }
    }
  };

  const cancelSaveToGallery = () => {
    setShowSaveDialog(false);
    setDraftName("");
  };

  const handleExportPattern = () => {
    const patternData = {
      ...draft,
      timestamp: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(patternData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });

    // Use File System Access API if available (modern browsers)
    if ("showSaveFilePicker" in window) {
      (window as any)
        .showSaveFilePicker({
          suggestedName: "tablet_weaving_pattern.json",
          types: [
            {
              description: "JSON files",
              accept: {
                "application/json": [".json"],
              },
            },
          ],
        })
        .then(async (fileHandle: any) => {
          const writable = await fileHandle.createWritable();
          await writable.write(dataBlob);
          await writable.close();
        })
        .catch((err: any) => {
          if (err.name !== "AbortError") {
            console.error("Error saving file:", err);
          }
        });
    } else {
      // Fallback for older browsers - create download with timestamp to force Save As
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `tablet_weaving_pattern_${Date.now()}.json`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  const handleUploadPattern = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const patternData = JSON.parse(e.target?.result as string);
        if (patternData.tablets) setTablets(patternData.tablets);
        if (patternData.dirsChanges) setDirsChanges(patternData.dirsChanges);
        if (patternData.skews) setSkews(patternData.skews);
      } catch (error) {
        console.error("Error loading pattern:", error);
        alert("Error loading pattern file");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="h-full flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Editor Header */}
        <div className="bg-white border-b border-neutral-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-neutral-800">
                Pattern Editor
              </h2>
              <p className="text-sm text-neutral-600">
                Design your tablet weaving pattern
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleResetPattern}
                className="btn btn-outline btn-sm cursor-pointer flex items-center gap-2"
                title="Reset Pattern"
              >
                <HiRefresh size={16} />
                <span className="hidden sm:inline">Reset</span>
              </button>

              <div className="relative">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleUploadPattern}
                  className="hidden"
                  id="upload-pattern"
                />
                <label
                  htmlFor="upload-pattern"
                  className="btn btn-outline btn-sm cursor-pointer flex items-center gap-2"
                  title="Import Project"
                >
                  <HiUpload size={16} />
                  <span className="hidden sm:inline">Import</span>
                </label>
              </div>

              <button
                onClick={handleExportPattern}
                className="btn btn-outline btn-sm cursor-pointer flex items-center gap-2"
                title="Export Project"
              >
                <HiDownload size={16} />
                <span className="hidden sm:inline">Export</span>
              </button>

              <button
                onClick={handleSaveToGallery}
                className="btn btn-primary btn-sm cursor-pointer flex items-center gap-2"
                title="Save to Gallery"
              >
                <HiBookmark size={16} />
                <span className="hidden sm:inline">Save to Gallery</span>
              </button>
            </div>
          </div>
        </div>

        {/* Editor Content */}
        <div className="flex-1 overflow-auto bg-neutral-50">
          <div className="p-6">
            <div className="max-w-6xl mx-auto">
              <ThreadsPanel />
              <TabletsPanel />
            </div>
          </div>
        </div>
      </div>

      {/* Save to Gallery Dialog */}
      {showSaveDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">
              Save to Gallery
            </h3>
            <p className="text-neutral-600 mb-4">
              Give your pattern a name to save it to your personal gallery.
            </p>
            <div className="mb-4">
              <input
                type="text"
                value={draftName}
                onChange={(e) => setDraftName(e.target.value)}
                placeholder="Enter pattern name..."
                className="input w-full"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") confirmSaveToGallery();
                  if (e.key === "Escape") cancelSaveToGallery();
                }}
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={cancelSaveToGallery}
                className="btn btn-outline flex-1 h-12"
              >
                Cancel
              </button>
              <button
                onClick={confirmSaveToGallery}
                className="btn btn-primary flex-1 h-12"
                disabled={!draftName.trim()}
              >
                Save to Gallery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const EditorPage: React.FC = () => {
  return <EditorContent />;
};

export default EditorPage;
