import React from 'react';
import { assets, footerLinks } from '../../public/assets/assets'
import { Link } from 'react-router-dom';

const FooterSec = () => {
    return (
        <footer className="py-10 bg-[#eef9f4] w-full text-neutral-500">
            <div className="flex flex-col max-w-[1240px] mx-auto px-4 md:px-8 lg:px-16 gap-4">
                <div className="flex flex-col lg:flex-row justify-between items-start mb-10 gap-10">
                    <div className="flex flex-col gap-5 max-w-sm">
                        <Link to="/" className='w-fit' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                            <img src={assets.logo} alt="logo" className="shrink-0 w-25 cursor-pointer" />
                        </Link>
                        <p className="text-sm tracking-tight">
                            We deliver fresh groceries and snacks straight to your door.
                            Trusted by thousands, we aim to make your shopping experience simple and affordable.
                        </p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-lg:w-full">
                        {footerLinks.map((sec, i) => (
                            <div key={i} className="flex flex-col gap-4 w-fit">
                                <h4 className="font-semibold text-black">{sec.title}</h4>
                                <div className="flex flex-col gap-2 text-nowrap overflow-hidden w-fit">
                                    {sec.links.map((link, j) => (
                                        <Link key={j} to={link.url} className="text-sm hover:underline">
                                            {link.text}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <hr />
                <div className="text-center">
                    <p>© 2025 Your Company. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default FooterSec;
