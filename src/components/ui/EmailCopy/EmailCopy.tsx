import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import checkWhite from '@/assets/icons/check-white.svg'
import copyBlue from '@/assets/icons/copy.svg'
import copyWhite from '@/assets/icons/copy-white.svg'
import SlideUp from '@/components/ui/SlideUp/SlideUp'
import { cn } from '@/utils/cn'

const CHECK_MS = 1500
const TOAST_MS = 2000

type EmailCopyProps = {
  email: string
  href: string
  /** 슬라이드업 등장 지연(초) */
  delay?: number
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // 클립보드 API 를 못 쓰는 환경(비보안 컨텍스트 등)
    const input = document.createElement('textarea')
    input.value = text
    input.style.position = 'fixed'
    input.style.opacity = '0'
    document.body.appendChild(input)
    input.select()
    const ok = document.execCommand('copy')
    input.remove()
    return ok
  }
}

export default function EmailCopy({ email, href, delay = 0 }: EmailCopyProps) {
  const { t } = useTranslation()
  const [checked, setChecked] = useState(false)
  const [toast, setToast] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  async function handleCopy() {
    if (!(await copyText(email))) return

    timers.current.forEach(clearTimeout)
    setChecked(true)
    setToast(true)
    timers.current = [
      setTimeout(() => setChecked(false), CHECK_MS),
      setTimeout(() => setToast(false), TOAST_MS),
    ]
  }

  return (
    // 메일이나 버튼 어느 쪽에 올려도 밑줄과 버튼 반전이 함께 일어난다
    <div className="group relative w-fit">
      {/* 슬라이드업 마스크는 이 줄만 가리고, 아래 토스트는 마스크 밖에 둬서 잘리지 않게 한다 */}
      <SlideUp repeat delay={delay}>
        <div className="flex items-center gap-3 lg:gap-4">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'bg-[length:0%_2px] bg-left-bottom bg-no-repeat text-xl whitespace-nowrap lg:text-[46px] lg:leading-[50px]',
              '[background-image:linear-gradient(currentColor,currentColor)] transition-[background-size] duration-300 ease-out',
              'group-hover:bg-[length:100%_2px] motion-reduce:transition-none',
            )}
          >
            {email}
          </a>

          <button
            type="button"
            onClick={handleCopy}
            aria-label={t('contact.copy')}
            className={cn(
              'border-brand group-hover:bg-brand relative flex size-10 cursor-pointer items-center justify-center rounded-lg border transition-colors duration-200 lg:size-12',
              checked && 'bg-brand',
            )}
          >
            {checked ? (
              <img src={checkWhite} alt="" className="size-[22px]" />
            ) : (
              <>
                <img src={copyBlue} alt="" className="size-[22px] group-hover:hidden" />
                <img
                  src={copyWhite}
                  alt=""
                  className="hidden size-[22px] group-hover:block"
                />
              </>
            )}
          </button>
        </div>
      </SlideUp>

      <AnimatePresence>
        {toast && (
          <motion.p
            role="status"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="bg-brand font-ko absolute inset-x-0 top-full mx-auto mt-3 w-fit rounded-lg px-4 py-2 text-sm whitespace-nowrap text-white"
          >
            {t('contact.copied')}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
