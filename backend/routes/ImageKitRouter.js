import { Router } from "express";
import ImageKit from "imagekit";

const router = Router();


const imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/zvk2bqqlk/',
    publicKey: 'public_FdHfK7G+IU72rIhgniEYB3S//8M=',
    privateKey: 'private_z62nGs+vAw+1Ysz+eWKJwwmeAdg='
});


router.get('/auth', async function (req, res) {
    try {
        const result = imagekit.getAuthenticationParameters();
        res.json(result);
    } catch (error) {
        console.error('Error fetching ImageKit auth params:', error);
        res.status(500).send({ message: 'Error fetching ImageKit auth parameters' });
    }
});


export default router;