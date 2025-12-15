
import Students from '@/components/Students/Students';
import styles from './page.module.scss';

const StudentsPage = (): React.ReactElement => (
  <div className={styles.page}>
    <h1>Список студентов</h1>
    <Students />
  </div>
);

export default StudentsPage;