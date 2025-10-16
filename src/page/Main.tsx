import Button from "../components/Button";
import { useNavigate } from "react-router-dom";



const Main = () => {

    const navigate = useNavigate();

return(
    <div className="text-center flex items-center justify-center gap-20">
    <h2 className="text-[20rem]">FrontQuiz</h2>

    <Button size="xl" variant="primary" onClick={() => navigate('/select')}>안녕</Button>



    </div>
    )


}

export default Main;