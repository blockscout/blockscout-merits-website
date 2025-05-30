# Blockscout Merits dashboard

A central hub for the Blockscout Merits program where users can get all necessary information about Merits program and badges.

## Environment Variables

Create two environment files in the root directory:

1. `.env.dev` - development environment variables
2. `.env.secrets` - secret environment variables (not shared in repository)

Required environment variables:

```env
# API Configuration
NEXT_PUBLIC_API_HOST=https://points.k8s-dev.blockscout.com  # for development
# or
NEXT_PUBLIC_API_HOST=https://merits.blockscout.com  # for production

# CDN Configuration
NEXT_PUBLIC_IMAGE_CDN_URL=https://blockscout-merits-images.s3.us-east-1.amazonaws.com

# Reown Configuration
NEXT_PUBLIC_REOWN_PROJECT_ID=your_reown_project_id  # Get from Reown website
```

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/your-username/blockscout-merits-website.git
cd blockscout-merits-website
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev -- --preset=dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
