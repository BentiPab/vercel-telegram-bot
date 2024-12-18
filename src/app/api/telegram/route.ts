import bot from '@/bot';
import Cors from 'cors';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const cors = Cors({
    methods: ['POST'],
    origin: (origin, callback) => {
      // Restrict to Telegram's servers (you can adjust this if needed)
      if (!origin || origin === 'https://api.telegram.org') {
        callback(null, true); // Allow the request
      } else {
        callback(new Error('CORS policy: Only Telegram servers allowed'), false); // Deny the request
      }
    },
  });

// Helper function to run the middleware
async function runCors(req: Request, res: Response) {
    return await new Promise<void>((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cors(req as any, res as any, (result) => {
          if (result instanceof Error) {
            return reject(result); // Reject the promise if there's an error
          }
          resolve(); // Resolve the promise when CORS is successfully handled
        });
      });
}

export default async function handler(req: Request,res:Response) {
  console.log("processing request", req)
    await runCors(req, res);
    const telegramSecretToken = req.headers.get('x-telegram-bot-api-secret-token');
    if (telegramSecretToken !== TELEGRAM_BOT_TOKEN) {
        return new Response(JSON.stringify({ message: 'Forbidden' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
          });
    }

  if (req.method === 'POST') {
    try {
      const body = await req.json(); 
      await bot.handleUpdate(body); 
      return new Response(JSON.stringify({ message: 'OK' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error handling update:', error);
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } else {
    console.error("Method not allowd", req.method)
    return new Response(JSON.stringify({ message: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
