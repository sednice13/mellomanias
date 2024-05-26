import React from "react"
import styles from './styles/pagestyles.module.css';

const Contact = () => {
    return (
        <div className={styles.containercontact}>
            <h1 className={styles.heading}>Kontakta oss</h1>
            <p className={styles.text}>
                Vi uppskattar ditt intresse och vill gärna höra från dig! Det finns flera sätt att komma i kontakt med oss för att säkerställa att vi kan svara på dina frågor och ta emot din feedback.
            </p>
            <p className={styles.socialmedia}>
                <strong>Sociala Medier:</strong><br />
                Följ oss och skicka ett direktmeddelande (DM) på våra sociala medier. Vi är aktiva på flera plattformar och ser fram emot att interagera med dig där.
            </p>
            <p className={styles.email}>
                <strong>E-post:</strong><br />
                För mer formella förfrågningar, samarbeten eller detaljerade frågor, tveka inte att skicka ett mejl till oss på <a href="mailto:info@melomanias.se">info@melomanias.se</a>. Vi strävar efter att besvara alla mejl så snabbt som möjligt, men vänligen notera att det kan ta upp till tre arbetsdagar att få ett svar. Din förståelse och ditt tålamod uppskattas.
            </p>
            <p className={styles.text}>
                Vi värdesätter din kontakt och ser fram emot att hjälpa dig på bästa möjliga sätt. Tveka inte att nå ut till oss med dina frågor, kommentarer eller förslag. Tack för att du är en del av vår community!
            </p>
            <img src="https://i.imgur.com/wpSjCRM.png" alt="Descriptive text"    />
        </div>
    );
}

export default Contact;