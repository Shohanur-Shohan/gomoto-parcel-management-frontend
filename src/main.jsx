import React from "react";
import ReactDOM from "react-dom/client";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/theme-provider";
import "./index.css";
import { ModeToggle } from "./components/mode-toggle";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="theme">
      <div className="">
        <Button>Click me</Button>
      </div>
      <ModeToggle />
    </ThemeProvider>
  </React.StrictMode>
);
