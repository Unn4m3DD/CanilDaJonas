export type HistoryEntry = {
  utcTime: number,
}


export type Cage = {
  history: HistoryEntry[],
  id: string,
  notes: string
}