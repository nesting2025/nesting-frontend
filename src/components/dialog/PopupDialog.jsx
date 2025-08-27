import '../../styles/css/CharacterDialog.css'; 
import * as Dialog from '@radix-ui/react-dialog';


const PopupDialog = ({ open, onOpenChange, titleText, onClickLeftBtn, onClickRightBtn }) => {

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className="dialog-overlay" />
                        <Dialog.Content className="dialog-content">
                            <Dialog.Title className="dialog-title">{titleText}</Dialog.Title>
                            <div className="dialog-buttons" style={{ display: 'flex', justifyContent: 'space-between', gap: '8px', marginTop: '16px' }}>
                                <Dialog.Close asChild>
                                    <button className="dialog-cancel" onClick={onClickLeftBtn}>취소</button>
                                </Dialog.Close>
                                <Dialog.Close asChild>
                                    <button className="dialog-close" onClick={onClickRightBtn}>확인</button>
                                </Dialog.Close>
                            </div>
                        </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}

export default PopupDialog;