export interface LoginInterface {
  email: string;
  password: string;
}

export interface UserInterface {
  id?: string;
  name: string;
  role?: string;
  surname: string;
  updatedAt?: string;
  createdAt?: string;
  email: string;
  password?: string;
  phone?: string;
  profile?: string;
  profileData?: ProfileDataInterface;
}

export interface EnumsInterface{
  __typename: string; 
  name: string;
}

export interface InviteUserInterface{
  email: string; 
  name: string;
  userRole: string;
}

export interface SortInterface{
  sortOrder: 'ASC' | 'DESC'; 
  field: string;
}

export interface PaginationInterface{
  limit: number; 
  offset: number;
}

export interface UsersResult {
  usersData?: UserInterface[];
  usersLoading: boolean;
  usersError?: Error;
  updatePagination: (pagination: PaginationInterface) => void;
  updateSort: (sort: SortInterface) => void;
  currentSortOrder: string;
}

export interface ProfileDataInterface {
  companyName?: string;
  companyUrl?: string;

  school?: string;
  degree?: string;
  subject?: string;

  googleScholar?: string;
  orchid?: string;
  researchGate?: string;
  linkedin?: string;

  govern?: string;
  institution?: string;

  govern_type?: string;
  govern_institution?: string;
}