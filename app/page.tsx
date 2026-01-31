'use client'
import Podomoro from "@/components/podomoro";
import Settings from "@/components/settings";
import TabBar from "@/components/tabBar";
import Timer from "@/components/timer";
import { textStyle } from "@/lib/theme";
import { useThemeContext } from "@/lib/themeProvider";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const themeContext = useThemeContext();
  const [isSettingsVisible, setIsSettingsVisible] = useState(false)
  return (
    <main>
{ isSettingsVisible ? <Settings onCloseSettings={() => setIsSettingsVisible(false)}/> : <Podomoro onOpenSettings={() => setIsSettingsVisible(true)} />}
    </main>
  );
}
