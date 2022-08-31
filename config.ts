export const getApiUrlForPath = (path: string) =>
  `https://jsonplaceholder.typicode.com${
    path.startsWith("/") ? path : `/${path}`
  }`;
