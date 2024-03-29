import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class BuildingsService {
  private buildingMap: Map<string, Map<string, string>> = new Map<
    string,
    Map<string, string>
  >();
  private currentLocation: string = '';

  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {}
  async getCurrentLocationAsync(): Promise<string> {
    if (this.currentLocation == '') {
      const token = await this.authService.checkTokenFromPreferences();
      if (!token || token.sessionState != 'validSession') return '';
      this.currentLocation = token.location;
    }
    return this.currentLocation;
  }
  async setCurrentLocationAsync(location: string) {
    this.currentLocation = location;
    await this.updateBuildingCacheAsync();
  }
  async updateBuildingCacheAsync(location?: string) {
    const targetLocation = location ?? this.currentLocation;
    if (targetLocation == '') return;
    console.log('Updating for location: ' + targetLocation);
    if (!this.buildingMap.has(targetLocation))
      this.buildingMap.set(targetLocation, new Map<string, string>());
    const token = await this.authService.getTokenAsync();
    const response = await this.httpService.getAsyncParams(
      'buildings/list',
      {
        location: targetLocation,
      },
      token
    );
    if (response.e == 0) {
      const buildings = response.buildings;
      this.buildingMap.clear();
      const buildingMap = new Map<string, string>();
      for (let i = 0; i < buildings.length; i++) {
        buildingMap.set(buildings[i].name, buildings[i].id);
      }
      this.buildingMap.set(targetLocation, buildingMap);
      console.log(
        `Building cache updated for location ${targetLocation}, ${buildingMap.size} buildings found.`
      );
    } else {
      console.log('Error updating building cache.');
    }
  }

  getBuildingNameList(location?: string): string[] {
    const targetLocation = location ?? this.currentLocation;
    if (this.buildingMap.has(targetLocation))
      return Array.from(this.buildingMap.get(targetLocation).keys());
    return [];
  }

  getBuildingIdList(location?: string): string[] {
    const targetLocation = location ?? this.currentLocation;
    if (this.buildingMap.has(targetLocation))
      return Array.from(this.buildingMap.get(targetLocation).values());
    return [];
  }

  getBuildingId(name: string, location?: string): string {
    const targetLocation = location ?? this.currentLocation;
    return this.buildingMap.get(targetLocation).get(name);
  }

  getBuildingName(id: string, location?: string): string {
    const targetLocation = location ?? this.currentLocation;
    if (this.buildingMap.size == 0) return 'Unknown';
    if (!this.buildingMap.has(targetLocation)) return 'Unknown';
    const name = Array.from(this.buildingMap.get(targetLocation).keys()).find(
      (key) => this.buildingMap.get(targetLocation).get(key) === id
    );
    return name;
  }

  async getBuildingInfoAsync(buildingId: string) {
    const token = await this.authService.getTokenAsync();
    const response = await this.httpService.getAsyncParams(
      `buildings/${buildingId}`,
      null,
      token
    );
    if (response.e == 0) {
      return response.building;
    } else {
      console.log('Error getting building info.');
      return null;
    }
  }
}
