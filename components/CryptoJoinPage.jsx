import { useState, useEffect } from 'react';
import { 
  SiBitcoin, 
  SiEthereum 
} from 'react-icons/si';
import { RiSparklingFill } from 'react-icons/ri';
import Twitter from './Twitter'; // Import the Twitter component

const CryptoJoinPage = () => {
  const [showTwitter, setShowTwitter] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [rotation, setRotation] = useState(0);

  // Handle mouse movement for interactive background effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 15 + 5,
      speed: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'purple' : 'pink',
      opacity: Math.random() * 0.5 + 0.1,
    }));
    setParticles(newParticles);
  }, []);

  // Animate particles and rotation
  useEffect(() => {
    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        y: particle.y - particle.speed > 0 ? particle.y - particle.speed : 100,
        x: particle.x + Math.sin(particle.y / 20) * 0.8,
      })));
      setRotation(prev => (prev + 1) % 360);
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-purple-950 to-black overflow-hidden">
      {/* Animated background particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full ${
            particle.color === 'purple' ? 'bg-purple-500' : 'bg-pink-500'
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            transform: `translate(-50%, -50%)`,
            filter: 'blur(2px)',
          }}
        />
      ))}

      {/* Interactive mouse glow effect */}
      <div
        className="absolute w-96 h-96 rounded-full bg-purple-600/10 blur-3xl"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.3s ease-out',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {/* Rotating crypto icons */}
        <div className="relative w-32 h-32 mb-12">
          <div 
            className="absolute inset-0"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: 'transform 0.05s linear',
            }}
          >
            <SiBitcoin className="absolute top-0 left-0 w-12 h-12 text-yellow-500 animate-pulse" />
            <SiEthereum className="absolute bottom-0 right-0 w-12 h-12 text-blue-500 animate-pulse" />
          </div>
        </div>

        <h1 className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-600 mb-6 text-center animate-pulse">
          Crypto Future
        </h1>

        <p className="text-2xl text-gray-300 mb-12 text-center max-w-2xl leading-relaxed">
          Enter the world of decentralized innovation. Join pioneers shaping the future of finance.
        </p>

        <button
          onClick={() => setShowTwitter(true)}
          className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold text-xl overflow-hidden transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-purple-500/30"
        >
          <span className="relative z-10 flex items-center space-x-2">
            <span>Enter Portal</span>
            <RiSparklingFill className="w-6 h-6 animate-spin" />
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>

        {/* Twitter Component Modal */}
        {showTwitter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md">
            <div className="relative w-full max-w-[440px]">
              <button
                onClick={() => setShowTwitter(false)}
                className="absolute right-4 top-4 z-50 text-white hover:text-gray-300 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <path
                    fill="currentColor"
                    d="M10.59 12L4.54 5.96l1.42-1.42L12 10.59l6.04-6.05 1.42 1.42L13.41 12l6.05 6.04-1.42 1.42L12 13.41l-6.04 6.05-1.42-1.42L10.59 12z"
                  />
                </svg>
              </button>
              <Twitter />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CryptoJoinPage;