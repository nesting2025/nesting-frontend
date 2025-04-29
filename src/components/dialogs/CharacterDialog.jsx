import * as Dialog from '@radix-ui/react-dialog';
import '../../styles/css/CharacterDialog.css'; // 선택사항: 스타일 별도 분리 가능

export default function CharacterDialog({ open, onOpenChange, title, children }) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title">{title}</Dialog.Title>
          <Dialog.Description className="dialog-description">
            {children}
          </Dialog.Description>
          <div style={{ textAlign: 'right' }}>
            <Dialog.Close asChild>
              <button className="dialog-close">닫기</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
