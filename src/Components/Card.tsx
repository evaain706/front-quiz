interface CardProps {
    text: string;
    onClick? : () => void;
}


 const Card = ({text,onClick}:CardProps) => {


    return(
     <div className="w-full bg-blue-300 py-[6rem]" onClick={onClick}>

        <div className="flex flex-col items-center justify-center">

         <h2 className="font-bold text-[1.2rem]">{text}</h2>
        </div>
       

    </div>

    )
 

 }

 export default Card;

