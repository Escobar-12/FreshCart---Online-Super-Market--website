import applicationContext from "../context/applicationContext";
import { useContext } from "react";

const useApplication = () => useContext(applicationContext);
export default useApplication;