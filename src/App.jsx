import { useState } from 'react';
import './index.css';

function App() {
  const [token, setToken] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [image, setImage] = useState(null);

  const handleGenerate = async () => {
    const activeToken = token.trim() || import.meta.env.VITE_HF_TOKEN;

    if (!activeToken) {
      alert("Please enter a Hugging Face API token!");
      return;
    }

    if (!prompt.trim()) return;
    setIsGenerating(true);
    setImage(null);
    
    try {
      const response = await fetch(
        "https://router.huggingface.co/nscale/v1/images/generations",
        {
          headers: {
            Authorization: `Bearer ${activeToken}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            response_format: "b64_json",
            prompt: prompt,
            model: "stabilityai/stable-diffusion-xl-base-1.0",
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} ${response.statusText}\n${errorText}`);
      }

      // Nscale/OpenAI format returns JSON, but we use a clone to safely fallback to a blob if it returns raw image bytes.
      const clone = response.clone();
      try {
        const json = await response.json();
        if (json && json.data && json.data.length > 0 && json.data[0].b64_json) {
          setImage(`data:image/jpeg;base64,${json.data[0].b64_json}`);
          return;
        }
      } catch (e) {
        // If it throws, it means it's not JSON, so it might be a raw image blob.
      }
      
      const resultBlob = await clone.blob();
      setImage(URL.createObjectURL(resultBlob));
    } catch (error) {
      console.error(error);
      alert(`Generation failed: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="app-container">
      <main className="generator-card">
        <header className="header">
          <h1>AI Image Generator</h1>
          <p>Turn your imagination into visual reality</p>
        </header>

        <section className="input-section">
          <input 
            type="password"
            className="token-input"
            placeholder="Paste Hugging Face Access Token..."
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
          <textarea 
            className="text-input" 
            placeholder="Describe what you want to see..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
          />
          <button 
            className={`generate-btn ${isGenerating || !prompt.trim() ? 'disabled' : ''}`}
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? 'Generating...' : 'Generate Art'}
          </button>
        </section>

        <section className="display-section">
          {isGenerating && (
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Crafting your vision...</p>
            </div>
          )}

          {!isGenerating && image && (
            <div className="image-container">
              <img src={image} alt={prompt} className="generated-image" />
            </div>
          )}

          {!isGenerating && !image && (
            <div className="empty-state">
              <div className="placeholder-icon">✨</div>
              <p>Your creation will appear here</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
