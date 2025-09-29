import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import React from "react";

export const findByTitle = async (title: string) => {
  return await screen.findByTitle(title);
};

export const getByTitle = (title: string) => {
  return screen.getByTitle(title);
};

export const queryByTitle = (title: string) => {
  return screen.queryByTitle(title);
};

export const findByText = async (text: string) => {
  return await screen.findByText(text);
};

export const getByText = (text: string) => {
  return screen.getByText(text);
};

export const queryByText = (text: string) => {
  return screen.queryByText(text);
};

export const renderWithRouter = (
  component: React.ReactElement,
  initialRoute = "/editor"
) => {
  return render(
    <MemoryRouter
      initialEntries={[initialRoute]}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {component}
    </MemoryRouter>
  );
};
