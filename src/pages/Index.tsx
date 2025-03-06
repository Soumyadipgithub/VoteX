import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import WalletConnection from '@/components/WalletConnection';
import { useWeb3 } from '@/context/Web3Context';
import { useNavigate } from 'react-router-dom';
import { Settings, Vote, Shield, Key, UserCheck, ListChecks, BarChart3, Files, Globe, Layers } from 'lucide-react';
import AdminAuth from '@/components/AdminAuth';

const Index = () => {
  const { account } = useWeb3();
  const navigate = useNavigate();
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const featureElements = document.querySelectorAll('.feature-card');
      featureElements.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top <= window.innerHeight * 0.8;
        
        if (isVisible && !visibleFeatures.includes(index)) {
          setVisibleFeatures(prev => [...prev, index]);
          el.classList.add('feature-visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleFeatures]);

  const headerOpacity = Math.max(0, 1 - scrollY / 500);
  const heroTranslate = `translateY(${scrollY * 0.4}px)`;

  const handleVoterClick = () => {
    navigate('/voter');
  };

  const handleAdminClick = () => {
    setShowAdminAuth(true);
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-x-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        
        <div className="particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                '--x': `${Math.random() * 100}%`,
                '--y': `${Math.random() * 100}%`,
                '--duration': `${Math.random() * 40 + 20}s`,
                '--delay': `${Math.random() * 5}s`,
                '--size': `${Math.random() * 10 + 5}px`,
                '--rotation': `${Math.random() * 360}deg`,
              } as React.CSSProperties}
            ></div>
          ))}
        </div>
      </div>

      <header 
        className="fixed w-full px-4 py-6 flex justify-between items-center z-50 transition-all duration-300 bg-gradient-to-r from-gray-900/90 to-gray-800/90 backdrop-blur-sm"
        style={{ opacity: headerOpacity }}
      >
        <div className="flex items-center">
          <img src="/icon.png" alt="VoteX Logo" className="w-8 h-8 mr-2" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-votex-primary to-votex-secondary">
            VoteX
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={scrollToFeatures} className="text-white hover:text-votex-primary">
            Features
          </Button>
          <WalletConnection />
        </div>
      </header>

      <main className="relative">
        <section className="relative h-screen flex flex-col items-center justify-center px-4 pb-20 pt-10 overflow-hidden" 
          style={{ transform: heroTranslate }}>
          <div className="text-center max-w-3xl mx-auto animate-slide-up z-10">
            <div className="inline-block px-3 py-1 mb-4 bg-blue-900/30 text-votex-primary rounded-full text-sm border border-blue-500/30 backdrop-blur-sm">
              Secure. Transparent. Decentralized.
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight">
              The Future of <span className="bg-clip-text text-transparent bg-gradient-to-r from-votex-primary to-votex-secondary">Democracy</span> is Here
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the future of voting with our secure, transparent, and immutable blockchain-based voting platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button 
                onClick={() => account ? handleVoterClick() : scrollToFeatures()} 
                size="lg"
                className="bg-gradient-to-r from-votex-primary to-votex-secondary hover:opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(0,112,243,0.5)]"
              >
                {account ? "Enter Voter Portal" : "Explore Features"}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-gray-300 text-transparent bg-clip-text bg-gradient-to-r from-votex-primary to-votex-secondary font-semibold hover:border-white"
                onClick={scrollToFeatures}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 hidden lg:block animate-spin-slow perspective-cube">
            <div className="cube">
              <div className="cube-face cube-face-front"></div>
              <div className="cube-face cube-face-back"></div>
              <div className="cube-face cube-face-right"></div>
              <div className="cube-face cube-face-left"></div>
              <div className="cube-face cube-face-top"></div>
              <div className="cube-face cube-face-bottom"></div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-sm text-gray-400 mb-2">Scroll to discover</span>
            <svg className="w-6 h-6 text-votex-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {account && !showAdminAuth && (
          <section className="min-h-screen flex items-center justify-center relative py-20 px-4">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 z-0"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-5xl animate-scale-in z-10">
              <Button
                onClick={handleVoterClick}
                className="h-auto min-h-[320px] glassmorphism flex flex-col items-center justify-center p-8 text-center card-hover bg-gray-800/40 hover:bg-gray-700/40 border border-gray-600/30 group rounded-xl"
              >
                <div className="bg-votex-primary/20 p-6 rounded-full transition-all duration-300 group-hover:bg-votex-primary/30 mb-6">
                  <Vote className="h-12 w-12 text-votex-primary" />
                </div>
                <div className="space-y-4 w-full px-2">
                  <h3 className="text-3xl font-medium text-white">Voter Portal</h3>
                  <p className="text-gray-300 text-lg">
                    Cast your vote securely in active elections with blockchain verification
                  </p>
                </div>
              </Button>

              <Button
                onClick={handleAdminClick}
                className="h-auto min-h-[320px] glassmorphism flex flex-col items-center justify-center p-8 text-center card-hover bg-gray-800/40 hover:bg-gray-700/40 border border-gray-600/30 group rounded-xl"
              >
                <div className="bg-votex-accent/20 p-6 rounded-full transition-all duration-300 group-hover:bg-votex-accent/30 mb-6">
                  <Settings className="h-12 w-12 text-votex-accent" />
                </div>
                <div className="space-y-4 w-full px-2">
                  <h3 className="text-3xl font-medium text-white">Admin Portal</h3>
                  <p className="text-gray-300 text-lg">
                    Create and manage elections with powerful administrative tools
                  </p>
                </div>
              </Button>
            </div>
          </section>
        )}
        
        {showAdminAuth && (
          <section className="min-h-screen flex items-center justify-center relative py-20 px-4">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800 z-0"></div>
            <div className="w-full max-w-md animate-scale-in z-10">
              <AdminAuth />
              <div className="mt-4 text-center">
                <Button variant="ghost" onClick={() => setShowAdminAuth(false)} className="text-white hover:text-votex-primary">
                  Back to options
                </Button>
              </div>
            </div>
          </section>
        )}

        <section ref={featuresRef} id="features" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 z-0"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Revolutionary Features</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">Our platform combines cutting-edge technology with user-friendly design to deliver the most secure and transparent voting experience.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
              <div className="feature-card group">
                <div className="feature-icon">
                  <Layers className="h-8 w-8 text-votex-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2 group-hover:text-votex-primary transition-colors">Blockchain Technology</h3>
                <p className="text-gray-300">Immutable ledger ensures votes cannot be altered or deleted once cast, providing unprecedented transparency.</p>
              </div>
              
              <div className="feature-card group">
                <div className="feature-icon">
                  <Shield className="h-8 w-8 text-votex-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2 group-hover:text-votex-primary transition-colors">Military-Grade Encryption</h3>
                <p className="text-gray-300">End-to-end encryption protects voter data and ballots throughout the entire voting process.</p>
              </div>
              
              <div className="feature-card group">
                <div className="feature-icon">
                  <Key className="h-8 w-8 text-votex-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2 group-hover:text-votex-primary transition-colors">Advanced Identity Verification</h3>
                <p className="text-gray-300">Multiple layers of authentication ensure only eligible voters can access and cast their ballots.</p>
              </div>
              
              <div className="feature-card group">
                <div className="feature-icon">
                  <ListChecks className="h-8 w-8 text-votex-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2 group-hover:text-votex-primary transition-colors">Flexible Ballot Design</h3>
                <p className="text-gray-300">Create custom ballots with various question types to suit any election format or voting need.</p>
              </div>
              
              <div className="feature-card group">
                <div className="feature-icon">
                  <BarChart3 className="h-8 w-8 text-votex-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2 group-hover:text-votex-primary transition-colors">Instant Results Dashboard</h3>
                <p className="text-gray-300">Watch election results unfold in real-time with detailed analytics and visualizations.</p>
              </div>
              
              <div className="feature-card group">
                <div className="feature-icon">
                  <Files className="h-8 w-8 text-votex-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2 group-hover:text-votex-primary transition-colors">Complete Audit Records</h3>
                <p className="text-gray-300">Comprehensive logs and reports of all voting activities for complete accountability and verification.</p>
              </div>
              
              <div className="feature-card group">
                <div className="feature-icon">
                  <UserCheck className="h-8 w-8 text-votex-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2 group-hover:text-votex-primary transition-colors">Intuitive Experience</h3>
                <p className="text-gray-300">Simple and accessible interface that makes voting easy for users of all technical abilities.</p>
              </div>
              
              <div className="feature-card group">
                <div className="feature-icon">
                  <Globe className="h-8 w-8 text-votex-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2 group-hover:text-votex-primary transition-colors">Global Accessibility</h3>
                <p className="text-gray-300">Support for multiple languages makes our platform accessible to diverse communities worldwide.</p>
              </div>
              
              <div className="feature-card group">
                <div className="feature-icon">
                  <Layers className="h-8 w-8 text-votex-primary" />
                </div>
                <h3 className="text-xl font-medium mb-2 group-hover:text-votex-primary transition-colors">Enterprise Scalability</h3>
                <p className="text-gray-300">From small organizations to national elections, our platform scales to meet any voting demand.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-gray-800 z-0"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-votex-primary to-votex-secondary">Ready to Transform Your Voting Process?</h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Join thousands of organizations worldwide who trust VoteX for secure, transparent, and efficient elections.</p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {account ? (
                <Button 
                  onClick={handleVoterClick} 
                  size="lg" 
                  className="bg-gradient-to-r from-votex-primary to-votex-secondary hover:opacity-90 transition-all duration-300 shadow-[0_0_20px_rgba(0,112,243,0.5)]"
                >
                  Enter Voter Portal
                </Button>
              ) : (
                <div className="w-full flex flex-col items-center gap-4">
                  <p className="text-gray-400">You need to connect your wallet first</p>
                  <WalletConnection />
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm">
          <div className="flex items-center justify-center mb-4">
            <img src="/icon.png" alt="VoteX Logo" className="w-8 h-8 mr-2" />
            <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-votex-primary to-votex-secondary">
              VoteX
            </h3>
          </div>
          <p>© {new Date().getFullYear()} VoteX. All rights reserved.</p>
          <p className="mt-2">Powered by Ethereum blockchain technology.</p>
        </div>
      </footer>

      <style>
        {`
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center center;
        }
        
        .feature-card {
          @apply bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 
                 transition-all duration-300 hover:border-votex-primary/50 hover:shadow-[0_0_15px_rgba(0,112,243,0.2)]
                 flex flex-col items-start;
          transform: translateY(20px);
          opacity: 0;
          transition: transform 0.6s ease-out, opacity 0.6s ease-out;
        }
        
        .feature-card.feature-visible {
          transform: translateY(0);
          opacity: 1;
        }
        
        .feature-icon {
          @apply bg-votex-primary/10 p-4 rounded-xl mb-4 transition-all duration-300
                 group-hover:bg-votex-primary/20 group-hover:shadow-[0_0_15px_rgba(0,112,243,0.3)];
        }
        
        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .particle {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at center, rgba(0, 112, 243, 0.8), rgba(0, 112, 243, 0));
          top: var(--y);
          left: var(--x);
          width: var(--size);
          height: var(--size);
          opacity: 0.3;
          transform: rotate(var(--rotation));
          animation: float var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
        }
        
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(var(--rotation));
          }
          25% {
            transform: translate(50px, -50px) rotate(calc(var(--rotation) + 90deg));
          }
          50% {
            transform: translate(25px, 50px) rotate(calc(var(--rotation) + 180deg));
          }
          75% {
            transform: translate(-50px, 25px) rotate(calc(var(--rotation) + 270deg));
          }
        }
        
        .perspective-cube {
          perspective: 1000px;
          width: 200px;
          height: 200px;
        }
        
        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transform: rotateX(-15deg) rotateY(15deg);
          animation: rotate-cube 20s infinite linear;
        }
        
        .cube-face {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0.7;
          border: 1px solid rgba(0, 112, 243, 0.5);
        }
        
        .cube-face-front {
          transform: translateZ(100px);
          background: radial-gradient(circle at center, rgba(0, 112, 243, 0.2), transparent);
        }
        
        .cube-face-back {
          transform: rotateY(180deg) translateZ(100px);
          background: radial-gradient(circle at center, rgba(121, 40, 202, 0.2), transparent);
        }
        
        .cube-face-right {
          transform: rotateY(90deg) translateZ(100px);
          background: radial-gradient(circle at center, rgba(0, 198, 207, 0.2), transparent);
        }
        
        .cube-face-left {
          transform: rotateY(-90deg) translateZ(100px);
          background: radial-gradient(circle at center, rgba(0, 112, 243, 0.2), transparent);
        }
        
        .cube-face-top {
          transform: rotateX(90deg) translateZ(100px);
          background: radial-gradient(circle at center, rgba(121, 40, 202, 0.2), transparent);
        }
        
        .cube-face-bottom {
          transform: rotateX(-90deg) translateZ(100px);
          background: radial-gradient(circle at center, rgba(0, 198, 207, 0.2), transparent);
        }
        
        @keyframes rotate-cube {
          from {
            transform: rotateX(-15deg) rotateY(0deg);
          }
          to {
            transform: rotateX(-15deg) rotateY(360deg);
          }
        }
        
        @keyframes animate-gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-spin-slow {
          animation: spin 20s linear infinite;
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .card-hover {
          transition: all 0.3s ease;
          overflow: hidden;
          position: relative;
        }
        
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px -5px rgba(0, 112, 243, 0.2);
        }
        
        .card-hover::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 5px;
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        
        .card-hover:first-child::after {
          background: linear-gradient(to right, #0070F3, #00C6CF);
        }
        
        .card-hover:last-child::after {
          background: linear-gradient(to right, #7928CA, #00C6CF);
        }
        
        .card-hover:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }
        `}
      </style>
    </div>
  );
};

export default Index;
