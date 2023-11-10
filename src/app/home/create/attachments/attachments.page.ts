import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { CreateReportService } from 'src/app/services/create-report.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import {
  Camera as acpCamera,
  CameraOptions as acpCameraOptions,
} from '@awesome-cordova-plugins/camera/ngx';
import { AttachmentsService } from 'src/app/services/attachments.service';

@Component({
  selector: 'app-attachments',
  templateUrl: './attachments.page.html',
  styleUrls: ['./attachments.page.scss'],
})
export class AttachmentsPage implements OnInit {
  attachmentUrlMap: any | undefined;
  attachments = this.createReportService.getAttachments();

  constructor(
    private createReportService: CreateReportService,
    private attachmentsService: AttachmentsService,
    private navController: NavController,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    await this.createMap();
  }

  async goBack() {
    this.updateChanges();
    this.navController.back({ animated: false });
  }

  async goNext() {
    this.updateChanges();
    this.navController.navigateForward('/home/create/confirm', {
      animated: false,
    });
  }

  async addAttachmentImage() {
    const uploadingModal = await this.loadingController.create({
      message: 'Uploading image...',
    });
    const errorAlert = await this.alertController.create({
      header: 'Error',
      message: 'There was an error uploading the image.',
      buttons: ['OK'],
    });
    const data = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
    });
    uploadingModal.present();
    const blob = this.dataURItoBlob(data.dataUrl);
    console.log('blob');
    console.log(blob);
    const file = new File([blob], 'image.png', { type: 'image/png' });
    console.log('file');
    console.log(file);
    const response = await this.attachmentsService.UploadAttachmentAsync(
      blob,
      'file.png'
    );
    uploadingModal.dismiss();

    if (response.e != 0) {
      errorAlert.present();
      return;
    }
    this.attachments.push(response.attachmentId);
    await this.createMap();

    console.log(response.e != 0);
  }

  dataURItoBlob(dataURI: string): Blob {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  updateChanges() {
    const copy = this.attachments.slice();
    this.createReportService.clearAttachments();
    copy.forEach((attachment) => {
      this.createReportService.addAttachment(attachment);
    });
  }

  async createMap() {
    const newMap = {};
    for (const attachment of this.attachments) {
      const url = await this.attachmentsService.GetAttachmentUrlAsyncById(
        attachment,
        true
      );
      newMap[attachment] = url;
    }
    this.attachmentUrlMap = newMap;
  }
}
