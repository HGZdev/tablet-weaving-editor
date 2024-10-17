import {serialize} from "cookie";

export const setCookie = (
  name: string,
  value: string,
  expiryHours: number
): string => {
  const expires = new Date();
  expires.setTime(expires.getTime() + expiryHours * 60 * 60 * 1000);

  const cookie = serialize(name, value, {
    expires,
    path: "/",
  });

  document.cookie = cookie;
  return cookie;
};

export const destroyCookie = (name: string): string => {
  const expires = new Date();
  expires.setTime(expires.getTime() - 1);

  const cookie = serialize(name, "", {
    expires,
    path: "/",
  });

  document.cookie = cookie;
  return cookie;
};

export const mockFunc = (n: number): number => n * n;

// export const dateFormatter = (
//   d: Date | string,
//   f: string = "yyyy-MM-dd"
// ): string => {
//   if (!d) return "";
//   const date = new Date(d);
//   if (!isValid(date)) throw new Error(`Date is invalid.`);

//   return format(date, f);
// };

export const isNumeric = (v: string | number): boolean => !isNaN(Number(v));

export const isJsonString = (str: string): boolean => {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
};

/**
 * Method is used to download a file.
 * @param data - Array Buffer data
 * @param type - Type of the document.
 * @param name - Name of the document.
 */
export const downLoadFile = (
  data: ArrayBuffer,
  type: string = "application/json",
  name: string = "newFile"
): void => {
  const blob = new Blob([data], {type: type});
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.download = name;
  a.href = url;
  document.body.append(a);
  a.click();
  a.remove();
  // window.open(url)
};
