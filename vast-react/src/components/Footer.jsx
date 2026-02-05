import React from 'react';

const Footer = () => {

    // 3D Button Component
    const ThreeDButton = ({ children, href }) => {
        return (
            <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group relative w-[140px] h-[50px] inline-block cursor-pointer outline-none select-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
            >
                {/* Bottom Layer (Depth) */}
                <div className="absolute top-[10px] left-0 w-full h-full bg-[#d4d4d4] rounded-[26px] border-2 border-black z-0">
                    <div className="absolute w-[2px] h-[9px] bg-black bottom-0 left-[15%]"></div>
                    <div className="absolute w-[2px] h-[9px] bg-black bottom-0 left-[85%]"></div>
                </div>

                {/* Top Layer (Face) */}
                <div className="relative w-full h-full bg-white rounded-[26px] border-2 border-black flex items-center justify-center font-bold text-black text-base z-10 transition-transform duration-200 group-active:translate-y-[10px] overflow-hidden">
                    {children}
                    {/* Shine Effect */}
                    <div className="absolute top-0 w-[15px] h-full bg-black/10 -skew-x-[30deg] -left-[20px] transition-all duration-500 group-hover:left-[150%]"></div>
                </div>
            </a>
        );
    };

    return (
        <footer id="contact" className="py-20 md:py-32 text-center border-t border-border">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter mb-6">Contact us here</h2>
                <p className="text-text-muted text-lg md:text-xl mb-12">we are just one click away</p>

                <a href="mailto:vast.business.official@gmail.com" className="block text-[4.2vw] md:text-3xl lg:text-4xl font-bold mb-16 hover:opacity-70 transition-opacity whitespace-nowrap px-4">
                    vast.business.official@gmail.com
                </a>

                <div className="flex flex-wrap justify-center gap-8 mb-16">
                    <ThreeDButton href="https://www.instagram.com/vast_creative.studios?igsh=MWM0MDAzZ3owY2Jkbg==">Instagram</ThreeDButton>
                    <ThreeDButton href="https://wa.me/918827706855?text=Hi%20VAST%20Creative%20Studios,%20I'm%20interested%20in%20your%20services">WhatsApp</ThreeDButton>
                    <ThreeDButton href="https://www.linkedin.com/company/vast-creative-studios/">LinkedIn</ThreeDButton>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-text-muted text-sm border-t border-white/10 pt-8">
                    <span>© 2026 VAST Creative Studios</span>
                    <span>Jabalpur, India</span>
                </div>
            </div>


        </footer>
    );
};

export default Footer;