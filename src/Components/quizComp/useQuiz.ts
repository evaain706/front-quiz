import { useQuizStore } from "../../store/useQuizStore"
import { useOptionStore } from "../../store/useOptionStore";
import { instance } from "../../apis/instance";


export const useQuiz = () => {

const {quiz,setQuiz,userAnswer,setUserAnswer,setResult,setIsLoading} = useQuizStore();
const {category,level} = useOptionStore();

 const fetchQuiz = async () => {
    setIsLoading(true);
    setQuiz(null);
    setResult('');
    setUserAnswer('');

    try {
      const response = await instance.post('/api/generate-quiz', {
        topic:category,
        level,
      });
      setQuiz(response.data);
    } catch (error) {
      console.error('퀴즈 요청 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!quiz || !userAnswer) return;

    setIsLoading(true);
    try {
      const response = await instance.post('/api/grade-answer', {
        quiz,
        userAnswer,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('채점 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };


return {fetchQuiz,handleSubmit};



}