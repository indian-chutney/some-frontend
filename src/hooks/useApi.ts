import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  apiService, 
  ThanosHpResponse, 
  TasksInfoResponse, 
  LeaderboardResponse, 
  UserGraphResponse, 
  UserInfoResponse,
  RoleRequest 
} from '../services/api';

// Query keys for consistent caching
export const QUERY_KEYS = {
  THANOS_HP: 'thanos-hp',
  TASKS_INFO: 'tasks-info',
  LEADERBOARD: 'leaderboard',
  USER_GRAPH: 'user-graph',
  USER_INFO: 'user-info',
} as const;

// Thanos HP hook
export const useThanosHp = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.THANOS_HP],
    queryFn: async () => {
      const response = await apiService.get<ThanosHpResponse>('/thanos-hp');
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every minute
  });
};

// Tasks info hook
export const useTasksInfo = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.TASKS_INFO],
    queryFn: async () => {
      const response = await apiService.get<TasksInfoResponse>('/tasks-info');
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    staleTime: 30000, // 30 seconds
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

// Leaderboard hook
export const useLeaderboard = (
  data: 'today' | 'week' | 'this_month' | 'all_time',
  type: 'individual' | 'team'
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.LEADERBOARD, data, type],
    queryFn: async () => {
      const response = await apiService.get<LeaderboardResponse>(
        `/leaderboard?data=${data}&type=${type}`
      );
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    staleTime: 60000, // 1 minute
    refetchInterval: 300000, // Refetch every 5 minutes
  });
};

// User graph hook
export const useUserGraph = (data: 'week' | '30days' | 'all_time') => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_GRAPH, data],
    queryFn: async () => {
      const response = await apiService.get<UserGraphResponse>(
        `/user-graph?data=${data}`
      );
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    staleTime: 300000, // 5 minutes
    refetchInterval: 600000, // Refetch every 10 minutes
  });
};

// User info hook
export const useUserInfo = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.USER_INFO],
    queryFn: async () => {
      const response = await apiService.get<UserInfoResponse>('/user-info');
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    staleTime: 600000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};

// Role mutation hook
export const useSetRole = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (role: string) => {
      const response = await apiService.post<{ success: boolean }>('/role', { role });
      if (response.error) {
        throw new Error(response.error);
      }
      return response.data;
    },
    onSuccess: () => {
      // Invalidate user info to refetch updated role
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_INFO] });
    },
  });
};

// Error handling hook for consistent error display
export const useApiError = (error: Error | null) => {
  if (!error) return null;
  
  // You can customize error handling here
  const message = error.message;
  
  // Check for specific error types
  if (message.includes('HTTP 401')) {
    return 'Authentication failed. Please log in again.';
  }
  
  if (message.includes('HTTP 403')) {
    return 'You do not have permission to access this resource.';
  }
  
  if (message.includes('HTTP 404')) {
    return 'The requested resource was not found.';
  }
  
  if (message.includes('HTTP 500')) {
    return 'Server error. Please try again later.';
  }
  
  if (message.includes('Failed to fetch')) {
    return 'Network error. Please check your connection.';
  }
  
  return message || 'An unexpected error occurred.';
};