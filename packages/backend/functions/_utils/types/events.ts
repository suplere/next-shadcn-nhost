export type EventResponse = {
  message: string;
  status: number;
};

type EventParticipant = {
  name: string;
  status: string;
  description: string;
};

export type EventParticipants = { [key: string]: EventParticipant };
