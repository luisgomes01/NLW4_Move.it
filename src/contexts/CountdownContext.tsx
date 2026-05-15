import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

const CHALLENGE_DURATION = 25 * 60; // 25 minutes

interface CountdownContextData {
    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

let countdownTimeout: NodeJS.Timeout;

export const CountdownContext = createContext({} as CountdownContextData)

export function CountdownProvider( {children} : CountdownProviderProps ){
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(CHALLENGE_DURATION);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    const startTimeRef = useRef(0);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown () {
        setIsActive(true);
        startTimeRef.current = Date.now();
    }

    function resetCountdown(){
        setIsActive(false);
        clearTimeout(countdownTimeout); 
        setTime (CHALLENGE_DURATION);
        setHasFinished(false);
    }

    useEffect(() => {
        if (isActive) {
            countdownTimeout = setInterval(() => {
                const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
                const remaining = Math.max(0, CHALLENGE_DURATION - elapsed);
                setTime(remaining);

                if (remaining <= 0) {
                    clearInterval(countdownTimeout);
                    setHasFinished(true);
                    setIsActive(false);
                    startNewChallenge();
                }
            }, 500);
        }

        return () => clearTimeout(countdownTimeout);
    }, [isActive])

    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown,
        }}>
            {children}
        </CountdownContext.Provider>
    )
}