import { motion, type MotionValue } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import ArrowRightIcon from '@/components/ui/ArrowRightIcon'
import { cn } from '@/utils/cn'

const EASE =
  'duration-[400ms] ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none'

type ViewAllButtonProps = {
  label: string
  href: string
  /** 베이지 배경 위에서 쓸 때 테두리 색. 없으면 테두리를 그리지 않는다 */
  borderColor?: MotionValue<string>
  /** 베이지 배경 위에서 항상 테두리를 그린다 */
  bordered?: boolean
  /** 좁은 화면에서 한 단계 작게 쓴다 */
  compact?: boolean
}

/** 호버하면 파란 채움이 왼쪽에서 오른쪽으로 차오르고, 라벨·화살표가 흰색이 된다 */
export default function ViewAllButton({
  label,
  href,
  borderColor,
  bordered,
  compact,
}: ViewAllButtonProps) {
  const { i18n } = useTranslation()
  const isKo = i18n.language === 'ko'

  return (
    <motion.a
      href={href}
      className={cn(
        'group bg-cream relative flex w-fit items-center overflow-hidden rounded-lg border bg-clip-padding',
        bordered ? 'border-brand' : 'border-transparent',
        compact
          ? 'gap-1 px-2.5 py-2 lg:gap-3 lg:px-8 lg:py-4'
          : 'gap-2 px-6 py-3.5 lg:gap-3 lg:px-8 lg:py-4',
      )}
      style={borderColor ? { borderColor } : undefined}
    >
      <span
        aria-hidden
        className={cn(
          'bg-brand absolute inset-0 origin-left scale-x-0 transition-transform group-hover:scale-x-100',
          EASE,
        )}
      />
      <span
        className={cn(
          'text-brand relative font-medium whitespace-nowrap transition-colors group-hover:text-white',
          isKo ? 'font-ko leading-normal' : 'uppercase',
          compact ? 'text-xs' : 'text-sm',
          'lg:text-lg',
          EASE,
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'relative grid place-items-center lg:size-6',
          compact ? 'size-4' : 'size-5',
        )}
      >
        <ArrowRightIcon
          className={cn(
            'text-brand h-[8px] w-[13px] transition-[transform,color] group-hover:translate-x-1 group-hover:text-white lg:h-[9px] lg:w-[15px]',
            EASE,
          )}
        />
      </span>
    </motion.a>
  )
}
