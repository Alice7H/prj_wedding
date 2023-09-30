import { Footer } from '@/components/Footer';

interface IUserLayout {
  children: React.ReactNode
}

export default function UserLayout({children}: IUserLayout) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
