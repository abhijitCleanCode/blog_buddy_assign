import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';

interface AnimatedModalProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
    // trigger: React.ReactNode;
    title: string;
    children: React.ReactNode;
}

const AnimatedModal: React.FC<AnimatedModalProps> = ({ openModal, setOpenModal, title, children }) => {

    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <AnimatePresence>
                {openModal && (
                    <DialogContent
                        className="bg-transparent p-0 border-0 shadow-none"
                        forceMount
                    >
                        <motion.div
                            key="dialog"
                            className="relative w-full mx-auto rounded-2xl bg-white p-6 shadow-2xl border border-gray-100"
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{
                                type: "spring",
                                damping: 25,
                                stiffness: 300,
                                duration: 0.3,
                            }}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <DialogTitle className="text-lg font-semibold text-gray-900">
                                    {title}
                                </DialogTitle>
                            </div>

                            <div className="mt-2 text-gray-700">{children}</div>
                        </motion.div>
                    </DialogContent>
                )}
            </AnimatePresence>
        </Dialog>
    )
}

export default AnimatedModal