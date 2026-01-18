import { type LucideIcon } from 'lucide-react';
import { ChevronRight } from 'lucide-react';

interface MyPageCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
}

const MyPageCard = ({ icon, title, description, onClick }: MyPageCardProps) => {
  const Icon = icon;
  return (
    <div
      onClick={onClick}
      className='group flex w-full max-w-[50rem] cursor-pointer items-center justify-between rounded-md border border-white/10 bg-[#0b0a1f] p-4 transition-colors hover:border-white/25 hover:bg-[#121033]'
    >
      <div
        className={`flex h-20 w-20 items-center justify-center rounded-lg bg-white/10 shadow-lg transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className='h-12 w-12 text-white' />
      </div>
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-[2rem] font-bold md:text-[3rem]'>{title}</h2>
        <p className='text-[1.6rem] font-bold md:text-[2rem]'>{description}</p>
      </div>
      <ChevronRight className='text-muted-foreground group-hover:text-primary h-10 w-10 transition-transform group-hover:translate-x-1' />
    </div>
  );
};

export default MyPageCard;
