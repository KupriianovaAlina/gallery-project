const Card = ({ character }) => {
  return (
    <div className="w-72 h-96 relative" key={character.id}>
      <img
        alt="gallery"
        className="absolute inset-0 w-full h-full object-cover object-center rounded-xl"
        src={character.image}
      />
      <div className="flex flex-col justify-between	h-full w-full px-8 py-10 relative z-10 bg-gray-800 opacity-0 hover:opacity-90 rounded-xl text-white">
        <div>
          <h2 className="text-sm title-font font-medium mb-1">
            {"Character's name"}
          </h2>
          <h1 className="font-schwifty-font text-3xl title-font font-bold mb-3">
            {character.name}
          </h1>
        </div>
        <div>
          <p className="text-white italic">{`Click for more information >>>`}</p>
        </div>
      </div>
    </div>
  )
};

export default Card;
