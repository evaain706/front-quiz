import { instance } from '@/apis/instance';

export const useCommunity = () => {
  const fetchPosts = async (
    page: number,
    limit: number = 5,
    category?: string,
    search?: string,
  ) => {
    const query = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (category) {
      query.append('category', category);
    }

    if (search) {
      query.append('search', search);
    }

    const response = await instance.get(`/api/community/getPost?${query}`);
    return response.data;
  };

  return {
    fetchPosts,
  };
};
