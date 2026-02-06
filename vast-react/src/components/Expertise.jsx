import { useLayoutEffect, useRef } from 'react';
import { Instagram, Youtube } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Expertise = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".expert-card", {
                scrollTrigger: {
                    trigger: ".card-grid",
                    start: "top 80%",
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const team = [
        {
            name: "TANISHQ",
            role: "Videographer",
            desc: "We don't just point and shoot. We craft visual narratives that stop the scroll instantly.",
            img: "/assets/tanishq.jpg",
            tags: ["CINEMA", "DIRECTION", "MODEL"],
            links: [
                { type: "insta", url: "https://www.instagram.com/vlogbuster_tanishq" },
                { type: "yt", url: "https://www.youtube.com/@VlogBusterTanishq" }
            ],
            pos: "center 20%"
        },
        {
            name: "VARTIKA",
            role: "Model",
            desc: "We leverage influencer networks and professional presentation to push your brand identity forward.",
            img: "/assets/vartika.jpeg",
            tags: ["AESTHETICS", "PRESENCE", "STYLE"],
            links: [
                { type: "insta", url: "https://www.instagram.com/__vartika_" },
                { type: "yt", url: "https://www.youtube.com/@veevlogs_byvartika" }
            ],
            pos: "center 30%"
        },
        {
            name: "SUMIT",
            role: "Editor",
            desc: "High-fidelity editing that retains attention. Every cut is placed to ensure maximum retention.",
            img: "/assets/sumit.jpeg",
            tags: ["SOUND DESIGN", "VFX", "PACING"],
            links: [
                { type: "insta", url: "https://www.instagram.com/the_s.r__/" }
            ],
            pos: "center center"
        }
    ];

    return (
        <section id="expertise" className="py-20 md:py-32" ref={sectionRef}>
            <div className="container mx-auto px-4 sm:px-6">
                <div className="text-center mb-16 md:mb-24">
                    <h2 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-[0.15em] uppercase text-text mb-4 whitespace-nowrap">THE VAST CORE</h2>
                    <p className="text-text-muted text-lg">Videography &nbsp;•&nbsp; Modeling &nbsp;•&nbsp; Editing</p>
                </div>

                <div className="card-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
                    {team.map((member, i) => (
                        <div key={i} className="expert-card group relative h-[500px] md:h-[600px] w-full rounded-[20px] border border-white/20 overflow-hidden transition-transform duration-500 hover:-translate-y-2">
                            {/* Background Image */}
                            <img
                                src={member.img}
                                alt={`${member.name} - ${member.role} at Vast Creative Studios Jabalpur`}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                style={{ objectPosition: member.pos }}
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/95"></div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-10 flex flex-col justify-end h-full">
                                {/* Name Badge */}
                                <div className="inline-flex items-center gap-3 bg-white/15 md:backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 self-start mb-4 transition-transform duration-300 group-hover:-translate-y-1">
                                    <span className="text-white font-bold text-sm tracking-wide">{member.name}</span>
                                    {member.links.map((link, idx) => (
                                        <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="text-white hover:scale-110 transition-transform">
                                            {link.type === 'insta' ? <Instagram size={16} /> : <Youtube size={16} />}
                                        </a>
                                    ))}
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">{member.role}</h3>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {member.tags.map((tag, t) => (
                                        <span key={t} className="bg-white/15 px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-white/10">{tag}</span>
                                    ))}
                                </div>

                                <p className="text-white/90 text-sm md:text-base leading-relaxed">{member.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Expertise;
