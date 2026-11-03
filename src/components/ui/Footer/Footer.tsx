import { useTranslation } from 'react-i18next'

import CloverIcon from '@/components/ui/CloverIcon'
import { isActive, NAV_ITEMS } from '@/lib/constants/nav'
import { SOCIAL_LINKS } from '@/lib/constants/socials'
import { cn } from '@/utils/cn'
import { HOVER_UNDERLINE } from '@/utils/hoverUnderline'

import KeywordBanner from '@/components/ui/KeywordBanner/KeywordBanner'

export default function Footer() {
  const { t } = useTranslation()
  const { pathname } = window.location

  return (
    <footer className="bg-cream mx-auto max-w-[1920px] overflow-x-hidden">
      <KeywordBanner />

      <div className="flex flex-col gap-10 px-5 pt-12 lg:flex-row lg:items-start lg:justify-between lg:gap-0 lg:px-[min(4vw,60px)] lg:pt-[min(10vw,150px)]">
        <div className="flex min-w-0 flex-col items-start gap-1.5 lg:gap-2.5">
          <p className="text-sm uppercase lg:text-lg">{t('footer.menuLabel')}</p>
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'flex w-fit items-center gap-2 text-2xl lg:uppercase lg:text-[clamp(1.75rem,2.2vw,2.625rem)]',
                HOVER_UNDERLINE,
              )}
            >
              {item.label}
              {isActive(item.href, pathname) && <CloverIcon size={24} />}
            </a>
          ))}
        </div>

        <div className="flex min-w-0 flex-col items-start gap-1.5 whitespace-nowrap lg:gap-2.5 lg:items-end">
          <p className="text-sm uppercase lg:text-lg">{t('footer.linksLabel')}</p>
          {SOCIAL_LINKS.filter((social) => social.label !== 'CV').map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-block w-fit text-2xl lg:text-right lg:uppercase lg:text-[clamp(1.75rem,2.2vw,2.625rem)]',
                HOVER_UNDERLINE,
              )}
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <div className="flex items-start justify-center pt-16 pb-8 lg:pt-30 lg:pb-10">
        <p className="text-sm tracking-[-0.18px] uppercase lg:text-lg">{t('footer.copyright')}</p>
      </div>
    </footer>
  )
}
