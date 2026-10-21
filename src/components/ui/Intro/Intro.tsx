import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

import Avatar from '@/components/features/landing/Hero/Avatar'

import IntroBadge, { INTRO_BADGE_DURATION } from './IntroBadge'

const MIN_VISIBLE_MS = 2200
const FONTS_TIMEOUT_MS = 2500
const AVATAR_POP_DELAY = INTRO_BADGE_DURATION - 0.1

export default function Intro({ onComplete }: { onComplete?: () => void }) {
  const shouldReduceMotion = useReducedMotion()
  const [done, setDone] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    const start = Date.now()
    const fontsReady = Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, FONTS_TIMEOUT_MS)),
    ])

    let timer: ReturnType<typeof setTimeout>
    fontsReady.then(() => {
      const remaining = Math.max(MIN_VISIBLE_MS - (Date.now() - start), 0)
      timer = setTimeout(() => setDone(true), remaining)
    })

    return () => clearTimeout(timer)
  }, [])

  function handleExitComplete() {
    document.body.style.overflow = ''
    onComplete?.()
  }

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="bg-cream fixed inset-0 z-50 flex flex-col items-center justify-center"
        >
          <div className="h-[160.448px] w-[193px] overflow-hidden">
            <motion.div
              initial={shouldReduceMotion ? undefined : { y: 175 }}
              animate={shouldReduceMotion ? undefined : { y: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 18, delay: AVATAR_POP_DELAY }}
            >
              <Avatar popIcons iconsDelay={AVATAR_POP_DELAY + 0.25} />
            </motion.div>
          </div>

          <IntroBadge className="text-accent h-11.5 w-auto lg:h-16.25" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
