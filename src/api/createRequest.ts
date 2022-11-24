// const API_TOKEN = () => localStorage.getItem("api_token");
const apiToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJ0ZXN0QHRlc3QucnUiLCJfaWQiOiI2MzdlNDIwZmFiYTk3NmI0NGFhZDAyMjYiLCJpYXQiOjE2NjkyMTg4NTAsImV4cCI6MTY3MTgxMDg1MH0.6vvkJmMC7EUa2kJYk6axTbqTSSVTqotSbn7_-dl9nrc";
const host =
  process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

const getInitParam = (data: any, method: string) => {
  // RequestInit
  const params: any = {
    method,
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
  };

  if (data) {
    params.body = JSON.stringify(data);
  }

  return params;
};

const REQUEST = (url: string, method: string, data?: any) =>
  fetch(`${host}${url}`, getInitParam(data, method))
    .then((res) => res.json())
    .then((response) => {
      if (response.error) {
        throw response;
      }

      if (response.statusCode === 429) {
        throw response;
      }

      return response;
    })
    .catch((err) => {
      throw err;
    });

export const GETRequest = <Response>(url: string): Promise<Response> =>
  REQUEST(url, "GET");

export const POSTRequest = <Response>(
  url: string,
  data?: any
): Promise<Response> => REQUEST(url, "POST", data);

export const PATCHRequest = <Response>(
  url: string,
  data: any
): Promise<Response> => REQUEST(url, "PATCH", data);

export const DELETERequest = <Response>(
  url: string,
  data?: any
): Promise<Response> => REQUEST(url, "DELETE", data);
