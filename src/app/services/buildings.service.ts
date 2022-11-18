import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class BuildingsService {
  private buildingMap: Map<string, string> = new Map<string, string>();

  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  async updateBuildingCache(location: string) {
    const token = await this.authService.getTokenAsync();
    const response = await (
      await this.httpService.getAsyncParams(
        'buildings/list',
        {
          location: location,
        },
        token
      )
    ).json();
    if (response.e == 0) {
      const buildings = response.buildings;
      this.buildingMap.clear();
      for (let i = 0; i < buildings.length; i++) {
        this.buildingMap.set(buildings[i].name, buildings[i].id);
      }
      console.log(
        `Building cache updated for location ${location}, ${this.buildingMap.size} buildings found.`
      );
    } else {
      console.log(response);
    }
  }

  getBuildingNameList(): string[] {
    return Array.from(this.buildingMap.keys());
  }

  getBuildingId(name: string): string {
    return this.buildingMap.get(name);
  }

  getBuildingName(id: string): string {
    if (this.buildingMap.size == 0) return 'Unknown';
    const name = Array.from(this.buildingMap.keys()).find(
      (key) => this.buildingMap.get(key) === id
    );
    return name;
  }
}
