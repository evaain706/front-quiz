import QuizImg1 from '@/assets/img/quiz-img.png';
import QuizImg2 from '@/assets/img/quiz-img2.png';
import QuizImg3 from '@/assets/img/quiz-img3.png';
import CommunityImg from '@/assets/img/community-img.png';
import CommunityDetailImg from '@/assets/img//community-detail-img.png';
import UserStatImg from '@/assets/img/user-statistic-img.png';
import IncorrectMainImg from '@/assets/img/incorrect-img.png';
import IncorrectModalImg from '@/assets/img/incorrect-modal-img.png';

export const LandingSectionData = [
  {
    mainText: '여러가지 토픽 중',
    subText: '선택해 문제를 풀어보세요',
    explanationText:
      'JavaScript, React, TypeScript등 다양한 프론트엔드 기술 토픽을 선택하고 난이도별로 학습하세요',
    images: [
      { src: QuizImg1, alt: 'QuizImage1' },
      { src: QuizImg2, alt: 'QuizImage2' },
      { src: QuizImg3, alt: 'QuizImage3' },
    ],
  },
  {
    mainText: '풀었던 문제들에 대한',
    subText: '통계를 확인해보세요',
    explanationText: '전체,카테고리별,난이도별 통계를 확인할수있습니다',
    images: [{ src: UserStatImg, alt: 'UserStatImg' }],
  },
  {
    mainText: '문제를 오답노트에 등록하고',
    subText: '다시 확인해보세요',
    explanationText: '틀렸던 문제를 저장하고 언제든지 다시 확인할수있습니다',
    images: [
      { src: IncorrectMainImg, alt: 'Incorrect Main Image' },
      { src: IncorrectModalImg, alt: 'Incorrect Modal Image' },
    ],
  },
  {
    mainText: '서로의 정보를',
    subText: '공유해보세요',
    explanationText: '질문을 올리거나 정보를 올려 함께 학습하세요',
    images: [
      { src: CommunityImg, alt: 'Community Main Image' },
      { src: CommunityDetailImg, alt: 'Community Detail Image' },
    ],
  },
];
