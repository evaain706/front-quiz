

const ResultDisplay = ({ explanation, isCorrect } : {explanation:string,isCorrect:boolean}) => {
  return (
    <div className="mt-6 p-4 rounded-md  bg-gray-50 border-gray-300 w-full">
      <h3 className={`text-[1.6rem] font-bold mb-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
        {isCorrect ? '정답' : '오답'}
      </h3>
      <p className="text-gray-700 whitespace-wrap font-bold">{explanation}</p>
    </div>
  )
}

export default ResultDisplay;