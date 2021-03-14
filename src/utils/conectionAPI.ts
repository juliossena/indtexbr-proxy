import Axios from 'axios';
import * as Constants from './requests';

export const headerRequests = () => ({
  'Content-Type': 'application/json',
});

export default class Connect {
  static async call (url: string, method: string, body: object) {
    let answer;
    let config = {};
    const headers = headerRequests();

    try {
      config = {
        headers,
      };
    } catch (e) {
      config = {};
    }

    switch (method) {
      case Constants.GET:
        answer = Axios.get(url, config);
        break;
      case Constants.POST:
        answer = Axios.post(url, body, config);
        break;
      case Constants.DELETE:
        answer = Axios.delete(url, config);
        break;
      case Constants.PUT:
        answer = Axios.put(url, body, config);
        break;
      case Constants.PATCH:
        answer = Axios.patch(url, body, config);
        break;
      default:
        answer = Axios.get(url, config);
        break;
    }

    return answer;
  }

  static async connect (url: string, method: string, body: object) {
    return Connect.call(url, method, body);
  }
}

export async function ConnectApiPost (url: string, body: object) {
  return Connect.connect(url, Constants.POST, body);
}

export async function ConnectApiPUT (url: string, body: object) {
  return Connect.connect(url, Constants.PUT, body);
}

export async function ConnectApiPatch (url: string, body: object) {
  return Connect.connect(url, Constants.PATCH, body);
}

export async function ConnectApiGet (url: string) {
  return Connect.connect(url, Constants.GET, {});
}

export async function ConnectApiDelete (url: string) {
  return Connect.connect(url, Constants.DELETE, {});
}
