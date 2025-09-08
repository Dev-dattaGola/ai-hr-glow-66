
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getStorageData, addToStorage } from '@/lib/localStorage';
import { initializeMockData } from '@/lib/mockData';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  type: string;
  priority: string;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export const useAnnouncements = () => {
  return useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      initializeMockData();
      return getStorageData<Announcement>('announcements');
    },
  });
};

export const useCreateAnnouncement = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (announcementData: Omit<Announcement, 'id' | 'created_at' | 'updated_at'>) => {
      const newAnnouncement = addToStorage<Announcement>('announcements', announcementData);
      return newAnnouncement;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      toast.success('Announcement created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create announcement: ${error.message}`);
    },
  });
};
