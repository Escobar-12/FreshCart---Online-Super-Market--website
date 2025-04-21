import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useApplication from '../hooks/applicationHook';
import ItemProductCard from '../components/itemCard';
import SafeImage from '../components/SafeImage';
const ProductPage = () => 
{
    const { products, navigate, addToCart, genStars, themeColor } = useApplication();
    const { product_id } = useParams();

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const [imageError, setImageError] = useState(false);
    

    useEffect(() => 
    {
        if (products.length <= 0) return;

        const product = products.find(item => item._id === product_id);
        const related = products.filter(item => item.category === product.category);
        setRelatedProducts(related);
        setSelectedProduct(product);
        setThumbnail(product?.image?.[0] || null);
    }, [products, product_id]);

    useEffect(()=>
    {
        console.log(relatedProducts)
    },[relatedProducts])

    useEffect(() => 
    {
        if (selectedProduct) {
            window.scrollTo({top:0,behavior:"smooth"});
        }
    }, [selectedProduct]);


    if (!selectedProduct) return <div className="flex justify-center text-center mt-10">Failed To Loading Product</div>

    return (
        <div className="max-w-6xl w-full px-6 mt-15">
            <p className="text-sm text-gray-600 cursor-pointer">
                <span className="cursor-pointer" onClick={() => navigate('/')}>Home</span> /
                <span onClick={() => navigate('/products')}> Products</span> /
                <span onClick={() => navigate(`/products?category=${selectedProduct.category}`)}> {selectedProduct.category}</span> /
                <span style={{color:themeColor}}> {selectedProduct.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {selectedProduct.image?.map((img, index) => 
                        (
                            <div
                                key={index}
                                onClick={() => setThumbnail(img)}
                                className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                            >
                                <SafeImage imagePath={img} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <SafeImage imagePath={thumbnail} alt={'ProductImage'} />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{selectedProduct.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {genStars(selectedProduct.rating)}
                        <p className="text-base ml-2">({selectedProduct.rating})</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: ${selectedProduct.price}</p>
                        <p className="text-2xl font-medium text-green-600">Discount Price: ${selectedProduct.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {selectedProduct.description?.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button
                            className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                            onClick={() => addToCart(selectedProduct._id)}
                        >
                            Add to Cart
                        </button>
                        <button
                            className="w-full py-3.5 cursor-pointer font-medium text-white transition hover:brightness-90"
                            style={{background:themeColor}}
                            onClick={() => {
                                addToCart(selectedProduct._id);
                                navigate('/cart');
                            }}
                        >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            {/* Related Products */}
            <div className='flex flex-col items-center gap-5 mt-25'>
                <div className='group flex flex-col items-center w-fit gap-1'>
                    <h2 className='text-2xl font-semibold'>Related Products</h2>
                    <div className='h-0.5 w-10 group-hover:w-full transition-all duration-200' style={{background:themeColor}}></div>
                </div>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-6'>
                {relatedProducts ? 
                    (relatedProducts?.filter(product => product.inStock).slice(0,5).map((product, i) => (
                        <ItemProductCard key={i} product={product} />
                    ))
                    ):(
                        <div className="flex justify-center text-center ">Not Related Products</div>
                    )
                }
                
            </div>
            <button onClick={() => {navigate('/products'); scrollTo(0,0)} } className='cursor-pointer px-12 mt-16 py-2.5 border m-auto rounded hover:brightness-90' style={{color:themeColor}}>
                    See All
            </button>
            </div>
        </div>
    );
};

export default ProductPage;
