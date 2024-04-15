'use client'
import React, { useEffect, useState, useRef, useMemo } from 'react'
import Link from 'next/link'

interface City {
  geoname_id: number
  name: string
  cou_name_en: string
}

const CityList = () => {
  const [cityList, setCityList] = useState<City[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [navBar, setNavBar] = useState(false)
  const [offset, setOffset] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    async function getCityList() {
      const res = await fetch(
        `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&offset=${offset}`
      )
      const data: { results: City[] } = await res.json()
      setCityList((prevCityList) => [...prevCityList, ...data.results])
    }

    getCityList()
  }, [offset])

  const filteredCityList = useMemo(() => {
    return cityList.filter((city) => {
      return city.name.toLowerCase().includes(inputValue.toLowerCase())
    })
  }, [cityList, inputValue])

  //   useEffect(() => {
  //     setCityList((prev) => {
  //       return prev.filter((city) =>
  //         city.name.toLowerCase().includes(inputValue.toLowerCase())
  //       )
  //     })
  //   }, [inputValue])

  useEffect(() => {
    let observer: IntersectionObserver | null = null

    if (loadMoreRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setOffset((prevOffset) => prevOffset + 20)
            }
          })
        },
        { rootMargin: '0px 0px 100px 0px' }
      )
      observer.observe(loadMoreRef.current)
    }

    return () => {
      if (observer) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="bg-[rgba(0,0,0,0.2)] h-[100svh] overflow-x-hidden overflow-y-scroll w-300 lg:relative fixed top-0 right-0 "
    >
      <div className=" bg-black/10 sticky z-[2] top-0 w-[100%]">
        <div className="blury-card w-[100%] h-[100%] p-3 relative">
          <input
            type="text"
            placeholder="Search cities..."
            className="w-[100%] bg-white/20 p-[10px] pl-[15px] pr-[15px] rounded-3xl"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="absolute right-7 top-5">
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.375 14.6874H15.3875L15.0375 14.3499C16.2625 12.9249 17 11.0749 17 9.06241C17 4.57491 13.3625 0.937408 8.875 0.937408C4.3875 0.937408 0.75 4.57491 0.75 9.06241C0.75 13.5499 4.3875 17.1874 8.875 17.1874C10.8875 17.1874 12.7375 16.4499 14.1625 15.2249L14.5 15.5749V16.5624L20.75 22.7999L22.6125 20.9374L16.375 14.6874ZM8.875 14.6874C5.7625 14.6874 3.25 12.1749 3.25 9.06241C3.25 5.94991 5.7625 3.43741 8.875 3.43741C11.9875 3.43741 14.5 5.94991 14.5 9.06241C14.5 12.1749 11.9875 14.6874 8.875 14.6874Z"
                fill="white"
                fillOpacity="0.3"
              />
            </svg>
          </div>
          <div className="flex items-center gap-3 mt-2">
            <div>
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.0744 5.10469L11.9562 16.6148C12.104 16.7845 12.1861 17.0016 12.1877 17.2266V24.218C12.1867 24.3159 12.2167 24.4117 12.2735 24.4916C12.3302 24.5714 12.4107 24.6313 12.5035 24.6627L17.1998 26.2254C17.27 26.2489 17.3448 26.2553 17.4179 26.2441C17.4911 26.2329 17.5605 26.2044 17.6205 26.1609C17.6804 26.1175 17.7291 26.0604 17.7625 25.9944C17.796 25.9283 17.8132 25.8553 17.8127 25.7813V17.2266C17.8151 17.0012 17.8982 16.7841 18.0471 16.6148L27.926 5.10469C28.0281 4.9857 28.094 4.83992 28.1159 4.68461C28.1377 4.52931 28.1146 4.371 28.0493 4.22844C27.9839 4.08587 27.879 3.96504 27.7471 3.88024C27.6152 3.79545 27.4617 3.75025 27.3049 3.75H2.69842C2.54134 3.74969 2.38747 3.79448 2.2551 3.87905C2.12274 3.96363 2.01743 4.08443 1.95171 4.22711C1.88599 4.36978 1.86262 4.52832 1.88437 4.68389C1.90611 4.83946 1.97207 4.98551 2.0744 5.10469Z"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.96729 8.86572H28.2173M6.65479 15.4282H23.5298M12.2798 21.9907H17.9048"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      {filteredCityList.map((item) => (
        <Link href={`/city/${item.name}`} key={item.geoname_id}>
          <div className="p-4 hover:bg-black/10">
            <h1 className="text-[18px]">{item.name}</h1>
            <p className="opacity-70 text-[14px]">{item.cou_name_en}</p>
          </div>
        </Link>
      ))}
      <div
        ref={loadMoreRef}
        className="h-10 w-10 border border-white rounded-[50%] m-[0_auto]"
      />
    </div>
  )
}

export default CityList
