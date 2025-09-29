import { screen } from "@testing-library/react";

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
