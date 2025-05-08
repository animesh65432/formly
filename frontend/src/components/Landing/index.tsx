import React from 'react'
import Header from './Header'
import Herosection from './Herosection'
import Footer from './Footer'
const Landing: React.FC = () => {
    return (
        <main className='bg-slate-50 w-[100vw] min-h-[100vh] flex flex-col'>
            <Header />
            <Herosection />
            <Footer />
        </main>
    )
}

export default Landing