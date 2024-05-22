import React from "react";
import styles from './styles/pagestyles.module.css';
import { Fade, Slide } from "react-awesome-reveal";


const Home = () => {
    return (
        <div className={styles.container}>
          <Fade  delay={500} duration={3000} cascade damping={1e-1}>   
            <img src='https://i.imgur.com/wpSjCRM.png' alt="Logotyp" className={styles.logo} />
            </Fade>
            <Slide  duration={3000} direction="up" > 
            <div className={styles.followus}>Följ oss</div>
            <div className={styles.sociallinks}>
                <div className={styles.sociallink}>
                    <span>Instagram</span>
                    <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png' alt="Instagram" />
                </div>
                <div className={styles.sociallink}>
                    <span>TikTok</span>
                    <img src='https://static.vecteezy.com/system/resources/previews/023/986/921/non_2x/tiktok-logo-tiktok-logo-transparent-tiktok-icon-transparent-free-free-png.png' alt="TikTok" />
                </div>
            </div>
            </Slide>
        </div>
    );
}

export default Home;