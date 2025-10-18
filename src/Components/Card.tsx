

interface CardProps {
    text: string;
    onClick? : () => void;
    isSelected? : boolean
    
}


 const Card = ({text,onClick,isSelected}:CardProps) => {


    return(
    <div
    onClick={onClick}
    className={`p-4 rounded-lg cursor-pointer transition-all py-[4rem]  ${
      isSelected
        ? 'bg-blue-500 text-white ring-2 ring-blue-500 animate-pulse'
        : 'bg-gray-200 hover:bg-gray-300'
    }`}
  >

        <div className="flex flex-col items-center justify-center">
      
         <h2 className="font-bold text-[1.2rem]">{text}</h2>
        </div>
       

    </div>

    )
 

 }

 export default Card;

