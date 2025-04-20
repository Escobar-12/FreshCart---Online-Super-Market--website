import React, { useEffect, useState } from 'react'
import useAuth from '../hooks/useAuth'
import useApplication from '../hooks/applicationHook';


const Categories = [{ name: 'Vegetables' },
    { name: 'Bakery' },
    { name: 'Fruits' }, 
    { name: 'Grains' }, 
    { name: 'Dairy' }, 
    { name: 'Instant' }, 
    { name: 'Drinks' } ]



const SellerMainPage = () => {
    const {auth} = useAuth();
    const {BurnToast, navigate, location} = useApplication();
    const from = location.state?.from?.pathname || "/"

    const checkSeller = async () =>
    {
        const res = await fetch("http://localhost:5000/api/seller/");
        if(!res.ok) return false;

    }

    // useEffect(()=>
    // {
    //     const isAdmin = checkSeller();
    //     if(!isAdmin)
    //     {
    //         BurnToast("error", "User Not Allowed");
    //         navigate(from,{replace:true})
    //     }
    // },[auth])

    const [images, setImages] = useState([]);

    const handleImageChange = (e, index) => 
    {
        const img = e.target.files[0];
        if (!img) return;
    
        const url = URL.createObjectURL(img);
        const updated = [...images];
        updated[index] = url;
        setImages(updated.slice(0, 4)); 
    };

    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [offer, setOffer] = useState(0);
    const [price, setPrice] = useState(0);

    const handleSubmit = async (e)=>
    {
        e.preventDefault();
        if (!productName || !category || !description || !price || !offer || images.length === 0) 
        {
            BurnToast("error", "All fields are required");
            return;
        }

        try 
        {
            const res = await fetch("http://localhost:5000/api/product/addProduct", {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                    authorization: `Bearer ${auth?.Access_token}`,
                },
                body: JSON.stringify({
                    name: productName,
                    category: category,
                    price: 2.99,
                    offerPrice: 1.99,
                    image: images,
                    description: [
                        "Fresh organic apples grown without pesticides.",
                        "Perfect for snacking or making pies."
                    ],
                    inStock: true
                }),
                credentials: "include",
            });
            const data = await res.json();
            if (!res.ok) return console.log(data.message);

            BurnToast("success", "New Product Posted");
        } 
        catch (err) 
        {
            console.log(err);
            BurnToast("error", "Error While Submitting");
        }
    }


    useEffect(() => {
        return () => {
            images.forEach((img) => {
                if (img && img.startsWith("blob:")) {
                    URL.revokeObjectURL(img);
                }
            });
        };
    }, [images]);
    
    return (
        <div className=" flex flex-col justify-between bg-white text-gray-500/80">
            <form className="md:p-10 p-4 space-y-5 max-w-lg" onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {Array(4).fill('').map((_, index) => (
                            <label key={index} htmlFor={`image${index}`} className='border border-gray-400 border-dashed cursor-pointer'>
                                <input
                                    accept="image/*"
                                    type="file"
                                    id={`image${index}`}
                                    hidden
                                    onChange={(e) => handleImageChange(e, index)}
                                />
                                <img
                                    className="max-w-24 h-16 overflow-hidden object-cover"
                                    src={images[index] || "/assets/default-featured-image.png.jpg"}
                                    alt="uploadArea"
                                    width={100}
                                    height={100}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="productName">Product Name</label>
                    <input id="productName" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" placeholder="Type here" onChange={(e) => setProductName(e.target.value)}/>
                </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="productDescription">Product Description</label>
                    <textarea id="productDescription" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here" onChange={(e) => setDescription(e.target.value)} ></textarea>
                </div>

                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        {Categories.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className='flex items-center gap-5 flex-wrap'>     
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="productPrice">Product Price</label>
                        <input type="number" defaultValue={0} name="productPrice" id="productPrice" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required  onChange={(e) => setPrice(e.target.value)}/>
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offerPrice">Offer Price</label>
                        <input type="number" defaultValue={0} name="offerPrice" id="offerPrice" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required  onChange={(e) => setOffer(e.target.value)}/>
                    </div>
                </div>

                <button onClick={(e) => handleSubmit(e)} className='px-8 py-2.5 cursor-pointer hover:bg-green-700 bg-green-500 text-white font-medium rounded'>ADD</button>
            </form>
        </div>
    )
}

export default SellerMainPage