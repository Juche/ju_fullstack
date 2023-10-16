<template>
  <div class="tab-btn-shortcuts w-100p flex-row-sb-c">
    <a-tabs v-model:activeKey="activeKey" type="card" @change="change">
      <a-tab-pane v-for="item in tabs" :key="item.val" :tab="item.key" :closable="false">
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
  type Tab = {
    key: string;
    val: string | number;
  };

  const props = defineProps<{
    activeKey: string | number;
    tabs: Tab[];
  }>();

  const emit = defineEmits<{
    (e: 'update:activeKey', activeKey): void;
  }>();

  function change(activeKey) {
    emit('update:activeKey', activeKey);
  }
</script>

<style lang="less" scoped>
  .tab-btn-shortcuts {
    margin-bottom: -1px;
    :deep(.ant-tabs-top > .ant-tabs-nav) {
      margin: 0;
    }
    :deep(.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab + .ant-tabs-tab) {
      margin-left: 5px;
    }
    :deep(.ant-tabs-tab-active) {
      background: @primary-color;
      border: 1px solid @primary-color;
      border-bottom-color: @primary-color!important;
      // box-shadow: inset 0px -1px 0px #0005;
      .ant-tabs-tab-btn {
        color: #fff;
      }
    }
  }
</style>
