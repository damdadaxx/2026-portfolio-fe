import { motion, useReducedMotion } from 'framer-motion'

import Contact from '@/components/features/landing/Contact/Contact'
import Featured from '@/components/features/landing/Featured/Featured'
import Hero from '@/components/features/landing/Hero/Hero'
import Strengths from '@/components/features/landing/Strengths/Strengths'
import KeywordBanner from '@/components/ui/KeywordBanner/KeywordBanner'

// Hero 연출(제목 → 문구 → 스크롤 큐)이 끝난 뒤 마지막으로 나타난다 (fade in만)
const BANNER_REVEAL_DELAY = 1.5

export default function HomePage({ introDone }: { introDone: boolean }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <>
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
    </>
  )
}
