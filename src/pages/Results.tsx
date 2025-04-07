import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import WalletConnection from '@/components/WalletConnection';
import { useWeb3 } from '@/context/Web3Context';
import { ArrowLeft } from 'lucide-react';
import CandidateCard from '@/components/CandidateCard';
import ElectionHistory from '@/components/ElectionHistory';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { toast } from 'sonner';

const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { account, elections } = useWeb3();

  useEffect(() => {
    if (!account) {
      toast.error('Please connect your wallet to view results');
    }
  }, [account]);

  // If viewing a specific election
  const currentElection = id ? elections.find(e => e.id === parseInt(id)) : null;
  
  // Calculate total votes for the selected election
  const totalVotes = currentElection 
    ? currentElection.candidates.reduce((sum, candidate) => sum + candidate.votes, 0)
    : 0;
  
  // Format data for chart
  const chartData = currentElection 
    ? currentElection.candidates.map(candidate => ({
        name: candidate.name,
        votes: candidate.votes
      }))
    : [];

  const colors = ['#0070F3', '#00C6CF', '#7928CA', '#10B981', '#F59E0B', '#EF4444'];

  if (!account) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-center p-8 bg-white rounded-xl shadow-card max-w-md">
          <h2 className="text-2xl font-bold mb-4">Wallet Not Connected</h2>
          <p className="text-gray-600 mb-6">Please connect your wallet to view election results</p>
          <WalletConnection />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="votex-container flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {id ? (
              <Button 
                variant="ghost"
                size="sm"
                onClick={() => navigate('/results')}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            ) : (
              <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Home
              </Button>
            )}
            <h1 
              className="text-2xl font-bold text-votex-primary cursor-pointer"
              onClick={() => navigate('/')}>
              VoteX Results
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
              
              <div className="bg-blue-50 p-4 rounded-lg inline-block">
                <span className="text-blue-700">
                  Total Votes: <strong>{totalVotes}</strong>
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-card p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Results Chart</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                  >
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={70} />
                    <YAxis />
                    <Tooltip 
                      formatter={(value) => [`${value} votes`, 'Votes']}
                      labelStyle={{ color: '#333' }}
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        border: 'none'
                      }}
                    />
                    <Bar dataKey="votes" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {currentElection.candidates.map((candidate) => (
                <CandidateCard
                  key={candidate.id}
                  candidate={candidate}
                  electionId={currentElection.id}
                  hasVoted={true}
                  showResults={true}
                  totalVotes={totalVotes}
                />
              ))}
            </div>

            <div className="mt-12 flex justify-center space-x-4">
              <Button
                variant="outline"
                onClick={() => navigate('/')}
              >
                Return Home
              </Button>
              {account && (
                <Button
                  onClick={() => navigate('/voter')}
                  className="bg-votex-primary hover:bg-votex-primary/90 text-white"
                >
                  View Active Elections
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold mb-4">Election Results</h2>
              <p className="text-gray-600">View the results of all completed elections</p>
            </div>

            <ElectionHistory elections={elections} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Results;
