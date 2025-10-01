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
