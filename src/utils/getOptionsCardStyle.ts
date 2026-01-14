interface OptionCardStyleProps {
  isSubmitted: boolean;
  isCorrect: boolean;
  isSelected: boolean;
}

export const getOptionsCardStyle = ({
  isSubmitted,
  isCorrect,
  isSelected,
}: OptionCardStyleProps): string => {
  if (isSubmitted) {
    if (isCorrect) {
      return 'border-emerald-400 bg-emerald-600 ring-2 ring-emerald-400/20';
    }
    if (isSelected) {
      return 'border-rose-400 bg-rose-600 ring-2 ring-rose-400/20';
    }
    return 'border-gray-100 bg-gray-50/50 opacity-60';
  }

  if (isSelected) {
    return 'border-blue-400 bg-blue-50 ring-2 bg-white/60 ring-blue-400/20';
  }

  return 'border-gray-200 bg-white/20 hover:border-blue-300 hover:bg-blue-50/30 hover:shadow-md';
};
