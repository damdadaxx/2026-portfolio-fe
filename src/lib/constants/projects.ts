export type Project = {
  id: string
  name: { ko: string; en: string }
  period: string
  tags: string[]
  url: string
}

export const PROJECTS: Project[] = [
  {
    id: '001',
    name: { ko: '무빙', en: 'Moving' },
    period: '2026.08 ~ 2026.10',
    tags: [
      'Next.js',
      'TypeScript',
      'TanStack Query',
      'Tailwind CSS',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Supabase Realtime',
      'SSE',
    ],
    url: 'https://moving-team3.xyz',
  },
  {
    id: '002',
    name: { ko: 'K-TEST', en: 'K-TEST' },
    period: '2026.06 ~ 2026.09',
    tags: ['Next.js', 'TypeScript', 'Zustand', 'TanStack Query', 'axios', 'MediaRecorder API'],
    url: 'https://www.ktest.cloud/',
  },
  {
    id: '003',
    name: { ko: '독스루', en: 'Docthru' },
    period: '2026.07',
    tags: ['Next.js', 'React 19', 'TanStack Query', 'Tailwind CSS', 'Express', 'Prisma', 'PostgreSQL'],
    url: 'https://13-doc-thru-team1-fe.vercel.app',
  },
  {
    id: '004',
    name: { ko: '공부의 숲', en: 'Forest of Study' },
    period: '2026.05 ~ 2026.06',
    tags: ['React', 'React Router', 'CSS Modules', 'Express', 'Prisma', 'PostgreSQL', 'Zod'],
    url: 'https://13-study-forest-team2-fe.netlify.app',
  },
  {
    id: '005',
    name: { ko: '민터스', en: 'Minters' },
    period: '2023.05 ~ 2023.09',
    tags: ['Next.js 13', 'React 18', 'TypeScript', 'TanStack Query', 'Zustand', 'Tailwind CSS'],
    url: 'https://www.reconers.com/projects/322',
  },
]
