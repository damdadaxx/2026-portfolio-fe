import { useTranslation } from 'react-i18next'

import { cn } from '@/utils/cn'
import { HOVER_UNDERLINE } from '@/utils/hoverUnderline'

type LangSwitchProps = {
  size?: 'md' | 'sm'
  tone?: 'blue' | 'beige'
  className?: string
}

const LOCALES = ['en', 'ko'] as const

export default function LangSwitch({ size = 'md', tone = 'blue', className }: LangSwitchProps) {
  const { i18n } = useTranslation()

  const textSize = size === 'md' ? 'text-lg' : 'text-sm'
  const padding = size === 'md' ? 'px-1 py-0.5' : 'px-[3px] py-px'
  const color = tone === 'blue' ? 'text-brand border-brand' : 'text-cream border-cream'

  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      {LOCALES.map((locale, index) => {
        const selected = i18n.language === locale

        return (
          <div key={locale} className="flex items-center gap-1.5">
            {index > 0 && (
              <span className={textSize + ' ' + (tone === 'blue' ? 'text-brand' : 'text-cream')}>/</span>
            )}
            <button
              type="button"
              onClick={() => i18n.changeLanguage(locale)}
              className={cn(
                'cursor-pointer rounded-md uppercase',
                !selected && HOVER_UNDERLINE,
                textSize,
                padding,
                color,
                selected ? 'border' : 'border border-transparent',
              )}
            >
              {locale}
            </button>
          </div>
        )
      })}
    </div>
  )
}
