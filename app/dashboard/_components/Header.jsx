"use client"
import React, {useEffect} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import {UserButton} from "@clerk/nextjs";
import {usePathname} from "next/navigation";

function Header() {

    const path = usePathname();
    useEffect(() => {
        console.log(path)

    }, []);

    return (
        <div className="flex p-4 items-center justify-between bg-secondary shadow-md rounded-sm">
            <Image src={'/logo.png'} width={50} height={50}  alt="logo"/>
            <ul className=" hidden md:flex gap-6" >
                <li className={`hover:text-primary hover:font-bold transition-all hover:scale-105 cursor-pointer ${path==='/dashboard' && 'text-primary font-bold'}`}><Link href='/'>Home</Link></li>
                <li className={`hover:text-primary hover:font-bold transition-all hover:scale-105 cursor-pointer ${path==='/dashboard/questions' && 'text-primary font-bold'}`}><Link href='/questions'>Questions</Link></li>
                <li className={`hover:text-primary hover:font-bold transition-all hover:scale-105 cursor-pointer ${path==='/dashboard/upgrade' && 'text-primary font-bold'}`}><Link href='/upgrade'>Upgrade</Link></li>
                <li className={`hover:text-primary hover:font-bold transition-all hover:scale-105 cursor-pointer ${path==='/dashboard/hiw' && 'text-primary font-bold'}`}><Link href='/hiw'>How It Works ?</Link></li>
                <li className={`hover:text-primary hover:font-bold transition-all hover:scale-105 cursor-pointer ${path==='/dashboard/about' && 'text-primary font-bold'}`}><Link href='/about'>About</Link></li>
                <li className={`hover:text-primary hover:font-bold transition-all hover:scale-105 cursor-pointer ${path==='/dashboard/contact' && 'text-primary font-bold'}`}><Link href='/contact'>Contact</Link></li>
            </ul>
            <UserButton/>
        </div>
    )
}

export default Header
