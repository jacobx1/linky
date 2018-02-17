import * as Request from 'request-promise';
import { environment } from '../environments/environment';

const { protocol, host, port } = window.location;
const DefaultBase = `${protocol}//${host}/api`;

export default Request.defaults({
  baseUrl: environment.production ? DefaultBase : 'http://localhost:8080/api',
  withCredentials: true,
  resolveWithFullResponse: true
});
