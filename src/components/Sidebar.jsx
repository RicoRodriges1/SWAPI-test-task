import React from 'react';
import { Box, Typography, Divider } from "@mui/material";
import { useDrop } from 'react-dnd';
import { useFiltersContext } from './Context/FiltersContext';
import { FavouritesItem } from './FavouritesItem';


export function Sidebar() {
  const {favourites} = useFiltersContext();
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "Character",
    drop: () => ({ name: 'Favourites' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))

  return <Box ref={drop} sx={{ height:"100%", display: "flex", justifyContent: "flex-start", flexDirection: "column" }}>
    <Typography sx={{ mt: 3, height: 48, textAlign: "center" }}>
      Favourites
    </Typography>
    <Divider/>
    <Box>
      {
        favourites.map(f => 
          <FavouritesItem key={f.name} character={f} />
        )
      }
    </Box>
  </Box>
}