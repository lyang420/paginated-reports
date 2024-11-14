import { defineConfig } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig ({
   test: {
		environment: 'jsdom',
      include: ['src/tests/**/*.test.ts*'],
		globals: true
   },
   resolve: {
      alias: {
         '@': path.resolve(__dirname, './src'),
      },
   },
	plugins: [react()]
});
