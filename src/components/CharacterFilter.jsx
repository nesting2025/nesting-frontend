import "../styles/CharacterFilter.css";

const characters = [
  {
    id: "hangyodong",
    name: "한교동",
    enName: "HANGYODONG",
    image: {
      large : "/assets/character=hangyodong, status=default.png",
      medium : "/assets/character=hangyodong, status=small.png",
      small : "/assets/character=hangyodong, status=small.png"
    },
    color: "#EFFFFF",
    comingSoon: false,
  },
  {
    id: "shinchang",
    name: "짱구",
    enName: "SHINCHAN",
    image: {
      large : "/assets/character=shinchan, status=default.png",
      medium : "/assets/character=shinchan, status=small.png",
      small : "/assets/character=shinchan, status=small.png"
    },
    color: "#FFFDEF",
    comingSoon: false,
  },
  {
    id: "hellokitty",
    name: "헬로키티",
    enName: "HELLO KITTY",
    image: {
      large : "/assets/character=hellokitty, status=default.png",
      medium : "/assets/character=hellokitty, status=small.png",
      small : "/assets/character=hellokitty, status=small.png"
    },
    color: "#FFEFF3",
    comingSoon: true,
  },
  {
    id: "kuromi",
    name: "쿠로미",
    enName: "KUROMI",
    image: {
      large: "/assets/character=kuromi, status=default.png",
      medium: "/assets/character=kuromi, status=small.png",
      small: "/assets/character=kuromi, status=small.png"
    },
    color: "F6EFFF",
    comingSoon: true,
  },
];

const CharacterFilter = ({screenSize}) => {
  return (
    <div className={`character-filter ${screenSize}`}>
      <h2>캐릭터별로 둘러볼까요?</h2>
      <div className="character-list">
        {characters.map((char) => (
          <div
            key={char.id}
            className={`character-card ${char.comingSoon ? "disabled" : ""}`}
            style={{"--color": char.color}}
          >
            <div className="character-info">
              <span className="char-name">{char.name}</span>
              <span className="char-enName">{char.enName}</span>
            </div>
            <div className="character-image-wrapper">
              <img
                src={char.image[screenSize]}
                alt={char.name}
                className="character-image"
              />
              {char.comingSoon && (
                <div className="coming-soon">coming <br /> soon</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterFilter;
