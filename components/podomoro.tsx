'use client';
import { textStyle } from "@/lib/theme";
import React, { useRef, useState } from "react";
import TabBar from "./tabBar";
import Timer from "./timer";
import Image from "next/image";
import { useThemeContext } from "@/lib/themeProvider";

interface PodomoroProps {
    onOpenSettings: () => void;
}

export type TimerType = 'Pomodoro' | 'Short Break' | 'Long Break';
export const timerTypes: Array<TimerType> = ['Pomodoro', 'Short Break', 'Long Break'];

export default function Podomoro(props: PodomoroProps) {
    const themeContext = useThemeContext();
    const [timer, setTimer] = useState(themeContext.data.pomodoroTime * 60)
    const [currentTimerType, setCurrentTimerType] = useState<TimerType>('Pomodoro');
    const shortBreak = useRef(0);


    const switchToNextTimer = () => {
        let nextTimerType = currentTimerType;
        if (currentTimerType === 'Pomodoro') {
            if (shortBreak.current < 3) {
                nextTimerType = 'Short Break';
            }
            else {
                nextTimerType = 'Long Break'
            }
        }
        if (currentTimerType === 'Short Break') {
            shortBreak.current += 1;
            nextTimerType = 'Pomodoro'
        }
        if (currentTimerType === 'Long Break') {
            shortBreak.current += 0;
            nextTimerType = 'Pomodoro'
        }

        console.log('nextTimerType:', nextTimerType)
        
        
        switch (nextTimerType) {
            case "Pomodoro":
                setTimer(themeContext.data.pomodoroTime * 60);
                break;
            case "Short Break":
                setTimer(themeContext.data.shortBreakTime * 60);
                break;
            case "Long Break":
                setTimer(themeContext.data.longBreakTime * 60);
                break;
            default:
                setTimer(themeContext.data.pomodoroTime * 60);
                break;
        }
        setCurrentTimerType(nextTimerType);
        window.alert(`${currentTimerType} finished!`);
    };

    const onSelectedTimer = (timerType: TimerType) => {
        const selectedType = timerType;
        setCurrentTimerType(selectedType);
        
        switch (timerType) {
        case "Pomodoro":
            setTimer(themeContext.data.pomodoroTime * 60);
            break
        case "Short Break":
            setTimer(themeContext.data.shortBreakTime * 60);
            break
        case "Long Break":
            setTimer(themeContext.data.longBreakTime * 60);
            break
        default:
            setTimer(themeContext.data.pomodoroTime * 60);
            break
        }
    }
  return (
    <>
    <header>
        <h1
          className={textStyle({
            fontStyle: themeContext.data.font,
            textStyle: "preset1",
            class: "text-white lowercase",
          })}
        >
          Pomodoro
        </h1>
        <TabBar  onSelectedTab={onSelectedTimer} currentTimerType={currentTimerType}/>
      </header>

      <section className="main-content" role="timerContent" aria-label="timer-content">
        <Timer setTime={timer} onTimerFinished={switchToNextTimer}/>
        <button onClick={() => props.onOpenSettings()}>
          <Image
            src="/assets/icon-settings.svg"
            alt="Settings"
            width={24}
            height={24}
            />
        </button>
      </section>
      </>
      )
}