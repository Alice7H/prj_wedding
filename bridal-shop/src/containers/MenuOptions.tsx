'use client'
import Image from 'next/image'
import DropdownIcon from '../../public/dropdown.svg'
import { useState } from 'react';

export function MenuOptions(){
  const [isHovering, setIsHovered] = useState(false);

  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);
  return (
    <>
      <li>
        <div id="user-menu" className="relative inline-block border border-main px-2 py-1 rounded-lg"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          aria-label="User menu" aria-haspopup="true"
          tabIndex={0}
          >
          <span className='flex max-w-[50px] gap-1'>
            Opções
            <Image src={DropdownIcon} alt="Seta para exibir opções" width={15} height={15} />
          </span>

          { isHovering && (
            <div
              id="user-menu-dropdown"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
              className="z-10 absolute left-0 border bg-white shadow-xl w-[75%] px-4"
            >
              <ul className='my-4'>
                <li tabIndex={1}><a className="hover:underline" href="/user">Perfil</a></li>
                <li tabIndex={2}><a className="hover:underline" href="/cart">Compras</a></li>
                <li tabIndex={3}><a className="hover:underline" href="/api/auth/logout">Sair</a></li>
              </ul>
            </div>
          )}
        </div>
      </li>
    </>
  )
}