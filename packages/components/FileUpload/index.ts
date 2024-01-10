type MediaSize = {
  width: number;
  height: number;
};

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
export function getVideoDuration(v) {
  if (!v) {
    // fData.t_material_video_time = '';
    return
  }

  const { event, file, fileList } = v
  if (event?.percent && event.percent === 100) {
    // const url = fileList[0].response.data;
    const video = document.createElement('video')

    video.preload = 'metadata'
    video.src = URL.createObjectURL(file.originFileObj)
    video.onloadedmetadata = function () {
      window.URL.revokeObjectURL(video.src)
      // const duration = video.duration;
      // duration 为上传视频的时长
      // fData.t_material_video_time = Math.ceil(video.duration);
    }
  }
}
