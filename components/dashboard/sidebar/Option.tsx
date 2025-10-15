import React from 'react';
import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface OptionProps {
    Icon: LucideIcon; // Type for icons imported from lucide-react
    title: string; // The label shown for each sidebar option
    selected?: string; // Currently selected option name
    setSelected?: React.Dispatch<React.SetStateAction<string>>; // Setter to update selection
    open: boolean; // Whether sidebar is expanded or collapsed
    href?: string;
    // notifs?: number; // Optional notification badge count
}

const Option: React.FC<OptionProps> = ({
    Icon,
    title,
    // selected,
    // setSelected,
    open,
    href = "/",
}) => {

    const handleClick = () => { }

    return (
        <button
            onClick={handleClick} // ✅ No arguments, React handles event internally
            className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200`}
        >
            <div className="grid h-full w-12 place-content-center">
                <Icon className="h-4 w-4" />
            </div>

            {open && (
                <Link href={href}>
                    <span className={`text-sm font-medium transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
                        {title}
                    </span>
                </Link>
            )}
        </button>
    )
}

export default Option;
