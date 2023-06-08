'use client'

import Header from '@/components/Header'
import PeopleList from '@/components/PeopleList'
import {StarWarsContextProvider } from '@/lib/context/StarWarsContext'

export default function Home() {

  return (
    <>
      <StarWarsContextProvider>
        <Header />
        
        <PeopleList />
      </StarWarsContextProvider>
    </>
  )
}
