import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpService: HttpService) {}

  async tryLogin(email: string, password: string) {
    const data = new URLSearchParams();
    data.append('email', email);
    data.append('password', password);
    const response = await (
      await this.httpService.postEncodedAsync('login', data)
    ).json();
    if (response.e == 0) {
      const token = response.token;
      await Preferences.set({ key: 'token', value: token });
    }
    return response;
  }

  async checkToken(token: string, clearIfInvalid: boolean = false) {
    const response = await (
      await this.httpService.getAsync('check', undefined, token)
    ).json();

    if (clearIfInvalid && response?.sessionState != 'validSession')
      await Preferences.remove({ key: 'token' });

    return response;
  }

  async getTokenAsync() {
    const token = await Preferences.get({ key: 'token' });
    return token.value;
  }

  async hasStoredToken() {
    const token = await Preferences.get({ key: 'token' });
    return token.value != null;
  }

  async checkTokenFromPreferences(clearIfInvalid: boolean = false) {
    const token = await Preferences.get({ key: 'token' });
    return await this.checkToken(token.value, clearIfInvalid);
  }

  async logout() {
    // add logout logic here
    const token = await Preferences.get({ key: 'token' });
    await this.httpService.postJsonAsync('logout', undefined, token.value);
    await Preferences.remove({ key: 'token' });
  }
}
