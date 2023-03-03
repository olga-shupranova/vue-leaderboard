export interface Subscribable {
  subscribe: (subscriber: StorageSubscriber) => () => void;
}

export interface BoardRecord {
  id: number;
  player: string;
  score: number;
  rank: number;
  country: string; // icon instead of name?
  points: number;
  coinsSpent: number;
  coinsSpentInPercent: number;
  trend: number; // change from previous rank
  // team?: string;

}

export interface ColumnConfig {
  key: keyof BoardRecord;
  name: string;
  sortable: boolean;
  filterable?: boolean;
  template?: string;
}

export enum SortOrder { Asc, Desc}

export interface CurrentSort {
  key: keyof BoardRecord;
  order: SortOrder;
}

export type StorageData = BoardRecord[];

export type StorageSubscriber = (data: StorageData) => void;
