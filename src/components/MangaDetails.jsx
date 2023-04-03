import React, { useState, useEffect } from "react";

const MangaDetails = ({ mangaData, type }) => {
  const [favorite, setFavorite] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const addToFavorites = () => {
    const newFavorite = {
      mangaData,
      type,
    };
    setFavorite([...favorite, newFavorite]);
  };

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorite));
  }, [favorite]);

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-10 m-2">
        <h2 className="text-2xl font-bold mb-4">{mangaData.name}</h2>
        <img className="mb-4" src={mangaData.src} />
      </div>
      <div className="col-span-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={addToFavorites}
        >
          Agregar a favoritos
        </button>
      </div>

      <div className="col-span-12 m-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-lg font-bold mb-2 ">Información</h3>

          <div className="grid grid-cols-4 gap-x-8 gap-y-4">
            <div>
              <p className="font-bold">Título principal:</p>
              <p>{mangaData.info["Main title"]}</p>
            </div>
            <div>
              <p className="font-bold">Título alternativo:</p>
              <p>{mangaData.info["Alternative title"]}</p>
            </div>
            <div>
              <p className="font-bold">Número de páginas:</p>
              <p>{mangaData.info["Number of pages"]}</p>
            </div>
            <div>
              <p className="font-bold">Fechas:</p>
              <p>
                {mangaData.info["Vintage"]
                  .replace(/<i>/g, "")
                  .replace(/<\/i>/g, "")}
              </p>
            </div>
            <div>
              <p className="font-bold">Sitio oficial:</p>
              <p>{mangaData.info["Official website"]}</p>
            </div>
            <div>
              <p className="font-bold">Tipo:</p>
              <p>{mangaData.type}</p>
            </div>
            <div>
              <p className="font-bold">Precisión:</p>
              <p>{mangaData.precision}</p>
            </div>
            <div>
              <p className="font-bold">Generado el:</p>
              <p>{mangaData.generatedOn}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <span className="font-bold">Personal:</span>
          <ul>
            {mangaData.staff.map((staff, index) => (
              <li key={index}>
                <span className="font-bold">{staff.task}: </span>
                {staff.person}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MangaDetails;
