import {
  cubicBezier,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

import { cn } from '@/utils/cn'

const EASE = cubicBezier(0.22, 1, 0.36, 1)
// 글자 윗부분이 줄 높이 밖으로 나와 있어서, 마스크 아래로 충분히 내려 두어야 대기 중에 보이지 않는다
const HIDDEN_Y = '150%'
// 마스크가 이만큼 보이면 올라오기 시작한다
const ENTER_RATIO = 0.6

type SlideUpProps = {
  children: ReactNode
  className?: string
  /** 화면에 들어온 뒤 재생할 때의 지연(초) */
  delay?: number
  /** true 면 화면에서 완전히 벗어났다가 다시 들어올 때마다 다시 올라온다 */
  repeat?: boolean
  /** 주면 화면 진입 대신 이 스크롤 진행도(range 구간)에 맞춰 올라온다 */
  progress?: MotionValue<number>
  range?: [number, number]
}

/** 줄을 마스크로 가리고 글자가 아래에서 위로 올라오게 한다 */
export default function SlideUp({
  children,
  className,
  delay = 0,
  repeat = false,
  progress,
  range = [0, 1],
}: SlideUpProps) {
  const shouldReduceMotion = useReducedMotion()
  // 안쪽 글자는 마스크에 가려져 있어 IntersectionObserver 에 잡히지 않으므로 바깥 마스크를 관찰한다
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= ENTER_RATIO) setShown(true)
        // 일부라도 보이는 동안에는 숨기지 않아, 올리다가 갑자기 사라지는 일이 없게 한다
        else if (repeat && !entry.isIntersecting) setShown(false)
      },
      { threshold: [0, ENTER_RATIO] },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [repeat])
  const idle = useMotionValue(0)
  const scrubbedY = useTransform(progress ?? idle, range, [HIDDEN_Y, '0%'], {
    ease: EASE,
  })

  const motionProps = shouldReduceMotion
    ? {}
    : progress
      ? { style: { y: scrubbedY } }
      : {
          initial: { y: HIDDEN_Y },
          animate: { y: shown ? '0%' : HIDDEN_Y },
          transition: shown ? { duration: 1.3, ease: EASE, delay } : { duration: 0 },
        }

  return (
    <span
      ref={ref}
      className={cn('-my-[0.06em] block overflow-hidden py-[0.06em]', className)}
    >
      <motion.span className="block" {...motionProps}>
        {children}
      </motion.span>
    </span>
  )
}
