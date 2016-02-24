/*
 * Copyright (C) 2015 xuld<xuld@vip.qq.com>
 *
 * Permission is hereby granted, free of charge, to any person 
 * obtaining a copy of this software and associated documentation 
 * files (the "Software"), to deal in the Software without restriction, 
 * including without limitation the rights to use, copy, modify, merge, 
 * publish, distribute, sublicense, and/or sell copies of the Software, 
 * and to permit persons to whom the Software is furnished to do so, 
 * subject to the following conditions:
 *　
 * The above copyright notice and this permission notice shall be 
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
 * IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY 
 * CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, 
 * TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
 *
 */

// 参考：
// https://github.com/nodejs/node/blob/master/lib/module.js

/**
 * 使 NodeJs 能 require 载入全局安装的模块。
 * @param {String/Array} ... 设置 require 搜索的路径。默认为 require-global 模块本身所在路径。
 * @example 
 * requireGlobal() // 支持令 require 直接加载 require-global 模块本身所在路径。
 * requireGlobal("D:\\Node\\node_modules") // 支持令 require 加载指定目录下的模块。
 */
function requireGlobal() {
    var Module = module.constructor;
    if (!Module._resolveLookupPaths) {
        console.warn("requireGlobal is currently not supported for Nodejs " + process.version);
        return;
    }

    if (!requireGlobal.paths) {
        requireGlobal.paths = [];

        try {
            requireGlobal.paths.push(require('path').resolve(require('which').sync("npm"), '../node_modules'));
        } catch (e) {
            
        }

        try {
            requireGlobal.paths.push(require('path').resolve(process.execPath, '../node_modules'));
        } catch (e) {

        }

        Module.__resolveLookupPaths = Module._resolveLookupPaths;
        Module._resolveLookupPaths = function (request, parent) {
            var result = Module.__resolveLookupPaths(request, parent);
            /^\.[\.\\]/.test(request) || result[1].push.apply(result[1], requireGlobal.paths);
            return result;
        };
    }
    
    requireGlobal.paths.push.apply(requireGlobal.paths, arguments);

    for (var i = requireGlobal.paths.length - 1; i > 0; i--) {
        for (var j = i - 1; j >= 0; j--) {
            if (requireGlobal.paths[j] == requireGlobal.paths[i]) {
                requireGlobal.paths.splice(i, 1);
                break;
            }
        }
    }

}

module.exports = requireGlobal;