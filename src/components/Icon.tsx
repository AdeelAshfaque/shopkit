import type { ReactNode } from 'react'

type IconName =
  | 'arrow-right'
  | 'arrow-up-right'
  | 'bag'
  | 'check'
  | 'heart'
  | 'menu'
  | 'plus'
  | 'search'
  | 'close'

type IconProps = {
  name: IconName
  size?: number
}

const paths: Record<IconName, ReactNode> = {
  'arrow-right': <path d="M5 12h14m-7-7 7 7-7 7" />,
  'arrow-up-right': <path d="M7 17 17 7M7 7h10v10" />,
  bag: (
    <>
      <path d="M5 8h14l1 13H4L5 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  check: <path d="m5 12 4 4L19 6" />,
  heart: (
    <path d="M20.8 8.7c0 4.1-8.8 10-8.8 10s-8.8-5.9-8.8-10a4.7 4.7 0 0 1 8.8-2.2 4.7 4.7 0 0 1 8.8 2.2Z" />
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </>
  ),
  close: (
    <>
      <path d="m18 6-12 12" />
      <path d="m6 6 12 12" />
    </>
  ),
}

function Icon({ name, size = 20 }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.7"
      viewBox="0 0 24 24"
      width={size}
    >
      {paths[name]}
    </svg>
  )
}

export default Icon
