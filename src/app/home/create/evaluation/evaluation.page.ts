import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonRadioGroup, IonSelect, IonText, IonTextarea, NavController } from '@ionic/angular';
import { CreateReportService } from 'src/app/services/create-report.service';

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.page.html',
  styleUrls: ['./evaluation.page.scss'],
})
export class EvaluationPage implements OnInit {
  @ViewChild('collapsedRadio') collapsedRadio : IonRadioGroup;
  @ViewChild('leaningRadio') leaningRadio : IonRadioGroup;
  @ViewChild('structuralRadio') structuralRadio : IonRadioGroup;
  @ViewChild('fallingRadio') fallingRadio : IonRadioGroup;
  @ViewChild('groundRadio') groundRadio : IonRadioGroup;
  @ViewChild('submergedRadio') submergedRadio : IonRadioGroup;
  @ViewChild('proximityRadio') proximityRadio : IonRadioGroup;
  @ViewChild('proximityTextArea') proximityTextArea : IonTextarea;
  @ViewChild('damageSelect') damageSelect : IonSelect;
  @ViewChild('commentTextArea') commentTextArea : IonTextarea;
  collapsed: number;
  leaning: number;
  structural: number;
  falling: number;
  ground: number;
  submerged: number;
  proximity: number;
  damage: number;
  proximityText: string;
  commentText: string;

  constructor(
    private createReportService: CreateReportService,
    private navController: NavController,
    private alertController: AlertController
  ) {
  }

  ngOnInit() {
    this.collapsed = this.createReportService.getCollapsedStructure();
    this.leaning = this.createReportService.getLeaningOrOutOfPlumb();
    this.structural = this.createReportService.getDamageToPrimaryStructure();
    this.falling = this.createReportService.getFallingHazards();
    this.ground = this.createReportService.getGroundMovementOrSlope();
    this.submerged = this.createReportService.getDamagedSubmergedFixtures();
    this.proximity = this.createReportService.getProximityRisk();
    this.proximityText = this.createReportService.getProximityRiskTitle();
    this.damage = this.createReportService.getEstimatedBuildingDamage();
    this.commentText = this.createReportService.getEvaluationComments();
  }

  async goBack() {
    this.updateChanges();
    this.navController.back({ animated: false });
  }

  async goNext() {
    if (this.collapsedRadio.value == null ||
      this.leaningRadio.value == null ||
      this.structuralRadio.value == null ||
      this.fallingRadio.value == null ||
      this.groundRadio.value == null ||
      this.submergedRadio.value == null ||
      this.proximityRadio.value == null ||
      this.damageSelect.value == null) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'One or more fields are missing or invalid.',
        buttons: ['OK']
      });

      await alert.present();
    }

    this.navController.navigateForward('/home/create/posting', {
      animated: false,
    });
  }

  updateChanges() {
    this.createReportService.setCollapsedStructure(this.collapsedRadio.value);
    this.createReportService.setLeaningOrOutOfPlumb(this.leaningRadio.value);
    this.createReportService.setDamageToPrimaryStructure(this.structuralRadio.value);
    this.createReportService.setFallingHazards(this.fallingRadio.value);
    this.createReportService.setGroundMovementOrSlope(this.groundRadio.value);
    this.createReportService.setDamagedSubmergedFixtures(this.submergedRadio.value);
    this.createReportService.setProximityRisk(this.proximityRadio.value);
    this.createReportService.setProximityRiskTitle(this.proximityTextArea.value);
    this.createReportService.setEstimatedBuildingDamage(this.damageSelect.value);
    this.createReportService.setEvaluationComments(this.commentTextArea.value);
  }
}
