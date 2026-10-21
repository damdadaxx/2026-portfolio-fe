import { motion, stagger, useReducedMotion, type Variants } from 'framer-motion'
import { Trans, useTranslation } from 'react-i18next'

import ghostFrontal from '@/assets/images/ghost-frontal.png'
import { NAV_ITEMS } from '@/lib/constants/nav'
import { SOCIAL_LINKS } from '@/lib/constants/socials'
import { cn } from '@/utils/cn'
import { HOVER_UNDERLINE } from '@/utils/hoverUnderline'

import LangSwitch from './LangSwitch'
import Logo from './Logo'
import NavLink from './NavLink'

type MobileMenuOverlayProps = {
  activeId: string
  onClose: () => void
}

const contentVariants: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: stagger(0.08, { startDelay: 0.2 }) },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

export default function MobileMenuOverlay({ activeId, onClose }: MobileMenuOverlayProps) {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-brand text-cream fixed inset-0 z-50 overflow-y-auto lg:hidden"
    >
      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="flex min-h-screen flex-col"
      >
        <motion.div
          variants={itemVariants}
          className="flex h-17.5 items-center justify-between px-2.25"
        >
          <a href="#hero" onClick={onClose} aria-label="Home">
            <Logo tone="beige" className="size-10" />
          </a>
          <div className="flex items-center gap-5 pr-2">
            <LangSwitch size="sm" tone="beige" />
            <button
              type="button"
              onClick={onClose}
              className={cn('w-fit cursor-pointer text-sm uppercase', HOVER_UNDERLINE)}
            >
              {t('mobileMenu.close')}
            </button>
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="font-display break-keep px-7.5 pt-15 text-[42px] leading-[1.05] uppercase"
        >
          <Trans i18nKey="mobileMenu.title" components={{ br: <br /> }} />
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-18 flex items-start justify-between px-7.5"
        >
          <motion.img
            src={ghostFrontal}
            alt=""
            className="h-14.75 w-17.5"
            animate={
              shouldReduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, -3, 3, 0] }
            }
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="flex flex-col items-end gap-1.5">
            <p className="text-xs uppercase">{t('mobileMenu.menuLabel')}</p>
            <div className="mt-1.5 flex flex-col items-end gap-1.5">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.id}
                  href={item.id}
                  tone="beige"
                  active={activeId === item.id}
                  onClick={onClose}
                  className="text-2xl"
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-col items-end gap-1.5 px-7.5"
        >
          <p className="text-xs uppercase">{t('mobileMenu.socialsLabel')}</p>
          <div className="mt-1.5 flex flex-col items-end gap-1.5">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                className={cn('inline-block w-fit text-2xl uppercase', HOVER_UNDERLINE)}
              >
                {social.label}
              </a>
            ))}
          </div>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-auto pt-16 pb-10 text-center text-[10px] tracking-[-0.1px] uppercase"
        >
          {t('footer.copyright')}
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
