import { useTranslation } from 'react-i18next'

import { cn } from '@/utils/cn'

type SectionTitleProps = {
  title: string
  showAction?: boolean
  actionHref?: string
}

export default function SectionTitle({ title }: SectionTitleProps) {
  const { i18n } = useTranslation()
  const isKo = i18n.language === 'ko'

  return (
    <div className="flex flex-col items-start gap-3 lg:flex-row lg:items-end lg:justify-between">
      <h2
        className={cn(
          'text-brand min-w-0 break-keep leading-[1.15] tracking-[-0.4px] lg:tracking-normal',
          isKo
            ? 'font-display-ko text-[40px] lg:text-[clamp(2.5rem,5vw,6rem)]'
            : 'font-display text-[40px] uppercase lg:text-[clamp(2.25rem,4.2vw,5rem)]',
        )}
      >
        {title}
      </h2>
    </div>
  )
}
