import {
  animate,
  motion,
  type MotionValue,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { useEffect } from 'react'

import emojiCookie from '@/assets/images/emoji-cookie.png'
import emojiHotBeverage from '@/assets/images/emoji-hot-beverage.png'
import emojiLaptop from '@/assets/images/emoji-laptop.png'
import emojiMagicWand from '@/assets/images/emoji-magic-wand.png'

type OrbitIcon = {
  id: string
  src: string
  angle: number
  width: number
  height: number
}

const ICONS: OrbitIcon[] = [
  { id: 'magic-wand', src: emojiMagicWand, angle: 150, width: 30, height: 27 },
  { id: 'laptop', src: emojiLaptop, angle: 240, width: 30, height: 36 },
  { id: 'hot-beverage', src: emojiHotBeverage, angle: 330, width: 30, height: 29 },
  { id: 'cookie', src: emojiCookie, angle: 60, width: 30, height: 30 },
]

const CENTER = { x: 96.5, y: 48 }
const RADIUS_X = 80
const RADIUS_Y = 28
const DURATION = 16
const FRONT_Z = 20
const BACK_Z = 1

function OrbitItem({
  icon,
  ringRotation,
  popIn,
  delay,
}: {
  icon: OrbitIcon
  ringRotation: MotionValue<number>
  popIn: boolean
  delay: number
}) {
  const shouldReduceMotion = useReducedMotion()
  const transform = useTransform(ringRotation, (r) => {
    const angle = ((r + icon.angle) * Math.PI) / 180
    const x = CENTER.x + RADIUS_X * Math.cos(angle) - icon.width / 2
    const y = CENTER.y + RADIUS_Y * Math.sin(angle) - icon.height / 2
    return `translate(${x}px, ${y}px)`
  })
  const zIndex = useTransform(ringRotation, (r) => {
    const absoluteAngle = (((r + icon.angle) % 360) + 360) % 360
    return Math.sin((absoluteAngle * Math.PI) / 180) >= 0 ? FRONT_Z : BACK_Z
  })

  return (
    <motion.div className="absolute top-0 left-0" style={{ transform, zIndex }}>
      <motion.img
        src={icon.src}
        alt=""
        width={icon.width}
        height={icon.height}
        initial={popIn && !shouldReduceMotion ? { scale: 0, opacity: 0 } : undefined}
        animate={popIn && !shouldReduceMotion ? { scale: 1, opacity: 1 } : undefined}
        transition={{ type: 'spring', stiffness: 300, damping: 14, delay }}
      />
    </motion.div>
  )
}

export default function OrbitIcons({
  popIn = false,
  entranceDelay = 0,
}: {
  popIn?: boolean
  entranceDelay?: number
}) {
  const shouldReduceMotion = useReducedMotion()
  const ringRotation = useMotionValue(0)

  useEffect(() => {
    if (shouldReduceMotion) return
    const controls = animate(ringRotation, 360, {
      duration: DURATION,
      repeat: Infinity,
      ease: 'linear',
    })
    return controls.stop
  }, [ringRotation, shouldReduceMotion])

  return (
    <>
      {ICONS.map((icon, index) => (
        <OrbitItem
          key={icon.id}
          icon={icon}
          ringRotation={ringRotation}
          popIn={popIn}
          delay={entranceDelay + index * 0.08}
        />
      ))}
    </>
  )
}
