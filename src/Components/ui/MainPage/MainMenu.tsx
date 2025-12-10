'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const items = [
  {
    color: 'bg-amber-300',
    label: '마이페이지',
    path: '/mypage',
    desc: '내정보수정,문제통계,오답문제에 저장한 문제 확인',
  },
  {
    color: 'bg-red-300',
    label: '퀴즈',
    path: '/select',
    desc: '프론트엔드관련 토픽/난이도를 선택해 문제 풀어보기',
  },
  {
    color: 'bg-blue-300',
    label: '커뮤니티',
    path: '/community',
    desc: '질문/정보등을 올릴수있는 커뮤니티',
  },
];

const MainMenu = () => {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState<number | null>(null);

  const handleClick = (i: number, path: string) => {
    if (flipped === i) {
      navigate(path);
    } else {
      setFlipped(i);
    }
  };

  return (
    <div className='flex w-full flex-col items-center justify-center gap-3 p-4 md:p-1'>
      <div className='flex flex-col items-center gap-3 md:mb-8'>
        <CircleItem
          item={items[0]}
          i={0}
          flipped={flipped}
          onClick={handleClick}
        />
      </div>

      <div className='flex flex-col gap-3 md:flex-row md:gap-12 lg:gap-12'>
        <CircleItem
          item={items[1]}
          i={1}
          flipped={flipped}
          onClick={handleClick}
        />
        <CircleItem
          item={items[2]}
          i={2}
          flipped={flipped}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default MainMenu;

const CircleItem = ({
  item,
  i,
  flipped,
  onClick,
}: {
  item: any;
  i: number;
  flipped: number | null;
  onClick: (i: number, path: string) => void;
}) => {
  return (
    <motion.div
      className='relative aspect-square w-[18rem] cursor-pointer md:w-[30rem] lg:w-[40rem]'
      onClick={() => onClick(i, item.path)}
    >
      <motion.div
        className='absolute inset-0 rounded-full'
        animate={{ rotateY: flipped === i ? 180 : 0 }}
        transition={{ duration: 1.0 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className={`absolute inset-0 ${item.color} flex items-center justify-center rounded-full backface-hidden`}
        >
          <p className='text-[2rem] font-bold text-white md:text-[3rem]'>
            {item.label}
          </p>
        </div>

        <div className='absolute inset-0 flex rotate-y-180 flex-col items-center justify-center gap-2 rounded-full bg-slate-200 px-4 backface-hidden'>
          <p className='text-[1.6rem] font-bold text-black md:text-[1.8rem]'>
            {item.label}
          </p>
          <p className='text-center text-[1.4rem] font-bold text-black opacity-70 md:text-[1.6rem]'>
            {item.desc}
          </p>
          <p className='mt-2 font-semibold text-blue-500 md:text-[1.6rem]'>
            다시 클릭해서 이동 →
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};
