import SlideUp from '@/components/ui/SlideUp/SlideUp'
import { cn } from '@/utils/cn'

import Reveal from '@/components/ui/Reveal/Reveal'
import { BODY } from './styles'
import type { CaseStudyContent, PerformanceImages } from './types'

function Capture({
  chip,
  filled,
  caption,
  src,
  mobile,
  delay,
}: {
  chip: string
  filled?: boolean
  caption: string
  src: string
  mobile?: boolean
  delay?: number
}) {
  return (
    <Reveal delay={delay} className="min-w-0">
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              'font-ko rounded-[4px] border border-brand px-2 py-[3px] text-sm leading-normal font-medium whitespace-nowrap',
              filled && 'bg-brand text-white',
            )}
          >
            {chip}
          </span>
          <span className="font-sans text-sm uppercase opacity-70">{caption}</span>
        </div>
        <img
          src={src}
          alt={caption}
          className={cn(
            'w-full rounded-[10px] bg-[#212121] object-contain',
            mobile ? 'aspect-[710/772]' : 'aspect-[710/763]',
          )}
        />
      </div>
    </Reveal>
  )
}

/** Lighthouse 전후 비교 표, 측정 조건, 리포트 캡처 */
export default function PerformanceReport({
  data,
  captures: images,
}: {
  data: NonNullable<CaseStudyContent['performance']>
  captures: PerformanceImages
}) {
  const { captures, captionScores } = data
  const cell = (index: number) => (index === 2 || index === 3 ? 'font-medium' : '')
  const COLUMNS = 'grid-cols-[160fr_120fr_360fr_360fr_260fr]'

  return (
    <div className="flex flex-col gap-10">
      <p className="font-ko text-xl leading-[1.6] tracking-[-0.2px] break-keep lg:text-2xl lg:tracking-[-0.24px]">
        <SlideUp>{data.lead}</SlideUp>
      </p>

      <Reveal className="font-ko overflow-x-auto">
        <div className="min-w-[860px]">
          <div
            className={cn(
              'border-brand grid border-b py-[18px] text-sm leading-normal font-medium',
              COLUMNS,
            )}
          >
            {data.head.map((head) => (
              <p key={head} className="opacity-70">
                {head}
              </p>
            ))}
          </div>
          {data.rows.map((row) => (
            <div
              key={row[0]}
              className={cn('border-brand grid border-b py-[18px] text-lg', COLUMNS)}
            >
              {row.map((value, index) => (
                <p
                  key={index}
                  className={cn('leading-[1.6] tracking-[-0.18px]', cell(index))}
                >
                  {value}
                </p>
              ))}
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="font-ko flex flex-col gap-2 rounded-[10px] bg-cream px-5 py-6 lg:px-7">
        <p className="text-lg leading-normal font-medium">{data.conditions.title}</p>
        {data.conditions.rows.map((row) => (
          <div key={row.label} className="flex flex-col gap-1 lg:flex-row lg:gap-4">
            <p className="text-sm leading-normal font-medium lg:w-[90px] lg:shrink-0">
              {row.label}
            </p>
            <p className={cn(BODY, 'min-w-0 flex-1')}>{row.value}</p>
          </div>
        ))}
      </Reveal>

      <p className={BODY}>
        <SlideUp>{data.note}</SlideUp>
      </p>

      <div className="flex flex-col gap-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Capture
            chip={captures.before}
            caption={`${captures.desktop} · ${captures.score} ${captionScores.desktop[0]}`}
            src={images.desktopBefore}
          />
          <Capture
            chip={captures.after}
            filled
            delay={0.12}
            caption={`${captures.desktop} · ${captures.score} ${captionScores.desktop[1]}`}
            src={images.desktopAfter}
          />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <Capture
            chip={captures.before}
            caption={`${captures.mobile} · ${captures.score} ${captionScores.mobile[0]}`}
            src={images.mobileBefore}
            mobile
          />
          <Capture
            chip={captures.after}
            filled
            delay={0.12}
            caption={`${captures.mobile} · ${captures.score} ${captionScores.mobile[1]}`}
            src={images.mobileAfter}
            mobile
          />
        </div>
      </div>
    </div>
  )
}
