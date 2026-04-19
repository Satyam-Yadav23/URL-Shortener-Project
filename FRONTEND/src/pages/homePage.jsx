
// import React from 'react'
// import UrlForm from '../components/urlForm.jsx'

// const HomePage = () => {
//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
//     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//       <h1 className="text-2xl font-bold text-center mb-6">URL Shortener</h1>
//       <UrlForm/>
//     </div>
//   </div>
//   )
// }

// export default HomePage;
import React, { useState } from 'react';
import UrlForm from '../components/urlForm.jsx';

// QR Code generator using free API (no install needed)
const QRGenerator = () => {
  const [qrUrl, setQrUrl] = useState('');
  const [qrImage, setQrImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = async () => {
    if (!qrUrl.trim()) return;
    setLoading(true);
    // Using QR Server API (free, no key needed)
    const encoded = encodeURIComponent(qrUrl);
    const src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encoded}&color=c0392b&bgcolor=fff2f2`;
    setQrImage(src);
    setGenerated(true);
    setLoading(false);
  };

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = qrImage;
    a.download = 'qrcode.png';
    a.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div>
        <label style={styles.label}>Enter URL for QR Code</label>
        <input
          type="url"
          value={qrUrl}
          onChange={(e) => { setQrUrl(e.target.value); setGenerated(false); }}
          placeholder="https://your-url.com"
          style={styles.input}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading || !qrUrl.trim()}
        style={{ ...styles.primaryBtn, opacity: !qrUrl.trim() ? 0.5 : 1 }}
      >
        {loading ? 'Generating...' : '⬡ Generate QR Code'}
      </button>

      {generated && qrImage && (
        <div style={styles.qrResult}>
          <img src={qrImage} alt="QR Code" style={{ width: 160, height: 160, display: 'block', margin: '0 auto' }} />
          <p style={{ textAlign: 'center', fontSize: 12, color: '#999', marginTop: 8 }}>
            Scan with any camera app
          </p>
          <button onClick={handleDownload} style={styles.outlineBtn}>
            ↓ Download QR Code
          </button>
        </div>
      )}
    </div>
  );
};

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('shorten');

  return (
    <div style={styles.page}>
      {/* Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@300;400;500&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #0f0a0a; }
        input:focus { outline: none; border-color: #e74c3c !important; box-shadow: 0 0 0 3px rgba(231,76,60,0.15); }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes pulse { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
      `}</style>

      {/* Background blobs */}
      <div style={styles.blob1} />
      <div style={styles.blob2} />

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroLeft}>
          <div style={styles.badge}>🔗 Free URL Shortener</div>
          <h1 style={styles.heroTitle}>
            Shrink Links.<br />
            <span style={{ color: '#e74c3c' }}>Grow Reach.</span>
          </h1>
          <p style={styles.heroSub}>
            Create short, powerful links and QR codes in seconds.
            Track clicks, share anywhere — no sign-up required.
          </p>
          <div style={styles.statsRow}>
            {[['1000+', 'Links Created'], ['99.9%', 'Uptime'], ['Free', 'Forever']].map(([val, label]) => (
              <div key={label} style={styles.stat}>
                <span style={styles.statVal}>{val}</span>
                <span style={styles.statLabel}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card */}
        <div style={styles.card}>
          {/* Tab bar */}
          <div style={styles.tabBar}>
            <button
              onClick={() => setActiveTab('shorten')}
              style={{ ...styles.tab, ...(activeTab === 'shorten' ? styles.tabActive : {}) }}
            >
              🔗 Shorten a Link
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              style={{ ...styles.tab, ...(activeTab === 'qr' ? styles.tabActive : {}) }}
            >
              ⬡ Generate QR Code
            </button>
          </div>

          <div style={styles.cardBody}>
            {activeTab === 'shorten' ? <UrlForm /> : <QRGenerator />}
          </div>
        </div>
      </div>

      {/* Features */}
      <div style={styles.features}>
        {[
          { icon: '⚡', title: 'Lightning Fast', desc: 'Links generated in milliseconds, redirects in under 100ms globally.' },
          { icon: '📊', title: 'Click Analytics', desc: 'Track how many times your link was clicked after logging in.' },
          { icon: '🔒', title: 'Secure & Reliable', desc: 'All links are HTTPS secured and monitored 24/7.' },
          { icon: '📱', title: 'QR Codes', desc: 'Generate scannable QR codes for any URL instantly.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} style={styles.featureCard}>
            <div style={styles.featureIcon}>{icon}</div>
            <h3 style={styles.featureTitle}>{title}</h3>
            <p style={styles.featureDesc}>{desc}</p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <span style={styles.logoText}>ShortUrl<span style={{ color: '#e74c3c' }}>4U</span></span>
        <span style={{ color: '#555', fontSize: 13 }}>© 2026 — Free URL Shortener</span>
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
  },
  blob1: {
    position: 'fixed', top: -100, right: -100,
    width: 500, height: 500, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(231,76,60,0.15) 0%, transparent 70%)',
    pointerEvents: 'none', zIndex: 0,
  },
  blob2: {
    position: 'fixed', bottom: -150, left: -100,
    width: 600, height: 600, borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(192,57,43,0.1) 0%, transparent 70%)',
    pointerEvents: 'none', zIndex: 0,
  },
  navCta: {
    background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
    color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 500,
    padding: '8px 20px', borderRadius: 8,
  },
  hero: {
    position: 'relative', zIndex: 1,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: 48, padding: '64px 48px',
    maxWidth: 1200, margin: '0 auto',
    flexWrap: 'wrap',
  },
  heroLeft: {
    flex: 1, minWidth: 280,
    animation: 'fadeUp 0.7s ease both',
  },
  badge: {
    display: 'inline-block',
    background: 'rgba(231,76,60,0.12)',
    border: '1px solid rgba(231,76,60,0.3)',
    color: '#e74c3c', fontSize: 13, fontWeight: 500,
    padding: '6px 14px', borderRadius: 20, marginBottom: 20,
  },
  heroTitle: {
    fontFamily: "'Syne', sans-serif", fontWeight: 800,
    fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
    lineHeight: 1.1, margin: '0 0 20px',
    color: '#f5f0f0',
  },
  heroSub: {
    fontSize: 16, color: '#999', lineHeight: 1.7,
    margin: '0 0 32px', maxWidth: 420,
  },
  statsRow: { display: 'flex', gap: 32 },
  stat: { display: 'flex', flexDirection: 'column', gap: 2 },
  statVal: {
    fontFamily: "'Syne', sans-serif", fontWeight: 700,
    fontSize: 22, color: '#e74c3c',
  },
  statLabel: { fontSize: 12, color: '#666', textTransform: 'uppercase', letterSpacing: '0.1em' },

  // Card
  card: {
    flex: 1, minWidth: 320, maxWidth: 520,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(231,76,60,0.15)',
    borderRadius: 20,
    backdropFilter: 'blur(20px)',
    overflow: 'hidden',
    animation: 'fadeUp 0.7s ease 0.15s both',
    boxShadow: '0 32px 80px rgba(0,0,0,0.4), 0 0 0 1px rgba(231,76,60,0.05)',
  },
  tabBar: {
    display: 'flex',
    borderBottom: '1px solid rgba(231,76,60,0.1)',
  },
  tab: {
    flex: 1, padding: '16px 8px',
    background: 'transparent', border: 'none',
    color: '#666', fontSize: 14, fontWeight: 500,
    cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
    transition: 'all 0.2s',
  },
  tabActive: {
    color: '#e74c3c',
    borderBottom: '2px solid #e74c3c',
    background: 'rgba(231,76,60,0.05)',
  },
  cardBody: { padding: 28 },

  // Form elements used by QRGenerator
  label: {
    display: 'block', fontSize: 12, fontWeight: 500,
    color: '#888', textTransform: 'uppercase',
    letterSpacing: '0.1em', marginBottom: 8,
  },
  input: {
    width: '100%', background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 10, padding: '12px 16px',
    color: '#f5f0f0', fontSize: 14,
    fontFamily: "'Outfit', sans-serif",
    transition: 'border-color 0.2s',
  },
  primaryBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
    border: 'none', borderRadius: 10,
    color: '#fff', fontSize: 15, fontWeight: 600,
    padding: '13px 20px', cursor: 'pointer',
    fontFamily: "'Outfit', sans-serif",
    transition: 'transform 0.15s, opacity 0.15s',
  },
  outlineBtn: {
    width: '100%', marginTop: 12,
    background: 'transparent',
    border: '1px solid rgba(231,76,60,0.4)',
    borderRadius: 10, color: '#e74c3c',
    fontSize: 14, fontWeight: 500,
    padding: '10px 20px', cursor: 'pointer',
    fontFamily: "'Outfit', sans-serif",
  },
  qrResult: {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(231,76,60,0.15)',
    borderRadius: 12, padding: 20,
  },

  // Features
  features: {
    position: 'relative', zIndex: 1,
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: 20, padding: '0 48px 64px',
    maxWidth: 1200, margin: '0 auto',
  },
  featureCard: {
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.06)',
    borderRadius: 16, padding: '24px 20px',
    transition: 'border-color 0.2s',
  },
  featureIcon: { fontSize: 28, marginBottom: 12 },
  featureTitle: {
    fontFamily: "'Syne', sans-serif", fontWeight: 700,
    fontSize: 16, margin: '0 0 8px', color: '#f0e8e8',
  },
  featureDesc: { fontSize: 13, color: '#666', lineHeight: 1.6, margin: 0 },

  // Footer
  footer: {
    position: 'relative', zIndex: 1,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 48px',
    borderTop: '1px solid rgba(255,255,255,0.05)',
  },
};

export default HomePage;