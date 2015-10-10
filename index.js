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
	paths = paths ? Array.isArray(paths) ? path : [path] : [__dirname.replace(/([\/\\])[^\/\\]*$/, '$1')];
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