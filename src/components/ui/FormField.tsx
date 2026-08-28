import type { FC } from 'hono/jsx'

interface FormFieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
  value?: string
  error?: string
  className?: string
  helpText?: string
  id?: string
  options?: { value: string; label: string }[]
  rows?: number
}

export const FormField: FC<FormFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder,
  required,
  value,
  error,
  className = '',
  helpText,
  id,
  options,
  rows
}) => {
  const inputId = id || name
  const baseClass = `w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ok-lime-400 focus:border-transparent transition-colors ${
    error ? 'border-ok-red' : 'border-gray-200'
  }`

  return (
    <div class={className}>
      <label for={inputId} class="block text-sm font-semibold text-ok-charcoal mb-1.5">
        {label} {required && <span class="text-ok-red">*</span>}
      </label>
      {type === 'select' && options ? (
        <select id={inputId} name={name} required={required} class={baseClass}>
          {options.map((opt) => (
            <option value={opt.value} selected={opt.value === value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          id={inputId}
          name={name}
          placeholder={placeholder}
          required={required}
          rows={rows || 4}
          class={baseClass}
        >
          {value}
        </textarea>
      ) : (
        <input
          id={inputId}
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          value={value}
          class={baseClass}
        />
      )}
      {helpText && !error && <p class="text-xs text-ok-gray-500 mt-1.5">{helpText}</p>}
      {error && (
        <p class="text-xs text-ok-red mt-1.5 flex items-center gap-1">
          <i class="fas fa-circle-exclamation"></i> {error}
        </p>
      )}
    </div>
  )
}
