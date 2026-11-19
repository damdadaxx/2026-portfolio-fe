import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import ghostFrontal from '@/assets/images/ghost-frontal.png'
import ArrowRightIcon from '@/components/ui/ArrowRightIcon'
import SlideUp from '@/components/ui/SlideUp/SlideUp'
import { cn } from '@/utils/cn'

export default function NotFoundPage() {
  const { t, i18n } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const isKo = i18n.language === 'ko'

  return (
    <section className="font-ko flex min-h-[calc(100vh-70px)] flex-col items-center justify-center gap-6 px-5 py-16 text-center lg:min-h-[calc(100vh-100px)] lg:gap-8">
      <motion.img
        src={ghostFrontal}
        alt=""
        className="h-14.75 w-17.5 lg:h-[88px] lg:w-[105px]"
        animate={shouldReduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, -3, 3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      <h1 className="font-display text-[96px] leading-none lg:text-[clamp(8rem,14vw,16rem)]">
        <SlideUp>404</SlideUp>
      </h1>

      <div className="flex flex-col gap-2">
        <p
          className={cn(
            'text-2xl leading-[1.3] lg:text-[clamp(1.75rem,2.4vw,2.75rem)]',
            isKo ? 'font-display-ko' : 'font-display',
          )}
        >
          <SlideUp delay={0.1}>{t('notFound.title')}</SlideUp>
        </p>
        <p className="text-base leading-normal break-keep opacity-75 lg:text-lg">
          <SlideUp delay={0.2}>{t('notFound.desc')}</SlideUp>
        </p>
      </div>

      <Link
        to="/"
        className="border-brand hover:bg-brand flex h-[46px] items-center gap-2 rounded-lg border pr-4 pl-5 text-sm leading-normal font-medium whitespace-nowrap transition-colors duration-200 hover:text-white motion-reduce:transition-none"
      >
        {t('notFound.home')}
        <span className="grid size-6 place-items-center">
          <ArrowRightIcon className="h-[11px] w-[17px]" />
        </span>
      </Link>
    </section>
  )
}
