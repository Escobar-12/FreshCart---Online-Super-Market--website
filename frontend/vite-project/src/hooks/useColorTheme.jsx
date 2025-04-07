import { useContext } from "react";
import ColorContext from "../context/colorTheme";


const useColor = () => useContext(ColorContext);

export default useColor ;