import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import ArrowRightIcon from '@/components/ui/ArrowRightIcon'
import SlideUp from '@/components/ui/SlideUp/SlideUp'
import { cn } from '@/utils/cn'

import Reveal from './Reveal'
import Tag from './Tag'
import type { CaseStudyContent } from './types'

type PillProps = { href: string; label: string; primary?: boolean }

function Pill({ href, label, primary }: PillProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex h-[34px] items-center gap-1.5 rounded-lg border border-brand pr-3 pl-3.5 font-sans text-sm whitespace-nowrap uppercase transition-colors duration-200 motion-reduce:transition-none',
        primary
          ? 'bg-brand text-white hover:bg-transparent hover:text-brand'
          : 'hover:bg-brand hover:text-white',
      )}
    >
      {label}
      <ArrowRightIcon className="h-[9px] w-[14px]" />
    </a>
  )
}

type CaseStudyIntroProps = {
  content: CaseStudyContent
  serviceUrl: string
  githubFeUrl?: string
  githubBeUrl?: string
}

export default function CaseStudyIntro({
  content,
  serviceUrl,
  githubFeUrl,
  githubBeUrl,
}: CaseStudyIntroProps) {
  const { t, i18n } = useTranslation()
  const isKo = i18n.language === 'ko'

  return (
    <section className="font-ko flex flex-col items-start gap-8 px-5 pt-12 pb-12 lg:gap-10 lg:px-[min(4vw,60px)] lg:pt-[100px] lg:pb-20">
      <SlideUp>
        <Link to="/project" className="text-lg leading-normal font-medium">
          {t('caseStudy.ui.back')}
        </Link>
      </SlideUp>

      <Reveal delay={0.1} className="flex flex-wrap gap-2">
        {content.chips.map((chip) => (
          <Tag key={chip}>{chip}</Tag>
        ))}
      </Reveal>

      <h1
        className={cn(
          isKo
            ? 'font-display-ko text-[56px] leading-[1.15] tracking-[-0.56px] lg:text-[clamp(4rem,5vw,6rem)] lg:tracking-[-0.96px]'
            : 'font-display text-[40px] leading-[1.1] lg:text-[clamp(3rem,4.2vw,5rem)] lg:leading-[0.96]',
        )}
      >
        <SlideUp delay={0.15}>{content.title}</SlideUp>
      </h1>

      <p className="text-xl leading-[1.4] tracking-[-0.4px] break-keep lg:text-[clamp(1.5rem,2vw,2.375rem)] lg:tracking-[-0.76px]">
        {content.oneLiner.map((line, index) => (
          <SlideUp key={line} delay={0.3 + index * 0.12}>
            {line}
          </SlideUp>
        ))}
      </p>

      <Reveal
        delay={0.5}
        className="border-brand w-full overflow-hidden rounded-[10px] border-[1.5px]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3">
          {content.stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                'flex flex-col gap-2 px-5 py-5 font-medium lg:px-8 lg:py-7',
                index > 0 && 'border-brand/40 border-t lg:border-t-0 lg:border-l',
              )}
            >
              <p className="text-sm leading-normal opacity-60">{stat.label}</p>
              <p className="text-[32px] leading-[1.4] tracking-[-0.64px] lg:text-[40px] lg:tracking-[-0.8px]">
                {stat.value}
              </p>
              <p className="text-sm leading-normal opacity-80">{stat.sub}</p>
            </div>
          ))}
        </div>

        <div className="border-brand/40 flex flex-col gap-4 border-t bg-brand/[0.06] px-5 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-6 lg:px-8">
          <div className="flex flex-wrap gap-1.5">
            {content.stack.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {githubFeUrl && <Pill href={githubFeUrl} label={content.links.githubFe} />}
            {githubBeUrl && <Pill href={githubBeUrl} label={content.links.githubBe} />}
            <Pill href={serviceUrl} label={content.links.service} primary />
          </div>
        </div>
      </Reveal>
    </section>
  )
}
