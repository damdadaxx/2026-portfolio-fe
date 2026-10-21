import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import SectionTitle from '@/components/ui/SectionTitle/SectionTitle'
import {
  SCROLL_REVEAL_INITIAL,
  SCROLL_REVEAL_TRANSITION,
  SCROLL_REVEAL_VIEWPORT,
  SCROLL_REVEAL_WHILE_IN_VIEW,
} from '@/lib/motion/scrollReveal'

type DetailGroup = { id: string; label: string; lines: string[] }

function DetailGroupBlock({ group }: { group: DetailGroup }) {
  return (
    <div className="flex flex-col items-start gap-2 lg:gap-3">
      <p className="text-xs font-medium uppercase lg:text-lg lg:font-light">{group.label}</p>
      {group.lines.map((line) => (
        <p
          key={line}
          className="max-w-[527px] w-full text-[15px] leading-[1.6] tracking-[-0.15px] lg:text-[clamp(1.125rem,1.7vw,1.5rem)] lg:tracking-[-0.24px]"
        >
          {line}
        </p>
      ))}
    </div>
  )
}

export default function Career() {
  const { t } = useTranslation()
  const details = t('career.details', { returnObjects: true }) as DetailGroup[]
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      id="career"
      className="overflow-x-hidden px-5 pt-18 pb-6 lg:p-[min(7vw,150px)]"
      initial={shouldReduceMotion ? undefined : SCROLL_REVEAL_INITIAL}
      whileInView={shouldReduceMotion ? undefined : SCROLL_REVEAL_WHILE_IN_VIEW}
      viewport={SCROLL_REVEAL_VIEWPORT}
      transition={SCROLL_REVEAL_TRANSITION}
    >
      <SectionTitle title={t('career.title')} />

      <p className="text-brand mt-8 max-w-[1210px] w-full break-keep text-[20px] leading-[1.5] tracking-[-0.4px] lg:mt-25 lg:pl-[clamp(4.5rem,21vw,25.625rem)] lg:text-[clamp(1.5rem,2.2vw,2.625rem)] lg:leading-normal lg:tracking-normal">
        {t('career.summary')}
      </p>

      <div className="mt-7 flex min-w-0 flex-col gap-7 lg:mt-35 lg:flex-row lg:flex-wrap lg:gap-x-[clamp(2rem,8vw,9.8125rem)] lg:gap-y-12 lg:pl-[clamp(4.5rem,21vw,25.625rem)]">
        <div className="flex flex-col gap-7 lg:gap-12">
          <DetailGroupBlock group={details[0]} />
          <DetailGroupBlock group={details[1]} />
        </div>
        <div className="flex flex-col gap-7 lg:gap-12">
          <DetailGroupBlock group={details[2]} />
          <DetailGroupBlock group={details[3]} />
        </div>
      </div>
    </motion.section>
  )
}
