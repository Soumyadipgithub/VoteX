import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import WalletConnection from '@/components/WalletConnection';
import { useWeb3 } from '@/context/Web3Context';
import { useNavigate } from 'react-router-dom';
import { Settings, Vote, Shield, Key, UserCheck, ListChecks, BarChart3, Files, Globe, Layers } from 'lucide-react';
import AdminAuth from '@/components/AdminAuth';

const Index = () => {
  const {
    account
  } = useWeb3();
  const navigate = useNavigate();
  const [showAdminAuth, setShowAdminAuth] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [visibleFeatures, setVisibleFeatures] = useState<number[]>([]);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      });
    };
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
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [visibleFeatures]);

  const headerOpacity = Math.max(0, 1 - scrollY / 500);
  const parallaxStyle = {
    transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`
  };

  const handleVoterClick = () => {
    navigate('/voter');
  };

  const handleAdminClick = () => {
    setShowAdminAuth(true);
  };

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 hex-grid opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/30 via-transparent to-transparent"></div>
        
        <div className="particles">
          {Array.from({
          length: 30
        }).map((_, i) => <div key={i} className="particle" style={{
          '--x': `${Math.random() * 100}%`,
          '--y': `${Math.random() * 100}%`,
          '--duration': `${Math.random() * 40 + 20}s`,
          '--delay': `${Math.random() * 5}s`,
          '--size': `${Math.random() * 10 + 5}px`,
          '--rotation': `${Math.random() * 360}deg`
        } as React.CSSProperties}></div>)}
        </div>
      </div>

      <header className="fixed w-full px-4 py-6 flex justify-between items-center z-50 transition-all duration-300" style={{
      opacity: headerOpacity,
      backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))'
    }}>
        <div className="flex items-center">
          <img src="/icon.png" alt="VoteX Logo" className="w-10 h-10 mr-3 animate-pulse" />
          <h1 className="text-3xl font-bold text-red-600 bg-clip-text animated-gradient">
            VoteX
          </h1>
        </div>
        <div className="flex items-center gap-6">
          <WalletConnection position="navbar" />
        </div>
      </header>

      <main className="relative">
        <section className="relative h-screen flex flex-col items-center justify-center px-4 pb-20 pt-10 overflow-hidden">
          <div className="absolute w-full h-full">
            <div className="absolute left-1/4 top-1/4 w-48 h-48 border-2 border-red-500/30 rotate-45 animate-spin-slow"></div>
            <div className="absolute right-1/4 bottom-1/3 w-72 h-72 border-2 border-blue-500/30 rounded-full animate-spin-slow"></div>
            <div className="absolute left-1/3 bottom-1/4 w-36 h-36 border-2 border-purple-500/30 rotate-12 animate-pulse"></div>
          </div>
          
          <div className="text-center max-w-3xl mx-auto z-10 scanner">
            <div className="inline-block px-3 py-1 mb-6 bg-red-900/30 text-red-500 rounded-full text-sm border border-red-500/30 cyber-card neon-border" style={parallaxStyle}>
              <span className="text-scan">Secure. Transparent. Decentralized.</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance leading-tight neon-text">
              THE BEST <span className="bg-clip-text animated-gradient text-red-600">BLOCKCHAIN</span> VOTING
            </h1>
            <h2 className="text-4xl font-bold mb-6 text-gray-50">BACKED BY THE <span className="text-[#ea384c]">BEST TECH</span></h2>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience the future of voting with our secure, transparent, and immutable blockchain-based voting platform.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Button onClick={() => account ? handleVoterClick() : scrollToFeatures()} size="lg" variant="explore" className="text-white btn-3d neon-border py-6">
                <span className="relative z-10 text-scan">
                  {account ? "ENTER VOTER PORTAL" : "EXPLORE FEATURES"}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent scanner"></div>
              </Button>
              
              <Button variant="learn" size="lg" className="font-semibold cyber-card py-6" onClick={scrollToFeatures}>
                <span className="digital-count">LEARN MORE</span>
              </Button>
            </div>
          </div>
          
          <div className="absolute right-[5%] top-1/2 -translate-y-1/2 hidden lg:block perspective-cube">
            <div className="cube">
              <div className="cube-face cube-face-front"></div>
              <div className="cube-face cube-face-back"></div>
              <div className="cube-face cube-face-right"></div>
              <div className="cube-face cube-face-left"></div>
              <div className="cube-face cube-face-top"></div>
              <div className="cube-face cube-face-bottom"></div>
            </div>
          </div>
          
          <div className="absolute bottom-10 left-0 right-0 mx-auto flex flex-col items-center animate-bounce w-full text-center">
            <span className="text-sm text-gray-400 mb-2 digital-count">SCROLL TO DISCOVER</span>
            <svg className="w-6 h-6 text-red-500 animate-pulse mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        {account && !showAdminAuth && <section className="min-h-screen flex items-center justify-center relative py-20 px-4">
            <div className="absolute inset-0 circuit-pattern z-0"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-5xl z-10">
              <Button onClick={handleVoterClick} className="h-auto min-h-[320px] cyber-card flex flex-col items-center justify-left p-8 text-center hover-lift group rounded-xl overflow-hidden relative">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-red-500/20 rounded-full animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-transparent"></div>
                <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-red-500 to-transparent"></div>
                
                <div className="bg-red-500/20 p-6 rounded-full transition-all duration-300 group-hover:bg-red-500/30 mb-6 relative hologram">
                  <Vote className="h-12 w-12 text-red-500" />
                  <div className="absolute inset-0 animate-pulse rounded-full border border-red-500/50"></div>
                </div>
                
                <div className="space-y-4 w-full px-0">
                  <h3 className="text-3xl font-medium text-white neon-text mb-4">VOTER PORTAL</h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                    Cast your vote securely in active elections
                  </p>
                  <p className="text-gray-300 text-base leading-relaxed -mt-2">
                    with blockchain verification
                  </p>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent to-red-500"></div>
                <div className="absolute bottom-0 left-0 h-full w-1 bg-gradient-to-t from-red-500 to-transparent"></div>
              </Button>

              <Button onClick={handleAdminClick} className="h-auto min-h-[320px] cyber-card flex flex-col items-center justify-center p-8 text-center hover-lift group rounded-xl overflow-hidden relative">
                <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-purple-500/20 rounded-full animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-transparent"></div>
                <div className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-purple-500 to-transparent"></div>
                
                <div className="bg-purple-500/20 p-6 rounded-full transition-all duration-300 group-hover:bg-purple-500/30 mb-6 relative hologram">
                  <Settings className="h-12 w-12 text-purple-500" />
                  <div className="absolute inset-0 animate-pulse rounded-full border border-purple-500/50"></div>
                </div>
                
                <div className="space-y-4 w-full px-4">
                  <h3 className="text-3xl font-medium text-white neon-text">ADMIN PORTAL</h3>
                  <p className="text-gray-300 text-base leading-relaxed">
                  Create and manage elections with powerful
                  </p>
                  <p className="text-gray-300 text-base leading-relaxed -mt-2">
                  administrative tools
                  </p>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent to-purple-500"></div>
                <div className="absolute bottom-0 left-0 h-full w-1 bg-gradient-to-t from-purple-500 to-transparent"></div>
              </Button>
            </div>
          </section>}

        {showAdminAuth && <section className="min-h-screen flex items-center justify-center relative py-20 px-4">
            <div className="absolute inset-0 hex-grid z-0"></div>
            <div className="w-full max-w-md z-10 cyber-card p-6 rounded-xl neon-border">
              <AdminAuth />
              <div className="mt-4 text-center">
                <Button variant="ghost" onClick={() => setShowAdminAuth(false)} className="text-white hover:text-red-500 btn-3d">
                  <span className="digital-count">BACK TO OPTIONS</span>
                </Button>
              </div>
            </div>
          </section>}

        <section ref={featuresRef} id="features" className="py-24 relative">
          <div className="absolute inset-0 circuit-pattern z-0"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <div className="red-bar w-2/3 mx-auto h-1 bg-red-600 mb-10 relative">
                <div className="absolute -top-2 left-1/2 w-4 h-4 bg-red-600 rounded-full"></div>
                <div className="absolute -top-2 left-0 w-4 h-4 bg-red-600 rounded-full"></div>
                <div className="absolute -top-2 right-0 w-4 h-4 bg-red-600 rounded-full"></div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4 neon-text">REVOLUTIONARY FEATURES</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our platform combines cutting-edge technology with user-friendly design to deliver the most secure and transparent voting experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-14">
              {[{
              icon: <Layers className="h-8 w-8 text-red-500" />,
              title: "BLOCKCHAIN TECH",
              text: "Immutable ledger ensures votes cannot be altered or deleted once cast."
            }, {
              icon: <Shield className="h-8 w-8 text-red-500" />,
              title: "MILITARY-GRADE ENCRYPTION",
              text: "End-to-end encryption protects voter data and ballots."
            }, {
              icon: <Key className="h-8 w-8 text-red-500" />,
              title: "IDENTITY VERIFICATION",
              text: "Multiple layers of authentication ensure only eligible voters can access ballots."
            }, {
              icon: <ListChecks className="h-8 w-8 text-red-500" />,
              title: "FLEXIBLE BALLOT DESIGN",
              text: "Create custom ballots with various question types to suit any election format."
            }, {
              icon: <BarChart3 className="h-8 w-8 text-red-500" />,
              title: "RESULTS DASHBOARD",
              text: "Watch election results unfold in real-time with detailed analytics."
            }, {
              icon: <Files className="h-8 w-8 text-red-500" />,
              title: "AUDIT RECORDS",
              text: "Comprehensive logs and reports of all voting activities for verification."
            }, {
              icon: <UserCheck className="h-8 w-8 text-red-500" />,
              title: "INTUITIVE EXPERIENCE",
              text: "Simple and accessible interface that makes voting easy for all users."
            }, {
              icon: <Globe className="h-8 w-8 text-red-500" />,
              title: "GLOBAL ACCESS",
              text: "Support for multiple languages makes our platform accessible to diverse communities."
            }, {
              icon: <Layers className="h-8 w-8 text-red-500" />,
              title: "ENTERPRISE SCALABILITY",
              text: "From small organizations to national elections, our platform scales to meet any demand."
            }].map((feature, index) => <div key={index} className="feature-card group cyber-card hover-lift p-6 rounded-xl overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
                  <div className="absolute top-0 right-0 h-full w-1 bg-red-500"></div>
                  
                  <div className="feature-icon bg-red-500/10 p-4 rounded-xl mb-4 group-hover:bg-red-500/20 transition-all relative overflow-hidden">
                    {feature.icon}
                    <div className="absolute inset-0 scanner"></div>
                  </div>
                  
                  <h3 className="text-xl font-medium mb-2 group-hover:text-red-500 transition-colors neon-text">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.text}</p>
                  
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500"></div>
                  <div className="absolute bottom-0 left-0 h-full w-1 bg-red-500"></div>
                </div>)}
            </div>
          </div>
        </section>
        
        <section className="py-24 relative">
          <div className="absolute inset-0 hex-grid z-0"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
            <div className="red-bar w-2/3 mx-auto h-1 bg-red-600 mb-10 relative">
              <div className="absolute -top-2 left-1/2 w-4 h-4 bg-red-600 rounded-full"></div>
              <div className="absolute -top-2 left-0 w-4 h-4 bg-red-600 rounded-full"></div>
              <div className="absolute -top-2 right-0 w-4 h-4 bg-red-600 rounded-full"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-8 neon-text">
              READY TO TRANSFORM YOUR VOTING PROCESS?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of organizations worldwide who trust VoteX for secure, transparent, and efficient elections.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {account ? <Button onClick={handleVoterClick} size="lg" variant="explore" className="text-white btn-3d neon-border py-6 px-8">
                  <span className="digital-count text-xl">ENTER VOTER PORTAL</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent scanner"></div>
                </Button> : <div className="w-full cyber-card p-6 rounded-xl neon-border">
                  <p className="text-gray-400 mb-4 digital-count">YOU NEED TO CONNECT YOUR WALLET FIRST</p>
                  <WalletConnection position="page" />
                </div>}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-black py-12 border-t border-red-900/50 relative overflow-hidden">
        <div className="absolute inset-0 circuit-pattern opacity-30"></div>
        <div className="container mx-auto px-4 text-center text-gray-400 text-sm relative z-10">
          <div className="flex flex-col items-center justify-center mb-4">
            <img src="/icon.png" alt="VoteX Logo" className="w-8 h-8 mb-2 animate-pulse" />
            <h3 className="text-xl font-bold text-red-600 bg-clip-text animated-gradient">
              VoteX
            </h3>
          </div>
          <p className="digital-count">© {new Date().getFullYear()} VoteX. All rights reserved.</p>
          <p className="mt-2 digital-count">Powered by Ethereum blockchain technology.</p>
        </div>
      </footer>

      <style>
        {`
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 62, 62, 0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255, 62, 62, 0.1) 1px, transparent 1px);
          background-size: 40px 40px;
          background-position: center center;
        }
        
        .feature-card {
          transform: translateY(20px);
          opacity: 0;
          transition: transform 0.6s ease-out, opacity 0.6s ease-out;
        }
        
        .feature-card.feature-visible {
          transform: translateY(0);
          opacity: 1;
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
          background: radial-gradient(circle at center, rgba(255, 62, 62, 0.8), rgba(255, 62, 62, 0));
          top: var(--y);
          left: var(--x);
          width: var(--size);
          height: var(--size);
          opacity: 0.5;
          transform: rotate(var(--rotation));
          animation: float var(--duration) ease-in-out infinite;
          animation-delay: var(--delay);
          box-shadow: 0 0 10px rgba(255, 62, 62, 0.5);
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
          border: 1px solid rgba(255, 62, 62, 0.5);
        }
        
        .cube-face-front {
          transform: translateZ(100px);
          background: radial-gradient(circle at center, rgba(255, 62, 62, 0.2), transparent);
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
          background: radial-gradient(circle at center, rgba(255, 62, 62, 0.2), transparent);
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
        
        .hover-lift {
          transition: all 0.3s ease;
          overflow: hidden;
          position: relative;
        }
        
        .hover-lift:hover {
          transform: translateY(-5px) scale(1.03);
          box-shadow: 0 20px 30px -10px rgba(255, 62, 62, 0.3);
        }
        
        .red-bar {
          position: relative;
          height: 2px;
          background: linear-gradient(90deg, transparent 0%, #ff3e3e 50%, transparent 100%);
          animation: scan-line 3s ease-in-out infinite alternate;
        }
        
        @keyframes scan-line {
          from {
            box-shadow: 0 0 5px #ff3e3e;
            opacity: 0.5;
          }
          to {
            box-shadow: 0 0 15px #ff3e3e;
            opacity: 1;
          }
        }
        `}
      </style>
    </div>;
};

export default Index;
