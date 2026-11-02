import React, { PropsWithChildren } from 'react'
import Header from './header'
import PublicFooter from './footer'
import { FloatingWhatsApp } from '../shared/floating-whatsapp'
import { MobileBottomNav } from './mobile-bottom-nav'

const PublicLayout = (
    {children}: PropsWithChildren
) => {
  return (
    <div>
      <Header />
      <main className='bg-white pb-20 lg:pb-0'>
        {children}
      </main>
      <PublicFooter />
      <FloatingWhatsApp />
      <MobileBottomNav />
    </div>
  )
}

export default PublicLayout
