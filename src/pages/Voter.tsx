import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WalletConnection from '@/components/WalletConnection';
import ElectionCard from '@/components/ElectionCard';
import { useWeb3 } from '@/context/Web3Context';
import { ArrowLeft, Vote } from 'lucide-react';
import CandidateCard from '@/components/CandidateCard';
import { toast } from 'sonner';

const Voter = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { account, elections, transactionHash } = useWeb3();

  // Get active elections
  const activeElections = elections.filter(e => e.status === 'ACTIVE');
  
  // If viewing a specific election
  const currentElection = id ? elections.find(e => e.id === parseInt(id)) : null;
  
  // Check if user has already voted in this election
  const hasVoted = currentElection ? 
    currentElection.voters.some(v => v.address === account && v.hasVoted) : 
    false;

  useEffect(() => {
    if (!account) {
      navigate('/');
      toast.error('Please connect your wallet first');
    }
  }, [account, navigate]);

  if (!account) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="votex-container flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {id && (
              <Button variant="ghost" size="sm" onClick={() => navigate('/voter')}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            <h1 
              className="text-2xl font-bold text-votex-primary cursor-pointer"
              onClick={() => navigate('/')}
            >
              VoteX Voter Portal
            </h1>
          </div>
          <WalletConnection />
        </div>
      </header>

      <main className="votex-container py-8">
        {currentElection ? (
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold mb-2">{currentElection.title}</h2>
              <p className="text-lg text-gray-600 mb-4">{currentElection.description}</p>
              
              {hasVoted ? (
                <div className="bg-green-50 text-green-700 p-4 rounded-lg inline-block">
                  You have already cast your vote in this election
                  {transactionHash && (
                    <div className="text-xs mt-2">
                      Transaction: {transactionHash.substring(0, 10)}...{transactionHash.substring(transactionHash.length - 6)}
                    </div>
                  )}
                </div>
              ) : currentElection.status !== 'ACTIVE' ? (
                <div className="bg-yellow-50 text-yellow-700 p-4 rounded-lg inline-block">
                  This election is not currently active
                </div>
              ) : (
                <div className="bg-blue-50 text-blue-700 p-4 rounded-lg inline-block">
                  <p className="mb-1">Please select a candidate to cast your vote</p>
                  <p className="text-xs">Voting requires a test ETH transaction from your wallet</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {currentElection.candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  electionId={currentElection.id}
                  hasVoted={hasVoted}
                />
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                variant="outline"
                onClick={() => navigate('/results/' + currentElection.id)}
                className="mx-auto"
              >
                View Results
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Active Elections</h2>
              <p className="text-gray-600">Select an election to cast your vote</p>
            </div>

            {activeElections.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeElections.map((election) => (
                  <ElectionCard key={election.id} election={election} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl shadow-card">
                <Vote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No Active Elections</h3>
                <p className="text-gray-500 mb-6">There are no active elections available for voting at this time.</p>
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/')}
                >
                  Return to Home
                </Button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Voter;
