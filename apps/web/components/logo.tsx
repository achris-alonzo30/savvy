import Image from "next/image"
import Link from "next/link"

export const Logo = () => {
    return (
        <Link href="/">
            <p className="items-center hidden lg:flex transition-all ease-in-out">
               <Image src="/logo.svg" alt="App logo" width={28} height={28} /> 
               <span className="font-semibold text-white text-xl ml-2">Savvy</span>
            </p>
        </Link>
    )
}