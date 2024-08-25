// Root.tsx
import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
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

export const RoutesConfig = (
  <>
    <Route path="/" element={<LandingPage />} errorElement={<ErrorPage />} />
    <Route path="/editor" element={<Editor />} />
    {/* <Route path="/templates" element={<Templates />} /> */}
    {/* <Route path="/" element={<PublicRoute Component={LandingPage} />} errorElement={<ErrorPage />}/> */}
    {/* <Route path="/gallery" element={<PrivateRoute Component={Gallery} />} /> */}
    <Route path="*" element={<ErrorPage />} />
  </>
);

const router = createBrowserRouter(createRoutesFromElements(RoutesConfig));

const Root: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{import.meta.env.VITE_APP_NAME}</title>
        <link rel="icon" type="image/png" href="/assets/favicon.png" />
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
