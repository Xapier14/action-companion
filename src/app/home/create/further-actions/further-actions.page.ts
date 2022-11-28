import { Component, OnInit, ViewChild } from '@angular/core';
import { IonCheckbox, IonTextarea, NavController } from '@ionic/angular';
import { CreateReportService } from 'src/app/services/create-report.service';

@Component({
  selector: 'app-further-actions',
  templateUrl: './further-actions.page.html',
  styleUrls: ['./further-actions.page.scss'],
})
export class FurtherActionsPage implements OnInit {
  @ViewChild('barricadeCommentCheckbox') barricadeCommentCheckbox: IonCheckbox;
  @ViewChild('barricadeCommentTextArea') barricadeCommentTextArea: IonTextarea;
  @ViewChild('detailedEvaluationAreasCheckbox') detailedEvaluationAreasCheckbox: IonCheckbox;
  @ViewChild('detailedEvaluationAreasStructuralCheckbox') detailedEvaluationAreasStructuralCheckbox: IonCheckbox;
  @ViewChild('detailedEvaluationAreasGeotechnicalCheckbox') detailedEvaluationAreasGeotechnicalCheckbox: IonCheckbox;
  @ViewChild('detailedEvaluationAreasOtherCheckbox') detailedEvaluationAreasOtherCheckbox: IonCheckbox;
  @ViewChild('otherRecommendationsCheckbox') otherRecommendationsCheckbox: IonCheckbox;
  @ViewChild('otherRecommendationsTextArea') otherRecommendationsTextArea: IonTextarea;
  @ViewChild('commentsTextArea') commentsTextArea: IonTextarea;
  barricadeComment: boolean;
  barricadeCommentText: string;
  detailedEvaluationAreas: boolean;
  detailedEvaluationAreasStructural: boolean;
  detailedEvaluationAreasGeotechnical: boolean;
  detailedEvaluationAreasOther: boolean;
  otherRecommendations: boolean;
  otherRecommendationsText: string;
  commentsText: string;

  constructor(private navController: NavController,
    private createReportsService: CreateReportService) {}

  ngOnInit() {
    this.barricadeComment = this.createReportsService.getBarricadeComment();
    this.barricadeCommentText = this.createReportsService.getBarricadeCommentText();
    this.detailedEvaluationAreas = this.createReportsService.getDetailedEvaluationAreas();
    this.detailedEvaluationAreasStructural = this.createReportsService.getDetailedEvaluationAreasStructural();
    this.detailedEvaluationAreasGeotechnical = this.createReportsService.getDetailedEvaluationAreasGeotechnical();
    this.detailedEvaluationAreasOther = this.createReportsService.getDetailedEvaluationAreasOther();
    this.otherRecommendations = this.createReportsService.getOtherRecommendations();
    this.otherRecommendationsText = this.createReportsService.getOtherRecommendationsText();
    this.commentsText = this.createReportsService.getCommentsText();
  }

  async goNext() {
    this.updateChanges();
    this.navController.navigateForward('/home/create/attachments', { animated: false });
  }

  async goBack() {
    this.updateChanges();
    this.navController.back({ animated: false });
  }

  updateChanges() {
    this.createReportsService.setBarricadeComment(this.barricadeCommentCheckbox.checked);
    this.createReportsService.setBarricadeCommentText(this.barricadeCommentTextArea.value);
    this.createReportsService.setDetailedEvaluationAreas(this.detailedEvaluationAreasCheckbox.checked);
    this.createReportsService.setDetailedEvaluationAreasStructural(this.detailedEvaluationAreasStructuralCheckbox.checked);
    this.createReportsService.setDetailedEvaluationAreasGeotechnical(this.detailedEvaluationAreasGeotechnicalCheckbox.checked);
    this.createReportsService.setDetailedEvaluationAreasOther(this.detailedEvaluationAreasOtherCheckbox.checked);
    this.createReportsService.setOtherRecommendations(this.otherRecommendationsCheckbox.checked);
    this.createReportsService.setOtherRecommendationsText(this.otherRecommendationsTextArea.value);
    this.createReportsService.setCommentsText(this.commentsTextArea.value);
  }
}
