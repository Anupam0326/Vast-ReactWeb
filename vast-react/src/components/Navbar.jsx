import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import './BrutalistButton.css';

const Navbar = () => {
    // Theme State
    const [isLight, setIsLight] = useState(false);

    // Initial Theme Check
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsLight(true);
            document.body.classList.add('light-mode');
        } else {
            setIsLight(false);
            document.body.classList.remove('light-mode');
        }
    }, []);

    // Toggle Handler
    const toggleTheme = (e) => {
        // View Transition API
        if (!document.startViewTransition) {
            performToggle();
            return;
        }

        const x = e.clientX;
        const y = e.clientY;
        const endRadius = Math.hypot(
            Math.max(x, window.innerWidth - x),
            Math.max(y, window.innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            performToggle();
        });

        transition.ready.then(() => {
            document.documentElement.animate(
                {
                    clipPath: [
                        `circle(0px at ${x}px ${y}px)`,
                        `circle(${endRadius}px at ${x}px ${y}px)`
                    ]
                },
                {
                    duration: 500,
                    easing: 'ease-in',
                    pseudoElement: '::view-transition-new(root)'
                }
            );
        });
    };

    const performToggle = () => {
        if (isLight) {
            document.body.classList.remove('light-mode');
            localStorage.setItem('theme', 'dark');
            setIsLight(false);
        } else {
            document.body.classList.add('light-mode');
            localStorage.setItem('theme', 'light');
            setIsLight(true);
        }
    };

    return (
        <nav className="fixed top-0 w-full z-50 py-1 md:py-2.5 backdrop-blur-md border-b border-border transition-colors duration-300">
            <div className="container mx-auto px-1 sm:px-6 flex justify-between items-center">
                {/* Logo */}
                <div className="relative w-24 md:w-48 h-12 flex items-center">
                    <img
                        src="/assets/vastblackwebS.png"
                        alt="VAST Logo White"
                        className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ${isLight ? 'opacity-0' : 'opacity-100'}`}
                    />
                    <img
                        src="/assets/vastwhitewebS.png"
                        alt="VAST Logo Black"
                        className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ${isLight ? 'opacity-100' : 'opacity-0'}`}
                    />
                </div>

                {/* Menu */}
                <div className="flex gap-6 md:gap-8 items-center shrink-0">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-text hover:bg-pill-bg hover:rotate-12 transition-all duration-300 relative overflow-hidden focus:outline-none"
                        aria-label="Toggle Theme"
                    >
                        <Sun className={`w-5 h-5 absolute transition-all duration-500 ${isLight ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'}`} />
                        <Moon className={`w-5 h-5 absolute transition-all duration-500 ${isLight ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'}`} />
                    </button>

                    {/* Vantor Style Button - Replaced with Brutalist Button */}
                    {/* Vantor Style Button - Replaced with Plus Button Style */}
                    <a href="#contact" className="plusButton">
                        <span className="button-text">Get in Touch</span>
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
