import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { hwt } from "../../lib/constant"

const upward = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
};

const Howitsworks: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<{ src: string; title: string } | null>(null);

    const openModal = (src: string, title: string) => {
        setSelectedImage({ src, title });
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <>
            <section id="howitsworks" className="w-full py-20 px-4 relative overflow-hidden mt-2.5 bg-slate-100 md:py-32 lg:py-40 min-[400px]:mt-0 min-[600px]:mt-12.5">
                <div className="absolute inset-0 pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-7xl mx-auto relative z-10"
                >
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="text-4xl font-extrabold text-green-900 mb-4 leading-tight md:text-6xl lg:text-6xl">
                            How It <span className="relative text-green-600 after:content-[''] after:absolute after:-bottom-1 after:left-0 after:right-0 after:h-1 after:bg-green-600 after:rounded-sm after:opacity-70">Works</span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed md:text-xl">
                            Get started in minutes with our simple, powerful platform
                        </p>
                    </div>

                    <div className="flex flex-col gap-24 md:gap-32">
                        {hwt.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={upward.initial}
                                whileInView={upward.animate}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="relative"
                            >
                                {index < hwt.length - 1 && (
                                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-full w-0.5 h-32 bg-gradient-to-b from-green-600 to-transparent z-10 before:content-[''] before:absolute before:top-0 before:left-1/2 before:transform before:-translate-x-1/2 before:w-2 before:h-2 before:bg-green-600 before:rounded-full before:animate-pulse"></div>
                                )}

                                <div className={`flex flex-col items-center gap-12 md:flex-row md:gap-16 xl:gap-24 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                                    <div className="flex-1 text-center max-w-lg md:text-left md:max-w-none">
                                        <div className={`flex items-center justify-center mb-6 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                                            <div className="relative w-16 h-16 bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:transform hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl">
                                                <span className="text-white font-bold text-xl z-10">{index + 1}</span>
                                                <div className="absolute -inset-2 bg-green-600 rounded-full opacity-20 animate-pulse"></div>
                                            </div>
                                        </div>

                                        <h3 className="text-3xl font-bold text-black mb-4 leading-snug md:text-3xl lg:text-4xl">
                                            {step.title}
                                        </h3>

                                        <div className={`flex gap-2 justify-center mb-8 ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                                            <div className="w-2 h-2 bg-green-600 rounded-full opacity-60 animate-bounce"></div>
                                            <div className="w-2 h-2 bg-green-600 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                            <div className="w-2 h-2 bg-green-600 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                                        </div>
                                    </div>

                                    <div className="flex-1 flex items-center justify-center max-w-lg">
                                        <div
                                            className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl max-[750px]:max-w-xs cursor-pointer"
                                            onClick={() => openModal(step.image, step.title)}
                                        >
                                            <img
                                                src={step.image}
                                                alt={step.title}
                                                className="w-full h-auto block transition-all duration-300 hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-br from-green-600/10 to-green-600/5 opacity-0 transition-opacity duration-300 hover:opacity-100"></div>

                                            {/* Click hint overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/20">
                                                <div className="bg-white/90 rounded-full p-3 shadow-lg">
                                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>


            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                        onClick={handleBackdropClick}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                            className="relative max-w-4xl max-h-[90vh] w-full"
                        >

                            <button
                                onClick={closeModal}
                                className="absolute -top-4 -right-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors duration-200"
                            >
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Image */}
                            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src={selectedImage.src}
                                    alt={selectedImage.title}
                                    className="w-full h-auto max-h-[80vh] object-contain"
                                />
                                <div className="p-6 bg-white">
                                    <h3 className="text-2xl font-bold text-gray-900 text-center">
                                        {selectedImage.title}
                                    </h3>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Howitsworks;