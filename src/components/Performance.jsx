
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { performanceImages, performanceImgPositions } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        // TEXT FADE-IN
        gsap.fromTo(
            ".content",
            { autoAlpha: 0, y: 40 },
            {
                autoAlpha: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: contentRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            }
        );

        // DESKTOP IMAGE ANIMATION
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1025px)", () => {
            const tl = gsap.timeline({
                defaults: { ease: "power2.out" },
                scrollTrigger: {
                    trigger: contentRef.current, // 🔥 content görünce başlar
                    start: "top 80%",
                    end: "bottom 80%",
                    scrub: 4,
                    invalidateOnRefresh: true,
                },
            });

            performanceImgPositions.forEach((pos) => {
                // Başlangıç pozisyonu (daha dramatik giriş için)
                gsap.set(`.${pos.id}`, {
                    y: 100,
                    scale: 0.85,
                    autoAlpha: 0,
                    position: "absolute",
                });

                const toVars = {
                    y: 0,
                    scale: 1,
                    autoAlpha: 1,
                };

                if (pos.left !== undefined) toVars.left = `${pos.left}%`;
                if (pos.right !== undefined) toVars.right = `${pos.right}%`;
                if (pos.bottom !== undefined) toVars.bottom = `${pos.bottom}%`;
                if (pos.transform !== undefined) toVars.transform = pos.transform;

                tl.to(`.${pos.id}`, toVars, 0);
            });

            return () => {
                tl.scrollTrigger && tl.scrollTrigger.kill();
                tl.kill();
            };
        });
    }, { scope: sectionRef });

    return (
        <section
            id="performance"
            ref={sectionRef}
            style={{ position: "relative", minHeight: "120vh" }}
        >
            <h2 style={{ textAlign: "center", marginBottom: "80px" }}>
                Next-level graphics performance. Game on.
            </h2>

            {/* IMAGE WRAPPER */}
            <div
                className="wrapper"
                style={{
                    position: "relative",
                    height: "600px",
                }}
            >
                {performanceImages.map(({ id, src }) => (
                    <img
                        key={id}
                        src={src}
                        alt={id}
                        className={id} // 🔥 GSAP için gerekli
                        style={{ position: "absolute" }}
                    />
                ))}
            </div>

            {/* CONTENT */}
            <div
                className="content"
                ref={contentRef}
                style={{
                    marginTop: "200px",
                    maxWidth: "800px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                    fontSize: "18px",
                    lineHeight: "1.6",
                }}
            >
                Run graphics-intensive workflows with a responsiveness that keeps up
                with your imagination. The M4 family of chips features a GPU with a
                second-generation hardware-acceleration ray tracing engine that renders
                images faster,{" "}
                <span style={{ color: "white" }}>
                    so gaming feels more immersive and realistic than ever.
                </span>{" "}
                And Dynamic Caching optimizes fast on-chip memory to dramatically
                increase average GPU utilization — driving a huge performance boost for
                the most demanding pro apps and games.
            </div>
        </section>
    );
};

export default Performance;