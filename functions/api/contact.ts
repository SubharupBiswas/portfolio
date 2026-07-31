interface Env {
  RESEND_API_KEY: string;
  TURNSTILE_SECRET_KEY: string;
}

export const onRequestPost = async (context: any) => {
  try {
    const { name, email, subject, message, turnstileToken } = (await context.request.json()) as any;

    if (!name || !email || !message || !turnstileToken) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 1. Verify Cloudflare Turnstile Bot Token
    const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: context.env.TURNSTILE_SECRET_KEY,
        response: turnstileToken,
      }),
    });

    const turnstileData = (await turnstileRes.json()) as any;
    if (!turnstileData.success) {
      return new Response(JSON.stringify({ error: 'Bot security verification failed' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // 2. Send Email via Resend API
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact <onboarding@resend.dev>',
        to: ['hello@subharup.com'],
        reply_to: email,
        subject: `[Portfolio Contact] ${subject || 'New Message'} from ${name}`,
        html: `
          <h3>New Message from ${name} (${email})</h3>
          <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      }),
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      return new Response(
        JSON.stringify({ error: 'Failed to dispatch email via Resend', details: errText }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(JSON.stringify({ success: true, message: 'Message sent successfully' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
