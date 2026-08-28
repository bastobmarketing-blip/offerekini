import type { FC } from 'hono/jsx'

interface ButtonProps {
  children: any
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  fullWidth?: boolean
  className?: string
  id?: string
  attrs?: Record<string, string>
}

const variantClasses: Record<string, string> = {
  primary:
    'bg-ok-green-800 text-white hover:bg-ok-green-900 active:bg-ok-green-900 disabled:bg-ok-gray-300 disabled:text-ok-gray-500',
  secondary:
    'bg-ok-lime-500 text-ok-green-900 hover:bg-ok-lime-400 active:bg-ok-lime-600 disabled:bg-ok-gray-300 disabled:text-ok-gray-500',
  outline:
    'bg-white border border-ok-green-800 text-ok-green-800 hover:bg-ok-green-50 active:bg-ok-green-100 disabled:border-ok-gray-300 disabled:text-ok-gray-400',
  ghost:
    'bg-transparent text-ok-charcoal hover:bg-black/5 active:bg-black/10',
  danger:
    'bg-ok-red text-white hover:bg-red-700 active:bg-red-800 disabled:bg-ok-gray-300'
}

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-sm rounded-xl',
  lg: 'px-6 py-3.5 text-base rounded-xl'
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  type = 'button',
  disabled,
  fullWidth,
  className = '',
  id,
  attrs = {}
}) => {
  const classes = `inline-flex items-center justify-center gap-2 font-semibold transition-all duration-150 ok-focus disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`

  if (href) {
    return (
      <a href={href} id={id} class={classes} {...attrs}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} id={id} disabled={disabled} class={classes} {...attrs}>
      {children}
    </button>
  )
}
