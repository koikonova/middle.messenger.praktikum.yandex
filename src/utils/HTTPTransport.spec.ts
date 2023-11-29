import { expect } from 'chai';
import sinon from 'sinon';
import { HTTPTransport } from './HTTPTransport';

describe('HTTPTransport', () => {
  const XHR = sinon.useFakeXMLHttpRequest();

  const requests: sinon.SinonFakeXMLHttpRequest[] = [];

  XHR.onCreate = (xhr) => {
    requests.push(xhr);
  };
  
// @ts-ignore
  global.XMLHttpRequest = XHR;

  afterEach(() => {
    requests.length = 0;
  });

  it('Must request Get using the get method', () => {
    const transport = new HTTPTransport('/path');

    transport.get('/path');

    expect(requests[0].method).to.equal('Get');
  });

  it('Must request Post using the post method', () => {
    const transport = new HTTPTransport('/path');

    transport.post('/url', { data: { test: 'test' } });

    expect(requests[0].method).to.equal('Post');
  });

  it('Must request Delete using the delete method', () => {
    const transport = new HTTPTransport('/path');

    transport.delete('/url', { data: { test: 'test' } });

    expect(requests[0].method).to.equal('Delete');
  });

  it('Must request Put using the put method', () => {
    const transport = new HTTPTransport('/path');

    transport.put('/url', { data: { test: 'test' } });

    expect(requests[0].method).to.equal('Put');
  });
});
