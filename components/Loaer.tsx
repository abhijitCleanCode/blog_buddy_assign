import { motion } from "framer-motion";

const Loader = ({ message }: { message: string }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-2">
            <div className="flex space-x-2">
                <motion.div
                    className="h-3 w-3 rounded-full bg-rose-500"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 1,
                        ease: 'easeInOut',
                        repeat: Infinity,
                    }}
                />
                <motion.div
                    className="h-3 w-3 rounded-full bg-rose-500"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 1,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        delay: 0.3,
                    }}
                />
                <motion.div
                    className="h-3 w-3 rounded-full bg-rose-500"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        duration: 1,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        delay: 0.6,
                    }}
                />
            </div>

            <p className="text-gray-600 animate-pulse">{message}</p>
        </div>
    )
}

export default Loader