// Service for managing custom drafts in local storage
import { Draft } from "../../editor/components/types";

export interface CustomDraft extends Draft<number, number, number> {
  id: string;
  name: string;
  createdAt: string;
  isCustom: true;
}

const STORAGE_KEY = "tablet-weaving-custom-drafts";

export const galleryStorage = {
  // Get all custom drafts from local storage
  getCustomDrafts(): CustomDraft[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Error loading custom drafts:", error);
      return [];
    }
  },

  // Save a custom draft to local storage
  saveCustomDraft(draft: Draft, name: string): CustomDraft {
    const customDraft: CustomDraft = {
      ...draft,
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      createdAt: new Date().toISOString(),
      isCustom: true,
    };

    const existingDrafts = this.getCustomDrafts();
    const updatedDrafts = [...existingDrafts, customDraft];

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDrafts));
      return customDraft;
    } catch (error) {
      console.error("Error saving custom draft:", error);
      throw new Error("Failed to save draft to gallery");
    }
  },

  // Delete a custom draft from local storage
  deleteCustomDraft(id: string): boolean {
    try {
      const existingDrafts = this.getCustomDrafts();
      const updatedDrafts = existingDrafts.filter((draft) => draft.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDrafts));
      return true;
    } catch (error) {
      console.error("Error deleting custom draft:", error);
      return false;
    }
  },

  // Update a custom draft name
  updateCustomDraftName(id: string, newName: string): boolean {
    try {
      const existingDrafts = this.getCustomDrafts();
      const updatedDrafts = existingDrafts.map((draft) =>
        draft.id === id ? { ...draft, name: newName } : draft
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDrafts));
      return true;
    } catch (error) {
      console.error("Error updating custom draft name:", error);
      return false;
    }
  },

  // Check if storage is available
  isStorageAvailable(): boolean {
    try {
      const test = "__storage_test__";
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  },
};
