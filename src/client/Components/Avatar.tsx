import styled from "styled-components";
const {VITE_BASE_URL} = import.meta.env;

const Img = styled("img")`
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
`;

export const Avatar = ({
  className = "w-60 rounded-full",
}: {
  className?: string;
}) => {
  return (
    <div className="avatar">
      <div className={className}>
        <Img alt="avatar" src={`${VITE_BASE_URL}/favicon.ico`} />
      </div>
    </div>
  );
};

export const MiniAvatar = ({
  className = "w-12 rounded-full",
}: {
  className?: string;
}) => {
  return (
    <div className="avatar">
      <div className={className}>
        <img alt="avatar" src={`${VITE_BASE_URL}/favicon.ico`} />
      </div>
    </div>
  );
};
