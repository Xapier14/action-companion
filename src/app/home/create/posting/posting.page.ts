import { Component, OnInit, ViewChild } from '@angular/core';
import { IonCheckbox, IonTextarea, NavController } from '@ionic/angular';
import { CreateReportService } from 'src/app/services/create-report.service';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.page.html',
  styleUrls: ['./posting.page.scss'],
})
export class PostingPage implements OnInit {
  @ViewChild('inspectedCheckbox') inspectedCheckbox: IonCheckbox;
  @ViewChild('restrictedCheckbox') restrictedCheckbox: IonCheckbox;
  @ViewChild('unsafeCheckbox') unsafeCheckbox: IonCheckbox;
  @ViewChild('doNotEnterCheckbox') doNotEnterCheckbox: IonCheckbox;
  @ViewChild('doNotEnterTextArea') doNotEnterTextArea: IonTextarea;
  @ViewChild('briefEntryCheckbox') briefEntryCheckbox: IonCheckbox;
  @ViewChild('briefEntryTextArea') briefEntryTextArea: IonTextarea;
  @ViewChild('doNotUseCheckbox') doNotUseCheckbox: IonCheckbox;
  @ViewChild('otherRestrictionsTextArea')
  otherRestrictionsTextArea: IonTextarea;
  inspected: boolean;
  restricted: boolean;
  unsafe: boolean;
  doNotEnter: boolean;
  doNotEnterText: string;
  briefEntry: boolean;
  briefEntryText: string;
  doNotUse: boolean;
  otherRestrictions: string;

  constructor(
    private createReportService: CreateReportService,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.inspected = this.createReportService.getInspected();
    this.restricted = this.createReportService.getRestricted();
    this.unsafe = this.createReportService.getUnsafe();
    this.doNotEnter = this.createReportService.getDoNotEnter();
    this.doNotEnterText = this.createReportService.getDoNotEnterText();
    this.briefEntry = this.createReportService.getBriefEntry();
    this.briefEntryText = this.createReportService.getBriefEntryText();
    this.doNotUse = this.createReportService.getDoNotUse();
    this.otherRestrictions = this.createReportService.getOtherRestrictions();
  }

  async goNext() {
    this.updateChanges();
    this.navController.navigateForward('/home/create/actions', {
      animated: false,
    });
  }

  async goBack() {
    this.updateChanges();
    this.navController.back({ animated: false });
  }

  updateChanges() {
    if (!this.doNotEnterCheckbox.checked) {
      this.doNotEnterTextArea.value = '';
    }
    if (!this.briefEntryCheckbox.checked) {
      console.log('clearing brief entry text');
      this.briefEntryTextArea.value = '';
    }
    this.createReportService.setInspected(this.inspectedCheckbox.checked);
    this.createReportService.setRestricted(this.restrictedCheckbox.checked);
    this.createReportService.setUnsafe(this.unsafeCheckbox.checked);
    this.createReportService.setDoNotEnter(this.doNotEnterCheckbox.checked);
    this.createReportService.setDoNotEnterText(this.doNotEnterTextArea.value);
    this.createReportService.setBriefEntry(this.briefEntryCheckbox.checked);
    this.createReportService.setBriefEntryText(this.briefEntryTextArea.value);
    this.createReportService.setDoNotUse(this.doNotUseCheckbox.checked);
    this.createReportService.setOtherRestrictions(
      this.otherRestrictionsTextArea.value
    );
  }
}
