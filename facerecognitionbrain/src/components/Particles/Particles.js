import React,{ useCallback } from 'react';
import Particles from "react-particles";
import { loadFull } from "tsparticles";
import particlesOptions from "./particles.json";


const ParticleEffect = () => {
    const particlesInit = useCallback(main => {
        loadFull(main);
    }, [])

    return (
        <div className="Particles">
            <Particles options={particlesOptions} init={particlesInit} />
        </div>
    );
}

export default ParticleEffect;
