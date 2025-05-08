import React from 'react'
import { Button } from '../ui/button';
import Icons from '../Icons';
import { motion } from 'framer-motion';


const Herosection: React.FC = () => {
    return (
        <motion.div
            className="w-[100vw] flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
            <div className='w-[70vw] md:mt-20 mt-10 flex flex-col items-center justify-center gap-10'>
                <div className='lg:text-4xl md:text-2xl text-xl font-bold'>
                    <span className='text-green-900'>Fromly</span> – Build Smarter Forms, Effortlessly</div>
                <div className='lg:text-xl text-sm'>Fromly lets you create Notion-style forms with ease. Drag, drop, and customize blocks, then connect to tools like Google Sheets, Notion, or WhatsApp. Collect leads, automate actions, and get AI-powered summaries — all without code.
                </div>
                <div>
                    <Button className='bg-green-900 hover:bg-green-700  text-white rounded-full p-6'>
                        Get Started
                        <span className='bg-white text-black rounded-full font-bold p-1 ml-2'>
                            <Icons.arrowRight className='h-10 w-10' />
                        </span>
                    </Button>
                </div>
            </div>
        </motion.div>
    )
}

export default Herosection