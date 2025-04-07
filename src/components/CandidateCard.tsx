import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Candidate } from '@/utils/types';
import { Check, User, ArrowDownCircle } from 'lucide-react';
import { useWeb3 } from '@/context/Web3Context';

interface CandidateCardProps {
  candidate: Candidate;
  electionId: number;
  hasVoted: boolean;
  showResults?: boolean;
  totalVotes?: number;
  isAdminView?: boolean;
}

const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  electionId, 
  hasVoted,
  showResults = false,
  totalVotes = 0,
  isAdminView = false
}) => {
  const { castVote, loading, transactionInProgress, transactionHash } = useWeb3();

  const handleVote = () => {
    castVote(electionId, candidate.id);
  };

  // Only show vote percentage if on admin view or when explicitly requested (for results page)
  const shouldShowResults = showResults || isAdminView;
  const votePercentage = totalVotes > 0 ? Math.round((candidate.votes / totalVotes) * 100) : 0;

  return (
    <Card className="h-full overflow-hidden glass-card border border-gray-200 shadow-card hover:shadow-xl transition-all duration-300 font-doto">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-center mb-3">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-500" />
          </div>
        </div>
        <CardTitle className="text-center font-doto">{candidate.name}</CardTitle>
        {candidate.party && (
          <CardDescription className="text-center font-doto">{candidate.party}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-0 text-center">
        {shouldShowResults && (
          <div className="mt-2 space-y-1">
            <div className="text-lg font-doto">{candidate.votes} votes</div>
            <div className="text-sm text-gray-500 font-doto">{votePercentage}% of total</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div 
                className="bg-votex-primary rounded-full h-2 transition-all duration-500 ease-out" 
                style={{ width: `${votePercentage}%` }}
              ></div>
            </div>
          </div>
        )}
        
        {transactionInProgress && !showResults && (
          <div className="mt-4 bg-blue-50 text-blue-600 p-3 rounded-md">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <ArrowDownCircle className="h-5 w-5 animate-pulse" />
              <span className="font-medium">Transaction in progress</span>
            </div>
            <p className="text-xs">Please wait while your vote is being processed...</p>
          </div>
        )}
        
        {transactionHash && !transactionInProgress && !showResults && (
          <div className="mt-4 bg-green-50 text-green-600 p-3 rounded-md">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Check className="h-5 w-5" />
              <span className="font-medium">Transaction confirmed</span>
            </div>
            <p className="text-xs break-all">
              Tx: {transactionHash.substring(0, 12)}...{transactionHash.substring(transactionHash.length - 8)}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 flex justify-center">
        {!showResults && (
          <Button 
            onClick={handleVote} 
            disabled={hasVoted || loading || transactionInProgress}
            className="w-full font-doto digital-text"
            variant={hasVoted ? "ghost" : "connect"}
          >
            {loading || transactionInProgress ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : hasVoted ? (
              <>
                <Check className="mr-1 h-4 w-4" />
                VOTED
              </>
            ) : (
              'VOTE'
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CandidateCard;
