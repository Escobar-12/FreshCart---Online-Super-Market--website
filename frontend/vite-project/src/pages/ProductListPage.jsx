import React, { useEffect, useState } from 'react'
import useApplication from "../hooks/applicationHook"
import SafeImage from '../components/SafeImage';
import useAuth from '../hooks/useAuth';

const ProductListPage = () => 
{
    const { products, setProducts } = useApplication();
    const [stockProducts, setStockProducts] = useState([]);
    const { auth } = useAuth();

    useEffect(() => 
    {
        setStockProducts(products);
    }, [products]);

    const toggleProductStock = async (id, currentStock) => 
    {
        const newStock = !currentStock;

        try 
        {
            const res = await fetch("http://localhost:5000/api/product/stock", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${auth?.Access_token}`,
                },
                body: JSON.stringify({
                    id,
                    stock: newStock,
                }),
                credentials: "include"
            });

            if (!res.ok) throw new Error("Failed to update stock");

            setStockProducts(prev =>
                prev.map(product =>
                    product._id === id ? { ...product, inStock: newStock } : product
                )
            );

            setProducts(prev =>
                prev.map(product =>
                    product._id === id ? { ...product, inStock: newStock } : product
                )
            );
        } 
        catch (err) 
        {
            console.log(err);
        }
    };

    return (
        <div className="flex-1 py-10 flex flex-col justify-between">
            <div className="w-full md:p-10 p-4">
                <h2 className="pb-4 text-lg font-medium">All Products</h2>
                <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                    <table className="table-fixed sm:table-auto w-full overflow-hidden">
                        <thead className="text-gray-900 text-sm text-left">
                            <tr>
                                <th className="px-4 py-3 font-semibold truncate">Product</th>
                                <th className="px-4 py-3 font-semibold truncate">Category</th>
                                <th className="px-4 py-3 font-semibold truncate hidden sm:block">Selling Price</th>
                                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-500">
                            {stockProducts.map((product, index) => (
                                <tr key={index} className="border-t border-gray-500/20">
                                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                                        <div className="border border-gray-300 rounded p-2">
                                            <SafeImage imagePath={product.image} alt="Product" className="w-16" />
                                        </div>
                                        <span className="truncate max-sm:hidden w-full">{product.name}</span>
                                    </td>
                                    <td className="px-4 py-3">{product.category}</td>
                                    <td className="px-4 py-3 max-sm:hidden">${product.offerPrice}</td>
                                    <td className="px-4 py-3">
                                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                            <input
                                                type="checkbox"
                                                className="sr-only peer"
                                                checked={product.inStock}
                                                onChange={() => toggleProductStock(product._id, product.inStock)}
                                            />
                                            <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                                            <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ProductListPage;
