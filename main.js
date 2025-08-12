// Main JavaScript for D7ME Website

document.addEventListener("DOMContentLoaded", () => {

    // Matrix Rain Effect
    function createMatrixRain() {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const container = document.getElementById("matrix-rain");
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        container.appendChild(canvas);
        
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()";
        const charArray = chars.split("");
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        function draw() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = "#22c55e";
            ctx.font = fontSize + "px monospace";
            
            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize * 0.8 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        setInterval(draw, 35);

        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
    
    // Initialize Matrix Rain
    createMatrixRain();

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMobileMenuBtn = document.getElementById("close-mobile-menu-btn");
    const hacksSection = document.getElementById("hacks");

    mobileMenuBtn?.addEventListener("click", () => {
        mobileMenu.classList.remove("translate-x-full");
    });
    
    closeMobileMenuBtn?.addEventListener("click", () => {
        mobileMenu.classList.add("translate-x-full");
    });

    // Android Hacks Modal
    const androidCard = document.getElementById("android-hacks-card");
    const androidModal = document.getElementById("android-modal");
    const closeAndroidModal = document.getElementById("close-android-modal");
    
    androidCard?.addEventListener("click", () => {
        androidModal.classList.remove("hidden");
    });
    
    closeAndroidModal?.addEventListener("click", () => {
        androidModal.classList.add("hidden");
    });
    
    // Close modal when clicking outside
    androidModal?.addEventListener("click", (e) => {
        if (e.target === androidModal) {
            androidModal.classList.add("hidden");
        }
    });

    // Smooth scrolling for navigation links and showing/hiding sections
    document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            // Hide hacks section if navigating to home
            if (targetId === "home") {
                hacksSection.classList.add("hidden");
            } else if (targetId === "hacks") {
                hacksSection.classList.remove("hidden");
            }

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            // Close mobile menu after clicking a link
            mobileMenu.classList.add("translate-x-full");
        });
    });

    // GSAP Hover Effects for text with borders
    document.querySelectorAll(".hover-border-blue, .hover-border-red, .hover-border-green").forEach(element => {
        element.addEventListener("mouseenter", () => {
            gsap.to(element.querySelector("span"), { // Assuming the text is wrapped in a span
                duration: 0.3,
                scaleX: 1, // Scale the underline to full width
                ease: "power2.out"
            });
        });

        element.addEventListener("mouseleave", () => {
            gsap.to(element.querySelector("span"), {
                duration: 0.3,
                scaleX: 0, // Scale the underline back to zero
                ease: "power2.out"
            });
        });
    });

    // Parallax effect for floating elements
    gsap.to(".animate-float", {
        y: -30,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.5
    });

});


