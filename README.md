# ✨ AI Image Generator

A sleek, modern, and professional Text-to-Image generator web application powered by React, Vite, and the Hugging Face Inference API. 

**🚀 Live Demo:** [AI Image Generator on Vercel](https://text-to-exzf52ctq-harshil-chawlas-projects.vercel.app/)

## 🌟 Features

- **Beautiful Dark Aesthetic:** A stunning glassmorphic design featuring glowing accents and a crisp, centered interface.
- **Direct API Integration:** Generates high-quality images directly from text prompts using the `stabilityai/stable-diffusion-xl-base-1.0` model.
- **Bring Your Own Token:** Users can override the default API token directly from the frontend interface using a secure password field.
- **Robust Error Handling:** Contains resilient fallback logic for varying JSON/Blob API responses, maintaining a crash-proof user experience.
- **Simulated UI State:** Features custom CSS loading spinners and clean empty states while images process.

## 🛠️ Technology Stack

- **Frontend:** React 19 + Vite
- **Styling:** Vanilla CSS Custom Features (CSS variables, animations, gradients)
- **API:** Hugging Face Node.js Proxy/Inference endpoint

## 💻 Running Locally

### Prerequisites

Make sure you have Node.js installed (v18+ recommended).

### Quickstart

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Harshil-Chawla/text-to-img.git
   cd text-to-img
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the Environment:**
   You will find a `.env.example` in the root folder. Rename it to `.env` and paste your Hugging Face Access Token:
   ```env
   VITE_HF_TOKEN=hf_your_actual_token_here
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   *Your app will be available at `http://localhost:5173`.*

## 🚀 Deployment

This project is deployed effortlessly using Vercel. Continuous Integration handles pushes to the `main` branch automatically. 

## 📄 License

This project is open-source and available for free.
