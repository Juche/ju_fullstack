import dayjs, { Dayjs } from 'dayjs'

export function formatDate(timeStamp, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(timeStamp * 1000).format(format)
}

export function getTimeStamp(date?) {
  const dateRaw = date ? new Date(date) : new Date()
  return Math.ceil(dateRaw.valueOf() / 1000)
}

export function range(start: number, end: number) {
  const result: number[] = []

  for (let i = start; i < end; i++) {
    result.push(i)
  }

  return result
}

const now = {
  H: dayjs().hour(),
  m: dayjs().minute(),
}

export function disabledDate(current: Dayjs) {
  // Can not select days before today and today
  // return current && current <= dayjs().endOf('day');
  return current && current <= dayjs().startOf('day')
}

export function disabledDateBefore(current: Dayjs) {
  // Can not select days before today
  return current && current < dayjs().startOf('day')
}

export function disabledDateAfter(current: Dayjs) {
  // Can not select days after today
  return current && current > dayjs(current).endOf('day')
}

export function disabledDateTime() {
  const { H, m } = now
  return {
    disabledHours: () => range(0, 24).splice(0, H),
    disabledMinutes: () => range(0, 59).splice(0, m),
    disabledSeconds: () => [],
  }
}

export function disabledRangeTime(_: Dayjs, type: 'start' | 'end') {
  if (type === 'start') {
    return {
      // disabledHours: () => range(0, 60).splice(4, 20),
      // disabledMinutes: () => range(30, 60),
      disabledMinutes: () => [...range(1, 30), ...range(31, 60)],
    }
  }
  return {
    // disabledHours: () => range(0, 60).splice(20, 4),
    // disabledMinutes: () => range(0, 31),
    disabledMinutes: () => [...range(1, 30), ...range(31, 60)],
  }
}

export function disabledActiveRangeTime(_: Dayjs, type: 'start' | 'end') {
  if (type === 'start') {
    return {
      // disabledHours: () => range(0, 60).splice(4, 20),
      // disabledMinutes: () => range(30, 60),
      disabledMinutes: () => [
        ...range(1, 10),
        ...range(11, 20),
        ...range(21, 30),
        ...range(31, 40),
        ...range(41, 50),
        ...range(51, 60),
      ],
    }
  }
  return {
    // disabledHours: () => range(0, 60).splice(20, 4),
    // disabledMinutes: () => range(0, 31),
    disabledMinutes: () => [
      ...range(1, 10),
      ...range(11, 20),
      ...range(21, 30),
      ...range(31, 40),
      ...range(41, 50),
      ...range(51, 60),
    ],
  }
}

// 数字转IP
export function numToIP(num) {
  const tt: number[] = []
  tt[0] = (num >>> 24) >>> 0
  tt[1] = ((num << 8) >>> 24) >>> 0
  tt[2] = (num << 16) >>> 24
  tt[3] = (num << 24) >>> 24
  const str =
    String(tt[0]) +
    '.' +
    String(tt[1]) +
    '.' +
    String(tt[2]) +
    '.' +
    String(tt[3])
  return str
}

/**
 * 获取媒体文件信息 start
 * 图片宽高
 * 视频宽高 & 时长
 */

type MediaSize = {
  width: number
  height: number
}

export async function getImgSize(src, maxWaitLoad = 10000): Promise<MediaSize> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    // 获取缓存(比较快)
    if (img.complete) {
      const { width, height } = img
      resolve({
        width,
        height,
      })
    } else {
      const timeOut = setTimeout(() => {
        reject('图片加载失败！')
      }, maxWaitLoad)
      // 加载完成
      img.onload = function () {
        const { width, height } = img
        window.clearTimeout(timeOut)
        resolve({
          width,
          height,
        })
      }
    }
  })
}

export async function getVideoSize(el): Promise<MediaSize> {
  return new Promise((resolve, reject) => {
    resolve({
      width: el.videoWidth,
      height: el.videoHeight,
    })
  })
}

// 获取视频时长
// 使用示例 => 获取视频时长
// const video = createMediaEl(fileList.value[0]);
// video.onloadedmetadata = () => {
//   formObj.videoTime = Math.ceil(video.duration);
// };
export function createMediaEl(file) {
  const ret: number | null = null
  if (!file) return ret

  const { fileType, type } = file
  const mediaType = fileType ? fileType : type.split('/')[0]
  const media = document.createElement(mediaType)
  media.preload = 'metadata'
  media.src = URL.createObjectURL(file.originFileObj)

  return media
}

/** 获取媒体文件信息 end */

export function debounce(fn, delay) {
  let timer //借助闭包
  return function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(fn, delay) // 简化写法
  }
}

export function throttle(fn, delay) {
  let valid = true
  return function () {
    if (!valid) {
      //休息时间 暂不接客
      return false
    }
    // 工作时间，执行函数并且在间隔期内把状态位设为无效
    valid = false
    setTimeout(() => {
      fn()
      valid = true
    }, delay)
  }
}

// 将枚举对象转为下拉选择对应的配置数据
export function enumToOptions(data: Object, label = 'label', value = 'value') {
  const ret: AnyObject = []
  for (const [key, val] of Object.entries(data)) {
    const item = {}
    item[label] = val
    item[value] = key

    ret.push(item)
  }
  return ret
}
