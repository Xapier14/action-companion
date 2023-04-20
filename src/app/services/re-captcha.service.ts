import { Injectable } from '@angular/core';
import { load, ReCaptchaInstance } from 'recaptcha-v3';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReCaptchaService {
  private recaptchaInstance: ReCaptchaInstance;

  constructor() {}

  async load() {
    return await load(environment.recaptchaKey, {
      useRecaptchaNet: true,
      useEnterprise: true,
    });
  }

  showBadge() {
    this.recaptchaInstance.showBadge();
  }

  hideBadge() {
    this.recaptchaInstance.hideBadge();
  }

  async getToken(action: string) {
    return await this.recaptchaInstance.execute(action);
  }
}
