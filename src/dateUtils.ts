import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import fr from 'dayjs/locale/fr'

export type DateFormatType = 'input' | 'shortText' | 'longText' | 'full-input' | 'default'

type SingleDateProp = Date | string
type NullableSingleDateProp = SingleDateProp | null | undefined
type DateProp = NullableSingleDateProp | NullableSingleDateProp[]

type DateUtilsConfig = {
  utc?: boolean
  separator?: string
  unique?: boolean
} & ({ format?: DateFormatType } | { format?: string })

const formats: Record<DateFormatType, string> = {
  'shortText': 'ddd DD/MM',
  'longText': 'ddd DD MMM YYYY',
  'input': 'YYYY-MM-DD',
  'full-input': 'YYYY-MM-DD H:mm:ss',
  'default': 'DD/MM/YYYY',
}

export function dateUtils() {
  dayjs.extend(utc)
  dayjs.locale(fr)

  function formatDate(date: DateProp, config: DateUtilsConfig = {}): string {
    if (Array.isArray(date)) {
      const formattedDates = date.filter(d => !!d).map(d => formatDate(d, config))
      if (config.unique)
        return [...(new Set(formattedDates))].join(config.separator ?? ', ')
      return formattedDates.join(config.separator ?? ', ')
    }

    if (!date)
      return ''

    const format = config.format || 'default'

    return (config.utc ? dayjs.utc(date) : dayjs(date)).format(Object.prototype.hasOwnProperty.call(formats, format) ? formats[format as keyof typeof formats] : format)
  }

  function isBetween(date: SingleDateProp, start: NullableSingleDateProp, end: NullableSingleDateProp, utc = false) {
    const d = utc ? dayjs.utc(date) : dayjs(date)
    return (start ? d.isAfter(start) : true) && (end ? d.isBefore(end) : true)
  }

  return {
    defaultFormat: (date: DateProp, config: DateUtilsConfig = {}) => {
      return formatDate(date, { ...config, format: 'default' })
    },
    shortTextFormat: (date: DateProp, config: DateUtilsConfig = {}) => {
      return formatDate(date, { ...config, format: 'shortText' })
    },
    inputFormat: (date: DateProp, config: DateUtilsConfig = {}) => {
      return formatDate(date, { ...config, format: 'input' })
    },
    inputFullFormat: (date: DateProp, config: DateUtilsConfig = {}) => {
      return formatDate(date, { ...config, format: 'full-input' })
    },
    formatDate,
    isBetween,
  }
}
