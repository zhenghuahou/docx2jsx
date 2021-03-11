const configList = [
  // {
  // //  重要提示
  //  srcFile: 'docs/ClauseHint.docx',
  // // 模板文件
  //  templateFile: 'template/ClauseHint.jsx',
  //  matchHdReg: /^[\d\s]+\.([\s，\u4e00-\u9fa5]+)：/,
  //  HdTag: 'Item',
  //  BdTag:'p'
  // },
  // {
  //   // 免责说明
  //   srcFile: 'docs/clause-exemption.docx',
  //   // 匹配标题的正则表达式
  //   matchHdReg: /^[、\d\s]+([\s，\u4e00-\u9fa5]+)：/,
  //   // 标题标签
  //   HdTag: 'Item',
  //   attr:{
  //     title:{
  //       skipKeyWord:true
  //     }
  //   },
  //   // 标题className
  //   // HdClassName:'',
  //   // 描述标签
  //   // BdTag:'p',
  //   // 模板文件
  //   templateFile: 'template/ClauseExemption.jsx',
  // },
  // {
  //   // 常见问题
  //   // 常见问题不需要模板文件，直接根据docs内容生成json格式数据
  //   //匹配标题的正则表达式---用来生成key
  //   // matchHdReg: /reg/,
  //   //标题中不需要显示的一些文本
  //   blackHdReg: '',
  //   blackBdReg: '',
  //   srcFile: 'temp/FAQ.text',
  //   //某个文件具体的输出路径
  //   outputPath: 'JSON',
  //   templateFile: 'template/FAQ.jsx',
  //   // 转化为json格式
  //   convert: 'convertToJSON',
  //   //输出文件的格式
  //   outputExt: '.json',
  // },
  {
    // 健康告知
    srcFile: 'temp/inform.text',
    // separator: '以下情况可作为例外事项，仍符合投保条件：',
    separator: '备注：',
    // 匹配标题的正则表达式
    matchHdReg:/^[.\d]+\.([\d\s【】？，\u4e00-\u9fa5]+)：?/,
    HdTag: 'Item',
    templateFile: 'template/Inform.jsx',
    // 转化为健康告知格式，健康告知比较特殊单独处理
    convert: 'convertToJSX4Inform'
  },
];

module.exports = {
  // https://account.cloudmersive.com/keys
  // 如果需要把docx转化为jsx/json,`apiKey`是必填的
  // 如果只需要把TXT文件转化为jsx/json,不需要设置`apiKey`
  apiKey: 'b70b2ea6-ba09-4417-94ec-bf5f0241dfe4',
  // 默认文件的输出目录
  outputDir: 'dist',
  configList,
};
