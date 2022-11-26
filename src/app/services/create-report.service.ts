import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateReportService {
  // route guard control
  private canLeave: boolean = true;
  private currentPage = undefined;

  // basic information
  private inspectorId?: string;
  private location?: string;
  private areasInspected?: string;
  private buildingId?: string;
  private inspectedDateTime?: string;

  // chart info
  private collapsedStructure: number; // 0 = minor/none, 1 = major, 2 = critical
  private leaningOrOutOfPlumb: number;
  private damageToPrimaryStructure: number;
  private fallingHazards: number;
  private groundMovementOrSlope: number;
  private damagedSubmergedFixtures: number;
  private proximityRisk: number;
  private proximityRiskTitle: string;

  private estimatedBuildingDamage: number;
  private evaluationComments: string;

  private attachments: string[] = [];

  constructor() {
    this.clearFormData();
  }

  // getters
  getCanLeave(): boolean {
    return this.canLeave;
  }
  getCurrentPage() {
    return this.currentPage;
  }
  getInspectorId(): string | undefined {
    return this.inspectorId;
  }
  getLocation(): string | undefined {
    return this.location;
  }
  getAreasInspected(): string | undefined {
    return this.areasInspected;
  }
  getBuildingId(): string | undefined {
    return this.buildingId;
  }
  getInspectedDateTime(): string | undefined {
    return this.inspectedDateTime;
  }
  getCollapsedStructure(): number {
    return this.collapsedStructure;
  }
  getLeaningOrOutOfPlumb(): number {
    return this.leaningOrOutOfPlumb;
  }
  getDamageToPrimaryStructure(): number {
    return this.damageToPrimaryStructure;
  }
  getFallingHazards(): number {
    return this.fallingHazards;
  }
  getGroundMovementOrSlope(): number {
    return this.groundMovementOrSlope;
  }
  getDamagedSubmergedFixtures(): number {
    return this.damagedSubmergedFixtures;
  }
  getProximityRisk(): number {
    return this.proximityRisk;
  }
  getProximityRiskTitle(): string {
    return this.proximityRiskTitle;
  }
  getEstimatedBuildingDamage(): number {
    return this.estimatedBuildingDamage;
  }
  getEvaluationComments(): string {
    return this.evaluationComments;
  }
  getAttachments(): string[] {
    return this.attachments;
  }

  // setters
  setCanLeave(canLeave: boolean) {
    this.canLeave = canLeave;
  }
  setCurrentPage(page: any) {
    this.currentPage = page;
  }
  setInspectorId(inspectorId: string) {
    this.inspectorId = inspectorId;
  }
  setLocation(location: string) {
    this.location = location;
  }
  setAreasInspected(areasInspected: string) {
    this.areasInspected = areasInspected;
  }
  setBuildingId(buildingId: string) {
    this.buildingId = buildingId;
  }
  setInspectedDateTime(inspectedDateTime: string) {
    this.inspectedDateTime = inspectedDateTime;
  }
  setCollapsedStructure(collapsedStructure: number) {
    this.collapsedStructure = collapsedStructure;
  }
  setLeaningOrOutOfPlumb(leaningOrOutOfPlumb: number) {
    this.leaningOrOutOfPlumb = leaningOrOutOfPlumb;
  }
  setDamageToPrimaryStructure(damageToPrimaryStructure: number) {
    this.damageToPrimaryStructure = damageToPrimaryStructure;
  }
  setFallingHazards(fallingHazards: number) {
    this.fallingHazards = fallingHazards;
  }
  setGroundMovementOrSlope(groundMovementOrSlope: number) {
    this.groundMovementOrSlope = groundMovementOrSlope;
  }
  setDamagedSubmergedFixtures(damagedSubmergedFixtures: number) {
    this.damagedSubmergedFixtures = damagedSubmergedFixtures;
  }
  setProximityRisk(proximityRisk: number) {
    this.proximityRisk = proximityRisk;
  }
  setProximityRiskTitle(proximityRiskTitle: string) {
    this.proximityRiskTitle = proximityRiskTitle;
  }
  setEstimatedBuildingDamage(estimatedBuildingDamage: number) {
    this.estimatedBuildingDamage = estimatedBuildingDamage;
  }
  setEvaluationComments(evaluationComments: string) {
    this.evaluationComments = evaluationComments;
  }

  addAttachment(attachment: string) {
    this.attachments.push(attachment);
  }
  clearAttachments() {
    this.attachments = [];
  }

  clearFormData() {
    this.inspectorId = undefined;
    this.location = undefined;
    this.areasInspected = undefined;
    this.buildingId = undefined;
    this.inspectedDateTime = undefined;

    this.collapsedStructure = 0;
    this.leaningOrOutOfPlumb = 0;
    this.damageToPrimaryStructure = 0;
    this.fallingHazards = 0;
    this.groundMovementOrSlope = 0;
    this.damagedSubmergedFixtures = 0;
    this.proximityRisk = 0;
    this.proximityRiskTitle = "";

    this.evaluationComments = "";
    this.estimatedBuildingDamage = 0;

    this.attachments = [];
  }
}
