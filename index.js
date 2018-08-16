
const fs = require('fs');

var csv = __dirname + '/event_def.csv'

var importDef = function (){
  return new Promise (function(resolve, reject){
    fs.readFile(csv, 'utf8', (err, data) => {
        err ? reject(err) : resolve(data);
    });
  });
}

var parseDef = (data) => {
  let lines = data.split(/\r?\n/);
  if (lines.length <= 1) {
    throw 'improper source';
  }
  let attrs = lines[0].split('\,');

  let events = [];
  lines.slice(1, lines.length-1).forEach((curr_line) => {
    let entries = curr_line.split(',');
    let entry = {};
    for (let i = 0; i < attrs.length; i++) {
      entry[attrs[i]] = entries[i];
    }
    events.push(entry);
  });
  return events;
}

function EventDefinitions(){}


EventDefinitions.JSONDef = function(){
  return importDef()
  .then(parseDef)
  .then((data) => {
    return data.filter((item) => {
      return item['Code'].length > 0;
    });
  })
  .catch(err => console.log(err));
}

exports.EventDefinitions = EventDefinitions;
