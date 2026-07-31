interface Env {
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;

    // Resolve keys from Cloudflare context.env first, process.env second
    const turnstileSecret = env?.TURNSTILE_SECRET_KEY || process.env.TURNSTILE_SECRET_KEY;
    const resendApiKey = env?.RESEND_API_KEY || process.env.RESEND_API_KEY;

    if (!turnstileSecret) {
      return new Response(
        JSON.stringify({ error: 'Missing TURNSTILE_SECRET_KEY configuration' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = (await request.json()) as any;
    const { name, email, subject, message, turnstileToken } = body;

    if (!turnstileToken) {
      return new Response(
        JSON.stringify({ error: 'Bot security verification failed: Token missing' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Verify token with Cloudflare Turnstile API
    const formData = new FormData();
    formData.append('secret', turnstileSecret);
    formData.append('response', turnstileToken);

    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const verifyOutcome = (await verifyRes.json()) as { success: boolean; 'error-codes'?: string[] };

    if (!verifyOutcome.success) {
      return new Response(
        JSON.stringify({
          error: 'Bot security verification failed',
          details: verifyOutcome['error-codes'] || [],
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Dispatch email via Resend API
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['biswas.subh2018@gmail.com'],
        reply_to: email,
        subject: `[Portfolio Inquiry] ${subject || 'New Message'}`,
        html: `<p><strong>From:</strong> ${name} (${email})</p><p><strong>Subject:</strong> ${subject || 'N/A'}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br>')}</p>`,
      }),
    });

    if (!resendRes.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to dispatch email via provider' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err?.message || 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
