/**
 * Created by May on 2017/4/9.
 */

"use strict";

let eol = process.platform === "win32" ? "\r\n" : "\n";

function INI() {
  this.sections = {};
}

/**
 * 删除Section
 * @param sectionName
 */
INI.prototype.removeSection = function (sectionName) {

  sectionName =  sectionName.replace(/\[/g,'(');
  sectionName = sectionName.replace(/]/g,')');

  if (this.sections[sectionName]) {
    delete this.sections[sectionName];
  }
};

/**
 * 创建或者得到某个Section
 * @type {Function}
 */
INI.prototype.getOrCreateSection = INI.prototype.section = function (sectionName) {

  sectionName =  sectionName.replace(/\[/g,'(');
  sectionName = sectionName.replace(/]/g,')');

  if (!this.sections[sectionName]) {
    this.sections[sectionName] = {};
  }
  return this.sections[sectionName]
};

/**
 * 将INI转换成文本
 *
 * @returns {string}
 */
INI.prototype.encodeToIni = INI.prototype.toString = function encodeIni() {
  let _INI = this;
  let sectionOut = _INI.encodeSection(null, _INI);
  Object.keys(_INI.sections).forEach(function (k, _, __) {
    if (_INI.sections) {
      sectionOut += _INI.encodeSection(k, _INI.sections[k])
    }
  });
  return sectionOut;
};

/**
 *
 * @param section
 * @param obj
 * @returns {string}
 */
INI.prototype.encodeSection = function (section, obj) {
  let out = "";
  Object.keys(obj).forEach(function (k, _, __) {
    let val = obj[k];
    if(k=="___comment")return;
    if (val && Array.isArray(val)) {
      val.forEach(function (item) {
        out += safe(k + "[]") + " = " + safe(item) + "\n"
      })
    } else if (val && typeof val === "object") {
    } else {
      out += safe(k) + " = " + safe(val) + eol
    }
  });
  if (section && out.length) {
    out = "[" + safe(section) + "]" + eol + out
  }
  if (section || obj.___comment){
    out = obj.___comment + eol + out;
  }
  return out+"\n";
};

function safe(val) {
  return (typeof val !== "string" || val.match(/[\r\n]/) || val.match(/^\[/) || (val.length > 1 && val.charAt(0) === "\"" && val.slice(-1) === "\"") || val !== val.trim()) ? JSON.stringify(val) : val.replace(/;/g, '\\;')
}

let regex = {
  section: /^\s*\[\s*([^\]]*)\s*\]\s*$/,
  param: /^\s*([\w\.\-\_\@]+)\s*=\s*(.*?)\s*$/,
  comment: /^\s*[;#].*$/
};


/**
 * @param data
 * @returns {INI}
 */
exports.parse = function (data) {
  let value = new INI();
  let lines = data.split(/\r\n|\r|\n/);
  let section = null;
  let comm = null;
  lines.forEach(function (line) {
    if (regex.comment.test(line)) {
      let match = line.match(regex.comment);
      comm = match[0];
      return;
    } else if (regex.param.test(line)) {
      let match = line.match(regex.param);
      if (section) {
        section[match[1]] = match[2];
        if(comm)section[match[1]].___comment=comm;
      } else {
        value[match[1]] = match[2];
        if(comm)value.___comment =comm;
      }
      comm = null;
    } else if (regex.section.test(line)) {
      let match = line.match(regex.section);
      section = value.getOrCreateSection(match[1]);
      if(comm)section.___comment=comm;
      comm = null;
    } else if (line.length == 0 && section) {
      section = null;
      comm = null;
    }
  });
  return value;
};

/**
 * 创建INI
 * @type {Function}
 */
exports.createINI = exports.create = function () {
  return new INI();
};

let fs = require('fs');

exports.loadFileSync =function(fileName/*,charset*/){
  return exports.parse(fs.readFileSync(fileName, "utf-8")) ;
};
