import { useTranslation } from 'react-i18next'

import SlideUp from '@/components/ui/SlideUp/SlideUp'
import ViewAllButton from '@/components/ui/ViewAllButton/ViewAllButton'
import { cn } from '@/utils/cn'

type SectionTitleProps = {
  title: string
  action?: { label: string; href: string }
}

export default function SectionTitle({ title, action }: SectionTitleProps) {
  const { i18n } = useTranslation()
  const isKo = i18n.language === 'ko'

  return (
    <div className="flex flex-wrap items-end justify-between gap-x-2 gap-y-3">
      <h2
        className={cn(
          'text-brand min-w-0 break-keep',
          action && 'whitespace-nowrap',
          isKo
            ? 'font-display-ko text-[40px] leading-[1.15] tracking-[-0.4px] lg:text-[clamp(2.5rem,5vw,6rem)] lg:tracking-[-0.96px]'
            : 'font-display text-[min(32px,calc((100vw-40px)/10.6))] leading-9 lg:text-[80px] lg:leading-[0.96]',
        )}
      >
        <SlideUp repeat>{title}</SlideUp>
      </h2>
      {action && (
        <ViewAllButton label={action.label} href={action.href} bordered compact />
      )}
    </div>
  )
}
