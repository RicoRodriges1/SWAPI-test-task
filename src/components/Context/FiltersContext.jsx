import React from "react";
import axios from "axios";

export const FiltersContext = React.createContext();

export function useFiltersContext() {
  const context = React.useContext(FiltersContext);
  if (!context)
    throw new Error("FiltersContext is used out of Provider.");
  return context;
}


export function FiltersContextProvider(props) {
  const [movies, setMovies] = React.useState([]);
  const [species, setSpecies] = React.useState([]);
  const [people, setPeople] = React.useState([]);
  const [starships, setStarships] = React.useState([]);
  const [filteredPeople, setFilteredPeople] = React.useState([]);

  const [peopleLoaded, setPeopleLoaded] = React.useState(false);
  const [moviesLoaded, setMoviesLoaded] = React.useState(false);
  const [speciesLoaded, setSpeciesLoaded] = React.useState(false);
  const [starshipsLoaded, setStarshipsLoaded] = React.useState(false);

  const [filterMovie, setFilterMovie] = React.useState("");
  const [filterSpecies, setFilterSpecies] = React.useState("");
  const [dateFrom, setDateFrom] = React.useState("");
  const [dateTo, setDateTo] = React.useState("");

  const [relation, setRelation] = React.useState(false);

  const [favourites, setFavourites] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      getAllPeople(),
      getAllMovies(),
      getAllSpecies(),
      getAllStarships()
    ]).then(() => {
      const savedFavourites = JSON.parse(localStorage.getItem("Favourites"));
      if(savedFavourites) {
        setFavourites(savedFavourites);
      }
    })
  }, [])

  React.useEffect(() => {
    if (peopleLoaded && speciesLoaded && moviesLoaded && starshipsLoaded) {
      filter()
    }
  }, [filterMovie, filterSpecies, dateFrom, dateTo])

  const getAllPeople = () => {
    let people = [];
    return axios("https://swapi.dev/api/people/")
      .then(response => {
          people = response.data.results;
          return response.data.count;
      })
      .then(count => {
          const numberOfPagesLeft = Math.ceil((count - 1) / 10);
          let promises = [];
          for (let i = 2; i <= numberOfPagesLeft; i++) {
              promises.push(axios(`https://swapi.dev/api/people?page=${i}`));
          }
          return Promise.all(promises);
      })
      .then(response => {
          people = response.reduce((acc, data) => [...acc, ...data.data.results], people);
          setPeople(people);
          setPeopleLoaded(true);
      })
      .catch(e => {
        throw new Error("Could not get people from API.");
      });
  }

  const getAllMovies = () => {
    return axios("https://swapi.dev/api/films/")
      .then(response => {
        setMovies(response.data.results);
        setMoviesLoaded(true);
      })
      .catch(e => {
        throw new Error("Could not get films from API.");
      });
  }

  const getAllSpecies = () => {
    let species = [];
    return axios("https://swapi.dev/api/species/")
      .then(response => {
          species = response.data.results;
          return response.data.count;
      })
      .then(count => {
          const numberOfPagesLeft = Math.ceil((count - 1) / 10);
          let promises = [];
          for (let i = 2; i <= numberOfPagesLeft; i++) {
              promises.push(axios(`https://swapi.dev/api/species?page=${i}`));
          }
          return Promise.all(promises);
      })
      .then(response => {
          species = response.reduce((acc, data) => [...acc, ...data.data.results], species);
          setSpecies(species);
          setSpeciesLoaded(true);
      })
      .catch(e => {
        throw new Error("Could not get species from API.");
      });
  }

  const getAllStarships = () => {
    let starships = [];
    return axios("https://swapi.dev/api/starships/")
      .then(response => {
          starships = response.data.results;
          return response.data.count;
      })
      .then(count => {
          const numberOfPagesLeft = Math.ceil((count - 1) / 10);
          let promises = [];
          for (let i = 2; i <= numberOfPagesLeft; i++) {
              promises.push(axios(`https://swapi.dev/api/starships?page=${i}`));
          }
          return Promise.all(promises);
      })
      .then(response => {
          starships = response.reduce((acc, data) => [...acc, ...data.data.results], starships);
          setStarships(starships);
          setStarshipsLoaded(true);
      })
      .catch(e => {
        throw new Error("Could not get starships from API.");
      });
  }

  const filter = () => {
    const result = people.filter(character => {
      if(!relation) {
        return (() => { //filter by species
          if(filterSpecies === "All") return true;
          if(filterSpecies === "") return true;
          const characterSpecies = character.species[0];
          if(!characterSpecies) {
            return false
          } else {
            const speciesURLid = character.species[0].match(/(\d+)/)[0];
            const spec = species.find(s => s.url.match(/(\d+)/)[0] === speciesURLid);
            if(spec.name === filterSpecies) return true;
            else return false;
          }
        })()
        &&
        (() => { // filter by movies
          if(filterMovie === "All") return true;
          if(filterMovie === "") return true;
          for(let m of character.films) {
            if(Number(m.slice(-2,-1)) - 1 === movies.map(m => m.title).indexOf(filterMovie)) {
              return true;
            } else {
              return false;
            }
        }})()
        &&
        (() => { // filter by data (unknown date of birth are not included in result if any of date filters applied)
          if(dateFrom === "" && dateTo) {
            return Number(character.birth_year.slice(0,-3)) >= Number(dateTo);
          } else if(dateTo === "" && dateFrom) {
            return Number(character.birth_year.slice(0,-3)) <= Number(dateFrom);
          } else if(dateFrom && dateTo) {
            return Number(dateTo) <= Number(character.birth_year.slice(0,-3)) && Number(character.birth_year.slice(0,-3)) <= Number(dateFrom);
          } else return true
        })()
      } else {
        return (() => { //filter by species
          if(filterSpecies === "All") return true;
          if(filterSpecies === "") return true;
          const characterSpecies = character.species[0];
          if(!characterSpecies) {
            return false
          } else {
            if(Number(character.species[0].match(/(\d+)/)[0]) - 1 === species.map(s => s.name).indexOf(filterSpecies)) {
              return true;
            } else {
              return false;
            }
          }
          })()
        ||
        (() => { // filter by movies
          if(filterMovie === "All") return true;
          if(filterMovie === "") return true;
          for(let m of character.films) {
            if(Number(m.slice(-2,-1)) - 1 === movies.map(m => m.title).indexOf(filterMovie)) {
              return true;
            } else {
              return false;
            }
        }})()
        ||
        (() => { // filter by data (unknown date of birth are not included in result if any of date filters applied)
          if(dateFrom === "" && dateTo) {
            return Number(character.birth_year.slice(0,-3)) >= Number(dateTo);
          } else if(dateTo === "" && dateFrom) {
            return Number(character.birth_year.slice(0,-3)) <= Number(dateFrom);
          } else if(dateFrom && dateTo) {
            return Number(dateTo) <= Number(character.birth_year.slice(0,-3)) && Number(character.birth_year.slice(0,-3)) <= Number(dateFrom);
          } else {
            return true;
          }
        })()
      }
    })
    console.log(result)
    setFilteredPeople(result);
  }


  return <FiltersContext.Provider value={{
    movies, setMovies, 
    species, setSpecies, 
    starships, setStarshipsLoaded,
    peopleLoaded, speciesLoaded, moviesLoaded, starshipsLoaded,
    filteredPeople,
    filterMovie, setFilterMovie,
    filterSpecies, setFilterSpecies,
    dateFrom, setDateFrom,
    dateTo, setDateTo,
    relation, setRelation,
    favourites, setFavourites
  }}>
    {props.children }
  </FiltersContext.Provider>
}