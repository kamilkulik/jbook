export type CellTypes = 'code' | 'text';

export interface Cell {
  content: string;
  id: string;
  type: CellTypes;
}
