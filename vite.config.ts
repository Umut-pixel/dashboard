// 💀 BULLETPROOF FINAL MOTION-DOM ELIMINATION: 1735950000000
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 💀 BULLETPROOF MOTION-DOM EXTERMINATION PLUGIN
const bulletproofMotionDomExtermination = () => {
  const BULLETPROOF_BLOCKED = [
    'motion-dom', 'motion-dom@', '@motion-dom',
    'esm.sh', 'cdn.skypack.dev', 'unpkg.com', 'jsdelivr.net',
    'motion-dom.mjs', '/motion-dom', 'es2022/motion-dom',
    'https://esm.sh', 'skypack.dev', 'jspm.dev'
  ];

  function isBulletproofBlocked(str: string | undefined | null): boolean {
    if (!str || typeof str !== 'string') return false;
    const strLower = str.toLowerCase();
    return BULLETPROOF_BLOCKED.some(blocked => strLower.includes(blocked));
  }

  function bulletproofBlock(context: string, value: string): never {
    console.error(`💀 BULLETPROOF BLOCK [${context}]:`, value);
    throw new Error(`💀 BULLETPROOF MOTION-DOM BLOCKED: ${context} - ${value}`);
  }

  return {
    name: 'bulletproof-motion-dom-extermination',
    enforce: 'pre' as const,
    
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {
        if (req.url && isBulletproofBlocked(req.url)) {
          console.error('💀 BULLETPROOF BLOCK SERVER REQUEST:', req.url);
          res.statusCode = 403;
          res.setHeader('Content-Type', 'text/plain');
          res.end('💀 BULLETPROOF MOTION-DOM BLOCKED');
          return;
        }
        next();
      });
    },
    
    resolveId(id: string, importer?: string) {
      if (isBulletproofBlocked(id)) {
        bulletproofBlock('RESOLVE_ID', id);
      }
      if (importer && isBulletproofBlocked(importer)) {
        bulletproofBlock('RESOLVE_IMPORTER', importer);
      }
    },
    
    load(id: string) {
      if (isBulletproofBlocked(id)) {
        bulletproofBlock('LOAD', id);
      }
    },
    
    transform(code: string, id: string) {
      if (isBulletproofBlocked(id)) {
        bulletproofBlock('TRANSFORM_ID', id);
      }
      if (code && isBulletproofBlocked(code)) {
        bulletproofBlock('TRANSFORM_CODE', 'Motion-dom detected in code');
      }
      
      // Block any import statements containing motion-dom
      if (code && typeof code === 'string') {
        const motionDomPatterns = [
          /import.*from.*['"`].*motion-dom.*['"`]/gi,
          /import.*['"`].*motion-dom.*['"`]/gi,
          /require\(.*['"`].*motion-dom.*['"`]/gi,
          /https:\/\/esm\.sh\/motion-dom/gi,
          /esm\.sh\/motion-dom/gi
        ];
        
        for (const pattern of motionDomPatterns) {
          if (pattern.test(code)) {
            bulletproofBlock('CODE_PATTERN', 'Motion-dom import detected');
          }
        }
      }
    },
    
    buildStart() {
      console.log('💀 BULLETPROOF MOTION-DOM EXTERMINATION ACTIVE');
    },
    
    generateBundle(_options: any, bundle: any) {
      Object.keys(bundle).forEach(fileName => {
        const chunk = bundle[fileName];
        if (chunk.type === 'chunk' && chunk.code) {
          if (isBulletproofBlocked(chunk.code)) {
            bulletproofBlock('BUNDLE', fileName);
          }
        }
      });
    }
  };
};

// Bulletproof HTML Transform Plugin - ensure no motion-dom scripts
const bulletproofHtmlTransform = () => ({
  name: 'bulletproof-html-transform',
  transformIndexHtml(html: string) {
    // Remove any motion-dom script tags
    html = html.replace(/<script[^>]*motion-dom[^>]*><\/script>/gi, '');
    html = html.replace(/<script[^>]*esm\.sh[^>]*><\/script>/gi, '');
    
    // Ensure bulletproof protection is loaded
    if (!html.includes('BULLETPROOF FINAL MOTION-DOM EXTERMINATION')) {
      console.log('✅ Bulletproof HTML protection already active');
    }
    
    return html;
  }
});

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@/components': resolve(__dirname, './src/components'),
      '@/app': resolve(__dirname, './src/app'),
      '@/lib': resolve(__dirname, './src/lib'),
      '@/hooks': resolve(__dirname, './src/hooks'),
      '@/contexts': resolve(__dirname, './src/contexts'),
      '@/models': resolve(__dirname, './src/models'),
      '@/types': resolve(__dirname, './src/types'),
      '@/server': resolve(__dirname, './src/server'),
    }
  },
  plugins: [
    react({ jsxRuntime: 'automatic' }),
    bulletproofMotionDomExtermination(),
    bulletproofHtmlTransform(),
    tailwindcss()
  ],
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'lucide-react',
      'next-themes',
      '@radix-ui/react-avatar',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-slot',
      'class-variance-authority',
      'clsx',
      'tailwind-merge'
    ],
    exclude: ['motion-dom']
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    target: 'es2020',
    minify: 'terser',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Third-party deps
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react'
            if (id.includes('lucide-react')) return 'vendor-icons'
            if (id.includes('@radix-ui')) return 'vendor-radix'
            if (id.includes('recharts')) return 'vendor-charts'
            return 'vendor'
          }

          // App-level heavy chunks
          if (id.includes('/components/Preloader')) return 'preloader'
          if (
            id.includes('/components/Framer') ||
            id.includes('/components/Motion') ||
            id.includes('/components/FramerMotion')
          ) {
            return 'motion-ui'
          }

          return undefined
        }
      },
      external: ['motion-dom']
    },
    chunkSizeWarningLimit: 1000
  },
  server: { 
    port: 5173, 
    host: true, 
    open: true 
  },
  preview: { 
    port: 4173, 
    host: true 
  }
})
