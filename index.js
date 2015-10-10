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

// Allow NodeJs to load modules from custom directories.

// 使 NodeJs 支持从指定路径载入全局模块。
// 默认支持从 Node 进程所在路径的 node_modules 加载模块。

// 参考：
// https://github.com/nodejs/node/blob/master/lib/module.js

/**
 * 启用 require 全局搜索路径。
 * @param {String/Array} [paths] 设置 require 搜索的路径。默认为 require-global 模块本身所在路径。
 * @example 
 * requireGlobal() // 支持令 require 直接加载 require-global 模块本身所在路径。
 * requireGlobal("D:\\Node\\node_modules") // 支持令 require 加载指定目录下的模块。
 */
function requireGlobal(paths){
	paths = paths ? Array.isArray(paths) ? paths : [paths] : [__dirname.replace(/([\/\\])[^\/\\]*$/, '$1')];
	var Module = module.constructor;
	if(!Module._resolveLookupPaths){
		throw new Error("requireGlobal is currently not supported for Nodejs " + process.version);
	}
	if(!requireGlobal.paths){
		requireGlobal.paths = [];
		Module.__resolveLookupPaths = Module._resolveLookupPaths;
		Module._resolveLookupPaths = function(request, parent){
			var result = Module.__resolveLookupPaths(request, parent);
			/^\.[\.\\]/.test(request) || result[1].push.apply(result[1], requireGlobal.paths);
			return result;
		};
	}
	requireGlobal.paths.push.apply(requireGlobal.paths, paths);
}

module.exports = requireGlobal;