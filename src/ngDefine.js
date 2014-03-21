/**
 *  ngDefine - Easy way to get AngularJs & RequireJs work together.
 *
 * See https://github.com/somaxj/ng-define for details.
 *
 * @version 0.1
 * @author Somax Ma <http://github.com/somax>
 *
 * @license (c) 2014 Somax Ma, MIT
 */
(function (window) {

	define([ 'angular'], function (angular) {

		var exports = function (moduleName, requires, callback) {

			define(requires, function () {

				var dependencieModules = Array.prototype.slice.call(arguments, 0);

				var ngDependencies = [];

				angular.forEach(dependencieModules, function (_module) {
					if (_module && _module.hasOwnProperty('ngName')) {
						ngDependencies.push(_module.ngName);
					}
				});

				var module, exists;

				try {
					angular.module(moduleName);
					exists = true;
				} catch (e) {
					exists = false;
				}

				if (ngDependencies.length || !exists) {
					module = angular.module(moduleName, ngDependencies);
				} else {
					module = angular.module(moduleName);
				}

				callback(module);

				return {ngName: moduleName, ngModule: module}
			});
		};


		if (typeof window !== undefined && !window.ngDefine) {
			window.ngDefine = exports;
		}


	})
})(window);