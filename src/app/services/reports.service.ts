import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private currentPage: number = 0;
  private isEndOfList: boolean = false;

  constructor(private authService: AuthService, private httpService: HttpService) { }

  hasMoreData() : boolean {
    return !this.isEndOfList;
  }

  getCurrentPage() : number {
    return this.currentPage;
  }

  async getListDataAsync() {
    if (this.isEndOfList)
      return [];

    const token = await this.authService.checkTokenFromPreferences();
    if (!token || token.sessionState != "validSession")
      return [];
    const params = new URLSearchParams({
      pageOffset: this.currentPage.toString(),
      limit: "15"
    });
    const response = await (await this.httpService.getAsync('incidents/list', params, token.token)).json();
    if (response.e == 0) {
      this.currentPage++;
      if (this.currentPage > response.maxPageOffset)
        this.isEndOfList = true;
      return response.reports;
    }
    return [];
  }

  refreshList() {
    this.currentPage = 0;
    this.isEndOfList = false;
  }

  async getReportAsnc(id: string) {
    const token = await this.authService.checkTokenFromPreferences();
    if (!token || token.sessionState != "validSession")
      return undefined;
    const response = await (await this.httpService.getAsync('incidents/list', undefined, token.token)).json();
    if (response.e != 0)
      return undefined;
    return response.detail;
  }
}
