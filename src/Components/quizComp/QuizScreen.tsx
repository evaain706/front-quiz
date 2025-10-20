import { useEffect } from "react";
import Button from "../Button";
import { useQuiz } from "./useQuiz";
import { useQuizStore } from "../../store/useQuizStore";
import { useOptionStore } from "../../store/useOptionStore";
import QuestionCard from "./QuestionCard";
import OptionsCard from "./OptionCard";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";


const QuizScreen = () => {

    const {fetchQuiz,handleSubmit,error} = useQuiz();
    const {isLoading,quiz,setUserAnswer,userAnswer,isGrading} = useQuizStore();
    const {category} = useOptionStore();


  

    useEffect(() => {

    fetchQuiz();

    },[])


    return(
        <div className="mx-3 flex flex-col gap-3 ">
        <div className="flex flex-col justify-center items-center">
        <h2 className="text-[3rem] md:text-[5rem] text-white font-bold">{category}</h2>
        

        </div>

     
        <div >
          <ErrorBoundary fallback={   
            <div className="w-[40rem] md:w-[70rem] lg:w-[90rem] min-h-[15rem]  border-5 border-gray-500 rounded-md bg-red-200 flex flex-col items-center justify-center ">
           <h2 className="text-[1.4rem] text-black font-bold">에러발생!</h2>
           <Button onClick={() => fetchQuiz()}>재시도</Button>
    </div>}>
           <QuestionCard error={error} isLoading={isLoading} quiz={quiz}/>
          </ErrorBoundary>
        
        </div>

       
       

     <OptionsCard/>

      <div className="flex justify-between items-center">
        <Button onClick={fetchQuiz} disabled={isLoading}>문제받기</Button>
        <Button onClick={handleSubmit} disabled={isGrading}>채점</Button>
      </div>
    
        
        </div>
      

    )



}



export default QuizScreen;