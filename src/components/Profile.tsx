import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'
import Image from 'next/image';

export function Profile() {
    const { level } = useContext(ChallengesContext);

    return (
        <div className ={styles.profileContainer}>
            <Image src='/kalol.jpeg' alt='Kaloline' width={72} height={128}/>
            <div>
                <strong>Kaloline ❤️</strong>
                <p>
                    <Image src='/icons/level.svg' alt='Level' width={24} height={24}/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}