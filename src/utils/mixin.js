import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

dayjs.extend(relativeTime)

export const fromNow = (date) => {
  const today = dayjs()
  const days = today.diff(date, 'day')
  return days > 45
    ? dayjs(date).format('YYYY/MM/DD HH:mm')
    : dayjs(date).fromNow()
}

export const setAvatar = (gender) => {
  return gender === 'male'
    ? './male_avatar.svg'
    : './female_avatar.svg'
}

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 1500
})
