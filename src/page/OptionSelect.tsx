import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import { useOptionStore } from "../store/useOptionStore";



const OptionSelect = () => {
  const [step, setStep] = useState(0);



  const {category,setCategory,setLevel,resetCategory,resetLevel} = useOptionStore();



  const navigate = useNavigate();


  useEffect(() => {
    resetCategory();
    resetLevel();
  }, [resetCategory, resetLevel]); 



  const handleCategorySelect = (selectedCat: string) => {
   
    if (category === selectedCat) {
      setCategory('');
    } else {
      setCategory(selectedCat);
    }
  };


  const handleLevelSelect = (level :string) => {
    setLevel(level); 
    navigate('/quiz'); 
  };

  const categorylist = [
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
    <div className="w-full p-4 md:p-8 flex flex-col items-center justify-center gap-10 md:gap-16">
      {step === 0 && (
        <div className="w-full text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">주제를 선택해주세요</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {categorylist.map((cat) => (
              <Card
                key={cat.id}
                text={cat.text}
               
                isSelected={category === cat.text}
                onClick={() => handleCategorySelect(cat.text)}
              />
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
           
            주제: {category}
          </h2>
          <h3 className="text-xl md:text-2xl mb-8">난이도를 선택해주세요</h3>
          <div className="flex gap-4 justify-center">
          
            <Button size="md" onClick={() => handleLevelSelect('쉬움')}>쉬움</Button>
            <Button size="md" onClick={() => handleLevelSelect('보통')}>보통</Button>
            <Button size="md" onClick={() => handleLevelSelect('어려움')}>어려움</Button>
          </div>
        </div>
      )}

      {step === 0 ? (
        <Button
          variant="primary"
          size="md"
          disabled={!category}
          onClick={() => setStep(1)}
        >
          난이도 선택하기
        </Button>
      ) : (
        <div>
          <Button
            variant="secondary"
            size="md"
            onClick={() => setStep(0)}
          >
            뒤로 가기
          </Button>
        </div>
      )}
    </div>
  );
};

export default OptionSelect;