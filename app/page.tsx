import { textStyle } from "@/lib/theme";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center w-full">
      <h1
        className={textStyle({
          fontStyle: "font1",
          textStyle: "preset2",
          class: "text-white",
        })}
      >
        Pomodoro
      </h1>
    </div>
  );
}
