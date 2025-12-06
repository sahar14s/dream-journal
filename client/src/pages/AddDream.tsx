import React, { useEffect, useState } from "react";
import styles from "../styles/pages/_addDream.module.scss";
import { IconButton, TextField } from "@mui/material";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import BackupOutlinedIcon from "@mui/icons-material/BackupOutlined";

type AddDreamProps = {
  onClose: () => void;
};
type MoodFromServer = {
  _id: string;
  mood: string;
};

const AddDream: React.FC<AddDreamProps> = ({ onClose }) => {
  const DateNow = new window.Date();
  const ClarityOptions = [1, 2, 3, 4, 5];
  useEffect(() => {
    document.title = "Add Dream | TYD";
    getAllMoods();
  }, []);
  const [moods, setMoods] = useState<string[]>([]);

  // const handleSubmit = async () => {

  // }
  const getAllMoods = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/dreams/mood", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch moods");
      }

      const data: MoodFromServer[] = await response.json();
      console.log("Moods fetched successfully:", data);

      // לוקחים רק את המחרוזות של ה-mood
      // ואם אתה רוצה גם בלי כפילויות:
      const uniqueMoods = Array.from(new Set(data.map((item) => item.mood)));

      setMoods(uniqueMoods);
    } catch (error) {
      console.error("Error fetching moods:", error);
    }
  };
  return (
    <>
      <div className={styles.addDreamContainer}>
        <div className={styles.addDreamContainer__header}>
          <h2>Add Your Dream Here</h2>
          <IconButton onClick={onClose}>
            {" "}
            <ExitToAppOutlinedIcon fontSize="large" sx={{ color: "#b4d3deff" }} />
          </IconButton>
        </div>
        {/* <div className={styles.addDreamContainer__form}> */}
        <form>
          <TextField
            required
            label="Title"
            variant="outlined"
            sx={{ width: 300, marginTop: 2 }}
            InputProps={{
              sx: { color: "#b4d3deff" },
            }}
            InputLabelProps={{
              sx: { color: "#ffffffff" }, // צבע ה-label אם תרצה
            }}
          />
          <Autocomplete
            options={ClarityOptions}
            sx={{ width: 300, marginTop: 2 }}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label="Clarity"
                InputProps={{
                  ...params.InputProps,
                  sx: { color: "#b4d3deff" },
                }}
                InputLabelProps={{
                  sx: { color: "#ffffffff" },
                }}
              />
            )}
          />

          <Autocomplete
            options={moods}
            sx={{
              width: 300,
              marginTop: 2,
            }}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                label="Mood"
                InputProps={{
                  ...params.InputProps,
                  sx: { color: "#b4d3deff" },
                }}
                InputLabelProps={{
                  sx: { color: "#ffffffff" },
                }}
              />
            )}
          />
          <TextField
            label="Date"
            variant="outlined"
            sx={{ width: 300, marginTop: 2 }}
            value={DateNow.toLocaleDateString()} // Display today's date
            InputProps={{
              readOnly: true, // Make it read-only
              sx: { color: "#b4d3deff" },
            }}
            InputLabelProps={{
              sx: { color: "#ffffffff" }, // צבע ה-label אם תרצה
            }}
          />
          <TextField
            required
            label="Content"
            variant="outlined"
            multiline
            rows={4}
            sx={{ width: "70%", marginTop: 2 }}
            InputProps={{
              sx: { color: "#b4d3deff" },
            }}
            InputLabelProps={{
              sx: { color: "#ffffffff" }, // צבע ה-label אם תרצה
            }}
          />
          <IconButton type="submit">
            <BackupOutlinedIcon fontSize="large" sx={{ color: "#b4d3deff" }} />
          </IconButton>
        </form>
      </div>
      {/* </div> */}
    </>
  );
};

export default AddDream;
