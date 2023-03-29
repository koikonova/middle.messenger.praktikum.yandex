export enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

type Options = {
  method: Method;
  data?: any;
};

function queryStringify(data) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

class HTTPTransport {
  get = (url: string, options: Options) => {
    return this.request(
      url,
      { ...options, method: Method.GET },
    );
  };

  put = (url: string, options: Options) => {
    return this.request(
      url,
      { ...options, method: Method.PUT },
    );
  };

  post = (url: string, options: Options) => {
    return this.request(
      url,
      { ...options, method: Method.POST },
    );
  };

  delete = (url: string, options: Options) => {
    return this.request(
      url,
      { ...options, method: Method.DELETE },
    );
  };

  request = (url: string, options: Options) => {
    const { method, data } = options;

    if (method === Method.GET && data) {
      url = url + queryStringify(data);
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (!method) {
        reject('Нет метода');
      }

      xhr.open(method, url);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Method.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
