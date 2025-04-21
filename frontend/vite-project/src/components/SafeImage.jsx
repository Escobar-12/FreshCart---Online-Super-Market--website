import React, { useEffect, useState } from 'react';
import Image from './Image';

const SafeImage = ({ imagePath, alt, className }) => {
    const [imageError, setImageError] = useState(false);

    useEffect(()=>
    {
        setImageError(false);
    },[imagePath])

    return !imageError ? (
        <img
            className={className}
            src={`/assets/${imagePath}.png`}
            alt={alt}
            onError={() => setImageError(true)}
        />
    ) : (
        <Image
            path={imagePath}
            alt={alt}
            className={className}
        />
    );
};

export default SafeImage;
