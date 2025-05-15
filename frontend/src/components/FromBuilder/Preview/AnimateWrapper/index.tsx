import { motion } from "framer-motion";


const AnimateWrapper: React.FC<{ isAnimated: boolean; children: React.ReactNode; id: string }> = ({
    isAnimated,
    children,
    id,
}) => {
    if (!isAnimated) return <div key={id}>{children}</div>;

    return (
        <motion.div
            key={id}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
        >
            {children}
        </motion.div>
    );
};

export default AnimateWrapper