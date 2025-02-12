export default {
  async fetch(request, env) {
    const inputs = {
      prompt: "ninja samurai assassins creed protagonist, unreal engine 5, high quality, detailed, 4k",
    };

    const imageResponse = await env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
      inputs,
    );

    const imageBase64 = Buffer.from(imageResponse).toString('base64');

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
              }
              
              .column {
                  flex: 1;
                  padding: 1rem;
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
              }
              
              .social-icons a {
                  color: white;
                  margin: 0 1rem;
                  font-size: 1.5rem;
                  text-decoration: none;
              }
          </style>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
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
                  <img src="data:image/png;base64,${imageBase64}" alt="AI Generated Image">
              </div>
              
              <div class="column market-frame">
                  <h2>Polymarket</h2>
                  <iframe src="https://polymarket.com"></iframe>
              </div>
          </div>
          
          <footer>
              <div class="social-icons">
                  <a href="#"><i class="fab fa-twitter"></i></a>
                  <a href="#"><i class="fab fa-instagram"></i></a>
                  <a href="#"><i class="fab fa-github"></i></a>
                  <a href="#"><i class="fab fa-linkedin"></i></a>
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
