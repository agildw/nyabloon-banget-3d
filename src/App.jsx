import { useEffect } from "react";
import Canvas from "./canvas/index.jsx";
import Customizer from "./pages/Customizer.jsx";
import Home from "./pages/Home.jsx";
import state from "./store";
import { applyURLParamsToState } from "./config/helpers";

function App() {
  useEffect(() => {
    // Load design from URL parameters when app starts
    const loadFromURL = async () => {
      try {
        await applyURLParamsToState(state);

        // If any URL parameters were provided, automatically go to customizer
        const urlParams = new URLSearchParams(window.location.search);
        if (
          urlParams.get("design") ||
          urlParams.get("logo") ||
          urlParams.get("color")
        ) {
          state.intro = false; // This will show the customizer instead of home
        }
      } catch (error) {
        console.error("Failed to load design from URL:", error);
      }
    };

    loadFromURL();
  }, []);

  return (
    <main className="app transition-all ease-in">
      <Home />
      <Canvas />
      {/* <Customizer /> */}
    </main>
  );
}

export default App;
