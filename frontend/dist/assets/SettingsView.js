import { af as inject, bC as getCurrentInstance, am as watch, aM as onBeforeUnmount, e as cB, g as cM, i as c, aa as createInjectionKey, j as defineComponent, u as useConfig, k as useTheme, r as ref, o as h, bD as formLight, a8 as provide, ao as keysOf, m as computed, aK as formatLength, aR as get, bE as commonVariables, f as cE, a9 as toRef, ai as createId, bF as formItemInjectionKey, bG as onMounted, n as useThemeClass, b1 as Transition, s as resolveWrappedSlot, w as createKey, aX as warn, c as commonLight, bH as commonVars, d as changeColor, ac as iconSwitchTransition, az as cNotM, a6 as useFormItem, a7 as useMergedState, bI as isSlotEmpty, aQ as pxfy, aJ as depx, aj as NIconSwitchTransition, aS as NBaseLoading, ab as call, O as useSettings, y as openBlock, B as createBlock, C as withCtx, D as createVNode, G as unref, Y as NInputNumber, R as NInput, J as NCard, _ as _export_sfc, V as NSelect, P as useMessage, a4 as NButton, U as createTextVNode, bJ as defaultSettings, a1 as serverUrl } from "./index.js";
import { N as NTabPane, a as NTabs } from "./Tabs.js";
function useInjectionInstanceCollection(injectionName, collectionKey, registerKeyRef) {
  var _a;
  const injection = inject(injectionName, null);
  if (injection === null)
    return;
  const vm = (_a = getCurrentInstance()) === null || _a === void 0 ? void 0 : _a.proxy;
  watch(registerKeyRef, registerInstance);
  registerInstance(registerKeyRef.value);
  onBeforeUnmount(() => {
    registerInstance(void 0, registerKeyRef.value);
  });
  function registerInstance(key, oldKey) {
    const collection = injection[collectionKey];
    if (oldKey !== void 0)
      removeInstance(collection, oldKey);
    if (key !== void 0)
      addInstance(collection, key);
  }
  function removeInstance(collection, key) {
    if (!collection[key])
      collection[key] = [];
    collection[key].splice(collection[key].findIndex((instance) => instance === vm), 1);
  }
  function addInstance(collection, key) {
    if (!collection[key])
      collection[key] = [];
    if (!~collection[key].findIndex((instance) => instance === vm)) {
      collection[key].push(vm);
    }
  }
}
const style$2 = cB("form", [cM("inline", `
 width: 100%;
 display: inline-flex;
 align-items: flex-start;
 align-content: space-around;
 `, [cB("form-item", {
  width: "auto",
  marginRight: "18px"
}, [c("&:last-child", {
  marginRight: 0
})])])]);
const formInjectionKey = createInjectionKey("n-form");
const formItemInstsInjectionKey = createInjectionKey("n-form-item-insts");
var __awaiter$1 = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const formProps = Object.assign(Object.assign({}, useTheme.props), { inline: Boolean, labelWidth: [Number, String], labelAlign: String, labelPlacement: {
  type: String,
  default: "top"
}, model: {
  type: Object,
  default: () => {
  }
}, rules: Object, disabled: Boolean, size: String, showRequireMark: {
  type: Boolean,
  default: void 0
}, requireMarkPlacement: String, showFeedback: {
  type: Boolean,
  default: true
}, onSubmit: {
  type: Function,
  default: (e) => e.preventDefault()
}, showLabel: {
  type: Boolean,
  default: void 0
}, validateMessages: Object });
const NForm = defineComponent({
  name: "Form",
  props: formProps,
  setup(props) {
    const { mergedClsPrefixRef } = useConfig(props);
    useTheme("Form", "-form", style$2, formLight, props, mergedClsPrefixRef);
    const formItems = {};
    const maxChildLabelWidthRef = ref(void 0);
    const deriveMaxChildLabelWidth = (currentWidth) => {
      const currentMaxChildLabelWidth = maxChildLabelWidthRef.value;
      if (currentMaxChildLabelWidth === void 0 || currentWidth >= currentMaxChildLabelWidth) {
        maxChildLabelWidthRef.value = currentWidth;
      }
    };
    function validate(validateCallback, shouldRuleBeApplied = () => true) {
      return __awaiter$1(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
          const formItemValidationPromises = [];
          for (const key of keysOf(formItems)) {
            const formItemInstances = formItems[key];
            for (const formItemInstance of formItemInstances) {
              if (formItemInstance.path) {
                formItemValidationPromises.push(formItemInstance.internalValidate(null, shouldRuleBeApplied));
              }
            }
          }
          void Promise.all(formItemValidationPromises).then((results) => {
            if (results.some((result) => !result.valid)) {
              const errors = results.filter((result) => result.errors).map((result) => result.errors);
              if (validateCallback) {
                validateCallback(errors);
              }
              reject(errors);
            } else {
              if (validateCallback)
                validateCallback();
              resolve();
            }
          });
        });
      });
    }
    function restoreValidation() {
      for (const key of keysOf(formItems)) {
        const formItemInstances = formItems[key];
        for (const formItemInstance of formItemInstances) {
          formItemInstance.restoreValidation();
        }
      }
    }
    provide(formInjectionKey, {
      props,
      maxChildLabelWidthRef,
      deriveMaxChildLabelWidth
    });
    provide(formItemInstsInjectionKey, { formItems });
    const formExposedMethod = {
      validate,
      restoreValidation
    };
    return Object.assign(formExposedMethod, {
      mergedClsPrefix: mergedClsPrefixRef
    });
  },
  render() {
    const { mergedClsPrefix } = this;
    return h("form", { class: [
      `${mergedClsPrefix}-form`,
      this.inline && `${mergedClsPrefix}-form--inline`
    ], onSubmit: this.onSubmit }, this.$slots);
  }
});
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
var formatRegExp = /%[sdj%]/g;
var warning = function warning2() {
};
if (typeof process !== "undefined" && process.env && false) {
  warning = function warning3(type4, errors) {
    if (typeof console !== "undefined" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING === "undefined") {
      if (errors.every(function(e) {
        return typeof e === "string";
      })) {
        console.warn(type4, errors);
      }
    }
  };
}
function convertFieldsError(errors) {
  if (!errors || !errors.length)
    return null;
  var fields = {};
  errors.forEach(function(error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}
function format(template) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var i = 0;
  var len = args.length;
  if (typeof template === "function") {
    return template.apply(null, args);
  }
  if (typeof template === "string") {
    var str = template.replace(formatRegExp, function(x) {
      if (x === "%%") {
        return "%";
      }
      if (i >= len) {
        return x;
      }
      switch (x) {
        case "%s":
          return String(args[i++]);
        case "%d":
          return Number(args[i++]);
        case "%j":
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return "[Circular]";
          }
          break;
        default:
          return x;
      }
    });
    return str;
  }
  return template;
}
function isNativeStringType(type4) {
  return type4 === "string" || type4 === "url" || type4 === "hex" || type4 === "email" || type4 === "date" || type4 === "pattern";
}
function isEmptyValue(value, type4) {
  if (value === void 0 || value === null) {
    return true;
  }
  if (type4 === "array" && Array.isArray(value) && !value.length) {
    return true;
  }
  if (isNativeStringType(type4) && typeof value === "string" && !value) {
    return true;
  }
  return false;
}
function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;
  function count(errors) {
    results.push.apply(results, errors || []);
    total++;
    if (total === arrLength) {
      callback(results);
    }
  }
  arr.forEach(function(a) {
    func(a, count);
  });
}
function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;
  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    var original = index;
    index = index + 1;
    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }
  next([]);
}
function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function(k) {
    ret.push.apply(ret, objArr[k] || []);
  });
  return ret;
}
var AsyncValidationError = /* @__PURE__ */ function(_Error) {
  _inheritsLoose(AsyncValidationError2, _Error);
  function AsyncValidationError2(errors, fields) {
    var _this;
    _this = _Error.call(this, "Async Validation Error") || this;
    _this.errors = errors;
    _this.fields = fields;
    return _this;
  }
  return AsyncValidationError2;
}(/* @__PURE__ */ _wrapNativeSuper(Error));
function asyncMap(objArr, option, func, callback, source) {
  if (option.first) {
    var _pending = new Promise(function(resolve, reject) {
      var next = function next2(errors) {
        callback(errors);
        return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve(source);
      };
      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });
    _pending["catch"](function(e) {
      return e;
    });
    return _pending;
  }
  var firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || [];
  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function(resolve, reject) {
    var next = function next2(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === objArrLength) {
        callback(results);
        return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve(source);
      }
    };
    if (!objArrKeys.length) {
      callback(results);
      resolve(source);
    }
    objArrKeys.forEach(function(key) {
      var arr = objArr[key];
      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function(e) {
    return e;
  });
  return pending;
}
function isErrorObj(obj) {
  return !!(obj && obj.message !== void 0);
}
function getValue(value, path) {
  var v = value;
  for (var i = 0; i < path.length; i++) {
    if (v == void 0) {
      return v;
    }
    v = v[path[i]];
  }
  return v;
}
function complementError(rule, source) {
  return function(oe) {
    var fieldValue;
    if (rule.fullFields) {
      fieldValue = getValue(source, rule.fullFields);
    } else {
      fieldValue = source[oe.field || rule.fullField];
    }
    if (isErrorObj(oe)) {
      oe.field = oe.field || rule.fullField;
      oe.fieldValue = fieldValue;
      return oe;
    }
    return {
      message: typeof oe === "function" ? oe() : oe,
      fieldValue,
      field: oe.field || rule.fullField
    };
  };
}
function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];
        if (typeof value === "object" && typeof target[s] === "object") {
          target[s] = _extends({}, target[s], value);
        } else {
          target[s] = value;
        }
      }
    }
  }
  return target;
}
var required$1 = function required(rule, value, source, errors, options, type4) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type4 || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
};
var whitespace = function whitespace2(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === "") {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
};
var urlReg;
var getUrlRegex = function() {
  if (urlReg) {
    return urlReg;
  }
  var word = "[a-fA-F\\d:]";
  var b = function b2(options) {
    return options && options.includeBoundaries ? "(?:(?<=\\s|^)(?=" + word + ")|(?<=" + word + ")(?=\\s|$))" : "";
  };
  var v4 = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
  var v6seg = "[a-fA-F\\d]{1,4}";
  var v6 = ("\n(?:\n(?:" + v6seg + ":){7}(?:" + v6seg + "|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:" + v6seg + ":){6}(?:" + v4 + "|:" + v6seg + "|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:" + v6seg + ":){5}(?::" + v4 + "|(?::" + v6seg + "){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:" + v6seg + ":){4}(?:(?::" + v6seg + "){0,1}:" + v4 + "|(?::" + v6seg + "){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:" + v6seg + ":){3}(?:(?::" + v6seg + "){0,2}:" + v4 + "|(?::" + v6seg + "){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:" + v6seg + ":){2}(?:(?::" + v6seg + "){0,3}:" + v4 + "|(?::" + v6seg + "){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:" + v6seg + ":){1}(?:(?::" + v6seg + "){0,4}:" + v4 + "|(?::" + v6seg + "){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::(?:(?::" + v6seg + "){0,5}:" + v4 + "|(?::" + v6seg + "){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1\n").replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim();
  var v46Exact = new RegExp("(?:^" + v4 + "$)|(?:^" + v6 + "$)");
  var v4exact = new RegExp("^" + v4 + "$");
  var v6exact = new RegExp("^" + v6 + "$");
  var ip = function ip2(options) {
    return options && options.exact ? v46Exact : new RegExp("(?:" + b(options) + v4 + b(options) + ")|(?:" + b(options) + v6 + b(options) + ")", "g");
  };
  ip.v4 = function(options) {
    return options && options.exact ? v4exact : new RegExp("" + b(options) + v4 + b(options), "g");
  };
  ip.v6 = function(options) {
    return options && options.exact ? v6exact : new RegExp("" + b(options) + v6 + b(options), "g");
  };
  var protocol = "(?:(?:[a-z]+:)?//)";
  var auth = "(?:\\S+(?::\\S*)?@)?";
  var ipv4 = ip.v4().source;
  var ipv6 = ip.v6().source;
  var host = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)";
  var domain = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*";
  var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";
  var port = "(?::\\d{2,5})?";
  var path = '(?:[/?#][^\\s"]*)?';
  var regex = "(?:" + protocol + "|www\\.)" + auth + "(?:localhost|" + ipv4 + "|" + ipv6 + "|" + host + domain + tld + ")" + port + path;
  urlReg = new RegExp("(?:^" + regex + "$)", "i");
  return urlReg;
};
var pattern$2 = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function" && !isNaN(value.getTime());
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === "number";
  },
  object: function object(value) {
    return typeof value === "object" && !types.array(value);
  },
  method: function method(value) {
    return typeof value === "function";
  },
  email: function email(value) {
    return typeof value === "string" && value.length <= 320 && !!value.match(pattern$2.email);
  },
  url: function url(value) {
    return typeof value === "string" && value.length <= 2048 && !!value.match(getUrlRegex());
  },
  hex: function hex(value) {
    return typeof value === "string" && !!value.match(pattern$2.hex);
  }
};
var type$1 = function type(rule, value, source, errors, options) {
  if (rule.required && value === void 0) {
    required$1(rule, value, source, errors, options);
    return;
  }
  var custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
  var ruleType = rule.type;
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
};
var range = function range2(rule, value, source, errors, options) {
  var len = typeof rule.len === "number";
  var min = typeof rule.min === "number";
  var max = typeof rule.max === "number";
  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === "number";
  var str = typeof value === "string";
  var arr = Array.isArray(value);
  if (num) {
    key = "number";
  } else if (str) {
    key = "string";
  } else if (arr) {
    key = "array";
  }
  if (!key) {
    return false;
  }
  if (arr) {
    val = value.length;
  }
  if (str) {
    val = value.replace(spRegexp, "_").length;
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
};
var ENUM$1 = "enum";
var enumerable$1 = function enumerable(rule, value, source, errors, options) {
  rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : [];
  if (rule[ENUM$1].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(", ")));
  }
};
var pattern$1 = function pattern(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === "string") {
      var _pattern = new RegExp(rule.pattern);
      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
};
var rules = {
  required: required$1,
  whitespace,
  type: type$1,
  range,
  "enum": enumerable$1,
  pattern: pattern$1
};
var string = function string2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, "string");
    if (!isEmptyValue(value, "string")) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);
      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }
  callback(errors);
};
var method2 = function method3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var number2 = function number3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (value === "") {
      value = void 0;
    }
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var _boolean = function _boolean2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var regexp2 = function regexp3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var integer2 = function integer3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var floatFn = function floatFn2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var array2 = function array3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if ((value === void 0 || value === null) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, "array");
    if (value !== void 0 && value !== null) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var object2 = function object3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var ENUM = "enum";
var enumerable2 = function enumerable3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules[ENUM](rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var pattern2 = function pattern3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value, "string")) {
      rules.pattern(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var date2 = function date3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "date") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value, "date")) {
      var dateObject;
      if (value instanceof Date) {
        dateObject = value;
      } else {
        dateObject = new Date(value);
      }
      rules.type(rule, dateObject, source, errors, options);
      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }
  callback(errors);
};
var required2 = function required3(rule, value, callback, source, options) {
  var errors = [];
  var type4 = Array.isArray(value) ? "array" : typeof value;
  rules.required(rule, value, source, errors, options, type4);
  callback(errors);
};
var type2 = function type3(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, ruleType);
    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var any = function any2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
  }
  callback(errors);
};
var validators = {
  string,
  method: method2,
  number: number2,
  "boolean": _boolean,
  regexp: regexp2,
  integer: integer2,
  "float": floatFn,
  array: array2,
  object: object2,
  "enum": enumerable2,
  pattern: pattern2,
  date: date2,
  url: type2,
  hex: type2,
  email: type2,
  required: required2,
  any
};
function newMessages() {
  return {
    "default": "Validation error on field %s",
    required: "%s is required",
    "enum": "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      "boolean": "%s is not a %s",
      integer: "%s is not an %s",
      "float": "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}
var messages = newMessages();
var Schema = /* @__PURE__ */ function() {
  function Schema2(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }
  var _proto = Schema2.prototype;
  _proto.define = function define(rules2) {
    var _this = this;
    if (!rules2) {
      throw new Error("Cannot configure a schema with no rules");
    }
    if (typeof rules2 !== "object" || Array.isArray(rules2)) {
      throw new Error("Rules must be an object");
    }
    this.rules = {};
    Object.keys(rules2).forEach(function(name) {
      var item = rules2[name];
      _this.rules[name] = Array.isArray(item) ? item : [item];
    });
  };
  _proto.messages = function messages2(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }
    return this._messages;
  };
  _proto.validate = function validate(source_, o, oc) {
    var _this2 = this;
    if (o === void 0) {
      o = {};
    }
    if (oc === void 0) {
      oc = function oc2() {
      };
    }
    var source = source_;
    var options = o;
    var callback = oc;
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback(null, source);
      }
      return Promise.resolve(source);
    }
    function complete(results) {
      var errors = [];
      var fields = {};
      function add(e) {
        if (Array.isArray(e)) {
          var _errors;
          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }
      for (var i = 0; i < results.length; i++) {
        add(results[i]);
      }
      if (!errors.length) {
        callback(null, source);
      } else {
        fields = convertFieldsError(errors);
        callback(errors, fields);
      }
    }
    if (options.messages) {
      var messages$1 = this.messages();
      if (messages$1 === messages) {
        messages$1 = newMessages();
      }
      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function(z) {
      var arr = _this2.rules[z];
      var value = source[z];
      arr.forEach(function(r) {
        var rule = r;
        if (typeof rule.transform === "function") {
          if (source === source_) {
            source = _extends({}, source);
          }
          value = source[z] = rule.transform(value);
        }
        if (typeof rule === "function") {
          rule = {
            validator: rule
          };
        } else {
          rule = _extends({}, rule);
        }
        rule.validator = _this2.getValidationMethod(rule);
        if (!rule.validator) {
          return;
        }
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this2.getType(rule);
        series[z] = series[z] || [];
        series[z].push({
          rule,
          value,
          source,
          field: z
        });
      });
    });
    var errorFields = {};
    return asyncMap(series, options, function(data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;
      function addFullField(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key,
          fullFields: rule.fullFields ? [].concat(rule.fullFields, [key]) : [key]
        });
      }
      function cb(e) {
        if (e === void 0) {
          e = [];
        }
        var errorList = Array.isArray(e) ? e : [e];
        if (!options.suppressWarning && errorList.length) {
          Schema2.warning("async-validator:", errorList);
        }
        if (errorList.length && rule.message !== void 0) {
          errorList = [].concat(rule.message);
        }
        var filledErrors = errorList.map(complementError(rule, source));
        if (options.first && filledErrors.length) {
          errorFields[rule.field] = 1;
          return doIt(filledErrors);
        }
        if (!deep) {
          doIt(filledErrors);
        } else {
          if (rule.required && !data.value) {
            if (rule.message !== void 0) {
              filledErrors = [].concat(rule.message).map(complementError(rule, source));
            } else if (options.error) {
              filledErrors = [options.error(rule, format(options.messages.required, rule.field))];
            }
            return doIt(filledErrors);
          }
          var fieldsSchema = {};
          if (rule.defaultField) {
            Object.keys(data.value).map(function(key) {
              fieldsSchema[key] = rule.defaultField;
            });
          }
          fieldsSchema = _extends({}, fieldsSchema, data.rule.fields);
          var paredFieldsSchema = {};
          Object.keys(fieldsSchema).forEach(function(field) {
            var fieldSchema = fieldsSchema[field];
            var fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema];
            paredFieldsSchema[field] = fieldSchemaList.map(addFullField.bind(null, field));
          });
          var schema = new Schema2(paredFieldsSchema);
          schema.messages(options.messages);
          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }
          schema.validate(data.value, data.rule.options || options, function(errs) {
            var finalErrors = [];
            if (filledErrors && filledErrors.length) {
              finalErrors.push.apply(finalErrors, filledErrors);
            }
            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }
            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }
      var res;
      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        try {
          res = rule.validator(rule, data.value, cb, data.source, options);
        } catch (error) {
          console.error == null ? void 0 : console.error(error);
          if (!options.suppressValidatorError) {
            setTimeout(function() {
              throw error;
            }, 0);
          }
          cb(error.message);
        }
        if (res === true) {
          cb();
        } else if (res === false) {
          cb(typeof rule.message === "function" ? rule.message(rule.fullField || rule.field) : rule.message || (rule.fullField || rule.field) + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }
      if (res && res.then) {
        res.then(function() {
          return cb();
        }, function(e) {
          return cb(e);
        });
      }
    }, function(results) {
      complete(results);
    }, source);
  };
  _proto.getType = function getType(rule) {
    if (rule.type === void 0 && rule.pattern instanceof RegExp) {
      rule.type = "pattern";
    }
    if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format("Unknown rule type %s", rule.type));
    }
    return rule.type || "string";
  };
  _proto.getValidationMethod = function getValidationMethod(rule) {
    if (typeof rule.validator === "function") {
      return rule.validator;
    }
    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf("message");
    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }
    if (keys.length === 1 && keys[0] === "required") {
      return validators.required;
    }
    return validators[this.getType(rule)] || void 0;
  };
  return Schema2;
}();
Schema.register = function register(type4, validator) {
  if (typeof validator !== "function") {
    throw new Error("Cannot register a validator by type, validator is not a function");
  }
  validators[type4] = validator;
};
Schema.warning = warning;
Schema.messages = messages;
Schema.validators = validators;
function formItemSize(props) {
  const NForm2 = inject(formInjectionKey, null);
  return {
    mergedSize: computed(() => {
      if (props.size !== void 0)
        return props.size;
      if ((NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.size) !== void 0)
        return NForm2.props.size;
      return "medium";
    })
  };
}
function formItemMisc(props) {
  const NForm2 = inject(formInjectionKey, null);
  const mergedLabelPlacementRef = computed(() => {
    const { labelPlacement } = props;
    if (labelPlacement !== void 0)
      return labelPlacement;
    if (NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.labelPlacement)
      return NForm2.props.labelPlacement;
    return "top";
  });
  const isAutoLabelWidthRef = computed(() => {
    return mergedLabelPlacementRef.value === "left" && (props.labelWidth === "auto" || (NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.labelWidth) === "auto");
  });
  const mergedLabelWidthRef = computed(() => {
    if (mergedLabelPlacementRef.value === "top")
      return;
    const { labelWidth } = props;
    if (labelWidth !== void 0 && labelWidth !== "auto") {
      return formatLength(labelWidth);
    }
    if (isAutoLabelWidthRef.value) {
      const autoComputedWidth = NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.maxChildLabelWidthRef.value;
      if (autoComputedWidth !== void 0) {
        return formatLength(autoComputedWidth);
      } else {
        return void 0;
      }
    }
    if ((NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.labelWidth) !== void 0) {
      return formatLength(NForm2.props.labelWidth);
    }
    return void 0;
  });
  const mergedLabelAlignRef = computed(() => {
    const { labelAlign } = props;
    if (labelAlign)
      return labelAlign;
    if (NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.labelAlign)
      return NForm2.props.labelAlign;
    return void 0;
  });
  const mergedLabelStyleRef = computed(() => {
    var _a;
    return [
      (_a = props.labelProps) === null || _a === void 0 ? void 0 : _a.style,
      props.labelStyle,
      {
        width: mergedLabelWidthRef.value
      }
    ];
  });
  const mergedShowRequireMarkRef = computed(() => {
    const { showRequireMark } = props;
    if (showRequireMark !== void 0)
      return showRequireMark;
    return NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.showRequireMark;
  });
  const mergedRequireMarkPlacementRef = computed(() => {
    const { requireMarkPlacement } = props;
    if (requireMarkPlacement !== void 0)
      return requireMarkPlacement;
    return (NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.requireMarkPlacement) || "right";
  });
  const validationErroredRef = ref(false);
  const mergedValidationStatusRef = computed(() => {
    const { validationStatus } = props;
    if (validationStatus !== void 0)
      return validationStatus;
    if (validationErroredRef.value)
      return "error";
    return void 0;
  });
  const mergedShowFeedbackRef = computed(() => {
    const { showFeedback } = props;
    if (showFeedback !== void 0)
      return showFeedback;
    if ((NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.showFeedback) !== void 0)
      return NForm2.props.showFeedback;
    return true;
  });
  const mergedShowLabelRef = computed(() => {
    const { showLabel } = props;
    if (showLabel !== void 0)
      return showLabel;
    if ((NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props.showLabel) !== void 0)
      return NForm2.props.showLabel;
    return true;
  });
  return {
    validationErrored: validationErroredRef,
    mergedLabelStyle: mergedLabelStyleRef,
    mergedLabelPlacement: mergedLabelPlacementRef,
    mergedLabelAlign: mergedLabelAlignRef,
    mergedShowRequireMark: mergedShowRequireMarkRef,
    mergedRequireMarkPlacement: mergedRequireMarkPlacementRef,
    mergedValidationStatus: mergedValidationStatusRef,
    mergedShowFeedback: mergedShowFeedbackRef,
    mergedShowLabel: mergedShowLabelRef,
    isAutoLabelWidth: isAutoLabelWidthRef
  };
}
function formItemRule(props) {
  const NForm2 = inject(formInjectionKey, null);
  const compatibleRulePathRef = computed(() => {
    const { rulePath } = props;
    if (rulePath !== void 0)
      return rulePath;
    const { path } = props;
    if (path !== void 0)
      return path;
    return void 0;
  });
  const mergedRulesRef = computed(() => {
    const rules2 = [];
    const { rule } = props;
    if (rule !== void 0) {
      if (Array.isArray(rule))
        rules2.push(...rule);
      else
        rules2.push(rule);
    }
    if (NForm2) {
      const { rules: formRules } = NForm2.props;
      const { value: rulePath } = compatibleRulePathRef;
      if (formRules !== void 0 && rulePath !== void 0) {
        const formRule = get(formRules, rulePath);
        if (formRule !== void 0) {
          if (Array.isArray(formRule)) {
            rules2.push(...formRule);
          } else {
            rules2.push(formRule);
          }
        }
      }
    }
    return rules2;
  });
  const hasRequiredRuleRef = computed(() => {
    return mergedRulesRef.value.some((rule) => rule.required);
  });
  const mergedRequiredRef = computed(() => {
    return hasRequiredRuleRef.value || props.required;
  });
  return {
    mergedRules: mergedRulesRef,
    mergedRequired: mergedRequiredRef
  };
}
const {
  cubicBezierEaseInOut
} = commonVariables;
function fadeDownTransition({
  name = "fade-down",
  fromOffset = "-4px",
  enterDuration = ".3s",
  leaveDuration = ".3s",
  enterCubicBezier = cubicBezierEaseInOut,
  leaveCubicBezier = cubicBezierEaseInOut
} = {}) {
  return [c(`&.${name}-transition-enter-from, &.${name}-transition-leave-to`, {
    opacity: 0,
    transform: `translateY(${fromOffset})`
  }), c(`&.${name}-transition-enter-to, &.${name}-transition-leave-from`, {
    opacity: 1,
    transform: "translateY(0)"
  }), c(`&.${name}-transition-leave-active`, {
    transition: `opacity ${leaveDuration} ${leaveCubicBezier}, transform ${leaveDuration} ${leaveCubicBezier}`
  }), c(`&.${name}-transition-enter-active`, {
    transition: `opacity ${enterDuration} ${enterCubicBezier}, transform ${enterDuration} ${enterCubicBezier}`
  })];
}
const style$1 = cB("form-item", `
 display: grid;
 line-height: var(--n-line-height);
`, [cB("form-item-label", `
 grid-area: label;
 align-items: center;
 line-height: 1.25;
 text-align: var(--n-label-text-align);
 font-size: var(--n-label-font-size);
 min-height: var(--n-label-height);
 padding: var(--n-label-padding);
 color: var(--n-label-text-color);
 transition: color .3s var(--n-bezier);
 box-sizing: border-box;
 font-weight: var(--n-label-font-weight);
 `, [cE("asterisk", `
 white-space: nowrap;
 user-select: none;
 -webkit-user-select: none;
 color: var(--n-asterisk-color);
 transition: color .3s var(--n-bezier);
 `), cE("asterisk-placeholder", `
 grid-area: mark;
 user-select: none;
 -webkit-user-select: none;
 visibility: hidden; 
 `)]), cB("form-item-blank", `
 grid-area: blank;
 min-height: var(--n-blank-height);
 `), cM("auto-label-width", [cB("form-item-label", "white-space: nowrap;")]), cM("left-labelled", `
 grid-template-areas:
 "label blank"
 "label feedback";
 grid-template-columns: auto minmax(0, 1fr);
 grid-template-rows: auto 1fr;
 align-items: start;
 `, [cB("form-item-label", `
 display: grid;
 grid-template-columns: 1fr auto;
 min-height: var(--n-blank-height);
 height: auto;
 box-sizing: border-box;
 flex-shrink: 0;
 flex-grow: 0;
 `, [cM("reverse-columns-space", `
 grid-template-columns: auto 1fr;
 `), cM("left-mark", `
 grid-template-areas:
 "mark text"
 ". text";
 `), cM("right-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), cM("right-hanging-mark", `
 grid-template-areas: 
 "text mark"
 "text .";
 `), cE("text", `
 grid-area: text; 
 `), cE("asterisk", `
 grid-area: mark; 
 align-self: end;
 `)])]), cM("top-labelled", `
 grid-template-areas:
 "label"
 "blank"
 "feedback";
 grid-template-rows: minmax(var(--n-label-height), auto) 1fr;
 grid-template-columns: minmax(0, 100%);
 `, [cM("no-label", `
 grid-template-areas:
 "blank"
 "feedback";
 grid-template-rows: 1fr;
 `), cB("form-item-label", `
 display: flex;
 align-items: flex-start;
 justify-content: var(--n-label-text-align);
 `)]), cB("form-item-blank", `
 box-sizing: border-box;
 display: flex;
 align-items: center;
 position: relative;
 `), cB("form-item-feedback-wrapper", `
 grid-area: feedback;
 box-sizing: border-box;
 min-height: var(--n-feedback-height);
 font-size: var(--n-feedback-font-size);
 line-height: 1.25;
 transform-origin: top left;
 `, [c("&:not(:empty)", `
 padding: var(--n-feedback-padding);
 `), cB("form-item-feedback", {
  transition: "color .3s var(--n-bezier)",
  color: "var(--n-feedback-text-color)"
}, [cM("warning", {
  color: "var(--n-feedback-text-color-warning)"
}), cM("error", {
  color: "var(--n-feedback-text-color-error)"
}), fadeDownTransition({
  fromOffset: "-3px",
  enterDuration: ".3s",
  leaveDuration: ".2s"
})])])]);
var __awaiter = globalThis && globalThis.__awaiter || function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const formItemProps = Object.assign(Object.assign({}, useTheme.props), { label: String, labelWidth: [Number, String], labelStyle: [String, Object], labelAlign: String, labelPlacement: String, path: String, first: Boolean, rulePath: String, required: Boolean, showRequireMark: {
  type: Boolean,
  default: void 0
}, requireMarkPlacement: String, showFeedback: {
  type: Boolean,
  default: void 0
}, rule: [Object, Array], size: String, ignorePathChange: Boolean, validationStatus: String, feedback: String, showLabel: {
  type: Boolean,
  default: void 0
}, labelProps: Object });
function wrapValidator(validator, async) {
  return (...args) => {
    try {
      const validateResult = validator(...args);
      if (!async && (typeof validateResult === "boolean" || validateResult instanceof Error || Array.isArray(validateResult)) || // Error[]
      (validateResult === null || validateResult === void 0 ? void 0 : validateResult.then)) {
        return validateResult;
      } else if (validateResult === void 0) {
        return true;
      } else {
        warn("form-item/validate", `You return a ${typeof validateResult} typed value in the validator method, which is not recommended. Please use ` + (async ? "`Promise`" : "`boolean`, `Error` or `Promise`") + " typed value instead.");
        return true;
      }
    } catch (err) {
      warn("form-item/validate", "An error is catched in the validation, so the validation won't be done. Your callback in `validate` method of `n-form` or `n-form-item` won't be called in this validation.");
      console.error(err);
      return void 0;
    }
  };
}
const NFormItem = defineComponent({
  name: "FormItem",
  props: formItemProps,
  setup(props) {
    useInjectionInstanceCollection(formItemInstsInjectionKey, "formItems", toRef(props, "path"));
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
    const NForm2 = inject(formInjectionKey, null);
    const formItemSizeRefs = formItemSize(props);
    const formItemMiscRefs = formItemMisc(props);
    const { validationErrored: validationErroredRef } = formItemMiscRefs;
    const { mergedRequired: mergedRequiredRef, mergedRules: mergedRulesRef } = formItemRule(props);
    const { mergedSize: mergedSizeRef } = formItemSizeRefs;
    const { mergedLabelPlacement: labelPlacementRef, mergedLabelAlign: labelTextAlignRef, mergedRequireMarkPlacement: mergedRequireMarkPlacementRef } = formItemMiscRefs;
    const renderExplainsRef = ref([]);
    const feedbackIdRef = ref(createId());
    const mergedDisabledRef = NForm2 ? toRef(NForm2.props, "disabled") : ref(false);
    const themeRef = useTheme("Form", "-form-item", style$1, formLight, props, mergedClsPrefixRef);
    watch(toRef(props, "path"), () => {
      if (props.ignorePathChange)
        return;
      restoreValidation();
    });
    function restoreValidation() {
      renderExplainsRef.value = [];
      validationErroredRef.value = false;
      if (props.feedback) {
        feedbackIdRef.value = createId();
      }
    }
    function handleContentBlur() {
      void internalValidate("blur");
    }
    function handleContentChange() {
      void internalValidate("change");
    }
    function handleContentFocus() {
      void internalValidate("focus");
    }
    function handleContentInput() {
      void internalValidate("input");
    }
    function validate(options, callback) {
      return __awaiter(this, void 0, void 0, function* () {
        let trigger;
        let validateCallback;
        let shouldRuleBeApplied;
        let asyncValidatorOptions;
        if (typeof options === "string") {
          trigger = options;
          validateCallback = callback;
        } else if (options !== null && typeof options === "object") {
          trigger = options.trigger;
          validateCallback = options.callback;
          shouldRuleBeApplied = options.shouldRuleBeApplied;
          asyncValidatorOptions = options.options;
        }
        return yield new Promise((resolve, reject) => {
          void internalValidate(trigger, shouldRuleBeApplied, asyncValidatorOptions).then(({ valid, errors }) => {
            if (valid) {
              if (validateCallback) {
                validateCallback();
              }
              resolve();
            } else {
              if (validateCallback) {
                validateCallback(errors);
              }
              reject(errors);
            }
          });
        });
      });
    }
    const internalValidate = (trigger = null, shouldRuleBeApplied = () => true, options = {
      suppressWarning: true
    }) => __awaiter(this, void 0, void 0, function* () {
      const { path } = props;
      if (!options) {
        options = {};
      } else {
        if (!options.first)
          options.first = props.first;
      }
      const { value: rules2 } = mergedRulesRef;
      const value = NForm2 ? get(NForm2.props.model, path || "") : void 0;
      const messageRenderers = {};
      const originalMessageRendersMessage = {};
      const activeRules = (!trigger ? rules2 : rules2.filter((rule) => {
        if (Array.isArray(rule.trigger)) {
          return rule.trigger.includes(trigger);
        } else {
          return rule.trigger === trigger;
        }
      })).filter(shouldRuleBeApplied).map((rule, i) => {
        const shallowClonedRule = Object.assign({}, rule);
        if (shallowClonedRule.validator) {
          shallowClonedRule.validator = wrapValidator(shallowClonedRule.validator, false);
        }
        if (shallowClonedRule.asyncValidator) {
          shallowClonedRule.asyncValidator = wrapValidator(shallowClonedRule.asyncValidator, true);
        }
        if (shallowClonedRule.renderMessage) {
          const rendererKey = `__renderMessage__${i}`;
          originalMessageRendersMessage[rendererKey] = shallowClonedRule.message;
          shallowClonedRule.message = rendererKey;
          messageRenderers[rendererKey] = shallowClonedRule.renderMessage;
        }
        return shallowClonedRule;
      });
      if (!activeRules.length) {
        return {
          valid: true
        };
      }
      const mergedPath = path !== null && path !== void 0 ? path : "__n_no_path__";
      const validator = new Schema({ [mergedPath]: activeRules });
      const { validateMessages } = (NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.props) || {};
      if (validateMessages) {
        validator.messages(validateMessages);
      }
      return yield new Promise((resolve) => {
        void validator.validate({ [mergedPath]: value }, options, (errors) => {
          if (errors === null || errors === void 0 ? void 0 : errors.length) {
            renderExplainsRef.value = errors.map((error) => {
              const transformedMessage = (error === null || error === void 0 ? void 0 : error.message) || "";
              return {
                key: transformedMessage,
                render: () => {
                  if (transformedMessage.startsWith("__renderMessage__")) {
                    return messageRenderers[transformedMessage]();
                  }
                  return transformedMessage;
                }
              };
            });
            errors.forEach((error) => {
              var _a;
              if ((_a = error.message) === null || _a === void 0 ? void 0 : _a.startsWith("__renderMessage__")) {
                error.message = originalMessageRendersMessage[error.message];
              }
            });
            validationErroredRef.value = true;
            resolve({
              valid: false,
              errors
            });
          } else {
            restoreValidation();
            resolve({
              valid: true
            });
          }
        });
      });
    });
    provide(formItemInjectionKey, {
      path: toRef(props, "path"),
      disabled: mergedDisabledRef,
      mergedSize: formItemSizeRefs.mergedSize,
      mergedValidationStatus: formItemMiscRefs.mergedValidationStatus,
      restoreValidation,
      handleContentBlur,
      handleContentChange,
      handleContentFocus,
      handleContentInput
    });
    const exposedRef = {
      validate,
      restoreValidation,
      internalValidate
    };
    const labelElementRef = ref(null);
    onMounted(() => {
      if (!formItemMiscRefs.isAutoLabelWidth.value)
        return;
      const labelElement = labelElementRef.value;
      if (labelElement !== null) {
        const memoizedWhitespace = labelElement.style.whiteSpace;
        labelElement.style.whiteSpace = "nowrap";
        labelElement.style.width = "";
        NForm2 === null || NForm2 === void 0 ? void 0 : NForm2.deriveMaxChildLabelWidth(Number(getComputedStyle(labelElement).width.slice(0, -2)));
        labelElement.style.whiteSpace = memoizedWhitespace;
      }
    });
    const cssVarsRef = computed(() => {
      var _a;
      const { value: size } = mergedSizeRef;
      const { value: labelPlacement } = labelPlacementRef;
      const direction = labelPlacement === "top" ? "vertical" : "horizontal";
      const { common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 }, self: { labelTextColor, asteriskColor, lineHeight, feedbackTextColor, feedbackTextColorWarning, feedbackTextColorError, feedbackPadding, labelFontWeight, [createKey("labelHeight", size)]: labelHeight, [createKey("blankHeight", size)]: blankHeight, [createKey("feedbackFontSize", size)]: feedbackFontSize, [createKey("feedbackHeight", size)]: feedbackHeight, [createKey("labelPadding", direction)]: labelPadding, [createKey("labelTextAlign", direction)]: labelTextAlign, [createKey(createKey("labelFontSize", labelPlacement), size)]: labelFontSize } } = themeRef.value;
      let mergedLabelTextAlign = (_a = labelTextAlignRef.value) !== null && _a !== void 0 ? _a : labelTextAlign;
      if (labelPlacement === "top") {
        mergedLabelTextAlign = mergedLabelTextAlign === "right" ? "flex-end" : "flex-start";
      }
      const cssVars = {
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-line-height": lineHeight,
        "--n-blank-height": blankHeight,
        "--n-label-font-size": labelFontSize,
        "--n-label-text-align": mergedLabelTextAlign,
        "--n-label-height": labelHeight,
        "--n-label-padding": labelPadding,
        "--n-label-font-weight": labelFontWeight,
        "--n-asterisk-color": asteriskColor,
        "--n-label-text-color": labelTextColor,
        "--n-feedback-padding": feedbackPadding,
        "--n-feedback-font-size": feedbackFontSize,
        "--n-feedback-height": feedbackHeight,
        "--n-feedback-text-color": feedbackTextColor,
        "--n-feedback-text-color-warning": feedbackTextColorWarning,
        "--n-feedback-text-color-error": feedbackTextColorError
      };
      return cssVars;
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("form-item", computed(() => {
      var _a;
      return `${mergedSizeRef.value[0]}${labelPlacementRef.value[0]}${((_a = labelTextAlignRef.value) === null || _a === void 0 ? void 0 : _a[0]) || ""}`;
    }), cssVarsRef, props) : void 0;
    const reverseColSpaceRef = computed(() => {
      return labelPlacementRef.value === "left" && mergedRequireMarkPlacementRef.value === "left" && labelTextAlignRef.value === "left";
    });
    return Object.assign(Object.assign(Object.assign(Object.assign({ labelElementRef, mergedClsPrefix: mergedClsPrefixRef, mergedRequired: mergedRequiredRef, feedbackId: feedbackIdRef, renderExplains: renderExplainsRef, reverseColSpace: reverseColSpaceRef }, formItemMiscRefs), formItemSizeRefs), exposedRef), { cssVars: inlineThemeDisabled ? void 0 : cssVarsRef, themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass, onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender });
  },
  render() {
    const { $slots, mergedClsPrefix, mergedShowLabel, mergedShowRequireMark, mergedRequireMarkPlacement, onRender } = this;
    const renderedShowRequireMark = mergedShowRequireMark !== void 0 ? mergedShowRequireMark : this.mergedRequired;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    const renderLabel = () => {
      const labelText = this.$slots.label ? this.$slots.label() : this.label;
      if (!labelText)
        return null;
      const textNode = h("span", { class: `${mergedClsPrefix}-form-item-label__text` }, labelText);
      const markNode = renderedShowRequireMark ? h("span", { class: `${mergedClsPrefix}-form-item-label__asterisk` }, mergedRequireMarkPlacement !== "left" ? " *" : "* ") : mergedRequireMarkPlacement === "right-hanging" && h("span", { class: `${mergedClsPrefix}-form-item-label__asterisk-placeholder` }, " *");
      const { labelProps } = this;
      return h("label", Object.assign({}, labelProps, { class: [
        labelProps === null || labelProps === void 0 ? void 0 : labelProps.class,
        `${mergedClsPrefix}-form-item-label`,
        `${mergedClsPrefix}-form-item-label--${mergedRequireMarkPlacement}-mark`,
        this.reverseColSpace && `${mergedClsPrefix}-form-item-label--reverse-columns-space`
      ], style: this.mergedLabelStyle, ref: "labelElementRef" }), mergedRequireMarkPlacement === "left" ? [markNode, textNode] : [textNode, markNode]);
    };
    return h(
      "div",
      { class: [
        `${mergedClsPrefix}-form-item`,
        this.themeClass,
        `${mergedClsPrefix}-form-item--${this.mergedSize}-size`,
        `${mergedClsPrefix}-form-item--${this.mergedLabelPlacement}-labelled`,
        this.isAutoLabelWidth && `${mergedClsPrefix}-form-item--auto-label-width`,
        !mergedShowLabel && `${mergedClsPrefix}-form-item--no-label`
      ], style: this.cssVars },
      mergedShowLabel && renderLabel(),
      h("div", { class: [
        `${mergedClsPrefix}-form-item-blank`,
        this.mergedValidationStatus && `${mergedClsPrefix}-form-item-blank--${this.mergedValidationStatus}`
      ] }, $slots),
      this.mergedShowFeedback ? h(
        "div",
        { key: this.feedbackId, class: `${mergedClsPrefix}-form-item-feedback-wrapper` },
        h(Transition, { name: "fade-down-transition", mode: "out-in" }, {
          default: () => {
            const { mergedValidationStatus } = this;
            return resolveWrappedSlot($slots.feedback, (children) => {
              var _a;
              const { feedback } = this;
              const feedbackNodes = children || feedback ? h("div", { key: "__feedback__", class: `${mergedClsPrefix}-form-item-feedback__line` }, children || feedback) : this.renderExplains.length ? (_a = this.renderExplains) === null || _a === void 0 ? void 0 : _a.map(({ key, render }) => h("div", { key, class: `${mergedClsPrefix}-form-item-feedback__line` }, render())) : null;
              return feedbackNodes ? mergedValidationStatus === "warning" ? h("div", { key: "controlled-warning", class: `${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--warning` }, feedbackNodes) : mergedValidationStatus === "error" ? h("div", { key: "controlled-error", class: `${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--error` }, feedbackNodes) : mergedValidationStatus === "success" ? h("div", { key: "controlled-success", class: `${mergedClsPrefix}-form-item-feedback ${mergedClsPrefix}-form-item-feedback--success` }, feedbackNodes) : h("div", { key: "controlled-default", class: `${mergedClsPrefix}-form-item-feedback` }, feedbackNodes) : null;
            });
          }
        })
      ) : null
    );
  }
});
const self = (vars) => {
  const { primaryColor, opacityDisabled, borderRadius, textColor3 } = vars;
  const railOverlayColor = "rgba(0, 0, 0, .14)";
  return Object.assign(Object.assign({}, commonVars), { iconColor: textColor3, textColor: "white", loadingColor: primaryColor, opacityDisabled, railColor: railOverlayColor, railColorActive: primaryColor, buttonBoxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.3), inset 0 0 1px 0 rgba(0, 0, 0, 0.05)", buttonColor: "#FFF", railBorderRadiusSmall: borderRadius, railBorderRadiusMedium: borderRadius, railBorderRadiusLarge: borderRadius, buttonBorderRadiusSmall: borderRadius, buttonBorderRadiusMedium: borderRadius, buttonBorderRadiusLarge: borderRadius, boxShadowFocus: `0 0 0 2px ${changeColor(primaryColor, { alpha: 0.2 })}` });
};
const switchLight = {
  name: "Switch",
  common: commonLight,
  self
};
const switchLight$1 = switchLight;
const style = cB("switch", `
 height: var(--n-height);
 min-width: var(--n-width);
 vertical-align: middle;
 user-select: none;
 -webkit-user-select: none;
 display: inline-flex;
 outline: none;
 justify-content: center;
 align-items: center;
`, [cE("children-placeholder", `
 height: var(--n-rail-height);
 display: flex;
 flex-direction: column;
 overflow: hidden;
 pointer-events: none;
 visibility: hidden;
 `), cE("rail-placeholder", `
 display: flex;
 flex-wrap: none;
 `), cE("button-placeholder", `
 width: calc(1.75 * var(--n-rail-height));
 height: var(--n-rail-height);
 `), cB("base-loading", `
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 font-size: calc(var(--n-button-width) - 4px);
 color: var(--n-loading-color);
 transition: color .3s var(--n-bezier);
 `, [iconSwitchTransition({
  left: "50%",
  top: "50%",
  originalTransform: "translateX(-50%) translateY(-50%)"
})]), cE("checked, unchecked", `
 transition: color .3s var(--n-bezier);
 color: var(--n-text-color);
 box-sizing: border-box;
 position: absolute;
 white-space: nowrap;
 top: 0;
 bottom: 0;
 display: flex;
 align-items: center;
 line-height: 1;
 `), cE("checked", `
 right: 0;
 padding-right: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `), cE("unchecked", `
 left: 0;
 justify-content: flex-end;
 padding-left: calc(1.25 * var(--n-rail-height) - var(--n-offset));
 `), c("&:focus", [cE("rail", `
 box-shadow: var(--n-box-shadow-focus);
 `)]), cM("round", [cE("rail", "border-radius: calc(var(--n-rail-height) / 2);", [cE("button", "border-radius: calc(var(--n-button-height) / 2);")])]), cNotM("disabled", [cNotM("icon", [cM("rubber-band", [cM("pressed", [cE("rail", [cE("button", "max-width: var(--n-button-width-pressed);")])]), cE("rail", [c("&:active", [cE("button", "max-width: var(--n-button-width-pressed);")])]), cM("active", [cM("pressed", [cE("rail", [cE("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])]), cE("rail", [c("&:active", [cE("button", "left: calc(100% - var(--n-offset) - var(--n-button-width-pressed));")])])])])])]), cM("active", [cE("rail", [cE("button", "left: calc(100% - var(--n-button-width) - var(--n-offset))")])]), cE("rail", `
 overflow: hidden;
 height: var(--n-rail-height);
 min-width: var(--n-rail-width);
 border-radius: var(--n-rail-border-radius);
 cursor: pointer;
 position: relative;
 transition:
 opacity .3s var(--n-bezier),
 background .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 background-color: var(--n-rail-color);
 `, [cE("button-icon", `
 color: var(--n-icon-color);
 transition: color .3s var(--n-bezier);
 font-size: calc(var(--n-button-height) - 4px);
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 line-height: 1;
 `, [iconSwitchTransition()]), cE("button", `
 align-items: center; 
 top: var(--n-offset);
 left: var(--n-offset);
 height: var(--n-button-height);
 width: var(--n-button-width-pressed);
 max-width: var(--n-button-width);
 border-radius: var(--n-button-border-radius);
 background-color: var(--n-button-color);
 box-shadow: var(--n-button-box-shadow);
 box-sizing: border-box;
 cursor: inherit;
 content: "";
 position: absolute;
 transition:
 background-color .3s var(--n-bezier),
 left .3s var(--n-bezier),
 opacity .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
 `)]), cM("active", [cE("rail", "background-color: var(--n-rail-color-active);")]), cM("loading", [cE("rail", `
 cursor: wait;
 `)]), cM("disabled", [cE("rail", `
 cursor: not-allowed;
 opacity: .5;
 `)])]);
const switchProps = Object.assign(Object.assign({}, useTheme.props), {
  size: {
    type: String,
    default: "medium"
  },
  value: {
    type: [String, Number, Boolean],
    default: void 0
  },
  loading: Boolean,
  defaultValue: {
    type: [String, Number, Boolean],
    default: false
  },
  disabled: {
    type: Boolean,
    default: void 0
  },
  round: {
    type: Boolean,
    default: true
  },
  "onUpdate:value": [Function, Array],
  onUpdateValue: [Function, Array],
  checkedValue: {
    type: [String, Number, Boolean],
    default: true
  },
  uncheckedValue: {
    type: [String, Number, Boolean],
    default: false
  },
  railStyle: Function,
  rubberBand: {
    type: Boolean,
    default: true
  },
  /** @deprecated */
  onChange: [Function, Array]
});
let supportCssMax;
const NSwitch = defineComponent({
  name: "Switch",
  props: switchProps,
  setup(props) {
    if (supportCssMax === void 0) {
      if (typeof CSS !== "undefined") {
        if (typeof CSS.supports !== "undefined") {
          supportCssMax = CSS.supports("width", "max(1px)");
        } else {
          supportCssMax = false;
        }
      } else {
        supportCssMax = true;
      }
    }
    const { mergedClsPrefixRef, inlineThemeDisabled } = useConfig(props);
    const themeRef = useTheme("Switch", "-switch", style, switchLight$1, props, mergedClsPrefixRef);
    const formItem = useFormItem(props);
    const { mergedSizeRef, mergedDisabledRef } = formItem;
    const uncontrolledValueRef = ref(props.defaultValue);
    const controlledValueRef = toRef(props, "value");
    const mergedValueRef = useMergedState(controlledValueRef, uncontrolledValueRef);
    const checkedRef = computed(() => {
      return mergedValueRef.value === props.checkedValue;
    });
    const pressedRef = ref(false);
    const focusedRef = ref(false);
    const mergedRailStyleRef = computed(() => {
      const { railStyle } = props;
      if (!railStyle)
        return void 0;
      return railStyle({ focused: focusedRef.value, checked: checkedRef.value });
    });
    function doUpdateValue(value) {
      const { "onUpdate:value": _onUpdateValue, onChange, onUpdateValue } = props;
      const { nTriggerFormInput, nTriggerFormChange } = formItem;
      if (_onUpdateValue)
        call(_onUpdateValue, value);
      if (onUpdateValue)
        call(onUpdateValue, value);
      if (onChange)
        call(onChange, value);
      uncontrolledValueRef.value = value;
      nTriggerFormInput();
      nTriggerFormChange();
    }
    function doFocus() {
      const { nTriggerFormFocus } = formItem;
      nTriggerFormFocus();
    }
    function doBlur() {
      const { nTriggerFormBlur } = formItem;
      nTriggerFormBlur();
    }
    function handleClick() {
      if (props.loading || mergedDisabledRef.value)
        return;
      if (mergedValueRef.value !== props.checkedValue) {
        doUpdateValue(props.checkedValue);
      } else {
        doUpdateValue(props.uncheckedValue);
      }
    }
    function handleFocus() {
      focusedRef.value = true;
      doFocus();
    }
    function handleBlur() {
      focusedRef.value = false;
      doBlur();
      pressedRef.value = false;
    }
    function handleKeyup(e) {
      if (props.loading || mergedDisabledRef.value)
        return;
      if (e.key === " ") {
        if (mergedValueRef.value !== props.checkedValue) {
          doUpdateValue(props.checkedValue);
        } else {
          doUpdateValue(props.uncheckedValue);
        }
        pressedRef.value = false;
      }
    }
    function handleKeydown(e) {
      if (props.loading || mergedDisabledRef.value)
        return;
      if (e.key === " ") {
        e.preventDefault();
        pressedRef.value = true;
      }
    }
    const cssVarsRef = computed(() => {
      const { value: size } = mergedSizeRef;
      const { self: { opacityDisabled, railColor, railColorActive, buttonBoxShadow, buttonColor, boxShadowFocus, loadingColor, textColor, iconColor, [createKey("buttonHeight", size)]: buttonHeight, [createKey("buttonWidth", size)]: buttonWidth, [createKey("buttonWidthPressed", size)]: buttonWidthPressed, [createKey("railHeight", size)]: railHeight, [createKey("railWidth", size)]: railWidth, [createKey("railBorderRadius", size)]: railBorderRadius, [createKey("buttonBorderRadius", size)]: buttonBorderRadius }, common: { cubicBezierEaseInOut: cubicBezierEaseInOut2 } } = themeRef.value;
      let offset;
      let height;
      let width;
      if (supportCssMax) {
        offset = `calc((${railHeight} - ${buttonHeight}) / 2)`;
        height = `max(${railHeight}, ${buttonHeight})`;
        width = `max(${railWidth}, calc(${railWidth} + ${buttonHeight} - ${railHeight}))`;
      } else {
        offset = pxfy((depx(railHeight) - depx(buttonHeight)) / 2);
        height = pxfy(Math.max(depx(railHeight), depx(buttonHeight)));
        width = depx(railHeight) > depx(buttonHeight) ? railWidth : pxfy(depx(railWidth) + depx(buttonHeight) - depx(railHeight));
      }
      return {
        "--n-bezier": cubicBezierEaseInOut2,
        "--n-button-border-radius": buttonBorderRadius,
        "--n-button-box-shadow": buttonBoxShadow,
        "--n-button-color": buttonColor,
        "--n-button-width": buttonWidth,
        "--n-button-width-pressed": buttonWidthPressed,
        "--n-button-height": buttonHeight,
        "--n-height": height,
        "--n-offset": offset,
        "--n-opacity-disabled": opacityDisabled,
        "--n-rail-border-radius": railBorderRadius,
        "--n-rail-color": railColor,
        "--n-rail-color-active": railColorActive,
        "--n-rail-height": railHeight,
        "--n-rail-width": railWidth,
        "--n-width": width,
        "--n-box-shadow-focus": boxShadowFocus,
        "--n-loading-color": loadingColor,
        "--n-text-color": textColor,
        "--n-icon-color": iconColor
      };
    });
    const themeClassHandle = inlineThemeDisabled ? useThemeClass("switch", computed(() => {
      return mergedSizeRef.value[0];
    }), cssVarsRef, props) : void 0;
    return {
      handleClick,
      handleBlur,
      handleFocus,
      handleKeyup,
      handleKeydown,
      mergedRailStyle: mergedRailStyleRef,
      pressed: pressedRef,
      mergedClsPrefix: mergedClsPrefixRef,
      mergedValue: mergedValueRef,
      checked: checkedRef,
      mergedDisabled: mergedDisabledRef,
      cssVars: inlineThemeDisabled ? void 0 : cssVarsRef,
      themeClass: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.themeClass,
      onRender: themeClassHandle === null || themeClassHandle === void 0 ? void 0 : themeClassHandle.onRender
    };
  },
  render() {
    const { mergedClsPrefix, mergedDisabled, checked, mergedRailStyle, onRender, $slots } = this;
    onRender === null || onRender === void 0 ? void 0 : onRender();
    const { checked: checkedSlot, unchecked: uncheckedSlot, icon: iconSlot, "checked-icon": checkedIconSlot, "unchecked-icon": uncheckedIconSlot } = $slots;
    const hasIcon = !(isSlotEmpty(iconSlot) && isSlotEmpty(checkedIconSlot) && isSlotEmpty(uncheckedIconSlot));
    return h(
      "div",
      { role: "switch", "aria-checked": checked, class: [
        `${mergedClsPrefix}-switch`,
        this.themeClass,
        hasIcon && `${mergedClsPrefix}-switch--icon`,
        checked && `${mergedClsPrefix}-switch--active`,
        mergedDisabled && `${mergedClsPrefix}-switch--disabled`,
        this.round && `${mergedClsPrefix}-switch--round`,
        this.loading && `${mergedClsPrefix}-switch--loading`,
        this.pressed && `${mergedClsPrefix}-switch--pressed`,
        this.rubberBand && `${mergedClsPrefix}-switch--rubber-band`
      ], tabindex: !this.mergedDisabled ? 0 : void 0, style: this.cssVars, onClick: this.handleClick, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyup: this.handleKeyup, onKeydown: this.handleKeydown },
      h(
        "div",
        { class: `${mergedClsPrefix}-switch__rail`, "aria-hidden": "true", style: mergedRailStyle },
        resolveWrappedSlot(checkedSlot, (checkedSlotChildren) => resolveWrappedSlot(uncheckedSlot, (uncheckedSlotChildren) => {
          if (checkedSlotChildren || uncheckedSlotChildren) {
            return h(
              "div",
              { "aria-hidden": true, class: `${mergedClsPrefix}-switch__children-placeholder` },
              h(
                "div",
                { class: `${mergedClsPrefix}-switch__rail-placeholder` },
                h("div", { class: `${mergedClsPrefix}-switch__button-placeholder` }),
                checkedSlotChildren
              ),
              h(
                "div",
                { class: `${mergedClsPrefix}-switch__rail-placeholder` },
                h("div", { class: `${mergedClsPrefix}-switch__button-placeholder` }),
                uncheckedSlotChildren
              )
            );
          }
          return null;
        })),
        h(
          "div",
          { class: `${mergedClsPrefix}-switch__button` },
          resolveWrappedSlot(iconSlot, (icon) => resolveWrappedSlot(checkedIconSlot, (checkedIcon) => resolveWrappedSlot(uncheckedIconSlot, (uncheckedIcon) => {
            return h(NIconSwitchTransition, null, {
              default: () => this.loading ? h(NBaseLoading, { key: "loading", clsPrefix: mergedClsPrefix, strokeWidth: 20 }) : this.checked && (checkedIcon || icon) ? h("div", { class: `${mergedClsPrefix}-switch__button-icon`, key: checkedIcon ? "checked-icon" : "icon" }, checkedIcon || icon) : !this.checked && (uncheckedIcon || icon) ? h("div", { class: `${mergedClsPrefix}-switch__button-icon`, key: uncheckedIcon ? "unchecked-icon" : "icon" }, uncheckedIcon || icon) : null
            });
          }))),
          resolveWrappedSlot(checkedSlot, (children) => children && h("div", { key: "checked", class: `${mergedClsPrefix}-switch__checked` }, children)),
          resolveWrappedSlot(uncheckedSlot, (children) => children && h("div", { key: "unchecked", class: `${mergedClsPrefix}-switch__unchecked` }, children))
        )
      )
    );
  }
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "APISettings",
  setup(__props) {
    const settings = useSettings();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(NCard), null, {
        default: withCtx(() => [
          createVNode(unref(NForm), null, {
            default: withCtx(() => [
              createVNode(unref(NFormItem), { label: "WebSocket Performance Monitor Interval" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.api.websocketPerfInterval,
                    "onUpdate:value": _cache[0] || (_cache[0] = ($event) => unref(settings).defaultSettings.api.websocketPerfInterval = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "WebSocket Sync Interval" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.api.websocketSyncInterval,
                    "onUpdate:value": _cache[1] || (_cache[1] = ($event) => unref(settings).defaultSettings.api.websocketSyncInterval = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Cache Directory" }, {
                default: withCtx(() => [
                  createVNode(unref(NInput), {
                    value: unref(settings).defaultSettings.api.cache_dir,
                    "onUpdate:value": _cache[2] || (_cache[2] = ($event) => unref(settings).defaultSettings.api.cache_dir = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Low VRAM mode" }, {
                default: withCtx(() => [
                  createVNode(unref(NSwitch), {
                    value: unref(settings).defaultSettings.api.lowVRAM,
                    "onUpdate:value": _cache[3] || (_cache[3] = ($event) => unref(settings).defaultSettings.api.lowVRAM = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$7 = {};
function _sfc_render$1(_ctx, _cache) {
  return "Bot Settings";
}
const BotSettings = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$1]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ControlNetSettings",
  setup(__props) {
    const settings = useSettings();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(NCard), null, {
        default: withCtx(() => [
          createVNode(unref(NForm), null, {
            default: withCtx(() => [
              createVNode(unref(NFormItem), { label: "Prompt" }, {
                default: withCtx(() => [
                  createVNode(unref(NInput), {
                    value: unref(settings).defaultSettings.controlnet.prompt,
                    "onUpdate:value": _cache[0] || (_cache[0] = ($event) => unref(settings).defaultSettings.controlnet.prompt = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Negative Prompt" }, {
                default: withCtx(() => [
                  createVNode(unref(NInput), {
                    value: unref(settings).defaultSettings.controlnet.negativePrompt,
                    "onUpdate:value": _cache[1] || (_cache[1] = ($event) => unref(settings).defaultSettings.controlnet.negativePrompt = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Batch Count" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.controlnet.batchCount,
                    "onUpdate:value": _cache[2] || (_cache[2] = ($event) => unref(settings).defaultSettings.controlnet.batchCount = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Batch Size" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.controlnet.batchSize,
                    "onUpdate:value": _cache[3] || (_cache[3] = ($event) => unref(settings).defaultSettings.controlnet.batchSize = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "CFG Scale" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.controlnet.cfgScale,
                    "onUpdate:value": _cache[4] || (_cache[4] = ($event) => unref(settings).defaultSettings.controlnet.cfgScale = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Height" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.controlnet.height,
                    "onUpdate:value": _cache[5] || (_cache[5] = ($event) => unref(settings).defaultSettings.controlnet.height = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Width" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.controlnet.width,
                    "onUpdate:value": _cache[6] || (_cache[6] = ($event) => unref(settings).defaultSettings.controlnet.width = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Sampler" }, {
                default: withCtx(() => [
                  createVNode(unref(NSelect), {
                    options: unref(settings).scheduler_options,
                    value: unref(settings).defaultSettings.controlnet.sampler,
                    "onUpdate:value": _cache[7] || (_cache[7] = ($event) => unref(settings).defaultSettings.controlnet.sampler = $event)
                  }, null, 8, ["options", "value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "ControlNet" }, {
                default: withCtx(() => [
                  createVNode(unref(NSelect), {
                    options: unref(settings).controlnet_options,
                    value: unref(settings).defaultSettings.controlnet.controlnet,
                    "onUpdate:value": _cache[8] || (_cache[8] = ($event) => unref(settings).defaultSettings.controlnet.controlnet = $event)
                  }, null, 8, ["options", "value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Seed" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.controlnet.seed,
                    "onUpdate:value": _cache[9] || (_cache[9] = ($event) => unref(settings).defaultSettings.controlnet.seed = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Steps" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.controlnet.steps,
                    "onUpdate:value": _cache[10] || (_cache[10] = ($event) => unref(settings).defaultSettings.controlnet.steps = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "ControlNet Conditioning Scale" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.controlnet.controlnetConditioningScale,
                    "onUpdate:value": _cache[11] || (_cache[11] = ($event) => unref(settings).defaultSettings.controlnet.controlnetConditioningScale = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Detection Resolution" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.controlnet.detectionResolution,
                    "onUpdate:value": _cache[12] || (_cache[12] = ($event) => unref(settings).defaultSettings.controlnet.detectionResolution = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ImageToImageSettings",
  setup(__props) {
    const settings = useSettings();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(NCard), null, {
        default: withCtx(() => [
          createVNode(unref(NForm), null, {
            default: withCtx(() => [
              createVNode(unref(NFormItem), { label: "Prompt" }, {
                default: withCtx(() => [
                  createVNode(unref(NInput), {
                    value: unref(settings).defaultSettings.img2img.prompt,
                    "onUpdate:value": _cache[0] || (_cache[0] = ($event) => unref(settings).defaultSettings.img2img.prompt = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Negative Prompt" }, {
                default: withCtx(() => [
                  createVNode(unref(NInput), {
                    value: unref(settings).defaultSettings.img2img.negativePrompt,
                    "onUpdate:value": _cache[1] || (_cache[1] = ($event) => unref(settings).defaultSettings.img2img.negativePrompt = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Batch Count" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.img2img.batchCount,
                    "onUpdate:value": _cache[2] || (_cache[2] = ($event) => unref(settings).defaultSettings.img2img.batchCount = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Batch Size" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.img2img.batchSize,
                    "onUpdate:value": _cache[3] || (_cache[3] = ($event) => unref(settings).defaultSettings.img2img.batchSize = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "CFG Scale" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.img2img.cfgScale,
                    "onUpdate:value": _cache[4] || (_cache[4] = ($event) => unref(settings).defaultSettings.img2img.cfgScale = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Height" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.img2img.height,
                    "onUpdate:value": _cache[5] || (_cache[5] = ($event) => unref(settings).defaultSettings.img2img.height = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Width" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.img2img.width,
                    "onUpdate:value": _cache[6] || (_cache[6] = ($event) => unref(settings).defaultSettings.img2img.width = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Sampler" }, {
                default: withCtx(() => [
                  createVNode(unref(NSelect), {
                    options: unref(settings).scheduler_options,
                    value: unref(settings).defaultSettings.img2img.sampler,
                    "onUpdate:value": _cache[7] || (_cache[7] = ($event) => unref(settings).defaultSettings.img2img.sampler = $event)
                  }, null, 8, ["options", "value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Seed" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.img2img.seed,
                    "onUpdate:value": _cache[8] || (_cache[8] = ($event) => unref(settings).defaultSettings.img2img.seed = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Steps" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.img2img.steps,
                    "onUpdate:value": _cache[9] || (_cache[9] = ($event) => unref(settings).defaultSettings.img2img.steps = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Denoising Strength" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.img2img.denoisingStrength,
                    "onUpdate:value": _cache[10] || (_cache[10] = ($event) => unref(settings).defaultSettings.img2img.denoisingStrength = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "InpaintingSettings",
  setup(__props) {
    const settings = useSettings();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(NCard), null, {
        default: withCtx(() => [
          createVNode(unref(NForm), null, {
            default: withCtx(() => [
              createVNode(unref(NFormItem), { label: "Prompt" }, {
                default: withCtx(() => [
                  createVNode(unref(NInput), {
                    value: unref(settings).defaultSettings.inpainting.prompt,
                    "onUpdate:value": _cache[0] || (_cache[0] = ($event) => unref(settings).defaultSettings.inpainting.prompt = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Negative Prompt" }, {
                default: withCtx(() => [
                  createVNode(unref(NInput), {
                    value: unref(settings).defaultSettings.inpainting.negativePrompt,
                    "onUpdate:value": _cache[1] || (_cache[1] = ($event) => unref(settings).defaultSettings.inpainting.negativePrompt = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Batch Count" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.inpainting.batchCount,
                    "onUpdate:value": _cache[2] || (_cache[2] = ($event) => unref(settings).defaultSettings.inpainting.batchCount = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Batch Size" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.inpainting.batchSize,
                    "onUpdate:value": _cache[3] || (_cache[3] = ($event) => unref(settings).defaultSettings.inpainting.batchSize = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "CFG Scale" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.inpainting.cfgScale,
                    "onUpdate:value": _cache[4] || (_cache[4] = ($event) => unref(settings).defaultSettings.inpainting.cfgScale = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Height" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.inpainting.height,
                    "onUpdate:value": _cache[5] || (_cache[5] = ($event) => unref(settings).defaultSettings.inpainting.height = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Width" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.inpainting.width,
                    "onUpdate:value": _cache[6] || (_cache[6] = ($event) => unref(settings).defaultSettings.inpainting.width = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Sampler" }, {
                default: withCtx(() => [
                  createVNode(unref(NSelect), {
                    options: unref(settings).scheduler_options,
                    value: unref(settings).defaultSettings.inpainting.sampler,
                    "onUpdate:value": _cache[7] || (_cache[7] = ($event) => unref(settings).defaultSettings.inpainting.sampler = $event)
                  }, null, 8, ["options", "value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Seed" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.inpainting.seed,
                    "onUpdate:value": _cache[8] || (_cache[8] = ($event) => unref(settings).defaultSettings.inpainting.seed = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Steps" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.inpainting.steps,
                    "onUpdate:value": _cache[9] || (_cache[9] = ($event) => unref(settings).defaultSettings.inpainting.steps = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TextToImageSettings",
  setup(__props) {
    const settings = useSettings();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(NCard), null, {
        default: withCtx(() => [
          createVNode(unref(NForm), null, {
            default: withCtx(() => [
              createVNode(unref(NFormItem), { label: "Prompt" }, {
                default: withCtx(() => [
                  createVNode(unref(NInput), {
                    value: unref(settings).defaultSettings.txt2img.prompt,
                    "onUpdate:value": _cache[0] || (_cache[0] = ($event) => unref(settings).defaultSettings.txt2img.prompt = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Negative Prompt" }, {
                default: withCtx(() => [
                  createVNode(unref(NInput), {
                    value: unref(settings).defaultSettings.txt2img.negativePrompt,
                    "onUpdate:value": _cache[1] || (_cache[1] = ($event) => unref(settings).defaultSettings.txt2img.negativePrompt = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Batch Count" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.txt2img.batchCount,
                    "onUpdate:value": _cache[2] || (_cache[2] = ($event) => unref(settings).defaultSettings.txt2img.batchCount = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Batch Size" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.txt2img.batchSize,
                    "onUpdate:value": _cache[3] || (_cache[3] = ($event) => unref(settings).defaultSettings.txt2img.batchSize = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "CFG Scale" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.txt2img.cfgScale,
                    "onUpdate:value": _cache[4] || (_cache[4] = ($event) => unref(settings).defaultSettings.txt2img.cfgScale = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Height" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.txt2img.height,
                    "onUpdate:value": _cache[5] || (_cache[5] = ($event) => unref(settings).defaultSettings.txt2img.height = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Width" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.txt2img.width,
                    "onUpdate:value": _cache[6] || (_cache[6] = ($event) => unref(settings).defaultSettings.txt2img.width = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Sampler" }, {
                default: withCtx(() => [
                  createVNode(unref(NSelect), {
                    options: unref(settings).scheduler_options,
                    value: unref(settings).defaultSettings.txt2img.sampler,
                    "onUpdate:value": _cache[7] || (_cache[7] = ($event) => unref(settings).defaultSettings.txt2img.sampler = $event)
                  }, null, 8, ["options", "value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Seed" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.txt2img.seed,
                    "onUpdate:value": _cache[8] || (_cache[8] = ($event) => unref(settings).defaultSettings.txt2img.seed = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              }),
              createVNode(unref(NFormItem), { label: "Steps" }, {
                default: withCtx(() => [
                  createVNode(unref(NInputNumber), {
                    value: unref(settings).defaultSettings.txt2img.steps,
                    "onUpdate:value": _cache[9] || (_cache[9] = ($event) => unref(settings).defaultSettings.txt2img.steps = $event)
                  }, null, 8, ["value"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FrontendSettings",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(NTabs), null, {
        default: withCtx(() => [
          createVNode(unref(NTabPane), { name: "Text to Image" }, {
            default: withCtx(() => [
              createVNode(_sfc_main$3)
            ]),
            _: 1
          }),
          createVNode(unref(NTabPane), { name: "Image to Image" }, {
            default: withCtx(() => [
              createVNode(_sfc_main$5)
            ]),
            _: 1
          }),
          createVNode(unref(NTabPane), { name: "ControlNet" }, {
            default: withCtx(() => [
              createVNode(_sfc_main$6)
            ]),
            _: 1
          }),
          createVNode(unref(NTabPane), { name: "Inpainting" }, {
            default: withCtx(() => [
              createVNode(_sfc_main$4)
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
const _sfc_main$1 = {};
function _sfc_render(_ctx, _cache) {
  return "General Settings";
}
const GeneralSettings = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SettingsView",
  setup(__props) {
    const message = useMessage();
    const settings = useSettings();
    function resetSettings() {
      Object.assign(
        settings.defaultSettings,
        JSON.parse(JSON.stringify(defaultSettings))
      );
      message.warning(
        "Settings were reset to default values, please save them if you want to keep them"
      );
    }
    function saveSettings() {
      message.success("Settings Saved");
      console.log(settings.defaultSettings);
      fetch(`${serverUrl}/api/settings/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(settings.defaultSettings)
      });
    }
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(NCard), { style: { "margin": "16px" } }, {
        default: withCtx(() => [
          createVNode(unref(NTabs), null, {
            suffix: withCtx(() => [
              createVNode(unref(NButton), {
                type: "error",
                ghost: "",
                style: { "margin-right": "12px" },
                onClick: resetSettings
              }, {
                default: withCtx(() => [
                  createTextVNode("Reset Settings")
                ]),
                _: 1
              }),
              createVNode(unref(NButton), {
                type: "success",
                ghost: "",
                onClick: saveSettings
              }, {
                default: withCtx(() => [
                  createTextVNode("Save Settings")
                ]),
                _: 1
              })
            ]),
            default: withCtx(() => [
              createVNode(unref(NTabPane), { name: "Frontend" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$2)
                ]),
                _: 1
              }),
              createVNode(unref(NTabPane), { name: "API" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$8)
                ]),
                _: 1
              }),
              createVNode(unref(NTabPane), { name: "Bot" }, {
                default: withCtx(() => [
                  createVNode(BotSettings)
                ]),
                _: 1
              }),
              createVNode(unref(NTabPane), { name: "General" }, {
                default: withCtx(() => [
                  createVNode(GeneralSettings)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
});
export {
  _sfc_main as default
};