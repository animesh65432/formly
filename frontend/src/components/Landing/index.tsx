import React from 'react'
import Header from './Header'
import Herosection from './Herosection'
import Footer from './Footer'
import Whyfromly from './Whyfromly'
import FAQ from './Faq'
import Hwt from "./Hwt"
const Landing: React.FC = () => {
    return (
        <main className="flex flex-col    h-[100vh]  bg-slate-100 w-[100vw] overflow-x-auto ">
            <section id='main' className='w-full flex justify-center '>
                <Header />
            </section>
            <section className="flex-grow md:mt-20 mt-40">
                <Herosection />
            </section>
            <section id='howitworks'>
                <Hwt />
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