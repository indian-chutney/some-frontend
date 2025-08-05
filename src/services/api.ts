// Backend API service layer
const API_BASE_URL = 'http://localhost:3000/api/v1';

interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

class ApiService {
  private getAuthToken(): string | null {
    return localStorage.getItem('token');
  }

  private getHeaders(): Headers {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const token = this.getAuthToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      // Ensure endpoint doesn't start with /api/v1 to avoid duplication
      const cleanEndpoint = endpoint.startsWith('/api/v1') 
        ? endpoint.replace('/api/v1', '') 
        : endpoint;
      
      const url = `${API_BASE_URL}${cleanEndpoint}`;
      
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      const status = response.status;

      if (!response.ok) {
        throw new Error(`HTTP ${status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { data, status };
    } catch (error) {
      console.error('API request failed:', error);
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
        status: 500,
      };
    }
  }

  // GET request
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  // POST request
  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // PUT request
  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  // DELETE request
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiService = new ApiService();

// Type definitions for API responses
export interface ThanosHpResponse {
  hp: number;
  total_hp: number;
}

export interface TasksInfoResponse {
  today: number;
  week: number;
  month: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  change: string;
  avatar?: string;
}

export interface LeaderboardResponse {
  entries: LeaderboardEntry[];
}

export interface UserGraphResponse {
  data: Array<{
    date: string;
    tasks: number;
    productivity: number;
    focus: number;
  }>;
}

export interface UserInfoResponse {
  username: string;
  role: string;
}

export interface RoleRequest {
  role: string;
}