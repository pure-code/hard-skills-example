// export const host = 'https://randomuser.me/'

export const host = 'https://rickandmortyapi.com/api/';

const request = (url: string, method: string) =>
  fetch(`${host}${url}`, { method })
    .then((res) => res.json())
    .then(({ results }) => results)
    .catch((err) => {
      throw err;
    });

export const GETRequest = <Response>(url: string): Promise<Response> =>
  request(url, 'GET');
