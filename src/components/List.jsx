import React from 'react';
import { Box, Divider } from "@mui/material";
import { Filters } from "./Filters";
import { Loading } from "./Loading";
import { Item } from "./Item";
import { useFiltersContext } from './Context/FiltersContext';


export function List() {
  const {peopleLoaded, moviesLoaded, speciesLoaded, filteredPeople} = useFiltersContext();

  return <>{
    peopleLoaded && moviesLoaded && speciesLoaded 
      ? <Box sx={{ p:1 }}>
        <Filters />
        <Divider sx={{ mx: -1 }}/>
        <Box sx={{ pt: 1 }}>
          {
            filteredPeople.map(character => 
              <Item key={character.name} character={character} />
            )
          }
        </Box>
      </Box>
      : <Loading sx={{my: 2}}>Getting data...</Loading>
  }</>

  
}