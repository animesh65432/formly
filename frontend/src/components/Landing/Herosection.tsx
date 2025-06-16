import React from 'react'
import { Button } from '../ui/button';
import Icons from '../Icons';
import { motion } from 'framer-motion';
import { blurIn } from "../../lib/constant"
import { useNavigate } from "react-router-dom"


const Herosection: React.FC = () => {
    const navigate = useNavigate()
    return (
        <motion.div
            className="w-[100vw] md:mt-20  justify-center flex flex-col items-center"
            initial={blurIn.initial}
            animate={blurIn.animate}
        >
            <div className='w-[70vw] flex flex-col items-center justify-center gap-10'>
                <div className='lg:text-4xl md:text-2xl text-xl font-bold'>
                    <span className='text-green-900'>Fromly</span> – Build Smarter Forms, Effortlessly</div>
                <div className='lg:text-xl text-sm text-gray-500 hover:text-black transition'>Fromly lets you create Notion-style forms with ease. customize block, then connect to tools like Google Sheets, Notion, or WhatsApp. Collect leads, automate actions, and get AI-powered summaries — all without code.
                </div>
                {/* <div className="relative w-full pb-[56.25%] overflow-hidden rounded-xl shadow-md">
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src="https://www.youtube.com/embed/N2qt1WnVyjs"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div> */}

                <Button onClick={() => navigate("/signin")} className='bg-green-900 hover:bg-green-700  text-white rounded-full lg:p-6 p-4'>
                    Get Started
                    <span className='bg-white text-black rounded-full font-bold p-1 ml-2'>
                        <Icons.arrowRight className='h-10 w-10' />
                    </span>
                </Button>
            </div>
        </motion.div>
    )
}

export default Herosection