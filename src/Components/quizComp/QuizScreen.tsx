import { useEffect } from "react";
import Button from "../Button";
import { useQuiz } from "./useQuiz";
import { useQuizStore } from "../../store/useQuizStore";
import { useOptionStore } from "../../store/useOptionStore";
import QuestionCard from "./QuestionCard";
import OptionsCard from "./OptionCard";

const QuizScreen = () => {

    const {fetchQuiz,handleSubmit} = useQuiz();
    const {isLoading,quiz,setUserAnswer,userAnswer,isGrading} = useQuizStore();
    const {category} = useOptionStore();


    // useEffect(() => {

    // fetchQuiz();

    // },[])


    return(
        <div className="mx-3 flex flex-col gap-3 ">
        <div className="flex flex-col justify-center items-center">
        <h2 className="text-[3rem] md:text-[5rem] font-bold">{category}</h2>
        

        </div>


        <div >
         <QuestionCard/>
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