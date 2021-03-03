const fs = require('fs');
const CloudmersiveConvertApiClient = require('cloudmersive-convert-api-client');
const { util } = require('./util');
const config = require(`${process.cwd()}/docx2json.js`);

const defaultClient = CloudmersiveConvertApiClient.ApiClient.instance;

// Configure API key authorization: Apikey
// https://account.cloudmersive.com/default
const { Apikey } = defaultClient.authentications;
const apiKey = config.apiKey;
Apikey.apiKey = apiKey; // 换成自己的apiKey
const apiInstance = new CloudmersiveConvertApiClient.ConvertDocumentApi();

exports.convertRequest = (sourceFile) => {
  const basename = util.getBasename(sourceFile);
  const srcPath = util.joinPath(`docs/${basename}.docx`);
  const distPath = util.joinPath(`temp/${basename}.text`);

  return new Promise((resolve, reject) => {
    const callback = function (error, data, response) {
      if (error) {
        console.error('error:', error);
        reject(error);
      } else {
        const { TextResult } = data;
        resolve(TextResult);
        // console.info( 'TextResult--->',TextResult);
        fs.writeFileSync(distPath, TextResult, { encoding: 'utf8' });
      }
    };

    const inputFile = Buffer.from(fs.readFileSync(srcPath).buffer);
    apiInstance.convertDocumentDocxToTxt(inputFile, {}, callback);
  });
};
