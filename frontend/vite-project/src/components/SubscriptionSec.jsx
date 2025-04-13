import useApplication from "../hooks/applicationHook";
const SubscriptionSec = () => {
    const {themeColor} = useApplication();

    return (
        <div className='mt-16 flex flex-col justify-center items-center w-full gap-2 text-center'>
            <h1 className='text-xl md:text-3xl font-semibold'>Never Miss a Deal!</h1>
            <p className='text-neutral-400/80'>Subscribe to get the latest offers, new arrivals, and exclusive discounts</p>
            <div className='border flex rounded border-neutral-300/70 mt-7 w-full max-w-2xl'>
                <input type="email" name="email_input" placeholder='Enter your email address' className='flex-1 text-neutral-300/90 ml-3 outline-none w-full '/>
                <button className={`py-2 px-4 md:px-7 bg-[${themeColor}] text-white rounded-r cursor-pointer `}>Subscribe</button>
            </div>
        </div>
    )
}

export default SubscriptionSec