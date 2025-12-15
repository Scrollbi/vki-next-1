import GroupsChart from '@/components/GroupsChart/GroupsChart';
import Page from '@/components/layout/Page/Page';

const HomePage = (): React.ReactNode => {
  return (
    <Page>
      <h1>Главная страница</h1>
      <GroupsChart />
    </Page>
  );
};

export default HomePage;
