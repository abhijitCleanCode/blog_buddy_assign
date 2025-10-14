import {Plus} from "lucide-react";

interface HeroProps {
    title: string;
    description: string;
}

const HeroSection = ({ title, description }: HeroProps) => {
    return (
        <section className="relative fade-bottom overflow-hidden" >
            <div className="flex gap-6 flex-col items-center justify-center border-text-red-500 relative mx-auto h-full bg-background border py-12 p-6 [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)]">
                <Plus
                    strokeWidth={4}
                    className="text-text-red-500 absolute -left-5 -top-5 h-10 w-10"
                />
                <Plus
                    strokeWidth={4}
                    className="text-text-red-500 absolute -bottom-5 -left-5 h-10 w-10"
                />
                <Plus
                    strokeWidth={4}
                    className="text-text-red-500 absolute -right-5 -top-5 h-10 w-10"
                />
                <Plus
                    strokeWidth={4}
                    className="text-text-red-500 absolute -bottom-5 -right-5 h-10 w-10"
                />
                    {/* Title */}
                    <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                        {title}
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
                        {description}
                    </p>
            </div>
        </section>
    )
}

export default HeroSection;
