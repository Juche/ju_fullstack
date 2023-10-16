<template>
  <div class="clearfix">
    <!-- disabled => 防止文件数够了后点击label仍会调起上传上下文 => 但是会导致不显示删除按钮 -->
    <!-- :disabled="fileList?.length >= fileCount" -->
    <!-- :class="{ 'hide-upload-list': !showList }" -->
    <a-upload
      v-model:file-list="fileList"
      :list-type="listType"
      :accept="accept"
      :multiple="multiple"
      :maxCount="fileCount"
      :action="action"
      :name="filedName"
      :headers="header"
      :showUploadList="showList"
      :before-upload="beforeUpload"
      @preview="handlePreview"
      @change="fileListChange"
    >
      <template v-if="(fileList && fileList.length < fileCount) || disableMode !== 'hide'">
        <div v-if="listType === 'picture-card'">
          <!-- <plus-outlined />
          <cloud-upload-outlined /> -->
          <upload-outlined />
          <div style="margin-top: 8px">{{ describe }}</div>
        </div>
        <a-button
          :type="btnType"
          :disabled="(fileList?.length >= fileCount && disableMode === 'disabled') || isDisabled"
          v-else
        >
          <upload-outlined />
          {{ describe }}
        </a-button>
      </template>
      <!-- 通过 slot 控制隐藏文件列表 -->
      <!-- <template v-if="!showList" #itemRender="{ file, actions }" /> -->

      <!-- <template #itemRender="{ file, actions }">
        <a-space>
          <span :style="file.status === 'error' ? 'color: red' : ''">{{ file.name }}</span>
          <a href="javascript:;" @click="actions.download">download</a>
          <a href="javascript:;" @click="actions.remove">delete</a>
        </a-space>
      </template> -->
    </a-upload>
  </div>
</template>
<script lang="ts" setup>
  import { computed, h, onBeforeUnmount, onMounted, Ref, ref } from 'vue';
  import { message, Modal } from 'ant-design-vue';
  import { UploadOutlined, PlusOutlined, CloudUploadOutlined } from '@ant-design/icons-vue';
  import { _baseApi } from '@/config.js';

  /**
   * 配置项:
   *    [x] 组件显示模式(text / picture / picture-card / 按钮)
   *    [x] 文件类型(https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)
   *    [x] 多选支持(true / false)
   *    [x] 上传文件数量
   *    [x] 接口地址
   *    [x] 上传模式(auto / manual) !!props.action ? 自动 : 手动
   *    [x] 预览需求
   *    下载需求
   */
  interface UploadProps {
    // fileListBind?: any;
    listType?: string;
    accept?: string;
    multiple?: boolean;
    fileCount?: number;
    fileSizeMin?: number | null;
    fileSizeMax?: number | null;
    fileSizeUnit?: string;
    action?: string | null;
    filedName: string;
    needPreview?: boolean;
    needDownload?: boolean;
    describe?: string;
    btnType?: string;
    showList?: any;
    isDisabled?: boolean;
    disableMode?: string;
  }
  const props = withDefaults(defineProps<UploadProps>(), {
    // fileListBind: [],  // 父页面文件变化(删改),组件监听变化后处理 => 通过暴露delete方法替代
    listType: 'picture-card',
    accept: 'image/*',
    multiple: false,
    fileCount: 1,
    fileSizeMin: null,
    fileSizeMax: null,
    fileSizeUnit: 'Mb', // Kb / Mb
    action: null,
    filedName: 'file', // 上传接口字段名
    needPreview: true,
    needDownload: false,
    describe: '上传文件', // 上传按钮描述文字
    btnType: '', // 上传按钮样式 `button type`
    showList: true, // 是否展示 uploadList, 可设为一个对象，用于单独设定 showPreviewIcon, showRemoveIcon 和 showDownloadIcon
    isDisabled: false, // hide: 隐藏 disabled: 禁用样式
    disableMode: 'hide', // hide: 隐藏 disabled: 禁用样式

    // 测试用参数
    // listType: 'picture',
    // accept: '*',
    // accept: '.csv',
    // multiple: true,
    // fileCount: 5,
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    // labels: () => ['one', 'two'],
  });
  /**
   *
   * 功能:
   *    自动上传 => 提供响应数据
   *    手动上传 => 提供文件清单
   *    图片预览
   *    视频预览
   */
  const emit = defineEmits<{
    (e: 'update:fileList', fileList): void;
  }>();

  const header = ref({
    Authorization: _self.$vuex.get('token'),
  });

  const sizeBaseVal = computed(() => {
    const sizeBase = {
      kb: 1024,
      mb: 1048576,
    };
    const unit = props.fileSizeUnit.toLocaleLowerCase();
    return sizeBase[unit];
  });
  const fileSizeMaxVal = computed(() => props.fileSizeMax && props.fileSizeMax * sizeBaseVal.value);
  const fileSizeMinVal = computed(() => props.fileSizeMin && props.fileSizeMin * sizeBaseVal.value);

  const fileList = ref<AnyObject[]>([
    // {
    //   code: 200,
    //   count: 1,
    //   data: 'gyjfad/video/262fb1e0-d670-4bb5-90ec-2e7961646677.webm',
    //   msg: 'OK',
    //   src: 'https://timp.hubcf.com/lottery/jifen/api/gyjfad/video/262fb1e0-d670-4bb5-90ec-2e7961646677.webm',
    //   previewUrl:
    //     'https://timp.hubcf.com/lottery/jifen/api/gyjfad/video/262fb1e0-d670-4bb5-90ec-2e7961646677.webm',
    //   fileType: 'video',
    //   thumbUrl: './video.png',
    // },
    // {
    //   uid: '-1',
    //   name: 'image.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-2',
    //   name: '01.mp4',
    //   status: 'done',
    //   url: 'http://192.168.2.34:5500/__ASSETS__/points_test_media/01.mp4',
    // },
    // {
    //   uid: '-xxx',
    //   percent: 50,
    //   name: 'image.png',
    //   status: 'uploading',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    // },
    // {
    //   uid: '-4',
    //   name: 'image.png',
    //   status: 'error',
    // },
  ]);

  const fileResList: Ref<AnyObject[]> = ref([]);

  const beforeUpload = (file) => {
    // 处理上传数多余允许数量 => 绑定 maxCount 即可
    // if (fileList.value?.length == props.fileCount) return;
    // if (fileList.value?.length > props.fileCount) fileList.value.splice(props.fileCount);

    if (fileSizeMaxVal.value && file.size > fileSizeMaxVal.value) {
      message.error(`文件大小超过了 ${props.fileSizeMax} ${props.fileSizeUnit}`);
      return false;
    }

    if (fileSizeMinVal.value && file.size > fileSizeMinVal.value) {
      message.error(`文件大小没达到 ${props.fileSizeMin} ${props.fileSizeUnit}`);
      return false;
    }

    // 手动模式自己更新文件列表
    // 自动模式不处理,自行走 action 接口
    if (!props.action) {
      fileList.value = [...fileList.value, file];
      return false;
    }
  };

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  function getFileUrlType(url) {
    const urlStr = url.toLowerCase();
    const videoReg = /(.*)\.(mp4|ogg|webm)$/;
    const imgReg = /(.*)\.(gif|jpg|jpeg|png)$/;
    const base64Head = /^data:\w+\/\w+;base64,/; // /\w+:\w+\/\w+;base64,/
    const base64HeadSplit = /^data:(\w+)\/(\w+);base64,/;

    if (videoReg.test(urlStr)) return 'video';
    if (imgReg.test(urlStr)) return 'image';
    // TODO: pdf / office 文档支持(暂时无需求)
    return 'other';

    // 判断是否 base64 文件 & 匹配返回文件格式
    // if (base64Head.test(urlStr)) {
    //   // return urlStr.split(',')[0].match(/:(.*?);/)[1];
    //   // return urlStr.split(',')[0].match(/:(\w+)\/\w+;/)[1]
    //   return urlStr.match(base64HeadSplit)[1];
    // } else {
    //   // 文件类型校验处理
    //   if (videoReg.test(urlStr)) return 'video';
    //   if (imgReg.test(urlStr)) return 'image';
    //   // TODO: pdf / office 文档支持(暂时无需求)
    //   return 'other';
    // }
  }

  function createFileUrlPreview(file) {
    const { data } = file;
    // const fileType = getFileUrlType(url);
    // const fileBlob = URL.createObjectURL(file.originFileObj);
    const previewUrl = `${_baseApi}${data}`;
    const fileType = getFileUrlType(previewUrl);
    file.src = previewUrl;
    file.previewUrl = previewUrl;
    file.fileType = fileType;
    // 当前只修改视频资源的缩略图
    if (fileType === 'video')
      file.thumbUrl = props.listType === 'picture-card' ? './video-card.png' : './video.png'; // 缩略图
  }

  function getFileType(file) {
    const { type } = file;
    return type.split('/')[0];
  }

  function handleFileData(file, index) {
    // const { url, preview, thumbUrl, originFileObj } = file;
    // const fileName = url.substring(url.lastIndexOf('/') + 1);

    // let fileBase64;
    // let fileBlob;
    // if (!url && !preview && !thumbUrl) {
    //   // fileBase64 = (await getBase64(originFileObj)) as string;
    //   fileBlob = URL.createObjectURL(file.originFileObj);
    // }

    // const previewUrl = url || preview || thumbUrl || fileBlob;

    // return previewUrl;

    const fileType = getFileType(file);
    const fileBlob = URL.createObjectURL(file.originFileObj);
    file.previewUrl = fileBlob;
    file.fileType = fileType;
    // 当前只修改视频资源的缩略图
    if (fileType === 'video')
      file.thumbUrl = props.listType === 'picture-card' ? './video-card.png' : './video.png'; // 缩略图

    file.response = fileResList.value[index]; // 存储 action 的响应数据
  }

  async function fileListChange(data) {
    // 如果是自动上传 => 返回响应结果
    // 如果是手动上传 => 返回原始文件
    // 在这里处理文件对象 => 控制预览逻辑(fileList / thumbUrl / previewUrl)

    // 过滤掉不满足条件的素材
    if (fileSizeMaxVal.value) {
      fileList.value = fileList.value.filter((file) => file.size < fileSizeMaxVal.value!);
    }

    if (fileSizeMinVal.value) {
      fileList.value = fileList.value.filter((file) => file.size > fileSizeMinVal.value!);
    }

    if (!!props.action) {
      // const { file, fileList, event } = data;
      const { file } = data;

      if (file?.status === 'done') {
        // 多个文件自动上传的情况返回响应数据数组
        // 要根据后台返回的响应结果处理预览数据 => 可在父页面绑定响应数据结构来解析

        fileResList.value = [...fileResList.value, file?.response];

        fileList.value = fileList.value.map((file, index) => {
          handleFileData(file, index);
          return file;
        });

        emit('update:fileList', fileList);

        // const fileRes = file?.response;
        // if (!fileRes) return;
        // createFileUrlPreview(fileRes);
        // fileList.value = fileResList.value;
        // emit('update:fileList', fileResList);
      }
    } else {
      fileList.value = fileList.value.map((file, index) => {
        handleFileData(file, index);
        return file;
      });

      emit('update:fileList', fileList);
    }
  }

  const handlePreview = async (file) => {
    if (!props.needPreview) return; // 不需预览直接跳过

    let fileDom;
    const { fileType, previewUrl } = file;

    // TODO: 多个素材切换预览 & 显示素材名
    switch (fileType) {
      case 'video':
        fileDom = h('video', {
          src: previewUrl,
          controls: true,
          autoplay: true,
          muted: true,
          class: 'media-ctt media-video',
        });
        break;
      case 'image':
        fileDom = h('img', { src: previewUrl, class: 'media-ctt media-img' });
        break;
      default:
        message.error('该文件不支持预览!');
        return;
    }

    Modal.info({
      // title: name,
      icon: null,
      content: h('div', { class: 'flex-col-c media-ctn' }, fileDom),
      wrapClassName: 'media-preview-modal',
      centered: true,
      closable: true,
      maskClosable: true,
    });
  };

  // 提供文件删除方法给父页面
  function delFile(index) {
    fileList.value.splice(index, 1);
  }

  // 提供文件删除方法给父页面
  function clearFileList() {
    fileList.value.splice(0);
  }

  onBeforeUnmount(() => {
    fileResList.value = [];
    fileList.value = [];
  });

  defineExpose({
    delFile,
    clearFileList,
  });
</script>
<style lang="less" scoped>
  :deep(.ant-upload-select-picture-card) {
    i {
      font-size: 32px;
      color: #999;
    }
    .ant-upload-text {
      margin-top: 8px;
      color: #666;
    }
  }

  :deep(.ant-upload-list-picture-card) {
    // .ant-upload-list-item-thumbnail {
    //   height: 50%;
    // }
    .ant-upload-list-item-name {
      display: block;
      margin-top: -30px;
    }
  }

  // 通过样式控制隐藏文件列表
  // .hide-upload-list {
  //   :deep(.ant-upload-list) {
  //     display: none;
  //   }
  // }
</style>
