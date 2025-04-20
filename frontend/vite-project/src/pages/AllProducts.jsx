import React, { useEffect, useState } from 'react';
import useApplication from '../hooks/applicationHook';  
import ItemProductCard from '../components/itemCard';  
import Categories from '../components/Categories';

const AllProducts = () => {
    const { location, products, searchQuery, setSearchQuery, searchCategory, setSearchCategory} = useApplication(); 
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getSearchQuery = () =>
    {
        const urlPrams = new URLSearchParams(location.search);
        return urlPrams.get('search') || "";
    }

    const getSearchCategory = () => {
        const urlParams = new URLSearchParams(location.search);
        return urlParams.get('category') || "";
    };
    

    useEffect(() => {
        let data = products;
    
        if (searchQuery?.length > 0) {
            data = data.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
    
        if (searchCategory?.length > 0) {
            data = data.filter(product =>
                product.category?.toLowerCase() === searchCategory.toLowerCase()
            );
        }
    
        setFilteredData(data);
        setLoading(false);
    }, [products, searchQuery, searchCategory]);
    

    useEffect(()=>
    {
        const query = getSearchQuery();
        const category = getSearchCategory();
        setSearchQuery(query);
        setSearchCategory(category);
    },[location.search])

    if (loading) return (<div className="flex justify-center mt-20">Loading...</div>);
    if (!loading && filteredData.length <= 0) return (<div className="flex justify-center mt-20">No Products Available</div>);
    
    return (
        <div className='mt-16 flex flex-col gap-10'>
            <div className="flex flex-col items-end w-max group" >
                <p className='uppercase font-medium text-2xl '>{searchCategory || "All Products"}</p>
                <div className='w-[30%] h-0.5 bg-green-600 rounded-full group-hover:w-full transition-all duration-200'></div>
            </div>

            <Categories/>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-6'>
                {filteredData.length > 0 && filteredData?.filter(product => product.inStock).map((product, i) => (
                    <ItemProductCard key={i} product={product} />
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
