import { Card, CardContent, Typography } from "@mui/material";
import { CommentResponse } from "../../types";

export const Comment = ({ email, body }: CommentResponse) => {
  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant="subtitle1">{email}</Typography>
      </CardContent>

      <CardContent>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
    </Card>
  );
};
