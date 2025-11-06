'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

const items = [
  { color: 'bg-amber-300', label: '마이페이지', path: '/mypage' },
  { color: 'bg-red-300', label: '퀴즈', path: '/select' },
  { color: 'bg-blue-300', label: '커뮤니티', path: '/community' },
  { color: 'bg-green-300', label: '도움말 보기', path: '/help' },
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
    <div className='perspective mx-auto grid w-[100vw] max-w-[80rem] grid-cols-2 gap-3 p-5 sm:w-[50vw]'>
      {items.map((item, i) => (
        <motion.div
          key={i}
          className='relative aspect-square cursor-pointer rounded-xl'
          onClick={() => handleClick(i, item.path)}
        >
          <motion.div
            className='absolute inset-0 rounded-xl'
            animate={{ rotateY: flipped === i ? 180 : 0 }}
            transition={{ duration: 1.0 }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div
              className={`absolute inset-0 ${item.color} flex items-center justify-center rounded-xl backface-hidden`}
            >
              <p className='text-[2.4rem] font-bold text-white'>{item.label}</p>
            </div>

            <div className='absolute inset-0 flex rotate-y-180 items-center justify-center rounded-xl bg-slate-200 text-white backface-hidden'>
              <p className='text-[1.6rem] font-bold text-black'>{item.label}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default MainMenu;
