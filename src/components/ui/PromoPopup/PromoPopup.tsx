import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import promoEn from '@/assets/images/promo-en.png'
import promoKo from '@/assets/images/promo-ko.png'
import { PROJECTS } from '@/lib/constants/projects'

const DISMISS_KEY = 'promo-dismissed-until'
const featuredProject = PROJECTS[0]

function isDismissedToday() {
  const until = localStorage.getItem(DISMISS_KEY)
  return until !== null && until === new Date().toDateString()
}

export default function PromoPopup() {
  const { t, i18n } = useTranslation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (isDismissedToday()) return
    const timer = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(timer)
  }, [])

  function dismissToday() {
    localStorage.setItem(DISMISS_KEY, new Date().toDateString())
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.3 }}
          className="bg-cream border-brand/50 fixed right-5 bottom-22 z-40 w-[min(320px,calc(100vw-2.5rem))] overflow-hidden rounded-2xl border shadow-xl lg:right-10 lg:bottom-32 lg:w-[360px]"
        >
          <img
            src={i18n.language === 'ko' ? promoKo : promoEn}
            alt={t('promo.alt')}
            className="aspect-[1200/630] w-full object-cover"
          />
          <div className="flex items-center justify-between gap-3 p-3">
            <button
              type="button"
              onClick={dismissToday}
              className="text-brand/70 hover:text-brand cursor-pointer text-[13px] underline-offset-2 hover:underline"
            >
              {t('promo.dismissToday')}
            </button>
            <a
              href={featuredProject.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border-brand hover:bg-brand hover:text-cream flex h-8 shrink-0 cursor-pointer items-center rounded-full border px-4 text-[13px] font-medium transition-colors"
            >
              {t('promo.cta')}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
