/**
 * @module fetcho
 * @description Module for making HTTP requests using fetch as a base.
 * @version 1.0
 */

/**
 * Asynchronous function for making HTTP requests using fetch.
 *
 * @param {Object} params - Object containing the parameters for the request.
 * @param {string} params.url - The URL to which the request will be made.
 * @param {string} params.method - The HTTP method to use (GET, POST, etc.).
 * @param {Object} [params.body] - The body of the request, if necessary.
 * @param {boolean} [params.isCors=false] - Indicates whether the request should be made with CORS.
 * @returns {Promise<Object | boolean>} - Returns a promise that resolves with the response data, or false if an error occurs.
 * @throws {Error} - Throws an error if the response is not correct.
 */

interface FetchoParams {
  url: string;
  method: string;
  body?: object;
  isCors?: boolean;
}

const fetcho = async ({ url, method, body, isCors = false }: FetchoParams): Promise<object | boolean> => {
  try {
    const configPost: RequestInit = {
      method: "POST",
      credentials: "include",
      mode: isCors ? "cors" : "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const configGet: RequestInit = {
      method: "GET",
      mode: isCors ? "cors" : "no-cors",
    };

    const config: RequestInit = method.toLowerCase() === "post" ? configPost : configGet;

    const response = await fetch(url, config);

    if (!response.ok) throw new Error(`The response is not correct, the status is ${response.status}`);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error(`An error occurred while making a fetch request, where the URL was ${url} and the error was ${(error as Error).message}`);
    return false;
  }
};

export default fetcho;