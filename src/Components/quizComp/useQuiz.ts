import { useQuizStore } from "../../store/useQuizStore"
import { useOptionStore } from "../../store/useOptionStore";
import { instance } from "../../apis/instance";
import { useState } from "react";


export const useQuiz = () => {

const {quiz,setQuiz,userAnswer,setUserAnswer,setResult,setIsLoading,setIsGrading} = useQuizStore();
const {category,level} = useOptionStore();
const [error,setError] = useState<Error | null>(null);

 const fetchQuiz = async () => {
    setIsLoading(true);
    setQuiz(null);
    setResult(null);
    setUserAnswer('');
    setError(null);

    try {
      
      const response = await instance.post('/api/generate-quiz', {
        topic:category,
        level,
      });
      setQuiz(response.data);
    } catch (error) {
      
      console.error('퀴즈 요청 실패:', error);
      setError(new Error('퀴즈 요청실패'))
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!quiz || !userAnswer) return;

    setIsGrading(true);
    try {
      const response = await instance.post('/api/grade-answer', {
        quiz,
        userAnswer,
      });
      console.log(response.data)
      setResult(response.data);
    } catch (error) {
      console.error('채점 실패:', error);
    } finally {
      setIsGrading(false);
    }
  };


return {fetchQuiz,handleSubmit,error};



}