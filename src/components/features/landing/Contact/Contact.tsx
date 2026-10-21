import { useTranslation } from 'react-i18next'

import PillButton from '@/components/ui/PillButton/PillButton'
import { cn } from '@/utils/cn'

const CONTACT_EMAIL = 'hyojudev@gmail.com'
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`

export default function Contact() {
  const { t, i18n } = useTranslation()
  const isKo = i18n.language === 'ko'

  return (
    <section
      id="contact"
      className="flex flex-col gap-8 overflow-x-hidden px-5 pt-18 pb-18 lg:flex-row lg:flex-wrap lg:gap-[min(2vw,20px)] lg:px-[min(7vw,150px)] lg:pt-[min(7vw,150px)] lg:pb-[min(13vw,270px)]"
    >
      <h2
        className={cn(
          'text-brand max-w-[800px] w-full min-w-0 break-keep leading-[1.15] tracking-[-0.4px] lg:tracking-normal',
          isKo
            ? 'font-display-ko text-[40px] lg:text-[clamp(2.5rem,5vw,6rem)]'
            : 'font-display text-[40px] uppercase lg:text-[clamp(2.25rem,4.2vw,5rem)] lg:leading-[1.05]',
        )}
      >
        {t('contact.title')}
      </h2>

      <div className="flex max-w-[800px] w-full min-w-0 flex-col gap-4 lg:gap-6 lg:pt-[min(14vw,291px)]">
        <p className="text-brand break-keep text-[20px] leading-[1.5] tracking-[-0.4px] lg:indent-[clamp(6.25rem,9vw,11.25rem)] lg:text-[clamp(1.5rem,2.2vw,2.625rem)] lg:leading-normal lg:tracking-normal">
          {t('contact.description')}
        </p>

        <a
          href={GMAIL_COMPOSE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-fit lg:ml-[clamp(6.25rem,9vw,11.25rem)]"
        >
          <PillButton
            presentational
            label={CONTACT_EMAIL}
            hideArrow
            className="lg:h-auto! lg:py-3"
            labelClassName="lg:text-[40px]!"
          />
        </a>
      </div>
    </section>
  )
}
