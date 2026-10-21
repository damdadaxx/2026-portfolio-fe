import { useTranslation } from 'react-i18next'

export default function Skills() {
  const { t } = useTranslation()

  return (
    <section id="skills" className="mx-auto max-w-3xl px-6 py-24">
      <h2 className="mb-6 text-2xl font-semibold md:text-3xl">{t('skills.title')}</h2>
    </section>
  )
}
