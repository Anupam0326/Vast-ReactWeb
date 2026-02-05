import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import RotatingText from './RotatingText';

const Hero = () => {
    const comp = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".hero-title", {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                stagger: 0.2
            });

            gsap.from(".hero-sub", {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: "power3.out"
            });

            gsap.from(".marquee-container", {
                opacity: 0,
                duration: 1,
                delay: 0.8
            });
        }, comp);
        return () => ctx.revert();
    }, []);

    return (
        <div ref={comp}>
            <header className="min-h-[85vh] flex flex-col justify-center pt-24 pb-12 container mx-auto px-4 sm:px-6">
                <h1 className="hero-title text-2xl sm:text-4xl md:text-7xl lg:text-7xl font-semibold leading-[1.1] tracking-tighter mb-6">
                    <span className="whitespace-nowrap block mb-4">We don’t just build presence.</span>
                    We make it <RotatingText
                        texts={['AESTHETIC', 'CINEMATIC', 'SPECTACULAR', 'VAST']}
                        mainClassName="inline-flex px-2 sm:px-2 md:px-3 text-highlight overflow-hidden py-0 sm:py-0 justify-center rounded-lg text-left"
                        staggerFrom={"last"}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-120%" }}
                        staggerDuration={0.025}
                        splitLevelClassName="overflow-hidden pb-0 sm:pb-0"
                        transition={{ type: "spring", damping: 30, stiffness: 400 }}
                        rotationInterval={2000}
                    />
                </h1>
                <p className="hero-sub text-lg md:text-2xl text-text-muted font-light max-w-2xl">
                    A production powerhouse transforming your brand into city-wide icons.
                </p>
            </header>

            {/* Marquee */}
            <div className="marquee-container bg-surface py-3 border-y border-border overflow-hidden flex">
                <div className="animate-marquee whitespace-nowrap flex items-center">
                    {/* Render content twice for seamless loop */}
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center shrink-0">
                            <span className="mx-6 md:mx-10 text-text font-bold text-sm md:text-lg tracking-widest text-text-muted">CINEMATIC</span> <span className="text-text-muted">•</span>
                            <span className="mx-6 md:mx-10 text-text font-bold text-sm md:text-lg tracking-widest text-text-muted">AESTHETIC</span> <span className="text-text-muted">•</span>
                            <span className="mx-6 md:mx-10 text-text font-bold text-sm md:text-lg tracking-widest text-text-muted">INSTAGRAM REELS</span> <span className="text-text-muted">•</span>
                            <span className="mx-6 md:mx-10 text-text font-bold text-sm md:text-lg tracking-widest text-text-muted">YOUTUBE SHORTS</span> <span className="text-text-muted">•</span>
                            <span className="mx-6 md:mx-10 text-text font-bold text-sm md:text-lg tracking-widest text-text-muted">VISUALS</span> <span className="text-text-muted">•</span>
                            <span className="mx-6 md:mx-10 text-text font-bold text-sm md:text-lg tracking-widest text-text-muted">CINEMATIC</span> <span className="text-text-muted">•</span>
                            <span className="mx-6 md:mx-10 text-text font-bold text-sm md:text-lg tracking-widest text-text-muted">AESTHETIC</span> <span className="text-text-muted">•</span>
                            <span className="mx-6 md:mx-10 text-text font-bold text-sm md:text-lg tracking-widest text-text-muted">INSTAGRAM REELS</span> <span className="text-text-muted">•</span>
                            <span className="mx-6 md:mx-10 text-text font-bold text-sm md:text-lg tracking-widest text-text-muted">YOUTUBE SHORTS</span> <span className="text-text-muted">•</span>
                            <span className="mx-6 md:mx-10 text-text font-bold text-sm md:text-lg tracking-widest text-text-muted">VISUALS</span> <span className="text-text-muted">•</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Hero;
