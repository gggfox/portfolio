import { Stack } from '@mantine/core';
import { useRef } from 'react';
import Hero from './sections/Hero';

export default function LandingPage() {
    const currentSection = useRef(0);
    const scrollY = useRef(window.scrollY);

    window.addEventListener('scroll', () => {
        scrollY.current = window.scrollY
        const newSection = Math.round(scrollY.current / window.innerHeight)
        if (currentSection.current !== newSection) {
            currentSection.current = newSection
        }
        console.log(currentSection)
    })  
    
    return <Stack bg='#000'>
        <Hero/>
        <Hero/>
        <Hero/>
        <Hero/>
    </Stack>
}