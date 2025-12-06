import React, { useEffect } from "react";
import styles from "../styles/pages/_home.module.scss";

const Home = () => {

    useEffect(() => {
      document.title = "Home | TYD";
    }, []);
  return (
    <>
      <div className={styles.homeContainer}>
        <h1>Welcome to the Dream Journal</h1>
      </div>
    </>
  );
};

export default Home;