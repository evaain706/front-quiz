import { useOptionStore } from '@/store/useOptionStore';
import Button from '../Button';
import Modal from '../Modal';
import { useNavigate } from 'react-router-dom';

interface NavigateQuizModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  category?: string;
}

const NavigateQuizModal = ({
  isOpen,
  onOpenChange,
}: NavigateQuizModalProps) => {
  const navigate = useNavigate();
  const category = useOptionStore((s) => s.category);
  const setLevel = useOptionStore((s) => s.setLevel);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Content className='max-w-[10rem] rounded-4xl bg-white shadow-none backdrop-blur-sm'>
        <Modal.Header>
          <Modal.Title className='text-center text-[2rem] font-bold md:text-[2.4rem]'>
            {category}
            <Modal.Close />
          </Modal.Title>
        </Modal.Header>

        <Modal.Item className='flex flex-col items-center justify-center gap-4'>
          <label className='text-[1.4rem] font-bold text-gray-900 md:text-[1.6rem]'>
            난이도를 선택해주세요
          </label>

          <select
            onChange={(e) => setLevel(e.target.value)}
            className='rounded-lg border border-gray-300 bg-white p-2 text-[1.4rem] font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none'
          >
            <option value='쉬움'>쉬움</option>
            <option value='보통'>보통</option>
            <option value='어려움'>어려움</option>
          </select>

          <Button onClick={() => navigate('/quiz')} className='mt-4'>
            퀴즈 풀러 가기
          </Button>
        </Modal.Item>
      </Modal.Content>
    </Modal>
  );
};

export default NavigateQuizModal;
