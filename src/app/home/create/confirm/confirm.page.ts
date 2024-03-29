import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { CreateReportService } from 'src/app/services/create-report.service';
import { BuildingsService } from 'src/app/services/buildings.service';
import { IdentityCacheService } from 'src/app/services/identity-cache.service';
import { Router } from '@angular/router';
import { AttachmentsService } from 'src/app/services/attachments.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {
  // state
  submitted: boolean = false;
  buildingDamageString: string = 'Unknown';

  // inspection
  inspectorId: string;
  inspector: string;
  location: string;
  areasInspected: string;
  buildingId: string;
  building: string;
  inspectedDateTime: string;

  // evaluation
  collapsedStructure: number; // 0 = minor/none, 1 = major, 2 = critical
  leaningOrOutOfPlumb: number;
  damageToPrimaryStructure: number;
  fallingHazards: number;
  groundMovementOrSlope: number;
  damagedSubmergedFixtures: number;
  proximityRisk: number;
  proximityRiskTitle: string;
  estimatedBuildingDamage: number;
  evaluationComments: string;

  // postings
  inspected: boolean;
  restricted: boolean;
  unsafe: boolean;
  doNotEnter: boolean;
  doNotEnterText: string;
  briefEntry: boolean;
  briefEntryText: string;
  doNotUse: boolean;
  otherRestrictions: string;

  // further actions
  barricadeComment: boolean;
  barricadeCommentText: string;
  detailedEvaluationAreas: boolean;
  detailedEvaluationAreasStructural: boolean;
  detailedEvaluationAreasGeotechnical: boolean;
  detailedEvaluationAreasOther: boolean;
  otherRecommendations: boolean;
  otherRecommendationsText: string;
  commentsText: string;

  // attachments
  attachments: string[] = [];
  attachmentUrlMap: any | undefined;

  constructor(
    private createReportService: CreateReportService,
    private buildingsService: BuildingsService,
    private identityCacheService: IdentityCacheService,
    private attachmentsService: AttachmentsService,
    private navController: NavController,
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

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

  async ngOnInit() {
    if (this.createReportService.getInspectorId() == undefined) {
      this.createReportService.clearFormData();
      this.router.navigate(['/home']);
      return;
    }
    this.createReportService.finalizeFormData();
    // update with data from createReportService
    this.inspectorId = this.createReportService.getInspectorId();
    this.location = this.createReportService.getLocation();
    this.areasInspected = this.createReportService.getAreasInspected();
    this.buildingId = this.createReportService.getBuildingId();
    this.inspectedDateTime = 'auto-generated';
    this.collapsedStructure = this.createReportService.getCollapsedStructure();
    this.leaningOrOutOfPlumb =
      this.createReportService.getLeaningOrOutOfPlumb();
    this.damageToPrimaryStructure =
      this.createReportService.getDamageToPrimaryStructure();
    this.fallingHazards = this.createReportService.getFallingHazards();
    this.groundMovementOrSlope =
      this.createReportService.getGroundMovementOrSlope();
    this.damagedSubmergedFixtures =
      this.createReportService.getDamagedSubmergedFixtures();
    this.proximityRisk = this.createReportService.getProximityRisk();
    this.proximityRiskTitle = this.createReportService.getProximityRiskTitle();
    this.estimatedBuildingDamage =
      this.createReportService.getEstimatedBuildingDamage();
    this.evaluationComments = this.createReportService.getEvaluationComments();
    this.inspected = this.createReportService.getInspected();
    this.restricted = this.createReportService.getRestricted();
    this.unsafe = this.createReportService.getUnsafe();
    this.doNotEnter = this.createReportService.getDoNotEnter();
    this.doNotEnterText = this.createReportService.getDoNotEnterText();
    this.briefEntry = this.createReportService.getBriefEntry();
    this.briefEntryText = this.createReportService.getBriefEntryText();
    this.doNotUse = this.createReportService.getDoNotUse();
    this.otherRestrictions = this.createReportService.getOtherRestrictions();
    this.barricadeComment = this.createReportService.getBarricadeComment();
    this.barricadeCommentText =
      this.createReportService.getBarricadeCommentText();
    this.detailedEvaluationAreas =
      this.createReportService.getDetailedEvaluationAreas();
    this.detailedEvaluationAreasStructural =
      this.createReportService.getDetailedEvaluationAreasStructural();
    this.detailedEvaluationAreasGeotechnical =
      this.createReportService.getDetailedEvaluationAreasGeotechnical();
    this.detailedEvaluationAreasOther =
      this.createReportService.getDetailedEvaluationAreasOther();
    this.otherRecommendations =
      this.createReportService.getOtherRecommendations();
    this.otherRecommendationsText =
      this.createReportService.getOtherRecommendationsText();
    this.commentsText = this.createReportService.getCommentsText();
    this.attachments = this.createReportService.getAttachments();
    await this.createMap();

    // get inspector name
    this.inspector = (
      await this.identityCacheService.getNameFromIdAsync(this.inspectorId)
    ).join(' ');

    // get building name
    this.building = this.buildingsService.getBuildingName(
      this.buildingId,
      this.location
    );

    switch (this.estimatedBuildingDamage.toString()) {
      case '0':
        this.buildingDamageString = 'None';
        break;
      case '1':
        this.buildingDamageString = '1 - 10 %';
        break;
      case '2':
        this.buildingDamageString = '11 - 30 %';
        break;
      case '3':
        this.buildingDamageString = '31 - 60 %';
        break;
      case '4':
        this.buildingDamageString = '61 - 99 %';
        break;
      case '5':
        this.buildingDamageString = '100 %';
        break;
    }
    const noticeAlert = await this.alertController.create({
      header: 'Draft report',
      message:
        'Please scroll down and review the information below.</br>You may submit the report when you are ready.',
      buttons: ['OK'],
    });
    await noticeAlert.present();
  }

  async goBack() {
    if (this.submitted) {
      this.navController.navigateRoot(['/home']);
      return;
    }
    this.navController.back({ animated: false });
  }

  async submitClick() {
    const sessionTimedOutAlert = await this.alertController.create({
      header: 'Session Timed Out',
      message: 'Your session has timed out. Please log in again.',
      buttons: ['OK'],
    });
    const submittingLoader = await this.loadingController.create({
      message: 'Submitting report...',
    });

    await submittingLoader.present();
    const result = await this.createReportService.submitFormDataAsync();
    await submittingLoader.dismiss();
    if (!result.success) {
      if (result.message == 'timeout') {
        await sessionTimedOutAlert.present();
        this.navController.navigateRoot(['/login']);
      }
      const generalErrorAlert = await this.alertController.create({
        header: 'Error',
        message:
          'An error occurred while submitting the report.</br>Please try again.</br></br>Reason:</br>' +
          result.reason,
        buttons: ['OK'],
      });
      await generalErrorAlert.present();
      return;
    }
    this.createReportService.clearFormData();
    this.submitted = true;
  }
}
