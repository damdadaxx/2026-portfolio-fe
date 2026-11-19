import { useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

type LoopVideoProps = {
  /** YouTube 영상 ID */
  videoId: string
  title: string
}

/**
 * 소리 없이 무한 반복되는 YouTube 영상. 화면(뷰포트)을 벗어나면 일시 정지하고, 다시 들어오면 재생한다.
 * 처음 화면에 들어올 때까지는 iframe 을 만들지 않는다.
 */
export default function LoopVideo({ videoId, title }: LoopVideoProps) {
  const shouldReduceMotion = useReducedMotion()
  const boxRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const visibleRef = useRef(false)
  const [mounted, setMounted] = useState(false)

  const command = (func: 'playVideo' | 'pauseVideo') =>
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args: '' }),
      '*',
    )

  useEffect(() => {
    if (shouldReduceMotion) return
    const box = boxRef.current
    if (!box) return
    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting
      if (entry.isIntersecting) setMounted(true)
      command(entry.isIntersecting ? 'playVideo' : 'pauseVideo')
    })
    observer.observe(box)
    return () => observer.disconnect()
  }, [shouldReduceMotion])

  const params = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: videoId,
    controls: '0',
    playsinline: '1',
    rel: '0',
    modestbranding: '1',
    enablejsapi: '1',
  })

  return (
    <div ref={boxRef} className="relative aspect-video w-full bg-[#e8e7e2]">
      {mounted && (
        <iframe
          ref={frameRef}
          title={title}
          src={`https://www.youtube-nocookie.com/embed/${videoId}?${params}`}
          allow="autoplay; encrypted-media; picture-in-picture"
          // 소리·컨트롤 없는 반복 영상이라 클릭으로 멈추지 않게 한다
          className="pointer-events-none absolute inset-0 size-full border-0"
          // 로드되기 전에 화면을 벗어났다면 곧바로 멈춘다
          onLoad={() => !visibleRef.current && command('pauseVideo')}
        />
      )}
    </div>
  )
}
