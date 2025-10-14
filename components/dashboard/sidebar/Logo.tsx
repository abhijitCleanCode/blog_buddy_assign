import Image from "next/image";

const Logo = () => {
    return (
        <div className="grid size-10 place-content-center">
            <Image src="/icons/logo.jpg" alt="logo" width={40} height={100} className="rounded-lg shadow-sm" />
        </div>
    )
}

export default Logo;
