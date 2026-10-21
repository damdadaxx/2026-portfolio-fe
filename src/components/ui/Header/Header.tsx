import { useTranslation } from 'react-i18next'

import { NAV_ITEMS } from '@/lib/constants/nav'

import LocaleSelect from './LocaleSelect'

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-6 py-4 backdrop-blur">
      <a href="#hero" className="font-semibold">
        Portfolio
      </a>
      <nav className="hidden items-center gap-6 md:flex">
        {NAV_ITEMS.map((item) => (
          <a key={item.id} href={`#${item.id}`} className="text-sm hover:opacity-70">
            {t(item.key)}
          </a>
        ))}
      </nav>
      <LocaleSelect />
    </header>
  )
}
