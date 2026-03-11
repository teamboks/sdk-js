import { PaginatedRequest } from '../pagination';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserInput {
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
}

export interface UpdateUserInput {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
}

export interface FindUniqueUserInput {
  id: string;
}

export interface FindManyUsersInput extends PaginatedRequest { }

export interface UpdateUserParams {
  id: string;
  data: UpdateUserInput;
}

export interface DeleteUserInput {
  id: string;
}

export interface UsersResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}
