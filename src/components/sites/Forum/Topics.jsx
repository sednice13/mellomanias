import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import styles from './styles/ChooseForum.module.css';  
import { Fade, Slide } from "react-awesome-reveal";
import { useNavigate } from 'react-router-dom'


const topicsInfo = [
  { title: "Musik", description: "Diskussioner om melodier, genrer och musikhistoria.", theme: 'music'},
  { title: "Artister", description: "Allt om dina favoritartister och band.", theme: 'artist' },
  { title: "Allmänt", description: "Övriga ämnen och allmänna diskussioner.", theme: 'general' }
];

const Topics = () => {
  let { topic } = useParams();
  


  let navigate = useNavigate()

  const handleClick = (theme) => {
    navigate(`/topics/${topic.toLowerCase()}/${theme}`)
}



  return (
    <div className={styles.topicsContainer}>
        <Slide direction="left" duration={1500}> <h1>{topic}</h1>  </Slide>
     
      <div className={styles.topicsGrid}>
        <Slide direction="right" duration={1800}> 
        {topicsInfo.map((item, index) => (
          <div key={index} className={styles.topicBox} onClick={() => handleClick(item.theme)}>
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
