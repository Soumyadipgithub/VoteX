
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useWeb3 } from '@/context/Web3Context';
import { PlusCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CandidateInput {
  name: string;
  party: string;
}

const ElectionForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [candidates, setCandidates] = useState<CandidateInput[]>([
    { name: '', party: '' },
    { name: '', party: '' },
    { name: '', party: '' },
    { name: '', party: '' }
  ]);
  
  const { createElection, loading } = useWeb3();

  const handleCandidateChange = (index: number, field: keyof CandidateInput, value: string) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index] = { ...updatedCandidates[index], [field]: value };
    setCandidates(updatedCandidates);
  };

  const addCandidate = () => {
    setCandidates([...candidates, { name: '', party: '' }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!title || !description || !startTime || !endTime) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const startTimeDate = new Date(startTime).getTime();
    const endTimeDate = new Date(endTime).getTime();
    
    if (endTimeDate <= startTimeDate) {
      toast.error('End time must be after start time');
      return;
    }
    
    // Filter out empty candidates
    const filteredCandidates = candidates.filter(c => c.name.trim() !== '');
    
    if (filteredCandidates.length < 2) {
      toast.error('Please add at least two candidates');
      return;
    }
    
    // Create election
    await createElection({
      title,
      description,
      startTime: startTimeDate,
      endTime: endTimeDate,
      candidates: filteredCandidates.map((c, index) => ({
        id: index + 1,
        name: c.name,
        party: c.party,
        votes: 0
      }))
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setStartTime('');
    setEndTime('');
    setCandidates([
      { name: '', party: '' },
      { name: '', party: '' },
      { name: '', party: '' },
      { name: '', party: '' }
    ]);
  };

  return (
    <Card className="glass-card shadow-card animate-fade-in">
      <CardHeader>
        <CardTitle>Create New Election</CardTitle>
        <CardDescription>Set up a new election with candidates and timing</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Election Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter election title"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter election description"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="datetime-local"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="datetime-local"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Candidates</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addCandidate}
                className="text-votex-primary"
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Add Candidate
              </Button>
            </div>
            
            {candidates.map((candidate, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 border border-gray-200 rounded-lg">
                <div className="space-y-2">
                  <Label htmlFor={`candidate-name-${index}`}>Name</Label>
                  <Input
                    id={`candidate-name-${index}`}
                    value={candidate.name}
                    onChange={(e) => handleCandidateChange(index, 'name', e.target.value)}
                    placeholder="Candidate name"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor={`candidate-party-${index}`}>Party/Affiliation</Label>
                  <Input
                    id={`candidate-party-${index}`}
                    value={candidate.party}
                    onChange={(e) => handleCandidateChange(index, 'party', e.target.value)}
                    placeholder="Party or affiliation (optional)"
                  />
                </div>
              </div>
            ))}
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleSubmit} 
          disabled={loading}
          className="w-full bg-votex-primary hover:bg-votex-primary/90 text-white"
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Election...
            </span>
          ) : (
            'Create Election'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ElectionForm;
