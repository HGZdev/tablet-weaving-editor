import {useEffect} from "react";
import {Outlet, useLocation} from "react-router-dom";

const ScrollToTop: React.FC = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const ScrollToTopRoute: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default ScrollToTopRoute;
