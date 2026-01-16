import "./style.css";
import App from "./App.tsx";
import { createRoot } from "react-dom/client";
import { StrictMode, type ReactElement } from "react";


const rootElement: HTMLElement | null = document.getElementById("root");
const appSource: ReactElement = <StrictMode><App /></StrictMode>;

createRoot(rootElement!).render(appSource);
