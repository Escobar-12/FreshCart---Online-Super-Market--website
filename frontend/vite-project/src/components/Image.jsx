import { IKImage } from 'imagekitio-react';

const Image = ({ path, className, w = 500, h = 500, alt="default" })=>
{
    return (
        <IKImage 
            urlEndpoint={"https://ik.imagekit.io/zvk2bqqlk/"} 
            path={path} 
            alt={alt} 
            className={className} 
            loading='lazy' 
            lqip={{active:true, quality:20}}
            width={w}
            height={h}
            transformation={[
                { width: w, height: h, focus: "center" }
            ]}
        />
    );
}
export default Image;