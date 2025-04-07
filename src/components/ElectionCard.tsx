import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Election, ElectionStatus } from '@/utils/types';
import { useWeb3 } from '@/context/Web3Context';
import { ArrowRight, Clock, Play, Square, Users, Vote } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ElectionCardProps {
  election: Election;
  isAdmin?: boolean;
  showActions?: boolean;
}

const ElectionCard: React.FC<ElectionCardProps> = ({ 
  election, 
  isAdmin = false,
  showActions = true
}) => {
  const { startElection, endElection, loading } = useWeb3();

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusBadge = (status: ElectionStatus) => {
    switch (status) {
      case ElectionStatus.PENDING:
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">Pending</Badge>;
      case ElectionStatus.ACTIVE:
        return <Badge variant="outline" className="bg-green-100 text-green-800">Active</Badge>;
      case ElectionStatus.ENDED:
        return <Badge variant="outline" className="bg-blue-100 text-blue-800">Ended</Badge>;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full overflow-hidden glass-card border border-gray-200 shadow-card hover:shadow-xl transition-all duration-300">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold">{election.title}</CardTitle>
          {getStatusBadge(election.status)}
        </div>
        <CardDescription className="mt-1">{election.description}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2 pb-0">
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>Starts: {formatDate(election.startTime)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            <span>Ends: {formatDate(election.endTime)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="h-4 w-4 mr-2" />
            <span>{election.candidates.length} Candidates</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center">
        {showActions && (
          <>
            <div className="flex space-x-2">
              {isAdmin ? (
                <>
                  {election.status === ElectionStatus.PENDING && (
                    <Button 
                      size="sm" 
                      onClick={() => startElection(election.id)}
                      disabled={loading}
                      className="bg-votex-success hover:bg-votex-success/90 text-white"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Start Voting
                    </Button>
                  )}
                  {election.status === ElectionStatus.ACTIVE && (
                    <Button 
                      size="sm" 
                      onClick={() => endElection(election.id)}
                      disabled={loading}
                      className="bg-votex-warning hover:bg-votex-warning/90 text-white"
                    >
                      <Square className="h-4 w-4 mr-1" />
                      End Voting
                    </Button>
                  )}
                </>
              ) : (
                <>
                  {election.status === ElectionStatus.ACTIVE && (
                    <Button asChild size="sm" className="bg-votex-primary hover:bg-votex-primary/90 text-white">
                      <Link to={`/voter/${election.id}`}>
                        <Vote className="h-4 w-4 mr-1" />
                        Cast Vote
                      </Link>
                    </Button>
                  )}
                  {election.status === ElectionStatus.ENDED && (
                    <Button asChild size="sm" variant="outline">
                      <Link to={`/results/${election.id}`}>
                        View Results
                      </Link>
                    </Button>
                  )}
                </>
              )}
            </div>
            
            {/* Always show Details button regardless of status */}
            <Button asChild size="sm" className="bg-votex-primary hover:bg-votex-primary/90 text-white">
              <Link to={isAdmin ? `/admin/${election.id}` : `/results/${election.id}`}>
               <span className="text-[#FFFFFF]">Details</span>
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>

          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default ElectionCard;
