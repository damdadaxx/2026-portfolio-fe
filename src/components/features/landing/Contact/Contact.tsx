import { useTranslation } from 'react-i18next'

export default function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h2 className="mb-4 text-2xl font-semibold md:text-3xl">{t('contact.title')}</h2>
      <p className="text-gray-500">{t('contact.description')}</p>
    </section>
  )
}
