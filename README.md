Require-global
===================================

Allow node.js to load global modules from custom paths

	> npm install -g require-global

## Examples

### Load modules from the path where require-global locates.

	require('require-global')()

### Load modules from custom path.

	require('require-global')("D:\mywork\node_modules")

--------------------------------------------

令 NodeJs 支持从自定义路径加载模块。

	> npm install -g require-global

## 示例

### 让 Node 能从 require-global 所在目录加载其它模块。

	require('require-global')()

### 让 Node 能从自定义目录加载其它模块。

	require('require-global')("D:\mywork\node_modules")
