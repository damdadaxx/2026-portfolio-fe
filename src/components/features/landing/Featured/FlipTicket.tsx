import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

import { cn } from '@/utils/cn'

import ProjectTicket, { type TicketItem } from './ProjectTicket'
import ProjectTicketBack from './ProjectTicketBack'

// 뒷면 코드·제목은 번역하지 않는 상표 같은 값이라 코드에 둔다
const TICKET_BACK: Record<string, { code: string; title: string }> = {
  moving: { code: 'HYOJU/PRJ.01-MV', title: 'MOVING' },
  'k-test': { code: 'HYOJU/PRJ.02-KT', title: 'K-TEST' },
}

const FLIP_DURATION = 0.8
const FLIP_EASE = [0.22, 1, 0.36, 1] as const

type FlipTicketProps = {
  item: TicketItem
  /** 지정하지 않으면 화면에 절반 이상 들어올 때 한 번 뒤집힌다 */
  flipped?: boolean
  delay?: number
  className?: string
}

export default function FlipTicket({ item, flipped, delay = 0, className }: FlipTicketProps) {
  const shouldReduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { amount: 0.5, once: true })
  const isFlipped = shouldReduceMotion ? true : (flipped ?? inView)
  const back = TICKET_BACK[item.id] ?? { code: 'HYOJU/PRJ', title: item.name.toUpperCase() }

  return (
    <div ref={ref} className={cn('perspective-[2000px]', className)}>
      <motion.div
        className="grid grid-cols-[minmax(0,1fr)] transform-3d"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : FLIP_DURATION, ease: FLIP_EASE, delay }}
      >
        <div className="col-start-1 row-start-1 backface-hidden">
          <ProjectTicketBack code={back.code} title={back.title} />
        </div>
        <div className="col-start-1 row-start-1 rotate-y-180 backface-hidden">
          <ProjectTicket item={item} />
        </div>
      </motion.div>
    </div>
  )
}
