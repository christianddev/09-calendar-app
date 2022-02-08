import { customFetch, customFetchToken } from "../../helpers/fetch";

describe("fetch.js", () => {

  let token = ''


  test("should call customFetch", async () => {
    const response = await customFetch(
      "auth",
      { email: "1@email.com", password: "123123" },
      "POST"
    );

    expect(response instanceof Response).toBe(true);
    const body = await response.json();
    expect(body?.ok).toBe(true);
    token = body?.token
  });

  test("should call customFetchToken with token", async () => {
    localStorage.setItem("token", token)
    const response = await customFetchToken(
      "events/61f8e40deba003a4ae20a8f1", {},
      'DELETE'
    );

    expect(response instanceof Response).toBe(true);
    const body = await response.json();
    expect(body?.errors?.event?.msg).toEqual('event not found');
  });

  test("should call customFetchToken without token", async () => {
    localStorage.setItem("token", '')
    const response = await customFetchToken(
      "events/61f8e40deba003a4ae20a8f1", {},
      'DELETE'
    );

    expect(response instanceof Response).toBe(true);
    const body = await response.json();
    expect(body?.errors?.token?.msg).toEqual('send request token');
  });
});
