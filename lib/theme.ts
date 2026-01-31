import { tv } from "tailwind-variants";

export const textStyle = tv({
    variants: {
        fontStyle: {
            font1: 'font-kumbh',
            font2: 'font-roboto-slab',
            font3: 'font-space-mono'
        },
        textStyle: {
            preset1: 'text-xl md:text-2xl tracking-[-5px] leading-[125%] font-bold',
            preset2: 'text-base md:text-lg tracking-[13px] leading-[120%] md:leading-[125%] font-bold',
            preset3: 'text-xs md:text-base tracking-[0px] leading[120%] md:leading-[120%] font-bold'
        }
    },
    compoundVariants: [
        {
            fontStyle: 'font2',
            textStyle: 'preset1',
            className: 'leading-[133%] md:leading[130%] tracking-[0px]'
        },
        {
            fontStyle: 'font2',
            textStyle: 'preset2',
            className: 'leading-[130%] md:leading[125%] tracking-[13px] md:tracking-[15px]'
        },
        {
            fontStyle: 'font2',
            textStyle: 'preset3',
            className: 'leading-[133%] md:leading[130%] tracking-[0px]'
        },
        {
            fontStyle: 'font3',
            textStyle: 'preset1',
            className: 'leading-[133%] md:leading-[150%] tracking-[-10px] font-normal'
        },
        {
            fontStyle: 'font3',
            textStyle: 'preset2',
            className: 'leading-[150%] tracking-[13px] md:tracking-[15px]'
        },
        {
            fontStyle: 'font3',
            textStyle: 'preset3',
            className: 'text-xs md:text-sm leading-[150%] md:leading-[145%] tracking-[0px]'
        }
    ],
    defaultVariants: {
        fontStyle: 'font1',
        textStyle: 'preset1'
    }
})

export const settingsButtonStyle = tv({
    base: "absolute -bottom-6 left-[50%] -translate-1/2 w-17.5 h-[53px] bg-red-400 text-white rounded-lg",
    variants: {
        fontStyle: {
            font1: 'font-kumbh text-sm tracking-[0px] leading-[145%] font-bold',
            font2: 'font-roboto-slab text-sm tracking-[0px] leading-[125%] font-normal',
            font3: 'font-space-mono text-sm tracking-[0px] leading-[125%] font-bold'
        },
        color: {
            red: 'bg-red-400',
            cyan: 'bg-cyan-300',
            purple: 'bg-purple-400'
        }
    },
    defaultVariants: {
        fontStyle: 'font1',
        color: 'red'
    }
})

export const tabBarStyle = tv({
    base: 'text-center w-[120px] h-[48px] lowercase text-blue-100 rounded-lg cursor-pointer',
    variants: {
        active: {
            true: 'text-blue-850',
        },
        color: {
            red: 'bg-red-400',
            cyan: 'bg-cyan-300',
            purple: 'bg-purple-400',
        }
    },
    compoundVariants: [
        {
            color: ['cyan', 'purple', 'red'],
            active: false,
            class: 'text-blue-100 bg-blue-900'
        }
    ]
})

export type FontType = 'font1' | 'font2' | 'font3';
export type ColorType = 'red' | 'cyan' | 'purple';

export interface ThemeData {
    pomodoroTime: number;
    shortBreakTime: number;
    longBreakTime: number;
    font: FontType;
    color: ColorType;
}