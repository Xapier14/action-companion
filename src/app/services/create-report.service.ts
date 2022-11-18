import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreateReportService {
  // basic information
  private inspectorId: string;
  private location: string;
  private areasInspected: string;
  private buildingId: string;

  // chart info
  private collapsedStructure: number; // 0 = minor/none, 1 = major, 2 = critical
  private leaningOrOutOfPlumb: number;
  private damageToPrimaryStructure: number;
  private fallingHazards: number;
  private groundMovementOrSlope: number;
  private damagedSubmergedFixtures: number;
  private proximityRisk: number;
  private proximityRiskTitle: string;

  private evaluationComments: string;
  private estimatedBuildingDamage: number;

  constructor() {}
}
