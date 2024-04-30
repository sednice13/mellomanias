import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import styles from './styles/ChooseForum.module.css';  // Justera sökvägen efter din projektmappstruktur

const ChooseForum = () => {
  return (
    <div className={styles.container}>
      <Slide direction="left" duration={1030} triggerOnce>
        <div className={styles.slidePanel + ' ' + styles.leftPanel} > 
        <Fade duration={1700}> <h2> Melodifestevalen </h2> </Fade>
        </div>
      </Slide>
      <Slide direction="right" duration={1000} triggerOnce>
        <div className={styles.slidePanel + ' ' + styles.rightPanel} >
            <Fade duration={1700}> <h2> Eurovision </h2>  </Fade>
             </div>
      </Slide>
    </div>
  );
}

export default ChooseForum;