<a href="https://ai-sdk-starter-groq.vercel.app">
  <h1 align="center">Vercel Agentic RAG Starter</h1>
</a>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Groq-FF6B6B?style=flat-square&logo=groq&logoColor=white" alt="Groq" />
  <img src="https://img.shields.io/badge/Vercel_AI_SDK-000000?style=flat-square&logo=vercel&logoColor=white" alt="Vercel AI SDK" />
</p>

<p align="center">
  <a href="https://github.com/deepakkamboj/vercel-agentic-rag-starter/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/deepakkamboj/vercel-agentic-rag-starter/ci.yml?branch=main&label=build&style=flat-square&logo=github" alt="Build Status" />
  </a>
</p>

<p align="center">
  An enterprise-ready AI chatbot application with Retrieval Augmented Generation (RAG) capabilities built using Next.js, the AI SDK by Vercel, and Groq for ultra-fast inference.
</p>

<p align="center">
  <a href="#architecture"><strong>Architecture</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#technology-stack"><strong>Technology Stack</strong></a> · 
  <a href="#running-locally"><strong>Running Locally</strong></a> ·
  <a href="#contributing"><strong>Contributing</strong></a> ·
  <a href="#authors"><strong>Authors</strong></a>
</p>
<br/>

## Architecture

The Vercel Agentic RAG Starter implements a modern Retrieval Augmented Generation architecture:

```
┌─────────────────┐     ┌────────────────┐     ┌─────────────────┐
│                 │     │                │     │                 │
│   Next.js App   │────▶│   Vercel AI    │────▶│  Groq API for   │
│   (Frontend)    │     │      SDK       │     │    Inference    │
│                 │     │                │     │                 │
└────────┬────────┘     └────────────────┘     └─────────────────┘
         │                                             ▲
         │                                             │
         ▼                                             │
┌─────────────────┐     ┌────────────────┐            │
│                 │     │                │            │
│  User Queries   │────▶│  RAG Pipeline  │────────────┘
│                 │     │                │
└─────────────────┘     └───────┬────────┘
                                │
                                ▼
                        ┌────────────────┐
                        │                │
                        │  Vector Store  │
                        │  & Knowledge   │
                        │     Base       │
                        │                │
                        └────────────────┘
```

## Features

- **🚀 Streaming responses** powered by the [AI SDK by Vercel](https://sdk.vercel.ai/docs), enabling seamless integration with multiple AI providers
- **📚 Retrieval Augmented Generation (RAG)** for accurate, knowledge-grounded responses based on your own data
- **🛠️ Tool integration framework** for extending AI capabilities:
  - Weather tool example included
  - Framework for adding custom tools
- **🧠 Advanced reasoning capabilities** with state-of-the-art language models
- **📱 Responsive design** using [shadcn/ui](https://ui.shadcn.com/) components and [Tailwind CSS](https://tailwindcss.com)
- **🔄 Conversation history** management and persistence
- **⚡️ Ultra-fast inference** powered by Groq's optimized infrastructure
- **🖼️ Modern UI/UX** built with the latest [Next.js](https://nextjs.org) App Router

## Technology Stack

- **Frontend Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI Integration**: Vercel AI SDK
- **LLM Provider**: Groq
- **Deployment**: Vercel Platform
- **Development Tools**: ESLint, Prettier, TypeScript
- **CI/CD**: GitHub Actions

## Running Locally

1. **Clone the repository and install dependencies:**

   ```bash
   git clone https://github.com/deepakkamboj/vercel-agentic-rag-starter.git
   cd vercel-agentic-rag-starter
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. **Set up environment variables:**

   You can use the Vercel CLI method:

   ```bash
   # Install Vercel CLI
   npm i -g vercel
   # Link to your Vercel project
   vercel link
   # Pull environment variables
   vercel env pull
   ```

   Alternatively, copy the `.env.example` file to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

   And update the following environment variables:

   - `GROQ_API_KEY`: Your Groq API key
   - `OPENAI_API_KEY`: (Optional) If using OpenAI models
   - `WEATHER_API_KEY`: For the weather tool example

3. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open [http://localhost:3000](http://localhost:3000)** to view your application.

# Vercel Agentic RAG Starter

A Next.js application for building AI-powered chat interfaces with RAG capabilities.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your API keys:

```bash
cp .env.example .env.local
```

## Build

To build for production:

```bash
npm run build
```

This will create a static export in the `out` directory for deployment to GitHub Pages.

## Deployment

This project is configured to deploy to GitHub Pages automatically when you push to the main branch.
