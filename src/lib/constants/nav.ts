export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/project', label: 'Project' },
  { href: '/about', label: 'About' },
] as const

export function isActive(href: string, pathname: string) {
  return href === '/' ? pathname === '/' : pathname.startsWith(href)
}
