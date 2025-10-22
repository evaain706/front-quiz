import { useEffect } from "react";
import Button from "../Button";
import { useQuiz } from "./useQuiz";
import { useQuizStore } from "../../store/useQuizStore";
import { useOptionStore } from "../../store/useOptionStore";
import QuestionCard from "./QuestionCard";
import OptionsCard from "./OptionCard";



const QuizScreen = () => {

    const {fetchQuiz,handleSubmit,error} = useQuiz();
   const isLoading = useQuizStore((s) => s.isLoading);
const quiz = useQuizStore((s) => s.quiz);
const isGrading = useQuizStore((s) => s.isGrading);
const category = useOptionStore((s) => s.category);


  

    useEffect(() => {

    fetchQuiz();

    },[])


    return(
        <div className="mx-3 flex flex-col gap-3 ">
        <div className="flex flex-col justify-center items-center">
        <h2 className="text-[3rem] md:text-[5rem] text-white font-bold">{category}</h2>
        

        </div>

     
        <div >
       
           <QuestionCard error={error} isLoading={isLoading} quiz={quiz}/>
       
        
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