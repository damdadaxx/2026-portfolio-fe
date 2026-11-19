import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import GitChip from '@/components/ui/GitChip/GitChip'
import SectionTitle from '@/components/ui/SectionTitle/SectionTitle'
import SlideUp from '@/components/ui/SlideUp/SlideUp'
import { cn } from '@/utils/cn'

type CareerItem = {
  date: string
  type: string
  major?: boolean
  head?: boolean
  title: string
  desc: string
}

/**
 * 커밋 한 줄. 스크롤로 이 줄을 지나가면 선이 위에서 아래로 그려지고, 점이 채워진다.
 * (동작 줄이기 설정이면 처음부터 모두 그려진 상태다)
 */
function LogRow({
  item,
  first,
  last,
}: {
  item: CareerItem
  first: boolean
  last: boolean
}) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLLIElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 72%', 'end 72%'] })
  // 점은 줄의 시작이 기준선에 닿을 때, 선은 줄 전체가 지나가는 동안 그려진다
  const dot = useTransform(scrollYProgress, [0, 0.04], [0, 1])
  const lineScale = useTransform(scrollYProgress, [0.02, 1], [0, 1])
  const dotScale = useTransform(dot, [0, 1], [0.6, 1])
  const dotFill = useTransform(dot, [0, 1], ['#f2f1e4', '#174dc4'])

  const motionless = !!shouldReduceMotion

  return (
    <li ref={ref} className="flex gap-4 lg:gap-12">
      <p className="hidden w-[240px] shrink-0 font-sans text-lg uppercase opacity-60 lg:block">
        {item.date}
      </p>

      <div aria-hidden className="relative w-6 shrink-0 self-stretch">
        <span
          className={cn(
            'bg-brand/20 absolute left-[11px] w-0.5',
            first ? 'top-7 lg:top-3' : 'top-0',
            last ? 'h-3.5' : 'bottom-0',
          )}
        />
        <motion.span
          className={cn(
            'bg-brand absolute left-[11px] w-0.5 origin-top',
            first ? 'top-7 lg:top-3' : 'top-0',
            last ? 'h-3.5' : 'bottom-0',
          )}
          style={motionless ? undefined : { scaleY: lineScale }}
        />
        {item.major ? (
          <motion.span
            className="border-brand absolute top-[19px] left-[3px] size-[18px] lg:top-[5px] rounded-full border-2 bg-brand"
            style={motionless ? undefined : { scale: dotScale, backgroundColor: dotFill }}
          />
        ) : (
          <motion.span
            className="border-brand bg-cream absolute top-[22px] left-1.5 size-3 lg:top-2 rounded-full border-2"
            style={motionless ? undefined : { scale: dotScale, opacity: dot }}
          />
        )}
      </div>

      <div
        className={cn(
          'font-ko flex min-w-0 flex-1 flex-col gap-2 lg:gap-3',
          !last && 'pb-10 lg:pb-16',
        )}
      >
        <p className="font-sans text-sm uppercase opacity-60 lg:hidden">{item.date}</p>
        <div className="flex flex-wrap items-center gap-3">
          <GitChip label={item.type} variant="outline" />
          <p
            className={cn(
              'leading-[1.4] font-medium',
              item.major
                ? 'text-xl tracking-[-0.4px] lg:text-[40px] lg:tracking-[-0.8px]'
                : 'text-[13px] leading-normal lg:text-lg',
            )}
          >
            <SlideUp>{item.title}</SlideUp>
          </p>
          {item.head && <GitChip label="HEAD → main" />}
        </div>
        <p className="max-w-[900px] text-[15px] leading-[1.6] tracking-[-0.15px] break-keep opacity-80 lg:text-lg lg:tracking-[-0.18px]">
          <SlideUp delay={0.1}>{item.desc}</SlideUp>
        </p>
      </div>
    </li>
  )
}

/** 세로 커밋 로그. 큰 점은 주요 커리어, 빈 점은 사이 경험이다 */
export default function CareerLog() {
  const { t } = useTranslation()
  const items = t('aboutPage.career.items', { returnObjects: true }) as CareerItem[]

  return (
    <section className="flex flex-col gap-5 px-5 pt-[72px] pb-6 lg:gap-14 lg:px-[min(4vw,60px)] lg:py-[120px]">
      <SectionTitle title={t('aboutPage.career.title')} />

      <ol className="flex flex-col">
        {items.map((item, index) => (
          <LogRow
            key={item.date}
            item={item}
            first={index === 0}
            last={index === items.length - 1}
          />
        ))}
      </ol>
    </section>
  )
}
