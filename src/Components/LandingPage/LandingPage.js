import React from 'react'
import Footer from './Footer'
import Header from './Header/Header'
import Section2 from './Section2/Section2'
import Section3 from './Section3/Section3'
import Section4 from './Section4/Section4'

export default function LandingPage() {
    return (
        <div>
            <Header />  {/* Section 1 in the landing page */}
            <Section2 />
            <Section3 />
            <Section4 />
            {/*<Footer /> */}
        </div>
    )
}
