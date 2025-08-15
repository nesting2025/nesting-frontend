import * as Dialog from '@radix-ui/react-dialog';
import React, { useEffect, useState } from 'react';
import '../../styles/css/CharacterDialog.css'; // 선택사항: 스타일 별도 분리 가능
import { useNavigate } from 'react-router-dom';
import { socialLink } from '../../api/authApi';
import { useTokenReissue } from '../../hooks/useAuth';
import { useToast } from '../common/ToastContext';

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
export default function CharacterDialog({ open, onOpenChange, isSocialLink = false }) {
  const { tokenReissue, data: tokenReissueData } = useTokenReissue();
  const [selected, setSelected] = useState([]);
  const nav = useNavigate();
  const showToast = useToast();

  useEffect(() => {
      if (open) {
        setSelected([]);
      }
    }, [open]);

  const handleSubmit = async () => { 
    if(socialLink) {
      // 토큰 재발급 API
      const accessToken = localStorage.getItem("accessToken");
      try {
        tokenReissue(accessToken);
      } catch (e) { console.log(e); }
    } else {
      nav("/signup/preference");
    }
  }

  // API response
  useEffect(() => {
    if(tokenReissueData != null) {
      if(tokenReissueData.code === "SUCCESS") {
        nav("/");
      }
      else {
        showToast(tokenReissueData.message);
      }
    }
  }, [tokenReissueData])

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title" style={{ textAlign: 'center' }}>
            {isSocialLink ? "다시 만나서 반가워요 :)"  : "만나서 반가워요!"}
          </Dialog.Title>
          
          <div className="character-grid-cross">
            {characters.map((character, index) => (
                <div key={index} className={`character-card ${selected.includes(characters) ? 'selected' : ''}`}>
                    <img src={character.image} alt={character.name} className="character-image" />
                  </div>
                ))}
          </div>

          {!isSocialLink && (
            <fieldset className="dialog-bottom-fieldset">
              <label className="dialog-bottom-title">나만의 취향을 등록해보세요!</label>
              <label className="dialog-bottom-body">취향을 등록하면, 취향에 맞는 상품을 우선적으로 확인할 수 있어요</label>
            </fieldset>
          )}

          <div style={{ textAlign: 'center' }}>
            <Dialog.Close asChild>
              <button 
              onClick={handleSubmit}
              className="dialog-close">다음으로</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
    );
    
}