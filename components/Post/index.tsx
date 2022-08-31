import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Collapse,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getApiUrlForPath } from "../../config";
import { CommentResponse, PostResponse } from "../../types";
import { Comment } from "../Comment";

export const Post = ({
  id,
  title,
  body,
  mb,
}: PostResponse & { mb?: number }) => {
  const [comments, setComments] = useState<CommentResponse[]>();
  const [displayComments, setDisplayComments] = useState(false);

  useEffect(() => {
    fetch(getApiUrlForPath(`posts/${id}/comments`))
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((comments) => {
        console.log(comments);
        setComments(comments);
      });
  }, [id]);

  const totalComments = comments?.length || 0;

  return (
    <Card variant="outlined" sx={{ mb }}>
      <CardHeader title={title} />

      <CardContent>
        <Typography variant="body2">{body}</Typography>
      </CardContent>

      <CardActions sx={{ height: 32 }}>
        {!comments && <CircularProgress size={16} />}

        {totalComments > 0 && (
          <Button onClick={() => setDisplayComments((s) => !s)}>
            {totalComments} Comments
          </Button>
        )}
      </CardActions>

      <Collapse in={displayComments} timeout="auto" unmountOnExit>
        <CardContent>
          {comments?.map((comment) => (
            <Comment key={comment.id} {...comment} />
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
};
