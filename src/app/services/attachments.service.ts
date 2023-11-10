import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

export interface Attachment {
  fileName: string;
  contentType: string;
  accessToken: string;
  expiresAt: Date;
}
@Injectable({
  providedIn: 'root',
})
export class AttachmentsService {
  private cache: Map<string, Attachment> = new Map();
  constructor(
    private authService: AuthService,
    private httpService: HttpService
  ) {}

  async GetAttachmentAsync(
    id: string,
    isThumbnail: boolean
  ): Promise<Attachment | undefined> {
    const localId = `${id}-${isThumbnail}`;
    if (this.cache.has(localId)) {
      return this.cache.get(localId)!;
    } else {
      const requestUrl = `attachments/${id}`;
      const requestData = new URLSearchParams();
      if (isThumbnail) requestData.append('thumbnail', 'true');
      const token = await this.authService.getTokenAsync();
      if (!token) throw new Error('No token available.');
      try {
        const response = await this.httpService.getAsync(
          requestUrl,
          requestData,
          token
        );

        const attachment = {
          fileName: response.fileName,
          contentType: response.contentType,
          accessToken: response.accessToken,
          expiresAt: response.expires,
        };
        this.cache.set(localId, attachment);

        const dateOffset =
          new Date(attachment.expiresAt).getTime() - Date.now();
        setTimeout(() => {
          this.cache.delete(localId);
        }, dateOffset - 60000);

        return attachment;
      } catch (error) {
        console.log(error);
        return undefined;
      }
    }
  }

  async GetAttachmentUrlAsync(attachment: Attachment) {
    const token = await this.authService.getTokenAsync();
    if (!token) throw new Error('No token available.');
    const requestUrl = `${environment.apiHost}/attachments/file/${attachment.fileName}`;
    const requestData = new URLSearchParams();
    requestData.append('a', attachment.accessToken);
    return `${requestUrl}?${requestData.toString()}`;
  }

  async GetAttachmentUrlAsyncById(id: string, isThumbnail: boolean) {
    const attachment = await this.GetAttachmentAsync(id, isThumbnail);
    if (!attachment) {
      console.log('Attachment not found.');
      return '';
    }
    return await this.GetAttachmentUrlAsync(attachment);
  }

  async GetAttachmentsFromReportAsync(reportId: string): Promise<string[]> {
    const requestUrl = `attachments/from/${reportId}`;
    const token = await this.authService.getTokenAsync();
    if (!token) throw new Error('No token available.');
    const response = await this.httpService.getAsync(
      requestUrl,
      undefined,
      token
    );
    return response.filter(
      (attachment: string) => attachment !== null && attachment != ''
    );
  }

  async UploadAttachmentAsync(blob: Blob, fileName: string) {
    const requestUrl = `attachments/upload`;
    const token = await this.authService.getTokenAsync();
    if (!token) throw new Error('No token available.');
    const formData = new FormData();
    console.log(blob);
    console.log(fileName);
    formData.append('file', blob, fileName);
    formData.forEach((value, key) => {
      console.log(key + ':' + value);
    });
    const response = await this.httpService.postFormDataAsync(
      requestUrl,
      formData,
      token
    );
    return response;
  }
}
