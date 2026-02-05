// 1. THEME TOGGLE LOGIC
const themeBtn = document.getElementById('theme-toggle');
const body = document.body;

// Check LocalStorage
if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
}

themeBtn.addEventListener('click', (event) => {
    // 1. Fallback for browsers that don't support View Transitions
    if (!document.startViewTransition) {
        toggleTheme();
        return;
    }

    // 2. Get the click position (center of the circle)
    const x = event.clientX;
    const y = event.clientY;

    // 3. Calculate distance to the furthest corner
    const endRadius = Math.hypot(
        Math.max(x, innerWidth - x),
        Math.max(y, innerHeight - y)
    );

    // 4. Start the transition
    const transition = document.startViewTransition(() => {
        toggleTheme(); // This is the actual theme switch function
    });

    // 5. Animate the circle clip-path
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
});

// Helper function to keep code clean
function toggleTheme() {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
}

// 2. SCROLL ANIMATION
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el));

// 3. MAGNETIC BUTTONS (Direction Aware)
const buttons = document.querySelectorAll('.magnetic-btn');

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function (e) {
        const dir = getDirection(e, this);
        this.classList.remove('in-top', 'in-right', 'in-bottom', 'in-left');
        switch (dir) {
            case 0: this.classList.add('in-top'); break;
            case 1: this.classList.add('in-right'); break;
            case 2: this.classList.add('in-bottom'); break;
            case 3: this.classList.add('in-left'); break;
        }
        void this.offsetWidth;
        this.classList.add('hover');
    });

    btn.addEventListener('mouseleave', function (e) {
        const dir = getDirection(e, this);
        this.classList.remove('hover');
        this.classList.remove('in-top', 'in-right', 'in-bottom', 'in-left');
        switch (dir) {
            case 0: this.classList.add('in-top'); break;
            case 1: this.classList.add('in-right'); break;
            case 2: this.classList.add('in-bottom'); break;
            case 3: this.classList.add('in-left'); break;
        }
    });
});

function getDirection(e, item) {
    const w = item.offsetWidth;
    const h = item.offsetHeight;
    const rect = item.getBoundingClientRect();
    const x = (e.clientX - rect.left - (w / 2)) * (w > h ? (h / w) : 1);
    const y = (e.clientY - rect.top - (h / 2)) * (h > w ? (w / h) : 1);
    const direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
    return direction;
}

// 4. ROADMAP INTERACTION
const roadmapCards = document.querySelectorAll('.roadmap-content');

roadmapCards.forEach(card => {
    card.addEventListener('click', function () {
        // Option 1: Accordion Style (Close others) - Uncomment to enable
        // roadmapCards.forEach(c => {
        //     if (c !== this) c.classList.remove('expanded');
        // });

        // Option 2: Toggle Independent (User request: "remains like that")
        this.classList.toggle('expanded');
    });
});

// 5. GSAP SCROLL & SNAKE ANIMATION
document.addEventListener("DOMContentLoaded", (event) => {
    gsap.registerPlugin(ScrollTrigger);

    const roadmapSection = document.getElementById('roadmap');
    const svg = document.querySelector('.snake-svg');
    const path = document.querySelector('.snake-path');
    const items = document.querySelectorAll('.roadmap-item');
    const icons = document.querySelectorAll('.roadmap-icon');

    function updatePath() {
        // if (window.innerWidth < 768) return; // Enabled on mobile now

        // Get relative coordinates
        const wrapperRect = document.querySelector('.roadmap-wrapper').getBoundingClientRect();

        // Ensure SVG matches wrapper size conceptually (since we use pixels)
        // We removed viewBox, so it uses pixel units matching the screen.

        let d = "";

        icons.forEach((icon, i) => {
            const rect = icon.getBoundingClientRect();
            // Center of the icon relative to the wrapper
            const x = rect.left + rect.width / 2 - wrapperRect.left;
            const y = rect.top + rect.height / 2 - wrapperRect.top;

            if (i === 0) {
                // Start exactly at Center of First Icon
                d += `M ${x} ${y}`;
            } else {
                // Previous point (Center of Previous Icon)
                const prevIcon = icons[i - 1];
                const prevRect = prevIcon.getBoundingClientRect();
                const prevX = prevRect.left + prevRect.width / 2 - wrapperRect.left;
                const prevY = prevRect.top + prevRect.height / 2 - wrapperRect.top;

                // Configuration
                const r = 20; // Corner Radius
                const offset = 80; // Distance to travel "Forward" (Outwards)

                // Direction Logic:
                // Left Item (Prev) -> Right Item (Curr) means we move Right (+1)
                // Left Icon X (~600) > Right Icon X (~400)
                const isLeftToRightItem = prevX > x;
                const dir = isLeftToRightItem ? 1 : -1;

                // Bridge X position (The vertical line X)
                const bridgeX = prevX + (offset * dir);

                // Path Segments (Center -> Bridge -> Down -> Center)

                // 1. Line "Forward" (Out) to Bridge Start
                d += ` L ${bridgeX - (r * dir)} ${prevY}`;

                // 2. Curve Down
                d += ` Q ${bridgeX} ${prevY}, ${bridgeX} ${prevY + r}`;

                // 3. Line Down (Vertical) to Target Y level
                d += ` L ${bridgeX} ${y - r}`;

                // 4. Curve In (Towards Target)
                // We turn from Down direction to Inward direction.
                // Target X is 'x'. We are at 'bridgeX'.
                const turnDir = x < bridgeX ? -1 : 1;

                d += ` Q ${bridgeX} ${y}, ${bridgeX + (r * turnDir)} ${y}`;

                // 5. Line to Target Center
                d += ` L ${x} ${y}`;
            }
        });

        path.setAttribute('d', d);

        // Calculate path length for DashOffset animation
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        return length;
    }

    // Initial Path Calculation
    let pathLength = updatePath();

    // Recalculate on Resize
    window.addEventListener('resize', () => {
        pathLength = updatePath();
        // Refresh ScrollTrigger
        ScrollTrigger.refresh();
    });

    // Animate the Line Drawing - ALL DEVICES
    gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
            trigger: ".roadmap-wrapper",
            start: "top 80%",
            end: "bottom 80%",
            scrub: 1
        }
    });

    // Animate Items Reveal (Replace old IntersectionObserver)
    items.forEach((item, i) => {
        gsap.fromTo(item,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Safety: Recalculate on window load (in case of font/image loading shifts)
    window.addEventListener('load', () => {
        pathLength = updatePath();
        ScrollTrigger.refresh();
    });

});