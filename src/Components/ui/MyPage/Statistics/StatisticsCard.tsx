import { cn } from '../../../../utils/cn';

interface StatisticCardProps {
  label: string;
  value: number | string;
  className?: string;
}

const StatisticCard = ({ label, value, className }: StatisticCardProps) => {
  return (
    <div className='rounded-xl bg-gray-800 px-10 text-center text-[2rem] shadow-md'>
      <p className={cn('text-gray-400', className)}>{label}</p>
      <p className='font-bold'>{value}</p>
    </div>
  );
};

export default StatisticCard;
