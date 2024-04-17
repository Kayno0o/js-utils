/**
 * Represents a function that defines a validation rule for a value of type T.
 * @template T The type of the argument for the validation rule.
 * @category rule
 */
export type RuleFunction<T> = (arg: T) => boolean | string

/**
 * Extracts valid keys from a type T based on RuleFunction constraints.
 * @template T The type containing RuleFunction constraints.
 * @template U The type of the argument for the validation rule.
 * @category rule
 */
export type ValidRuleKeys<T, U> = {
  [K in keyof T]: T[K] extends RuleFunction<U> ? (ReturnType<T[K]> extends boolean | string ? K : never) : never;
}[keyof T]

/**
 * Represents the name of a valid rule based on the return type of getRules.
 * @template T The type of the argument for the validation rule.
 * @category rule
 */
export type RulesName<T> = ValidRuleKeys<ReturnType<typeof getRules>, T>

/**
 * Retrieves a set of validation rules.
 * @returns An object containing various validation rule functions.
 * @category rule
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
    /**
     * Validates if a value is required.
     * @param {*} [value] The value to validate.
     * @returns {boolean | string} True if valid, or an error message if invalid.
     * @category rule
     */
    required: (value?: any): boolean | string => {
      if (value === undefined || value === null)
        return 'Champ requis'

      if (typeof value === 'number')
        return true

      if (Array.isArray(value))
        return value.length > 0 || 'Champ requis'

      return !!value || 'Champ requis'
    },

    /**
     * Validates if a number is non-zero.
     * @param {number | null | undefined} [value] The number to validate.
     * @returns {boolean | string} True if valid, or an error message if invalid.
     * @category rule
     */
    nonZero: (value?: number | null): boolean | string => {
      if (typeof value === 'number')
        return (value !== 0) || 'Champ requis'

      return !!value || 'Champ requis'
    },

    /**
     * Creates a numeric comparator function for validating numeric values.
     * @param {'lt' | 'gt' | 'gte' | 'lte' | 'eq' | 'neq'} comparator The comparison operator ('lt', 'gt', 'gte', 'lte', 'eq', 'neq').
     * @param {number} nb The number to compare against.
     * @returns {RuleFunction<number | undefined | null>} A function that checks if the value satisfies the comparison condition.
     * @category rule
     */
    compareNumber,

    /**
     * Creates a validation function for checking if a value is greater than or equal to a minimum value.
     * @param {number} nb The minimum value.
     * @param {boolean} [eq] Whether the comparison includes equality (default is true).
     * @returns {RuleFunction<number | undefined | null>} A function that checks if the value is valid.
     * @category rule
     */
    min: (nb: number, eq: boolean = true): RuleFunction<number | undefined | null> => compareNumber(eq ? 'gte' : 'gt', nb),

    /**
     * Creates a validation function for checking if a value is less than or equal to a maximum value.
     * @param {number} nb The maximum value.
     * @param {boolean} [eq] Whether the comparison includes equality (default is true).
     * @returns {RuleFunction<number | undefined | null>} A function that checks if the value is valid.
     * @category rule
     */
    max: (nb: number, eq: boolean = true): RuleFunction<number | undefined | null> => compareNumber(eq ? 'lte' : 'lt', nb),

    /**
     * Creates a validation function for checking if a string or array length meets a minimum length requirement.
     * @param {number} length The minimum length required.
     * @returns {RuleFunction<undefined | string | any[] | null>} A function that checks if the value length is valid.
     * @category rule
     */
    minLength: (length: number): RuleFunction<undefined | string | any[] | null> =>
      (value?: string | any[] | null) => ((value?.length || 0) >= length) || `Valeur trop courte : ${length} caractères requis.`,

    /**
     * Creates a validation function for checking if a string or array length meets a maximum length requirement.
     * @param {number} length The maximum length allowed.
     * @returns {RuleFunction<undefined | string | any[] | null>} A function that checks if the value length is valid.
     * @category rule
     */
    maxLength: (length: number): RuleFunction<undefined | string | any[] | null> =>
      (value?: string | any[] | null) => ((value?.length || 0) <= length) || `Valeur trop longue : ${length} caractères maximum.`,

    /**
     * Validates an email format.
     * @param {string | null | undefined} value The email address to validate.
     * @returns {boolean | string} True if the email is valid, otherwise an error message.
     * @category rule
     */
    email: (value?: string | null): boolean | string => {
      if (!value)
        return true

      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        .test(value) || 'Email invalide'
    },

    /**
     * Validates if a value is a number.
     * @param {string | number | null | undefined} value The value to check.
     * @returns {boolean | string} True if the value is a valid number, otherwise an error message.
     * @category rule
     */
    isNumber: (value?: string | number | null): boolean | string => {
      if (value === null || value === undefined)
        return true

      return !Number.isNaN(Number(value)) || 'Nombre invalide'
    },

    /**
     * Validates a phone number format.
     * @param {string | number | null | undefined} value The phone number to validate.
     * @returns {boolean | string} True if the phone number is valid, otherwise an error message.
     * @category rule
     */
    phone: (value?: string | number | null): boolean | string => {
      if (!value)
        return true
      return /^(\+?33 ?|0)[1-9]([-. ]?\d{2}){4}$/.test(value.toString()) || 'Numéro invalide'
    },
  }
}
