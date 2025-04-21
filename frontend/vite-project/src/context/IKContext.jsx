import { IKContext, IKUpload } from "imagekitio-react";
import useApplication from "../hooks/applicationHook";

const UploadImage = ({ fileName = "default.png", onSuccess, onError, children }) => {
    const { imageKitConfig } = useApplication();

    return (
        <IKContext {...imageKitConfig}>
            <IKUpload
                fileName={fileName}
                onSuccess={onSuccess}
                onError={onError}
                useUniqueFileName={true}
                validateFile={true}
                folder="/uploads"
                className="hidden"
            />
            {children}
        </IKContext>
    );
};

export default UploadImage;
