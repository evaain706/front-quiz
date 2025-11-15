import Button from '../Button';
import Modal from '../Modal';

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
  password,
  setPassword,
  onDelete,
  isLoading = false,
  title = '삭제',
}: DeleteModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Content>
        <Modal.Header>
          <Modal.Title>
            {title}
            <Modal.Close />
          </Modal.Title>
        </Modal.Header>

        <Modal.Item className='flex flex-col gap-2'>
          <label className='text-sm text-gray-600'>비밀번호를 입력하세요</label>

          <input
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
