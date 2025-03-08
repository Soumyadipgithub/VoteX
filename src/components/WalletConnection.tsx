import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/context/Web3Context';
import { Loader2, ExternalLink } from 'lucide-react';
import { Wallet as WalletIcon } from 'lucide-react';

// Props to allow customizing the position and styling of the component
interface WalletConnectionProps {
  position?: 'navbar' | 'page'; // Indicates where this component is being used
  className?: string; // Additional classes for the container
}

const WalletConnection: React.FC<WalletConnectionProps> = ({ 
  position = 'navbar',
  className = '',
}) => {
  const {
    account,
    connectWallet,
    loading,
    isMetaMaskInstalled
  } = useWeb3();
  const [animateWallet, setAnimateWallet] = useState(false);
  
  useEffect(() => {
    // Add animation effect when account changes
    if (account) {
      setAnimateWallet(true);
      const timer = setTimeout(() => setAnimateWallet(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [account]);
  
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  const handleConnectClick = () => {
    if (!isMetaMaskInstalled) {
      window.open('https://metamask.io/download/', '_blank');
    } else {
      connectWallet();
    }
  };

  // Define position-specific classes
  const getButtonClasses = () => {
    if (position === 'navbar') {
      return "h-10 py-2 font-doto px-4 digital-text"; // Navbar button (right-aligned)
    } else {
      return "h-10 py-2 font-doto px-[17px] mx-auto digital-text"; // Page button (centered)
    }
  };

  const getContainerClasses = () => {
    if (position === 'navbar') {
      return "flex items-center space-x-2 justify-end"; // Right-aligned for navbar
    } else {
      return "flex items-center space-x-2 justify-center w-full"; // Centered for page
    }
  };

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      {account ? (
        <Button 
          variant="connect" 
          className="h-10 px-6 py-2"
        >
          <WalletIcon className="w-4 h-4 mr-2 text-white" />
          <span className="font-doto digital-text">
            {formatAddress(account)}
          </span>
        </Button>
      ) : (
        <Button 
          onClick={handleConnectClick} 
          disabled={loading}
          variant={isMetaMaskInstalled ? "connect" : "metamask"}
          className={getButtonClasses()}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              <span className="digital-text">CONNECTING...</span>
            </>
          ) : (
            <>
              <WalletIcon className="w-4 h-4 mr-2" />
              <span className="digital-text">
                {isMetaMaskInstalled ? 'CONNECT WALLET' : 'INSTALL METAMASK'}
              </span>
              {!isMetaMaskInstalled && <ExternalLink className="w-3 h-3 ml-1" />}
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default WalletConnection;
