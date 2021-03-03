const inquirer = require('inquirer');

function prompt2config() {
    return inquirer
        .prompt([
            {
                name: 'config-is-exist',
                type: 'confirm',
                message: `配置文件不存在，是否先创建配置文件?`,
                validate: function (input) {
                    const answer = input.lowerCase;
                    if (answer !== 'y' && answer !== 'n') {
                        return 'please input y/n !';
                    } else {
                        return true;
                    }
                },
            },
        ])
        .then((answers) => {
            return answers['config-is-exist'];
        });
}

module.exports = {
    prompt2config,
};
