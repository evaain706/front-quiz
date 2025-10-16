import { useOptionStore } from "../store/useOptionStore";
import { instance } from "../apis/instance";
import Button from "../components/Button";



interface Quiz {
  question: string;
  options: { [key: string]: string };
  answer: string;
}


const Quiz = () => {

    const {category,level} = useOptionStore();

    const fetchQuiz = async () => {
  

    try {
      const response = await instance.post('/api/generate-quiz', {
        topic : category,
        level,
      });
      console.log(response.data)
    } catch (error) {
      console.error('퀴즈 요청 실패:', error);
    } finally {
      
    }
  };

    return(
        <div>

            <h2>퀴즈</h2>
            <h2>{category} {level}</h2>

            <Button variant='primary' size='xl' onClick={() => fetchQuiz()}>눌러</Button>


        </div>

    )

}

export default Quiz;