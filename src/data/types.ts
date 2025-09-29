export interface Program {
  code: string;
  name: string;
  type: string;
  department: string;
  term: string;
  startDate: string;
  endDate: string;
  fees: {
    domestic: string;
    international: string;
  };
  description: string;
}

export interface Course {
  code: string;
  name: string;
  term: string;
  startDate: string;
  endDate: string;
  description: string;
}