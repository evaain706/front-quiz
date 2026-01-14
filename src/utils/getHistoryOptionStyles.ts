export const getTopicColor = (topic: string = ''): string => {
  if (topic.includes('React')) return 'text-blue-500';
  if (topic.includes('TypeScript')) return 'text-sky-300';
  if (topic.includes('JavaScript')) return 'text-yellow-500';
  if (topic.includes('CSS')) return 'text-pink-500';

  return 'text-white/80';
};

export const getLevelColor = (level: string = ''): string => {
  if (level === '쉬움') {
    return 'text-green-300';
  } else if (level === '보통') {
    return 'text-yellow-300';
  } else {
    return 'text-red-600';
  }
};
