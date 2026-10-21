import { motion, useReducedMotion } from 'framer-motion'
import { Trans, useTranslation } from 'react-i18next'

import emojiEyes from '@/assets/images/emoji-eyes.png'
import emojiFlyingSaucer from '@/assets/images/emoji-flying-saucer.png'
import emojiSparkles from '@/assets/images/emoji-sparkles.png'

import Avatar from './Avatar'
import NameBadge from './NameBadge'

const ENTRANCE_GROUP = {
  avatar: 0,
  title: 0.22,
  rest: 0.44,
}
const ENTRANCE_DURATION = 0.4

export default function Hero() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  function entrance(delay: number) {
    if (shouldReduceMotion) return {}
    return {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: ENTRANCE_DURATION, ease: 'easeOut' as const, delay },
    }
  }

  const sparkleAnimate = shouldReduceMotion
    ? undefined
    : { scale: [0.8, 1.25, 0.8], opacity: [0.55, 1, 0.55] }
  const sparkleTransition = { duration: 1.5, repeat: Infinity, ease: 'easeInOut' as const }

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-5 pt-10 pb-14 lg:min-h-[1080px] lg:px-[min(7vw,150px)] lg:pt-0 lg:pb-25"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[335px] flex-col items-center lg:max-w-[1040px] lg:pt-[149px]">
        <motion.div className="flex flex-col items-center" {...entrance(ENTRANCE_GROUP.avatar)}>
          <Avatar />
          <NameBadge />
        </motion.div>

        <motion.h1
          className="font-display text-brand relative pt-4 pb-5 text-center text-[36px] leading-[40px] uppercase lg:pt-6 lg:pb-8 lg:text-[clamp(3rem,6.25vw,7.5rem)] lg:leading-[1.05]"
          {...entrance(ENTRANCE_GROUP.title)}
        >
          <span className="block whitespace-nowrap">Full-stack</span>
          <span className="block whitespace-nowrap">Developer</span>
          <motion.span
            className="absolute top-1/2 left-full z-20 ml-[clamp(0.75rem,1.5vw,1.75rem)] hidden -translate-y-1/2 lg:block"
            {...entrance(ENTRANCE_GROUP.rest)}
          >
            <motion.img
              src={emojiEyes}
              alt=""
              style={{
                width: 'clamp(1.5rem,1.875vw,2.25rem)',
                height: 'clamp(1.33rem,1.67vw,2rem)',
                maxWidth: 'none',
              }}
              animate={shouldReduceMotion ? undefined : { scaleY: [1, 1, 0.1, 1] }}
              transition={{ duration: 4, repeat: Infinity, times: [0, 0.9, 0.95, 1], ease: 'easeInOut' }}
            />
          </motion.span>
        </motion.h1>

        <motion.p
          className="text-brand relative max-w-[335px] text-center text-[20px] leading-[1.5] break-keep lg:max-w-[1040px] lg:text-[clamp(1.75rem,2.2vw,2.625rem)] lg:leading-[1.3] lg:uppercase"
          {...entrance(ENTRANCE_GROUP.rest)}
        >
          <motion.span
            className="absolute top-0 right-full z-20 mr-3 hidden lg:block"
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
            transition={{ duration: ENTRANCE_DURATION, delay: ENTRANCE_GROUP.rest }}
          >
            <motion.img
              src={emojiSparkles}
              alt=""
              style={{
                width: 'clamp(2.75rem,4.58vw,5.5rem)',
                height: 'clamp(2.5rem,4.1vw,4.9375rem)',
                maxWidth: 'none',
              }}
              animate={sparkleAnimate}
              transition={sparkleTransition}
            />
          </motion.span>
          <Trans
            t={t}
            i18nKey="hero.statement"
            components={{
              u: (
                <span className="underline decoration-solid [text-underline-position:from-font]" />
              ),
            }}
          />
        </motion.p>
      </div>

      <motion.span
        className="absolute top-[146px] left-[9.6%] z-20 lg:hidden"
        initial={shouldReduceMotion ? undefined : { opacity: 0 }}
        animate={shouldReduceMotion ? undefined : { opacity: 1 }}
        transition={{ duration: ENTRANCE_DURATION, delay: ENTRANCE_GROUP.rest }}
      >
        <motion.img
          src={emojiSparkles}
          alt=""
          style={{ width: '40px', height: '35px', maxWidth: 'none' }}
          animate={sparkleAnimate}
          transition={sparkleTransition}
        />
      </motion.span>
      <motion.img
        src={emojiFlyingSaucer}
        alt=""
        className="absolute z-20 top-10 left-[80%] h-[31px] w-[38px] lg:top-[28.8%] lg:left-[76.25%] lg:h-[clamp(1.59rem,2.66vw,3.1875rem)] lg:w-[clamp(2rem,3.33vw,4rem)]"
        animate={shouldReduceMotion ? undefined : { y: [0, -12, 0], rotate: [0, -4, 4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </section>
  )
}
