import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AttachmentsService {

  constructor(private httpService: HttpService) { }

  getAttachment() {
    
  }
}
