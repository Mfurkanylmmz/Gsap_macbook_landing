import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef } from 'react'
import StudioLights from "./three/StudioLights"
import { featureSequence, features } from "../constants/index"
import clsx from 'clsx'
import { Html } from '@react-three/drei'
import { useMediaQuery } from 'react-responsive'
import MacbookModel from './models/Macbook'
import useMacbookStore from '../store'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const ModelScroll = () => {
    const groupRef = useRef(null)
    const isMobile = useMediaQuery({ query: '(max-width:1024px)' })
    const { setTexture } = useMacbookStore()

    // Pre-load all features videos during component mount
    const preloadedVideos = useRef([])

    // Pre-load all features videos during component mount
    useEffect(() => {
        const videos = []
        featureSequence.forEach((feature, index) => {
            const v = document.createElement('video')
            Object.assign(v, {
                src: feature.videoPath,
                muted: true,
                playsInline: true,
                preload: 'auto',
                crossOrigin: 'anonymous'
            })
            v.load()
            videos.push(v)
        })
        preloadedVideos.current = videos

        return () => {
            preloadedVideos.current.forEach(v => {
                v.src = ''
                v.load()
            })
            preloadedVideos.current = []
        }
    }, [])

    useGSAP(() => {
        // 3D model rotation animation
        const modelTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top top',
                end: 'bottom top',
                scrub: 1,
                pin: true
            }
        })

        // SYNC the feature content
        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: '#f-canvas',
                start: 'top center',
                end: 'bottom top',
                scrub: 1
            }
        })

        //3D Spin
        if (groupRef.current) {
            modelTimeline.to(groupRef.current.rotation, { y: Math.PI * 2, ease: 'power1.inOut' })
        }

        // Content & Texture Sync
        timeline
            .call(() => setTexture('/videos/feature-1.mp4'))
            .to('.box1', { opacity: 1, y: 0, delay: 1 })
            .call(() => setTexture('/videos/feature-2.mp4'))
            .to('.box2', { opacity: 1, y: 0, })
            .call(() => setTexture('/videos/feature-3.mp4'))
            .to('.box3', { opacity: 1, y: 0, })
            .call(() => setTexture('/videos/feature-4.mp4'))
            .to('.box4', { opacity: 1, y: 0, })
            .call(() => setTexture('/videos/feature-5.mp4'))
            .to('.box5', { opacity: 1, y: 0, })

    }, [])



    return (
        <group ref={groupRef}>
            <Suspense fallback={<Html><h1 className="text-white text-3xl uppercase">Loading...</h1> </Html>}>
                <MacbookModel scale={isMobile ? 0.05 : 0.08} position={[0, -1, 0]} />
            </Suspense>
        </group>
    )
}



const Features = () => {
    return (
        <section id='features'>
            <h2>See it all in a new light.</h2>

            <Canvas id='f-canvas' camera={{ position: [0, 0, 5], fov: 50 }}>
                <StudioLights />
                <ambientLight intensity={0.5} />
                <ModelScroll />
            </Canvas>

            <div className='absolute inset-0'>
                {
                    features.map((feature, index) => (
                        <div key={index} className={clsx('box', `box${index + 1}`, feature.styles)}>
                            <img src={feature.icon} alt={feature.highlight} />
                            <p>
                                <span className="text-white">{feature.highlight} </span>
                                {feature.text}
                            </p>

                        </div>
                    ))
                }
            </div>

        </section>
    )
}

export default Features


