import { useQuizStore } from "../../store/useQuizStore"
import ResultDisplay from "./ResultDisplay"
import React from "react"


const OptionsCard = () => {
 
  const { quiz, userAnswer, setUserAnswer, result } = useQuizStore()

  if(!quiz){
    return(
       <div className="md:w-[70rem] lg:w-[90rem] min-h-[15rem] mb-8 mt-8">
      <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
      
        <div className="space-y-3 animate-pulse">
         
          {[...Array(4)].map((_, index) => (
           
            <div
              key={index}
              className="flex items-center gap-4 p-4 rounded-lg border-2 border-gray-200"
            >
            
              <div className="w-6 h-6 bg-gray-300 rounded-full flex-shrink-0"></div>
              
          
              <div className="h-5 bg-gray-300 rounded w-4/5"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
    )
  }

  
  

 
  const isSubmitted = !!result;

  return (
    <div className="md:w-[70rem] lg:w-[90rem] min-h-[15rem] mb-8 mt-8">
      <div className="bg-white border border-gray-200 rounded-md p-6 shadow-sm">
        <div className="space-y-3">
          {Object.entries(quiz.options).map(([key, value]) => {
            
         
            const isCorrectAnswer = key === quiz.answer;
            const isSelectedAnswer = key === userAnswer;

            let optionStyles = '';
            
            if (isSubmitted) {
            
              if (isCorrectAnswer) {
              
                optionStyles = 'border-green-500 bg-green-50 text-green-800';
              } else if (isSelectedAnswer) {
              
                optionStyles = 'border-red-500 bg-red-50 text-red-800';
              } else {
              
                optionStyles = 'border-gray-200 bg-gray-50 text-gray-500';
              }
            } else {
            
              if (isSelectedAnswer) {
              
                optionStyles = 'border-blue-500 bg-blue-50';
              } else {
              
                optionStyles = 'border-gray-300 hover:border-blue-400 hover:bg-gray-50';
              }
            }

            return (
              <label
                key={key}
                className={`flex items-center gap-4 p-4 rounded-lg border-2 transition-all duration-200
                  ${optionStyles} 
                  ${isSubmitted ? 'cursor-default' : 'cursor-pointer'}
                `}
              >
                <div className="relative flex-shrink-0">
                  <input
                    type="radio"
                    name="answer"
                    value={key}
                    checked={isSelectedAnswer}
                   
                    onChange={() => !isSubmitted && setUserAnswer(key)}
                   
                    disabled={isSubmitted}
                    className="appearance-none w-6 h-6 border-2 border-gray-300 rounded-full transition-all duration-200 checked:border-blue-500 checked:bg-blue-500 disabled:bg-gray-200 disabled:border-gray-300 disabled:cursor-not-allowed"
                  />
                
                  {isSelectedAnswer && (
                    <svg
                      className="absolute inset-0 w-6 h-6 text-white pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                
                <span className="flex-1 font-medium text-gray-800">
                  <span className="font-semibold">{key}.</span>
                  <span className="ml-2">{value}</span>
                </span>
              </label>
            )
          })}
        </div>

     
        {result && (
          <div className="w-full">

          <ResultDisplay explanation={result.explanation} isCorrect={result.isCorrect} />

          </div>
        )}
      </div>
    </div>
  )
}

export default React.memo(OptionsCard);