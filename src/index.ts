export default {
  async fetch(request, env) {
    const inputs = {
      prompt: "ninja samurai assassins creed protagonist, unreal engine 5, high quality, detailed, 4k",
    };

    const response = await env.AI.run(
      "@cf/stabilityai/stable-diffusion-xl-base-1.0",
      inputs,
    );

    return new Response(response, {
      headers: {
        "content-type": "image/png",
      },
    });
  },
} satisfies ExportedHandler<Env>;
