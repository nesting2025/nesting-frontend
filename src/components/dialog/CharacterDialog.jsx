import * as Dialog from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react';
import '../../styles/css/CharacterDialog.css'; // 선택사항: 스타일 별도 분리 가능
import { characters } from '../../constants/characters';

export default function CharacterDialog({ open, onOpenChange, onComplete, title, children }) {
  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
      if (open) {
        setSelected([]);
        setInputValue('');
      }
    }, [open]);

  const handleCardClick = (characters) => {
    if (selected.includes(characters)) {
      setSelected(selected.filter(item => item !== characters)); // 선택 해제
    } else if (selected.length < 3) {
      setSelected([...selected, characters]); // 선택 추가
    }
  };
  const isButtonEnabled = selected.length > 0 || inputValue.trim() !== '';

  const handleComplete = () => {
    const names = [...selected.map(c => c.name)];
    const input = inputValue.trim();
    onComplete?.({characters: names, myCharacters: input});
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Close className='dialog-close-x' asChild>
            <img src="/assets/dialog/dialog_x.png"/>
          </Dialog.Close>
          <Dialog.Title className="dialog-title" style={{ textAlign: 'center' }}>캐릭터 선택</Dialog.Title>
          <Dialog.Description className="dialog-description">
              {/* {children} */}
              좋아하는 캐릭터 위주로 추천해 드릴게요 (최대 3개)
          </Dialog.Description>

          
          <div className="scroll-wrapper">
            <div className="character-grid">
              {characters.map((character, index) => (
                  <div key={index} className={`character-card ${selected.includes(character) ? 'selected' : ''}`}
                  onClick={() => handleCardClick(character)}
>
                      <img src={character.image} alt={character.name} className="character-image" />
                      <span className="character-name">{character.name}</span>
                    </div>
                  ))}
            </div>
          </div >
          <fieldset className="dialog-bottom-fieldset">
            <label className="dialog-bottom-caption">좋아하는 캐릭터가 없다면 알려주세요. 그럼 네스팅에 생길지도?!</label>
            <input className="dialog-bottom-input" 
            type="text" 
            placeholder="캐릭터명을 작성해 주세요" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            />
          </fieldset>
          <div style={{ textAlign: 'center' }}>
          

            <Dialog.Close asChild>
              <button className="dialog-close" disabled={!isButtonEnabled} onClick={handleComplete}>선택 완료</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
