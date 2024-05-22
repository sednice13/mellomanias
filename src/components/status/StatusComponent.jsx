import React, { useEffect, useState } from 'react';
import { useStatus } from './StatusContext';
import { Slide } from 'react-awesome-reveal';
import styles from './styles/Statusstyles.module.css';

const StatusComponent = () => {
    const { status, message } = useStatus();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (status !== null) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 5000); 

            return () => clearTimeout(timer);
        }
    }, [status]);

    if (status === null || !visible) return null;

    const backgroundColor = status < 300 ? 'green' : 'red';

    const statusStyle = {
        backgroundColor: backgroundColor,
    };

    return (
        <Slide direction="right" triggerOnce>
            <div className={styles.statusStyles} style={statusStyle}>
                <p>{message}</p>
            </div>
        </Slide>
    );
};

export default StatusComponent;