// import React, { useState } from 'react';
// import { registerUser } from '../api/user.api.js';
// import { useDispatch } from 'react-redux';
// import { login } from '../store/slice/authSlice';
// import { useNavigate } from '@tanstack/react-router';

// const RegisterForm = ({state}) => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const dispatch = useDispatch()
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault();    
    
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     setError('');
    
//     try {
//       const data = await registerUser(name, email, password);
//       dispatch(login(data.user))
//       navigate({to:"/dashboard"})
//       console.log("registered success")
//     } catch (err) {
//       setLoading(false);
//       setError(err.message || 'Registration failed. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="w-full max-w-md mx-auto">
//       <div onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
//         <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        
//         {error && (
//           <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
//             {error}
//           </div>
//         )}
        
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
//             Full Name
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="name"
//             type="text"
//             placeholder="Full Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
        
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
//             Email
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="email"
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
        
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
//             Password
//           </label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             id="password"
//             type="password"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             minLength={6}
//           />
//         </div>
    
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
//           <input
//             className="shadow appearance-none border rounded w-full py-2 px-3"
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>

//         <div className="flex items-center justify-between">
//           <button
//             className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//             type="submit"
//             onClick={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? 'Creating...' : 'Sign Up'}
//           </button>
//         </div>
        
//         <div className="text-center mt-4">
//           <p className="cursor-pointer text-sm text-gray-600">
//             Already have an account? <span onClick={()=>state(true)} className="text-blue-500 hover:text-blue-700">Sign In</span>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegisterForm;

import React, { useState } from 'react';
import { registerUser } from '../api/user.api.js';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { useNavigate } from '@tanstack/react-router';
import { useQueryClient } from '@tanstack/react-query';

const RegisterForm = ({ state }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser({ name, email, password });
      dispatch(login(data.user));
      await queryClient.invalidateQueries({ queryKey: ['currentUser'] });
      navigate({ to: '/dashboard' });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Password strength indicator
  const getStrength = () => {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };
  const strength = getStrength();
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength];
  const strengthColor = ['', '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#27ae60'][strength];

  return (
    <div style={styles.wrapper}>
      {/* Title */}
      <div style={styles.titleRow}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join for free — no credit card needed</p>
      </div>

      {/* Error */}
      {error && (
        <div style={styles.errorBox}>
          <span style={{ fontSize: 15 }}>⚠</span>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>

        {/* Full Name */}
        <div style={styles.fieldGroup}>
          <label style={styles.label} htmlFor="reg-name">Full Name</label>
          <div style={styles.inputWrap}>
            <span style={styles.inputIcon}>👤</span>
            <input
              id="reg-name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(''); }}
              required
              autoComplete="name"
              style={styles.input}
            />
          </div>
        </div>

        {/* Email */}
        <div style={styles.fieldGroup}>
          <label style={styles.label} htmlFor="reg-email">Email Address</label>
          <div style={styles.inputWrap}>
            <span style={styles.inputIcon}>✉</span>
            <input
              id="reg-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              required
              autoComplete="email"
              style={styles.input}
            />
          </div>
        </div>

        {/* Password */}
        <div style={styles.fieldGroup}>
          <label style={styles.label} htmlFor="reg-password">Password</label>
          <div style={styles.inputWrap}>
            <span style={styles.inputIcon}>🔒</span>
            <input
              id="reg-password"
              type={showPass ? 'text' : 'password'}
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              required
              minLength={6}
              autoComplete="new-password"
              style={{ ...styles.input, paddingRight: 44 }}
            />
            <button type="button" onClick={() => setShowPass(!showPass)} style={styles.eyeBtn}>
              {showPass ? '🙈' : '👁'}
            </button>
          </div>
          {/* Strength bar */}
          {password && (
            <div style={styles.strengthWrap}>
              <div style={styles.strengthTrack}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    style={{
                      ...styles.strengthSegment,
                      background: i <= strength ? strengthColor : 'rgba(255,255,255,0.07)',
                    }}
                  />
                ))}
              </div>
              <span style={{ ...styles.strengthLabel, color: strengthColor }}>
                {strengthLabel}
              </span>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div style={styles.fieldGroup}>
          <label style={styles.label} htmlFor="reg-confirm">Confirm Password</label>
          <div style={styles.inputWrap}>
            <span style={styles.inputIcon}>🔒</span>
            <input
              id="reg-confirm"
              type={showConfirm ? 'text' : 'password'}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => { setConfirmPassword(e.target.value); setError(''); }}
              required
              autoComplete="new-password"
              style={{
                ...styles.input,
                paddingRight: 44,
                borderColor: confirmPassword && confirmPassword !== password
                  ? 'rgba(231,76,60,0.5)'
                  : confirmPassword && confirmPassword === password
                  ? 'rgba(46,204,113,0.5)'
                  : undefined,
              }}
            />
            <button type="button" onClick={() => setShowConfirm(!showConfirm)} style={styles.eyeBtn}>
              {showConfirm ? '🙈' : '👁'}
            </button>
          </div>
          {confirmPassword && confirmPassword !== password && (
            <span style={styles.matchError}>✗ Passwords don't match</span>
          )}
          {confirmPassword && confirmPassword === password && (
            <span style={styles.matchSuccess}>✓ Passwords match</span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          style={{ ...styles.submitBtn, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
              <span style={styles.spinner} /> Creating account...
            </span>
          ) : (
            'Create Account →'
          )}
        </button>
      </form>

      {/* Divider */}
      <div style={styles.divider}>
        <div style={styles.dividerLine} />
        <span style={styles.dividerText}>Already have an account?</span>
        <div style={styles.dividerLine} />
      </div>

      {/* Switch to Login */}
      <button
        type="button"
        onClick={() => state(true)}
        style={styles.switchBtn}
      >
        Sign in instead
      </button>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex', flexDirection: 'column', gap: 18,
    fontFamily: "'Outfit', sans-serif",
  },
  titleRow: { marginBottom: 4 },
  title: {
    fontFamily: "'Syne', sans-serif", fontWeight: 800,
    fontSize: 22, margin: '0 0 4px', color: '#f0e8e8',
  },
  subtitle: { margin: 0, fontSize: 13, color: '#555' },

  errorBox: {
    display: 'flex', alignItems: 'center', gap: 8,
    background: 'rgba(231,76,60,0.1)',
    border: '1px solid rgba(231,76,60,0.3)',
    borderRadius: 8, padding: '10px 14px',
    color: '#e74c3c', fontSize: 13,
  },

  form: { display: 'flex', flexDirection: 'column', gap: 16 },

  fieldGroup: { display: 'flex', flexDirection: 'column' },
  label: {
    fontSize: 11, fontWeight: 600, letterSpacing: '0.1em',
    textTransform: 'uppercase', color: '#666', marginBottom: 8,
    display: 'block',
  },
  inputWrap: { position: 'relative', display: 'flex', alignItems: 'center' },
  inputIcon: {
    position: 'absolute', left: 14, fontSize: 14,
    pointerEvents: 'none', opacity: 0.5,
  },
  input: {
    width: '100%', background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 10, padding: '12px 14px 12px 40px',
    color: '#f0e8e8', fontSize: 14,
    fontFamily: "'Outfit', sans-serif",
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  eyeBtn: {
    position: 'absolute', right: 12,
    background: 'none', border: 'none',
    cursor: 'pointer', fontSize: 14, opacity: 0.5,
    padding: 4,
  },

  // Strength
  strengthWrap: {
    display: 'flex', alignItems: 'center', gap: 10, marginTop: 8,
  },
  strengthTrack: { display: 'flex', gap: 4, flex: 1 },
  strengthSegment: {
    flex: 1, height: 3, borderRadius: 99,
    transition: 'background 0.3s',
  },
  strengthLabel: { fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', minWidth: 60 },

  matchError: { fontSize: 11, color: '#e74c3c', marginTop: 5 },
  matchSuccess: { fontSize: 11, color: '#2ecc71', marginTop: 5 },

  submitBtn: {
    width: '100%',
    background: 'linear-gradient(135deg, #e74c3c, #c0392b)',
    border: 'none', borderRadius: 10,
    color: '#fff', fontSize: 15, fontWeight: 600,
    padding: '13px 20px', cursor: 'pointer',
    fontFamily: "'Outfit', sans-serif",
    transition: 'opacity 0.15s',
    marginTop: 4,
  },
  spinner: {
    display: 'inline-block', width: 14, height: 14,
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff', borderRadius: '50%',
    animation: 'spin 0.6s linear infinite',
  },

  divider: {
    display: 'flex', alignItems: 'center', gap: 12, margin: '2px 0',
  },
  dividerLine: { flex: 1, height: 1, background: 'rgba(255,255,255,0.06)' },
  dividerText: { fontSize: 12, color: '#444', whiteSpace: 'nowrap' },

  switchBtn: {
    width: '100%', background: 'transparent',
    border: '1px solid rgba(231,76,60,0.25)',
    borderRadius: 10, color: '#e74c3c',
    fontSize: 14, fontWeight: 500,
    padding: '12px 20px', cursor: 'pointer',
    fontFamily: "'Outfit', sans-serif",
    transition: 'background 0.2s',
  },
};

export default RegisterForm;