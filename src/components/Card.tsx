import React from 'react';

interface CardProps {
  text: string;
  onClick?: () => void;
  isSelected?: boolean;
}

const Card = ({ text, onClick, isSelected }: CardProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex max-h-[4rem] cursor-pointer items-center justify-center rounded-lg p-4 py-[3rem] transition-all md:py-[4rem] ${
        isSelected
          ? 'animate-pulse bg-blue-500/20 text-white ring-1 ring-blue-500'
          : 'bg-white/20 hover:bg-gray-300'
      }`}
    >
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-[1.2rem] font-bold text-white md:text-[1.6rem]'>
          {text}
        </h2>
      </div>
    </div>
  );
};

export default React.memo(Card);
