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

export interface ThemeData {
    pomodoroTime: number;
    shortBreakTime: number;
    longBreakTime: number;
    font: 'font1' | 'font2' | 'font3';
    color: 'red' | 'blue' | 'purple'
}