import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';
import { Task } from '../types';

export const useTasks = (todayOnly = false) =>
  useQuery<Task[]>({
    queryKey: ['tasks', todayOnly],
    queryFn: async () => {
      const response = await api.get<Task[]>(`/tasks?today=${todayOnly}`);
      return response.data;
    }
  });

export const useCompleteTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.patch<Task>(`/tasks/${id}/complete`);
      return response.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] })
  });
};
