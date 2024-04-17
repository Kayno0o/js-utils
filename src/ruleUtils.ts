export type RuleFunction<T> = (arg: T) => boolean | string

type ValidKeys<T, U> = {
  [K in keyof T]: T[K] extends RuleFunction<U> ? (ReturnType<T[K]> extends boolean | string ? K : never) : never;
}[keyof T]

export type RulesName<T> = ValidKeys<ReturnType<typeof getRules>, T>

export function getRules() {
  const number = (comparator: 'lt' | 'gt' | 'gte' | 'lte' | 'eq' | 'neq', nb: number) => (value: number | undefined | null) => {
    value = value ?? 0
    switch (comparator) {
      case 'eq':
        return value === nb || `La valeur doit être égale à ${nb}.`
      case 'neq':
        return value !== nb || `La valeur ne doit pas être égale à ${nb}.`
      case 'gt':
        return value > nb || `La valeur doit être supérieure à ${nb}.`
      case 'gte':
        return value >= nb || `La valeur doit être supérieure ou égale à ${nb}.`
      case 'lt':
        return value < nb || `La valeur doit être inferieure à ${nb}.`
      case 'lte':
        return value <= nb || `La valeur doit être inferieure ou égale à ${nb}.`
      default:
        return 'Condition invalide'
    }
  }

  return {
    required: (value?: any) => {
      if (value === undefined || value === null)
        return 'Champ requis'

      if (typeof value === 'number')
        return true

      if (Array.isArray(value))
        return value.length > 0 || 'Champ requis'

      return !!value || 'Champ requis'
    },

    nonZero: (value?: number | null) => {
      if (typeof value === 'number')
        return (value !== 0) || 'Champ requis'

      return !!value || 'Champ requis'
    },

    number,

    min: (nb: number, eq = true) => number(eq ? 'gte' : 'gt', nb),
    max: (nb: number, eq = true) => number(eq ? 'lte' : 'lt', nb),

    minLength: (length: number) =>
      (value?: string | any[] | null) => ((value?.length || 0) >= length) || `Valeur trop courte : ${length} caractères requis.`,
    maxLength: (length: number) =>
      (value?: string | any[] | null) => ((value?.length || 0) <= length) || `Valeur trop longue : ${length} caractères maximum.`,

    email: (value?: string | null) => {
      if (!value)
        return true

      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(value) || 'Email invalide'
    },

    isNumber: (value?: string | number | null) => {
      if (value === null || value === undefined)
        return true

      return !Number.isNaN(Number(value)) || 'Nombre invalide'
    },

    phone: (value?: string | number | null) => {
      if (!value)
        return true
      return /^(\+?33 ?|0)[1-9]([-. ]?\d{2}){4}$/.test(value.toString()) || 'Numéro invalide'
    },
  }
}
