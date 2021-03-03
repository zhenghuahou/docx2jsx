#! /usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const path = require('path');
const fse = require('fs-extra');
const inquirer = require('./inquier.js');
const gen = require('../lib/main.js');
const configName = 'docx2json.js';

const { prompt2config } = inquirer;

// 判断文件是否存在
function checkFileExist(file) {
  return fse.pathExists(path.resolve(file));
}

async function createConfigTemplate() {
  //创建配置文件模板
  const data = await fse.readFile(path.join(__dirname,'../configTemplate.js'));
  await fse.outputFile(configName, data);
  return true;
}

program
  .command('init')
  .description('创建模板配置文件')
  .action(async (option) => {
    await createConfigTemplate();
    console.log(chalk.magenta('创建模板配置文件成功'));
  });

program
  .command('gen')
  .description('生成文件')
  .action(async (option) => {
    const isExist = await checkFileExist(configName);
    if (!isExist) {
      //配置文件不存在,显示弹窗
      const answer = await prompt2config();
      if (answer) {
        //创建模板配置文件
        await createConfigTemplate();
      } else {
        return console.log(chalk.magenta('请先创建配置文件'));
      }
    }
    //配置文件存在,执行生成文件命令
    gen();
  });

program.parse(process.argv);
