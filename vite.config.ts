import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { getMarketSnapshot } from './src/server/marketAdapter';

function marketDataDevPlugin(): Plugin {
  return {
    name: 'market-data-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/market-data', async (_req, res) => {
        try {
          const snapshot = await getMarketSnapshot();
          res.setHeader('Content-Type', 'application/json');
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.statusCode = snapshot.status === 'error' ? 502 : 200;
          res.end(JSON.stringify(snapshot));
        } catch (err: any) {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 500;
          res.end(JSON.stringify({ status: 'error', message: err?.message || 'Server error' }));
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), marketDataDevPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5173,
      host: true
    },
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-icons': ['lucide-react']
          }
        }
      }
    }
  };
});

