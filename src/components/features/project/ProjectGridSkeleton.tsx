/** 다음 프로젝트를 불러오는 동안 보여주는 자리 표시 카드 */
export default function ProjectGridSkeleton() {
  return (
    <li aria-hidden className="flex min-w-0 flex-col gap-4">
      <div className="skeleton aspect-[435/237] w-full rounded-lg" />
      <div className="flex flex-col gap-2.5">
        <div className="skeleton h-5 w-[45%] rounded-[10px]" />
        <div className="skeleton h-3.5 w-[85%] rounded-[7px]" />
        <div className="skeleton h-[22px] w-[30%] rounded-[11px]" />
      </div>
    </li>
  )
}
