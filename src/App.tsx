import { motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

import About from '@/components/features/landing/About/About'
import Career from '@/components/features/landing/Career/Career'
import Contact from '@/components/features/landing/Contact/Contact'
import Hero from '@/components/features/landing/Hero/Hero'
import Projects from '@/components/features/landing/Projects/Projects'
import Footer from '@/components/ui/Footer/Footer'
import Header from '@/components/ui/Header/Header'
import Intro from '@/components/ui/Intro/Intro'
import KeywordBanner from '@/components/ui/KeywordBanner/KeywordBanner'
import PromoPopup from '@/components/ui/PromoPopup/PromoPopup'
import TopButton from '@/components/ui/TopButton/TopButton'

const HEADER_REVEAL_DELAY = 0.3
const CONTENT_REVEAL_DELAY = 0.7

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

      <motion.main
        className="mx-auto max-w-[1920px] overflow-x-hidden pt-17.5 lg:pt-25"
        initial={shouldReduceMotion ? undefined : { opacity: 0, y: 40 }}
        animate={introDone ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, ease: 'easeOut', delay: CONTENT_REVEAL_DELAY }}
      >
        <Hero />
        <KeywordBanner />
        <About />
        <Career />
        <Projects />
        <Contact />
      </motion.main>

      <Footer />
      <PromoPopup />
      <TopButton />
    </>
  )
}
