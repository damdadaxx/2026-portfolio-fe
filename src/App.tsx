import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

import Featured from '@/components/features/landing/Featured/Featured'
import Contact from '@/components/features/landing/Contact/Contact'
import Hero from '@/components/features/landing/Hero/Hero'
import Strengths from '@/components/features/landing/Strengths/Strengths'
import Footer from '@/components/ui/Footer/Footer'
import Header from '@/components/ui/Header/Header'
import Intro from '@/components/ui/Intro/Intro'
import KeywordBanner from '@/components/ui/KeywordBanner/KeywordBanner'
import TopButton from '@/components/ui/TopButton/TopButton'

const HEADER_REVEAL_DELAY = 0.3
// Hero 연출(제목 → 문구 → 스크롤 큐)이 끝난 뒤 마지막으로 나타난다 (fade in만)
const BANNER_REVEAL_DELAY = 1.5

export default function App() {
  const shouldReduceMotion = useReducedMotion()
  const [introDone, setIntroDone] = useState(false)

  return (
    <>
      <Intro onComplete={() => setIntroDone(true)} />

      <motion.div
        initial={shouldReduceMotion ? undefined : { opacity: 0 }}
        animate={introDone ? { opacity: 1 } : undefined}
        transition={{ duration: 0.4, ease: 'easeOut', delay: HEADER_REVEAL_DELAY }}
      >
        <Header />
      </motion.div>

      <main className="mx-auto max-w-[1920px] overflow-x-clip pt-17.5 lg:pt-25">
        <Hero play={introDone} />
        <motion.div
          initial={shouldReduceMotion ? undefined : { opacity: 0 }}
          animate={introDone ? { opacity: 1 } : undefined}
          transition={{ duration: 0.9, ease: 'easeOut', delay: BANNER_REVEAL_DELAY }}
        >
          <KeywordBanner />
        </motion.div>
        <Featured />
        <Strengths />
        <Contact />
      </main>

      <Footer />
      <TopButton />
    </>
  )
}
