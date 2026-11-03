import { motion, useReducedMotion } from 'framer-motion'

import scrollArrow from '@/assets/icons/scroll-arrow.svg'

export default function ScrollCue() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="flex flex-col items-center gap-2.5 pt-12 opacity-70">
      <p className="text-[14px] uppercase">Scroll</p>
      <motion.img
        src={scrollArrow}
        alt=""
        className="h-10 w-3.5"
        animate={shouldReduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}
