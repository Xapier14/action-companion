import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import {
  Attachment,
  AttachmentsService,
} from 'src/app/services/attachments.service';

@Component({
  selector: 'app-attachment',
  templateUrl: './attachment.page.html',
  styleUrls: ['./attachment.page.scss'],
})
export class AttachmentPage implements OnInit {
  id: string;
  attachment: Attachment | undefined;
  attachmentUrl: string | undefined;

  constructor(
    private route: ActivatedRoute,
    private attachmentsService: AttachmentsService,
    private loadingController: LoadingController,
    private navController: NavController
  ) {
    this.id = this.route.snapshot.queryParamMap.get('id');
  }

  async ngOnInit() {
    const loadingModal = await this.loadingController.create({
      message: 'Fetching attachment...',
    });
    loadingModal.present();
    this.attachment = await this.attachmentsService.GetAttachmentAsync(
      this.id,
      false
    );
    this.attachmentUrl = await this.attachmentsService.GetAttachmentUrlAsync(
      this.attachment
    );
    loadingModal.dismiss();
  }

  goBack() {
    this.navController.back();
  }
}
