import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private currentPage: number = 0;
  private isEndOfList: boolean = false;
  private filter = {};

  constructor(
    private authService: AuthService,
    private httpService: HttpService
  ) {}

  hasMoreData(): boolean {
    return !this.isEndOfList;
  }

  getCurrentPage(): number {
    return this.currentPage;
  }

  setFilter(key: string, value: string) {
    this.filter[key] = value;
  }

  removeFilter(key: string) {
    delete this.filter[key];
  }

  clearFilter() {
    this.filter = {};
  }

  async getListDataAsync() {
    console.log('is end of list: ' + this.isEndOfList);
    if (this.isEndOfList) return [];

    const token = await this.authService.checkTokenFromPreferences();
    if (!token || token.sessionState != 'validSession') return [];
    // add filter to params
    let params = new URLSearchParams({
      pageOffset: this.currentPage.toString(),
      limit: '15',
    });
    for (let key in this.filter) {
      params.append(key, this.filter[key]);
    }
    const response = await (
      await this.httpService.getAsync('incidents/', params, token.token)
    ).json();
    if (response.e == 0) {
      this.currentPage++;
      if (this.currentPage > response.maxPageOffset) this.isEndOfList = true;
      console.log('is end of list NOW: ' + this.isEndOfList);
      return response.reports;
    }
    return [];
  }

  refreshList() {
    this.currentPage = 0;
    this.isEndOfList = false;
  }

  async getReportAsync(id: string) {
    const token = await this.authService.checkTokenFromPreferences();
    if (!token || token.sessionState != 'validSession') return undefined;
    const response = await (
      await this.httpService.getAsync(`incidents/${id}`, undefined, token.token)
    ).json();
    if (response.e != 0) return undefined;
    return response.incident;
  }
}
