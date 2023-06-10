const { exec } = require('child_process');
exec('sh ./scripts/start.sh', (error, stdout, stderr) => {
  if (error) {
    console.error(`执行出错：${error}`);
    return;
  }
  console.log(`stdout：${stdout}`);
  console.error(`stderr：${stderr}`);
});