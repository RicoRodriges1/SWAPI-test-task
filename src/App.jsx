import React from "react";
import { Paper, Divider, Grid } from "@mui/material";
import { List } from "./components/List";
import { Sidebar } from "./components/Sidebar";
import { FiltersContextProvider } from "./components/Context/FiltersContext";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
 
export function App() {
  return <>
    <DndProvider backend={HTML5Backend}>
      <FiltersContextProvider>
        <Paper sx={{ m: 20 }} elevation={5}>
          <Grid container spacing={0}>
            <Grid item xs={10}>
              <List />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs>
              <Sidebar />
            </Grid>
          </Grid>
        </Paper>
      </FiltersContextProvider>
    </DndProvider>
  </>
}

  


