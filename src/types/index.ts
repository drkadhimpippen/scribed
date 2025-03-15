export interface Patient {
  id: string;
  name: string;
  birthDate: string;
  gender: string;
}

export interface Encounter {
  id: string;
  status: 'planned' | 'in-progress' | 'finished' | 'cancelled';
  patientId: string;
  startTime: string;
  endTime?: string;
}

export interface AudioEncounter extends Encounter {
  audioUrl?: string;
  transcription?: string;
  note?: string;
}

export interface User {
  id: string;
  name: string;
  role: 'provider' | 'staff';
} 