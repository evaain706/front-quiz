import { useState } from 'react';
import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';

interface DeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (password: string) => void;
  isLoading?: boolean;
  title?: string;
  errorMessage?: string;
}

const DeleteModal = ({
  isOpen,
  onOpenChange,
  onDelete,
  isLoading = false,
  title = '삭제',
  errorMessage,
}: DeleteModalProps) => {
  const [password, setPassword] = useState('');

  const handleDeleteClick = () => {
    onDelete(password);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Content className='max-w-[20rem]'>
        <Modal.Header>
          <Modal.Title className='text-[2rem] font-bold md:text-[2.4rem]'>
            {title}
            <Modal.Close />
          </Modal.Title>
        </Modal.Header>

        <Modal.Item className='flex flex-col gap-2'>
          <label className='text-[1.4rem] text-gray-600 md:text-[1.6rem]'>
            비밀번호를 입력하세요
          </label>

          <Input
            placeholder='비밀번호'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full rounded border px-2 py-1'
          />
          {errorMessage && (
            <p className='mt-2 text-center text-[1.6rem] text-red-500'>
              {errorMessage}
            </p>
          )}

          <div className='mt-4 flex justify-center gap-2'>
            <Button onClick={handleDeleteClick} disabled={isLoading}>
              삭제
            </Button>
          </div>
        </Modal.Item>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteModal;
