import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Download, Play, Heart, Trash2, Edit3 } from "lucide-react";
import { galleryDrafts } from "../data/galleryDrafts";
import { useDraft } from "../../editor/context/DraftContext/useDraft";
import PatternThumbnail from "../components/PatternThumbnail";
import { galleryStorage, CustomDraft } from "../services/galleryStorage";

const GalleryPage: React.FC = () => {
  const navigate = useNavigate();
  const { onUploaded } = useDraft();
  const [showConfirmDialog, setShowConfirmDialog] = useState<string | null>(
    null
  );
  const [customDrafts, setCustomDrafts] = useState<CustomDraft[]>([]);
  const [editingDraft, setEditingDraft] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  // Load custom drafts on component mount
  useEffect(() => {
    setCustomDrafts(galleryStorage.getCustomDrafts());
  }, []);

  // Convert gallery drafts to pattern format
  const galleryPatterns = galleryDrafts.map((draft, index) => {
    const descriptions = [
      "Traditional Celtic-inspired design with intricate knotwork patterns. Perfect for decorative borders and historical recreations.",
      "Flowing wave pattern in blue and white tones. Creates beautiful ocean-like movement perfect for scarves and shawls.",
      "Elegant golden spiral pattern with warm earth tones. Ideal for jewelry, belts, and luxury accessories.",
    ];

    return {
      id: `gallery-${index + 1}`,
      name: draft.fileName,
      description:
        descriptions[index] ||
        `Tablet weaving pattern with ${draft.tablets.length} tablets and ${draft.picks} picks`,
      draft: draft,
      downloads: Math.floor(Math.random() * 100) + 10,
      likes: Math.floor(Math.random() * 50) + 5,
      author: "Gallery",
      isCustom: false,
    };
  });

  // Convert custom drafts to pattern format
  const customPatterns = customDrafts.map((draft) => ({
    id: draft.id,
    name: draft.name,
    description: `Custom pattern with ${
      (draft as any).tablets.length
    } tablets and ${(draft as any).picks} picks`,
    draft: draft,
    downloads: 0,
    likes: 0,
    author: "You",
    isCustom: true,
    createdAt: draft.createdAt,
  }));

  // Combine all patterns
  const patterns = [...customPatterns, ...galleryPatterns];

  const handleUsePattern = (pattern: (typeof patterns)[0]) => {
    setShowConfirmDialog(pattern.id);
  };

  const confirmUsePattern = (pattern: (typeof patterns)[0]) => {
    // Extract the base draft without custom properties
    const { id, name, createdAt, isCustom, ...baseDraft } =
      pattern.draft as any;
    onUploaded(baseDraft);
    setShowConfirmDialog(null);
    navigate("/");
  };

  const handleDeleteCustomDraft = (draftId: string) => {
    if (
      window.confirm("Are you sure you want to delete this custom pattern?")
    ) {
      if (galleryStorage.deleteCustomDraft(draftId)) {
        setCustomDrafts(galleryStorage.getCustomDrafts());
      }
    }
  };

  const handleEditDraftName = (draftId: string, currentName: string) => {
    setEditingDraft(draftId);
    setEditName(currentName);
  };

  const confirmEditName = () => {
    if (editingDraft && editName.trim()) {
      if (galleryStorage.updateCustomDraftName(editingDraft, editName.trim())) {
        setCustomDrafts(galleryStorage.getCustomDrafts());
        setEditingDraft(null);
        setEditName("");
      }
    }
  };

  const cancelEditName = () => {
    setEditingDraft(null);
    setEditName("");
  };

  const handleDownloadPattern = (pattern: (typeof patterns)[0]) => {
    const patternData = {
      ...pattern.draft,
      timestamp: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(patternData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);

    // Create a temporary link element with the pattern name
    const link = document.createElement("a");
    link.href = url;
    link.download = `${pattern.name}.json`;

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Gallery Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-neutral-800">
              Pattern Gallery
            </h2>
            <p className="text-sm text-neutral-600">
              Browse and download community patterns
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate("/")}
              className="btn btn-primary btn-sm"
            >
              Create New
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="flex-1 overflow-auto bg-neutral-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filters */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search patterns..."
                  className="input w-full"
                />
              </div>
              <div className="flex gap-2">
                <select className="input w-32">
                  <option>All Categories</option>
                  <option>Traditional</option>
                  <option>Modern</option>
                  <option>Geometric</option>
                  <option>Floral</option>
                </select>
                <select className="input w-32">
                  <option>Sort by</option>
                  <option>Most Popular</option>
                  <option>Newest</option>
                  <option>Most Downloaded</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pattern Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {patterns.map((pattern) => (
              <div
                key={pattern.id}
                className="card overflow-hidden hover:shadow-md transition-shadow"
              >
                {/* Pattern Thumbnail */}
                <div className="aspect-video">
                  <PatternThumbnail
                    draft={pattern.draft as any}
                    className="w-full h-full"
                  />
                </div>

                {/* Pattern Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-1">
                    {editingDraft === pattern.id ? (
                      <div className="flex-1 mr-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="input input-sm w-full"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === "Enter") confirmEditName();
                            if (e.key === "Escape") cancelEditName();
                          }}
                        />
                      </div>
                    ) : (
                      <h3 className="font-semibold text-neutral-800 flex-1">
                        {pattern.name}
                      </h3>
                    )}
                    {pattern.isCustom && (
                      <div className="flex items-center space-x-1 ml-2">
                        {editingDraft === pattern.id ? (
                          <>
                            <button
                              onClick={confirmEditName}
                              className="btn btn-ghost btn-xs text-green-600 hover:text-green-700"
                              title="Save name"
                            >
                              ✓
                            </button>
                            <button
                              onClick={cancelEditName}
                              className="btn btn-ghost btn-xs text-red-600 hover:text-red-700"
                              title="Cancel"
                            >
                              ✕
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() =>
                                handleEditDraftName(pattern.id, pattern.name)
                              }
                              className="btn btn-ghost btn-xs text-blue-600 hover:text-blue-700"
                              title="Edit name"
                            >
                              <Edit3 size={12} />
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteCustomDraft(pattern.id)
                              }
                              className="btn btn-ghost btn-xs text-red-600 hover:text-red-700"
                              title="Delete pattern"
                            >
                              <Trash2 size={12} />
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-neutral-600 mb-3 line-clamp-2">
                    {pattern.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                    <span>by {pattern.author}</span>
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <Download size={12} className="mr-1" />
                        {pattern.downloads}
                      </span>
                      <span className="flex items-center">
                        <Heart size={12} className="mr-1" />
                        {pattern.likes}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleUsePattern(pattern)}
                      className="btn btn-primary btn-sm flex-1 flex items-center gap-2"
                    >
                      <Play size={14} />
                      Use
                    </button>
                    <button
                      onClick={() => handleDownloadPattern(pattern)}
                      className="btn btn-outline btn-sm flex-1 flex items-center gap-2"
                    >
                      <Download size={14} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <button className="btn btn-outline">Load More Patterns</button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">
              Confirm Pattern Load
            </h3>
            <p className="text-neutral-600 mb-4">
              Are you sure you want to load this pattern? This will replace your
              current pattern in the editor.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmDialog(null)}
                className="btn btn-outline flex-1 h-12"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const pattern = patterns.find(
                    (p) => p.id === showConfirmDialog
                  );
                  if (pattern) confirmUsePattern(pattern);
                }}
                className="btn btn-primary flex-1 h-12"
              >
                Load Pattern
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;
