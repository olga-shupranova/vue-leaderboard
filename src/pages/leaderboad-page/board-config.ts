import type { ColumnConfig, CurrentSort } from '@/types';
import { SortOrder } from '@/types';

export const BOARD_CONFIG: ColumnConfig[] = [
  { key: 'rank', name: 'Rank', sortable: true },
  { key: 'player', name: 'Player', sortable: true, filterable: true },
  { key: 'country', name: 'Country', sortable: false },
  { key: 'score', name: 'Score', sortable: true },
  { key: 'trend', name: 'Trend', sortable: false, template: 'trend' },
  { key: 'points', name: 'Points', sortable: false, template: 'points' },
  { key: 'coinsSpentInPercent', name: 'Coins spent', sortable: true, template: 'progress' },
];

export const DEFAULT_SORT: CurrentSort = { key: 'rank', order: SortOrder.Asc };
