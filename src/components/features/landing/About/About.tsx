import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import SectionTitle from '@/components/ui/SectionTitle/SectionTitle'
import {
  SCROLL_REVEAL_INITIAL,
  SCROLL_REVEAL_TRANSITION,
  SCROLL_REVEAL_VIEWPORT,
  SCROLL_REVEAL_WHILE_IN_VIEW,
} from '@/lib/motion/scrollReveal'
import { cn } from '@/utils/cn'

type Statement = { id: string; label: string; text: string }

export default function About() {
  const { t, i18n } = useTranslation()
  const isKo = i18n.language === 'ko'
  const statements = t('about.statements', { returnObjects: true }) as Statement[]
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      id="about"
      className="overflow-x-hidden px-5 pt-18 pb-6 lg:px-[min(7vw,150px)] lg:pt-[min(10vw,200px)] lg:pb-[min(7vw,150px)]"
      initial={shouldReduceMotion ? undefined : SCROLL_REVEAL_INITIAL}
      whileInView={shouldReduceMotion ? undefined : SCROLL_REVEAL_WHILE_IN_VIEW}
      viewport={SCROLL_REVEAL_VIEWPORT}
      transition={SCROLL_REVEAL_TRANSITION}
    >
      <SectionTitle title={t('about.title')} />

      <div className="mt-8 flex min-w-0 flex-col gap-7 lg:mt-[126px] lg:gap-[70px] lg:pl-[min(28vw,547px)]">
        {statements.map((item) => (
          <div key={item.id} className="flex min-w-0 flex-col gap-2 lg:flex-row lg:items-start">
            <p
              className={cn(
                'shrink-0 text-xs font-medium uppercase lg:text-lg lg:font-light lg:normal-case',
                isKo ? 'lg:w-[clamp(4.5rem,7vw,8.75rem)]' : 'lg:w-[clamp(6.25rem,9vw,11.25rem)]',
              )}
            >
              {item.label}
            </p>
            <p
              className={cn(
                'text-brand max-w-[1073px] w-full min-w-0 break-keep text-[20px] leading-[1.5] tracking-[-0.4px] lg:tracking-normal',
                isKo
                  ? 'lg:text-[clamp(1.5rem,2.1vw,2.5rem)] lg:leading-[1.4]'
                  : 'lg:text-[clamp(1.5rem,2.2vw,2.625rem)] lg:leading-normal',
              )}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </motion.section>
  )
}
