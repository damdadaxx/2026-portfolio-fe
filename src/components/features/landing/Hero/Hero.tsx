import { useTranslation } from 'react-i18next'

export default function Hero() {
  const { t } = useTranslation()

  return (
    <section
      id="hero"
      className="flex min-h-screen flex-col items-center justify-center gap-4 text-center"
    >
      <p className="text-lg text-gray-500">{t('hero.greeting')}</p>
      <h1 className="text-4xl font-bold md:text-6xl">{t('hero.title')}</h1>
      <p className="text-gray-500 md:text-lg">{t('hero.description')}</p>
    </section>
  )
}
