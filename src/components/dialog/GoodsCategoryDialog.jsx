import * as Dialog from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react';
import '../../styles/css/CharacterDialog.css';

const categories = ["인형", "피규어", "가챠", "문구류", "카드", "키링", "의류", "화장품", "케이스", "식기류"];

export default function CharacterDialog({ open, onOpenChange, title, children }) {
  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (open) {
      setSelected([]);
      setInputValue('');
    }
  }, [open]);

  const handleCategoryClick = (category) => {
    if (selected.includes(category)) {
      setSelected(selected.filter(item => item !== category)); // 선택 해제
    } else if (selected.length < 3) {
      setSelected([...selected, category]); // 선택 추가
    }
  };
  const isButtonEnabled = selected.length > 0 || inputValue.trim() !== '';


  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Close className='dialog-close-x' asChild>
            <img src="/assets/dialog/dialog_x.png"/>
          </Dialog.Close>
          <Dialog.Title className="dialog-title" style={{ textAlign: 'center' }}>{title}</Dialog.Title>
          <Dialog.Description className="dialog-description">
            좋아하는 굿즈 위주로 추천해 드릴게요 (최대 3개)
          </Dialog.Description>

          <div className='category-grid'>
            {categories.map((category, index) => (
              <button
                key={index}
                className={`category-button ${selected.includes(category) ? 'selected' : ''}`}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <fieldset className="dialog-bottom-fieldset">
            <label className="dialog-bottom-caption">좋아하는 굿즈 유형이 없다면 알려주세요. 참고할게요!</label>
            <input
              className="dialog-bottom-input"
              type="text"
              placeholder="굿즈 유형을 작성해 주세요"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </fieldset>

          <div style={{ textAlign: 'center' }}>
            <Dialog.Close asChild>
              <button className="dialog-close" disabled={!isButtonEnabled}>선택 완료</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

