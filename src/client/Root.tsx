// Root.tsx
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
  createRoutesFromElements,
} from "react-router-dom";
import LandingPage from "./Pages/Public/LandingPage.tsx";
import {Helmet} from "react-helmet";
import ErrorPage from "./Pages/Public/ErrorPage.tsx";
import {makeApolloProvider} from "../../lib/apollo/ApolloClient.tsx";
import GlobalStyles from "../styles/GlobalStyles.ts";
import Editor from "./Pages/Public/Editor/Editor.tsx";
import {DraftProvider} from "./Pages/Public/Editor/DraftContext/DraftContextProvider.tsx";

export const ApolloProvider = makeApolloProvider(import.meta.env);

const {VITE_BASE_URL, VITE_APP_NAME, VITE_HASH_ROUTER} = import.meta.env;
const BASE_URL = VITE_HASH_ROUTER ? "" : VITE_BASE_URL;

export const RoutesConfig = (
  <>
    <Route
      path={`${BASE_URL}/`}
      element={<LandingPage />}
      errorElement={<ErrorPage />}
    />
    <Route path={`${BASE_URL}/editor`} element={<Editor />} />
    {/* <Route path={`${BASE_URL}/templates`} element={<Templates />} /> */}
    {/* <Route path={`${BASE_URL}/gallery`} element={<PrivateRoute Component={Gallery} />} /> */}
    <Route path="*" element={<ErrorPage />} />
  </>
);

const routes = createRoutesFromElements(RoutesConfig);

// Hash router for Github Pages
const router =
  VITE_HASH_ROUTER === "true"
    ? createHashRouter(routes)
    : createBrowserRouter(routes);

const Root: React.FC = () => {
  if (!VITE_BASE_URL) throw new Error("root: VITE_BASE_URL is undefined");
  if (!VITE_APP_NAME) throw new Error("root: VITE_APP_NAME is undefined");
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{VITE_APP_NAME}</title>
        <link
          rel="icon"
          type="image/png"
          href={`${VITE_BASE_URL}/favicon.ico`}
        />
      </Helmet>
      <ApolloProvider>
        <DraftProvider>
          <GlobalStyles />
          <RouterProvider router={router} future={{v7_startTransition: true}} />
        </DraftProvider>
      </ApolloProvider>
    </>
  );
};

export default Root;
