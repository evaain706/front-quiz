import { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { useOptionStore } from '../store/useOptionStore';
import { categorylist } from '../constants/categoryList';

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
  }, [resetCategory, resetLevel]);

  const handleCategorySelect = useCallback(
    (selectedCat: string) => {
      if (category === selectedCat) {
        setCategory('');
      } else {
        setCategory(selectedCat);
      }
    },
    [setCategory],
  );

  const handleLevelSelect = useCallback(
    (level: string) => {
      setLevel(level);
      navigate('/quiz');
    },
    [setLevel, navigate],
  );

  return (
    <div className='flex w-full flex-col items-center justify-center gap-10 p-4 md:gap-16 md:p-8'>
      {step === 0 && (
        <div className='w-full text-center'>
          <h2 className='mb-8 text-2xl font-bold text-white md:text-[4rem]'>
            주제를 선택해주세요
          </h2>
          <div className='grid max-h-[50rem] w-full grid-cols-2 gap-4 overflow-auto md:h-full md:grid-cols-3 lg:grid-cols-4'>
            {categorylist.map((cat) => (
              <Card
                key={cat.id}
                text={cat.text}
                isSelected={category === cat.text}
                onClick={() => handleCategorySelect(cat.text)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className='flex w-full flex-col items-center justify-center text-center'>
          <h2 className='mb-2 text-2xl font-bold text-white md:text-3xl'>
            주제: {category}
          </h2>
          <h3 className='mb-8 text-xl text-white md:text-2xl'>
            난이도를 선택해주세요
          </h3>
          <div className='flex flex-col justify-center gap-4 md:flex-row'>
            <Button
              size='md'
              className='bg-amber-100 font-bold text-black'
              onClick={() => handleLevelSelect('쉬움')}
            >
              쉬움
            </Button>
            <Button
              size='md'
              className='bg-green-200 font-bold text-black'
              onClick={() => handleLevelSelect('보통')}
            >
              보통
            </Button>
            <Button
              size='md'
              className='bg-red-400 font-bold text-black'
              onClick={() => handleLevelSelect('어려움')}
            >
              어려움
            </Button>
          </div>
        </div>
      )}

      {step === 0 ? (
        <Button
          variant='primary'
          size='md'
          disabled={!category}
          onClick={() => setStep(1)}
        >
          난이도 선택하기
        </Button>
      ) : (
        <div>
          <Button variant='secondary' size='md' onClick={() => setStep(0)}>
            뒤로 가기
          </Button>
        </div>
      )}
    </div>
  );
};

export default OptionSelect;
