import {Outlet} from "react-router-dom";
import {useTrackPageViewsInGA} from "../../../lib/GoogleAnalytics";
import ScrollToTop from "./ScrollToTop";

const WrapRoute: React.FC = () => {
  useTrackPageViewsInGA();
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
};

export default WrapRoute;
