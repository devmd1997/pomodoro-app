/* eslint-disable react-hooks/set-state-in-effect */
'use client'

import { useEffect, useState } from "react";



interface TimerProgressProps {
    max: number;
    currentValue: number;
    isRunning: boolean;
}

export default function TimerProgress(props: TimerProgressProps) {
    const [progress, setProgress] = useState(1);
    
    useEffect(() => {
        setProgress((props.max - props.currentValue) / props.max)
    }, [props.currentValue, props.max])


    const size = 366;
    const center = size / 2;
    const radius = center - 16;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - progress);

    return (
        <svg
            className="timer-svg"
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
        >
            <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="none"
            />
            <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="var(--color-red-400)"
                strokeWidth={16}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                strokeLinecap="round"
                className={props.isRunning ? "transistion-all duration-300 ease-linear" : ''}
                transform={`rotate(-90 ${center} ${center})`}
            />
        </svg>
    )
}