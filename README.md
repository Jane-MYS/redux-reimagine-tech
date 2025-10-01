# Redux Reimagine Tech Solutions

This repository is set up with GitHub Pages deployment workflow.

## GitHub Pages Deployment

The repository includes a GitHub Actions workflow (`pages-build-deployment.yml`) that automatically deploys to GitHub Pages when you push to the main branch.

### Workflow Features:
- Triggers on pushes to the `main` branch
- Can be manually triggered from the Actions tab
- Builds the project using Node.js 18
- Deploys the built files to GitHub Pages
- Uses the latest GitHub Actions for Pages deployment

### Setup Instructions:

1. **Enable GitHub Pages in your repository:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

2. **Push your code to the main branch:**
   ```bash
   git add .
   git commit -m "Initial commit with GitHub Pages workflow"
   git push origin main
   ```

3. **Customize the build process:**
   - Update the `build` script in `package.json` to match your project's build requirements
   - Modify the `path` in the workflow file if your build output goes to a different directory

### Workflow File Location:
`.github/workflows/pages-build-deployment.yml`

The workflow will automatically run when you push to the main branch and deploy your site to GitHub Pages.

## Contact Form Setup

The contact form uses EmailJS to send emails. To set up the contact form:

### 1. Create EmailJS Account
- Go to [emailjs.com](https://www.emailjs.com/) and create an account
- Verify your email address

### 2. Set Up Email Service
- Go to "Email Services" in your EmailJS dashboard
- Add a service (Gmail, Outlook, etc.)
- Follow the setup instructions for your chosen service
- Note down your **Service ID**

### 3. Create Email Template
- Go to "Email Templates" in your EmailJS dashboard
- Click "Create New Template"
- Use this template content:

**Subject:** New Contact Form Message from {{from_name}}

**Content:**
```
Hello {{to_name}},

You have received a new message from your website contact form:

Name: {{from_name}}
Email: {{from_email}}
Message: {{message}}

You can reply directly to this email to respond to {{from_name}}.

Best regards,
Your Website
```

**Template Variables to include:**
- `{{from_name}}` - Sender's name
- `{{from_email}}` - Sender's email
- `{{message}}` - Message content
- `{{to_name}}` - Recipient name
- `{{to_email}}` - Recipient email (set this to your email)
- `{{reply_to}}` - Reply-to address

**Important:** In the template settings, set:
- **To Email:** Your email address (e.g., your-email@domain.com)
- **From Name:** {{from_name}}
- **Reply To:** {{reply_to}}

### 4. Get Your Credentials
- **Service ID:** From your email service
- **Template ID:** From your email template
- **Public Key:** From your EmailJS account settings

### 5. Set Environment Variables (Optional)
```bash
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### Common Issues:
- **"422 The recipients address is empty"**: Make sure your template has a "To Email" set in the template settings
- **"Invalid template"**: Check that all template variables are properly formatted with double curly braces
- **"Service not found"**: Verify your Service ID is correct

If environment variables are not set, the form will use default values. Make sure your EmailJS service is properly configured for the contact form to work.
