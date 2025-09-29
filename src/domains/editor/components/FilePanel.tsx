import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { downLoadFile, isJsonString } from "./helpers";
import { isEqual, pick } from "lodash";
import {
  ButtonPrimary,
  ButtonSecondary,
} from "../../../shared/components/ui/Buttons";
import { useDraft } from "../context/DraftContext/useDraft";
import { Input } from "../../../shared/components/ui/input";
import { useNavigate } from "react-router-dom";
import type { Draft } from "./types";

const { VITE_BASE_URL, VITE_HASH_ROUTER } = import.meta.env;
const BASE_URL = VITE_HASH_ROUTER ? "" : VITE_BASE_URL;

const fieldsToSave: (keyof Draft)[] = [
  "fileName",
  "tablets",
  "holes",
  "picks",
  "skews",
  "dirsChanges",
  "paletteOfColors",
];

const HiddenUploadInput = styled.input`
  display: none;
`;

const FilePanel: React.FC = () => {
  const navigate = useNavigate();
  const { draft, paletteOfColors, onUploaded } = useDraft();

  const inputFile = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | undefined>(draft?.fileName);

  useEffect(() => {
    if (draft.fileName !== fileName) setFileName(draft.fileName);
  }, [draft]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    const rawFile = e.target.files?.[0];
    fileReader.readAsText(rawFile!, "UTF-8");
    fileReader.addEventListener("load", (e) => {
      const res = e.target?.result as string;
      const upload = isJsonString(res) && JSON.parse(res);
      if (upload && !isEqual(upload, draft)) {
        upload.fileName = rawFile?.name.replace(".json", "");
        onUploaded(upload);
      }
    });
  };

  const handleDownload = () => {
    const draftToSave = pick(
      { ...draft, fileName, paletteOfColors },
      fieldsToSave
    );
    const draftStr = JSON.stringify(draftToSave);
    downLoadFile(
      [draftStr],
      "application/json",
      `${fileName ?? "my_draft"}.json`
    );
  };

  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    inputFile.current?.click();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFileName(e.target.value);

  return (
    <div
      title="file-panel"
      className="flex flex-col gap-4 p-4 bg-white rounded-md shadow-md"
      role="region"
      aria-labelledby="file-storage-heading"
    >
      <h2 id="file-storage-heading" className="text-xl font-semibold">
        File Storage
      </h2>

      <ButtonSecondary
        className="w-full"
        onClick={() => navigate(`${BASE_URL}/templates`)}
        aria-label="Load template from gallery"
      >
        Load Template
      </ButtonSecondary>

      {/* Open Project Section */}
      <div
        className="flex flex-col gap-2"
        role="group"
        aria-label="Open project"
      >
        <ButtonSecondary
          className="w-full"
          onClick={handleUploadClick}
          aria-label="Open existing project file"
        >
          Open Project
        </ButtonSecondary>
        <HiddenUploadInput
          className="hidden-file-upload-input"
          type="file"
          accept=".json"
          ref={inputFile}
          onChange={handleUpload}
          aria-label="Select project file to upload"
        />
      </div>

      <div
        className="flex flex-col gap-2"
        role="group"
        aria-label="Save project"
      >
        <label htmlFor="project-name-input" className="font-medium">
          Project Name
        </label>
        <Input
          id="project-name-input"
          className="w-full"
          type="text"
          placeholder="Insert project name"
          value={fileName}
          onChange={handleNameChange}
          aria-label="Project name"
          aria-describedby="save-project-button"
        />
        <ButtonPrimary
          id="save-project-button"
          className="w-full"
          onClick={handleDownload}
          aria-label="Save current project"
        >
          Save Project
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default FilePanel;
