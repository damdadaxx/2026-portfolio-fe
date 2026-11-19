import { useTranslation } from 'react-i18next'

import EmailCopy from '@/components/ui/EmailCopy/EmailCopy'
import SlideUp from '@/components/ui/SlideUp/SlideUp'
import { cn } from '@/utils/cn'

const CONTACT_EMAIL = 'hyojudev@gmail.com'
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${CONTACT_EMAIL}`

export default function Contact() {
  const { t, i18n } = useTranslation()
  const isKo = i18n.language === 'ko'

  return (
    <section
      id="contact"
      className="relative flex flex-col items-center overflow-hidden px-5 py-18 lg:px-[min(7vw,150px)] lg:pt-[200px] lg:pb-[240px]"
    >
      <div className="relative flex flex-col items-center text-center">
        <h2
          className={cn(
            'text-brand break-keep',
            isKo
              ? 'font-display-ko text-[56px] leading-[1.1] tracking-[-0.56px] lg:text-[clamp(3rem,6.25vw,7.5rem)] lg:tracking-[-1.2px]'
              : 'font-display text-[min(36px,calc((100vw-40px)/10.3))] leading-[1.1] whitespace-nowrap lg:text-[clamp(3rem,6.25vw,7.5rem)] lg:leading-[0.96]',
          )}
        >
          {t('contact.title')
            .split('<br />')
            .map((line, index) => (
              <SlideUp key={line} repeat delay={index * 0.14}>
                {line}
              </SlideUp>
            ))}
        </h2>
        <p className="font-ko pt-10 text-[15px] leading-[1.6] tracking-[-0.15px] break-keep lg:pt-16 lg:text-2xl lg:tracking-[-0.24px]">
          <SlideUp repeat delay={0.35}>
            {t('contact.description')}
          </SlideUp>
        </p>
        <div className="pt-7 lg:pt-10">
          <EmailCopy email={CONTACT_EMAIL} href={GMAIL_COMPOSE_URL} delay={0.5} />
        </div>
      </div>
    </section>
  )
}
