"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/react-use";
exports.ids = ["vendor-chunks/react-use"];
exports.modules = {

/***/ "(ssr)/./node_modules/react-use/lib/useBoolean.js":
/*!**************************************************!*\
  !*** ./node_modules/react-use/lib/useBoolean.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nvar tslib_1 = __webpack_require__(/*! tslib */ \"(ssr)/./node_modules/tslib/tslib.es6.mjs\");\nvar useToggle_1 = tslib_1.__importDefault(__webpack_require__(/*! ./useToggle */ \"(ssr)/./node_modules/react-use/lib/useToggle.js\"));\nexports[\"default\"] = useToggle_1.default;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtdXNlL2xpYi91c2VCb29sZWFuLmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2JBLDhDQUE2QztJQUFFRyxPQUFPO0FBQUssQ0FBQyxFQUFDO0FBQzdELElBQUlDLFVBQVVDLG1CQUFPQSxDQUFDLHVEQUFPO0FBQzdCLElBQUlDLGNBQWNGLFFBQVFHLGVBQWUsQ0FBQ0YsbUJBQU9BLENBQUMsb0VBQWE7QUFDL0RILGtCQUFlLEdBQUdJLFlBQVlFLE9BQU8iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9lLWNvbW1lcmNlLy4vbm9kZV9tb2R1bGVzL3JlYWN0LXVzZS9saWIvdXNlQm9vbGVhbi5qcz9hMDZkIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHRzbGliXzEgPSByZXF1aXJlKFwidHNsaWJcIik7XG52YXIgdXNlVG9nZ2xlXzEgPSB0c2xpYl8xLl9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwiLi91c2VUb2dnbGVcIikpO1xuZXhwb3J0cy5kZWZhdWx0ID0gdXNlVG9nZ2xlXzEuZGVmYXVsdDtcbiJdLCJuYW1lcyI6WyJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImV4cG9ydHMiLCJ2YWx1ZSIsInRzbGliXzEiLCJyZXF1aXJlIiwidXNlVG9nZ2xlXzEiLCJfX2ltcG9ydERlZmF1bHQiLCJkZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-use/lib/useBoolean.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/react-use/lib/useInterval.js":
/*!***************************************************!*\
  !*** ./node_modules/react-use/lib/useInterval.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nvar react_1 = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\nvar useInterval = function(callback, delay) {\n    var savedCallback = react_1.useRef(function() {});\n    react_1.useEffect(function() {\n        savedCallback.current = callback;\n    });\n    react_1.useEffect(function() {\n        if (delay !== null) {\n            var interval_1 = setInterval(function() {\n                return savedCallback.current();\n            }, delay || 0);\n            return function() {\n                return clearInterval(interval_1);\n            };\n        }\n        return undefined;\n    }, [\n        delay\n    ]);\n};\nexports[\"default\"] = useInterval;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtdXNlL2xpYi91c2VJbnRlcnZhbC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiQSw4Q0FBNkM7SUFBRUcsT0FBTztBQUFLLENBQUMsRUFBQztBQUM3RCxJQUFJQyxVQUFVQyxtQkFBT0EsQ0FBQyx3R0FBTztBQUM3QixJQUFJQyxjQUFjLFNBQVVDLFFBQVEsRUFBRUMsS0FBSztJQUN2QyxJQUFJQyxnQkFBZ0JMLFFBQVFNLE1BQU0sQ0FBQyxZQUFjO0lBQ2pETixRQUFRTyxTQUFTLENBQUM7UUFDZEYsY0FBY0csT0FBTyxHQUFHTDtJQUM1QjtJQUNBSCxRQUFRTyxTQUFTLENBQUM7UUFDZCxJQUFJSCxVQUFVLE1BQU07WUFDaEIsSUFBSUssYUFBYUMsWUFBWTtnQkFBYyxPQUFPTCxjQUFjRyxPQUFPO1lBQUksR0FBR0osU0FBUztZQUN2RixPQUFPO2dCQUFjLE9BQU9PLGNBQWNGO1lBQWE7UUFDM0Q7UUFDQSxPQUFPRztJQUNYLEdBQUc7UUFBQ1I7S0FBTTtBQUNkO0FBQ0FOLGtCQUFlLEdBQUdJIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZS1jb21tZXJjZS8uL25vZGVfbW9kdWxlcy9yZWFjdC11c2UvbGliL3VzZUludGVydmFsLmpzPzVmMDMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgcmVhY3RfMSA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbnZhciB1c2VJbnRlcnZhbCA9IGZ1bmN0aW9uIChjYWxsYmFjaywgZGVsYXkpIHtcbiAgICB2YXIgc2F2ZWRDYWxsYmFjayA9IHJlYWN0XzEudXNlUmVmKGZ1bmN0aW9uICgpIHsgfSk7XG4gICAgcmVhY3RfMS51c2VFZmZlY3QoZnVuY3Rpb24gKCkge1xuICAgICAgICBzYXZlZENhbGxiYWNrLmN1cnJlbnQgPSBjYWxsYmFjaztcbiAgICB9KTtcbiAgICByZWFjdF8xLnVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChkZWxheSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGludGVydmFsXzEgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7IHJldHVybiBzYXZlZENhbGxiYWNrLmN1cnJlbnQoKTsgfSwgZGVsYXkgfHwgMCk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkgeyByZXR1cm4gY2xlYXJJbnRlcnZhbChpbnRlcnZhbF8xKTsgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0sIFtkZWxheV0pO1xufTtcbmV4cG9ydHMuZGVmYXVsdCA9IHVzZUludGVydmFsO1xuIl0sIm5hbWVzIjpbIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwiZXhwb3J0cyIsInZhbHVlIiwicmVhY3RfMSIsInJlcXVpcmUiLCJ1c2VJbnRlcnZhbCIsImNhbGxiYWNrIiwiZGVsYXkiLCJzYXZlZENhbGxiYWNrIiwidXNlUmVmIiwidXNlRWZmZWN0IiwiY3VycmVudCIsImludGVydmFsXzEiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJ1bmRlZmluZWQiLCJkZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-use/lib/useInterval.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/react-use/lib/useToggle.js":
/*!*************************************************!*\
  !*** ./node_modules/react-use/lib/useToggle.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({\n    value: true\n}));\nvar react_1 = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\nvar toggleReducer = function(state, nextValue) {\n    return typeof nextValue === \"boolean\" ? nextValue : !state;\n};\nvar useToggle = function(initialValue) {\n    return react_1.useReducer(toggleReducer, initialValue);\n};\nexports[\"default\"] = useToggle;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcmVhY3QtdXNlL2xpYi91c2VUb2dnbGUuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYkEsOENBQTZDO0lBQUVHLE9BQU87QUFBSyxDQUFDLEVBQUM7QUFDN0QsSUFBSUMsVUFBVUMsbUJBQU9BLENBQUMsd0dBQU87QUFDN0IsSUFBSUMsZ0JBQWdCLFNBQVVDLEtBQUssRUFBRUMsU0FBUztJQUMxQyxPQUFPLE9BQU9BLGNBQWMsWUFBWUEsWUFBWSxDQUFDRDtBQUN6RDtBQUNBLElBQUlFLFlBQVksU0FBVUMsWUFBWTtJQUNsQyxPQUFPTixRQUFRTyxVQUFVLENBQUNMLGVBQWVJO0FBQzdDO0FBQ0FSLGtCQUFlLEdBQUdPIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZS1jb21tZXJjZS8uL25vZGVfbW9kdWxlcy9yZWFjdC11c2UvbGliL3VzZVRvZ2dsZS5qcz9iZTU5Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xudmFyIHJlYWN0XzEgPSByZXF1aXJlKFwicmVhY3RcIik7XG52YXIgdG9nZ2xlUmVkdWNlciA9IGZ1bmN0aW9uIChzdGF0ZSwgbmV4dFZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBuZXh0VmFsdWUgPT09ICdib29sZWFuJyA/IG5leHRWYWx1ZSA6ICFzdGF0ZTtcbn07XG52YXIgdXNlVG9nZ2xlID0gZnVuY3Rpb24gKGluaXRpYWxWYWx1ZSkge1xuICAgIHJldHVybiByZWFjdF8xLnVzZVJlZHVjZXIodG9nZ2xlUmVkdWNlciwgaW5pdGlhbFZhbHVlKTtcbn07XG5leHBvcnRzLmRlZmF1bHQgPSB1c2VUb2dnbGU7XG4iXSwibmFtZXMiOlsiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJleHBvcnRzIiwidmFsdWUiLCJyZWFjdF8xIiwicmVxdWlyZSIsInRvZ2dsZVJlZHVjZXIiLCJzdGF0ZSIsIm5leHRWYWx1ZSIsInVzZVRvZ2dsZSIsImluaXRpYWxWYWx1ZSIsInVzZVJlZHVjZXIiLCJkZWZhdWx0Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/react-use/lib/useToggle.js\n");

/***/ })

};
;