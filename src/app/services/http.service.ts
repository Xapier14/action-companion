import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor() {}

  async postJsonAsync(route: string, data: object, token?: string) {
    const endpoint = environment.apiHost + '/' + route;
    return (
      await CapacitorHttp.post({
        url: endpoint,
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
    ).data;
  }

  async postEncodedObjectAsync(route: string, data: object, token?: string) {
    const urlSearchParams = new URLSearchParams();
    for (const key in data) {
      urlSearchParams.append(key, data[key]);
    }
    return await this.postEncodedAsync(route, urlSearchParams, token);
  }

  async postEncodedAsync(route: string, data: URLSearchParams, token?: string) {
    const endpoint = environment.apiHost + '/' + route;
    return await CapacitorHttp.post({
      url: endpoint,
      data: data.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: token,
      },
    });
  }

  async postFormDataAsync(
    route: string,
    data: FormData,
    token?: string,
    contentType: string | undefined = 'multipart/form-data'
  ) {
    const endpoint = environment.apiHost + '/' + route;
    console.log(data);
    if (contentType == null || contentType == undefined) {
      console.log('sent without content type');
      return (
        await CapacitorHttp.post({
          url: endpoint,
          data: data,
          headers: {
            Authorization: token,
          },
        })
      ).data;
    }
    console.log('sent with content type');
    return (
      await CapacitorHttp.post({
        url: endpoint,
        data: data,
        headers: {
          'Content-Type': contentType,
          Authorization: token,
        },
      })
    ).data;
  }

  async getAsync(route: string, data?: URLSearchParams, token?: string) {
    const endpoint =
      environment.apiHost + '/' + route + (data ? `?${data}` : '');
    return (
      await CapacitorHttp.get({
        url: endpoint,
        headers: {
          Authorization: token,
        },
      })
    ).data;
  }

  async getAsyncParams(route: string, query?: object, token?: string) {
    const endpoint =
      environment.apiHost +
      '/' +
      route +
      (query ? `?${this.queryString(query)}` : '');
    return (
      await CapacitorHttp.get({
        url: endpoint,
        headers: {
          Authorization: token,
        },
      })
    ).data;
  }

  private queryString(query: object) {
    if (!query) return '';
    return Object.keys(query)
      .map((key) => key + '=' + query[key])
      .join('&');
  }
}
