import styled from "styled-components";

const {VITE_BASE_URL} = import.meta.env;

const BgContainer = styled.div<{}>`
  position: relative;

  background-image: url(${VITE_BASE_URL}/images/bgImage.jpg);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

export default BgContainer;
