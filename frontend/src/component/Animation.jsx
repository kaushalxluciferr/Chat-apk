import React, { useEffect, useRef } from 'react'

import anime from 'animejs'
function Animation() {
    const containerRef=useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
    
        container.innerHTML = ""; // Ensure a fresh start
        for (let i = 1; i <= 104; i++) {
            const dot = document.createElement("div");
            dot.classList.add("element");
            container.appendChild(dot);
        }
    
        const dotall = container.querySelectorAll(".element");
        const animation = anime.timeline({
            targets: dotall,
            easing: "easeInOutExpo",
            loop: true,
            delay: anime.stagger(100, { grid: [10, 10], from: "center" }),
        });
    
        animation
            .add({
                rotateZ: 180,
                translateY: anime.stagger(0, { grid: [10, 10], from: "center", axis: "y" }),
                translateX: anime.stagger(0, { grid: [10, 10], from: "center", axis: "x" }),
                opacity: 1,
            })
            .add({
                borderRadius: 50,
            })
            .add({
                scale: 0.2,
                opacity: 0.2,
            })
            .add({
                rotateZ: 180,
                translateY: anime.stagger(0, { grid: [10, 10], from: "center", axis: "y" }),
                translateX: anime.stagger(0, { grid: [10, 10], from: "center", axis: "x" }),
                opacity: 1,
            })
            .add({
                scale: 1,
                borderRadius: 0,
            })
            .add({
                rotateZ: -90,
            });
    
        // Cleanup on unmount
        return () => {
            animation.pause(); // Ensure animations stop when component unmounts
        };
    }, []);
    
  return (
    <div className="container" ref={containerRef}>

</div>
  )
}

export default Animation
