import React, { useEffect, useState } from "react";
import styles from "../styles/pages/_home.module.scss";
import axios from "axios";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import AddDream from "./AddDream";
const Home = () => {
  const [data, setData] = useState<any[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const handleDreams = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/dreams", {
        withCredentials: true,
      });
      console.log("GET Response:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Async/Await Error:", error);
    }
  };

  // load the dreams on page load
  useEffect(() => {
    handleDreams();
    document.title = "Home | TYD";
  }, []);

  return (
    <>
      <div className={styles.homeContainer}>
        <h1>Welcome to the Dream Journal</h1>
        <Box
          sx={{
            position: "relative",
            height: "100%",
            width: "100%",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(min(200px, 100%), 1fr))",
            gap: 3,
          }}
        >
          {data &&
            data.map((dream, index) => (
              <Card key={dream._id ?? index} variant="outlined">
                <CardMedia />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {dream.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {dream.content},{dream.mood}
                  </Typography>
                </CardContent>
              </Card>
            ))}
        </Box>
      </div>
    </>
  );
};

export default Home;
