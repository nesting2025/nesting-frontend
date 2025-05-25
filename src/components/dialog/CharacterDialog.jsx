import * as Dialog from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react';
import '../../styles/css/CharacterDialog.css'; // 선택사항: 스타일 별도 분리 가능

const characters = [
    { name: '한교동', image: "/assets/character=hangyodong, status=small.png" },
    { name: '짱구', image: "/assets/character=shinchan, status=small.png" },
    { name: '헬로키티', image: "/assets/character=hellokitty, status=small.png" },
    { name: '쿠로미', image: "/assets/character=kuromi, status=small.png" },
    { name: '한교동', image: "/assets/character=hangyodong, status=small.png" },
    { name: '짱구', image: "/assets/character=shinchan, status=small.png" },
    { name: '헬로키티', image: "/assets/character=hellokitty, status=small.png" },
    { name: '쿠로미', image: "/assets/character=kuromi, status=small.png" },
    { name: '한교동', image: "/assets/character=hangyodong, status=small.png" },
    { name: '짱구', image: "/assets/character=shinchan, status=small.png" },
    { name: '헬로키티', image: "/assets/character=hellokitty, status=small.png" },
    { name: '쿠로미', image: "/assets/character=kuromi, status=small.png" },
    // ... 추가 캐릭터
  ];
export default function CharacterDialog({ open, onOpenChange, title, children }) {
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
          {/* <div className="scroll-gradient"></div> */}
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
              <button className="dialog-close" disabled={!isButtonEnabled}>선택 완료</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
