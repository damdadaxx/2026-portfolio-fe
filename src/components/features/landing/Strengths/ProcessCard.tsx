import {
  cubicBezier,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import graphSolid from '@/assets/icons/graph-solid.svg'
import SlideUp from '@/components/ui/SlideUp/SlideUp'
import { cn } from '@/utils/cn'

export type ProcessItem = { no: string; lead: string; em: string; body: string }

const fillEase = cubicBezier(0.22, 1, 0.36, 1)
const FILL_START = 0.08
const FILL_LENGTH = 0.3
const FILL_STAGGER = 0.06

// 커밋 그래프 좌표(1620 기준). 선이 이 카드의 커밋 점에 닿을 즈음 글자가 올라온다
const GRAPH_WIDTH = 1620
const COMMIT_X = 190
const CARD_STEP = 408
const TEXT_BEFORE = 0.07
const TEXT_AFTER = 0.04
const TEXT_LINE_STEP = 0.02

const HIDDEN = 'inset(100% 0 0 0)'
const SHOWN = 'inset(0% 0 0 0)'

type ProcessCardProps = {
  item: ProcessItem
  index: number
  /** 있으면 스크롤 진행도에 맞춰 카드가 아래에서부터 채워진다. 없으면 화면에 들어올 때 한 번 채워진다. */
  progress?: MotionValue<number>
  /** main 선이 그려진 비율(0~1). 있으면 글자가 선을 따라 올라온다 */
  lineProgress?: MotionValue<number>
}

export default function ProcessCard({
  item,
  index,
  progress,
  lineProgress,
}: ProcessCardProps) {
  const { i18n } = useTranslation()
  const isKo = i18n.language === 'ko'
  const shouldReduceMotion = useReducedMotion()

  // clip-path 로 가려진 요소는 IntersectionObserver 에 잡히지 않으므로 가려지지 않는 바깥 상자를 관찰한다
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })

  // 줄(lead → em → body)마다 조금씩 늦게 올라오는 슬라이드업 속성
  const commitReach = (COMMIT_X + CARD_STEP * index) / GRAPH_WIDTH
  const slide = (line: number) =>
    lineProgress
      ? {
          progress: lineProgress,
          range: [
            commitReach - TEXT_BEFORE + line * TEXT_LINE_STEP,
            commitReach + TEXT_AFTER + line * TEXT_LINE_STEP,
          ] as [number, number],
        }
      : { repeat: true, delay: line * 0.12 }

  const idle = useMotionValue(0)
  const start = FILL_START + index * FILL_STAGGER
  const fill = useTransform(progress ?? idle, [start, start + FILL_LENGTH], [0, 1], {
    ease: fillEase,
  })
  const scrubbedClip = useTransform(fill, (v) => `inset(${(1 - v) * 100}% 0 0 0)`)

  const motionProps = shouldReduceMotion
    ? {}
    : progress
      ? { style: { clipPath: scrubbedClip } }
      : {
          initial: { clipPath: HIDDEN },
          animate: { clipPath: inView ? SHOWN : HIDDEN },
          transition: { duration: 0.9, ease: fillEase },
        }

  return (
    <div
      ref={ref}
      className={cn(
        'flex w-full wide:h-[var(--card-h,776px)] wide:min-w-0 wide:flex-1',
        isKo ? 'min-h-[260px]' : 'min-h-[290px]',
      )}
    >
      <motion.div
        {...motionProps}
        className="bg-brand text-cream relative flex w-full flex-1 flex-col justify-end overflow-hidden wide:block"
      >
        <p className="absolute top-[26px] left-5 text-sm wide:text-lg">{item.no}</p>
        <img
          src={graphSolid}
          alt=""
          className="absolute top-[calc(var(--card-h,776px)*0.54)] left-0 hidden h-px w-full wide:block"
        />
        <div className="font-ko flex flex-col px-5 pt-16 pb-7 break-keep wide:absolute wide:inset-x-5 wide:bottom-7 wide:p-0">
          <p className="text-xl leading-[1.5] tracking-[-0.4px] wide:text-[32px] wide:tracking-[-0.64px]">
            <SlideUp {...slide(0)}>{item.lead}</SlideUp>
          </p>
          <p
            className={cn(
              isKo
                ? 'font-display-ko text-[40px] leading-[1.15] tracking-[-0.4px]'
                : 'font-display text-[32px] leading-9',
            )}
          >
            <SlideUp {...slide(1)}>{item.em}</SlideUp>
          </p>
          <p className="mt-5 text-[15px] leading-[1.6] tracking-[-0.15px] wide:text-lg wide:tracking-[-0.18px]">
            <SlideUp {...slide(2)}>{item.body}</SlideUp>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
