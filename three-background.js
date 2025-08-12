// Three.js Background - Particle System

let scene, camera, renderer, particles, particleMaterial;

function initThreeBackground() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById("three-background").appendChild(renderer.domElement);

    // Create particles
    const particleCount = 1000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x22c55e); // Green
    const color2 = new THREE.Color(0x0ea5e9); // Blue

    for (let i = 0; i < particleCount; i++) {
        // Position particles randomly in a cube
        positions[i * 3] = (Math.random() * 2 - 1) * 50; // x
        positions[i * 3 + 1] = (Math.random() * 2 - 1) * 50; // y
        positions[i * 3 + 2] = (Math.random() * 2 - 1) * 50; // z

        // Assign random color between green and blue
        const mixedColor = new THREE.Color();
        mixedColor.lerpColors(color1, color2, Math.random());
        colors[i * 3] = mixedColor.r;
        colors[i * 3 + 1] = mixedColor.g;
        colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    particleMaterial = new THREE.PointsMaterial({
        size: 0.2,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    camera.position.z = 5;

    window.addEventListener("resize", onWindowResize, false);
    document.addEventListener("mousemove", onDocumentMouseMove, false);

    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Animate camera position based on mouse movement
    gsap.to(camera.position, {
        x: mouseX * 2,
        y: mouseY * 2,
        duration: 1,
        ease: "power2.out"
    });

    // Animate particles rotation based on mouse movement
    gsap.to(particles.rotation, {
        y: mouseX * 0.5,
        x: mouseY * 0.5,
        duration: 1,
        ease: "power2.out"
    });
}

function animate() {
    requestAnimationFrame(animate);

    // Simple particle movement
    particles.rotation.y += 0.0005;
    particles.rotation.x += 0.0005;

    renderer.render(scene, camera);
}

initThreeBackground();


