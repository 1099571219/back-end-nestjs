import * as dayjs from 'dayjs'

export function formDate() {
  return dayjs(new Date(), 'zh-cn').format('YYYY-MM-DD HH:mm:ss:SSS')
}
