import {
  cubicBezier,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

import SlideUp from '@/components/ui/SlideUp/SlideUp'
import ViewAllButton from '@/components/ui/ViewAllButton/ViewAllButton'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { useSectionEdges } from '@/hooks/useSectionEdges'
import { cn } from '@/utils/cn'

import FlipTicket from './FlipTicket'
import type { TicketItem } from './ProjectTicket'

const BACKGROUND =
  'radial-gradient(ellipse 50% 50% at 50% 50%, #6f91da 0%, #8ba6e1 62%, #b0c2eb 81%, #d5dff4 100%)'
const GLOW =
  'radial-gradient(ellipse 55% 60% at 50% 0%, rgba(139,166,225,0.95) 0%, rgba(176,194,235,0.6) 45%, rgba(213,223,244,0) 75%)'

const FLIP_STAGGER = 0.15
// 문구는 진입 구간(entry 0.3~1) 안에서 위에서부터 차례로 떠오른다
const COPY_START = 0.3
const COPY_STEP = 0.12
const COPY_LENGTH = 0.28

type CopyWrap = (index: number, node: ReactNode, mask?: boolean) => ReactNode
const riseEase = cubicBezier(0.22, 1, 0.36, 1)
const PAGE_PADDING = 'px-[min(7vw,150px)]'

function RiseItem({
  entry,
  index,
  mask,
  children,
}: {
  entry: MotionValue<number>
  index: number
  mask?: boolean
  children: ReactNode
}) {
  const start = COPY_START + index * COPY_STEP
  const range = [start, start + COPY_LENGTH]
  const y = useTransform(entry, range, [60, 0], { ease: riseEase })
  const opacity = useTransform(entry, range, [0, 1])

  if (mask) {
    return (
      <SlideUp progress={entry} range={[start, start + COPY_LENGTH]}>
        {children}
      </SlideUp>
    )
  }

  return <motion.div style={{ y, opacity }}>{children}</motion.div>
}

/** 카드가 화면 중앙에 닿으면 뒤집히고, 올라오는 동안에는 살짝 기울어져 있다 */
function ScrollTicket({ item, index }: { item: TicketItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reachedCenter = useInView(ref, { margin: '0px 0px -50% 0px' })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 45%'],
  })
  const rotate = useTransform(scrollYProgress, [0, 1], [index === 0 ? -6 : 5, 0], {
    ease: riseEase,
  })

  return (
    <motion.div ref={ref} style={{ rotate }} className="w-full max-w-175 min-w-0 flex-1">
      <FlipTicket item={item} flipped={reachedCenter} delay={index * FLIP_STAGGER} />
    </motion.div>
  )
}

/**
 * PC: 배경과 문구는 화면에 고정(sticky)해 두고, 카드가 그 위로 스크롤되어 올라온다.
 * 카드가 다 지나가면 버튼이 떠오르고, 섹션이 끝날 즈음 배경은 원래 색으로 돌아간다.
 */
function PinnedFeatured({
  items,
  renderCopy,
  viewAll,
}: {
  items: TicketItem[]
  renderCopy: (wrap: CopyWrap) => ReactNode
  viewAll: string
}) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)
  const { entry, exit } = useSectionEdges(sectionRef)
  const { scrollYProgress: rise } = useScroll({
    target: cardsRef,
    offset: ['start end', 'start 40%'],
  })

  // ① 진입: 아래에서 빛이 번지며 배경이 블루로 바뀌고 문구가 떠오른다
  const bgOpacity = useTransform(
    [entry, exit],
    ([e, x]: number[]) => Math.min(Math.max((e - 0.3) / 0.7, 0), 1) * (1 - x),
  )
  const glowScale = useTransform(entry, [0, 1], [0.3, 1.7])
  const glowOpacity = useTransform(
    [entry, exit],
    ([e, x]: number[]) => Math.min(e / 0.15, 1) * (1 - 0.5 * e) * (1 - x),
  )
  // 카드가 지나가고 나면 문구는 사라진다
  const { scrollYProgress: cardsOut } = useScroll({
    target: cardsRef,
    offset: ['end 55%', 'end 15%'],
  })
  // 카드가 올라오기 시작하면 문구는 이미 흐려져 있다
  const copyDim = useTransform(rise, [0, 1], [1, 0.35])
  const copyOpacity = useTransform(
    [copyDim, exit, cardsOut],
    ([b, x, o]: number[]) => b * (1 - x) * (1 - o),
  )
  const copyBlur = useTransform(rise, [0, 1], ['blur(0px)', 'blur(6px)'])

  // 카드 끝이 보이면 버튼이 스크롤에 맞춰 떠오른다
  const { scrollYProgress: buttonIn } = useScroll({
    target: buttonRef,
    offset: ['start 80%', 'start 58%'],
  })
  const buttonY = useTransform(buttonIn, [0, 1], [60, 0], { ease: riseEase })

  // 배경이 베이지로 돌아오면 베이지 버튼이 묻히지 않도록 테두리가 나타난다
  const buttonBorder = useTransform(
    exit,
    [0, 1],
    ['rgba(23,77,196,0)', 'rgba(23,77,196,1)'],
  )

  // 배경이 복귀하는 시점을 카드가 지나간 뒤로 미루려고 아래를 길게 두고(pb-[110vh]),
  // 그만큼 다음 섹션을 끌어올려(-mb-[75vh]) 빈 공간을 없앤다
  return (
    <section
      ref={sectionRef}
      id="projects"
      className="font-ko relative -mb-[75vh] text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{ background: BACKGROUND, opacity: bgOpacity }}
        />
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[120vh] origin-top"
          style={{ background: GLOW, scale: glowScale, opacity: glowOpacity }}
        />
        <motion.div
          className={cn(
            'relative flex flex-col items-center gap-10 pt-[180px]',
            PAGE_PADDING,
          )}
          style={{ opacity: copyOpacity, filter: copyBlur }}
        >
          {renderCopy((index, node, mask) => (
            <RiseItem entry={entry} index={index} mask={mask}>
              {node}
            </RiseItem>
          ))}
        </motion.div>
      </div>

      <div
        className={cn(
          'relative z-10 -mt-[100vh] flex flex-col items-center pt-[100vh] pb-[110vh]',
          PAGE_PADDING,
        )}
      >
        <div ref={cardsRef} className="flex w-full max-w-[1440px] gap-10">
          {items.map((item, index) => (
            <ScrollTicket key={item.id} item={item} index={index} />
          ))}
        </div>

        <motion.div
          ref={buttonRef}
          className="mt-16"
          style={{ y: buttonY, opacity: buttonIn }}
        >
          <ViewAllButton label={viewAll} href="/project" borderColor={buttonBorder} />
        </motion.div>
      </div>
    </section>
  )
}

export default function Featured() {
  const { t, i18n } = useTranslation()
  const isKo = i18n.language === 'ko'
  const items = t('featured.items', { returnObjects: true }) as TicketItem[]
  const shouldReduceMotion = useReducedMotion()
  const wide = useMediaQuery('(min-width: 94rem)')

  const renderCopy = (wrap: CopyWrap) => (
    <>
      {wrap(
        0,
        <p className="rounded-full border-[1.5px] border-white px-4 py-3 text-[15px] leading-[1.6] tracking-[-0.15px] whitespace-nowrap lg:px-9 lg:text-2xl lg:tracking-[-0.24px]">
          {t('featured.badge')}
        </p>,
      )}

      <div className="flex w-full flex-col items-center gap-2.5 text-center lg:w-auto lg:whitespace-nowrap">
        {wrap(
          1,
          <p className="text-xl leading-normal tracking-[-0.4px] lg:text-[38px] lg:leading-[1.4] lg:tracking-[-0.76px]">
            {t('featured.lead')}
          </p>,
        )}
        {wrap(
          2,
          <p
            className={cn(
              isKo
                ? 'font-display-ko text-[40px] leading-[1.15] tracking-[-0.4px] lg:text-[96px] lg:tracking-[-0.96px]'
                : 'font-display text-[min(32px,calc((100vw-40px)/10.6))] leading-9 whitespace-nowrap lg:text-[80px] lg:leading-[0.96]',
            )}
          >
            {t('featured.title')}
          </p>,
          true,
        )}
        {wrap(
          3,
          <p className="text-cream text-[15px] leading-[1.6] tracking-[-0.15px] opacity-90 lg:text-lg lg:tracking-[-0.18px]">
            {t('featured.note')}
          </p>,
        )}
      </div>
    </>
  )

  if (wide && !shouldReduceMotion) {
    return (
      <PinnedFeatured
        items={items}
        renderCopy={renderCopy}
        viewAll={t('featured.viewAll')}
      />
    )
  }

  return (
    <section
      id="projects"
      className={cn(
        'font-ko flex flex-col items-center gap-8 py-18 text-white lg:gap-10 lg:pt-[180px] lg:pb-[200px]',
        'px-5 lg:px-[min(7vw,150px)]',
      )}
      style={{ background: BACKGROUND }}
    >
      {renderCopy((_, node, mask) => (mask ? <SlideUp>{node}</SlideUp> : node))}

      <div className="flex w-full max-w-[1440px] flex-col items-center gap-5 pt-7 lg:gap-10 lg:pt-10 wide:flex-row wide:items-stretch">
        {items.map((item) => (
          <FlipTicket
            key={item.id}
            item={item}
            className="w-full max-w-175 wide:min-w-0 wide:flex-1"
          />
        ))}
      </div>

      <ViewAllButton label={t('featured.viewAll')} href="/project" />
    </section>
  )
}
