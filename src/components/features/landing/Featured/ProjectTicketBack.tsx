import crosshair from '@/assets/icons/back-crosshair.svg'
import diamond from '@/assets/icons/back-diamond.svg'
import line from '@/assets/icons/back-line.svg'
import notch from '@/assets/icons/back-notch.svg'
import qr from '@/assets/icons/back-qr.svg'
import tearArrow from '@/assets/icons/back-tear-arrow.svg'

type ProjectTicketBackProps = {
  code: string
  title: string
}

export default function ProjectTicketBack({ code, title }: ProjectTicketBackProps) {
  return (
    <div className="flex h-full min-h-[560px] flex-col text-white">
      <div className="bg-brand flex flex-[580_1_0] flex-col justify-between rounded-t-3xl p-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2.5">
            <img src={qr} alt="" className="size-[42px]" />
            <p className="text-[13px] tracking-[1.04px]">{code}</p>
          </div>
          <img src={crosshair} alt="" className="size-6" />
        </div>

        <div className="flex items-end justify-between">
          <p className="font-display text-[40px] leading-none whitespace-nowrap sm:text-[56px] lg:text-[80px]">{title}</p>
          <img src={diamond} alt="" className="size-9" />
        </div>

        <div className="flex items-center justify-end gap-3">
          <img src={tearArrow} alt="" className="h-2.5 w-[22px]" />
          <p className="text-[13px] tracking-[1.04px] whitespace-nowrap">TEAR ALONG LINE</p>
          <img src={tearArrow} alt="" className="h-2.5 w-[22px] -scale-x-100" />
        </div>
      </div>

      <div className="bg-brand relative flex h-6 items-center overflow-hidden px-[26px]">
        <img src={line} alt="" className="h-[1.5px] w-full" />
        <img src={notch} alt="" className="absolute top-0 -left-3 size-6" />
        <img src={notch} alt="" className="absolute top-0 -right-3 size-6" />
      </div>

      <div className="bg-brand flex flex-[247_1_0] items-end justify-between rounded-b-3xl p-8">
        <img src={crosshair} alt="" className="size-6" />
        <p className="text-right text-[13px] tracking-[1.04px]">
          CASE STUDY INSIDE,
          <br />
          DO NOT SKIP!
        </p>
      </div>
    </div>
  )
}
