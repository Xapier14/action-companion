import { Injectable } from '@angular/core'
import { AlertController } from '@ionic/angular'
import { AuthService } from './auth.service'
import { HttpService } from './http.service'

@Injectable({
  providedIn: 'root',
})
export class CreateReportService {
  // route guard control
  private canLeave: boolean = true
  private currentPage = undefined

  // basic information
  private inspectorId?: string
  private location?: string
  private areasInspected?: string
  private buildingId?: string
  private inspectedDateTime?: string

  // chart info
  private collapsedStructure: number // 0 = minor/none, 1 = major, 2 = critical
  private leaningOrOutOfPlumb: number
  private damageToPrimaryStructure: number
  private fallingHazards: number
  private groundMovementOrSlope: number
  private damagedSubmergedFixtures: number
  private proximityRisk: number
  private proximityRiskTitle: string

  private estimatedBuildingDamage: number
  private evaluationComments: string

  // postings
  private inspected: boolean
  private restricted: boolean
  private unsafe: boolean
  private doNotEnter: boolean
  private doNotEnterText: string
  private briefEntry: boolean
  private briefEntryText: string
  private doNotUse: boolean
  private otherRestrictions: string

  // further actions
  private barricadeComment: boolean
  private barricadeCommentText: string
  private detailedEvaluationAreas: boolean
  private detailedEvaluationAreasStructural: boolean
  private detailedEvaluationAreasGeotechnical: boolean
  private detailedEvaluationAreasOther: boolean
  private otherRecommendations: boolean
  private otherRecommendationsText: string
  private commentsText: string

  private attachments: string[] = []

  constructor(private authService: AuthService, private httpService: HttpService) {
    this.clearFormData()
  }

  // getters
  getCanLeave(): boolean {
    return this.canLeave
  }
  getCurrentPage() {
    return this.currentPage
  }
  getInspectorId(): string | undefined {
    return this.inspectorId
  }
  getLocation(): string | undefined {
    return this.location
  }
  getAreasInspected(): string | undefined {
    return this.areasInspected
  }
  getBuildingId(): string | undefined {
    return this.buildingId
  }
  getInspectedDateTime(): string | undefined {
    return this.inspectedDateTime
  }
  getCollapsedStructure(): number {
    return this.collapsedStructure
  }
  getLeaningOrOutOfPlumb(): number {
    return this.leaningOrOutOfPlumb
  }
  getDamageToPrimaryStructure(): number {
    return this.damageToPrimaryStructure
  }
  getFallingHazards(): number {
    return this.fallingHazards
  }
  getGroundMovementOrSlope(): number {
    return this.groundMovementOrSlope
  }
  getDamagedSubmergedFixtures(): number {
    return this.damagedSubmergedFixtures
  }
  getProximityRisk(): number {
    return this.proximityRisk
  }
  getProximityRiskTitle(): string {
    return this.proximityRiskTitle
  }
  getEstimatedBuildingDamage(): number {
    return this.estimatedBuildingDamage
  }
  getEvaluationComments(): string {
    return this.evaluationComments
  }
  getInspected(): boolean {
    return this.inspected
  }
  getRestricted(): boolean {
    return this.restricted
  }
  getUnsafe(): boolean {
    return this.unsafe
  }
  getDoNotEnter(): boolean {
    return this.doNotEnter
  }
  getDoNotEnterText(): string {
    return this.doNotEnterText
  }
  getBriefEntry(): boolean {
    return this.briefEntry
  }
  getBriefEntryText(): string {
    return this.briefEntryText
  }
  getDoNotUse(): boolean {
    return this.doNotUse
  }
  getOtherRestrictions(): string {
    return this.otherRestrictions
  }
  getBarricadeComment(): boolean {
    return this.barricadeComment
  }
  getBarricadeCommentText(): string {
    return this.barricadeCommentText
  }
  getDetailedEvaluationAreas(): boolean {
    return this.detailedEvaluationAreas
  }
  getDetailedEvaluationAreasStructural(): boolean {
    return this.detailedEvaluationAreasStructural
  }
  getDetailedEvaluationAreasGeotechnical(): boolean {
    return this.detailedEvaluationAreasGeotechnical
  }
  getDetailedEvaluationAreasOther(): boolean {
    return this.detailedEvaluationAreasOther
  }
  getOtherRecommendations(): boolean {
    return this.otherRecommendations
  }
  getOtherRecommendationsText(): string {
    return this.otherRecommendationsText
  }
  getCommentsText(): string {
    return this.commentsText
  }
  getAttachments(): string[] {
    return this.attachments
  }

  // setters
  setCanLeave(canLeave: boolean) {
    this.canLeave = canLeave
  }
  setCurrentPage(page: any) {
    this.currentPage = page
  }
  setInspectorId(inspectorId: string) {
    this.inspectorId = inspectorId
  }
  setLocation(location: string) {
    this.location = location
  }
  setAreasInspected(areasInspected: string) {
    this.areasInspected = areasInspected
  }
  setBuildingId(buildingId: string) {
    this.buildingId = buildingId
  }
  setInspectedDateTime(inspectedDateTime: string) {
    this.inspectedDateTime = inspectedDateTime
  }
  setCollapsedStructure(collapsedStructure: number) {
    this.collapsedStructure = collapsedStructure
  }
  setLeaningOrOutOfPlumb(leaningOrOutOfPlumb: number) {
    this.leaningOrOutOfPlumb = leaningOrOutOfPlumb
  }
  setDamageToPrimaryStructure(damageToPrimaryStructure: number) {
    this.damageToPrimaryStructure = damageToPrimaryStructure
  }
  setFallingHazards(fallingHazards: number) {
    this.fallingHazards = fallingHazards
  }
  setGroundMovementOrSlope(groundMovementOrSlope: number) {
    this.groundMovementOrSlope = groundMovementOrSlope
  }
  setDamagedSubmergedFixtures(damagedSubmergedFixtures: number) {
    this.damagedSubmergedFixtures = damagedSubmergedFixtures
  }
  setProximityRisk(proximityRisk: number) {
    this.proximityRisk = proximityRisk
  }
  setProximityRiskTitle(proximityRiskTitle: string) {
    this.proximityRiskTitle = proximityRiskTitle
  }
  setEstimatedBuildingDamage(estimatedBuildingDamage: number) {
    this.estimatedBuildingDamage = estimatedBuildingDamage
  }
  setEvaluationComments(evaluationComments: string) {
    this.evaluationComments = evaluationComments
  }
  setInspected(inspected: boolean) {
    this.inspected = inspected
  }
  setRestricted(restricted: boolean) {
    this.restricted = restricted
  }
  setUnsafe(unsafe: boolean) {
    this.unsafe = unsafe
  }
  setDoNotEnter(doNotEnter: boolean) {
    this.doNotEnter = doNotEnter
  }
  setDoNotEnterText(doNotEnterText: string) {
    this.doNotEnterText = doNotEnterText
  }
  setBriefEntry(briefEntry: boolean) {
    this.briefEntry = briefEntry
  }
  setBriefEntryText(briefEntryText: string) {
    this.briefEntryText = briefEntryText
  }
  setDoNotUse(doNotUse: boolean) {
    this.doNotUse = doNotUse
  }
  setOtherRestrictions(otherRestrictions: string) {
    this.otherRestrictions = otherRestrictions
  }
  setBarricadeComment(barricadeComment: boolean) {
    this.barricadeComment = barricadeComment
  }
  setBarricadeCommentText(barricadeCommentText: string) {
    this.barricadeCommentText = barricadeCommentText
  }
  setDetailedEvaluationAreas(detailedEvaluationAreas: boolean) {
    this.detailedEvaluationAreas = detailedEvaluationAreas
  }
  setDetailedEvaluationAreasStructural(
    detailedEvaluationAreasStructural: boolean,
  ) {
    this.detailedEvaluationAreasStructural = detailedEvaluationAreasStructural
  }
  setDetailedEvaluationAreasGeotechnical(
    detailedEvaluationAreasGeotechnical: boolean,
  ) {
    this.detailedEvaluationAreasGeotechnical = detailedEvaluationAreasGeotechnical
  }
  setDetailedEvaluationAreasOther(detailedEvaluationAreasOther: boolean) {
    this.detailedEvaluationAreasOther = detailedEvaluationAreasOther
  }
  setOtherRecommendations(otherRecommendations: boolean) {
    this.otherRecommendations = otherRecommendations
  }
  setOtherRecommendationsText(otherRecommendationsText: string) {
    this.otherRecommendationsText = otherRecommendationsText
  }
  setCommentsText(commentsText: string) {
    this.commentsText = commentsText
  }
  addAttachment(attachment: string) {
    this.attachments.push(attachment)
  }
  clearAttachments() {
    this.attachments = []
  }

  clearFormData() {
    this.inspectorId = undefined
    this.location = undefined
    this.areasInspected = undefined
    this.buildingId = undefined
    this.inspectedDateTime = undefined

    this.collapsedStructure = 0
    this.leaningOrOutOfPlumb = 0
    this.damageToPrimaryStructure = 0
    this.fallingHazards = 0
    this.groundMovementOrSlope = 0
    this.damagedSubmergedFixtures = 0
    this.proximityRisk = 0
    this.proximityRiskTitle = ''

    this.evaluationComments = ''
    this.estimatedBuildingDamage = 0

    this.inspected = false
    this.restricted = false
    this.unsafe = false
    this.doNotEnter = false
    this.doNotEnterText = ''
    this.briefEntry = false
    this.briefEntryText = ''
    this.doNotUse = false
    this.otherRestrictions = ''

    this.barricadeComment = false
    this.barricadeCommentText = ''
    this.detailedEvaluationAreas = false
    this.detailedEvaluationAreasStructural = false
    this.detailedEvaluationAreasGeotechnical = false
    this.detailedEvaluationAreasOther = false
    this.otherRecommendations = false
    this.otherRecommendationsText = ''
    this.commentsText = ''

    this.attachments = []
  }

  finalizeFormData() {
    if (!this.doNotEnter) {
      this.doNotEnterText = ''
    }
    if (!this.briefEntry) {
      this.briefEntryText = ''
    }
    if (!this.barricadeComment) this.barricadeCommentText = ''
    if (!this.detailedEvaluationAreas) {
      this.detailedEvaluationAreasStructural = false
      this.detailedEvaluationAreasGeotechnical = false
      this.detailedEvaluationAreasOther = false
    }
    if (!this.otherRecommendations) this.otherRecommendationsText = ''
  }

  async submitFormDataAsync() {
    const token = await this.authService.checkTokenFromPreferences(true);
    if (!token || token.sessionState != "validSession") {
      return Promise.reject({
        message: "timeout",
        reason: "Session timed out",
        invalidate: true,
        success: false
      });
    }

    this.finalizeFormData();
    let detailedEvaluationAreasData = [];
    if (this.detailedEvaluationAreasStructural)
      detailedEvaluationAreasData.push(1);
    if (this.detailedEvaluationAreasGeotechnical)
      detailedEvaluationAreasData.push(2);
    if (this.detailedEvaluationAreasOther)
      detailedEvaluationAreasData.push(3);

    let data = {
      inspectedDateTime: new Date().toISOString(),
      location: this.location,
      areasInspected: this.areasInspected,
      buildingId: this.buildingId,
      inspectorId: this.inspectorId,
      collapsedStructure: this.collapsedStructure,
      leaningOrOutOfPlumb: this.leaningOrOutOfPlumb,
      damageToPrimaryStructure: this.damageToPrimaryStructure,
      fallingHazards: this.fallingHazards,
      groundMovementOrSlope: this.groundMovementOrSlope,
      damagedSubmergedFixtures: this.damagedSubmergedFixtures,
      proximityRisk: this.proximityRisk,
      proximityRiskTitle: this.proximityRiskTitle,
      evaluationComment: this.evaluationComments,
      estimatedBuildingDamage: this.estimatedBuildingDamage,
      inspectedPlacard: this.inspected,
      restrictedPlacard: this.restricted,
      unsafePlacard: this.unsafe,
      doNotEnter: this.doNotEnterText,
      briefEntryAllowed: this.briefEntryText,
      doNotUse: this.doNotUse,
      otherRestrictions: this.otherRestrictions,
      barricadeComment: this.barricadeCommentText,
      detailedEvaluationAreas: detailedEvaluationAreasData,
      otherRecommendations: this.otherRecommendationsText,
      furtherComments: this.commentsText,
    };
    console.log("data log is:", detailedEvaluationAreasData);
    console.log(this);
    console.log(data);
    const response = await this.httpService.postEncodedObjectAsync("incidents/create", data, token.token);
    if (!response.ok) {
      if (response.status >= 500) {
        return Promise.reject({
          message: "serverError",
          reason: "Server error.",
          invalidate: false,
          success: false
        });
      }
      if (response.status >= 400) {
        return Promise.reject({
          message: "error",
          reason: "Error submitting form.",
          invalidate: false,
          success: false
        });
      }
      return Promise.reject({
        message: "error",
        reason: "Error submitting form data.",
        invalidate: false,
        success: false
      });
    }

    return Promise.resolve({
      message: "submitted",
      reason: "Form data submitted",
      invalidate: false,
      success: true
    })
  }
}
