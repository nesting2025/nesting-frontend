import * as Dialog from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react';
import '../../styles/css/CharacterDialog.css'; // 선택사항: 스타일 별도 분리 가능
import { useNavigate } from 'react-router-dom';

const characters = [
    { name: '한교동', image: "/assets/character=hangyodong, status=small.png" },
    { name: '헬로키티', image: "/assets/character=hellokitty, status=small.png" },
    { name: '쿠로미', image: "/assets/character=kuromi, status=small.png" },
    { name: '짱구', image: "/assets/character=shinchan, status=small.png" },
    { name: '짱구', image: "/assets/character=shinchan, status=small.png" },
    { name: '쿠로미', image: "/assets/character=kuromi, status=small.png" },
    { name: '헬로키티', image: "/assets/character=hellokitty, status=small.png" },
    { name: '한교동', image: "/assets/character=hangyodong, status=small.png" }
    // ... 추가 캐릭터
  ];
export default function CharacterDialog({ open, onOpenChange, title, children }) {
  const [selected, setSelected] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const nav = useNavigate();

  useEffect(() => {
      if (open) {
        setSelected([]);
        setInputValue('');
      }
    }, [open]);

    const gotoPreferenceSetup = () => nav("/signup/preference");


  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title" style={{ textAlign: 'center' }}>만나서 반가워요!</Dialog.Title>
          
            <div className="character-grid-cross">
              {characters.map((character, index) => (
                  <div key={index} className={`character-card ${selected.includes(characters) ? 'selected' : ''}`}>
                      <img src={character.image} alt={character.name} className="character-image" />
                    </div>
                  ))}
            </div>
          {/* <div className="scroll-gradient"></div> */}
          <fieldset className="dialog-bottom-fieldset">
            <label className="dialog-bottom-title">나만의 취향을 등록해보세요!</label>
            <label className="dialog-bottom-body">취향을 등록하면, 취향에 맞는 상품을 우선적으로 확인할 수 있어요</label>

          </fieldset>
          <div style={{ textAlign: 'center' }}>
            <Dialog.Close asChild>
              <button 
              onClick={gotoPreferenceSetup}
              className="dialog-close">다음으로</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    );
    
}