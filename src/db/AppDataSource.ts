import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Student } from './entity/Student.entity';
import { Group } from './entity/Group.entity';
import { User } from './entity/User.entity';
import bcrypt from 'bcryptjs'; // Добавьте импорт bcrypt

const AppDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.DB ?? './db/vki-web.db',
  synchronize: process.env.NODE_ENV !== 'production',
  migrationsRun: process.env.NODE_ENV === 'production',
  logging: true, // Включите логирование для отладки
  entities: [Student, Group, User],
});

export const dbInit = async (): Promise<void> => {
  try {
    if (AppDataSource.isInitialized) {
      console.log('>>> AppDataSource.isInitialized');
      return;
    }
    await AppDataSource.initialize();
    console.log('>>> AppDataSource.initialize');
    
    // Автоматически создаем тестовых пользователей после инициализации
    await ensureSeedUsers();
  } catch (error) {
    console.log('Database initialization error:', error);
  }
};

// Раскомментируйте и исправьте функцию создания пользователей
const ensureSeedUsers = async (): Promise<void> => {
  try {
    const repository = AppDataSource.getRepository(User);
    const defaultUsers = [
      {
        email: 'admin@example.com',
        fullName: 'Администратор Системы',
        password: await bcrypt.hash('admin123', 10), // Хешируем пароль
        isActive: true,
      },
      {
        email: 'manager@example.com',
        fullName: 'Менеджер Учебного Отдела',
        password: await bcrypt.hash('manager123', 10), // Хешируем пароль
        isActive: true,
      },
    ];

    for (const userData of defaultUsers) {
      const exists = await repository.findOne({
        where: { email: userData.email },
      });

      if (!exists) {
        const newUser = repository.create(userData);
        await repository.save(newUser);
        console.log(`Created user: ${userData.email}`);
      } else {
        // Обновляем пароль если пользователь уже существует
        exists.password = userData.password;
        await repository.save(exists);
        console.log(`Updated user: ${userData.email}`);
      }
    }
    
    console.log('Test users created/updated successfully');
  } catch (error) {
    console.error('Error creating test users:', error);
  }
};

// Раскомментируйте вызов dbInit, но с проверкой на окружение
if (process.env.NODE_ENV !== 'production') {
  dbInit().catch(console.error);
}

export default AppDataSource;