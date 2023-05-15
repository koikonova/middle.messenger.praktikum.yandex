import { expect } from 'chai';
import sinon from 'sinon';
import { HTTPTransport } from './HTTPTransport';

describe('HTTPTransport', () => {
  const XHR = sinon.useFakeXMLHttpRequest();

  const requests: sinon.SinonFakeXMLHttpRequest[] = [];

  XHR.onCreate = (xhr) => {
    requests.push(xhr);
  };
//@ts-ignore
  global.XMLHttpRequest = XHR;

  afterEach(() => {
    requests.length = 0;
  });

  it('Должен запросить Get с помощью метода get', () => {
    const transport = new HTTPTransport('/path');

    transport.get('/path');

    expect(requests[0].method).to.equal('Get');
  });

  it('Должен запросить Post с помощью метода post', () => {
    const transport = new HTTPTransport('/path');

    transport.post('/url', { data: { test: 'test' } });

    expect(requests[0].method).to.equal('Post');
  });

  it('Должен запросить Delete с помощью метода delete', () => {
    const transport = new HTTPTransport('/path');

    transport.delete('/url', { data: { test: 'test' } });

    expect(requests[0].method).to.equal('Delete');
  });

  it('Должен запросить Put с помощью метода put', () => {
    const transport = new HTTPTransport('/path');

    transport.put('/url', { data: { test: 'test' } });

    expect(requests[0].method).to.equal('Put');
  });
});
