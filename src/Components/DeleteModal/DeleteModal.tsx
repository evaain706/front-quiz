import Button from '../Button';
import Input from '../Input';
import Modal from '../Modal';
import { useState } from 'react';

interface DeleteModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  password: string;
  setPassword: (value: string) => void;
  onDelete: () => void;
  isLoading?: boolean;
  title?: string;
}

const DeleteModal = ({
  isOpen,
  onOpenChange,
  onDelete,
  isLoading = false,
  title = '삭제',
}: DeleteModalProps) => {
  const [password, setPassword] = useState('');

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
            name={password}
            placeholder='비밀번호'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full rounded border px-2 py-1'
          />

          <div className='mt-4 flex justify-end gap-2'>
            <Button onClick={() => onOpenChange(false)}>취소</Button>

            <Button onClick={onDelete} disabled={isLoading}>
              삭제
            </Button>
          </div>
        </Modal.Item>
      </Modal.Content>
    </Modal>
  );
};

export default DeleteModal;
