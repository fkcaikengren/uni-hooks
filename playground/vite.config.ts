import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
// https://vitejs.dev/config/
export default defineConfig((mode)=>{
  const packageDir = '../'
  return {
    plugins: [
      uni(),
    ],
    server: {
      port: 5000, 
      host: true, 
    },
    resolve: {
      alias: {
        '@caikengren/uni-hooks': `${__dirname}/../packages/uni-hooks/index.ts`,
      },
    },
  }
})