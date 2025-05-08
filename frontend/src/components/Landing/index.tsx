import React from 'react'
import Header from './Header'
import Herosection from './Herosection'
import Footer from './Footer'
const Landing: React.FC = () => {
    return (
        <main className="flex flex-col  min-h-screen w-full bg-slate-100">
            <section className='w-[100vw] flex justify-center'>
                <Header />
            </section>
            <section className="mt-6 flex-grow">
                <Herosection />
            </section>
            <Footer />
        </main>

    )
}

export default Landing