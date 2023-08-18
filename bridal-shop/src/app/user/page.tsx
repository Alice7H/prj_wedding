'use client'
import Link from "next/link";
import Avatar from "../../../public/vercel.svg"
import Image from "next/image";
import { useEffect, useState } from "react";
import { User, getUser } from "@/lib/auth";

export default function Profile(){
  const [user, setUser] = useState<User>();

  useEffect(() => {
    function getCurrentUser() {
      const result = getUser();
      setUser(result);
    }
    getCurrentUser();
  }, [])


  return (
    <main className="flex flex-col justify-center items-center text-main">
      {
        user?.avatarUrl
        ? <Image src={user.avatarUrl} alt="avatar" className="my-10 sm:my-8 rounded-full" width={200} height={200}/>
        : <Image src={Avatar} alt="avatar" className="my-8" width={200} height={200}/>
      }
      <h1>Bem vinda(o) {user?.name}</h1>
      <br />
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/user/favorites" className="border border-main rounded-xl p-4 sm:my-4">Ver favoritos</Link>
        <Link href="/" className="border border-main rounded-xl p-4 sm:my-4">Ver carrinho</Link>
      </div>
    </main>
  );
}