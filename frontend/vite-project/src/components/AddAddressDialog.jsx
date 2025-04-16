import { useEffect, useRef, useState } from 'react';
import useAuth from '../hooks/useAuth';
import useApplication from '../hooks/applicationHook';

const AddAddressDialog = ({ setShowDialog, showDialog, setAddresses }) => 
{
    const {auth} = useAuth(); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {BurnToast} = useApplication();
    const dialogRef = useRef(null);


    const [newAddress, setNewAddress] = useState({
        street: '',
        city: '',
        zip: '',
        country: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewAddress((prev) => ({
        ...prev,
        [name]: value
        }));
    };

    const sendAddressData = async () => 
    {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("http://localhost:5000/api/info/addAddress", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${auth?.Access_token}`,
                },
                body: JSON.stringify(newAddress),
                credentials: "include",
            });
    
            if (!res.ok) {
                const message = await res.text();
                throw new Error(message || "Failed to add address.");
            }
            BurnToast("success","New Address Added")
    
            console.log("Address added");
        } catch (err) {
            console.error(err);
            BurnToast("error","Operation Failed, Try again")
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const getAddressData = async () => 
    {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("http://localhost:5000/api/info/getAddress", {
                method: "GET",
                headers: {
                    authorization: `Bearer ${auth?.Access_token}`,
                },
                credentials: "include",
            });
    
            if (!res.ok) {
                const message = await res.text();
                throw new Error(message || "Failed to get address.");
            }
    
            const data = await res.json();
            return data;
        } catch (err) {
            console.error(err);
            setError(err.message || "Something went wrong");
            return [];
        } finally {
            setLoading(false);
        }
    };
    
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('New Address:', newAddress);

        await sendAddressData();

        const updatedAddresses = await getAddressData();
        setAddresses(updatedAddresses.addresses); 

        setShowDialog(false);

        setNewAddress({
            street: '',
            city: '',
            zip: '',
            country: ''
        });
    };

    useEffect(()=>
    {
        const getIt = async()=>
        {
            const updatedAddresses = await getAddressData();
            setAddresses(updatedAddresses.addresses); 
        }
        getIt();
    },[])

    const checkDialogBorders = (e) => 
    {
        if ( dialogRef.current && !dialogRef.current.contains(e.target)) 
        {
            setShowDialog(false);
        }
    };

    useEffect(() => 
    {
        if (!showDialog) return;
        const timer = setTimeout(() => {
            document.addEventListener("click", checkDialogBorders);
        }, 50);
    
        return () => {
            clearTimeout(timer);
            document.removeEventListener("click", checkDialogBorders);
        };
    }, [showDialog]);

    return (
        <div className='fixed z-20 top-0 left-0 w-screen h-screen bg-gray-600/30 '>
        <div ref={dialogRef} className="relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-white text-black rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">Add New Address</h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                <label className="block text-sm font-medium">Street</label>
                <input
                    type="text"
                    name="street"
                    value={newAddress.street}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                />
                </div>
                <div>
                <label className="block text-sm font-medium">City</label>
                <input
                    type="text"
                    name="city"
                    value={newAddress.city}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                />
                </div>
                <div>
                <label className="block text-sm font-medium">Zip Code</label>
                <input
                    type='text'
                    name="zip"
                    pattern="\d*"
                    value={newAddress.zip}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                />
                </div>
                <div>
                <label className="block text-sm font-medium">Country</label>
                <input
                    type="text"
                    name="country"
                    value={newAddress.country}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                />
                </div>

                <div className="flex justify-end space-x-3 mt-4">
                <button
                    type="button"
                    onClick={() => {
                    setShowDialog(false);
                    }}
                    className="px-4 py-2 bg-gray-300 rounded"
                >
                    Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded " disabled={loading}>
                    Save Address
                </button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default AddAddressDialog;
