
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Election, ElectionStatus } from '@/utils/types';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ElectionHistoryProps {
  elections: Election[];
  isAdmin?: boolean;
}

const ElectionHistory: React.FC<ElectionHistoryProps> = ({ elections, isAdmin = false }) => {
  // Sort elections by date (most recent first)
  const sortedElections = [...elections].sort((a, b) => b.startTime - a.startTime);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
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

  if (sortedElections.length === 0) {
    return (
      <Card className="glass-card shadow-card">
        <CardContent className="pt-6 text-center">
          <p className="text-gray-500">No election history available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-card shadow-card">
      <CardHeader>
        <CardTitle className="text-xl">Election History</CardTitle>
        <CardDescription>Past, ongoing and upcoming elections</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {sortedElections.map((election) => (
            <div key={election.id} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium">{election.title}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span>{formatDate(election.startTime)}</span>
                    <span className="mx-1">—</span>
                    <span>{formatDate(election.endTime)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(election.status)}
                <Button asChild size="sm" variant="ghost">
                  <Link to={isAdmin ? `/admin/${election.id}` : `/results/${election.id}`}>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="justify-between pt-4">
        <div className="text-sm text-gray-500">{sortedElections.length} elections in total</div>
      </CardFooter>
    </Card>
  );
};

export default ElectionHistory;
