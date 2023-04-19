import { Injectable } from '@angular/core';
import { ReCaptchaInstance, load } from 'recaptcha-v3';
import { environment } from 'src/environments/environment';

interface grecaptcha {
  getResponse(): string;
  reset(): void;
  render(container: string, parameters: any): void;
  render(container: string, parameters: any, action: any): void;
  ready(callback: () => void): void;
}
@Injectable({
  providedIn: 'root',
})
export class RecaptchaService {
  private recaptcha: ReCaptchaInstance | undefined;

  constructor() {}

  async load(): Promise<void> {
    if (this.recaptcha) {
      return;
    }
    this.recaptcha = await load(environment.recaptchaKey, {
      useRecaptchaNet: true,
      useEnterprise: true,
    });
  }

  async getToken(action: string): Promise<string> {
    if (this.recaptcha) {
      return await this.recaptcha.execute(action);
    } else {
      return '';
    }
  }

  showBadge(): void {
    if (this.recaptcha) {
      this.recaptcha.showBadge();
    }
  }

  hideBadge(): void {
    if (this.recaptcha) {
      this.recaptcha.hideBadge();
    }
  }

  ready(callback: () => void): void {
    const instance = <grecaptcha>(<unknown>window.grecaptcha.enterprise);
    instance.ready(callback);
  }
}
