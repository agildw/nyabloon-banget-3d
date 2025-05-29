import { proxy } from "valtio";

const state = proxy({
  intro: false,
  color: "#353934",
  isLogoTexture: false,
  isFullTexture: false,
  logoDecal: "./superman_logo1.png",
  fullDecal: "./circuit.png",
});

export default state;
