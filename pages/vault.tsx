import {
  CircularProgress,
  Grid,
  Box,
  Typography,
  Button,
  Modal,
  Dialog,
} from "@mui/material";

import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ImageDetails } from "../components/ImageDetails";
import { getApiUrlForPath } from "../config";
import { PhotoResponse } from "../types";

const Feed: NextPage = () => {
  const [images, setPhotos] = useState<PhotoResponse[]>();
  const [error, setError] = useState<boolean>(false);
  const [imageDetails, setImageDetails] = useState<PhotoResponse>();

  const fetchPhotos = () => {
    fetch(getApiUrlForPath("photos"))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        setError(true);
      })
      .then((photos: PhotoResponse[]) => setPhotos(photos.slice(0, 50)))
      .catch(() => setError(true));
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <>
      <Head>
        <title>Fanvue | Vault</title>
        <meta
          name="description"
          content="Check out all the images that our creators made available for you for free! See how you can get access to much more!"
        />
        <meta
          property="og:description"
          content="Check out all the images that our creators made available for you for free! See how you can get access to much more!"
        />
        <meta property="og:title" content="Fanvue | Vault" />
      </Head>

      <main>
        <Box textAlign={"center"} my={8}>
          <Typography component="h1" variant="h3">
            Fanvue&apos;s Vault!
          </Typography>
        </Box>

        {(() => {
          if (!images) {
            return <CircularProgress />;
          }

          return (
            <Grid container spacing={1}>
              {images.map((image) => (
                <Grid
                  key={image.id}
                  item
                  xs={12}
                  sm={6}
                  md={3}
                  style={{ display: "flex" }}
                  alignContent="center"
                  justifyContent="center"
                >
                  <Button onClick={() => setImageDetails(image)}>
                    <img src={image.thumbnailUrl} alt={image.title} />
                  </Button>
                </Grid>
              ))}
            </Grid>
          );
        })()}
      </main>

      <Dialog
        open={Boolean(imageDetails)}
        onClose={() => setImageDetails(undefined)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {imageDetails && (
          <>
            <Box>
              <Typography id="modal-title" variant="h6" component="h2">
                {imageDetails.title}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Detailed visualization of the image {imageDetails.title}
              </Typography>
            </Box>

            <ImageDetails {...imageDetails} />
          </>
        )}
      </Dialog>
    </>
  );
};

export default Feed;
