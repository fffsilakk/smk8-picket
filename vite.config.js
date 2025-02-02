import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";  
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
    ],
  },
  server: {
    proxy: {
      "/api": {
        target: "https://picket.ocph23.tech/api/auth/login",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
