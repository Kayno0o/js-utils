import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import fr from 'dayjs/locale/fr'

dayjs.extend(utc)
dayjs.locale(fr)

export { dayjs }

/**
 * Represents different date format types.
 * @category date
 */
export type DateFormatType = 'input' | 'shortText' | 'longText' | 'full-input' | 'default'

/**
 * Represents a single date property that can be a Date object or a string.
 * @category date
 */
export type SingleDateProp = Date | string

/**
 * Represents a nullable single date property that can be a Date object, a string, null, or undefined.
 * @category date
 */
export type NullableSingleDateProp = SingleDateProp | null | undefined

/**
 * Represents a date property that can be a single nullable date or an array of nullable dates.
 * @category date
 */
export type DateProp = NullableSingleDateProp | NullableSingleDateProp[]

/**
 * Represents configuration options for date utility functions.
 * @interface DateUtilsConfig
 * @category date
 */
export interface DateUtilsConfig {
  utc?: boolean
  separator?: string
  unique?: boolean
}

/**
 * Create the formats constant using Record<DateFormatType, string>
 * @category date
 */
const formats: Record<DateFormatType, string> = {
  'shortText': 'ddd DD/MM',
  'longText': 'ddd DD MMM YYYY',
  'input': 'YYYY-MM-DD',
  'full-input': 'YYYY-MM-DD H:mm:ss',
  'default': 'DD/MM/YYYY',
}

export function formatDate(date: DateProp, format?: DateFormatType, config?: DateUtilsConfig): string
export function formatDate(date: DateProp, format?: string, config?: DateUtilsConfig): string

/**
 * formats a date or an array of dates into a string using the specified format.
 * @param {DateProp | DateProp[]} date the date or array of dates to format.
 * @param {DateFormatType | string} [format] the format string or predefined format type.
 * @param {DateUtilsConfig} [config] additional configuration options.
 * @param {boolean} [config.utc] if true, formats the date in utc timezone (default is false).
 * @param {boolean} [config.unique] if true, returns unique formatted dates in case of an array (default is false).
 * @param {string} [config.separator] the separator to use when joining multiple dates (default is ', ').
 * @returns {string} the formatted date(s) as a string.
 * @category date
 */
export function formatDate(date: DateProp, format: DateFormatType | string = 'default', config: DateUtilsConfig = {}): string {
  if (Array.isArray(date)) {
    const formattedDates = date.filter(d => !!d).map(d => formatDate(d, format, config))
    if (config.unique)
      return [...(new Set(formattedDates))].join(config.separator ?? ', ')
    return formattedDates.join(config.separator ?? ', ')
  }

  if (!date)
    return ''

  return (config.utc ? dayjs.utc(date) : dayjs(date)).format(Object.prototype.hasOwnProperty.call(formats, format) ? formats[format as keyof typeof formats] : format)
}

/**
 * Checks if a date is between two other dates.
 * @param {SingleDateProp} date The date to check.
 * @param {NullableSingleDateProp} start The start date (nullable).
 * @param {NullableSingleDateProp} end The end date (nullable).
 * @param {boolean} [utc] Whether to consider dates in UTC timezone (default is false).
 * @returns {boolean} True if the date is between the start and end dates (inclusive), false otherwise.
 * @category date
 */
export function isDateBetween(date: SingleDateProp, start: NullableSingleDateProp, end: NullableSingleDateProp, utc: boolean = false): boolean {
  const d = utc ? dayjs.utc(date) : dayjs(date)
  return (start ? d.isAfter(start) : true) && (end ? d.isBefore(end) : true)
}

/**
 * Utility functions related to date manipulation and formatting.
 * @returns An object containing date utility functions.
 * @category date
 */
export function dateUtils() {
  return {
    /**
     * Formats a date using the default format.
     * @param {DateProp} date The date to format.
     * @param {DateUtilsConfig} [config] Additional configuration options.
     * @returns {string} The formatted date.
     * @category date
     */
    defaultFormat: (date: DateProp, config: DateUtilsConfig = {}): string => {
      return formatDate(date, 'default', config)
    },
    /**
     * Formats a date using a short text format.
     * @param {DateProp} date The date to format.
     * @param {DateUtilsConfig} [config] Additional configuration options.
     * @returns {string} The formatted date.
     * @category date
     */
    shortTextFormat: (date: DateProp, config: DateUtilsConfig = {}): string => {
      return formatDate(date, 'shortText', config)
    },
    /**
     * Formats a date for input display.
     * @param {DateProp} date The date to format.
     * @param {DateUtilsConfig} [config] Additional configuration options.
     * @returns {string} The formatted date.
     * @category date
     */
    inputFormat: (date: DateProp, config: DateUtilsConfig = {}): string => {
      return formatDate(date, 'input', config)
    },
    /**
     * Formats a date for full input display.
     * @param {DateProp} date The date to format.
     * @param {DateUtilsConfig} [config] Additional configuration options.
     * @returns {string} The formatted date.
     * @category date
     */
    inputFullFormat: (date: DateProp, config: DateUtilsConfig = {}): string => {
      return formatDate(date, 'full-input', config)
    },
  }
}
