import React, { useState } from 'react'
import useMacbookStore from '../store'
import { clsx } from 'clsx'
import { Canvas } from '@react-three/fiber'
import { Box, OrbitControls } from '@react-three/drei'
import MacbookModel14 from './models/Macbook-14'
import StudioLights from './three/StudioLights'
import ModelSwitcher from './three/ModelSwitcher'
import { useMediaQuery } from 'react-responsive'


const ProductViewer = () => {

    const { color, scale, setColor, setScale, reset } = useMacbookStore()

    const isMobile = useMediaQuery({ query: '(max-width:1024px)' })
    const [selectedModel, setSelectedModel] = useState('16')




    return (
        <section id='product-viewer'>
            <h2>Take a closer look.</h2>
            <div className='controls'>
                <p className='info'> MacbookPro | {selectedModel} inc and color: {color.name} </p>

                <div className='flex-center gap-5 mt-5'>
                    <div className='color-control'>
                        {/* <div
                            onClick={() => setColor("#adb5bd")}
                            className={clsx("bg-neutral-300", color.value === "#adb5bd" && 'active')}
                        />
                        <div
                            onClick={() => setColor("#2e2c2e")}
                            className={clsx("bg-neutral-900", color.value === "#2e2c2e" && "active")}
                        /> */}
                        <div
                            onClick={() =>
                                setColor({ name: "Space Gray", value: "#adb5bd" })
                            }
                            className={clsx(
                                "bg-neutral-300",
                                color.value === "#adb5bd" && "active"
                            )}
                        />

                        <div
                            onClick={() =>
                                setColor({ name: "Dark", value: "#2e2c2e" })
                            }
                            className={clsx(
                                "bg-neutral-900",
                                color.value === "#2e2c2e" && "active"
                            )}
                        />


                    </div>
                    {/* <div className='size-control'>
                        <div
                            // onClick={() => setScale(0.06)}
                            onClick={() => setSelectedModel('14')}
                            className={clsx(scale === 0.06 ? "bg-white text-black" : "bg-transparent text-white")}
                        >
                            <p>14"</p>
                        </div>
                        <div
                            // onClick={() => setScale(0.08)}
                            onClick={() => setSelectedModel('16')}
                            className={clsx(scale === 0.08 ? "bg-white text-black" : "bg-transparent text-white")}
                        >
                            <p>16"</p>
                        </div>

                    </div> */}
                    <div className='size-control'>
                        <div
                            onClick={() => {
                                setSelectedModel('14')


                            }}

                            className={clsx(
                                selectedModel === '14'
                                    ? "bg-white text-black"
                                    : "bg-transparent text-white"
                            )}
                        >
                            <p>14"</p>
                        </div>

                        <div
                            onClick={() => {
                                setSelectedModel('16')


                            }}
                            className={clsx(
                                selectedModel === '16'
                                    ? "bg-white text-black"
                                    : "bg-transparent text-white"

                            )}
                        >
                            <p>16"</p>
                        </div>
                    </div>

                </div>
            </div>
            <Canvas id='canvas' camera={{ position: [0, 2, 5], fov: 50, near: 0.1, far: 100 }}>
                <StudioLights />

                {/* <ModelSwitcher scale={isMobile ? scale - 0.03 : scale} isMobile={isMobile} /> */}
                <ModelSwitcher
                    selectedModel={selectedModel}
                    isMobile={isMobile}
                />
            </Canvas>
        </section>
    )
}

export default ProductViewer
