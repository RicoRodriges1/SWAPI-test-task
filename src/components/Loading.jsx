import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";


export function Loading(props) {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
      <Box mb={2}>
        <CircularProgress/>
      </Box>
      <div>
        {typeof props.children == "string"
          ? <Typography variant="body1">{props.children}</Typography>
          : props.children}
      </div>
    </Box>
  )

}