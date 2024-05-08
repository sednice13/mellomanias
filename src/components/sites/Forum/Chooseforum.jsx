import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import styles from './styles/ChooseForum.module.css';
import { useNavigate } from 'react-router-dom'

const ChooseForum = () => {

    let navigate = useNavigate()

    const handleClick = (topic) => {
      
        navigate(`/topics/${topic}`)
    }
  return (
    <div className={styles.container}>
      <Slide direction="left" duration={1030} triggerOnce>
        <div className={styles.slidePanel + ' ' + styles.leftPanel} onClick={() => handleClick('Melodifestevalen')} > 
        <Fade duration={1700}> <h2> Melodifestevalen </h2> </Fade>
        </div>
      </Slide>
      <Slide direction="right" duration={1000} triggerOnce>
        <div className={styles.slidePanel + ' ' + styles.rightPanel} onClick={() => handleClick('Eurovision')} >
            <Fade duration={1700}> <h2> Eurovision </h2>  </Fade>
             </div>
      </Slide>
    </div>
  );
}

export default ChooseForum;