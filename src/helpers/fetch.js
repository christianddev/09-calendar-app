const baseUrl = process.env.REACT_APP_API;

export const customFetch = (endpoint, data, method = "GET") => {
  const url = `${baseUrl}/${endpoint}`;

  if (method === "GET") {
    return fetch(url);
  }

  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    method,
  });
};

export const customFetchToken = (endpoint, data, method = "GET") => {
  const token = localStorage.getItem("token") ?? "";
  const url = `${baseUrl}/${endpoint}`;

  if (method === "GET") {
    return fetch(url, {
      method,
      headers: {
        "x-token": token,
      },
    });
  }

  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
    body: JSON.stringify(data),
    method,
  });
};
