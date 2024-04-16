'use client'

import { observer } from 'mobx-react-lite'
import React from 'react'
import { getRootStore } from '../models/RootStore'
import '@/styles/background-styles.css'

const BackgroundColors = observer(() => {
  const rootStore = getRootStore()
  return (
    <div className={rootStore.colorTheme.color + ' transition-all'}>
      <div className="absolute top-[50px] z-[3] left-[30%] bg-[var(--primary)] h-[60vh] w-[30vw] rounded-[50%]"></div>
      <div className="absolute top-[50px] z-[3] left-[10%] bg-[var(--color-2)] h-[30vh] w-[30vw] rounded-[50%]"></div>
      <div className="absolute top-[50%] z-[3] left-[10%] bg-[var(--color-3)] h-[20vh] w-[30vw] rounded-[50%]"></div>
      <div className="absolute bottom-[100px] z-[3] left-[50%] bg-[var(--color-4)] h-[20vh] w-[30vw] rounded-[50%]"></div>
    </div>
  )
})

export default BackgroundColors
