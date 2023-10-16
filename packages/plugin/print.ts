type RowIndex = {
  title: string;
  style?: string;
  render?: Function;
};

type Column = {
  title: string;
  key: string;
  style?: string;
  render?: Function;
};

type FootCell = {
  val: string;
  colspan?: number;
  style?: string;
  render?: Function;
};

interface TableCfg {
  showTHead?: boolean; // 是否显示表头
  rowIndex?: RowIndex;
  columns: Column[];
  tfoot?: FootCell[];
}

const PRINT_STYLE = `
/* @import url("./print/print.css"); */
@media print {

  /* @page {size: A4 portrait}; */
  @page {
    size: A4 landscape;

    @bottom-center {
      content: "第" counter(page) "页";
    }
  }

  .title {
    width: 100%;
    text-align: center;
    font-size: 16px
  }

  .info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    font-size: 13px
  }

  table {
    margin: 12px 0;
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
    border: 1px solid #999999;
    font-size: 14px;
  }

  thead,
  tfoot {
    background: #f6f6f6;
    color: #333333
  }

  tr {
    height: 36px;
  }

  tr td:first-child {
    background: #f6f6f6
  }

  th,
  td {
    border: 1px solid #999999;
    text-align: center;
    word-wrap: break-word;
    word-break: break-all word-wrap: break-word;
    word-break: break-all
  }
}
`;

/**
 * @param data 表格数据 []
 * @param cfg 表格配置
  {  // 完整配置示例
    showTHead: true,  // 是否显示表头
    rowIndex: {  // 行索引配置(没有就不显示)
      title: '编号',
      // style: '',
      // render: (data) => {},
    },
    columns: [
      {
        title: '本号',
        key: 'gameId',
        // style: 'width: 36%',
        // render: (data) => {
        //   return data?.map((item) => item.t_jkp_stock_jkp_bet_id).join(', ') || '-';
        // },
      },
    ],
    tfoot: [
      {
        val: '总计',
        colspan: 6,
        // style: '',
        // render: (data) => {},
      },
      {
        val: proofData.total,
        colspan: 1,
        // style: '',
        // render: (data) => {},
      },
    ],
  };
 * @returns 表格 HTML 拼接字符串
 */
export function createTableHTML(data: AnyObject[], cfg: TableCfg) {
  const { showTHead, rowIndex, columns, tfoot } = cfg;

  const idxTh = rowIndex ? `<th>${rowIndex.title}</th>` : '';

  const theadHTML = showTHead
    ? '<tr>' +
      idxTh +
      columns
        .map(({ title, key, style }) => {
          return `<th style="${style}">${title}</th>`;
        })
        .join('') +
      '</tr>'
    : '';

  const tfootHTML = tfoot
    ? '<tr>' +
      tfoot
        .map(({ val, colspan, style, render }) => {
          return `<td colspan="${colspan || 1} style="${style}">${render ? render(val) : val}</td>`;
        })
        .join('') +
      '</tr>'
    : '';

  let tbodyHTML = '';
  data.forEach((item, idx) => {
    // console.log(`🚀 ~ createTableHTML ~ item:`, item);
    const idxTd = rowIndex
      ? `<td style="${rowIndex.style}">${
          rowIndex?.render ? rowIndex.render(idx + 1) : idx + 1
        }</td>`
      : '';

    tbodyHTML +=
      '<tr>' +
      idxTd +
      columns
        .map(({ title, key, style, render }) => {
          return `<td style="${style}">${render ? render(item[key]) : item[key]}</td>`;
        })
        .join('') +
      '</tr>';
  });

  // console.log(`🚀 ~ createTableHTML ~ theadHTML:`, theadHTML);
  // console.log(`🚀 ~ createTableHTML ~ tbodyHTML:`, tbodyHTML);
  // console.log(`🚀 ~ createTableHTML ~ tfootHTML:`, tfootHTML);

  return `<table>
    <thead>
      ${theadHTML}
    </thead>
    <tbody>
      ${tbodyHTML}
    </tbody>
    <tfoot>
      ${tfootHTML}
    </tfoot>
  </table>
  `;
}

/**
 * @param printHTML 打印内容
 */
export function pdfPrint(printHTML) {
  let printIframe = document.getElementById('printIframe');
  printIframe && document.body.removeChild(printIframe!);

  // if (!printIframe) {}
  // 创建打印 iframe
  printIframe = document.createElement('IFRAME');
  printIframe.setAttribute('id', 'printIframe');
  // iframe 样式: width: 0; height: 0; visibility: hidden;
  printIframe.style.display = 'none';
  document.body.appendChild(printIframe);

  const iframeWindow = (<HTMLIFrameElement>printIframe).contentWindow;
  const iframeDocument = iframeWindow!.document;

  // 打印内容
  // const printCtt = document.getElementById('printProof');
  // iframeDocument.write(printCtt!.innerHTML);
  iframeDocument.write(printHTML);

  // if (iframeDocument.head.childNodes.length) {}

  // 打印内容样式
  // const printCttStyle = document.createElement('link');
  // printCttStyle.href = '@/print.css'; // 这里会读绝对路径
  // printCttStyle.rel = 'stylesheet';
  // printCttStyle.type = 'text/css';
  // iframeDocument.head.appendChild(printCttStyle);

  // 系统打印页面属性
  const printPageStyle = document.createElement('style');
  printPageStyle.type = 'text/css';
  printPageStyle.media = 'print';
  printPageStyle.innerHTML = PRINT_STYLE;
  iframeDocument.head.appendChild(printPageStyle);

  // 调用打印
  iframeDocument.close();
  iframeWindow!.focus();
  iframeWindow!.print();

  // const beforePrint = function () {
  //   console.log('打印前');
  // };
  // //定义打印后事件
  // const afterPrint = function () {
  //   console.log('打印后');
  //   document.body.removeChild(printIframe!);
  // };

  // //监听window状态
  // if (window.matchMedia) {
  //   const mediaQueryList = window.matchMedia('print');

  //   //为印添加事件
  //   mediaQueryList.addListener(function (mql) {
  //     if (mql.matches) {
  //       beforePrint();
  //     } else {
  //       afterPrint();
  //     }
  //   });
  // }

  // setTimeout(() => {
  //   console.error('close');
  //   document.body.removeChild(printIframe!);
  // }, 2000);
}
