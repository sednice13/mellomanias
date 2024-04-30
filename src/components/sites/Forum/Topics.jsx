import React from "react";
import { useParams } from "react-router-dom";
import styles from './styles/ChooseForum.module.css';  
import { Fade, Slide } from "react-awesome-reveal";

const topicsInfo = [
  { title: "Musik", description: "Diskussioner om melodier, genrer och musikhistoria." },
  { title: "Artister", description: "Allt om dina favoritartister och band." },
  { title: "Allmänt", description: "Övriga ämnen och allmänna diskussioner." }
];

const Topics = () => {
  let { topic } = useParams();

  return (
    <div className={styles.topicsContainer}>
        <Slide direction="left" duration={1500}> <h1>{topic}</h1>  </Slide>
     
      <div className={styles.topicsGrid}>
        <Slide direction="right" duration={1800}> 
        {topicsInfo.map((item, index) => (
          <div key={index} className={styles.topicBox}>
            <Fade direction="right" duration={2000}>    
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            </Fade>
          </div>
        ))}
        </Slide>
      </div>
    </div>
  );
}

export default Topics;
