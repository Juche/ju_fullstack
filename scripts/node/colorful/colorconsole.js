#!/bin/bash

class Clog {
  constructor() {
    this.fgcolors = {
      black: 30,
      red: 31,
      green: 32,
      yellow: 33,
      blue: 34,
      magenta: 35,
      cyan: 36,
      white: 37,
    }
    this.bgcolors = {
      black: 40,
      red: 41,
      green: 42,
      yellow: 43,
      blue: 44,
      magenta: 45,
      cyan: 46,
      white: 47,
    }
    this.effects = {
      bold: 1,
      underline: 4,
      blink: 5,
      reverse: 7,
      hide: 8,
    }
  }

  is_colornum(color) {
    if (((color = parseInt(color)), !isNaN(color))) {
      if (color >= 0 && color <= 255) {
        return true
      }
    }
    return false
  }
  convert_to_colornum(color) {
    if (((color = parseInt(color)), !isNaN(color))) {
      if (color >= 0 && color <= 255) {
        return color
      } else {
        return Math.abs(color) % 256
      }
    }
    return false
  }
  colortext(text, color, bgcolor, effect) {
    if (!text) return text

    var vals = []
    if (color) {
      if (color in this.fgcolors) {
        vals.push(this.fgcolors[color])
      } else {
        color = convert_to_colornum(color)
        if (color !== false) {
          vals.push('38;5;' + color)
        }
      }
    }
    if (bgcolor) {
      if (bgcolor in this.bgcolors) {
        vals.push(this.bgcolors[bgcolor])
      } else {
        bgcolor = convert_to_colornum(bgcolor)
        if (color !== false) {
          vals.push('48;5;' + bgcolor)
        }
      }
    }
    if (effect && effect in this.effects) {
      vals.push(this.effects[effect])
    }
    if (vals.length) {
      var prefix = '\u001b['
      var reset = prefix + '0m'
      text = prefix + vals.join(';') + 'm' + text + reset
    }
    return text
  }
  colorlog(text, color, bgcolor, effect) {
    var text = colortext(text, color, bgcolor, effect)
    var args = [].slice.call(arguments, 4)
    // args.unshift(text)
    args.push(text)
    return console.log.apply(null, args)
  }
  colorplate() {
    function fixwstr(num) {
      num = num + ''
      len = num.length
      if (len == 1) {
        num = '  ' + num
      }
      if (len == 2) {
        num = ' ' + num
      }
      return ' ' + num + ' '
    }

    for (var i = 0; i < 16; i++) {
      var line = ''
      for (var j = 0; j < 16; j++) {
        var color = 16 * i + j
        line += colortext(fixwstr(color), color)
      }
      console.log(line)
    }

    for (var i = 0; i < 16; i++) {
      var line = ''
      for (var j = 0; j < 16; j++) {
        var color = 16 * i + j
        line += colortext(fixwstr(color), 'white', color)
      }
      console.log(line)
    }
  }
  // return {
  //   text: colortext,
  //   log: colorlog,
  //   plate: colorplate,
  // };
}

const clog = new Clog()

clog.colorplate()

// clog.log('hello world!', 'red', null, 'bold');

// clog.log('hello world!', 'green', null, 'underline');

// clog.log('hello world!', 'blue', null, 'blink');

// clog.log('hello world!', 'magenta', null, 'hide');

// clog.log('hello world!', 'yellow', null, 'reverse');

// clog.log('hello world!', 'magenta', 'cyan');

// clog.log('hello world!', 228, null, 'blink');

// clog.log('hello world!', 9, 228, 'blink');

// clog.log('hello world!', null, null, 'reverse');

// clog.log('hello world!', 300, 600);

// clog.log('hello world!', 100);

// clog.log('hello world!', null, 100);

// clog.log('hello world!', 200, 300, 'blink', "I'm %s!", 'ken');

// console.log(clog.text('hello world!', 100, null, 'bold'), "I'm ken!");
