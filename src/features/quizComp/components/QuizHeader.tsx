import { useOptionStore } from '@/store/useOptionStore';

const QuizHeader = () => {
  const category = useOptionStore((s) => s.category);
  return (
    <h2 className='text-[3rem] font-bold text-white md:text-[5rem]'>
      {category}
    </h2>
  );
};

export default QuizHeader;
