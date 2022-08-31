import {
  CardContent,
  Card,
  CircularProgress,
  CardActions,
  Button,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import { Container } from "@mui/system";

import type { NextPage } from "next";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import { Post } from "../components/Post";
import { getApiUrlForPath } from "../config";
import { PostResponse } from "../types";

const Feed: NextPage = () => {
  const [posts, setPosts] = useState<PostResponse[]>();
  const [error, setError] = useState<boolean>(false);

  const fetchPosts = () => {
    fetch(getApiUrlForPath("posts"))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        setError(true);
      })
      .then((posts) => setPosts(posts))
      .catch(() => setError(true));
  };

  const refetchPosts = useCallback(() => {
    setError(false);

    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Fanvue | Posts</title>
        <meta
          name="description"
          content="See all that's going on in Fanvue world and all the new content released by our creators."
        />
        <meta
          property="og:description"
          content="See all that's going on in Fanvue world and all the new content released by our creators."
        />
        <meta property="og:title" content="Fanvue | Posts" />
      </Head>

      <main>
        <Container maxWidth="md">
          <Box textAlign={"center"} my={8}>
            <Typography component="h1" variant="h3">
              Fanvue&apos;s Posts!
            </Typography>
          </Box>

          <Grid container spacing={1}>
            {(() => {
              if (error) {
                return (
                  <Card>
                    <CardContent>
                      Something went wrong while loading posts.
                    </CardContent>

                    <CardActions>
                      <Button onClick={refetchPosts}>Retry</Button>
                    </CardActions>
                  </Card>
                );
              }

              if (!posts) {
                return <CircularProgress />;
              }

              if (posts.length === 0) {
                return (
                  <Card>
                    <CardContent>
                      There are currently no available posts. Try again in few
                      minutes! :D
                    </CardContent>
                  </Card>
                );
              }

              return posts.map((p) => <Post mb={1} key={p.id} {...p} />);
            })()}
          </Grid>
        </Container>
      </main>
    </>
  );
};

export default Feed;
