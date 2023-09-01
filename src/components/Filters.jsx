import React from "react";
import { Box, Grid, Select, FormControl, InputLabel, MenuItem, TextField, Switch, FormControlLabel} from "@mui/material";
import { useFiltersContext } from "./Context/FiltersContext";

export function Filters() {
  const {
    species, movies, 
    filterMovie, filterSpecies, 
    setFilterMovie, setFilterSpecies, 
    dateFrom, setDateFrom, 
    dateTo, setDateTo,
    relation, setRelation
  } = useFiltersContext();


  return <Box>
    <Grid container spacing={1} sx={{ pb:1 }}>
      <Grid item xs={3} >
        <FormControl sx={{ minWidth: 100 }} fullWidth>
          <InputLabel id="movie-select-label">Movie</InputLabel>
          <Select
            labelId="movie-select-label"
            id="movie-select"
            value={filterMovie}
            label="Movie"
            onChange={event => setFilterMovie(event.target.value)}
          >
            <MenuItem value={"All"}>All</MenuItem>
            {
              movies.map(m => <MenuItem key={`${m.title}`} value={`${m.title}`}>{m.title}</MenuItem>)
            }
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3} >
        <FormControl sx={{ minWidth: 100 }} fullWidth>
          <InputLabel id="species-select-label">Species</InputLabel>
          <Select
            labelId="species-select-label"
            id="species-select"
            value={filterSpecies}
            label="Species"
            onChange={event => setFilterSpecies(event.target.value)}
          >
            <MenuItem value={"All"}>All</MenuItem>
            {
              species.map(s => <MenuItem key={`${s.name}`} value={`${s.name}`}>{s.name}</MenuItem>)
            }
            
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={2} >
        <TextField
          type="number"
          label="Date from"
          value={dateFrom}
          onChange={(event) => setDateFrom(event.target.value)}
        />
      </Grid>
      <Grid item xs={2} >
        <TextField
          type="number"
          label="Date to"
          value={dateTo}
          onChange={(event) => setDateTo(event.target.value)}
        />
      </Grid>
      <Grid item xs={2} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
        <FormControlLabel control={<Switch checked={relation} onChange={e => setRelation(e.target.checked)} />} label={relation ? "OR" : "AND"} />
      </Grid>
    </Grid>
  </Box>
}