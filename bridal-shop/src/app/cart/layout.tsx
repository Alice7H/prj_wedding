import { Footer } from '@/components/Footer';

interface IUserLayout {
  children: React.ReactNode
}

export default function CartLayout({children}: IUserLayout) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
