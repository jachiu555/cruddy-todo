const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  items[id] = text;
  var id = counter.getNextUniqueId((err, id) => {
    fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err) => {
      if (err) {
        console.log('error')
      } else {
        callback(null, {id: id, text: text})
      }
    })
  })
};


exports.readAll = (callback) => {
  fs.readdir(exports.dataDir, (err, files) => {
    if (err) {
      console.log('error')
    } else {
      var data = _.map(files, (id) => {
        return {id: id.slice(0, id.length-4), text: id.slice(0, id.length-4)};
      });
      callback(null, data)
    }
  })
};


exports.readOne = (id, callback) => {
  var data = items[id]
  fs.readFile(exports.dataDir + `/${id}.txt`, (err, file) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      // console.log(file)
      // var test = items[id]
      callback(null, { id: id, text: file.toString() });
    }
  });
};

exports.update = (id, text, callback) => {
  fs.readFile(exports.dataDir + `/${id}.txt`, (err, file) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.writeFile(path.join(exports.dataDir, `${id}.txt`), text, (err) => {
        if (err) {
          console.log('error')
        } else {
          callback(null, {id: id, text: text})
        }
      })
    }
  });
};

exports.delete = (id, callback) => {
  fs.readFile(exports.dataDir + `/${id}.txt`, (err, file) => {
    if (err) {
      callback(new Error(`No item with id: ${id}`));
    } else {
      fs.unlink(path.join(exports.dataDir, `${id}.txt`), (err) => {
        if (err) {
          console.log('error')
        } else {
          //delete items[id];
          callback(null, {id: id, text: items[id]})
        }
      })
    }
  });
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
