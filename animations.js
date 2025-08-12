// GSAP Animations for TaskFlow Pro

class AnimationController {
    constructor() {
        this.init();
    }

    init() {
        // Register GSAP plugins
        gsap.registerPlugin(ScrollTrigger);
        
        // Initialize animations
        this.initPageLoadAnimations();
        this.initScrollAnimations();
        this.initHoverAnimations();
        this.initTaskAnimations();
        this.initNavigationAnimations();
        this.initParallaxEffects();
        this.initCursorEffects();
        this.initTextAnimations();
        this.initBackgroundAnimations();
    }

    initPageLoadAnimations() {
        // Create timeline for page load
        const tl = gsap.timeline();
        
        // Animate navigation
        tl.from("nav", {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
        
        // Animate hero content
        .from(".hero-content h1", {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        }, "-=0.5")
        
        .from(".hero-content p", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        
        .from(".hero-content button", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        }, "-=0.6")
        
        // Animate hero visual
        .from(".hero-visual", {
            x: 100,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out"
        }, "-=1")
        
        // Animate floating elements
        .from(".floating-element", {
            scale: 0,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: "back.out(1.7)"
        }, "-=0.5");
    }

    initScrollAnimations() {
        // Animate sections on scroll
        gsap.utils.toArray("section").forEach((section, index) => {
            gsap.from(section.children, {
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate feature cards
        gsap.utils.toArray(".feature-card").forEach((card, index) => {
            gsap.from(card, {
                y: 80,
                opacity: 0,
                rotation: 5,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Animate statistics counters
        gsap.utils.toArray(".stat-number").forEach(stat => {
            const endValue = parseInt(stat.textContent);
            gsap.from(stat, {
                textContent: 0,
                duration: 2,
                ease: "power2.out",
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Progress bars animation
        gsap.utils.toArray(".progress-fill").forEach(progress => {
            const width = progress.getAttribute("data-width") || "0%";
            gsap.from(progress, {
                width: "0%",
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: progress,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Advanced scroll-based animations
        gsap.utils.toArray(".scroll-effect-element").forEach(element => {
            gsap.from(element, {
                opacity: 0,
                y: 50,
                rotationX: -90,
                transformOrigin: "center center",
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Staggered list animation
        gsap.utils.toArray(".staggered-list").forEach(list => {
            gsap.from(list.children, {
                opacity: 0,
                x: -50,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: list,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    initHoverAnimations() {
        // Button hover effects
        gsap.utils.toArray("button").forEach(button => {
            button.addEventListener("mouseenter", () => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out",
                    boxShadow: "0 8px 20px rgba(99, 102, 241, 0.4)"
                });
            });

            button.addEventListener("mouseleave", () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                    boxShadow: "none"
                });
            });
        });

        // Card hover effects
        gsap.utils.toArray(".hover-lift").forEach(card => {
            card.addEventListener("mouseenter", () => {
                gsap.to(card, {
                    y: -10,
                    scale: 1.02,
                    duration: 0.4,
                    ease: "power3.out",
                    boxShadow: "0 15px 30px rgba(0,0,0,0.3)"
                });
            });

            card.addEventListener("mouseleave", () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power3.out",
                    boxShadow: "none"
                });
            });
        });

        // Icon hover animations
        gsap.utils.toArray(".feature-icon, .social-icon").forEach(icon => {
            icon.addEventListener("mouseenter", () => {
                gsap.to(icon, {
                    rotation: 360,
                    scale: 1.2,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    filter: "brightness(1.2)"
                });
            });

            icon.addEventListener("mouseleave", () => {
                gsap.to(icon, {
                    rotation: 0,
                    scale: 1,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    filter: "brightness(1)"
                });
            });
        });
    }

    initTaskAnimations() {
        // Task addition animation
        this.animateTaskAddition = (taskElement) => {
            gsap.from(taskElement, {
                scale: 0.8,
                opacity: 0,
                y: 50,
                rotationX: -90,
                transformOrigin: "center center",
                duration: 0.8,
                ease: "back.out(1.7)"
            });
        };

        // Task completion animation
        this.animateTaskCompletion = (taskElement, completed) => {
            if (completed) {
                gsap.to(taskElement, {
                    scale: 1.02,
                    duration: 0.2,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut",
                    onComplete: () => {
                        gsap.to(taskElement.querySelector(".task-title"), {
                            opacity: 0.6,
                            duration: 0.3,
                            ease: "power2.out"
                        });
                        // Confetti effect
                        this.createConfetti(taskElement);
                    }
                });
            } else {
                gsap.to(taskElement.querySelector(".task-title"), {
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        };

        // Task deletion animation
        this.animateTaskDeletion = (taskElement, callback) => {
            gsap.to(taskElement, {
                x: -window.innerWidth,
                opacity: 0,
                scale: 0.5,
                rotation: 30,
                duration: 0.7,
                ease: "power3.in",
                onComplete: callback
            });
        };

        // Task filter animation
        this.animateTaskFilter = (visibleTasks, hiddenTasks) => {
            gsap.to(hiddenTasks, {
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: "power2.in",
                display: "none"
            });

            gsap.fromTo(visibleTasks, {
                opacity: 0,
                scale: 0.9,
                y: 20,
                display: "block"
            }, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out",
                delay: 0.2
            });
        };
    }

    initNavigationAnimations() {
        // Mobile menu animation
        this.animateMobileMenu = (menuElement, isOpen) => {
            if (isOpen) {
                gsap.to(menuElement, {
                    x: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: "power3.out"
                });

                gsap.from(menuElement.children, {
                    y: 30,
                    opacity: 0,
                    duration: 0.3,
                    stagger: 0.1,
                    delay: 0.2,
                    ease: "power2.out"
                });
            } else {
                gsap.to(menuElement, {
                    x: "100%",
                    opacity: 0,
                    duration: 0.3,
                    ease: "power3.in"
                });
            }
        };

        // Navigation link hover
        gsap.utils.toArray("nav a").forEach(link => {
            link.addEventListener("mouseenter", () => {
                gsap.to(link, {
                    color: "#6366f1",
                    scale: 1.05,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });

            link.addEventListener("mouseleave", () => {
                gsap.to(link, {
                    color: "#ffffff",
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out"
                });
            });
        });
    }

    initParallaxEffects() {
        // Background elements parallax
        gsap.utils.toArray(".parallax-element").forEach(element => {
            gsap.to(element, {
                y: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: element,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });

        // Floating elements animation
        gsap.utils.toArray(".floating-element").forEach((element, index) => {
            gsap.to(element, {
                y: "random(-20, 20)",
                x: "random(-10, 10)",
                rotation: "random(-5, 5)",
                duration: "random(3, 6)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: index * 0.5
            });
        });

        // Hero section parallax
        gsap.to(".hero-background", {
            y: -50,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });
    }

    initCursorEffects() {
        // Custom cursor
        const cursor = document.createElement("div");
        cursor.className = "custom-cursor";
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: linear-gradient(45deg, #6366f1, #f59e0b);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);

        // Cursor follow mouse
        document.addEventListener("mousemove", (e) => {
            gsap.to(cursor, {
                x: e.clientX - 10,
                y: e.clientY - 10,
                duration: 0.1,
                ease: "power2.out"
            });
        });

        // Cursor hover effects
        gsap.utils.toArray("button, a, .task-item, input, textarea, select").forEach(element => {
            element.addEventListener("mouseenter", () => {
                gsap.to(cursor, {
                    scale: 2,
                    duration: 0.3,
                    ease: "power2.out",
                    backgroundColor: "#10b981"
                });
            });

            element.addEventListener("mouseleave", () => {
                gsap.to(cursor, {
                    scale: 1,
                    duration: 0.3,
                    ease: "power2.out",
                    background: "linear-gradient(45deg, #6366f1, #f59e0b)"
                });
            });
        });
    }

    initTextAnimations() {
        // Typewriter effect for hero title
        const heroTitle = document.querySelector(".hero-title");
        if (heroTitle) {
            const text = heroTitle.textContent;
            heroTitle.textContent = "";
            
            gsap.to(heroTitle, {
                duration: text.length * 0.05,
                ease: "none",
                onUpdate: function() {
                    const progress = this.progress();
                    const currentLength = Math.round(progress * text.length);
                    heroTitle.textContent = text.substring(0, currentLength);
                }
            });
        }

        // Text reveal animation
        gsap.utils.toArray(".text-reveal").forEach(text => {
            gsap.from(text, {
                y: 100,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: text,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Word by word animation
        gsap.utils.toArray(".word-animation").forEach(element => {
            const words = element.textContent.split(" ");
            element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(" ");
            
            gsap.from(element.querySelectorAll(".word"), {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            });
        });

        // Character by character animation
        gsap.utils.toArray(".char-animation").forEach(element => {
            const chars = element.textContent.split("");
            element.innerHTML = chars.map(char => `<span class="char">${char}</span>`).join("");
            
            gsap.from(element.querySelectorAll(".char"), {
                opacity: 0,
                y: -20,
                rotationZ: "random(-360, 360)",
                stagger: 0.02,
                duration: 0.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            });
        });
    }

    initBackgroundAnimations() {
        // Example: Animate a background element based on mouse position
        const bgElement = document.querySelector(".animated-background-element");
        if (bgElement) {
            document.addEventListener("mousemove", (e) => {
                const x = (e.clientX / window.innerWidth - 0.5) * 50; // Adjust sensitivity
                const y = (e.clientY / window.innerHeight - 0.5) * 50; // Adjust sensitivity

                gsap.to(bgElement, {
                    x: x,
                    y: y,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        }

        // Example: Pulsating background element
        gsap.to(".pulsating-element", {
            scale: 1.1,
            opacity: 0.8,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    createConfetti(element) {
        const colors = ["#6366f1", "#f59e0b", "#10b981", "#ef4444"];
        const rect = element.getBoundingClientRect();
        
        for (let i = 0; i < 30; i++) { // Increased confetti count
            const confetti = document.createElement("div");
            confetti.style.cssText = `
                position: fixed;
                width: ${gsap.utils.random(5, 15)}px;
                height: ${gsap.utils.random(5, 15)}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                border-radius: ${gsap.utils.random(0, 50)}%; // Mix of circles and squares
                pointer-events: none;
                z-index: 1000;
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
            `;
            document.body.appendChild(confetti);
            
            gsap.to(confetti, {
                x: `random(-200, 200)`,
                y: `random(-200, -400)`,
                rotation: `random(0, 720)`,
                scale: 0,
                duration: gsap.utils.random(1, 2),
                ease: "power2.out",
                onComplete: () => {
                    document.body.removeChild(confetti);
                }
            });
        }
    }

    // Notification animation
    animateNotification(notification, type = "show") {
        if (type === "show") {
            gsap.set(notification, {
                x: 100,
                opacity: 0,
                scale: 0.8
            });

            gsap.to(notification, {
                x: 0,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)"
            });
        } else {
            gsap.to(notification, {
                x: 100,
                opacity: 0,
                scale: 0.8,
                duration: 0.3,
                ease: "power2.in"
            });
        }
    }

    // Loading animation
    createLoadingAnimation(element) {
        const loader = document.createElement("div");
        loader.className = "loading-spinner";
        loader.style.cssText = `
            width: 40px;
            height: 40px;
            border: 4px solid rgba(99, 102, 241, 0.3);
            border-top: 4px solid #6366f1;
            border-radius: 50%;
            margin: 20px auto;
        `;
        element.appendChild(loader);

        gsap.to(loader, {
            rotation: 360,
            duration: 1,
            repeat: -1,
            ease: "none"
        });
    }
}

// Initialize AnimationController
document.addEventListener("DOMContentLoaded", () => {
    window.animationController = new AnimationController();
});


