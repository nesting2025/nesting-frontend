import * as Dialog from '@radix-ui/react-dialog';
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
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="dialog-content">
          <Dialog.Title className="dialog-title" style={{ textAlign: 'center' }}>{title}</Dialog.Title>
          <Dialog.Description className="dialog-description">
              {/* {children} */}
              좋아하는 캐릭터 위주로 추천해 드릴게요 (최대 3개)
          </Dialog.Description>

          
          <div className="scroll-wrapper">
            <div className="character-grid">
              {characters.map((character, index) => (
                  <div key={index} className="character-card">
                      <img src={character.image} alt={character.name} className="character-image" />
                      <span className="character-name">{character.name}</span>
                    </div>
                  ))}
            </div>
          </div >
          {/* <div className="scroll-gradient"></div> */}
          <fieldset className="dialog-bottom-fieldset">
            <label className="dialog-bottom-label">좋아하는 캐릭터가 없다면 알려주세요. 그럼 네스팅에 생길지도?!</label>
            <input className="dialog-bottom-input" type="text" placeholder="ex) 짱구" />
          </fieldset>
          <div style={{ textAlign: 'center' }}>

            <Dialog.Close asChild>
              <button className="dialog-close">선택 완료</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
