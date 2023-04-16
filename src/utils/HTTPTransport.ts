export enum Method {
  // eslint-disable-next-line no-unused-vars
  GET = 'GET',
  // eslint-disable-next-line no-unused-vars
  POST = 'POST',
  // eslint-disable-next-line no-unused-vars
  PUT = 'PUT',
  // eslint-disable-next-line no-unused-vars
  DELETE = 'DELETE'
}

interface Options {
  method: Method;
  data?: unknown;
}

// eslint-disable-next-line no-unused-vars
type HTTPMethod = (url: string, options?: Options) => Promise<unknown>;

export function queryStringify(data) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  get: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: Method.GET });
  }

  put: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: Method.PUT });
  }

  post: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: Method.POST });
  }

  delete: HTTPMethod = (url) => {
    return this.request(url, { method: Method.DELETE });
  }

  request: HTTPMethod = (url, options = { method: Method.GET }) => {
    const { headers, data, method } = options;

    if (method === Method.GET && data) {
      url = url + queryStringify(data);
    }

    const isFormData = headers?.["Content-Type"] === "multipart/form-data";

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (!method) {
        reject('Нет метода');
      }

      xhr.open(method || Method.GET, `${this.endpoint}${url}`);

      if (!isFormData) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      if (headers) {
        Object.entries(headers).forEach((item) => {
          const [key, value] = item;
          if (!isFormData) {
            xhr.setRequestHeader(key, value);
          }
        });
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject({ reason: "abort" });
      xhr.onerror = () => reject({ reason: "network error" });
      xhr.ontimeout = () => reject({ reason: "timeout" });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Method.GET || !data) {
        xhr.send();
      } else if (isFormData) {
        xhr.send(data as XMLHttpRequestBodyInit);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
