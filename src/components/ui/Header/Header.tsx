import { AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useActiveSection } from '@/hooks/useActiveSection'
import { NAV_ITEMS } from '@/lib/constants/nav'
import { cn } from '@/utils/cn'
import { HOVER_UNDERLINE } from '@/utils/hoverUnderline'

import LangSwitch from './LangSwitch'
import Logo from './Logo'
import MobileMenuOverlay from './MobileMenuOverlay'
import NavLink from './NavLink'

const SECTION_IDS = NAV_ITEMS.map((item) => item.id)

export default function Header() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const activeId = useActiveSection(SECTION_IDS)

  return (
    <>
      <header className="bg-glass fixed top-0 left-0 z-40 w-full backdrop-blur-[10px]">
        <div className="relative flex h-17.5 items-center justify-between px-2.25 lg:h-25 lg:px-12.25">
          <a href="#hero" aria-label="Home">
            <Logo className="size-10 lg:size-16.5" />
          </a>

          <nav className="absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-20 lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.id} href={item.id} active={activeId === item.id}>
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
              className={cn('text-brand w-fit cursor-pointer text-sm uppercase', HOVER_UNDERLINE)}
            >
              {t('mobileMenu.open')}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && <MobileMenuOverlay activeId={activeId} onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
