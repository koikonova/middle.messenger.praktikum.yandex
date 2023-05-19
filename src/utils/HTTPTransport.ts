export enum Method {
  // eslint-disable-next-line no-unused-vars
  Get = 'Get',
  // eslint-disable-next-line no-unused-vars
  Post = 'Post',
  // eslint-disable-next-line no-unused-vars
  Put = 'Put',
  // eslint-disable-next-line no-unused-vars
  Patch = 'Patch',
  // eslint-disable-next-line no-unused-vars
  Delete = 'Delete'
}

type Options = {
  method: Method;
  data?: any;
};

// eslint-disable-next-line no-unused-vars
type HTTPMethod = (path: string, data?: unknown) => Promise<unknown>;

function queryStringify(data: any) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`
  }

  public get: HTTPMethod = (path, data) => {
    return this.request(this.endpoint + path,{
      method: Method.Get,
      data,
      });
  };

  public post: HTTPMethod = (path, data) => {
    return this.request(this.endpoint + path,{
      method: Method.Post,
      data,
    });
  };

  public put: HTTPMethod = (path, data) => {
    return this.request(this.endpoint + path,{
      method: Method.Put,
      data,
    });
  };

  public patch: HTTPMethod = (path, data) => {
    return this.request(this.endpoint + path,{
      method: Method.Patch,
      data,
    });
  };

  public delete: HTTPMethod = (path, data) => {
    return this.request(this.endpoint + path,{
      method: Method.Delete,
      data,
    });
  };

  private request<Response>(url: string, options: Options = { method: Method.Get }): Promise<Response> {
    const { method, data } = options

    if (method === Method.Get && data) {
      url = url + queryStringify(data);
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.open(method, url)

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response)
          } else {
            reject(xhr.response)
          }
        }
      }

      xhr.onabort = () => reject({ reason: 'abort' })
      xhr.onerror = () => reject({ reason: 'network error' })
      xhr.ontimeout = () => reject({ reason: 'timeout' })
      if (!(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json')
      }
      xhr.withCredentials = true
      xhr.responseType = 'json'

      if (method === Method.Get || !data) {
        xhr.send()
      } else {
        xhr.send(data instanceof FormData ? data : JSON.stringify(data))
      }
    })
  }
}
