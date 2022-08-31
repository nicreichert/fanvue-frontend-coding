import { CircularProgress, Grid } from "@mui/material";
import { useState } from "react";
import { PhotoResponse } from "../../types";

export const ImageDetails = ({ title, url }: PhotoResponse) => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <img src={url} alt={title} onLoad={() => setLoading(false)} />

      {loading && (
        <Grid container sx={{ width: 600, height: 600 }}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={30} />
          </Grid>
        </Grid>
      )}
    </>
  );
};
