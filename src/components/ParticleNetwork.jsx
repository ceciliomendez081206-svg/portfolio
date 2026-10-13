import { useEffect, useRef } from "react";

export default function ParticleNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = null;
    let width = 0;
    let height = 0;
    let particles = [];
    let accent = [242, 169, 59];
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };

    function updateAccent() {
      const hex = getComputedStyle(document.documentElement)
        .getPropertyValue("--amber")
        .trim()
        .replace("#", "");
      const normalized = hex.length === 3
        ? [...hex].map((character) => `${character}${character}`).join("")
        : hex;

      accent = [
        Number.parseInt(normalized.slice(0, 2), 16),
        Number.parseInt(normalized.slice(2, 4), 16),
        Number.parseInt(normalized.slice(4, 6), 16),
      ];
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const particleCount = Math.min(72, Math.max(24, Math.round((width * height) / 22000)));
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.1 + 1,
      }));
    }

    function draw(animate) {
      context.clearRect(0, 0, width, height);

      if (animate && pointer.active) {
        pointer.x += (pointer.targetX - pointer.x) * 0.12;
        pointer.y += (pointer.targetY - pointer.y) * 0.12;
      }

      const pointerConnectionDistance = 176;
      const pointerDistanceSquared = pointerConnectionDistance * pointerConnectionDistance;
      particles.forEach((particle) => {
        if (animate) {
          particle.x += particle.vx;
          particle.y += particle.vy;

          if (particle.x < 0) particle.x = width;
          if (particle.x > width) particle.x = 0;
          if (particle.y < 0) particle.y = height;
          if (particle.y > height) particle.y = 0;
        }

        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distanceSquared = dx * dx + dy * dy;
        const pointerInfluence = pointer.active && distanceSquared < pointerDistanceSquared
          ? 1 - Math.sqrt(distanceSquared) / pointerConnectionDistance
          : 0;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(${accent.join(",")}, ${0.34 + pointerInfluence * 0.36})`;
        context.shadowColor = pointerInfluence > 0
          ? `rgba(${accent.join(",")}, ${pointerInfluence * 0.55})`
          : "transparent";
        context.shadowBlur = pointerInfluence * 14;
        context.fill();
      });
      context.shadowBlur = 0;
      context.shadowColor = "transparent";

      const connectionDistance = 132;
      const maxDistanceSquared = connectionDistance * connectionDistance;
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const first = particles[i];
          const second = particles[j];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared > maxDistanceSquared) continue;

          const opacity = 0.18 * (1 - Math.sqrt(distanceSquared) / connectionDistance);
          context.beginPath();
          context.moveTo(first.x, first.y);
          context.lineTo(second.x, second.y);
          context.strokeStyle = `rgba(${accent.join(",")}, ${opacity})`;
          context.lineWidth = 1;
          context.stroke();
        }
      }

      if (pointer.active) {
        particles.forEach((particle) => {
          const dx = particle.x - pointer.x;
          const dy = particle.y - pointer.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance >= pointerConnectionDistance) return;

          const opacity = 0.26 * (1 - distance / pointerConnectionDistance);
          context.beginPath();
          context.moveTo(pointer.x, pointer.y);
          context.lineTo(particle.x, particle.y);
          context.strokeStyle = `rgba(${accent.join(",")}, ${opacity})`;
          context.lineWidth = 1;
          context.stroke();
        });
      }
    }

    function stopAnimation() {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    }

    function animate() {
      draw(true);
      animationFrame = window.requestAnimationFrame(animate);
    }

    function updateAnimation() {
      stopAnimation();
      if (document.hidden) return;

      if (motionPreference.matches) {
        draw(false);
      } else {
        animate();
      }
    }

    function handleVisibilityChange() {
      updateAnimation();
    }

    function handlePointerMove(event) {
      if (event.pointerType === "touch") return;

      if (!pointer.active) {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
      }
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.active = true;
    }

    function handlePointerOut(event) {
      if (!event.relatedTarget) pointer.active = false;
    }

    const themeObserver = new MutationObserver(() => {
      updateAccent();
      if (motionPreference.matches || document.hidden) draw(false);
    });

    updateAccent();
    resize();
    updateAnimation();
    window.addEventListener("resize", resize);
    window.addEventListener("resize", updateAnimation);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    motionPreference.addEventListener("change", updateAnimation);
    if (window.matchMedia("(pointer: fine)").matches && !motionPreference.matches) {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerout", handlePointerOut);
    }
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      stopAnimation();
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", updateAnimation);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      motionPreference.removeEventListener("change", updateAnimation);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerout", handlePointerOut);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-network" aria-hidden="true" />;
}
