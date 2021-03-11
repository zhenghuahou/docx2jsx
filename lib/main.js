const fse = require('fs-extra')
const chalk = require('chalk');
const { util } = require('./util');
const convert = require('./convert');
const { getConvertFn } = convert;
const { isFunction, getBasename, joinPath } = util;


// 把docs内容里面的文本转化为jsx文本或者json字符串
function transformText(srcFile = '', cfg = {}) {
  const { plugin = () => { } } = cfg;
  // 根据config配置获取convert转换函数
  const convertFn = getConvertFn(cfg);
  const basename = getBasename(srcFile);
  const tempFile = joinPath(`temp/${basename}.text`);
  return fse
    .readFile(tempFile)
    .catch((e) => {
      const { convertRequest } = require('./docx2Txt');
      return convertRequest(srcFile); // 读取docx格式文件的文本
    })
    .then((str) => str.toString())
    .then((text) => {
      const d = convertFn(text, cfg);
      isFunction(plugin) && plugin(d);
      return d;
    })
    .catch((e) => {
      console.error('transform text error:', e.message);
    });
}

// 根据模板文件以及text文本替换为需要的数据格式
function genData(templateText, transformTextObj = {}) {
  return templateText.replace(/#{(\w+)}/g, (_match, $1) => {
    return transformTextObj[$1];
  });
}

function run() {
  const config = require(`${process.cwd()}/docx2json.js`);
  const { outputDir, configList = [] } = config;
  const promises = [];
  for (let i = 0; i < configList.length; i++) {
    const { srcFile,
      outputPath: _outputPath = 'JSX',
      templateFile,
      outputExt = '.jsx',
      ...restConfig } = configList[i];
    const basename = getBasename(srcFile);
    // 待处理的docs源文件或者text等文件
    const srcPath = joinPath(srcFile);
    if (!basename) {
      console.log(chalk.red('srcFile 配置不能为空'));
      continue;
    }
    // 目标文件
    const outputPath = joinPath(`${outputDir}/${_outputPath}/${basename}${outputExt}`);
    // 模板文件
    const templatePath = joinPath(templateFile);
    const p = transformText(srcPath, restConfig).then((transformTextObj = {}) => {
      const tipsText = `${basename}文件生成`;
      return fse
        .readFile(templatePath) // 读取模板文件
        .then((template) => {
          const templateText = template.toString();
          // 根据模板文件以及docs文件内容生成目标内容
          const targetText = genData(templateText, transformTextObj);
          // 把目标内容输出目标文件
          fse.outputFile(outputPath, targetText);
          return tipsText;
        })
        .catch(() => {
          // 处理没有模板文件的情况
          fse.outputFile(outputPath, transformTextObj.text);
          return tipsText;
        });
    });

    promises.push(p);
  }

  Promise.all(promises).then((values) => {
    console.log(chalk.magenta('==== 运行结果 ===='));
    console.info(chalk.yellow.underline(values.join('\n')));
  });

}

module.exports = function () {
  console.log('run start ...')
  run();
}
