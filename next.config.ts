import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
} as NextConfig; // Используем type assertion

// Добавляем свойство eslint после каста
(nextConfig as any).eslint = {
  ignoreDuringBuilds: true,
};

nextConfig.webpack = (config, { isServer }) => {
  if (isServer) {
    config.externals.push({
      'pg': 'commonjs pg',
      'pg-hstore': 'commonjs pg-hstore',
      'sqlite3': 'commonjs sqlite3',
      'better-sqlite3': 'commonjs better-sqlite3',
      'typeorm': 'commonjs typeorm',
    });
  }
  return config;
};

export default nextConfig;