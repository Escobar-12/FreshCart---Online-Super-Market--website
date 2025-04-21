import { IKContext } from "imagekitio-react";
import { useContext } from "react";

const useIK = () => useContext(IKContext);

export default useIK;