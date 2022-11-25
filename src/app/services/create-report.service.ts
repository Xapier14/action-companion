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
  private collapsedStructure?: number; // 0 = minor/none, 1 = major, 2 = critical
  private leaningOrOutOfPlumb?: number;
  private damageToPrimaryStructure?: number;
  private fallingHazards?: number;
  private groundMovementOrSlope?: number;
  private damagedSubmergedFixtures?: number;
  private proximityRisk?: number;
  private proximityRiskTitle?: string;

  private evaluationComments?: string;
  private estimatedBuildingDamage?: number;

  private attachments: [] = [];

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

  clearFormData() {
    this.inspectorId = undefined;
    this.location = undefined;
    this.areasInspected = undefined;
    this.buildingId = undefined;
    this.inspectedDateTime = undefined;

    this.collapsedStructure = undefined;
    this.leaningOrOutOfPlumb = undefined;
    this.damageToPrimaryStructure = undefined;
    this.fallingHazards = undefined;
    this.groundMovementOrSlope = undefined;
    this.damagedSubmergedFixtures = undefined;
    this.proximityRisk = undefined;
    this.proximityRiskTitle = undefined;

    this.evaluationComments = undefined;
    this.estimatedBuildingDamage = undefined;

    this.attachments = [];
  }
}
