import * as Request from 'request-promise';
import { environment } from '../environments/environment';
import { Response } from 'request';

const { protocol, host, port } = window.location;
const DefaultBase = `${protocol}//${host}/api`;

export const LinkyClient = Request.defaults({
  baseUrl: environment.production ? DefaultBase : 'http://localhost:8080/api',
  withCredentials: true,
  resolveWithFullResponse: true,
});

export function handleRequestReject(resp) {
  if (resp) {
    const { statusCode } = resp;

    if (statusCode === 401) {
      window.location.href = '/login';
    } else if (statusCode === 403) {
      window.location.href = '/verify';
    } else {
      console.warn(statusCode);
    }

    throw 'Bad request';
  }

  return resp;
}
