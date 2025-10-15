import Button from "../components/Button";



const Main = () => {

return(
    <div className="text-center flex items-center justify-center gap-20">
    <h2 className="text-[20rem]">FrontQuiz</h2>

    <Button size="xl" variant="primary" onClick={() => console.log('안녕')}>안녕</Button>



    </div>
    )


}

export default Main;