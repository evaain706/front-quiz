import { useEffect, useState } from 'react';
import Fun from '../../components/Fun/Fun';

const ResultDisplay = ({
  explanation,
  isCorrect,
}: {
  explanation: string;
  isCorrect: boolean;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showFun, setShowFun] = useState(false);

  useEffect(() => {
    if (isCorrect) {
      const audio = new Audio('/passo.mp3'); 
      setIsPlaying(true);
      audio.play();

      audio.onended = () => setIsPlaying(false);

      const showTimer = setTimeout(() => {
        setShowFun(true);
      }, 6600);

      const hideTimer = setTimeout(() => {
        setShowFun(false);
      }, 10000);

      return () => {
        clearTimeout(showTimer);
        clearTimeout(hideTimer);
        audio.pause();
        audio.currentTime = 0;
        setShowFun(false);
      };
    } else {
      setShowFun(false);
    }
  }, [isCorrect]);

  return (
    <div className='mt-6 w-full rounded-md border-gray-300 bg-gray-50 p-4'>
      <h3
        className={`mb-2 text-[1.6rem] font-bold ${
          isCorrect ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {isCorrect ? '정답' : '오답'}
      </h3>
      <p className='whitespace-wrap font-bold text-gray-700'>{explanation}</p>

      {showFun && <Fun />}
    </div>
  );
};

export default ResultDisplay;
