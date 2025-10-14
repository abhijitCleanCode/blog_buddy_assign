import Link from "next/link";
import Image from "next/image";

const navItems = [
    { label: "Home", href: "/" },
    { label: "All Blogs", href: "/blogs" },
]

const Header = () => {
    return (
        <header className="my-10 flex justify-between gap-5">
            <Link href="/">
                <Image src="/icons/logo.jpg" alt="logo" width="40" height="40" className="rounded-full" />
            </Link>

            <ul className="flex flex-row items-center gap-8">
                {navItems.map((item, index) => (
                    <li key={index}>
                        <Link href={item.href}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </header>
    )
}

export default Header;
