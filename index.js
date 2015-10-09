// Allow NodeJs to load modules from custom directories.

// ʹ NodeJs ֧�ִ�ָ��·������ȫ��ģ�顣
// Ĭ��֧�ִ� Node ��������·���� node_modules ����ģ�顣

// �ο���
// https://github.com/nodejs/node/blob/master/lib/module.js

function globalShim(paths){
	paths = paths || [process.execPath.replace(/([\/\\])[^\/\\]*$/, '$1node_modules')];
	var Module = module.constructor;
	if(!Module._resolveLookupPaths){
		throw new Error("globalShim is currently not supported for Nodejs " + process.version);
	}
	Module.__resolveLookupPaths = Module._resolveLookupPaths;
	Module._resolveLookupPaths = function(request, parent){
		var result = Module.__resolveLookupPaths(request, parent);
		var start = request.substring(0, 2);
		if (start !== './' && start !== '..') {
			result[1].push.apply(result[1], paths);
		}
		return result;
	};
}

module.exports = globalShim;