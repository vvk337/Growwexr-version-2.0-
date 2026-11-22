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

function contactDevPlugin(): Plugin {
  return {
    name: 'contact-dev-middleware',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = 405;
          res.end(JSON.stringify({ status: 'error', message: 'Method Not Allowed' }));
          return;
        }

        let rawBody = '';
        req.on('data', (chunk: Buffer | string) => {
          rawBody += chunk;
        });

        req.on('end', async () => {
          try {
            const body = rawBody ? JSON.parse(rawBody) : {};
            const {
              firstName,
              lastName,
              email,
              countryCode,
              phone,
              country,
              city,
              serviceInterest,
              message,
              companyWebsite,
              website,
            } = body;

            // Honeypot anti-spam check
            if (companyWebsite || website) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({ status: 'ok', inquiryId: `GW-${Date.now().toString(36).toUpperCase()}` }));
              return;
            }

            const resolvedFirstName = (firstName || '').trim();
            const resolvedLastName = (lastName || '').trim();
            const resolvedFullName = `${resolvedFirstName} ${resolvedLastName}`.trim();
            const fullPhone = phone?.trim()
              ? `${countryCode ? countryCode + ' ' : ''}${phone.trim()}`
              : 'Not provided';
            const inquiryId = body.inquiryId || `GW-${Date.now().toString(36).toUpperCase()}`;

            const leadPayload = {
              inquiryId,
              timestamp: new Date().toISOString(),
              firstName: resolvedFirstName,
              lastName: resolvedLastName,
              fullName: resolvedFullName,
              email: (email || '').trim().toLowerCase(),
              countryCode: countryCode || '',
              phone: phone?.trim() || '',
              fullPhone,
              country: (country || '').trim(),
              city: (city || '').trim() || 'Not specified',
              serviceInterest: serviceInterest || 'Forex Signals',
              message: (message || '').trim(),
              source: body.leadSource || 'Website Consultation Form',
            };

            const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
            let sheetSynced = false;

            if (webhookUrl && webhookUrl.startsWith('http') && !webhookUrl.includes('your_deployment_id_here')) {
              try {
                const sheetRes = await fetch(webhookUrl, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(leadPayload),
                  redirect: 'follow',
                });
                if (sheetRes.ok) {
                  sheetSynced = true;
                  console.log(`[Dev Contact API] Lead successfully synced to Google Sheets: ${inquiryId}`);
                } else {
                  console.warn(`[Dev Contact API] Google Sheet returned status ${sheetRes.status}`);
                }
              } catch (sheetErr: any) {
                console.error('[Dev Contact API] Webhook forward error:', sheetErr.message);
              }
            } else {
              console.log('[Dev Contact API] Received lead in local dev (Google Sheets Webhook not configured):', leadPayload);
            }

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({
              status: 'ok',
              message: 'Consultation request received successfully.',
              inquiryId,
              sheetSynced,
              details: leadPayload,
            }));
          } catch (err: any) {
            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 500;
            res.end(JSON.stringify({ status: 'error', message: err?.message || 'Server error' }));
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), marketDataDevPlugin(), contactDevPlugin()],
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

