import Favourite from '@/components/Favourite'
import Filter from '@/components/Filter'
import Footer from '@/components/Footer'
import Nav from '@/components/Nav'
import React from 'react'

function page() {
  return (
    <>
    <Nav/>
    <Filter/>
    <Favourite/>
    <Footer/>
    </>
  )
}

export default page