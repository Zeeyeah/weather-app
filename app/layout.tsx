import type { Metadata } from 'next'
import { Sora } from 'next/font/google'
import './globals.css'
import { use } from 'react'
import Link from 'next/link'
import AutocompleteSearch from './components/AutoCompleteSearch'
import CityList from './components/CityList'
import BackgroundColors from './components/BackgroundColors'

const sora = Sora({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Weather App',
  description: 'OpenWeather API Weather App',
}
async function getCityList() {
  const res = await fetch(
    'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20',
    {
      cache: 'force-cache',
    }
  )
  return await res.json()
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={sora.className + ' p-3 lg:p-6'}>
        <BackgroundColors />
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-[1fr_270px] xl:grid-cols-[1fr_400px] min-h-[500px] bg-white/10 rounded-3xl relative z-[5] backdrop-blur-[200px]">
          {children}
          <div>
            <CityList />
          </div>
        </div>
      </body>
    </html>
  )
}
