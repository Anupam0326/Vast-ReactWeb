import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import { Target, Clapperboard, MonitorPlay, Zap } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Roadmap = () => {
    const sectionRef = useRef(null);
    const wrapperRef = useRef(null);
    const svgRef = useRef(null);

    const beamRef = useRef(null);
    const itemsRef = useRef([]);

    // Logic to calculate snake path
    const updatePath = () => {
        if (!wrapperRef.current || !beamRef.current) return;

        const wrapper = wrapperRef.current;
        const wrapperRect = wrapper.getBoundingClientRect();
        const icons = wrapper.querySelectorAll('.roadmap-icon');

        let d = "";

        icons.forEach((icon, i) => {
            const rect = icon.getBoundingClientRect();
            // Center relative to wrapper
            const x = rect.left + rect.width / 2 - wrapperRect.left;
            const y = rect.top + rect.height / 2 - wrapperRect.top;

            if (i === 0) {
                d += `M ${x} ${y}`;
            } else {
                const prevIcon = icons[i - 1];
                const prevRect = prevIcon.getBoundingClientRect();
                const prevX = prevRect.left + prevRect.width / 2 - wrapperRect.left;
                const prevY = prevRect.top + prevRect.height / 2 - wrapperRect.top;

                const bridgeX = (prevX + x) / 2;
                const r = 20; // Corner Radius

                // Direction 1: From Prev to Bridge (Horizontal)
                // If moving Right (prevX < bridgeX), sign1 is 1. We stop at bridgeX - r.
                // If moving Left (prevX > bridgeX), sign1 is -1. We stop at bridgeX + r (which is bridgeX - (-r)).
                const sign1 = bridgeX > prevX ? 1 : -1;

                // 1. Line Out to turn point
                d += ` L ${bridgeX - (r * sign1)} ${prevY}`;

                // 2. Curve Down
                d += ` Q ${bridgeX} ${prevY}, ${bridgeX} ${prevY + r}`;

                // 3. Line Down
                d += ` L ${bridgeX} ${y - r}`;

                // Direction 2: From Bridge to Target (Horizontal)
                // If target is Right of bridge (x > bridgeX), sign2 is 1. We curve to bridgeX + r.
                const sign2 = x > bridgeX ? 1 : -1;

                // 4. Curve In
                d += ` Q ${bridgeX} ${y}, ${bridgeX + (r * sign2)} ${y}`;

                // 5. Line to Target
                d += ` L ${x} ${y}`;
            }
        });

        beamRef.current.setAttribute('d', d);

        const length = beamRef.current.getTotalLength();

        // Setup Beam Path (Full Draw)
        beamRef.current.style.strokeDasharray = length;
        beamRef.current.style.strokeDashoffset = length; // Start hidden

        return { length };
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Initial Path Draw
            const { length } = updatePath();

            // 1. Animate Beam (Draw and Collaborate)
            gsap.to(beamRef.current, {
                strokeDashoffset: 0,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "power1.inOut",
                repeatDelay: 0.5
            });

            // Animate Items (Fade Only)
            itemsRef.current.forEach((item) => {
                if (item) {
                    gsap.fromTo(item,
                        { opacity: 0 },
                        {
                            opacity: 1,
                            duration: 0.8,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: item,
                                start: "top 85%",
                                toggleActions: "play none none reverse"
                            }
                        }
                    );
                }
            });

        }, sectionRef);

        const handleResize = () => {
            updatePath();
            ScrollTrigger.refresh();
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('load', handleResize);

        return () => {
            ctx.revert();
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', handleResize);
        };
    }, []);

    // Fallback to update path after render
    useEffect(() => {
        const timer = setTimeout(updatePath, 500);
        return () => clearTimeout(timer);
    }, []);

    const [isMobile, setIsMobile] = useState(false);

    useLayoutEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const steps = [
        {
            title: "Discovery & Vision",
            desc: "We meet on-site to understand your vision and explore your space. We then translate your needs into a visual plan that defines your brand’s aesthetic.",
            Icon: Target,
            side: "left",
            img: "/assets/discovery-vision.svg"
        },
        {
            title: "Expert Shooting",
            desc: "Focused on professional framing and creative direction. We capture your space through sharp, cinematic shots that create high-quality visuals.",
            Icon: Clapperboard,
            side: "right",
            img: "/assets/expert-shooting.svg"
        },
        {
            title: "Post-Production",
            desc: "We turn raw footage into art. Our editing, transitions, and color grading transform your shots into high-impact content built to grab attention.",
            Icon: MonitorPlay,
            side: "left",
            img: "/assets/post-production.svg"
        },
        {
            title: "Deployment",
            desc: "No delays, just results. We deliver a consistent supply of aesthetic content to keep your brand active and polished.",
            Icon: Zap,
            side: "right",
            img: "/assets/deployment.svg"
        }
    ];

    return (
        <section id="roadmap" className="py-20 md:py-32 overflow-hidden relative" ref={sectionRef}>
            <div className="container mx-auto px-2 sm:px-6">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-4xl md:text-6xl font-extrabold tracking-[0.15em] uppercase text-text mb-4">SERVICES</h2>
                    <p className="text-text-muted text-lg">From brain to frame</p>
                </div>

                <div className="relative max-w-6xl mx-auto py-5 flex flex-col gap-12 md:gap-20" ref={wrapperRef}>
                    {/* SVG Line */}
                    <svg className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-visible z-10" ref={svgRef} strokeLinecap="round" strokeLinejoin="round">
                        {/* Traveling Beam */}
                        <path ref={beamRef} d="M 0 0" fill="none" stroke="currentColor" strokeWidth="2" className="text-highlight drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    </svg>

                    {steps.map((step, i) => (
                        <div
                            key={i}
                            ref={el => itemsRef.current[i] = el}
                            className={`relative z-20 w-[42%] md:w-[45%] ${step.side === 'left' ? 'mr-auto md:text-right pr-0 md:pr-16' : 'ml-auto md:text-left pl-0 md:pl-16'}`}
                        >
                            <div className="bg-pill-bg md:backdrop-blur-md border border-border rounded-[12px] md:rounded-[20px] p-4 md:p-10 min-h-[140px] md:min-h-[220px] flex flex-col justify-center relative group">
                                {/* Background Image */}
                                {step.img && (
                                    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none rounded-[12px] md:rounded-[20px] overflow-hidden">
                                        <img src={step.img} alt="" className="w-full h-full object-cover grayscale block" />
                                    </div>
                                )}

                                {/* Icon */}
                                <div className={`roadmap-icon absolute top-1/2 -translate-y-1/2 w-[36px] h-[36px] md:w-[60px] md:h-[60px] bg-surface border-2 border-border rounded-full flex items-center justify-center text-text shadow-lg z-30 transition-all duration-300
                                    ${step.side === 'left' ? '-right-[18px] md:-right-[30px]' : '-left-[18px] md:-left-[30px]'}
                                `}>
                                    <step.Icon size={isMobile ? 18 : 28} />
                                </div>

                                {/* Connector Line */}
                                <div className={`absolute top-1/2 -translate-y-1/2 w-[15px] md:w-[25px] h-[1px] bg-border z-0
                                     ${step.side === 'left' ? '-right-[15px] md:-right-[25px]' : '-left-[15px] md:-left-[25px]'}
                                `}></div>

                                <div className="text-content relative z-10">
                                    <h3 className="text-sm sm:text-base md:text-2xl font-bold text-text mb-2 transition-all">{step.title}</h3>
                                    <p className="text-text-muted text-[10px] sm:text-xs md:text-base mt-1 md:mt-2 leading-snug">{step.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Roadmap;
