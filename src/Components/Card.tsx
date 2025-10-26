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
      className={`cursor-pointer rounded-lg p-4 py-[4rem] transition-all ${
        isSelected
          ? 'animate-pulse bg-blue-500 text-white ring-2 ring-blue-500'
          : 'bg-gray-400 hover:bg-gray-300'
      }`}
    >
      <div className='flex flex-col items-center justify-center'>
        <h2 className='text-[1.2rem] font-bold md:text-[1.6rem]'>{text}</h2>
      </div>
    </div>
  );
};

export default React.memo(Card);
