import { motion, useReducedMotion } from 'framer-motion'
import { Trans, useTranslation } from 'react-i18next'

import emojiEyes from '@/assets/images/emoji-eyes.png'
import emojiFlyingSaucer from '@/assets/images/emoji-flying-saucer.png'
import emojiSparkles from '@/assets/images/emoji-sparkles.png'
import ScrollCue from '@/components/ui/ScrollCue/ScrollCue'
import { cn } from '@/utils/cn'

import Avatar from './Avatar'
import NameBadge from './NameBadge'

const ENTRANCE_GROUP = {
  avatar: 0,
  title: 0.15,
  rest: 0.85,
  cue: 1.15,
}
const ENTRANCE_DURATION = 0.9
const EASE_OUT = [0.22, 1, 0.36, 1] as const
const TITLE_LINE_STAGGER = 0.14
// 글자 윗부분이 줄 높이 밖으로 나와 있어서, 마스크 아래로 충분히 내려 두어야 대기 중에 보이지 않는다
const TITLE_HIDDEN_Y = '150%'
const TITLE_LINES = ['Full-stack', 'Developer']

// play: 인트로가 끝난 뒤 true. 그 전에는 모든 요소가 숨겨진 상태로 대기한다.
export default function Hero({ play }: { play: boolean }) {
  const { t, i18n } = useTranslation()
  const isKo = i18n.language === 'ko'
  const shouldReduceMotion = useReducedMotion()

  function entrance(delay: number) {
    if (shouldReduceMotion) return {}
    return {
      initial: { opacity: 0, y: 30 },
      animate: play ? { opacity: 1, y: 0 } : undefined,
      transition: { duration: ENTRANCE_DURATION, ease: EASE_OUT, delay },
    }
  }

  const sparkleAnimate = shouldReduceMotion
    ? undefined
    : { scale: [0.8, 1.25, 0.8], opacity: [0.55, 1, 0.55] }
  const sparkleTransition = {
    duration: 1.5,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  }

  return (
    <section
      id="hero"
      className="relative overflow-hidden px-5 pt-8 pb-12 lg:min-h-[980px] lg:px-[min(7vw,150px)] lg:pt-0 lg:pb-25"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-[335px] flex-col items-center lg:max-w-[1040px] lg:pt-[130px]">
        <motion.div
          className="flex flex-col items-center"
          {...entrance(ENTRANCE_GROUP.avatar)}
        >
          <Avatar />
          <NameBadge />
        </motion.div>

        <h1 className="font-display text-brand relative py-4 text-center text-[36px] leading-[40px] lg:pt-6 lg:pb-8 lg:text-[clamp(3rem,6.25vw,7.5rem)] lg:leading-[0.96]">
          {TITLE_LINES.map((line, index) => (
            // 줄마다 마스크(overflow-hidden)를 두고 글자가 아래에서 올라오게 한다
            <span
              key={line}
              className="-my-[0.06em] block overflow-hidden py-[0.06em] whitespace-nowrap"
            >
              <motion.span
                className="block"
                initial={shouldReduceMotion ? undefined : { y: TITLE_HIDDEN_Y }}
                animate={play && !shouldReduceMotion ? { y: 0 } : undefined}
                transition={{
                  duration: 1.3,
                  ease: EASE_OUT,
                  delay: ENTRANCE_GROUP.title + index * TITLE_LINE_STAGGER,
                }}
              >
                {line}
              </motion.span>
            </span>
          ))}
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
              transition={{
                duration: 4,
                repeat: Infinity,
                times: [0, 0.9, 0.95, 1],
                ease: 'easeInOut',
              }}
            />
          </motion.span>
        </h1>

        <motion.p
          className={cn(
            'font-ko text-brand relative max-w-[335px] text-center text-[20px] leading-[1.5] tracking-[-0.4px] break-keep lg:max-w-[1040px] lg:leading-[1.4] lg:tracking-[-0.76px]',
            // 영문은 문장이 길어 한 단계 작게 써야 두 줄에 끝난다
            isKo
              ? 'lg:text-[clamp(1.75rem,2vw,2.375rem)]'
              : 'lg:text-[clamp(1.25rem,1.56vw,1.875rem)]',
          )}
          {...entrance(ENTRANCE_GROUP.rest)}
        >
          <motion.span
            className="absolute top-0 right-full z-20 mr-3 hidden lg:block"
            initial={shouldReduceMotion ? undefined : { opacity: 0 }}
            animate={play && !shouldReduceMotion ? { opacity: 1 } : undefined}
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
              b: <b className="font-bold" />,
            }}
          />
        </motion.p>

        <motion.div className="mt-6 lg:mt-0" {...entrance(ENTRANCE_GROUP.cue)}>
          <ScrollCue />
        </motion.div>
      </div>

      <motion.span
        className="absolute top-[146px] left-[9.6%] z-20 lg:hidden"
        initial={shouldReduceMotion ? undefined : { opacity: 0 }}
        animate={play && !shouldReduceMotion ? { opacity: 1 } : undefined}
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
        className="absolute z-20 top-[170px] left-[77%] h-[31px] w-[38px] lg:top-[28.8%] lg:left-[76.25%] lg:h-[clamp(1.59rem,2.66vw,3.1875rem)] lg:w-[clamp(2rem,3.33vw,4rem)]"
        // 인트로가 끝나고 다른 요소들과 같은 타이밍에 나타난 뒤에야 떠다니기 시작한다
        initial={shouldReduceMotion ? undefined : { opacity: 0 }}
        animate={
          shouldReduceMotion || !play
            ? undefined
            : { opacity: 1, y: [0, -12, 0], rotate: [0, -4, 4, 0] }
        }
        transition={{
          opacity: {
            duration: ENTRANCE_DURATION,
            ease: EASE_OUT,
            delay: ENTRANCE_GROUP.rest,
          },
          y: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: ENTRANCE_GROUP.rest,
          },
          rotate: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: ENTRANCE_GROUP.rest,
          },
        }}
      />
    </section>
  )
}
