'use client';
import { createContext, useContext, useState } from "react";
import { ThemeData } from "./theme";
import React, {ReactNode} from "react";

const initialThemeData:ThemeData = {
    pomodoroTime: 25,
    shortBreakTime: 5,
    longBreakTime: 15,
    font: 'font1',
    color: 'red'
}

interface ThemeContextType {
    data: ThemeData;
    updateData: (newData: ThemeData) => void;
}


const ThemeContext = createContext<ThemeContextType| undefined>(undefined);

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a ThemeProvider');
    }
    return context;
}

export const ThemeProvider = ({children}: {children: ReactNode}) => {
    const [data, setData] = useState<ThemeData>(initialThemeData);

    const updateData = (newData: ThemeData) => {
        setData({...newData});
    }

    const contextValue = {
        data,
        updateData
    }

    return (
        <ThemeContext.Provider value={contextValue}>
            {children}
        </ThemeContext.Provider>
    );
}