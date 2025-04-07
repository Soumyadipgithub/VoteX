
export interface Candidate {
  id: number;
  name: string;
  party?: string;
  votes: number;
}

export interface Voter {
  address: string;
  hasVoted: boolean;
}

export enum ElectionStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  ENDED = "ENDED"
}

export interface Election {
  id: number;
  title: string;
  description: string;
  startTime: number; // timestamp
  endTime: number; // timestamp
  status: ElectionStatus;
  candidates: Candidate[];
  voters: Voter[];
  createdBy: string; // admin address
}

export interface AdminCredentials {
  username: string;
  password: string;
}
