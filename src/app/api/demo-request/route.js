import { NextResponse } from 'next/server';
import { demoRequestSchema } from '@/lib/demoRequestSchema';

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo inválido' }, { status: 400 });
  }

  const parsed = demoRequestSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'Datos inválidos', issues: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { nombreCompleto, direccion, email, nombreComercio, paginaWeb } = parsed.data;

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Faltan TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID en el entorno');
    return NextResponse.json({ error: 'Servicio no disponible' }, { status: 500 });
  }

  const text = [
    '🎥 *Nueva solicitud de demo*',
    '',
    `*Nombre:* ${nombreCompleto}`,
    `*Dirección:* ${direccion}`,
    `*Email:* ${email}`,
    `*Comercio:* ${nombreComercio}`,
    `*Página web:* ${paginaWeb || '—'}`,
  ].join('\n');

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: 'Markdown',
      }),
    });

    if (!telegramRes.ok) {
      const errBody = await telegramRes.text();
      console.error('Error enviando mensaje a Telegram:', errBody);
      return NextResponse.json({ error: 'No se pudo enviar la notificación' }, { status: 502 });
    }
  } catch (err) {
    console.error('Error de red al contactar Telegram:', err);
    return NextResponse.json({ error: 'No se pudo enviar la notificación' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
