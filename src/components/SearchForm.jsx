import React, { useState, useEffect } from "react";
import axios from "axios";
import cheerio from "cheerio";
import AnimeDetails from "./AnimeDetails";
import MangaDetails from "./MangaDetails";

const SearchForm = () => {
  const [searchType, setSearchType] = useState("");
  const [animeDetails, setAnimeDetails] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchTermId, setSearchTermId] = useState(0);
  const [dataNamesReports, setdataNamesReports] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    getDataListType(searchType);
  }, []);

  const onChangeSelectType = (event) => {
    setAnimeDetails({});
    setSearchType(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (validateSearchTerm(searchTerm, searchTermId)) {
      const endpoint = getEndpoint(searchType, searchTermId);
      const { data } = await axios.get(endpoint);
      const $ = cheerio.load(data, { xmlMode: true });
      if ($("ann warning").length > 0) {
        // Si existe, imprimir el mensaje de error
        const mensajeError = $("ann warning").text();
        showToast(mensajeError);
      } else {
        let animeData = {};

        switch (searchType) {
          case "anime":
          case "title":
            const anime = $("ann anime");
            animeData.id = anime.attr("id");
            animeData.gid = anime.attr("gid");
            animeData.type = anime.attr("type");
            animeData.name = anime.attr("name");
            animeData.precision = anime.attr("precision");
            animeData.generatedOn = anime.attr("generated-on");

            animeData.relatedPrev = [];
            $("related-prev").each(function () {
              animeData.relatedPrev.push({
                rel: $(this).attr("rel"),
                id: $(this).attr("id"),
              });
            });

            animeData.info = {};
            $("info").each(function () {
              animeData.info[$(this).attr("type")] = $(this).text();
            });

            animeData.news = [];
            $("news").each(function () {
              animeData.news.push({
                datetime: $(this).attr("datetime"),
                href: $(this).attr("href"),
                title: $(this).text(),
              });
            });

            animeData.staff = [];
            $("staff").each(function () {
              animeData.staff.push({
                task: $(this).find("task").text(),
                person: $(this).find("person").text(),
                personId: $(this).find("person").attr("id"),
              });
            });

            animeData.cast = [];
            $("cast").each(function () {
              animeData.cast.push({
                role: $(this).find("role").text(),
                person: $(this).find("person").text(),
                personId: $(this).find("person").attr("id"),
                lang: $(this).attr("lang"),
              });
            });

            animeData.credit = [];
            $("credit").each(function () {
              animeData.credit.push({
                task: $(this).find("task").text(),
                company: $(this).find("company").text(),
                companyId: $(this).find("company").attr("id"),
              });
            });
            break;

          case "manga":
            const manga = $("ann manga");
            const mangaData = {
              id: manga.attr("id"),
              gid: manga.attr("gid"),
              type: manga.attr("type"),
              name: manga.attr("name"),
              precision: manga.attr("precision"),
              generatedOn: manga.attr("generated-on"),
              src: $("info[type='Picture']").attr("src"),
              info: {},
              staff: [],
            };

            $("info").each(function () {
              const type = $(this).attr("type");
              const value = $(this).text();
              mangaData.info[type] = value;
            });

            $("staff").each(function () {
              const task = $(this).find("task").text();
              const person = $(this).find("person").text();
              const personId = $(this).find("person").attr("id");
              mangaData.staff.push({ task, person, personId });
            });
            animeData = mangaData;
            break;
        }
        setAnimeDetails(animeData);
      }
    } else {
      showToast("La búsqueda no es válida, asegurése de que el nombre corresponda con las sugeridas");
    }
  };

  const filteredData = dataNamesReports.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validateSearchTerm = (term, id) => {
    const matchingData = dataNamesReports.find(
      (data) => data.name === term && data.id === id
    );
    return matchingData !== undefined;
  };

  const getEndpoint = (type, searchTermId) => {
    const endpoints = {
      anime: "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?anime=",
      manga: "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?manga=",
      title: "https://cdn.animenewsnetwork.com/encyclopedia/api.xml?title=",
    };
    const endpoint = endpoints[type] || endpoints.title;
    return `${endpoint}${searchTermId}`;
  };

  const getDataListType = () => {
    axios
      .get("https://cdn.animenewsnetwork.com/encyclopedia/reports.xml?id=177")
      .then(({ data }) => {
        const $ = cheerio.load(data, { xmlMode: true });
        setdataNamesReports([
          ...$("item").map((i, el) => {
            const name = $(el).find("anime").text();
            const href = $(el).find("anime").attr("href");
            const id = href.match(/id=(\d+)/)[1];
            return { name, id };
          }),
        ]);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // Función para mostrar el toast
  const showToast = (msj) => {
    setMensaje(msj);
    var toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
    }, 3000);
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-3">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="searchType"
            >
              Tipo de búsqueda
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="searchType"
              value={searchType}
              onChange={(e) => onChangeSelectType(e)}
            >
              <option value="">Seleccione una opción</option>
              <option value="anime">Anime</option>
              <option value="manga">Manga</option>
              <option value="title">Título</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="searchInput"
            >
              Búsqueda
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="searchInput"
              autoComplete="off"
              type="text"
              placeholder="Ingrese su búsqueda aquí"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            {searchTerm.length > 0 && (
              <div className="autocomplete">
                {filteredData.map((data, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSearchTerm(data.name);
                      setSearchTermId(data.id);
                    }}
                  >
                    {data.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={handleFormSubmit}
            >
              Buscar
            </button>
          </div>
        </form>
      </div>
      <div className="col-span-9">
        {Object.keys(animeDetails).length > 0 &&
          (searchType === "anime" || searchType === "title") && (
            <AnimeDetails animeData={animeDetails} type={searchType} />
          )}
        {Object.keys(animeDetails).length > 0 && searchType === "manga" && (
          <MangaDetails mangaData={animeDetails} type={searchType} />
        )}
      </div>
      <div id="toast" className="bg-orange-600 py-2 px-4 rounded-xl text-white">
        {mensaje}
      </div>
    </div>
  );
};

export default SearchForm;
