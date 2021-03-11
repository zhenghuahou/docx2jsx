把txt格式或者docx格式文件转化为jsx文件或者json格式文件

##  使用方法
``` bash

# 安装依赖
npm i

# 创建模板配置文件,基于这个生成的模板文件快速自定义配置
docx2jsx init

# 生成目标文件
docx2jsx gen

```

### 温馨提示
- docx2json.js是配置文件，默认是转化为jsx格式文件，也可以选择转化为json格式
- 通过扩展`docx2json`的cover选项可以支持转换成更多格式的数据
- 把docx文件转化为jsx时，需要配置apikey，[注册网址](https://account.cloudmersive.com/keys)
