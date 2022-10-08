import _ from 'lodash'
import moment from 'moment'

export function constSystemMomentFormat(date: Date) {
    return moment(date).format('YYYY-MM-DD')
}

export function getRandomValueFromArray<T>(arr: T[]): T {
    return arr[_.random(0, arr.length - 1)]
}
