import { motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Footer from '@/components/ui/Footer/Footer'
import Header from '@/components/ui/Header/Header'
import Intro from '@/components/ui/Intro/Intro'
import TopButton from '@/components/ui/TopButton/TopButton'
import { usePageView } from '@/hooks/usePageView'
import AboutPage from '@/pages/AboutPage'
import HomePage from '@/pages/HomePage'
import ProjectDetailPage from '@/pages/ProjectDetailPage'
import ProjectPage from '@/pages/ProjectPage'

const HEADER_REVEAL_DELAY = 0.3

export default function App() {
  const shouldReduceMotion = useReducedMotion()
  const { pathname } = useLocation()
  // 인트로는 첫 진입이 홈일 때만 재생한다
  const [playIntro] = useState(pathname === '/')
  const [introDone, setIntroDone] = useState(!playIntro)

  usePageView()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      {playIntro && <Intro onComplete={() => setIntroDone(true)} />}

      <motion.div
        initial={shouldReduceMotion || !playIntro ? undefined : { opacity: 0 }}
        animate={introDone ? { opacity: 1 } : undefined}
        transition={{
          duration: 0.4,
          ease: 'easeOut',
          delay: playIntro ? HEADER_REVEAL_DELAY : 0,
        }}
      >
        <Header />
      </motion.div>

      <main className="mx-auto max-w-[1920px] overflow-x-clip pt-17.5 lg:pt-25">
        <Routes>
          <Route path="/" element={<HomePage introDone={introDone} />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="/project/:slug" element={<ProjectDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<HomePage introDone={introDone} />} />
        </Routes>
      </main>

      <Footer />
      <TopButton />
    </>
  )
}
