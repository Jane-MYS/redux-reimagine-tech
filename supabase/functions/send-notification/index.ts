import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    const { type, projectId, projectTitle, comment, files, userEmail, userName } = await req.json()

    // Validate required fields
    if (!type || !projectId || !projectTitle) {
      throw new Error('Missing required fields: type, projectId, projectTitle')
    }

    // Create email content based on notification type
    let subject = ''
    let htmlContent = ''

    if (type === 'comment') {
      subject = `New Comment on Project: ${projectTitle}`
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Comment on Project</h2>
          <p><strong>Project:</strong> ${projectTitle}</p>
          <p><strong>Client:</strong> ${userName || userEmail}</p>
          <p><strong>Comment:</strong></p>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${comment}
          </div>
          <p style="color: #666; font-size: 14px;">
            Please log into your client portal to respond to this comment.
          </p>
        </div>
      `
    } else if (type === 'file_upload') {
      subject = `New Files Uploaded for Project: ${projectTitle}`
      const fileList = files.map((file: any) => `<li>${file.name} (${file.size})</li>`).join('')
      htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">New Files Uploaded</h2>
          <p><strong>Project:</strong> ${projectTitle}</p>
          <p><strong>Client:</strong> ${userName || userEmail}</p>
          <p><strong>Uploaded Files:</strong></p>
          <ul style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
            ${fileList}
          </ul>
          <p style="color: #666; font-size: 14px;">
            Please log into your client portal to review these files.
          </p>
        </div>
      `
    } else {
      throw new Error('Invalid notification type')
    }

    // Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'onboarding@resend.dev', // Using Resend's default domain
        to: ['mengyishi9@gmail.com'], // Your email address
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
        message: 'Notification sent successfully',
        emailId: emailResult.id 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error sending notification:', error)
    
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
