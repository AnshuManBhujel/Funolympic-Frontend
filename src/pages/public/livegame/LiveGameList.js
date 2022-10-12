import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
const LiveGameList = () => {
  const initialState = {
    LiveGames: [],
  };
  const navigate = useNavigate();
  const [state, setState] = useState(initialState);

  const ImageList = [
    "https://news.cgtn.com/news/2021-08-01/Su-Bingtian-becomes-first-Chinese-to-enter-Olympic-men-s-100m-final-12njEzmbHCU/img/c82e6bc5e8ad4e05a6a0ef9f117aeac0/c82e6bc5e8ad4e05a6a0ef9f117aeac0.jpeg",
    "https://www.outsideonline.com/wp-content/uploads/2022/01/BiwaAyumi-Miyashita1.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/d/df/Usain_Bolt_winning-cropped.jpg",
    "https://images.pexels.com/photos/33703/relay-race-competition-stadium-sport.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://img.olympicchannel.com/images/image/private/t_social_share_thumb/f_auto/primary/qjxgsf7pqdmyqzsptxju",
    "https://static01.nyt.com/images/2022/09/12/business/10db-tennis-print/10db-tennis-01-videoSixteenByNineJumbo1600.jpg",
    "https://cdn4.explainthatstuff.com/og-large-swimming.jpg",
  ];

  useEffect(() => {
    axios
      .get("https://localhost:7084/api/Public/GetCurrentLiveGames")
      .then((response) => {
        var result = JSON.parse(response.data.value);
        console.log(result);
        var arr = [];
        var obj = {};
        for (var i = 0; i < result.length; i++) {
          obj = {
            Match_Id: result[i]["Match_Id"],
            MatchTitle: result[i]["Match_Title"],
            Image: ImageList[i],
          };
          arr.push(obj);
        }
        setState({ LiveGames: arr });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {state.LiveGames.map((game) => (
        <Grid item xs={6} sm={4} md={3} key={game.Match_Id}>
          <Card
            onClick={() => navigate(`/funolympic/watchgame/${game.Match_Id}`)}
            sx={{ maxWidth: 400, cursor: "pointer" }}
          >
            <CardMedia component="img" height="150" image={game.Image} />
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                height: 80,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {game.MatchTitle}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </>
  );
};

export default LiveGameList;
