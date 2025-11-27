export interface ChecklistItem {
  id: string;
  label: string;
  options: string[]; // e.g., ["Quiet", "Average", "Noisy"]
}

export interface EnvironmentTag {
  icon: string; // Mapping to Lucide icon name
  label: string;
  value: string;
  color: string;
}

export interface HouseData {
  id: string;
  name: string;
  address: string;
  price: string;
  tags: EnvironmentTag[];
  checklist: ChecklistItem[];
}

export type EntryMode = 'LISTING' | 'CHAT';

export interface AppState {
  view: 'ENTRY' | 'COMPANION' | 'REPORT_GENERATING' | 'REPORT';
  currentHouseId: string;
  isStreamComplete: boolean;
  streamStage: number; // 0: Skeleton, 1: Environment, 2: Checklist
  recordedAnswers: Record<string, string>; // checklistId -> option
  showSwitchNotification: boolean; // For Layer 5
  showNoteSheet: boolean; // For Layer 4 action
}
