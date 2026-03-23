import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const GRADE_LABELS: Record<string, string> = {
  A: "You're crushing it — small wins left to find.",
  B: "Solid foundation. A few fixes could unlock serious growth.",
  C: "Room to improve — and the improvements are very findable.",
  D: "There's money being left on the table. Let's fix that.",
  F: "Okay, we need to talk. The good news? It only goes up from here.",
};

const GRADE_COLORS: Record<string, string> = {
  A: "#2ECC71",
  B: "#3498DB",
  C: "#F39C12",
  D: "#FF6B35",
  F: "#FF2D55",
};

export async function POST(req: NextRequest) {
  try {
    const { email, grade, score, tips } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const color = GRADE_COLORS[grade] ?? "#FF2D55";
    const label = GRADE_LABELS[grade] ?? "";

    // TODO: replace onboarding@resend.dev with domain email once domain is configured
    await resend.emails.send({
      from: "Win at Ads <onboarding@resend.dev>",
      to: email,
      replyTo: process.env.CONTACT_EMAIL ?? "sluggett16@gmail.com",
      subject: `Your Ad Account Grade: ${grade} — Win at Ads`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #0F0E17; color: #F8F8FC; padding: 40px; border-radius: 16px;">
          <h1 style="color: #FF2D55; font-size: 28px; margin-bottom: 8px;">Your Ad Account Grade</h1>

          <div style="text-align: center; margin: 32px 0;">
            <div style="display: inline-block; width: 96px; height: 96px; border-radius: 50%; border: 4px solid ${color}; line-height: 88px; font-size: 48px; font-weight: 900; color: ${color};">
              ${grade}
            </div>
            <p style="color: rgba(248,248,252,0.6); margin-top: 12px;">${label}</p>
          </div>

          ${tips.length > 0 ? `
          <h2 style="font-size: 16px; color: rgba(248,248,252,0.5); text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px;">Quick wins we spotted</h2>
          ${tips.map((tip: string, i: number) => `
            <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 16px; margin-bottom: 12px;">
              <span style="color: #FF2D55; font-weight: 900;">${i + 1}.</span>
              <span style="color: rgba(248,248,252,0.7); margin-left: 8px;">${tip}</span>
            </div>
          `).join("")}
          ` : ""}

          <a href="http://172.105.104.4:8080#contact" style="display: block; text-align: center; background: #FF2D55; color: white; font-weight: bold; padding: 16px; border-radius: 12px; text-decoration: none; margin-top: 32px;">
            Book a Free Audit Call →
          </a>

          <p style="color: rgba(248,248,252,0.3); font-size: 12px; text-align: center; margin-top: 24px;">
            Score: ${score}/56
          </p>
        </div>
      `,
    });

    // Lead notification to owner
    await resend.emails.send({
      from: "Win at Ads <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL ?? "sluggett16@gmail.com",
      subject: `Audit quiz completed by ${email} — Grade: ${grade}`,
      html: `
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Grade:</strong> ${grade} (${score}/56)</p>
        <p><strong>Tips shown:</strong></p>
        <ul>${tips.map((t: string) => `<li>${t}</li>`).join("")}</ul>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send report" }, { status: 500 });
  }
}
