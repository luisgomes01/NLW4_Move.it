import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'

export function Profile() {
    const { level } = useContext(ChallengesContext);

    return (
        <div className ={styles.profileContainer}>
            <img src='https://github.com/luisxx123.png' alt='Luís Gomes'/>
            <div>
                <strong>Luís Gomes</strong>
                <p>
                    <img src='icons/level.svg' alt='Level'></img>
                   Level {level}
                </p>
            </div>
        </div>
    );
}