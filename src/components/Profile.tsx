import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/Profile.module.css'
import Image from 'next/image';

export function Profile() {
    const { level } = useContext(ChallengesContext);

    return (
        <div className ={styles.profileContainer}>
            <Image src='/kalu.jpeg' alt='Kalu' width={120} height={160}/>
            <div>
                <strong>Kalu</strong>
                <p>
                    <Image src='/icons/level.svg' alt='Level' width={24} height={24}/>
                    Level {level}
                </p>
            </div>
        </div>
    );
}