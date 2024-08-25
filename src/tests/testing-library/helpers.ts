import {screen} from "@testing-library/react";

export const findByAriaRoleAndName = async (name: string | RegExp) =>
  await screen.findByRole("button", {name});

export const findByText = async (text: string | RegExp) =>
  await screen.findByText(text);

export const findByAltText = async (text: string | RegExp) =>
  await screen.findByAltText(text);

export const findByTitle = async (title: string) =>
  await screen.findByTitle(title);
export const findAllByTitle = async (title: string) =>
  await screen.findAllByTitle(title);

export const findById = async (id: string | RegExp) =>
  await screen.findByTestId(id);
