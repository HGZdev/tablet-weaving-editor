import React from "react";
import {useNavigate} from "react-router-dom";
import {ButtonPrimary, ButtonSecondary} from "../../Components/Buttons";
import BgContainer from "../../Components/BgContainer";
const {VITE_BASE_URL, VITE_HASH_ROUTER} = import.meta.env;

const BASE_URL = VITE_HASH_ROUTER ? "" : VITE_BASE_URL;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <BgContainer data-testid="LandingPage">
      <div
        style={{backgroundColor: "rgba(255, 255, 255, 0.3)"}}
        className="relative flex flex-col items-center justify-center h-screen p-2 "
      >
        <div className="flex flex-col bg-white px-4 md:px-12 py-8 gap-8 rounded-lg shadow-2xl">
          <h1 className="text-5xl md:text-6xl font-sans text-center">
            Keep Calm and Weave the Belt! 🧶
          </h1>
          <div className="flex justify-center gap-4">
            <ButtonPrimary
              onClick={() => navigate(`${BASE_URL}/editor`)}
              aria-label="Editor"
            >
              Create new pattern
            </ButtonPrimary>
            <ButtonSecondary
              onClick={() => navigate(`${BASE_URL}/templates`)}
              aria-label="Templates"
            >
              Load template
            </ButtonSecondary>
          </div>
        </div>
      </div>
    </BgContainer>
  );
};

export default LandingPage;
