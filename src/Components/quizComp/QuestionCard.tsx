
import ReactMarkdown from 'react-markdown'
import type { Quiz } from "../../types/quizTypes";


interface QuestionCardProps {
    error: Error | null;
    isLoading: boolean;
    quiz: Quiz | null;
}


const QuestionCard = ({error,isLoading,quiz}:QuestionCardProps) => {



if(error){
    throw error;
}



if(isLoading){
    return(
        <div className="w-[40rem] md:w-[70rem] lg:w-[90rem] min-h-[15rem]  border-5 border-gray-500 rounded-md bg-white flex items-center justify-center ">
            <div className="animate-pulse bg-gray-300 w-1/2 h-[3rem] rounded-md "/>
    </div>


    )
}

const markdownContnet = quiz?.question;

return(

    <div className="md:w-[70rem] lg:w-[90rem] min-h-[15rem] border-5 border-gray-500 rounded-md bg-navy-black flex items-center justify-center p-6 scanline-overlay ">


  <div className="w-full max-h-[30rem] overflow-auto text-[1.2rem] md:text-[1.6rem] font-bold leading-[3rem] md:leading-[4rem] text-glow-green animate-flicker text-green-400">
    <ReactMarkdown>
      {markdownContnet}
    </ReactMarkdown>
  </div>
  
</div>


)


}




export default QuestionCard;