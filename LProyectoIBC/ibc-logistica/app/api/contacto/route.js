import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { nombre, email, servicio, mensaje } = await request.json();

    console.log("Clave cargada:", process.env.RESEND_API_KEY ? "SÍ" : "NO");

    const { data, error } = await resend.emails.send({
      from: 'IBC Logística <onboarding@resend.dev>',
      to: ['ibc314159@gmail.com'],
      subject: `Nueva cotización de ${nombre} - ${servicio}`,
      html: `
        <h2>Nueva solicitud de contacto</h2>
        <p><strong>Nombre / Empresa:</strong> ${nombre}</p>
        <p><strong>Correo:</strong> ${email}</p>
        <p><strong>Tipo de Transporte:</strong> ${servicio}</p>
        <p><strong>Detalles de la carga:</strong></p>
        <p>${mensaje}</p>
      `,
    });

    if (error) {
      console.error("ERROR DE RESEND:", error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ message: 'Correo enviado', data }, { status: 200 });
  } catch (err) {
    console.error("ERROR INTERNO:", err);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
