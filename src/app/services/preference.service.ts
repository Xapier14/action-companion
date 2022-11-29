import { Injectable, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root',
})
export class PreferenceService {
  constructor() {
    this.getAsync('rememberLogin').then((val) => {
      if (val === null) {
        this.setAsync('rememberLogin', 'true');
      }
    });
  }

  async getAsync(key: string): Promise<string> {
    const result = await Preferences.get({ key: key });
    return result.value;
  }
  async setAsync(key: string, value: string): Promise<void> {
    await Preferences.set({ key: key, value: value });
  }
}
