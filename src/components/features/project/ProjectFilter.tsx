import { useEffect, useRef, useState } from 'react'

import SlideUp from '@/components/ui/SlideUp/SlideUp'
import { cn } from '@/utils/cn'

export type FilterOption<T extends string> = { value: T; label: string }

type ProjectFilterProps<T extends string> = {
  value: T
  options: FilterOption<T>[]
  label: string
  onChange: (value: T) => void
}

/** 현재 선택 + 화살표. 열리면 레이아웃 높이를 바꾸지 않는 드롭다운이 뜬다 */
export default function ProjectFilter<T extends string>({
  value,
  options,
  label,
  onChange,
}: ProjectFilterProps<T>) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const current = options.find((option) => option.value === value)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <SlideUp delay={0.2}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={label}
          onClick={() => setOpen((v) => !v)}
          className="font-ko flex cursor-pointer items-center gap-2.5 text-sm leading-normal font-medium"
        >
          {current?.label}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              'size-6 transition-transform duration-200',
              open && 'rotate-180',
            )}
          >
            <path d="M7 10l5 5 5-5" />
          </svg>
        </button>
      </SlideUp>

      {open && (
        <ul
          role="listbox"
          className="bg-cream/80 border-brand absolute top-9 right-0 z-20 flex flex-col gap-3.5 rounded-lg border-[0.5px] px-3.5 py-[18px] backdrop-blur-[10px]"
        >
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={option.value === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value)
                  setOpen(false)
                }}
                className="font-ko flex cursor-pointer flex-col gap-[3px] text-sm leading-normal font-medium whitespace-nowrap"
              >
                {option.label}
                <span
                  className={cn(
                    'h-px w-full',
                    option.value === value ? 'bg-brand' : 'bg-transparent',
                  )}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
