import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: "server",
  adapter: cloudflare({
    imageService: "compile"
  }),
  site: "https://www.fsvalgermissen.de",
  integrations: [sitemap()],
  vite: {
    resolve: {
      alias: {
        "@components": new URL("./src/components", import.meta.url).pathname,
        "@layouts": new URL("./src/layouts", import.meta.url).pathname,
        "@lib": new URL("./src/lib", import.meta.url).pathname,
        "@styles": new URL("./src/styles", import.meta.url).pathname
      }
    }
  }
});
