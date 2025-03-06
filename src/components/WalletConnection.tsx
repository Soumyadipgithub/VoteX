import React from 'react';
import { Button } from '@/components/ui/button';
import { useWeb3 } from '@/context/Web3Context';
import { Loader2, ExternalLink } from 'lucide-react';

// Import Wallet explicitly to avoid potential issues
import { Wallet as WalletIcon } from 'lucide-react';

const WalletConnection: React.FC = () => {
  const {
    account,
    connectWallet,
    loading,
    isMetaMaskInstalled
  } = useWeb3();
  
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
  
  return (
    <div className="flex items-center space-x-2">
      {account ? (
        <Button variant="outline" className="h-10 px-4 py-2 rounded-md glass-card border border-gray-200">
          <WalletIcon className="w-4 h-4 mr-2" />
          <span className="font-medium text-votex-primary">{formatAddress(account)}</span>
        </Button>
      ) : (
        <Button 
          onClick={handleConnectClick} 
          disabled={loading} 
          className="h-10 py-2 bg-votex-primary hover:bg-votex-primary/90 text-white rounded-md shadow-button hover:shadow-button-hover button-transition"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <WalletIcon className="w-4 h-4 mr-2" />
              {isMetaMaskInstalled ? 'Connect Wallet' : 'Install MetaMask'}
              {!isMetaMaskInstalled && <ExternalLink className="w-3 h-3 ml-1" />}
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default WalletConnection;
