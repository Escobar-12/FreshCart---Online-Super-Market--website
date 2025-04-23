import {useEffect, useState} from 'react'
import useAuth from '../hooks/useAuth'
import useApplication from '../hooks/applicationHook';

const RequireAuth = ({allowedRoles}) => {
    const {auth} = useAuth();
    const {checkAdmin} = useApplication();
    const [check, setCheck] = useState(false);

    useEffect(() => 
    {
        const verifyAdmin = async () => 
        {
            const isAdmin = await checkAdmin();
            setCheck(isAdmin);
        };
        verifyAdmin();
    }, [auth?.user]);


    return check ? (
        <Outlet />
    ) : auth?.user ? (
        <Navigate to="/notallowed" state={{from:location}} replace={true} />
    ) 
    : (
        <Navigate to="/login" state={{from:location}} replace={true} />
    );
}

export default RequireAuth