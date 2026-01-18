import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface CardProps {
  text: string;
  onClick?: () => void;
  isSelected?: boolean;
  className?: string;
  icon: LucideIcon;
}

const Card = ({ text, onClick, isSelected, className, icon }: CardProps) => {
  const Icon = icon;
  return (
    <div
      onClick={onClick}
      className={`flex max-h-[14rem] cursor-pointer items-center justify-center rounded-lg px-2 py-[3rem] transition-all md:py-[5rem] ${
        isSelected
          ? 'animate-pulse bg-gray-600 ring-1 ring-blue-500'
          : 'bg-gray-900'
      }`}
    >
      <div className='group flex flex-col items-center justify-center gap-5'>
        <div
          className={`flex h-20 w-20 items-center justify-center rounded-lg bg-gradient-to-br ${className} shadow-lg transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className='h-12 w-12 text-white' />
        </div>
        <p className='text-foreground text-center text-[1.4rem] font-bold text-white md:text-[2rem]'>
          {text}
        </p>
      </div>
    </div>
  );
};

export default React.memo(Card);
