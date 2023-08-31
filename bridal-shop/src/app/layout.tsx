import './globals.css'
import type { Metadata } from 'next'
import { Inika } from 'next/font/google'
import Image from "next/image";
import logo from  "../app/favicon.ico";
import { MenuOptions } from '@/containers/MenuOptions';
import { cookies } from 'next/dist/client/components/headers';

const inika = Inika({
  subsets: ['latin'],
  weight: ['400','700']
})

export const metadata: Metadata = {
  title: 'Bridal Shop',
  description: 'É uma vitrine de vestidos e acessórios para noivas',
}

interface IRootLayout {
  children: React.ReactNode
}

export default function RootLayout({children}: IRootLayout) {
  const isAuthenticated = cookies().has('token');

  return (
    <html lang="pt-br">
      <body className={inika.className}>
        <header className='px-16 p-4 mb-8 flex flex-col sm:flex-row justify-between items-center' id="topo">
          <Image src={logo} alt="Logo" className="self-center sm:self-start" width={40} height={40}/>
          <ul className="flex flex-col sm:flex-row items-center gap-2 text-main p-2">
            <li><a className="hover:underline" href="/">Home</a></li>
            <li><a className="hover:underline" href="/dresses">Vestidos</a></li>
            <li><a className="hover:underline" href="/accessories">Acessórios</a></li>
            <li><a className="hover:underline" href="/about-us">Sobre nós</a></li>
            {
             isAuthenticated ? <MenuOptions/> : <li><a className="hover:underline" href="/login">Login</a></li>
            }
          </ul>
        </header>
        {children}
      </body>
    </html>
  )
}
