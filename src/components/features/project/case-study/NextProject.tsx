import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import ArrowRightIcon from '@/components/ui/ArrowRightIcon'
import SlideUp from '@/components/ui/SlideUp/SlideUp'

import Reveal from '@/components/ui/Reveal/Reveal'
import type { CaseStudyContent } from './types'

/** 다음 프로젝트로 이어지는 마지막 구역 */
export default function NextProject({ next }: { next: CaseStudyContent['next'] }) {
  const { t } = useTranslation()

  return (
    <section className="px-5 py-20 lg:px-[min(4vw,60px)] lg:py-40">
      <div className="border-brand font-ko flex items-center justify-between gap-6 border-t pt-8 lg:pt-10">
        <div className="flex flex-col gap-2.5">
          <p className="text-sm leading-normal font-medium opacity-70">
            <SlideUp>{t('caseStudy.ui.next')}</SlideUp>
          </p>
          <p className="text-[32px] leading-[1.3] tracking-[-0.64px] lg:text-[40px] lg:tracking-[-0.8px]">
            <SlideUp delay={0.08}>{next.name}</SlideUp>
          </p>
          <p className="text-lg leading-[1.6] tracking-[-0.18px]">
            <SlideUp delay={0.16}>{next.desc}</SlideUp>
          </p>
        </div>
        <Reveal delay={0.2} className="shrink-0">
          <Link
            to={`/project/${next.slug}`}
            aria-label={t('caseStudy.ui.nextAria')}
            className="group border-brand/50 relative grid size-16 place-items-center overflow-hidden rounded-full border-[0.5px] bg-glass backdrop-blur-[5px] lg:size-20"
          >
            <span
              aria-hidden
              className="bg-brand absolute inset-0 origin-center scale-0 rounded-full transition-transform duration-[400ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-100 motion-reduce:transition-none"
            />
            <ArrowRightIcon className="relative h-[11px] w-[17px] transition-colors group-hover:text-white" />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
