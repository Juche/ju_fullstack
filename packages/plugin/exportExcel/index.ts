// @ts-ignore
// import XLSX from 'https://cdn.sheetjs.com/xlsx-0.19.2/package/xlsx.mjs';
// import XLSX_ZAHL_PAYLOAD from 'https://cdn.sheetjs.com/xlsx-0.19.2/package/dist/xlsx.zahl.mjs';

/**
 * @exportExcel
 * @param header [{}, {}]
 * @param title
 * @param data [[], []] 或 [{}, {}]
 * @param sheetCfg { fileName: '表格文件'; sheetName: 'Sheet1' }
 */

/**
 * @data 示例
 * [[], []] => isAoa: true
[
  ['表头A', '表头B', '表头C'],
  [1, 2, 3],
]
 * [{}, {}] => isAoa: false => json 对象
 * 需要单独指定 header 数据
[
  {'表头A': 1},
  {'表头B': 2},
  {'表头C': 3},
]
 */

/**
 * @使用示例
async function downloadExcel() {
  const header = {
    t_group_list_autoid: 'ID',
    t_group_list_ad_list_id: '物料ID',
    t_group_list_mae_geo_code: '行政区编号',
    t_group_list_area_name: '行政区名',
    t_group_list_group_name: '资源分类',
    // t_group_list_start_time: '播放开始时间',
    // t_group_list_end_time: '播放结束时间',
    t_group_list_create_time: '创建时间',
  };

  // 获取需转换的数据 getSheetData => `return res?.data || [];`
  const data = await getSheetData();

  // 在传入转换前按需做对应的数据格式转换

  exportExcel(header, data, {
    fileName: 'Excel表格1',
    sheetName: 'Sheet1',
    fileFormat: 'xlsx',
  });
}
 */

// /**
//  * @param data source data
//  * @param worksheet worksheet object
//  * @param min min width
//  */
// function setColumnWidth(data, worksheet, min = 30) {
//   const obj = {};
//   worksheet['!cols'] = [];
//   data.forEach((item) => {
//     Object.keys(item).forEach((key) => {
//       const cur = item[key];
//       const length = cur?.length ?? min;
//       obj[key] = Math.max(length, obj[key] ?? min);
//     });
//   });
//   Object.keys(obj).forEach((key) => {
//     worksheet['!cols'].push({
//       wch: obj[key],
//     });
//   });
//   console.log(`🚀 ~ Object.keys ~ worksheet:`, worksheet);
// }

type SheetCfg = {
  fileName?: string;
  sheetName?: string;
  fileFormat?: string;
  colWidth?: null | number[];
  rowHight?:null | number[];
};

export default async function exportExcel(
  header,
  data,
  // title,
  sheetCfg: SheetCfg = {
    fileName: 'Excel表格',
    sheetName: 'Sheet1',
    fileFormat: 'xlsx',
    colWidth: null,
    rowHight: null,
  }
) {
  const { utils, writeFile } = await import('./xlsx.min.mjs');

  const isAoa = Array.isArray(data[0]);
  // console.log(`🚀 ~ isAoa:`, isAoa);

  const wb = utils.book_new();
  let ws;

  const sheetHeader = Object.values(header);
  const colLen = sheetHeader?.length;
  // console.log(`🚀 ~ downLoadExcel ~ sheetHeader:`, sheetHeader);

  // 标题
  // const title = {
  //   t_unit_id3_ex_unit_name: '表格标题',
  // };
  const titMerge = { s: { r: 0, c: 0 }, e: { r: 0, c: colLen - 1 } };
  if (isAoa) {
    // 当数据列大于表头列时过滤数据
    if (data[0]?.length > colLen) {
      data = data.map((item) => item.slice(0, colLen));
    }

    ws = utils.aoa_to_sheet([sheetHeader, ...data]);
    
  } else {
    // data = data.map((item) => {
    //   const _item = {};
    //   for (const key of Object.keys(item)) {
    //     if (header[key]) {
    //       _item[header[key]] = item[key];
    //     }
    //   }

    //   return _item;
    // });
    // console.log(`🚀 ~ downLoadExcel ~ data:`, data);

    // 当数据列大于表头列时过滤数据
    if (data.length&&Object.keys(data[0])?.length > colLen) {
      data = data.map((item) => {
        const _item = {};
        for (const [key, val] of Object.entries(item)) {
          if (header[key]) {
            _item[key] = val;
          }
        }

        return _item;
      });
    }
    //title
    ws = utils.json_to_sheet([header, ...data], {
      // header: sheetHeader,
      skipHeader: true,
    });

    // setColumnWidth([header, ...data], ws);
  }

  // 列宽配置 => TODO: 计算列宽
  if (sheetCfg?.colWidth) {
    ws['!cols'] = sheetCfg.colWidth.map((width) => {
      // return { wpx: width };
      return { wch: width };
    });
  }

  // 设置行高 => TODO: 计算行高
  if(sheetCfg?.rowHight){
    ws['!rows'] = sheetCfg.rowHight.map((height)=>{
      return { hpx: height }
    })
  }
  // ws['!rows'] = [{ hpx:20 }];//[{ hpx: 20 }, { hpx: 30 }, { hpx: 60 }, { hpx: 80 }];

  // ws['!merges'] = [{ e: { c: 8, r: 0 }, s: { c: 0, r: 0 } }]; //合并单元格
  // ws['!merges'] = [titMerge]; //合并单元格

  utils.book_append_sheet(wb, ws, sheetCfg.sheetName);
  writeFile(wb, `${sheetCfg.fileName}.${sheetCfg.fileFormat}`, { compression: true });
}

// 表格数据导出为 excel
export async function downLoadTableToExcel(tableId, sheetName) {
  const { utils, writeFile } = await import('./xlsx.min.mjs');
  const wb = utils.table_to_book(document.getElementById(tableId));
  writeFile(wb, `${sheetName}.xlsx`);
}
