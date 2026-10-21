import dotIcon from '@/assets/icons/dot.svg'

const KEYWORDS = ['Passionate', 'Curious', 'Detail-oriented', 'User-focused']

function KeywordRun() {
  return (
    <>
      {KEYWORDS.map((keyword) => (
        <span key={keyword} className="flex shrink-0 items-center gap-9">
          <span className="font-display text-[46px] whitespace-nowrap">{keyword}</span>
          <img src={dotIcon} alt="" className="size-[26px] shrink-0" />
        </span>
      ))}
    </>
  )
}

export default function KeywordBanner() {
  return (
    <div className="border-brand flex h-[100px] w-full items-center overflow-hidden border-y">
      <div className="animate-marquee motion-reduce:animate-none flex w-max shrink-0 gap-9">
        <KeywordRun />
        <KeywordRun />
      </div>
    </div>
  )
}
