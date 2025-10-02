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
    const { ticketId, title, description, priority, clientEmail, clientName } = await req.json()

    // Validate required fields
    if (!ticketId || !title || !description || !clientEmail) {
      throw new Error('Missing required fields: ticketId, title, description, clientEmail')
    }

    // Create email content
    const subject = `New Support Ticket: ${title}`
    const priorityColor = {
      'low': '#10b981',
      'medium': '#f59e0b', 
      'high': '#ef4444',
      'urgent': '#dc2626'
    }[priority] || '#6b7280'

    const priorityText = priority.charAt(0).toUpperCase() + priority.slice(1)

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
          <h1 style="margin: 0; font-size: 28px;">New Support Ticket</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Redux Reimagine Tech Solutions</p>
        </div>
        
        <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #e9ecef;">
          <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Ticket Details</h2>
            <p style="margin: 10px 0;"><strong>Ticket ID:</strong> ${ticketId}</p>
            <p style="margin: 10px 0;"><strong>Title:</strong> ${title}</p>
            <p style="margin: 10px 0;"><strong>Priority:</strong> <span style="color: ${priorityColor}; font-weight: bold;">${priorityText}</span></p>
            <p style="margin: 10px 0;"><strong>Client:</strong> ${clientName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${clientEmail}" style="color: #667eea; text-decoration: none;">${clientEmail}</a></p>
            <p style="margin: 10px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          </div>
          
          <div style="background: white; padding: 25px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h2 style="color: #333; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Description</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea; white-space: pre-wrap; line-height: 1.6; color: #555;">${description}</div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; background: #e3f2fd; border-radius: 8px;">
            <p style="margin: 0; color: #1976d2; font-weight: 500;">
              💡 <strong>Quick Reply:</strong> Click the email address above to reply directly to ${clientName}
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding: 20px; background: #fff3e0; border-radius: 8px;">
            <p style="margin: 0; color: #f57c00; font-weight: 500;">
              🎫 <strong>Ticket Management:</strong> Log into your admin dashboard to update ticket status
            </p>
          </div>
        </div>
        
        <div style="text-align: center; margin-top: 20px; color: #666; font-size: 14px;">
          <p>This ticket was submitted through your client portal</p>
          <p>Redux Reimagine Tech Solutions | (213) 787-7893</p>
        </div>
      </div>
    `

    // Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Redux Reimagine <noreply@resend.dev>',
        to: ['mengyishi9@gmail.com'], // Your email address
        reply_to: clientEmail, // Set reply-to to the client's email
        subject: subject,
        html: htmlContent,
      }),
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.text()
      throw new Error(`Failed to send email: ${errorData}`)
    }

    const emailResult = await emailResponse.json()

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Ticket notification sent successfully',
        emailId: emailResult.id 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error processing ticket notification:', error)
    
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
