# 文件上传组件

```js
// 手动上传文件示例代码
const token = _self.$vuex.get('token');
const headers = new Headers();
headers.append('authorization', token);

const formdata = new FormData();

imgList.value.forEach(async ({ originFileObj, index, sortIndex, time }) => {
  // imgFiles.push(originFileObj);
  formdata.append('imgFiles', originFileObj);
  times.push({
    index,
    sortIndex,
    time,
  });
});

formdata.append('times', JSON.stringify(times));
formdata.append('width', width + '');
formdata.append('height', height + '');

const requestOptions: any = {
  method: 'POST',
  headers: headers,
  body: formdata,
  redirect: 'follow',
};

fetch(`${_baseApi}upload_imgs_2_video`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    spinning.value = false;

    const { code, msg, data } = result;
    if (code === 200) {
      message.success(msg);
      videoUrl.value = `${_baseApi}${data}`;

      emit('update:modelUrl', data);
      emit('update:modelTime', videoTime.value);
      emit('validateVideo');
    } else {
      message.error(msg);
    }
  })
  .catch((error) => {
    spinning.value = false;
  });
```
