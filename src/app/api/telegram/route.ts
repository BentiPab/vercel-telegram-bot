import bot from '@/bot';
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

export async function POST(req: Request,{ params }: { params: Promise<{ bot_token: string }> },) {

    const telegramSecretToken = (await params).bot_token;;
    if (telegramSecretToken !== TELEGRAM_BOT_TOKEN) {
        return new Response(JSON.stringify({ message: 'Forbidden' }), {
            status: 403,
            headers: { 'Content-Type': 'application/json' },
          });
    }

    console.log(req.headers)

    try {
      const body = await req.json(); 
      console.log(body)
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

}
