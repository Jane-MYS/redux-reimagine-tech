import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the Resend API key from environment variables
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set')
    }

    // Parse the request body
    const { name, email, message } = await req.json()

    // Validate required fields
    if (!name || !email || !message) {
      throw new Error('Missing required fields: name, email, message')
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email address format')
    }

    // Create email content for you (the developer)
    const adminSubject = `New Contact Form Submission from ${name}`
    const adminHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">New Contact Form Submission</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Redux Reimagine Tech Solutions</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Contact Details</h2>
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a></p>
            <p style="margin: 10px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Message</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea; white-space: pre-wrap; line-height: 1.6;">${message}</div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #e3f2fd; border-radius: 8px;">
            <p style="margin: 0; color: #1976d2; font-weight: 500;">
              💡 <strong>Quick Reply:</strong> Click the email address above to reply directly to ${name}
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
          <p>This message was sent from your website contact form</p>
          <p>Redux Reimagine Tech Solutions | (213) 787-7893</p>
        </div>
      </div>
    `

    // Create confirmation email content for the client
    const clientSubject = `[CLIENT CONFIRMATION] Thank you for contacting Redux Reimagine Tech Solutions`
    const clientHtmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">Thank You, ${name}!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Redux Reimagine Tech Solutions</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">We Received Your Message</h2>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">
              Thank you for reaching out to Redux Reimagine Tech Solutions! We appreciate your interest in our services and have received your message.
            </p>
            <p style="font-size: 16px; line-height: 1.6; color: #555;">
              Our team will review your inquiry and get back to you within <strong>48 hours</strong> with a detailed response.
            </p>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Your Message</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea; white-space: pre-wrap; line-height: 1.6; color: #555;">${message}</div>
          </div>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; border-left: 4px solid #4caf50;">
            <h3 style="color: #2e7d32; margin-top: 0;">What's Next?</h3>
            <ul style="color: #2e7d32; margin: 0; padding-left: 20px;">
              <li>We'll review your project requirements</li>
              <li>Our team will prepare a detailed response</li>
              <li>You'll receive a follow-up within 48 hours</li>
              <li>We may schedule a consultation call if needed</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #fff3e0; border-radius: 8px;">
            <p style="margin: 0; color: #f57c00; font-weight: 500;">
              📞 <strong>Need immediate assistance?</strong> Call us at (213) 787-7893
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
          <p>This is an automated confirmation email</p>
          <p>Redux Reimagine Tech Solutions | (213) 787-7893</p>
          <p>Website: <a href="https://your-website.com" style="color: #667eea;">your-website.com</a></p>
        </div>
      </div>
    `

    // Send email to you (the developer)
    const adminEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Redux Reimagine <noreply@resend.dev>',
        to: ['mengyishi9@gmail.com'], // Your email address
        reply_to: email, // Set reply-to to the sender's email
        subject: adminSubject,
        html: adminHtmlContent,
      }),
    })

    if (!adminEmailResponse.ok) {
      const errorData = await adminEmailResponse.text()
      throw new Error(`Failed to send admin email: ${errorData}`)
    }

    // Send confirmation email to the client
    const clientEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Redux Reimagine <noreply@resend.dev>',
        to: ["mengyishi9@gmail.com"], // Client's email address
        subject: clientSubject,
        html: clientHtmlContent,
      }),
    })

    if (!clientEmailResponse.ok) {
      const errorData = await clientEmailResponse.text()
      throw new Error(`Failed to send client confirmation email: ${errorData}`)
    }

    const adminEmailResult = await adminEmailResponse.json()
    const clientEmailResult = await clientEmailResponse.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Contact form submitted successfully and confirmation sent',
        adminEmailId: adminEmailResult.id,
        clientEmailId: clientEmailResult.id
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error processing contact form:', error)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
})
