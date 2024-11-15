import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "./Pages/Public/LandingPage.tsx";
import ErrorPage from "./Pages/Public/ErrorPage.tsx";
import {makeApolloProvider} from "../../lib/apollo/ApolloClient.tsx";
import GlobalStyles from "../styles/GlobalStyles.ts";
import Editor from "./Pages/Public/Editor/Editor.tsx";
import {DraftProvider} from "./Pages/Public/Editor/DraftContext/DraftContextProvider.tsx";
import About from "./Pages/Public/About.tsx";
import Templates from "./Pages/Public/Templates.tsx";
import Metadata from "./Components/Metadata.tsx";
import WrapRoute from "./Components/WrapRoute.tsx";
import {GoogleAnalyticsProvider} from "../../lib/GoogleAnalytics";
import ReactConsentBanner from "./Components/ReactConsentBanner.tsx";

export const ApolloProvider = makeApolloProvider(import.meta.env);

const {VITE_BASE_URL, VITE_APP_NAME, VITE_HASH_ROUTER, VITE_GA_TOKEN} =
  import.meta.env;
const BASE_URL = VITE_HASH_ROUTER ? "" : VITE_BASE_URL;

export const RoutesConfig = (
  <>
    <Route element={<WrapRoute />}>
      <Route
        path={`${BASE_URL}/`}
        element={<LandingPage />}
        errorElement={<ErrorPage />}
      />
      <Route path={`${BASE_URL}/editor`} element={<Editor />} />
      <Route path={`${BASE_URL}/templates`} element={<Templates />} />
      <Route path={`${BASE_URL}/about`} element={<About />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  </>
);

const routes = createRoutesFromElements(RoutesConfig);

// Hash router for GitHub Pages
const router =
  VITE_HASH_ROUTER === "true"
    ? createHashRouter(routes)
    : createBrowserRouter(routes);

const Root: React.FC = () => {
  if (!VITE_BASE_URL) throw new Error("root: VITE_BASE_URL is undefined");
  if (!VITE_APP_NAME) throw new Error("root: VITE_APP_NAME is undefined");

  return (
    <>
      <Metadata />
      <ApolloProvider>
        <DraftProvider>
          <GoogleAnalyticsProvider
            measurementId={VITE_GA_TOKEN}
            ConsentBanner={ReactConsentBanner}
          >
            <GlobalStyles />
            <RouterProvider
              router={router}
              future={{v7_startTransition: true}}
            />
          </GoogleAnalyticsProvider>
        </DraftProvider>
      </ApolloProvider>
    </>
  );
};

export default Root;
