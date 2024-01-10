import { Modal } from 'ant-design-vue'

// async function getData() {
//   const { getFn: searchFn, statusKey, primaryKey } = tableOpts || {};
//   const { query } = getPageInfo(store, route);
//   if (loading.value) return;
//   if (!searchFn) return message.warning('未配置搜索函数');
//   if (!primaryKey) return message.warning('未配置主键');
//   loading.value = true;
//   const res = await searchFn({
//     primaryKey,
//     statusKey,
//     ...query,
//     ...filter.value,
//   });
//   if (res && Array.isArray(res.data)) {
//     total.value = res.count || 0;
//     dataSource.value = res.data;
//   } else {
//     dataSource.value = [];
//     total.value = 0;
//   }
//   loading.value = false;
// }

// 优化删除确定弹窗
export default function deleteConfirmModal({ delFn, delParams, delKey, cbFn, cbParams }) {
  const delName = delKey ? `「${delParams[delKey]}」` : ''
  Modal.confirm({
    title: `确定删除${delName}吗?`,
    // title: `确定删除「${delName}」吗?`,
    // icon: h(ExclamationCircleOutlined),
    // content: h('div', { class: 'text-success' }, ''),
    async onOk() {
      const { code } = await delFn(delParams)
      // 有回调函数就执行回调函数,否则 emit
      if (code === 200) {
        (cbFn && cbFn(cbParams || null, true)) || eventHub.emit('updateTableData')
      }
    },
  })
}
