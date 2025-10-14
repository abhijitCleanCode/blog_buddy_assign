import Link from "next/link";
import {Mail} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import Image from "next/image";

const Footer = () => {

    const phoneNumber: string = '918811072239';
    const message: string = 'Hi, there!';
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    return (
        <footer className="mt-16 relative border-t bg-background text-foreground transition-colors duration-300">
            <div className="conatiner mx-auto px-4 py-12 md:px-6 lg:px-8">
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                    <div className="relative">
                        <Link href="/" className="flex items-center gap-x-2">
                            {/* <img src={sudamaLogo} alt="logo" className="w-12 h-12 rounded-full object-cover" /> */}
                            <h2 className="mb-4 text-3xl font-bold tracking-light">
                                Blog Assignment.
                            </h2>
                        </Link>
                        <p className="mb-6 text-muted-foreground">
                            Join our newsletter for latest updates and exclusive offers.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
                        <nav className="space-y-2 text-sm">
                            <Link
                                href="/"
                                className="block transition-colors hover:text-gray-500"
                            >
                                Home
                            </Link>
                            <Link
                                href="/blogs"
                                className="block transition-colors hover:text-gray-500"
                            >
                                Blogs
                            </Link>
                        </nav>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
                        <address className="flex flex-col space-y-2 text-sm not-italic">
                            <div className='flex items-center gap-2'>
                                <Mail className='text-indigo-500'/>
                                <a
                                    href="mailto:mailmeat.lightspeed@gmail.com"
                                    className="text-gary-700 font-semibold"
                                >
                                    mailmeat.lightspeed@gmail.com
                                </a>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Image
                                    src="/icons/whatsapp.png"
                                    alt="Whats app"
                                    width={30}
                                    height={30}
                                    className=""
                                />
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className=""
                                >
                                    Message me
                                </a>
                            </div>
                        </address>
                    </div>

                    <div className="relative">
                        <h3 className="mb-4 text-lg font-semibold">Join Us</h3>
                        <div className="mb-6 flex space-x-4">
                            <TooltipProvider>
                                <Tooltip delayDuration={100}>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                        >
                                            <a href="https://www.linkedin.com/in/abhijit-singh-377117284/"
                                               target='_blank' rel='noopener noreferrer'>
                                                <Image src="/icons/linkedin.png" alt="linkedin" width={100} height={100} className='object-cover'/>
                                                <span className="sr-only">Linkedin</span>
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>View linkedin profile</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip delayDuration={100}>
                                    <TooltipTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            // className="rounded-full"
                                        >
                                            <a href="https://www.instagram.com/sudamasolutions_technologies?igsh=MTJrMXZqYWk3djRlZw%3D%3D&utm_source=qr"
                                               target='_blank' rel='noopener noreferrer'>
                                                <Image src="/icons/github.png" alt="github" width={100} height={100} className='object-cover'/>
                                                <span className="sr-only">Github</span>
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>View github profile</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                </div>
                <div
                    className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © 2025 Sudama Sol Tech & Health Care Pvt Ltd. All rights reserved.
                    </p>
                    <nav className="flex gap-4 text-sm">
                        <a href="#" className="transition-colors hover:text-primary">
                            Privacy Policy
                        </a>
                        <a href="#" className="transition-colors hover:text-primary">
                            Terms of Services
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
