import React from "react";
import {useNavigate} from "react-router-dom";
import {
  // ButtonAccent,
  ButtonPrimary,
  // ButtonSecondary,
} from "../../Components/Buttons";
import styled from "styled-components";

const Container = styled.div`
  ::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("/images/pexels-karolina-grabowska-4219654.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: blur(5px); /* Adjust the blur amount as needed */
    z-index: -1;
  }
`;

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container
      data-testid="LandingPage"
      className=" flex flex-col items-center justify-center h-screen p-2"
    >
      <div className="flex flex-col bg-white px-12 py-8 gap-8 rounded-lg shadow-2xl">
        <h2 className="text-6xl font-sans text-center">
          Keep calm and weave the belt!
        </h2>
        <div className="flex justify-center gap-4">
          <ButtonPrimary
            className=""
            onClick={() => navigate("/editor")}
            aria-label="Editor"
          >
            Create new pattern
          </ButtonPrimary>
          {/* <ButtonSecondary
            className=""
            onClick={() => navigate("/templates")}
            aria-label="Templates"
          >
            Use template
          </ButtonSecondary>
          <ButtonAccent
            className=""
            onClick={() => navigate("/gallery")}
            aria-label="Gallery"
          >
            Load your pattern
          </ButtonAccent> */}
        </div>
      </div>
    </Container>
  );
};

export default LandingPage;
