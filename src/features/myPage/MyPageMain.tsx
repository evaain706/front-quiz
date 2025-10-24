import { useUserStore } from '../../store/useUserStore';
import { useQuery } from '@tanstack/react-query';
import { useQuiz } from '../quizComp/hooks/useQuiz';

const MyPageMain = () => {
  const { user } = useUserStore();
  const { getIncorrectAnswers } = useQuiz();

  const { isPending, error, data } = useQuery({
    queryKey: ['incorrectAnswer'],
    queryFn: getIncorrectAnswers,
  });

  if (isPending) return <>로딩중..</>;
  if (error) return <>에러발생: {(error as Error).message}</>;

  return (
    <div>
      <h2>{user?.nickname}</h2>
      {data?.map((item: any) => (
        <div key={item.id}>
          <h3>{item.question}</h3>
          <p>선택한 답: {item.selectedOption}</p>
          <p>정답: {item.correctAnswer}</p>
          <p>설명: {item.explanation}</p>
        </div>
      ))}
    </div>
  );
};

export default MyPageMain;
