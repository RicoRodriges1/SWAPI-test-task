import React from "react";
import { ListItem, ListItemButton, Dialog, Typography, DialogContent } from "@mui/material";
import { useFiltersContext } from './Context/FiltersContext';


export function FavouritesItem(props) {
  const {character} = props;
  const {species, movies, starships} = useFiltersContext();
  const [open, setOpen] = React.useState(false);

  const getSpecies = () => {
    if(!character.species[0]) return "unknown";
    const speciesURLid = character.species[0].match(/(\d+)/)[0];
    const spec = species.find(s => s.url.match(/(\d+)/)[0] === speciesURLid);
    return spec.name;
  }
  const getMovies = () => {
    let films = ""
    for(let m of character.films) {
      films = films + ` "${(movies.map(m => m.title)[Number(m.slice(-2,-1)) - 1])}"`;
    }
    return films;
  }
  const getStarships = () => {
    if(!character.starships[0]) return "unknown";
    let ships = ""
    for(let s of character.starships) {
      const starshipURLid = s.match(/(\d+)/)[0];
      
      const starship = starships.find(s => s.url.match(/(\d+)/)[0] === starshipURLid)
      console.log(character, starships, starshipURLid )
      ships = ships + ` "${starship.name}"`
    }
    return ships;
  }


  return <>
    <ListItem key={character.name} component="div" disablePadding >
      <ListItemButton >
        <Typography onClick={() => setOpen(true)}>
          {character.name}
        </Typography>
      </ListItemButton>
    </ListItem>
    <Dialog onClose={() => setOpen(false)} open={open}>
      <DialogContent>
        <Typography>
          NAME: {character.name}
        </Typography>
        <Typography>
          SPECIES: {getSpecies()}
        </Typography>
        <Typography>
          FILMS: {getMovies()}
        </Typography>
        <Typography>
          STARSHIPS: {getStarships()}
        </Typography>
      </DialogContent>
    </Dialog>
  </>
  }