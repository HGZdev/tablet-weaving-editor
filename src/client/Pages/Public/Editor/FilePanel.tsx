import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {downLoadFile, isJsonString} from "./helpers";
import {isEqual, pick} from "lodash";
import draft1 from "./__fixtures__/draft1";
import draft2 from "./__fixtures__/draft2";
import draft3 from "./__fixtures__/draft3";
import {ButtonPrimary, ButtonSecondary} from "../../../Components/Buttons";
import {useDraft} from "./DraftContext/useDraft";

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
  const {draft, paletteOfColors, onUploaded} = useDraft();

  const inputFile = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | undefined>(draft?.fileName);

  useEffect(() => {
    if (draft.fileName !== fileName) setFileName(draft.fileName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {...draft, fileName, paletteOfColors},
      fieldsToSave
    );
    const draftStr = JSON.stringify(draftToSave);
    downLoadFile([draftStr], "application/json", `${fileName || "draft"}.json`);
  };

  const handleUploadClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    inputFile.current?.click();
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFileName(e.target.value);

  const handleExampleDraftUpload = (draft: Draft) => onUploaded(draft);

  return (
    <div title="file-panel">
      <div className="flex gap-2">
        <div>
          <HiddenUploadInput
            className="hidden-file-upload-input"
            id={`file-input-${Date.now()}`}
            type="file"
            accept=".json"
            ref={inputFile}
            onChange={handleUpload}
          />
          <input
            className="file-upload-input input input-bordered input-sm rounded-none"
            type="text"
            name="File name"
            value={fileName}
            onChange={handleNameChange}
          />
        </div>
        <div className="flex gap-2">
          <ButtonSecondary
            className="file-upload-button"
            onClick={handleDownload}
          >
            Save project
          </ButtonSecondary>
          <ButtonPrimary onClick={handleUploadClick}>Open</ButtonPrimary>
        </div>
      </div>
      <div className="flex  gap-2 py-4">
        <span> Examples:</span>

        <button onClick={() => handleExampleDraftUpload(draft1 as Draft)}>
          draft 1
        </button>
        <button onClick={() => handleExampleDraftUpload(draft2 as Draft)}>
          draft 2
        </button>
        <button onClick={() => handleExampleDraftUpload(draft3 as Draft)}>
          draft 3
        </button>
      </div>
    </div>
  );
};

export default FilePanel;
