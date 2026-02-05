import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { useOptionStore } from '@/store/useOptionStore';
import { categorylist } from '@/constants/categoryList';
import { motion } from 'motion/react';

import { cn } from '@/utils/cn';

const OptionSelect = () => {
  const [step, setStep] = useState(0);

  const category = useOptionStore((s) => s.category);
  const setCategory = useOptionStore((s) => s.setCategory);
  const setLevel = useOptionStore((s) => s.setLevel);
  const resetCategory = useOptionStore((s) => s.resetCategory);
  const resetLevel = useOptionStore((s) => s.resetLevel);

  const navigate = useNavigate();

  useEffect(() => {
    resetCategory();
    resetLevel();
    setStep(0);
  }, []);

  const handleCategorySelect = (selectedCat: string) => {
    if (category === selectedCat) {
      setCategory('');
    } else {
      setCategory(selectedCat);
    }
  };

  const handleLevelSelect = (level: string) => {
    setLevel(level);
    navigate('/quiz');
  };

  useEffect(() => {
    if (step === 1 && !category) {
      setStep(0);
    }
  }, [step, category]);

  const selectedCategory = categorylist.find((cat) => cat.text === category);

  const SelectedIcon = selectedCategory?.icon;
  const SelectedIconColor = selectedCategory?.color;

  return (
    <div className='flex min-h-content w-full flex-col items-center justify-center gap-10 p-4 md:gap-14 md:p-8'>
      {step === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className='w-full text-center'
        >
          <h2 className='mb-8 text-[2rem] font-bold text-white md:text-[4rem]'>
            주제를 선택해주세요
          </h2>
          <div className='grid max-h-[80rem] w-full grid-cols-2 gap-5 overflow-auto p-5 md:grid-cols-3 lg:grid-cols-5'>
            {categorylist.map((cat) => (
              <Card
                key={cat.id}
                text={cat.text}
                isSelected={category === cat.text}
                className={cat.color}
                onClick={() => handleCategorySelect(cat.text)}
                icon={cat.icon}
              />
            ))}
          </div>
        </motion.div>
      )}

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className='flex w-full flex-col items-center justify-center gap-5 text-center'
        >
          <div className='flex items-center justify-center gap-5 rounded-xl bg-gray-900 px-6 py-6'>
            {SelectedIcon && (
              <div
                className={cn(
                  'mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br text-white',
                  SelectedIconColor,
                )}
              >
                <SelectedIcon />
              </div>
            )}
            <h2 className='mb-2 text-[2rem] font-bold text-white md:text-[3rem]'>
              {category}
            </h2>
          </div>

          <h2 className='mb-8 text-[1.6rem] font-bold text-white md:text-[4rem]'>
            난이도를 선택해주세요
          </h2>
          <div className='flex flex-col justify-center gap-4 md:flex-row'>
            <Button
              size='md'
              className='bg-amber-400 py-10 text-[2rem] font-bold text-white hover:bg-amber-300'
              onClick={() => handleLevelSelect('쉬움')}
            >
              EASY
            </Button>
            <Button
              size='md'
              className='bg-green-400 py-10 text-[2rem] font-bold text-white hover:bg-green-300'
              onClick={() => handleLevelSelect('보통')}
            >
              MEDIUM
            </Button>
            <Button
              size='md'
              className='bg-red-400 py-10 text-[2rem] font-bold text-white hover:bg-red-300'
              onClick={() => handleLevelSelect('어려움')}
            >
              HARD
            </Button>
          </div>
        </motion.div>
      )}

      {step === 0 ? (
        <Button
          variant='primary'
          size='md'
          disabled={!category}
          className='fixed bottom-5'
          onClick={() => setStep(1)}
        >
          난이도 선택하기
        </Button>
      ) : (
        <div>
          <Button variant='primary' size='md' onClick={() => setStep(0)}>
            주제 다시 선택하기
          </Button>
        </div>
      )}
    </div>
  );
};

export default OptionSelect;
