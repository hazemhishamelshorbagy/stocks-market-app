import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavItems from './NavItems'
import Userdropdown from './Userdropdown'
import { UserInfo } from 'os'

const Header = ({user}:{user:User}) => {
  return (
      <header className='sticky top-0 header'>
          <div className='container header-wrapper'>
              <Link href={"/"}>
              <Image src={"/assets/icons/logo.svg"} className='h-8 w-auto cursor-pointer' alt='signalist logo' width={140} height={32}/>
              </Link> 
              <nav className='hidden sm:block'>
             <NavItems/>
              </nav>
        <Userdropdown user={user} />
          </div>
    </header>
  )
}

export default Header