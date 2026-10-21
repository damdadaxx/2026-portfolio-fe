import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

import en from '@/locales/en/common.json'
import ko from '@/locales/ko/common.json'

export const SUPPORTED_LOCALES = ['ko', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ko: { common: ko },
      en: { common: en },
    },
    fallbackLng: 'ko',
    supportedLngs: SUPPORTED_LOCALES,
    defaultNS: 'common',
    interpolation: { escapeValue: false },
  })

export default i18n
