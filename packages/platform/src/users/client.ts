import { API_CONFIG } from '../constants';
import type { User, CreateUserInput, UpdateUserParams, FindUniqueUserInput, DeleteUserInput, UsersResponse, FindManyUsersInput } from '../types/users';

export class UsersClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private getHeaders(): Record<string, string> {
    return {
      'X-API-KEY': this.apiKey,
      'Content-Type': 'application/json',
    };
  }

  async create(input: CreateUserInput): Promise<User> {
    const url = new URL(API_CONFIG.BASE_URL, API_CONFIG.ENDPOINTS.USERS);

    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create user');
    }

    const data = await response.json();
    return this.parseUser(data);
  }

  async findMany(input: FindManyUsersInput): Promise<User[]> {
    const url = new URL(API_CONFIG.BASE_URL, API_CONFIG.ENDPOINTS.USERS);

    Object.entries(input).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch users');
    }

    const data = (await response.json()) as UsersResponse;
    return data.data.map((user) =>
      this.parseUser(user as unknown as Record<string, unknown>)
    );
  }

  async findUnique(input: FindUniqueUserInput): Promise<User | null> {
    const url = new URL(
      `${API_CONFIG.ENDPOINTS.USERS}/${encodeURIComponent(input.id)}`,
      API_CONFIG.BASE_URL
    );

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: this.getHeaders(),
    });

    if (response.status === 404) {
      return null;
    }

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch user');
    }

    const data = await response.json();
    return this.parseUser(data);
  }

  async update(params: UpdateUserParams): Promise<User> {
    const url = new URL(
      `${API_CONFIG.ENDPOINTS.USERS}/${encodeURIComponent(params.id)}`,
      API_CONFIG.BASE_URL
    );

    const response = await fetch(url.toString(), {
      method: 'PATCH',
      headers: this.getHeaders(),
      body: JSON.stringify(params.data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update user');
    }

    const data = await response.json();
    return this.parseUser(data);
  }

  async delete(input: DeleteUserInput): Promise<void> {
    const url = new URL(
      `${API_CONFIG.ENDPOINTS.USERS}/${encodeURIComponent(input.id)}`,
      API_CONFIG.BASE_URL
    );

    const response = await fetch(url.toString(), {
      method: 'DELETE',
      headers: this.getHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete user');
    }
  }

  private parseUser(data: Record<string, unknown>): User {
    return {
      id: String(data.id),
      email: String(data.email),
      firstName: String(data.firstName),
      lastName: String(data.lastName),
      password: data.password ? String(data.password) : null,
      createdAt: new Date(String(data.createdAt)),
      updatedAt: new Date(String(data.updatedAt)),
    };
  }
}

export const createUsersClient = (apiKey: string): UsersClient => {
  return new UsersClient(apiKey);
};
