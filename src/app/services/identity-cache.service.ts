import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityCacheService {
  private identityMap: Map<string, string> = new Map<string, string>();

  constructor(private httpService: HttpService) {}

  async getNameFromIdAsync(id: string): Promise<string> {
    if (this.identityMap.has(id)) {
      return this.identityMap.get(id);
    }
    try {
      const response = await (
        await this.httpService.getAsyncParams('misc/resolve', { id: id })
      ).json();
      if (response.e == 0) {
        this.identityMap.set(id, response.user.name);
        return response.user.name;
      }
    } catch {}
    return 'Unknown';
  }
}
