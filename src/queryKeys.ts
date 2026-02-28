export const queryKeys = {
  quiz: {
    all: ['quiz'] as const,
    generate: (category: string, level: string) =>
      [...queryKeys.quiz.all, 'generate', { category, level }] as const,
  },

  community: {
    all: ['post'] as const,

    list: (params: {
      page: number;
      category: string | null;
      search: string | undefined;
    }) =>
      [
        ...queryKeys.community.all,
        'list',
        {
          page: params.page,
          category: params.category,
          search: params.search,
        },
      ] as const,

    detail: (postId: string | undefined) =>
      [...queryKeys.community.all, postId] as const,
  },

  incorrectAnswer: {
    all: ['incorrectAnswer'] as const,

    list: (filters: { category: string; level: string }) =>
      [
        ...queryKeys.incorrectAnswer.all,
        'list',
        {
          category: filters.category,
          level: filters.level,
        },
      ] as const,
  },

  statistics: {
    all: ['statistics'] as const,
  },
} as const;
