interface Env {
  TURNSTILE_SECRET_KEY: string;
  RESEND_API_KEY: string;
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  try {
    const { request, env } = context;

    const turnstileSecret = env?.TURNSTILE_SECRET_KEY || process.env.TURNSTILE_SECRET_KEY;
    const resendApiKey = env?.RESEND_API_KEY || process.env.RESEND_API_KEY;

    if (!turnstileSecret) {
      return new Response(
        JSON.stringify({ error: 'Server Config Error: TURNSTILE_SECRET_KEY missing' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: 'Server Config Error: RESEND_API_KEY missing' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const body = (await request.json()) as any;
    const { name, email, subject, message, turnstileToken } = body;

    if (!turnstileToken) {
      return new Response(
        JSON.stringify({ error: 'Verification Error: Turnstile token missing' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const formData = new FormData();
    formData.append('secret', turnstileSecret);
    formData.append('response', turnstileToken);

    const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    const verifyOutcome = (await verifyRes.json()) as { success: boolean; 'error-codes'?: string[] };

    if (!verifyOutcome.success) {
      const errorDetails = verifyOutcome['error-codes']?.join(', ') || 'Invalid token';
      return new Response(
        JSON.stringify({ error: `Bot verification failed: ${errorDetails}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Dispatch Email via Resend
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Subharup Biswas <hello@subharup.com>',
        to: ['hello@subharup.com'],
        reply_to: email,
        subject: `[Portfolio Inquiry] ${subject}`,
        html: `
          <p><strong>From:</strong> ${name} (&lt;${email}&gt;)</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
    });

    if (!resendRes.ok) {
      const resendErr = (await resendRes.json().catch(() => ({ message: 'Failed to parse response' }))) as any;
      return new Response(
        JSON.stringify({ error: `Resend Dispatch Failed: ${resendErr.message || JSON.stringify(resendErr)}` }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Message sent successfully!' }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: `Unhandled Error: ${err?.message || err}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
