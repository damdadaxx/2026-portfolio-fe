import logoBeigeFill from '@/assets/images/logo-beige-fill.svg'
import logoBeigeOutline from '@/assets/images/logo-beige-outline.svg'
import logoBlueFill from '@/assets/images/logo-blue-fill.svg'
import logoBlueOutline from '@/assets/images/logo-blue-outline.svg'
import { cn } from '@/utils/cn'

type LogoProps = {
  tone?: 'blue' | 'beige'
  className?: string
}

export default function Logo({ tone = 'blue', className }: LogoProps) {
  const outline = tone === 'blue' ? logoBlueOutline : logoBeigeOutline
  const fill = tone === 'blue' ? logoBlueFill : logoBeigeFill

  return (
    <div className={cn('relative size-16.5', className)}>
      <div className="absolute inset-[25.76%_16.96%_26.24%_16.67%]">
        <img src={outline} alt="" className="absolute inset-0 block size-full max-w-none" />
      </div>
      <div className="absolute inset-[25.76%_16.96%_26.24%_16.67%]">
        <img src={fill} alt="" className="absolute inset-0 block size-full max-w-none" />
      </div>
    </div>
  )
}
