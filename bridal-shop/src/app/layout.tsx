import './globals.css'
import type { Metadata } from 'next'
import { Inika } from 'next/font/google'
import Image from "next/image";
import logo from  "../app/favicon.ico";
import { LoginLogout } from '@/containers/LoginLogout';

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
  return (
    <html lang="pt-br">
      <body className={inika.className}>
        <header className='p-4 flex flex-col sm:flex-row justify-between items-center'>
          <Image src={logo} alt="Logo" className="self-center sm:self-start" width={40} height={40}/>
          <ul className="flex flex-col sm:flex-row items-center gap-2 text-main p-2">
            <li><a className="hover:underline" href="/">Home</a></li>
            <li><a className="hover:underline" href="/dresses">Vestidos</a></li>
            <li><a className="hover:underline" href="/accessories">Acessórios</a></li>
            <li><a className="hover:underline" href="/about-us">Sobre nós</a></li>
            <LoginLogout/>
          </ul>
        </header>
        {children}
      </body>
    </html>
  )
}
