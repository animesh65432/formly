import React from 'react'
import Header from './Header'
import Herosection from './Herosection'
import Footer from './Footer'
import Whyfromly from './Whyfromly'
import FAQ from './Faq'
const Landing: React.FC = () => {
    return (
        <main className="flex flex-col   min-h-screen  bg-slate-100 w-[100vw] overflow-hidden ">
            <section id='main' className='w-[100vw] flex justify-center '>
                <Header />
            </section>
            <section className="flex-grow md:mt-20 mt-40">
                <Herosection />
            </section>
            <section id='Features' className="flex-grow">
                <Whyfromly />
            </section>
            <section>
                <FAQ />
            </section>
            <section id='contact'>
                <Footer />
            </section>
        </main >

    )
}

export default Landing