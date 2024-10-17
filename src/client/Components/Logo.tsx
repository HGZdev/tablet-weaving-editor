const {VITE_BASE_URL} = import.meta.env;

const Logo = ({className}: {className?: string}) => {
  return (
    <span>
      <img className={className} src={`${VITE_BASE_URL}/favicon.ico`} />
    </span>
  );
};

export default Logo;
