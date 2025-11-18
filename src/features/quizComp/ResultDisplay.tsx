const ResultDisplay = ({
  explanation,
  isCorrect,
}: {
  explanation: string;
  isCorrect: boolean;
}) => {
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
    </div>
  );
};

export default ResultDisplay;
