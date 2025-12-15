'use client';

import { useMemo } from 'react';
import useGroups from '@/hooks/useGroups';
import BarChart from '@/components/BarChart/BarChart';
import type GroupInterface from '@/types/GroupInterface';
import type { ChartDataItem } from '@/types/chart';
import styles from './GroupsChart.module.scss';

const GroupsChart = (): React.ReactElement => {
  const { groups } = useGroups();

  const chartData: ChartDataItem[] = useMemo(() => {
    return groups.map((group: GroupInterface) => ({
      name: group.name,
      value: group.students?.length || 0,
    }));
  }, [groups]);

  return (
    <div className={styles.GroupsChart}>
      <BarChart
        data={chartData}
        title="Количество студентов по группам"
      />
    </div>
  );
};

export default GroupsChart;
