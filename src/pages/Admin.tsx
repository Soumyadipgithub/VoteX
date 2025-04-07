
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import WalletConnection from '@/components/WalletConnection';
import { useWeb3 } from '@/context/Web3Context';
import { PlusCircle, ArrowLeft, Loader2, UserPlus } from 'lucide-react';
import ElectionForm from '@/components/ElectionForm';
import ElectionCard from '@/components/ElectionCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Admin = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { account, isAdmin, elections, loading, addVoter } = useWeb3();
  const [voterAddress, setVoterAddress] = useState('');

  useEffect(() => {
    if (!account) {
      navigate('/');
      toast.error('Please connect your wallet first');
      return;
    }

    if (!isAdmin) {
      navigate('/');
      toast.error('Authentication required for admin access');
      return;
    }
  }, [account, isAdmin, navigate]);

  const handleAddVoter = async () => {
    if (!voterAddress || !voterAddress.startsWith('0x') || voterAddress.length !== 42) {
      toast.error('Please enter a valid Ethereum address');
      return;
    }

    if (!id) {
      toast.error('No election selected');
      return;
    }

    await addVoter(parseInt(id), voterAddress);
    setVoterAddress('');
  };

  // Filter elections for the tabs
  const pendingElections = elections.filter(e => e.status === 'PENDING');
  const activeElections = elections.filter(e => e.status === 'ACTIVE');
  const completedElections = elections.filter(e => e.status === 'ENDED');

  // If viewing a specific election
  const currentElection = id ? elections.find(e => e.id === parseInt(id)) : null;

  if (!account || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 mx-auto animate-spin text-gray-400" />
          <p className="mt-4 text-gray-500">Authenticating...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="votex-container flex justify-between items-center">
          <div className="flex items-center space-x-4">
            {id && (
              <Button variant="ghost" size="sm" onClick={() => navigate('/admin')}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            <h1 
              className="text-2xl font-bold text-votex-primary cursor-pointer"
              onClick={() => navigate('/')}>
              VoteX Admin
            </h1>
          </div>
          <WalletConnection />
        </div>
      </header>

      <main className="votex-container py-8">
        {currentElection ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-card">
                <h2 className="text-2xl font-bold mb-4">{currentElection.title}</h2>
                <p className="text-gray-600 mb-6">{currentElection.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="text-sm text-gray-500 mb-1">Start Time</h4>
                    <p>{new Date(currentElection.startTime).toLocaleString()}</p>
                  </div>
                  <div>
                    <h4 className="text-sm text-gray-500 mb-1">End Time</h4>
                    <p>{new Date(currentElection.endTime).toLocaleString()}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Candidates</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {currentElection.candidates.map((candidate) => (
                      <div key={candidate.id} className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-medium">{candidate.name}</h4>
                        {candidate.party && <p className="text-sm text-gray-500">{candidate.party}</p>}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-3">Voters</h3>
                  {currentElection.voters.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {currentElection.voters.map((voter, index) => (
                        <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
                          <div className="font-mono">{voter.address.substring(0, 10)}...{voter.address.substring(38)}</div>
                          <div className="text-xs text-gray-500">{voter.hasVoted ? 'Has voted' : 'Not voted yet'}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No voters registered yet</p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-card">
                <h3 className="text-lg font-medium mb-4">Election Management</h3>
                
                <div className="space-y-4">
                  {currentElection.status === 'PENDING' && (
                    <Button className="w-full" disabled={loading}>
                      Start Voting
                    </Button>
                  )}
                  
                  {currentElection.status === 'ACTIVE' && (
                    <Button className="w-full" variant="destructive" disabled={loading}>
                      End Voting
                    </Button>
                  )}
                  
                  <Button className="w-full" variant="outline" onClick={() => navigate('/results/' + id)}>
                    View Results
                  </Button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-card">
                <h3 className="text-lg font-medium mb-4">Add Voter</h3>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="voterAddress">Ethereum Address</Label>
                    <Input 
                      id="voterAddress" 
                      placeholder="0x..." 
                      value={voterAddress}
                      onChange={(e) => setVoterAddress(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={handleAddVoter}
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <UserPlus className="h-4 w-4 mr-2" />
                    )}
                    Add Voter
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="active" className="animate-fade-in">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="pending">Pending ({pendingElections.length})</TabsTrigger>
                  <TabsTrigger value="active">Active ({activeElections.length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({completedElections.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="pending" className="space-y-4">
                  {pendingElections.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {pendingElections.map((election) => (
                        <ElectionCard key={election.id} election={election} isAdmin={true} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No pending elections</p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => document.getElementById('create-election')?.scrollIntoView({ behavior: 'smooth' })}
                      >
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Create New Election
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="active" className="space-y-4">
                  {activeElections.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {activeElections.map((election) => (
                        <ElectionCard key={election.id} election={election} isAdmin={true} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No active elections</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="completed" className="space-y-4">
                  {completedElections.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {completedElections.map((election) => (
                        <ElectionCard key={election.id} election={election} isAdmin={true} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No completed elections</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
            
            <div id="create-election">
              <ElectionForm />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
