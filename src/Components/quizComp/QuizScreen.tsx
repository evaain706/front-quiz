import Button from "../Button";
import { useQuiz } from "./useQuiz";
import { useQuizStore } from "../../store/useQuizStore";

const QuizScreen = () => {

    const {fetchQuiz,handleSubmit} = useQuiz();
    const {isLoading,quiz,setUserAnswer,userAnswer} = useQuizStore();


    return(
        <>
        <div className="bg-gray-200 flex flex-col justify-center items-center rounded-2xl mx-3 ">

        <h2 className="font-bold text-[1.8rem]">문제</h2>

    
        {quiz && 
        <div className="py-[3rem]">
         <h2 className="text-[1.4rem] font-bold mx-3 md:text-[1.6rem]">{quiz.question}</h2>

       

        </div>    
        
        }
    
        </div>  


        <div className="bg-yellow-200">
           {quiz && (
        <div className='mt-4 w-full'>
          <p className='mb-3 text-lg font-medium'>{quiz.question}</p>
          {Object.entries(quiz.options).map(([key, value]) => (
            <label
              key={key}
              className={`block cursor-pointer rounded border px-3 py-2 ${
                userAnswer === key ? 'bg-blue-200' : ''
              }`}
            >
              <input
                type='radio'
                name='answer'
                value={key}
                checked={userAnswer === key}
                onChange={() => setUserAnswer(key)}
                className='mr-2'
              />
              {key}. {value}
            </label>
          ))}
        </div>
      )}


        </div>

        
        </>
      

    )



}



export default QuizScreen;