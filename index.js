/*
 * Copyright (C) 2015-2016 xuld<xuld@vip.qq.com>
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

var Module = module.constructor;
if (!Module._resolveLookupPaths) {
	throw new Error("'require-global' is not supported for current Nodejs version: " + process.version);
}

var globalNodeModules = require('path').resolve(process.execPath, '../node_modules');

// 参考：
// https://github.com/nodejs/node/blob/master/lib/module.js

// 插入函数。
if (!Module._globalSearchPaths) {

	Module._globalSearchPaths = [];

	var oldResolveLookupPaths = Module._resolveLookupPaths;
	Module._resolveLookupPaths = function (request, parent) {
		var result = oldResolveLookupPaths.apply(this, arguments);

		// 如果请求的模块是全局模块，则追加全局搜索路径。
		if (!/^[\.\\\/]/.test(request) && request.indexOf(':') <= 0 && request.indexOf('//') <= 0) {
			for (var i = 0; i < Module._globalSearchPaths.length; i++) {
				var p = Module._globalSearchPaths[i];
				if (result[1].indexOf(p) < 0) result[1].push(p);
			}

			if (result[1].indexOf(globalNodeModules) < 0) result[1].push(globalNodeModules);
		}

		return result;
	};
}

/**
 * 手动追加搜索的全局路径。
 * @param {string|string[]} paths 设置 require 搜索的路径。默认为 require-global 模块本身所在路径。
 * @example 
 * requireGlobal("D:\\Node\\node_modules") // 支持令 require 加载指定目录下的模块。
 */
module.exports = function (paths) {
	if (typeof paths === "string") {
		Module._globalSearchPaths.push(paths);
	} else {
		Module._globalSearchPaths.push.apply(Module._globalSearchPaths, paths);
	}
};
