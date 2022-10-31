import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() { }

  async postJsonAsync(route: string, data: object, token?: string) {
    const endpoint = environment.apiHost + "/" + route;
    return await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(data)
    });
  }

  async postEncodedAsync(route: string, data: URLSearchParams, token?: string) {
    const endpoint = environment.apiHost + "/" + route;
    return await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': token
      },
      body: data
    });
  }

  async getAsync(route: string, data?: URLSearchParams, token?: string) {
    const endpoint = environment.apiHost + "/" + route + `?${data}`;
    return await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': token
      },
    });
  }
}
