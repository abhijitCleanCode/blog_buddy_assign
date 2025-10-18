import { ScrollArea } from "@/components/ui/scroll-area";
import Option from "@/components/dashboard/sidebar/Option";
import { Home, File, Tags, SquarePen, LaptopMinimal, Plus } from "lucide-react";

const Menu = ({ isOpen }: { isOpen: boolean }) => {
    return (
        <ScrollArea className="[&>div>div[style]]:!block">
            <nav className="h-full w-full">
                <ul className="md:pl-4 space-y-1 mb-8">
                    <Option Icon={Home} title={'Dashboard'} open={isOpen} href={"/dashboard"} />
                    <Option Icon={LaptopMinimal} title={'View Site'} open={isOpen} href={"/"} />
                    <Option Icon={File} title={'Post'} open={isOpen} href={"/dashboard/post"} />
                    <Option Icon={Plus} title={'Add Post'} open={isOpen} href={"/dashboard/add-post"} />
                    <Option Icon={Tags} title={'Category'} open={isOpen} href={"/dashboard/category"} />
                    <Option Icon={SquarePen} title={'Category'} open={isOpen} href={"/dashboard/category"} />
                </ul>
            </nav>
        </ScrollArea>
    )
}

export default Menu;
