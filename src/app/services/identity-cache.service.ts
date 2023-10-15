import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityCacheService {
  private identityMap: Map<string, string[]> = new Map<string, string[]>();

  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  private async resolveUserAsync(id: string): Promise<string[]> {
    if (this.identityMap.has(id)) {
      return this.identityMap.get(id);
    }
    try {
      const token = await this.authService.getTokenAsync();
      const response = await this.httpService.getAsyncParams(
        'misc/resolve',
        { id: id },
        token
      );
      if (response.e == 0) {
        const data = [
          response.user.firstName,
          response.user.lastName,
          response.user.location,
        ];
        this.identityMap.set(id, data);
        return data;
      }
    } catch {}
    return null;
  }

  async getNameFromIdAsync(id: string): Promise<string[]> {
    const data = await this.resolveUserAsync(id);
    if (!data) return ['Unknown', 'User'];
    return [data[0], data[1]];
  }

  async getLocationFromIdAsync(id: string): Promise<string> {
    const data = await this.resolveUserAsync(id);
    if (!data) return 'Unknown Location';
    return data[2];
  }
}
