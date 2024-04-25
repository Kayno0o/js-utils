export type RuleFunction<T> = (arg: T) => boolean | string

type ValidRuleKeys<T, U> = {
  [K in keyof T]: T[K] extends RuleFunction<U> ? (ReturnType<T[K]> extends boolean | string ? K : never) : never;
}[keyof T]

/** the name of a valid rule based on the return type of getRules */
export type RulesName<T> = ValidRuleKeys<ReturnType<typeof getRules>, T>

/** either allow a rule name or a rule function */
export type RuleType<T> = (RulesName<T> | RuleFunction<T>)[]

/**
 * Retrieves a set of validation rules
 * @returns An object containing various validation rule functions
 */
export function getRules() {
  const compareNumber = (comparator: 'lt' | 'gt' | 'gte' | 'lte' | 'eq' | 'neq', nb: number): RuleFunction<number | undefined | null> => (value: number | undefined | null) => {
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
    compareNumber,
    email: (value?: string | null): boolean | string => {
      if (!value)
        return true

      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(value) || 'Email invalide'
    },
    isNumber: (value?: string | number | null): boolean | string => {
      if (value === null || value === undefined)
        return true

      return !Number.isNaN(Number(value)) || 'Nombre invalide'
    },
    max: (nb: number, eq: boolean = true): RuleFunction<number | undefined | null> => compareNumber(eq ? 'lte' : 'lt', nb),
    maxLength: (length: number): RuleFunction<undefined | string | any[] | null> =>
      (value?: string | any[] | null) => ((value?.length || 0) <= length) || `Valeur trop longue : ${length} caractères maximum.`,
    min: (nb: number, eq: boolean = true): RuleFunction<number | undefined | null> => compareNumber(eq ? 'gte' : 'gt', nb),
    minLength: (length: number): RuleFunction<undefined | string | any[] | null> =>
      (value?: string | any[] | null) => ((value?.length || 0) >= length) || `Valeur trop courte : ${length} caractères requis.`,
    nonZero: (value?: number | null): boolean | string => {
      if (typeof value === 'number')
        return (value !== 0) || 'Champ requis'

      return !!value || 'Champ requis'
    },
    phone: (value?: string | number | null): boolean | string => {
      if (!value)
        return true
      return /^(\+?33 ?|0)[1-9]([-. ]?\d{2}){4}$/.test(value.toString()) || 'Numéro invalide'
    },
    required: (value?: any): boolean | string => {
      if (value === undefined || value === null)
        return 'Champ requis'

      if (typeof value === 'number')
        return true

      if (Array.isArray(value))
        return value.length > 0 || 'Champ requis'

      return !!value || 'Champ requis'
    },
  }
}
