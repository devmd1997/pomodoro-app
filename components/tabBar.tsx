"use client";
import { tabBarStyle, textStyle } from "@/lib/theme";
import { useThemeContext } from "@/lib/themeProvider";
import { TimerType, timerTypes } from "./podomoro";

interface TabBarProps {
    onSelectedTab: (timerType: TimerType) => void;
    currentTimerType: TimerType;
}


export default function TabBar(props: TabBarProps) {
    const {data: themeData} = useThemeContext();

    // Derive active tab from prop if provided, otherwise use local state
    const effectiveActiveTab = timerTypes.indexOf(props.currentTimerType)

    const handleClick = (index: number) => {
        props.onSelectedTab(timerTypes[index]);
    }

    return (
        <div className="tab-list-layout" role="tablist" aria-label="List to navigate between timer modes">
            {timerTypes.map((tab, index) => (
                <button className={tabBarStyle({
                    active: effectiveActiveTab === index,
                    color: themeData.color
                })} key={index} role="tab" aria-controls={`timer-${index}`} aria-selected={effectiveActiveTab === index} onClick={() => handleClick(index)}>
                    <span className={textStyle({
                        fontStyle: themeData.font,
                        textStyle: "preset3"
                    })}>{tab}</span>
                </button>
            ))}
        </div>
    )
}