import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// Fonts are served from our own site (faster than Google Fonts, and no third-party request).
// Fraunces: headings and prices. Lexend: body text. Cheetah Kick (titles) is in public/fonts.
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/lexend";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
