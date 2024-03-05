export interface ICampaign {
  id: number;
  name: string;
  formId: number;
  status: number;
  callingType: number;
  botsFactor: number;
  overcallFactor: number;
  date: Date;
  hasControlSystemsEnabled: boolean;
  finishCallingWhenReached: boolean;
  useRecordDataFiltering: boolean;
  switchableOrderStrategy: number;
  agentUtilizationFactor: number;
  gates: number[];
  simulatedAgents: string[];
  templateId: string;
  botCount: number;
  scenarioId: number;
  profileId: number;
  dialerGearId: number;
  gift: string;
  defaultCustomProperties: any;
  instanceId: number;
  instanceName: string;
  hasFormWithCustomProperties: number;
}
