// import React from 'react'
// import LoginForm from '../components/loginForm.jsx'
// import RegisterForm from '../components/registerForm.jsx'
// import { useState } from 'react'

// const AuthPage = () => {

//   const [login, setLogin] = useState(true);
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//       {login ? <LoginForm state={setLogin}/> : <RegisterForm state={setLogin}/>}
//     </div>
//   )
// }

// export default AuthPage

import React, { useState } from 'react';
import LoginForm from '../components/loginForm.jsx';
import RegisterForm from '../components/registerForm.jsx';
import ForgotPassword from './forgotPassword.jsx';

const AuthPage = () => {
  const [login, setLogin] = useState(true);
  const [showForgot, setShowForgot] = useState(false);

  return (
    <div style={styles.page}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #0f0a0a; }
        input { font-family: 'Outfit', sans-serif !important; }
        input:focus { outline: none !important; border-color: #e74c3c !important; box-shadow: 0 0 0 3px rgba(231,76,60,0.15) !important; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
      `}</style>

      {/* Background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      {/* Main */}
      <main style={styles.main}>

        {/* Left panel — branding */}
        <div style={styles.leftPanel}>
          <div style={styles.badge}>🔗 Free URL Shortener</div>
          <h1 style={styles.heroTitle}>
            {login ? (
              <>Welcome<br /><span style={{ color: '#e74c3c' }}>back.</span></>
            ) : (
              <>Join us<br /><span style={{ color: '#e74c3c' }}>today.</span></>
            )}
          </h1>
          <p style={styles.heroSub}>
            {login
              ? 'Sign in to manage your shortened links, view analytics, and create new ones.'
              : 'Create a free account and start shortening URLs, generating QR codes, and tracking clicks.'}
          </p>

          <div style={styles.featureList}>
            {[
              '⚡ Instant URL shortening',
              '📊 Click analytics dashboard',
              '⬡ QR code generation',
              '🔒 Secure & reliable links',
            ].map((f) => (
              <div key={f} style={styles.featureItem}>
                <div style={styles.featureDot} />
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Right panel — form card */}
        <div style={styles.cardWrap}>
          {/* Tab switcher */}
          {!showForgot && (
            <div style={styles.tabBar}>
              <button
                onClick={() => setLogin(true)}
                style={{ ...styles.tab, ...(login ? styles.tabActive : {}) }}
              >
                Sign In
              </button>
              <button
                onClick={() => setLogin(false)}
                style={{ ...styles.tab, ...(!login ? styles.tabActive : {}) }}
              >
                Create Account
              </button>
            </div>
          )}

          {/* Form card */}
          <div style={{ ...styles.card, animation: 'slideIn 0.4s ease both' }} key={showForgot ? 'forgot' : login ? 'login' : 'register'}>
            <div style={styles.accentBar} />
            <div style={styles.cardBody}>
              {showForgot ? (
                <ForgotPassword onBack={() => setShowForgot(false)} />
              ) : login ? (
                <LoginForm state={setLogin} showForgotPassword={() => setShowForgot(true)} />
              ) : (
                <RegisterForm state={setLogin} />
              )}
            </div>
          </div>

          <p style={styles.footNote}>
            By continuing, you agree to our{' '}
            <span style={{ color: '#e74c3c', cursor: 'pointer' }}>Terms of Service</span>
            {' '}and{' '}
            <span style={{ color: '#e74c3c', cursor: 'pointer' }}>Privacy Policy</span>.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <span style={styles.logoText}>
          ShortUrl<span style={{ color: '#e74c3c' }}>4U</span>
        </span>
        <span style={{ color: '#444', fontSize: 12 }}>© 2026 — Free URL Shortener</span>
      </footer>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0f0a0a',
    fontFamily: "'Outfit', sans-serif",
    color: '#f5f0f0',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  blob1: {
    position: 'fixed', top: -100, right: -100,
    width: 500, height: 500, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(231,76,60,0.13) 0%, transparent 70%)',
    pointerEvents: 'none', zIndex: 0,
  },
  blob2: {
    position: 'fixed', bottom: -150, left: -100,
    width: 600, height: 600, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(192,57,43,0.08) 0%, transparent 70%)',
    pointerEvents: 'none', zIndex: 0,
  },

  // Main layout
  main: {
    flex: 1, position: 'relative', zIndex: 1,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    gap: 64, padding: '48px',
    maxWidth: 1100, margin: '0 auto', width: '100%',
    flexWrap: 'wrap',
  },

  // Left panel
  leftPanel: {
    flex: 1, minWidth: 260, maxWidth: 420,
    animation: 'fadeUp 0.6s ease both',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(231,76,60,0.1)',
    border: '1px solid rgba(231,76,60,0.25)',
    color: '#e74c3c', fontSize: 12, fontWeight: 500,
    padding: '5px 12px', borderRadius: 20, marginBottom: 20,
  },
  heroTitle: {
    fontFamily: "'Syne', sans-serif", fontWeight: 800,
    fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
    lineHeight: 1.05, margin: '0 0 18px', color: '#f5f0f0',
  },
  heroSub: {
    fontSize: 15, color: '#777', lineHeight: 1.7,
    margin: '0 0 32px', maxWidth: 360,
  },
  featureList: { display: 'flex', flexDirection: 'column', gap: 12 },
  featureItem: {
    display: 'flex', alignItems: 'center', gap: 10,
    fontSize: 14, color: '#888',
  },
  featureDot: {
    width: 6, height: 6, borderRadius: '50%',
    background: '#e74c3c', flexShrink: 0,
  },

  // Right panel
  cardWrap: {
    flex: 1, minWidth: 300, maxWidth: 460,
    display: 'flex', flexDirection: 'column', gap: 0,
    animation: 'fadeUp 0.6s ease 0.1s both',
  },
  tabBar: {
    display: 'flex',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderBottom: 'none',
    borderRadius: '16px 16px 0 0',
    overflow: 'hidden',
  },
  tab: {
    flex: 1, padding: '14px 8px',
    background: 'transparent', border: 'none',
    color: '#555', fontSize: 14, fontWeight: 500,
    cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
    transition: 'all 0.2s',
  },
  tabActive: {
    color: '#e74c3c',
    background: 'rgba(231,76,60,0.06)',
    borderBottom: '2px solid #e74c3c',
  },
  card: {
    background: 'rgba(255,255,255,0.025)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: '0 0 16px 16px',
    overflow: 'hidden',
    boxShadow: '0 24px 64px rgba(0,0,0,0.4)',
  },
  accentBar: {
    height: 2,
    background: 'linear-gradient(90deg, #e74c3c, transparent)',
  },
  cardBody: { padding: '28px 32px 32px' },
  footNote: {
    fontSize: 11, color: '#444', textAlign: 'center',
    marginTop: 16, lineHeight: 1.6,
  },

  // Footer
  footer: {
    position: 'relative', zIndex: 1,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '16px 48px',
    borderTop: '1px solid rgba(255,255,255,0.04)',
  },
};

export default AuthPage;