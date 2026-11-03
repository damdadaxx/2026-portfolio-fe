import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { isActive, NAV_ITEMS } from '@/lib/constants/nav'
import { cn } from '@/utils/cn'
import { HOVER_UNDERLINE } from '@/utils/hoverUnderline'

import LangSwitch from './LangSwitch'
import Logo from './Logo'
import MobileMenuOverlay from './MobileMenuOverlay'
import NavLink from './NavLink'

// 이 높이를 지나기 전에는 항상 보이고, 지난 뒤에는 내릴 때 숨고 올릴 때 나타난다
const HIDE_AFTER = 100
const SCROLL_TOLERANCE = 2

export default function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const { pathname } = window.location
  const shouldReduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const delta = y - (scrollY.getPrevious() ?? y)
    if (y < HIDE_AFTER) setHidden(false)
    else if (delta > SCROLL_TOLERANCE) setHidden(true)
    else if (delta < -SCROLL_TOLERANCE) setHidden(false)
  })

  return (
    <>
      <motion.header
        className="bg-glass fixed top-0 left-0 z-40 w-full backdrop-blur-[10px]"
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        onFocusCapture={() => setHidden(false)}
      >
        <div className="relative mx-auto flex h-17.5 max-w-[1920px] items-center justify-between px-2.25 lg:h-25 lg:px-12.25">
          <a href="/" aria-label="Home">
            <Logo className="size-10 lg:size-16.5" />
          </a>

          <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-20 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                active={isActive(item.href, pathname)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center lg:flex">
            <LangSwitch />
          </div>

          <div className="flex items-center gap-5 lg:hidden">
            <LangSwitch size="sm" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={cn(
                'text-brand w-fit cursor-pointer text-sm uppercase',
                HOVER_UNDERLINE,
              )}
            >
              {t('mobileMenu.open')}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && <MobileMenuOverlay pathname={pathname} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
