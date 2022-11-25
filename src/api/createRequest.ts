const API_TOKEN = () => localStorage.getItem("api_token");

const host =
  process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

const getInitParam = (data: any, method: string) => {
  // eslint-disable-next-line no-undef
  const params: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${API_TOKEN()}`,
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
    .then((res) => {
      if (!res.ok) {
        throw res.json();
      }
      return res.json();
    })
    .then((response) => {
      if (response.error) {
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
