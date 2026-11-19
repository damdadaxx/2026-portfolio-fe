import { cn } from '@/utils/cn'

const DOTS = ['#ff5f57', '#febc2e', '#28c840']

/** 브라우저 창 모양 틀. lg 는 대표 화면, sm 은 서비스 소개의 작은 화면에 쓴다 */
export default function BrowserFrame({
  size = 'sm',
  className,
  children,
}: {
  size?: 'lg' | 'sm'
  className?: string
  children: React.ReactNode
}) {
  const lg = size === 'lg'

  return (
    <div
      className={cn(
        'w-full overflow-hidden border border-[#dbdbd6] bg-white',
        lg ? 'rounded-[10px] lg:rounded-2xl' : 'rounded-[10px]',
        className,
      )}
    >
      <div
        aria-hidden
        className={cn(
          'flex items-center bg-[#f0f0ee]',
          lg ? 'h-[18px] gap-1.5 pl-3 lg:h-[46px] lg:gap-2.5 lg:pl-5' : 'h-[18px] gap-1.5 pl-3',
        )}
      >
        {DOTS.map((color) => (
          <span
            key={color}
            style={{ backgroundColor: color }}
            className={cn('rounded-full', lg ? 'size-2 lg:size-3.5' : 'size-2')}
          />
        ))}
      </div>
      {children}
    </div>
  )
}
