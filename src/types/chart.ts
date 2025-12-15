export interface ChartDataItem {
  name: string;
  value: number;
  fill?: string;
}

export interface GroupChartData extends ChartDataItem {
  groupId: number;
}
