//      
'use strict';

const { exec } = require('child_process');
const pify = require('pify');
const chalk = require('chalk');
const getIPv4Port = require('get-port');

function getProcessIdOnPort(port        )                  {
  return pify(exec)('lsof -i:' + port + ' -P -t -sTCP:LISTEN').then((r) =>
    r.split('\n')[0].trim()
  );
}

function getProcessCommand(processId        )                  {
  return pify(exec)(
    'ps -o command -p ' + processId + ' | sed -n 2p'
  ).then((r) => r.replace(/\n$/, ''));
}

function getProcessForPort(
  port        
)                                                  {
  return getProcessIdOnPort(port).then((processId) =>
    getProcessCommand(processId).then((command) => ({ processId, command }))
  );
}

function getPort(port        ) {
  // adding ipv4 host is necessary as node defaults
  // to using ipv6 host which leads to false positives
  // ref: https://github.com/sindresorhus/get-port/issues/8
  return getIPv4Port({ port, host: '0.0.0.0' });
}

function portInUsageMessages(port        )                    {
  return getProcessForPort(port).then(
    ({ processId, command }) => [
      chalk.yellow(
        `Something is already using port ${port}. Probably:` +
          '\n' +
          `  > pid ${processId}` +
          '\n' +
          `  > ${command}`
      ),
      chalk.yellow.bold('Trying a different port ...')
    ],
    () => []
  );
}
module.exports = {
  getPort,
  portInUsageMessages
};
