import React, { useState, useEffect } from "react";

const AnimeDetails = ({ animeData, type }) => {
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const addToFavorites = () => {
    const newFavorite = {
      animeData,
      type,
    };
    setFavorite([...favorite, newFavorite]);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorite));
  }, [favorite]);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-10">
        <h2 className="text-2xl font-bold mb-4">
          {animeData.info["Main title"]}
        </h2>
        <img className="mb-4" src={animeData.info["Picture"]} />
      </div>
      <div className="col-span-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={addToFavorites}
        >
          Agregar a favoritos
        </button>
      </div>
      <div className="col-span-12">
        <div className="my-4">
          <h3 className="text-lg font-bold mb-2">Información</h3>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="grid grid-cols-4 gap-x-8 gap-y-4">
              <div>
                <p className="font-bold">Tipo:</p>
                <p>{animeData.type}</p>
              </div>
              <div>
                <p className="font-bold">Número de episodios:</p>
                <p>{animeData.info["Number of episodes"]}</p>
              </div>
              <div>
                <p className="font-bold">Fecha:</p>
                <p>{animeData.info["Vintage"]}</p>
              </div>
              <div>
                <p className="font-bold">Título alternativo:</p>
                <p>{animeData.info["Alternative title"]}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div className="m-4 h-64 overflow-auto">
            <h3 className="text-lg font-bold mb-2">Noticias</h3>
            <div className="bg-white rounded-lg shadow-md p-4">
              {animeData.news.map((item, index) => (
                <div key={index} className="my-4">
                  <p className="font-bold">
                    {item.title.replace(/<cite>/g, "").replace(/<\/cite>/g, "")}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(item.datetime).toLocaleString()}
                  </p>
                  <a
                    href={item.href}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Leer más...
                  </a>
                </div>
              ))}
            </div>
          </div>
          <div className="m-4 h-64 overflow-auto">
            <h3 className="text-lg font-bold mb-2">Personal</h3>
            <div className="bg-white rounded-lg shadow-md p-4">
              <ul>
                {animeData.staff.map((item, index) => (
                  <li key={index}>
                    <span className="font-bold">{item.task}: </span>
                    {item.person}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="m-4 h-64 overflow-auto">
            <h3 className="text-lg font-bold mb-2">Elenco</h3>
            <div className="bg-white rounded-lg shadow-md p-4">
              <ul>
                {animeData.cast.map((item, index) => (
                  <li key={index}>
                    <span className="font-bold">{item.role}: </span>
                    {item.person}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="m-4 h-64 overflow-auto">
            <h3 className="text-lg font-bold mb-2">Créditos</h3>
            <div className="bg-white rounded-lg shadow-md p-4">
              <ul>
                {animeData.credit.map((item, index) => (
                  <li key={index}>
                    <span className="font-bold">{item.task}: </span>
                    {item.company}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
