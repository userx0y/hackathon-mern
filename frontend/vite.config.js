import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})


  // server : {
  //   host : '0.0.0.0',
  //   port : 5173,
  //   allowedHosts : ['31aadc60e7eb.ngrok-free.app'],
  //   // allowedHosts : 'all',
  //   hmr : {
  //     // host : 'a6a9d0e65ec2.ngrok-free.app',
  //     clientPort : 443,
  //   }
  // }