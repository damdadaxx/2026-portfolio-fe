import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import ArrowRightIcon from '@/components/ui/ArrowRightIcon'

export default function TopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          className="bg-glass border-brand/50 text-brand fixed right-5 bottom-5 z-40 flex size-12 cursor-pointer items-center justify-center rounded-full border-[0.5px] backdrop-blur-[5px] lg:right-10 lg:bottom-10 lg:size-20"
        >
          <ArrowRightIcon className="size-5 -rotate-90 lg:size-6" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
