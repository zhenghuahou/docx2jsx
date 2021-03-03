const { util } = require('./util');

const defHdReg = /^[\d\s]+\. ([\s，\u4e00-\u9fa5]+)：/;
const defHdReg4JSON = /^[Q：]+([\d\s“”/，?？\u4e00-\u9fa5]+)/;
const defBlackHdReg = /[\s【】]/g
const defBlackBdReg4JSON = /^A：/g

const { isString, isFunction } = util;

function filter(rawText = '') {
  return rawText.split('\r\n').filter((item) => item);
}

// 把`rawText`文本内容，按照reg正则表达式替换为jsx格式文本的核心方法
function convertCore(arr = [], cfg = {}) {
  const { matchHdReg = defHdReg, HdTag: _HdTag, BdTag: _BdTag, blackHdReg: _blackHdReg, HdClassName = '' } = cfg;
  const rstList = [];
  HdTag = _HdTag || 'h3';
  BdTag = _BdTag || 'span';
  blackHdReg = _blackHdReg || defBlackHdReg;
  arr.forEach((rawStr, index) => {
    const r = rawStr.match(matchHdReg) || [];
    const [matchStr, titleStr = ''] = r;
    // 处理标题
    if (matchStr) {
      let restStr = '';
      restStr = rawStr.replace(matchStr, '');
      if (index > 0) {
        rstList.push(`</${HdTag}>`);
      }
      const title = titleStr.replace(blackHdReg, '');
      rstList.push(`<${HdTag} className="${HdClassName}" title="${title}">`);
      restStr && rstList.push(`<${BdTag}>${restStr}</${BdTag}>`);
    } else {
      rawStr = (rawStr || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
      rawStr && rstList.push(`<${BdTag}>${rawStr}</${BdTag}>`);
    }
    // 最后一项添加闭合标签
    if (index == arr.length - 1) {
      rstList.push(`</${HdTag}>`);
    }
  });
  return rstList;
}

// 把`rawText`文本内容，按照reg正则表达式替换为jsx格式文本
function convertToJSX(rawText = '', cfg = {}) {
  const arr = filter(rawText);
  const list = convertCore(arr, cfg);
  return { text: list.join('\r\n') };
}

// 健康告知比较特殊，单独处理
function convertToJSX4Inform(rawText = '', cfg = {}) {
  const { separator = '', reg } = cfg;
  const arr = filter(rawText);
  const index = arr.findIndex((item) => item === separator);
  const arr1 = arr.slice(0, index);
  const arr2 = arr.slice(index + 1);
  const targetReg = reg || defReg;
  const reg2 = /[、\d]+([\d\s，\u4e00-\u9fa5]+)：$/;
  const list1 = convertCore(arr1, targetReg);
  const list2 = convertCore(arr2, reg2, 'Dot');
  return { text: list1.join('\r\n'), text2: list2.join('\r\n') };
}

// 把`rawText`文本内容，按照reg正则表达式替换为json格式文本
function convertToJSON(rawText = '', cfg = {}) {
  // matchHdReg：匹配标题的正则表达式
  const { matchHdReg: _matchHdReg, blackBdReg: _blackBdReg } = cfg;
  matchHdReg = _matchHdReg || defHdReg4JSON;
  blackBdReg = _blackBdReg || defBlackBdReg4JSON
  const arr = filter(rawText);
  let tempItem = {};
  const list = [];
  arr.forEach((rawStr, index) => {
    const r = rawStr.match(matchHdReg) || [];
    const [matchStr, titleStr] = r;
    // 处理标题
    if (matchStr) {
      const { length } = Object.keys(tempItem);
      length && list.push(tempItem);
      tempItem = {};
      tempItem.title = titleStr;
    } else {
      // 处理描述文案
      const desc = tempItem.description || '';
      const descriText = rawStr.replace(blackBdReg, '');
      tempItem.description = desc ? desc + descriText : descriText;
    }
    // 添加最后一项
    if (index == arr.length - 1) {
      list.push(tempItem);
    }
  });

  const List = { list }

  return { text: JSON.stringify(List, null, 2) };
}

const coverMap = {
  convertToJSON,
  convertToJSX,
  convertToJSX4Inform,
}
function getConvertFn({ convert }) {
  let fn;
  if (convert) {
    if (isFunction(convert)) {
      fn = convert;
    }
    if (isString(convert)) {
      fn = coverMap[convert];
    }
  }
  return fn || convertToJSX;
}

module.exports = {
  getConvertFn,
  ...coverMap
};
