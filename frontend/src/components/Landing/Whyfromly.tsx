import React from 'react'
import { motion } from "framer-motion"
import { whyfromly, upward } from "../../lib/constant"

const Whyfromly: React.FC = () => {
    return (
        <div className="w-full overflow-x-hidden py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-16 text-left"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-center">Why Choose Fromly</h2>
                    <div className="w-24 h-1 bg-green-800 m-auto"></div>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12  place-content-center">
                    {whyfromly.map((ele, i) => (
                        <motion.div
                            key={i}
                            initial={upward.initial}
                            whileInView={upward.animate}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="m-auto bg-white flex flex-col items-start p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-50">
                                <p className="lg:text-3xl md:text-2xl text-xl text-green-800 font-semibold">0{i + 1}</p>
                            </div>

                            <h3 className="lg:text-2xl md:text-xl text-lg font-bold mb-4 text-left">{ele.title}</h3>

                            <p className="text-gray-600 text-left md:text-base text-sm leading-relaxed">
                                {ele.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Whyfromly