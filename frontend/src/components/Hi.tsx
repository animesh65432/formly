import React from 'react'
import { motion } from 'framer-motion'

const Hi: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="p-4 bg-transparent rounded-lg"
        >
            <img
                className="w-full h-auto"
                src="https://media.tenor.com/EO3G4Y-BXL4AAAAi/transparent-hi.gif"
                alt="Animated"
            />
        </motion.div>

    )
}

export default Hi
