import Header from '@/components/Header'
import React from 'react'

const RootLayout  = ({ children }:{children:React.ReactNode}) => {
  return (
      <main className='min-h-screen text-gray-400'>
          {/* header component */}
          <Header/>
          <div className='container'>
              {children}
          </div>
    </main>
  )
}

export default RootLayout 