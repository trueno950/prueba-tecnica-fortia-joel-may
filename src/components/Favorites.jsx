import React from "react";

function Favorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const animeFavorites = favorites.filter((fav) => fav.type === "anime");
  const titleFavorites = favorites.filter((fav) => fav.type === "title");
  const mangaFavorites = favorites.filter((fav) => fav.type === "manga");

  return (
    <div className="grid grid-cols-3 gap-4 m-4">
      <div>
        <h2 className="text-2xl font-bold mb-4">Anime Favorites</h2>
        <ul>
          {animeFavorites.map((fav, index) => (
            <li key={index}>
              <h3 className="text-lg font-semibold">{fav.animeData.name}</h3>
              <p>{fav.animeData.info.Genres}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Title Favorites</h2>
        <ul>
          {titleFavorites.map((fav,index) => (
            <li key={index}>
              <h3 className="text-lg font-semibold">{fav.animeData.name}</h3>
              <p>{fav.animeData.info.Genres}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Manga Favorites</h2>
        <ul>
          {mangaFavorites.map((fav, index) => (
            <li key={index}>
              <h3 className="text-lg font-semibold">{fav.mangaData.name}</h3>
              <p>{fav.mangaData.info.Genres}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Favorites;
