import { useTranslation } from 'react-i18next'

import CloverIcon from '@/components/ui/CloverIcon'
import { NAV_ITEMS } from '@/lib/constants/nav'
import { SOCIAL_LINKS } from '@/lib/constants/socials'
import { cn } from '@/utils/cn'
import { HOVER_UNDERLINE } from '@/utils/hoverUnderline'

import KeywordBanner from './KeywordBanner'

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-cream">
      <KeywordBanner />

      <div className="flex flex-col gap-10 px-5 pt-12 md:flex-row md:items-start md:justify-between md:gap-0 md:px-15 md:pt-37.5">
        <div className="flex flex-col items-start gap-2.5">
          <p className="text-lg font-medium">{t('footer.menuLabel')}</p>
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                'flex w-fit items-center gap-2 text-[28px] leading-[1.3] tracking-[-0.56px] md:text-[40px]',
                HOVER_UNDERLINE,
              )}
            >
              {t(item.key)}
              {index === 0 && <CloverIcon size={24} />}
            </a>
          ))}
        </div>

        <div className="flex flex-col items-start gap-2.5 whitespace-nowrap md:items-end">
          <p className="text-lg font-medium">{t('footer.linksLabel')}</p>
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target='_blank'
              className={cn(
                'inline-block w-fit text-2xl uppercase md:text-right md:text-[42px]',
                HOVER_UNDERLINE,
              )}
            >
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <div className="flex items-start justify-center pt-16 pb-8 md:pt-30 md:pb-10">
        <p className="text-sm tracking-[-0.18px] uppercase md:text-lg">{t('footer.copyright')}</p>
      </div>
    </footer>
  )
}
