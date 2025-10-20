import { useQuizStore } from "../../store/useQuizStore";


const QuestionCard = () => {

const {quiz,isLoading} = useQuizStore();

if(isLoading){
    return(
        <div className="w-[40rem] md:w-[70rem] lg:w-[90rem] min-h-[15rem]  border-5 border-gray-500 rounded-md bg-white flex items-center justify-center ">
            <div className="animate-pulse bg-gray-300 w-1/2 h-[3rem] rounded-md "/>
    </div>


    )
}


return(

     <div className=" md:w-[70rem] lg:w-[90rem] min-h-[15rem]  border-5 border-gray-500 rounded-md bg-white flex items-center justify-center ">
    
      
     
        <h2 className="text-[1.4rem] md:text-[1.6rem] font-bold  leading-[3rem] md:leading-[5rem] px-5">{quiz?.question}</h2>
     
    </div>


)


}




export default QuestionCard;