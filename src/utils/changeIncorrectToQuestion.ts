import type { IncorrectQuiz } from '@/types/quizTypes';
import type { PostForm } from '@/types/communityTypes';

export const changeIncorrectToQuestion = (
  quiz: IncorrectQuiz,
): Partial<PostForm> => {
  return {
    title: `[질문] ${quiz.topic} 문제 이해가 안돼요`,
    category: 'question',
    content: `
### ❓ 질문
${quiz.question}

---

###  내가 선택한 답
- ${quiz.selectedAnswer}. ${quiz.options[quiz.selectedAnswer]}

###  정답
- ${quiz.correctAnswer}. ${quiz.options[quiz.correctAnswer]}

---

###  해설
${quiz.explanation}
    `.trim(),
  };
};
