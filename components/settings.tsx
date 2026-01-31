'use client';
import React, { useEffect, useReducer, useState } from "react";
import { CheckmarkIcon, CloseIcon } from "./icons";
import { useThemeContext } from "@/lib/themeProvider";
import { ColorType, FontType, settingsButtonStyle, ThemeData } from "@/lib/theme";

const SETTING_ACTIONS = {
    UPDATE_PODOMORO: 'updatePodomoroTime',
    UPDATE_SHORT_BREAK: 'updateShortBreak',
    UPDATE_LONG_BREAK: 'updateLongBreak',
    UPDATE_TIME: 'updateTime',
    UPDATE_FONT: 'updateFont',
    UPDATE_COLOR: 'updateColor'
} as const;

type SettingsAction =
    | { type: typeof SETTING_ACTIONS.UPDATE_PODOMORO; payload: number }
    | { type: typeof SETTING_ACTIONS.UPDATE_SHORT_BREAK; payload: number }
    | { type: typeof SETTING_ACTIONS.UPDATE_LONG_BREAK; payload: number }
    | { type: typeof SETTING_ACTIONS.UPDATE_TIME; payload: TimerSettings}
    | { type: typeof SETTING_ACTIONS.UPDATE_FONT; payload: FontType }
    | { type: typeof SETTING_ACTIONS.UPDATE_COLOR; payload: ColorType };

function settingsReducer(settingTheme: ThemeData, action: SettingsAction): ThemeData {
    switch (action.type) {
        case SETTING_ACTIONS.UPDATE_PODOMORO:
            return { ...settingTheme, pomodoroTime: action.payload };
        case SETTING_ACTIONS.UPDATE_SHORT_BREAK:
            return { ...settingTheme, shortBreakTime: action.payload };
        case SETTING_ACTIONS.UPDATE_LONG_BREAK:
            return { ...settingTheme, longBreakTime: action.payload };
        case SETTING_ACTIONS.UPDATE_TIME:
            const {podomoroTime: pomodoroTime, shortBreakTime, longBreakTime} = action.payload
            return {...settingTheme, pomodoroTime, shortBreakTime, longBreakTime}
        case SETTING_ACTIONS.UPDATE_FONT:
            return { ...settingTheme, font: action.payload };
        case SETTING_ACTIONS.UPDATE_COLOR:
            return { ...settingTheme, color: action.payload };
        default:
            return settingTheme;
    }
}

interface TimerSettings {
    podomoroTime: number;
    shortBreakTime: number;
    longBreakTime: number;
}

interface SettingsProps {
    onCloseSettings: () => void;
}


export default function Settings(props: SettingsProps) {
    const themeContext = useThemeContext();
    const [settingTheme, dispatch] = useReducer(settingsReducer, {...themeContext.data});

    const handleApplySettings = () => {
        themeContext.updateData(settingTheme)
        props.onCloseSettings();
    }
    return (
        <section id="settings" className="w-[327px] md:w-67.5 bg-white rounded-lg pt-3 relative" aria-labelledby="settings-title">
            <div className="settings-layout">
                <div className="settings-content">
                    <div className="settings-header">
                        <h1 id="settings-title">Settings</h1>
                        <button onClick={(e) => {
                            e.preventDefault();
                            props.onCloseSettings();
                        }}><CloseIcon /></button>
                    </div>
                    <div role="seperator" className="h-px w-full bg-grey-200" />
                    <div role="form" className="settings-form">
                       <TimeForm time={{
                        podomoroTime: settingTheme.pomodoroTime,
                        shortBreakTime: settingTheme.shortBreakTime,
                        longBreakTime: settingTheme.longBreakTime
                        }}
                        dispatch={dispatch}
                        />
                        <FontForm fontType={settingTheme.font} dispatch={dispatch} />
                        <ColorForm colorType={settingTheme.color} dispatch={dispatch}/>
                        <button className={settingsButtonStyle({fontStyle: settingTheme.font, color: settingTheme.color})} onClick={(e) => {
                            e.preventDefault();
                            handleApplySettings();
                        }}>Apply</button>
                    </div>
                </div>
            </div>
        </section>
    )
}



const TimeForm = (
    {time, dispatch}: { time: TimerSettings; dispatch: React.ActionDispatch<[action: SettingsAction]> }) => {
        const [podomoroTime, setPodomoroTime] = useState(time.podomoroTime);
        const [shortBreakTime, setShortBreakTime] = useState(time.shortBreakTime);
        const [longBreakTime, setLongBreakTime] = useState(time.longBreakTime);

        useEffect(() => {
            dispatch({type: SETTING_ACTIONS.UPDATE_TIME, payload: {podomoroTime, shortBreakTime, longBreakTime}})
        }, [podomoroTime, shortBreakTime, longBreakTime, dispatch])

            return (
                <section className="time-field">
                    <legend id="time-title">Time (Minutes)</legend>
                    <fieldset className="time-settings-set">
                        <div className="time-wrapper">
                            <label htmlFor="pomodoro-time">pomodoro</label>
                            <input type="number" id="pomodoro-time" name="pomodoro-time" min="1" max="60" 
                                value={podomoroTime} onChange={(e) => { 
                                    setPodomoroTime(parseInt(e.target.value))}}/>
                        </div>
                        <div className="time-wrapper">
                            <label htmlFor="short-break-time">short break</label>
                            <input type="number" id="short-break-time" name="pomodoro-time" min="1" max="60" 
                            value={shortBreakTime} onChange={(e) => {setShortBreakTime(parseInt(e.target.value))}}/>
                        </div>
                        <div className="time-wrapper">
                            <label htmlFor="long-break-time">long break</label>
                            <input type="number" id="long-break-time" name="pomodoro-time" min="1" max="60" 
                                value={longBreakTime} onChange={(e) => {setLongBreakTime(parseInt(e.target.value))}}
                            />
                        </div>
                    </fieldset>
            </section>
            )
    }

const FontForm = ({fontType, dispatch}: {fontType: FontType; dispatch: React.ActionDispatch<[action: SettingsAction]> }) => {
    const [selectedFontType, setSelectedFontType] = useState(fontType);
    const fontTypes: Array<FontType> = ['font1', 'font2', 'font3']

    useEffect(() => {
        dispatch({type: SETTING_ACTIONS.UPDATE_FONT, payload: selectedFontType});
    }, [selectedFontType, dispatch])
    return (
        <section className="font-form" aria-labelledby="font-form-title">
            <div className="font-form-content">
                <legend id="font-form-title">Font</legend>
                <fieldset className="font-fieldset">
                    {
                        fontTypes.map((font, index) => (
                            <input
                                key={`${font}-${index}`}
                                type="button"
                                value={"Aa"}
                                name="font-type"
                                data-fonttype={font}
                                data-selected={selectedFontType === font ? "true" : "false"}
                                onClick={() => {
                                    setSelectedFontType(font);
                                }}
                                className="font-input flex items-center justify-center"
                            />
                        ))
                    }
                </fieldset>
            </div>
        </section>
    )
}

const ColorForm = ({colorType, dispatch}: {colorType: ColorType; dispatch: React.ActionDispatch<[action: SettingsAction]>}) => {
    const [selectedColor, setSelectedColor] = useState(colorType);
    const colorTypes: Array<ColorType> = ['red', 'cyan', 'purple'];

    useEffect(() => {
        dispatch({type: SETTING_ACTIONS.UPDATE_COLOR, payload: selectedColor})
    }, [selectedColor, dispatch])

    return (
        <section className="color-field" aria-labelledby="color-form-title">
            <div className="color-form-content">
                <legend id="color-form-title">Color</legend>
                <fieldset className="color-fieldset">
                    {colorTypes.map((color, index) => (
                        <button
                            key={`${color}-${index}`}
                            type="button"
                            name="colorType"
                            value={''}
                            data-colortype={color}
                            data-selected={selectedColor === color ? 'true' : 'false'}
                            onClick={(e) => {
                                e.preventDefault();
                                setSelectedColor(color)
                            }}
                            className="color-input flex items-center justify-center"
                        >
                            {(selectedColor === color) && <CheckmarkIcon />}
                        </button>
                    ))}
                </fieldset>
            </div>
        </section>
    )
}