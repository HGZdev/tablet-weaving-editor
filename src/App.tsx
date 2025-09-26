import { Routes, Route } from "react-router-dom";
import MainLayout from "./shared/components/layout/MainLayout";
import EditorPage from "./domains/editor/pages/EditorPage";
import GalleryPage from "./domains/gallery/pages/GalleryPage";
import HelpPage from "./domains/help/pages/HelpPage";
import { DraftProvider } from "./domains/editor/context/DraftContext/DraftContextProvider";

function App() {
  return (
    <div className="min-h-screen bg-neutral-100">
      <DraftProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<EditorPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="help" element={<HelpPage />} />
          </Route>
        </Routes>
      </DraftProvider>
    </div>
  );
}

export default App;
