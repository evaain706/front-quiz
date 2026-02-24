import Button from '../Button';
import Modal from '../Modal';

interface BlockerModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed: () => void;
  onCancel: () => void;
}

const BlockerModal = ({
  isOpen,
  onOpenChange,
  onProceed,
  onCancel,
}: BlockerModalProps) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal.Content className='max-w-[20rem] rounded-4xl bg-white'>
        <Modal.Header>
          <Modal.Title className='text-center text-[2rem] font-bold md:text-[2.4rem]'>
            페이지를 떠나시겠습니까?
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer className='flex gap-2'>
          <Button className='max-w-100 flex-1' onClick={onProceed}>
            떠나기
          </Button>
          <Button className='max-w-100 flex-1' onClick={onCancel}>
            계속 작성하기
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default BlockerModal;
