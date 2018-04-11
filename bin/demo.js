#!/usr/bin/env node
// var axios = require('../');
var program  = require('commander');
program.version('v' + require('../package.json').version)  
       .description('Manipulate asar archive files')  
  
program.command('pack <dir> <output>')  
       .alias('p')  
       .description('create asar archive')  
       .action(function (__dirpath, output) {  
         asar.geAsar(__dirpath,output);  
         console.log(output+"文件成功生成");  
       })  
program.parse(process.argv)  
  
if (program.args.length === 0) {  
  program.help()  
}  