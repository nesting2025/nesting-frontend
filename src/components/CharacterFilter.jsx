import "../styles/CharacterFilter.css";

const characters = [
  {
    id: "hangyodong",
    name: "한교동",
    enName: "HANGYODONG",
    image: "/assets/character=hangyodong, status=default.png",
    comingSoon: false,
  },
  {
    id: "shinchang",
    name: "짱구",
    enName: "SHINCHAN",
    image: "/assets/character=shinchan, status=default.png",
    comingSoon: false,
  },
  {
    id: "hellokitty",
    name: "헬로키티",
    enName: "HELLO KITTY",
    image: "/assets/character=hellokitty, status=default.png",
    comingSoon: true,
  },
  {
    id: "kuromi",
    name: "쿠로미",
    enName: "KUROMI",
    image: "/assets/character=kuromi, status=default.png",
    comingSoon: true,
  },
];

const CharacterFilter = () => {
  return (
    <div className="character-filter">
      <h2>캐릭터별로 둘러볼까요?</h2>
      <div className="character-list">
        {characters.map((char) => (
          <div
            key={char.id}
            className={`character-card ${char.comingSoon ? "disabled" : ""}`}
          >
            <div className="character-info">
              <span className="char-name">{char.name}</span>
              <span className="char-enName">{char.enName}</span>
            </div>
            <img src={char.image} alt={char.name} className="character-image" />

            {char.comingSoon && <div className="coming-soon">coming soon</div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterFilter;
