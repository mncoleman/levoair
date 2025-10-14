# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/ccfc2e10-6375-4fed-9f77-007a07a4539b

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/ccfc2e10-6375-4fed-9f77-007a07a4539b) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/ccfc2e10-6375-4fed-9f77-007a07a4539b) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

## Deployment with GitHub Actions (GitHub Pages)

This repository includes a GitHub Actions workflow at `.github/workflows/deploy.yml` that builds the Vite app and deploys the output in `dist/` to GitHub Pages.

Quick notes to get it working:

- The workflow triggers on pushes to the `main` branch and can be run manually from the Actions tab.
- By default the workflow uses the `dist` folder produced by `npm run build` and the official Pages deploy actions.
- Ensure GitHub Pages is enabled in the repository settings. In Settings -> Pages choose the deployment source "GitHub Actions" (the Pages action will manage the branch).
- To use a custom domain, add a `CNAME` file to `public/` with your domain or set it in the Pages settings UI.

Optional improvements:

- Add caching to the workflow to speed up installs (actions/cache for npm).
- If you have a large bundle, consider code-splitting or adjusting Vite/Rollup manualChunks to reduce chunk sizes.

