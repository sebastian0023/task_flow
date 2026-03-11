import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/client';

export const useTasks = (todayOnly = false) =>
  useQuery({
    queryKey: ['tasks', todayOnly],
    queryFn: async () => (await api.get(`/tasks?today=${todayOnly}`)).data
  });

export const useCompleteTask = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => (await api.patch(`/tasks/${id}/complete`)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['tasks'] })
  });
};
