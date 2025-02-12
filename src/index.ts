export default {
  async fetch(request, env) {
    const inputs = {
      prompt: "ninja samurai assassins creed protagonist, unreal engine 5, high quality, detailed, 4k",
    };

    // La respuesta ya es un Uint8Array
    const imageBytes = await env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
      inputs,
    );

    // Convertir directamente los bytes a base64
    let binary = '';
    imageBytes.forEach(byte => binary += String.fromCharCode(byte));
    const base64 = globalThis.btoa(binary);

    const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>AI Art Gallery</title>
          <style>
              * { margin: 0; padding: 0; box-sizing: border-box; }
              
              nav {
                  background: #333;
                  color: white;
                  padding: 1rem;
                  text-align: center;
              }
              
              .container {
                  display: flex;
                  justify-content: space-between;
                  padding: 2rem;
                  gap: 2rem;
                  flex-wrap: wrap;
              }
              
              .column {
                  flex: 1;
                  padding: 1rem;
                  min-width: 300px;
              }
              
              .haiku {
                  font-style: italic;
                  line-height: 1.6;
              }
              
              .ai-image img {
                  max-width: 100%;
                  height: auto;
              }
              
              .market-frame iframe {
                  width: 100%;
                  height: 600px;
                  border: none;
              }
              
              footer {
                  background: #333;
                  color: white;
                  padding: 1rem;
                  text-align: center;
                  margin-top: auto;
              }
              
              .social-icons {
                  display: flex;
                  justify-content: center;
                  gap: 1rem;
              }
              
              .social-icons a {
                  color: white;
                  text-decoration: none;
                  font-size: 24px;
              }
              
              .icon {
                  display: inline-block;
                  width: 24px;
                  height: 24px;
                  line-height: 24px;
                  text-align: center;
              }
          </style>
      </head>
      <body>
          <nav>
              <h1>AI Art Gallery</h1>
          </nav>
          
          <div class="container">
              <div class="column haiku">
                  <h2>Haiku del día</h2>
                  <p>
                      Sombras de guerrero<br>
                      En la noche silente<br>
                      Luna vigilante
                  </p>
              </div>
              
              <div class="column ai-image">
                  <h2>Imagen Generada por IA</h2>
                  <img src="data:image/png;base64,${base64}" alt="AI Generated Image">
              </div>
              
              <div class="column market-frame">
                  <h2>Polymarket</h2>
                  <iframe src="https://polymarket.com"></iframe>
              </div>
          </div>
          
          <footer>
              <div class="social-icons">
                  <a href="#" class="icon">🐦</a>
                  <a href="#" class="icon">📸</a>
                  <a href="#" class="icon">💻</a>
                  <a href="#" class="icon">💼</a>
              </div>
          </footer>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: {
        "content-type": "text/html",
      },
    });
  },
} satisfies ExportedHandler<Env>;
