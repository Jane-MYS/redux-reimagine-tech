# 🚀 Supabase Edge Functions Setup Guide

## 📋 **Prerequisites**

1. **Supabase CLI** ✅ (Already installed)
2. **Resend Account** (For sending emails)
3. **Supabase Project** ✅ (Already have: `pftfxvxyffqufypmsjen`)

---

## 🔧 **Step 1: Set up Resend Account**

### **1.1 Create Resend Account**
1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### **1.2 Get API Key**
1. Go to **API Keys** in your Resend dashboard
2. Click **Create API Key**
3. Name it: `supabase-notifications`
4. Copy the API key (starts with `re_`)

### **1.3 Verify Domain (Optional but Recommended)**
1. Go to **Domains** in Resend dashboard
2. Add your domain (e.g., `yourdomain.com`)
3. Add the required DNS records
4. This allows you to send from `noreply@yourdomain.com`

---

## 🔑 **Step 2: Set up Supabase Secrets**

### **2.1 Login to Supabase CLI**
```bash
# You'll need to get an access token from Supabase dashboard
# Go to: https://supabase.com/dashboard/account/tokens
# Create a new token and copy it

export SUPABASE_ACCESS_TOKEN="your_access_token_here"
supabase login
```

### **2.2 Link to Your Project**
```bash
supabase link --project-ref pftfxvxyffqufypmsjen
```

### **2.3 Set Resend API Key as Secret**
```bash
supabase secrets set RESEND_API_KEY="re_your_resend_api_key_here"
```

---

## 🚀 **Step 3: Deploy the Edge Function**

### **3.1 Deploy the Function**
```bash
supabase functions deploy send-notification
```

### **3.2 Verify Deployment**
```bash
supabase functions list
```

---

## 🧪 **Step 4: Test the Function**

### **4.1 Test Locally (Optional)**
```bash
supabase functions serve send-notification
```

### **4.2 Test from Your App**
The function will be available at:
```
https://pftfxvxyffqufypmsjen.supabase.co/functions/v1/send-notification
```

---

## 📧 **Step 5: Update Your App Code**

The `Projects.tsx` file is already updated to use the Edge Function. The notification functions will call:

```javascript
// For comments
await supabase.functions.invoke('send-notification', {
  type: 'comment',
  projectId: projectId,
  projectTitle: projectTitle,
  comment: comment,
  userEmail: user.email,
  userName: user.user_metadata?.full_name || user.email
})

// For file uploads
await supabase.functions.invoke('send-notification', {
  type: 'file_upload',
  projectId: projectId,
  projectTitle: projectTitle,
  files: uploadedFiles,
  userEmail: user.email,
  userName: user.user_metadata?.full_name || user.email
})
```

---

## 🔍 **Step 6: Monitor and Debug**

### **6.1 View Function Logs**
```bash
supabase functions logs send-notification
```

### **6.2 Check Resend Dashboard**
- Go to your Resend dashboard
- Check the **Logs** section for sent emails
- Monitor delivery status

---

## 🛠️ **Troubleshooting**

### **Common Issues:**

1. **"Access token not provided"**
   - Get access token from Supabase dashboard
   - Set `SUPABASE_ACCESS_TOKEN` environment variable

2. **"RESEND_API_KEY not set"**
   - Make sure you've set the secret: `supabase secrets set RESEND_API_KEY="your_key"`

3. **"Failed to send email"**
   - Check your Resend API key
   - Verify domain if using custom domain
   - Check Resend dashboard for error details

4. **CORS errors**
   - The function includes CORS headers
   - Make sure you're calling from the correct domain

---

## 📊 **Function Features**

✅ **Comment Notifications**
- Sends email when client adds a comment
- Includes project name, client info, and comment content

✅ **File Upload Notifications**
- Sends email when client uploads files
- Lists all uploaded files with names and sizes

✅ **Error Handling**
- Comprehensive error handling and logging
- Returns detailed error messages

✅ **CORS Support**
- Handles preflight requests
- Allows cross-origin requests

---

## 🎯 **Next Steps**

1. **Set up Resend account** and get API key
2. **Deploy the Edge Function** using Supabase CLI
3. **Test notifications** from your app
4. **Monitor logs** for any issues
5. **Customize email templates** if needed

---

## 💡 **Pro Tips**

- **Use a custom domain** in Resend for better deliverability
- **Monitor your Resend usage** to stay within free limits
- **Set up email templates** in Resend for consistent branding
- **Use Supabase logs** to debug any issues

---

## 📞 **Support**

If you encounter any issues:
1. Check the Supabase function logs
2. Check the Resend dashboard for email delivery
3. Verify all environment variables are set correctly
4. Test the function locally first

---

**Ready to deploy? Let's get your email notifications working! 🚀**
