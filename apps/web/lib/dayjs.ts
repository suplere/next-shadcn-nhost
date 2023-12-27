import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import localeData from 'dayjs/plugin/localeData'
import minMax from 'dayjs/plugin/minMax'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isBetween from 'dayjs/plugin/isBetween'
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
// require("dayjs/locale/cs");
import 'dayjs/locale/cs'
dayjs.locale('cs')
dayjs.extend(isBetween)
dayjs.extend(isSameOrAfter)
dayjs.extend(isSameOrBefore)
dayjs.extend(localeData)
dayjs.extend(minMax)
dayjs.extend(localizedFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

export default dayjs
