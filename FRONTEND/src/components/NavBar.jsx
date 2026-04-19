// import React from 'react';
// import { Link } from '@tanstack/react-router';

// const Navbar = () => {
//   return (
//     <nav className="bg-white border border-b-black">
//       <div className=" mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           {/* Left side - App Name */}
//           <div className="flex items-center">
//             <Link to="/" className="text-xl font-bold text-gray-800">
//               URL Shortener
//             </Link>
//           </div>
          
//           {/* Right side - Auth buttons */}
//           <div className="flex items-center">
//             {/* {(true) ? (
//               <div className="flex items-center space-x-4">
//                 <span className="text-gray-700">Welcome, {userName || 'User'}</span>
//                 <button
//                   onClick={onLogout}
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <Link
//                 to="/auth"
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
//               >
//                 Login
//               </Link>
//             )} */}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice.js';
import { logoutUser } from '../api/user.api.js';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    try { await logoutUser(); } catch (_) {}
    dispatch(logout());
    navigate({ to: '/' });
  };

  const initial = user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U';

  return (
    <nav style={styles.nav}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600&display=swap');
        .nav-link:hover { color: #e74c3c !important; }
        .logout-btn:hover { background: rgba(231,76,60,0.15) !important; }
        .cta-btn:hover { opacity: 0.85; }
      `}</style>

      {/* Logo */}
      <Link to="/" style={styles.logoWrap}>
        <div style={styles.logoIcon}>S</div>
        <span style={styles.logoText}>
          ShortUrl<span style={{ color: '#e74c3c' }}>4U</span>
        </span>
      </Link>

      {/* Right side */}
      <div style={styles.right}>
        {isAuthenticated ? (
          <>
            {/* User badge */}
            <Link to="/dashboard" style={styles.userBadge}>
              <div style={styles.avatar}>{initial}</div>
              <div style={styles.userInfo}>
                <span style={styles.userName}>{user?.name || 'User'}</span>
                <span style={styles.userEmail}>{user?.email || ''}</span>
              </div>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              disabled={loggingOut}
              className="logout-btn"
              style={styles.logoutBtn}
            >
              {loggingOut ? '...' : '→ Logout'}
            </button>
          </>
        ) : (
          <>
            <Link to="/auth" className="nav-link" style={styles.loginLink}>
              Log In
            </Link>
            <Link to="/auth" className="cta-btn" style={styles.signupBtn}>
              Sign Up Free
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'sticky', top: 0, zIndex: 50,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 40px', height: 64,
    background: 'rgba(15,10,10,0.85)',
    borderBottom: '1px solid rgba(231,76,60,0.1)',
    backdropFilter: 'blur(12px)',
    fontFamily: "'Outfit', sans-serif",
  },

  // Logo
  logoWrap: {
    display: 'flex', alignItems: 'center', gap: 10,
    textDecoration: 'none',
  },
  logoIcon: {
    width: 34, height: 34, borderRadius: 8,
    background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, color: '#fff',
    flexShrink: 0,
  },
  logoText: {
    fontFamily: "'Syne', sans-serif", fontWeight: 700,
    fontSize: 18, color: '#f5f0f0',
  },

  // Right section
  right: { display: 'flex', alignItems: 'center', gap: 12 },

  // Authenticated
  userBadge: {
    display: 'flex', alignItems: 'center', gap: 10,
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.07)',
    borderRadius: 10, padding: '6px 14px',
    textDecoration: 'none', transition: 'border-color 0.2s',
  },
  avatar: {
    width: 30, height: 30, borderRadius: '50%',
    background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontWeight: 700, fontSize: 13, color: '#fff', flexShrink: 0,
  },
  userInfo: { display: 'flex', flexDirection: 'column' },
  userName: { fontSize: 13, fontWeight: 600, color: '#f0e8e8', lineHeight: 1.2 },
  userEmail: { fontSize: 11, color: '#555', lineHeight: 1.2 },

  logoutBtn: {
    background: 'transparent',
    border: '1px solid rgba(231,76,60,0.25)',
    borderRadius: 8, color: '#e74c3c',
    fontSize: 13, fontWeight: 500, padding: '7px 16px',
    cursor: 'pointer', fontFamily: "'Outfit', sans-serif",
    transition: 'background 0.2s',
  },

  // Guest
  loginLink: {
    color: '#888', textDecoration: 'none',
    fontSize: 14, fontWeight: 500, padding: '7px 14px',
    borderRadius: 8, transition: 'color 0.2s',
  },
  signupBtn: {
    background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
    color: '#fff', textDecoration: 'none',
    fontSize: 14, fontWeight: 600,
    padding: '8px 20px', borderRadius: 8,
    transition: 'opacity 0.15s',
  },
};

export default Navbar;