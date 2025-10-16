import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";


const OptionSelect = () => {
  const [step, setStep] = useState(0);
 
  const [selectedCategory, setSelectedCategory] = useState(null);

  const category = [
    { id: 1, text: 'React 기본 개념' },
    { id: 2, text: 'React Hooks' },
    { id: 3, text: 'React 렌더링 원리' },
    { id: 4, text: 'React 상태 관리' }, 
    { id: 5, text: 'React 라우팅' },
    { id: 6, text: 'React 성능 최적화' },
    { id: 7, text: 'TypeScript 기본 문법' },
    { id: 8, text: 'TypeScript 타입과 인터페이스' },
    { id: 9, text: 'TypeScript 제네릭' },
    { id: 10, text: 'React와 TypeScript 함께 사용하기' },
    { id: 11, text: 'JavaScript ES6+' },
    { id: 12, text: 'JavaScript 비동기 처리' },
    { id: 13, text: 'JavaScript 이벤트 루프와 호이스팅' },
    { id: 14, text: 'Redux / Redux Toolkit' },
    { id: 15, text: 'Recoil / Zustand' },
    { id: 16, text: '웹 브라우저 동작 원리' },
    { id: 17, text: '웹 접근성과 SEO' },
    { id: 18, text: 'Webpack / Vite' },
    { id: 19, text: 'Git & GitHub' },
    { id: 20, text: 'HTTP와 REST API' },
  ];

 

  return (
    <div className="w-full p-4 md:p-8 items-center justify-center flex flex-col gap-10 md:gap-20 ">
    
      {step === 0 && (
       
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center justify-center w-full" >
          {category.map((cat) => (
          
            <Card
              key={cat.id}
              text={cat.text}
            />
          ))}
        </div>
      )}


      <Button variant="primary" size='md'>난이도선택하기</Button>

      
    </div>
  );
};

export default OptionSelect;