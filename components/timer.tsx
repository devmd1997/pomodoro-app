/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useThemeContext } from "@/lib/themeProvider";
import TimerProgress from "./timerProgress";
import { textStyle } from "@/lib/theme";
import { useEffect, useRef, useState } from "react";

type TimerState = 'running' | 'paused' | 'finished' | 'reset'

interface TimerProps {
    setTime: number
    onTimerFinished: () => void;
}

export default function Timer(props: TimerProps) {
    const {data: themeData} = useThemeContext();

    const [timerState, setTimerState] = useState<TimerState>('reset');
    const [currentTime, setCurrentTime] = useState<number>(props.setTime);
    const timerIdRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const stopTimer = () => {
        if (timerIdRef.current) {
            clearInterval(timerIdRef.current);
            timerIdRef.current = undefined;
        }
    }

    useEffect(() => {
        stopTimer();
        setCurrentTime(props.setTime);
        setTimerState('reset');
    }, [props.setTime]);

    useEffect(() => {
        if(timerState === 'finished') {
            props.onTimerFinished();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timerState])

    useEffect(() => {
        const handleSpaceBarPress = (e: KeyboardEvent) => {
            if (e.key === ' ') {
                e.preventDefault();
                handleTimerClick();
            }
        }
        document.addEventListener('keydown', handleSpaceBarPress)
        
        return () => {
            window.removeEventListener('keydown', handleSpaceBarPress)
        }
    }, [])


   const getButtonText = () => {
    switch (timerState){
        case 'reset':
            return 'Start';
        case 'finished':
            return 'Restart';
        case 'running':
            return 'Pause';
        case 'paused':
            return 'Resume';
        default:
            return 'Restart';
    }
   }

    const handleTimerClick = () => {
        if (timerState === 'reset' || timerState === 'finished') {
            setTimerState('running');
            setCurrentTime(props.setTime);
            startTimer();
        }
        if (timerState === 'running') {
            setTimerState('paused');
            stopTimer();
        }
        if (timerState === 'paused') {
            setTimerState('running');
            startTimer();
        }
    }
    

    const displayTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const formattedSeconds = seconds.toString().padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
    }

    const startTimer = () => {
        //
        stopTimer();

        timerIdRef.current = setInterval(() => {
            setCurrentTime((prev) => {
                if (prev <= 1) {
                    stopTimer();
                    setTimerState('finished');
                    return 0;
                } else {
                    return prev - 1;
                }
            })
        }, 1000);
    }

    

    useEffect(() => {
        return () => {
            stopTimer();
        }
    }, []);
    return(
        <div className="timer-container" role="timer" aria-label="timer">
            <div className="timer-inner-container" onClick={handleTimerClick}>
                <TimerProgress max={props.setTime} currentValue={currentTime} isRunning={timerState === 'running'}/>
                <div className="timer-display">
                   <h2 className={textStyle({
                    fontStyle: themeData.font,
                    textStyle: 'preset1',
                    class: 'text-blue-100'
                   })}>{displayTime(currentTime)}</h2>
                   <button className={textStyle({
                    fontStyle: themeData.font,
                    textStyle: 'preset2',
                    class: 'text-blue-100 uppercase'
                   })}>{getButtonText()}</button>
                </div>
            </div>
        </div>
    )
}