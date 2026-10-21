import { useTranslation } from 'react-i18next'

import { SUPPORTED_LOCALES } from '@/i18n'

export default function LocaleSelect() {
  const { i18n } = useTranslation()

  return (
    <select
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.target.value)}
      className="rounded-md border border-gray-300 bg-transparent px-2 py-1 text-sm"
      aria-label="Language"
    >
      {SUPPORTED_LOCALES.map((locale) => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  )
}
