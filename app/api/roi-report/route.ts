import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { email, spend, roas, industry, results } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const formatCurrency = (n: number) => {
      if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
      if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
      return `$${n.toFixed(0)}`;
    };

    // TODO: replace onboarding@resend.dev with domain email once domain is configured
    await resend.emails.send({
      from: "Win at Ads <onboarding@resend.dev>",
      to: email,
      replyTo: process.env.CONTACT_EMAIL ?? "sluggett16@gmail.com",
      subject: "Your Ad ROI Report from Win at Ads",
      html: `
        <div style="font-family: sans-serif; max-width: 560px; margin: 0 auto; background: #0F0E17; color: #F8F8FC; padding: 40px; border-radius: 16px;">
          <h1 style="color: #FF2D55; font-size: 28px; margin-bottom: 8px;">Your Ad ROI Report</h1>
          <p style="color: rgba(248,248,252,0.5); margin-bottom: 32px;">Here's what we calculated based on your inputs.</p>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
              <td style="padding: 12px 0; color: rgba(248,248,252,0.5);">Monthly Ad Spend</td>
              <td style="padding: 12px 0; text-align: right; font-weight: bold;">${formatCurrency(spend)}/mo</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
              <td style="padding: 12px 0; color: rgba(248,248,252,0.5);">Current ROAS</td>
              <td style="padding: 12px 0; text-align: right; font-weight: bold;">${roas.toFixed(1)}x</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
              <td style="padding: 12px 0; color: rgba(248,248,252,0.5);">Industry</td>
              <td style="padding: 12px 0; text-align: right; font-weight: bold;">${industry}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
              <td style="padding: 12px 0; color: rgba(248,248,252,0.5);">Current Monthly Revenue</td>
              <td style="padding: 12px 0; text-align: right; font-weight: bold;">${formatCurrency(results.currentRevenue)}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
              <td style="padding: 12px 0; color: rgba(248,248,252,0.5);">Projected Monthly Revenue</td>
              <td style="padding: 12px 0; text-align: right; font-weight: bold; color: #FF2D55;">${formatCurrency(results.projectedRevenue)}</td>
            </tr>
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
              <td style="padding: 12px 0; color: rgba(248,248,252,0.5);">Monthly Uplift</td>
              <td style="padding: 12px 0; text-align: right; font-weight: bold; color: #2ECC71;">+${formatCurrency(results.monthlyUplift)}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: rgba(248,248,252,0.5);">Annual Opportunity</td>
              <td style="padding: 12px 0; text-align: right; font-weight: bold; color: #2ECC71;">+${formatCurrency(results.annualUplift)}</td>
            </tr>
          </table>

          <a href="http://172.105.104.4:8080#contact" style="display: block; text-align: center; background: #FF2D55; color: white; font-weight: bold; padding: 16px; border-radius: 12px; text-decoration: none; margin-bottom: 24px;">
            Claim My Free Audit →
          </a>

          <p style="color: rgba(248,248,252,0.3); font-size: 12px; text-align: center;">
            *Projections based on average results across client campaigns. Individual results vary.
          </p>
        </div>
      `,
    });

    // Lead notification to owner
    await resend.emails.send({
      from: "Win at Ads <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL ?? "sluggett16@gmail.com",
      subject: `ROI report requested by ${email}`,
      html: `
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Spend:</strong> ${formatCurrency(spend)}/mo</p>
        <p><strong>Current ROAS:</strong> ${roas.toFixed(1)}x</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Projected uplift:</strong> +${formatCurrency(results.monthlyUplift)}/mo</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send report" }, { status: 500 });
  }
}
