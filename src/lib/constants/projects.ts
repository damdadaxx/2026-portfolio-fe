export type ProjectKind = 'team' | 'work'

export type Project = {
  id: string
  slug: string
  name: { ko: string; en: string }
  kind: ProjectKind
  /** 비어 있으면 표시하지 않는다 */
  period: string
  /** 팀 프로젝트의 참여 인원 */
  members?: number
  tags: string[]
  /** 사이트 방문 링크 */
  url?: string
  /** true 면 상세(케이스 스터디) 페이지로 연결한다 */
  caseStudy?: boolean
  /** 썸네일 안 로고 폭 (카드 폭 대비 %) */
  logoWidth: number
}

// 출처: Notion "2026 포트폴리오 프로젝트 리스트" (# 순서)
export const PROJECTS: Project[] = [
  {
    id: '001',
    slug: 'moving',
    name: { ko: '무빙', en: 'Moving' },
    kind: 'team',
    period: '2026.08~10',
    members: 6,
    tags: [
      'Next.js',
      'Express',
      'Prisma',
      'Socket.IO',
      'SSE',
      'React',
      'TypeScript',
      'TanStack Query',
      'Zod',
      'Tailwind',
    ],
    url: 'https://moving-team3.xyz/',
    caseStudy: true,
    logoWidth: 32.6,
  },
  {
    id: '002',
    slug: 'docthru',
    name: { ko: '독스루', en: 'Docthru' },
    kind: 'team',
    period: '2026.07',
    tags: [
      'Next.js',
      'Express',
      'Prisma',
      'JavaScript',
      'TanStack Query',
      'Zod',
      'Tailwind',
    ],
    url: 'https://6-docthru-3team-fe-dev.vercel.app/',
    logoWidth: 46,
  },
  {
    id: '003',
    slug: 'k-test',
    name: { ko: 'K-TEST', en: 'K-TEST' },
    kind: 'team',
    period: '2026.06~09',
    members: 6,
    tags: ['Next.js', 'TypeScript', 'Zustand', 'TanStack Query', 'Tailwind'],
    url: 'https://www.ktest.cloud/',
    caseStudy: true,
    logoWidth: 40.7,
  },
  {
    id: '004',
    slug: 'forest-of-study',
    name: { ko: '공부의 숲', en: 'Forest of Study' },
    kind: 'team',
    period: '2026.05~06',
    tags: ['React', 'Express', 'Prisma', 'Zod'],
    url: 'https://13-study-forest-team2-fe.netlify.app/',
    logoWidth: 46,
  },
  {
    id: '005',
    slug: 'minters',
    name: { ko: '민터스', en: 'Minters' },
    kind: 'work',
    period: '2023.05~09',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Zustand', 'styled-components'],
    url: 'https://www.reconers.com/projects/322',
    logoWidth: 46,
  },
  {
    id: '006',
    slug: 'newmata',
    name: { ko: '뉴마타', en: 'Newmata' },
    kind: 'work',
    period: '2023.01~02',
    tags: ['React', 'Tailwind', 'styled-components'],
    url: 'https://ai.matamath.net/',
    logoWidth: 29.7,
  },
  {
    id: '007',
    slug: 'nanum',
    name: { ko: '나눔문화확산 캠페인 2023', en: 'Sharing Culture Campaign 2023' },
    kind: 'work',
    period: '2023',
    tags: ['PHP', 'JavaScript', 'jQuery', 'SCSS'],
    url: 'https://www.reconers.com/projects/316',
    logoWidth: 52.2,
  },
  {
    id: '008',
    slug: 'milim',
    name: { ko: '밀림', en: 'Milim' },
    kind: 'work',
    period: '2022.08~2023.01',
    tags: ['PHP', 'JavaScript', 'jQuery', 'SCSS'],
    url: 'https://www.millim.in/',
    logoWidth: 32.9,
  },
  {
    id: '009',
    slug: 'weblling',
    name: { ko: '위블링', en: '위블링' },
    kind: 'work',
    period: '2022.03~04',
    tags: ['PHP', 'jQuery', 'Lottie', 'JavaScript', 'SCSS'],
    url: 'https://www.webling.kr/',
    logoWidth: 46,
  },
  {
    id: '010',
    slug: 'alpha',
    name: { ko: '알파자산운용', en: '알파자산운용' },
    kind: 'work',
    period: '2022',
    tags: ['PHP', 'JavaScript', 'jQuery', 'SCSS'],
    url: 'https://alphasset.com/',
    logoWidth: 46,
  },
  {
    id: '011',
    slug: 'miqube',
    name: { ko: '엠아이큐브솔루션', en: '엠아이큐브솔루션' },
    kind: 'work',
    period: '2022',
    tags: ['PHP', 'JavaScript', 'jQuery', 'SCSS'],
    url: 'https://www.micube.co.kr/',
    logoWidth: 50.6,
  },
  {
    id: '012',
    slug: 'socialstock',
    name: { ko: '소셜스탁 2차 개발', en: '소셜스탁 2차 개발' },
    kind: 'work',
    period: '2022',
    tags: ['PHP', 'JavaScript', 'jQuery', 'SCSS'],
    url: 'https://www.reconers.com/projects/241',
    logoWidth: 43.6,
  },
  {
    id: '013',
    slug: 'sonaks',
    name: { ko: '소낙스', en: '소낙스' },
    kind: 'work',
    period: '2021.05~2023.09',
    tags: ['PHP', 'JavaScript', 'jQuery', 'SCSS'],
    url: 'https://sonaxkorea.com/',
    logoWidth: 43.9,
  },
  {
    id: '014',
    slug: 'popofesta',
    name: { ko: '포포페스타 2021', en: '포포페스타 2021' },
    kind: 'work',
    period: '2021',
    tags: ['PHP', 'JavaScript', 'jQuery', 'SCSS'],
    url: 'https://www.reconers.com/projects/247',
    logoWidth: 38.9,
  },
  {
    id: '015',
    slug: 'vuno',
    name: { ko: '뷰노 2차 개발', en: '뷰노 2차 개발' },
    kind: 'work',
    period: '2021',
    tags: ['PHP', 'JavaScript', 'jQuery', 'SCSS'],
    url: 'https://vuno.co',
    logoWidth: 46,
  },
  {
    id: '016',
    slug: 'pagoe',
    name: { ko: '파괴연구소', en: '파괴연구소' },
    kind: 'work',
    period: '2021',
    tags: ['PHP', 'JavaScript', 'jQuery', 'SCSS'],
    url: 'https://www.pagelab.kr/',
    logoWidth: 46,
  },
]
