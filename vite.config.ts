import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite'; // ✅ Tambahkan ini

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    plugins: [react(), tailwindcss()], // ✅ Masukkan plugin Tailwind CSS kembali
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      // ✅ ADDED: Proxy untuk development (opsional tapi recommended)
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    },
    // ✅ ADDED: Define env variables untuk production build
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL),
      'import.meta.env.VITE_API_TIMEOUT': JSON.stringify(env.VITE_API_TIMEOUT),
      'import.meta.env.VITE_MAX_FILE_SIZE': JSON.stringify(env.VITE_MAX_FILE_SIZE),
      'import.meta.env.VITE_ALLOWED_FILE_EXTENSIONS': JSON.stringify(env.VITE_ALLOWED_FILE_EXTENSIONS),
    },
  };
});
