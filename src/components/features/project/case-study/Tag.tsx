import { cn } from '@/utils/cn'

/** 기술 스택·분류 칩. md 는 소개 영역, sm 은 문제 해결 케이스에서 쓴다 */
export default function Tag({
  size = 'md',
  children,
}: {
  size?: 'md' | 'sm'
  children: string
}) {
  return (
    <span
      className={cn(
        'border-brand flex items-center rounded-lg border font-sans whitespace-nowrap',
        size === 'md' ? 'h-8 px-2 text-sm lg:text-lg' : 'h-6 px-1.5 text-sm',
      )}
    >
      {children}
    </span>
  )
}
