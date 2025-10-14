import {ScrollArea} from "@/components/ui/scroll-area";
import Option from "@/components/dashboard/sidebar/Option";
import {Home} from "lucide-react";

const Menu = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <ScrollArea className="[&>div>div[style]]:!block">
            <nav className="h-full w-full">
                <div className="md:pl-4 space-y-1 mb-8">
                    <Option Icon={Home} title={'Dashboard'} open={isOpen} href={"/dashboard"} />
                </div>
            </nav>
        </ScrollArea>
    )
}

export default Menu;
