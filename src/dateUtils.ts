import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import fr from 'dayjs/locale/fr'

dayjs.extend(utc)
dayjs.locale(fr)

export { dayjs }

type DateFormatType = 'input' | 'shortText' | 'longText' | 'datetime-input' | 'default'
type SingleDateProp = Date | string
type NullableSingleDateProp = SingleDateProp | null | undefined
type DateProp = NullableSingleDateProp | NullableSingleDateProp[]

interface DateUtilsConfig {
  separator?: string
  unique?: boolean
  utc?: boolean
}

const formats: Record<DateFormatType, string> = {
  'datetime-input': 'YYYY-MM-DD H:mm:ss',
  'default': 'DD/MM/YYYY',
  'input': 'YYYY-MM-DD',
  'longText': 'ddd DD MMM YYYY',
  'shortText': 'ddd DD/MM',
}

export function formatDate(date: DateProp, format?: DateFormatType, config?: DateUtilsConfig): string
export function formatDate(date: DateProp, format?: string, config?: DateUtilsConfig): string

/**
 * @param {DateProp | DateProp[]} date
 * @param {DateFormatType | string} [format]
 * @param {DateUtilsConfig} [config]
 * @param {boolean} [config.utc] formats in utc timezone (default: false).
 * @param {boolean} [config.unique] returns unique formatted dates in case of an array (default: false).
 * @param {string} [config.separator] the separator to use when joining multiple dates (default: ', ').
 * @returns {string} formatted date(s) as a string.
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
 * @param {SingleDateProp} date
 * @param {NullableSingleDateProp} start
 * @param {NullableSingleDateProp} end
 * @param {boolean} [utc] formats in utc timezone (default: false).
 * @returns {boolean} true if is between the start and end (inclusive), else false.
 */
export function isDateBetween(date: SingleDateProp, start: NullableSingleDateProp, end: NullableSingleDateProp, utc = false): boolean {
  const d = utc ? dayjs.utc(date) : dayjs(date)
  return (start ? d.isAfter(start) : true) && (end ? d.isBefore(end) : true)
}
