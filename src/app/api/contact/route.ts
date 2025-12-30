import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"${name}" <${process.env.SMTP_USER}>`,
            to: "asensio@activemarmenor.eu",
            subject: `Nuevo mensaje de ${name}`,
            text: `Email: ${email}\n\nMensaje: ${message}`,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending email:", error);
        return NextResponse.json({ error: "Error al enviar" }, { status: 500 });
    }
}
