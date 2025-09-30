import React from 'react'
import ReactDOM from 'react-dom/client'
import './app/globals.css'

// ⚠️ NOT: Bu dosya sadece Vite için oluşturulmuştur
// Next.js bu dosyayı KULLANMAZ - Next.js kendi app/layout.tsx ve app/page.tsx kullanır
// Bu yapılandırma Next.js ile uyumlu DEĞİLDİR

function ViteEntryPoint() {
  return (
    <div style={{ 
      padding: '2rem', 
      fontFamily: 'system-ui', 
      maxWidth: '800px', 
      margin: '0 auto' 
    }}>
      <h1>⚠️ Vite Entry Point</h1>
      <div style={{ 
        background: '#fee', 
        padding: '1rem', 
        borderRadius: '8px',
        border: '2px solid #c33',
        marginTop: '1rem'
      }}>
        <h2>❌ UYARI: Bu bir Next.js projesidir!</h2>
        <p>Bu sayfa Vite config'i için oluşturulmuştur ancak <strong>Next.js ile çalışmaz</strong>.</p>
        <p>Projenizi çalıştırmak için:</p>
        <pre style={{ background: '#333', color: '#0f0', padding: '1rem', borderRadius: '4px' }}>
          npm run dev
        </pre>
        <p>Bu komut Next.js'i başlatacaktır (Vite değil).</p>
      </div>
      
      <div style={{ marginTop: '2rem', background: '#eef', padding: '1rem', borderRadius: '8px' }}>
        <h3>💀 Bulletproof Motion-Dom Elimination Aktif</h3>
        <p>Motion-dom engelleme sistemi yüklendi.</p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h3>Proje Bilgileri:</h3>
        <ul>
          <li>Framework: <strong>Next.js 15.5.0</strong></li>
          <li>Build Tool: <strong>Turbopack</strong></li>
          <li>React: <strong>19.1.0</strong></li>
          <li>Vite Config: <strong>✅ Eklendi (ama çalışmıyor)</strong></li>
        </ul>
      </div>
    </div>
  )
}

const rootElement = document.getElementById('root')
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <ViteEntryPoint />
    </React.StrictMode>
  )
}
