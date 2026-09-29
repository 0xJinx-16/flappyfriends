"use client";
"use client";
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e) {
    throw err = [e], e;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// node_modules/abitype/dist/esm/version.js
var version;
var init_version = __esm({
  "node_modules/abitype/dist/esm/version.js"() {
    version = "1.2.3";
  }
});

// node_modules/abitype/dist/esm/errors.js
var BaseError;
var init_errors = __esm({
  "node_modules/abitype/dist/esm/errors.js"() {
    init_version();
    BaseError = class _BaseError extends Error {
      constructor(shortMessage, args = {}) {
        const details = args.cause instanceof _BaseError ? args.cause.details : args.cause?.message ? args.cause.message : args.details;
        const docsPath8 = args.cause instanceof _BaseError ? args.cause.docsPath || args.docsPath : args.docsPath;
        const message = [
          shortMessage || "An error occurred.",
          "",
          ...args.metaMessages ? [...args.metaMessages, ""] : [],
          ...docsPath8 ? [`Docs: https://abitype.dev${docsPath8}`] : [],
          ...details ? [`Details: ${details}`] : [],
          `Version: abitype@${version}`
        ].join("\n");
        super(message);
        Object.defineProperty(this, "details", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "docsPath", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "metaMessages", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "shortMessage", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "AbiTypeError"
        });
        if (args.cause)
          this.cause = args.cause;
        this.details = details;
        this.docsPath = docsPath8;
        this.metaMessages = args.metaMessages;
        this.shortMessage = shortMessage;
      }
    };
  }
});

// node_modules/abitype/dist/esm/regex.js
function execTyped(regex, string) {
  const match = regex.exec(string);
  return match?.groups;
}
var bytesRegex, integerRegex, isTupleRegex;
var init_regex = __esm({
  "node_modules/abitype/dist/esm/regex.js"() {
    bytesRegex = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
    integerRegex = /^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
    isTupleRegex = /^\(.+?\).*?$/;
  }
});

// node_modules/abitype/dist/esm/human-readable/formatAbiParameter.js
function formatAbiParameter(abiParameter) {
  let type = abiParameter.type;
  if (tupleRegex.test(abiParameter.type) && "components" in abiParameter) {
    type = "(";
    const length = abiParameter.components.length;
    for (let i = 0; i < length; i++) {
      const component = abiParameter.components[i];
      type += formatAbiParameter(component);
      if (i < length - 1)
        type += ", ";
    }
    const result = execTyped(tupleRegex, abiParameter.type);
    type += `)${result?.array || ""}`;
    return formatAbiParameter({
      ...abiParameter,
      type
    });
  }
  if ("indexed" in abiParameter && abiParameter.indexed)
    type = `${type} indexed`;
  if (abiParameter.name)
    return `${type} ${abiParameter.name}`;
  return type;
}
var tupleRegex;
var init_formatAbiParameter = __esm({
  "node_modules/abitype/dist/esm/human-readable/formatAbiParameter.js"() {
    init_regex();
    tupleRegex = /^tuple(?<array>(\[(\d*)\])*)$/;
  }
});

// node_modules/abitype/dist/esm/human-readable/formatAbiParameters.js
function formatAbiParameters(abiParameters) {
  let params = "";
  const length = abiParameters.length;
  for (let i = 0; i < length; i++) {
    const abiParameter = abiParameters[i];
    params += formatAbiParameter(abiParameter);
    if (i !== length - 1)
      params += ", ";
  }
  return params;
}
var init_formatAbiParameters = __esm({
  "node_modules/abitype/dist/esm/human-readable/formatAbiParameters.js"() {
    init_formatAbiParameter();
  }
});

// node_modules/abitype/dist/esm/human-readable/formatAbiItem.js
function formatAbiItem(abiItem) {
  if (abiItem.type === "function")
    return `function ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})${abiItem.stateMutability && abiItem.stateMutability !== "nonpayable" ? ` ${abiItem.stateMutability}` : ""}${abiItem.outputs?.length ? ` returns (${formatAbiParameters(abiItem.outputs)})` : ""}`;
  if (abiItem.type === "event")
    return `event ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})`;
  if (abiItem.type === "error")
    return `error ${abiItem.name}(${formatAbiParameters(abiItem.inputs)})`;
  if (abiItem.type === "constructor")
    return `constructor(${formatAbiParameters(abiItem.inputs)})${abiItem.stateMutability === "payable" ? " payable" : ""}`;
  if (abiItem.type === "fallback")
    return `fallback() external${abiItem.stateMutability === "payable" ? " payable" : ""}`;
  return "receive() external payable";
}
var init_formatAbiItem = __esm({
  "node_modules/abitype/dist/esm/human-readable/formatAbiItem.js"() {
    init_formatAbiParameters();
  }
});

// node_modules/abitype/dist/esm/human-readable/runtime/signatures.js
function isErrorSignature(signature) {
  return errorSignatureRegex.test(signature);
}
function execErrorSignature(signature) {
  return execTyped(errorSignatureRegex, signature);
}
function isEventSignature(signature) {
  return eventSignatureRegex.test(signature);
}
function execEventSignature(signature) {
  return execTyped(eventSignatureRegex, signature);
}
function isFunctionSignature(signature) {
  return functionSignatureRegex.test(signature);
}
function execFunctionSignature(signature) {
  return execTyped(functionSignatureRegex, signature);
}
function isStructSignature(signature) {
  return structSignatureRegex.test(signature);
}
function execStructSignature(signature) {
  return execTyped(structSignatureRegex, signature);
}
function isConstructorSignature(signature) {
  return constructorSignatureRegex.test(signature);
}
function execConstructorSignature(signature) {
  return execTyped(constructorSignatureRegex, signature);
}
function isFallbackSignature(signature) {
  return fallbackSignatureRegex.test(signature);
}
function execFallbackSignature(signature) {
  return execTyped(fallbackSignatureRegex, signature);
}
function isReceiveSignature(signature) {
  return receiveSignatureRegex.test(signature);
}
var errorSignatureRegex, eventSignatureRegex, functionSignatureRegex, structSignatureRegex, constructorSignatureRegex, fallbackSignatureRegex, receiveSignatureRegex, modifiers, eventModifiers, functionModifiers;
var init_signatures = __esm({
  "node_modules/abitype/dist/esm/human-readable/runtime/signatures.js"() {
    init_regex();
    errorSignatureRegex = /^error (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
    eventSignatureRegex = /^event (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)$/;
    functionSignatureRegex = /^function (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*)\((?<parameters>.*?)\)(?: (?<scope>external|public{1}))?(?: (?<stateMutability>pure|view|nonpayable|payable{1}))?(?: returns\s?\((?<returns>.*?)\))?$/;
    structSignatureRegex = /^struct (?<name>[a-zA-Z$_][a-zA-Z0-9$_]*) \{(?<properties>.*?)\}$/;
    constructorSignatureRegex = /^constructor\((?<parameters>.*?)\)(?:\s(?<stateMutability>payable{1}))?$/;
    fallbackSignatureRegex = /^fallback\(\) external(?:\s(?<stateMutability>payable{1}))?$/;
    receiveSignatureRegex = /^receive\(\) external payable$/;
    modifiers = /* @__PURE__ */ new Set([
      "memory",
      "indexed",
      "storage",
      "calldata"
    ]);
    eventModifiers = /* @__PURE__ */ new Set(["indexed"]);
    functionModifiers = /* @__PURE__ */ new Set([
      "calldata",
      "memory",
      "storage"
    ]);
  }
});

// node_modules/abitype/dist/esm/human-readable/errors/abiItem.js
var InvalidAbiItemError, UnknownTypeError, UnknownSolidityTypeError;
var init_abiItem = __esm({
  "node_modules/abitype/dist/esm/human-readable/errors/abiItem.js"() {
    init_errors();
    InvalidAbiItemError = class extends BaseError {
      constructor({ signature }) {
        super("Failed to parse ABI item.", {
          details: `parseAbiItem(${JSON.stringify(signature, null, 2)})`,
          docsPath: "/api/human#parseabiitem-1"
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidAbiItemError"
        });
      }
    };
    UnknownTypeError = class extends BaseError {
      constructor({ type }) {
        super("Unknown type.", {
          metaMessages: [
            `Type "${type}" is not a valid ABI type. Perhaps you forgot to include a struct signature?`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "UnknownTypeError"
        });
      }
    };
    UnknownSolidityTypeError = class extends BaseError {
      constructor({ type }) {
        super("Unknown type.", {
          metaMessages: [`Type "${type}" is not a valid ABI type.`]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "UnknownSolidityTypeError"
        });
      }
    };
  }
});

// node_modules/abitype/dist/esm/human-readable/errors/abiParameter.js
var InvalidAbiParametersError, InvalidParameterError, SolidityProtectedKeywordError, InvalidModifierError, InvalidFunctionModifierError, InvalidAbiTypeParameterError;
var init_abiParameter = __esm({
  "node_modules/abitype/dist/esm/human-readable/errors/abiParameter.js"() {
    init_errors();
    InvalidAbiParametersError = class extends BaseError {
      constructor({ params }) {
        super("Failed to parse ABI parameters.", {
          details: `parseAbiParameters(${JSON.stringify(params, null, 2)})`,
          docsPath: "/api/human#parseabiparameters-1"
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidAbiParametersError"
        });
      }
    };
    InvalidParameterError = class extends BaseError {
      constructor({ param }) {
        super("Invalid ABI parameter.", {
          details: param
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidParameterError"
        });
      }
    };
    SolidityProtectedKeywordError = class extends BaseError {
      constructor({ param, name }) {
        super("Invalid ABI parameter.", {
          details: param,
          metaMessages: [
            `"${name}" is a protected Solidity keyword. More info: https://docs.soliditylang.org/en/latest/cheatsheet.html`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "SolidityProtectedKeywordError"
        });
      }
    };
    InvalidModifierError = class extends BaseError {
      constructor({ param, type, modifier }) {
        super("Invalid ABI parameter.", {
          details: param,
          metaMessages: [
            `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidModifierError"
        });
      }
    };
    InvalidFunctionModifierError = class extends BaseError {
      constructor({ param, type, modifier }) {
        super("Invalid ABI parameter.", {
          details: param,
          metaMessages: [
            `Modifier "${modifier}" not allowed${type ? ` in "${type}" type` : ""}.`,
            `Data location can only be specified for array, struct, or mapping types, but "${modifier}" was given.`
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidFunctionModifierError"
        });
      }
    };
    InvalidAbiTypeParameterError = class extends BaseError {
      constructor({ abiParameter }) {
        super("Invalid ABI parameter.", {
          details: JSON.stringify(abiParameter, null, 2),
          metaMessages: ["ABI parameter type is invalid."]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidAbiTypeParameterError"
        });
      }
    };
  }
});

// node_modules/abitype/dist/esm/human-readable/errors/signature.js
var InvalidSignatureError, UnknownSignatureError, InvalidStructSignatureError;
var init_signature = __esm({
  "node_modules/abitype/dist/esm/human-readable/errors/signature.js"() {
    init_errors();
    InvalidSignatureError = class extends BaseError {
      constructor({ signature, type }) {
        super(`Invalid ${type} signature.`, {
          details: signature
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidSignatureError"
        });
      }
    };
    UnknownSignatureError = class extends BaseError {
      constructor({ signature }) {
        super("Unknown signature.", {
          details: signature
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "UnknownSignatureError"
        });
      }
    };
    InvalidStructSignatureError = class extends BaseError {
      constructor({ signature }) {
        super("Invalid struct signature.", {
          details: signature,
          metaMessages: ["No properties exist."]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidStructSignatureError"
        });
      }
    };
  }
});

// node_modules/abitype/dist/esm/human-readable/errors/struct.js
var CircularReferenceError;
var init_struct = __esm({
  "node_modules/abitype/dist/esm/human-readable/errors/struct.js"() {
    init_errors();
    CircularReferenceError = class extends BaseError {
      constructor({ type }) {
        super("Circular reference detected.", {
          metaMessages: [`Struct "${type}" is a circular reference.`]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "CircularReferenceError"
        });
      }
    };
  }
});

// node_modules/abitype/dist/esm/human-readable/errors/splitParameters.js
var InvalidParenthesisError;
var init_splitParameters = __esm({
  "node_modules/abitype/dist/esm/human-readable/errors/splitParameters.js"() {
    init_errors();
    InvalidParenthesisError = class extends BaseError {
      constructor({ current, depth }) {
        super("Unbalanced parentheses.", {
          metaMessages: [
            `"${current.trim()}" has too many ${depth > 0 ? "opening" : "closing"} parentheses.`
          ],
          details: `Depth "${depth}"`
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "InvalidParenthesisError"
        });
      }
    };
  }
});

// node_modules/abitype/dist/esm/human-readable/runtime/cache.js
function getParameterCacheKey(param, type, structs) {
  let structKey = "";
  if (structs)
    for (const struct of Object.entries(structs)) {
      if (!struct)
        continue;
      let propertyKey = "";
      for (const property of struct[1]) {
        propertyKey += `[${property.type}${property.name ? `:${property.name}` : ""}]`;
      }
      structKey += `(${struct[0]}{${propertyKey}})`;
    }
  if (type)
    return `${type}:${param}${structKey}`;
  return `${param}${structKey}`;
}
var parameterCache;
var init_cache = __esm({
  "node_modules/abitype/dist/esm/human-readable/runtime/cache.js"() {
    parameterCache = /* @__PURE__ */ new Map([
      // Unnamed
      ["address", { type: "address" }],
      ["bool", { type: "bool" }],
      ["bytes", { type: "bytes" }],
      ["bytes32", { type: "bytes32" }],
      ["int", { type: "int256" }],
      ["int256", { type: "int256" }],
      ["string", { type: "string" }],
      ["uint", { type: "uint256" }],
      ["uint8", { type: "uint8" }],
      ["uint16", { type: "uint16" }],
      ["uint24", { type: "uint24" }],
      ["uint32", { type: "uint32" }],
      ["uint64", { type: "uint64" }],
      ["uint96", { type: "uint96" }],
      ["uint112", { type: "uint112" }],
      ["uint160", { type: "uint160" }],
      ["uint192", { type: "uint192" }],
      ["uint256", { type: "uint256" }],
      // Named
      ["address owner", { type: "address", name: "owner" }],
      ["address to", { type: "address", name: "to" }],
      ["bool approved", { type: "bool", name: "approved" }],
      ["bytes _data", { type: "bytes", name: "_data" }],
      ["bytes data", { type: "bytes", name: "data" }],
      ["bytes signature", { type: "bytes", name: "signature" }],
      ["bytes32 hash", { type: "bytes32", name: "hash" }],
      ["bytes32 r", { type: "bytes32", name: "r" }],
      ["bytes32 root", { type: "bytes32", name: "root" }],
      ["bytes32 s", { type: "bytes32", name: "s" }],
      ["string name", { type: "string", name: "name" }],
      ["string symbol", { type: "string", name: "symbol" }],
      ["string tokenURI", { type: "string", name: "tokenURI" }],
      ["uint tokenId", { type: "uint256", name: "tokenId" }],
      ["uint8 v", { type: "uint8", name: "v" }],
      ["uint256 balance", { type: "uint256", name: "balance" }],
      ["uint256 tokenId", { type: "uint256", name: "tokenId" }],
      ["uint256 value", { type: "uint256", name: "value" }],
      // Indexed
      [
        "event:address indexed from",
        { type: "address", name: "from", indexed: true }
      ],
      ["event:address indexed to", { type: "address", name: "to", indexed: true }],
      [
        "event:uint indexed tokenId",
        { type: "uint256", name: "tokenId", indexed: true }
      ],
      [
        "event:uint256 indexed tokenId",
        { type: "uint256", name: "tokenId", indexed: true }
      ]
    ]);
  }
});

// node_modules/abitype/dist/esm/human-readable/runtime/utils.js
function parseSignature(signature, structs = {}) {
  if (isFunctionSignature(signature))
    return parseFunctionSignature(signature, structs);
  if (isEventSignature(signature))
    return parseEventSignature(signature, structs);
  if (isErrorSignature(signature))
    return parseErrorSignature(signature, structs);
  if (isConstructorSignature(signature))
    return parseConstructorSignature(signature, structs);
  if (isFallbackSignature(signature))
    return parseFallbackSignature(signature);
  if (isReceiveSignature(signature))
    return {
      type: "receive",
      stateMutability: "payable"
    };
  throw new UnknownSignatureError({ signature });
}
function parseFunctionSignature(signature, structs = {}) {
  const match = execFunctionSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "function" });
  const inputParams = splitParameters(match.parameters);
  const inputs = [];
  const inputLength = inputParams.length;
  for (let i = 0; i < inputLength; i++) {
    inputs.push(parseAbiParameter(inputParams[i], {
      modifiers: functionModifiers,
      structs,
      type: "function"
    }));
  }
  const outputs = [];
  if (match.returns) {
    const outputParams = splitParameters(match.returns);
    const outputLength = outputParams.length;
    for (let i = 0; i < outputLength; i++) {
      outputs.push(parseAbiParameter(outputParams[i], {
        modifiers: functionModifiers,
        structs,
        type: "function"
      }));
    }
  }
  return {
    name: match.name,
    type: "function",
    stateMutability: match.stateMutability ?? "nonpayable",
    inputs,
    outputs
  };
}
function parseEventSignature(signature, structs = {}) {
  const match = execEventSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "event" });
  const params = splitParameters(match.parameters);
  const abiParameters = [];
  const length = params.length;
  for (let i = 0; i < length; i++)
    abiParameters.push(parseAbiParameter(params[i], {
      modifiers: eventModifiers,
      structs,
      type: "event"
    }));
  return { name: match.name, type: "event", inputs: abiParameters };
}
function parseErrorSignature(signature, structs = {}) {
  const match = execErrorSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "error" });
  const params = splitParameters(match.parameters);
  const abiParameters = [];
  const length = params.length;
  for (let i = 0; i < length; i++)
    abiParameters.push(parseAbiParameter(params[i], { structs, type: "error" }));
  return { name: match.name, type: "error", inputs: abiParameters };
}
function parseConstructorSignature(signature, structs = {}) {
  const match = execConstructorSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "constructor" });
  const params = splitParameters(match.parameters);
  const abiParameters = [];
  const length = params.length;
  for (let i = 0; i < length; i++)
    abiParameters.push(parseAbiParameter(params[i], { structs, type: "constructor" }));
  return {
    type: "constructor",
    stateMutability: match.stateMutability ?? "nonpayable",
    inputs: abiParameters
  };
}
function parseFallbackSignature(signature) {
  const match = execFallbackSignature(signature);
  if (!match)
    throw new InvalidSignatureError({ signature, type: "fallback" });
  return {
    type: "fallback",
    stateMutability: match.stateMutability ?? "nonpayable"
  };
}
function parseAbiParameter(param, options) {
  const parameterCacheKey = getParameterCacheKey(param, options?.type, options?.structs);
  if (parameterCache.has(parameterCacheKey))
    return parameterCache.get(parameterCacheKey);
  const isTuple = isTupleRegex.test(param);
  const match = execTyped(isTuple ? abiParameterWithTupleRegex : abiParameterWithoutTupleRegex, param);
  if (!match)
    throw new InvalidParameterError({ param });
  if (match.name && isSolidityKeyword(match.name))
    throw new SolidityProtectedKeywordError({ param, name: match.name });
  const name = match.name ? { name: match.name } : {};
  const indexed = match.modifier === "indexed" ? { indexed: true } : {};
  const structs = options?.structs ?? {};
  let type;
  let components = {};
  if (isTuple) {
    type = "tuple";
    const params = splitParameters(match.type);
    const components_ = [];
    const length = params.length;
    for (let i = 0; i < length; i++) {
      components_.push(parseAbiParameter(params[i], { structs }));
    }
    components = { components: components_ };
  } else if (match.type in structs) {
    type = "tuple";
    components = { components: structs[match.type] };
  } else if (dynamicIntegerRegex.test(match.type)) {
    type = `${match.type}256`;
  } else if (match.type === "address payable") {
    type = "address";
  } else {
    type = match.type;
    if (!(options?.type === "struct") && !isSolidityType(type))
      throw new UnknownSolidityTypeError({ type });
  }
  if (match.modifier) {
    if (!options?.modifiers?.has?.(match.modifier))
      throw new InvalidModifierError({
        param,
        type: options?.type,
        modifier: match.modifier
      });
    if (functionModifiers.has(match.modifier) && !isValidDataLocation(type, !!match.array))
      throw new InvalidFunctionModifierError({
        param,
        type: options?.type,
        modifier: match.modifier
      });
  }
  const abiParameter = {
    type: `${type}${match.array ?? ""}`,
    ...name,
    ...indexed,
    ...components
  };
  parameterCache.set(parameterCacheKey, abiParameter);
  return abiParameter;
}
function splitParameters(params, result = [], current = "", depth = 0) {
  const length = params.trim().length;
  for (let i = 0; i < length; i++) {
    const char = params[i];
    const tail = params.slice(i + 1);
    switch (char) {
      case ",":
        return depth === 0 ? splitParameters(tail, [...result, current.trim()]) : splitParameters(tail, result, `${current}${char}`, depth);
      case "(":
        return splitParameters(tail, result, `${current}${char}`, depth + 1);
      case ")":
        return splitParameters(tail, result, `${current}${char}`, depth - 1);
      default:
        return splitParameters(tail, result, `${current}${char}`, depth);
    }
  }
  if (current === "")
    return result;
  if (depth !== 0)
    throw new InvalidParenthesisError({ current, depth });
  result.push(current.trim());
  return result;
}
function isSolidityType(type) {
  return type === "address" || type === "bool" || type === "function" || type === "string" || bytesRegex.test(type) || integerRegex.test(type);
}
function isSolidityKeyword(name) {
  return name === "address" || name === "bool" || name === "function" || name === "string" || name === "tuple" || bytesRegex.test(name) || integerRegex.test(name) || protectedKeywordsRegex.test(name);
}
function isValidDataLocation(type, isArray) {
  return isArray || type === "bytes" || type === "string" || type === "tuple";
}
var abiParameterWithoutTupleRegex, abiParameterWithTupleRegex, dynamicIntegerRegex, protectedKeywordsRegex;
var init_utils = __esm({
  "node_modules/abitype/dist/esm/human-readable/runtime/utils.js"() {
    init_regex();
    init_abiItem();
    init_abiParameter();
    init_signature();
    init_splitParameters();
    init_cache();
    init_signatures();
    abiParameterWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*(?:\spayable)?)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
    abiParameterWithTupleRegex = /^\((?<type>.+?)\)(?<array>(?:\[\d*?\])+?)?(?:\s(?<modifier>calldata|indexed|memory|storage{1}))?(?:\s(?<name>[a-zA-Z$_][a-zA-Z0-9$_]*))?$/;
    dynamicIntegerRegex = /^u?int$/;
    protectedKeywordsRegex = /^(?:after|alias|anonymous|apply|auto|byte|calldata|case|catch|constant|copyof|default|defined|error|event|external|false|final|function|immutable|implements|in|indexed|inline|internal|let|mapping|match|memory|mutable|null|of|override|partial|private|promise|public|pure|reference|relocatable|return|returns|sizeof|static|storage|struct|super|supports|switch|this|true|try|typedef|typeof|var|view|virtual)$/;
  }
});

// node_modules/abitype/dist/esm/human-readable/runtime/structs.js
function parseStructs(signatures) {
  const shallowStructs = {};
  const signaturesLength = signatures.length;
  for (let i = 0; i < signaturesLength; i++) {
    const signature = signatures[i];
    if (!isStructSignature(signature))
      continue;
    const match = execStructSignature(signature);
    if (!match)
      throw new InvalidSignatureError({ signature, type: "struct" });
    const properties = match.properties.split(";");
    const components = [];
    const propertiesLength = properties.length;
    for (let k = 0; k < propertiesLength; k++) {
      const property = properties[k];
      const trimmed = property.trim();
      if (!trimmed)
        continue;
      const abiParameter = parseAbiParameter(trimmed, {
        type: "struct"
      });
      components.push(abiParameter);
    }
    if (!components.length)
      throw new InvalidStructSignatureError({ signature });
    shallowStructs[match.name] = components;
  }
  const resolvedStructs = {};
  const entries = Object.entries(shallowStructs);
  const entriesLength = entries.length;
  for (let i = 0; i < entriesLength; i++) {
    const [name, parameters] = entries[i];
    resolvedStructs[name] = resolveStructs(parameters, shallowStructs);
  }
  return resolvedStructs;
}
function resolveStructs(abiParameters = [], structs = {}, ancestors = /* @__PURE__ */ new Set()) {
  const components = [];
  const length = abiParameters.length;
  for (let i = 0; i < length; i++) {
    const abiParameter = abiParameters[i];
    const isTuple = isTupleRegex.test(abiParameter.type);
    if (isTuple)
      components.push(abiParameter);
    else {
      const match = execTyped(typeWithoutTupleRegex, abiParameter.type);
      if (!match?.type)
        throw new InvalidAbiTypeParameterError({ abiParameter });
      const { array: array2, type } = match;
      if (type in structs) {
        if (ancestors.has(type))
          throw new CircularReferenceError({ type });
        components.push({
          ...abiParameter,
          type: `tuple${array2 ?? ""}`,
          components: resolveStructs(structs[type], structs, /* @__PURE__ */ new Set([...ancestors, type]))
        });
      } else {
        if (isSolidityType(type))
          components.push(abiParameter);
        else
          throw new UnknownTypeError({ type });
      }
    }
  }
  return components;
}
var typeWithoutTupleRegex;
var init_structs = __esm({
  "node_modules/abitype/dist/esm/human-readable/runtime/structs.js"() {
    init_regex();
    init_abiItem();
    init_abiParameter();
    init_signature();
    init_struct();
    init_signatures();
    init_utils();
    typeWithoutTupleRegex = /^(?<type>[a-zA-Z$_][a-zA-Z0-9$_]*)(?<array>(?:\[\d*?\])+?)?$/;
  }
});

// node_modules/abitype/dist/esm/human-readable/parseAbi.js
function parseAbi(signatures) {
  const structs = parseStructs(signatures);
  const abi2 = [];
  const length = signatures.length;
  for (let i = 0; i < length; i++) {
    const signature = signatures[i];
    if (isStructSignature(signature))
      continue;
    abi2.push(parseSignature(signature, structs));
  }
  return abi2;
}
var init_parseAbi = __esm({
  "node_modules/abitype/dist/esm/human-readable/parseAbi.js"() {
    init_signatures();
    init_structs();
    init_utils();
  }
});

// node_modules/abitype/dist/esm/human-readable/parseAbiItem.js
function parseAbiItem(signature) {
  let abiItem;
  if (typeof signature === "string")
    abiItem = parseSignature(signature);
  else {
    const structs = parseStructs(signature);
    const length = signature.length;
    for (let i = 0; i < length; i++) {
      const signature_ = signature[i];
      if (isStructSignature(signature_))
        continue;
      abiItem = parseSignature(signature_, structs);
      break;
    }
  }
  if (!abiItem)
    throw new InvalidAbiItemError({ signature });
  return abiItem;
}
var init_parseAbiItem = __esm({
  "node_modules/abitype/dist/esm/human-readable/parseAbiItem.js"() {
    init_abiItem();
    init_signatures();
    init_structs();
    init_utils();
  }
});

// node_modules/abitype/dist/esm/human-readable/parseAbiParameters.js
function parseAbiParameters(params) {
  const abiParameters = [];
  if (typeof params === "string") {
    const parameters = splitParameters(params);
    const length = parameters.length;
    for (let i = 0; i < length; i++) {
      abiParameters.push(parseAbiParameter(parameters[i], { modifiers }));
    }
  } else {
    const structs = parseStructs(params);
    const length = params.length;
    for (let i = 0; i < length; i++) {
      const signature = params[i];
      if (isStructSignature(signature))
        continue;
      const parameters = splitParameters(signature);
      const length2 = parameters.length;
      for (let k = 0; k < length2; k++) {
        abiParameters.push(parseAbiParameter(parameters[k], { modifiers, structs }));
      }
    }
  }
  if (abiParameters.length === 0)
    throw new InvalidAbiParametersError({ params });
  return abiParameters;
}
var init_parseAbiParameters = __esm({
  "node_modules/abitype/dist/esm/human-readable/parseAbiParameters.js"() {
    init_abiParameter();
    init_signatures();
    init_structs();
    init_utils();
    init_utils();
  }
});

// node_modules/abitype/dist/esm/exports/index.js
var init_exports = __esm({
  "node_modules/abitype/dist/esm/exports/index.js"() {
    init_formatAbiItem();
    init_formatAbiParameters();
    init_parseAbi();
    init_parseAbiItem();
    init_parseAbiParameters();
  }
});

// node_modules/viem/_esm/utils/abi/formatAbiItem.js
function formatAbiItem2(abiItem, { includeName = false } = {}) {
  if (abiItem.type !== "function" && abiItem.type !== "event" && abiItem.type !== "error")
    throw new InvalidDefinitionTypeError(abiItem.type);
  return `${abiItem.name}(${formatAbiParams(abiItem.inputs, { includeName })})`;
}
function formatAbiParams(params, { includeName = false } = {}) {
  if (!params)
    return "";
  return params.map((param) => formatAbiParam(param, { includeName })).join(includeName ? ", " : ",");
}
function formatAbiParam(param, { includeName }) {
  if (param.type.startsWith("tuple")) {
    return `(${formatAbiParams(param.components, { includeName })})${param.type.slice("tuple".length)}`;
  }
  return param.type + (includeName && param.name ? ` ${param.name}` : "");
}
var init_formatAbiItem2 = __esm({
  "node_modules/viem/_esm/utils/abi/formatAbiItem.js"() {
    init_abi();
  }
});

// node_modules/viem/_esm/utils/data/isHex.js
function isHex(value, { strict = true } = {}) {
  if (!value)
    return false;
  if (typeof value !== "string")
    return false;
  return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
}
var init_isHex = __esm({
  "node_modules/viem/_esm/utils/data/isHex.js"() {
  }
});

// node_modules/viem/_esm/utils/data/size.js
function size(value) {
  if (isHex(value, { strict: false }))
    return Math.ceil((value.length - 2) / 2);
  return value.length;
}
var init_size = __esm({
  "node_modules/viem/_esm/utils/data/size.js"() {
    init_isHex();
  }
});

// node_modules/viem/_esm/errors/version.js
var version2;
var init_version2 = __esm({
  "node_modules/viem/_esm/errors/version.js"() {
    version2 = "2.56.3";
  }
});

// node_modules/viem/_esm/errors/base.js
function walk(err, fn) {
  if (fn?.(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause !== void 0)
    return walk(err.cause, fn);
  return fn ? null : err;
}
var errorConfig, BaseError2;
var init_base = __esm({
  "node_modules/viem/_esm/errors/base.js"() {
    init_version2();
    errorConfig = {
      getDocsUrl: ({ docsBaseUrl, docsPath: docsPath8 = "", docsSlug }) => docsPath8 ? `${docsBaseUrl ?? "https://viem.sh"}${docsPath8}${docsSlug ? `#${docsSlug}` : ""}` : void 0,
      version: `viem@${version2}`
    };
    BaseError2 = class _BaseError extends Error {
      constructor(shortMessage, args = {}) {
        const details = (() => {
          if (args.cause instanceof _BaseError)
            return args.cause.details;
          if (args.cause?.message)
            return args.cause.message;
          return args.details;
        })();
        const docsPath8 = (() => {
          if (args.cause instanceof _BaseError)
            return args.cause.docsPath || args.docsPath;
          return args.docsPath;
        })();
        const docsUrl = errorConfig.getDocsUrl?.({ ...args, docsPath: docsPath8 });
        const message = [
          shortMessage || "An error occurred.",
          "",
          ...args.metaMessages ? [...args.metaMessages, ""] : [],
          ...docsUrl ? [`Docs: ${docsUrl}`] : [],
          ...details ? [`Details: ${details}`] : [],
          ...errorConfig.version ? [`Version: ${errorConfig.version}`] : []
        ].join("\n");
        super(message, args.cause ? { cause: args.cause } : void 0);
        Object.defineProperty(this, "details", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "docsPath", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "metaMessages", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "shortMessage", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "version", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "BaseError"
        });
        this.details = details;
        this.docsPath = docsPath8;
        this.metaMessages = args.metaMessages;
        this.name = args.name ?? this.name;
        this.shortMessage = shortMessage;
        this.version = version2;
      }
      walk(fn) {
        return walk(this, fn);
      }
    };
  }
});

// node_modules/viem/_esm/errors/abi.js
var AbiConstructorNotFoundError, AbiConstructorParamsNotFoundError, AbiDecodingDataSizeTooSmallError, AbiDecodingZeroDataError, AbiEncodingArrayLengthMismatchError, AbiEncodingBytesSizeMismatchError, AbiEncodingLengthMismatchError, AbiErrorInputsNotFoundError, AbiErrorNotFoundError, AbiErrorSignatureNotFoundError, AbiEventSignatureEmptyTopicsError, AbiEventSignatureNotFoundError, AbiEventNotFoundError, AbiFunctionNotFoundError, AbiFunctionOutputsNotFoundError, AbiFunctionSignatureNotFoundError, AbiItemAmbiguityError, BytesSizeMismatchError, DecodeLogDataMismatch, DecodeLogTopicsMismatch, InvalidAbiEncodingTypeError, InvalidAbiDecodingTypeError, InvalidArrayError, InvalidDefinitionTypeError;
var init_abi = __esm({
  "node_modules/viem/_esm/errors/abi.js"() {
    init_formatAbiItem2();
    init_size();
    init_base();
    AbiConstructorNotFoundError = class extends BaseError2 {
      constructor({ docsPath: docsPath8 }) {
        super([
          "A constructor was not found on the ABI.",
          "Make sure you are using the correct ABI and that the constructor exists on it."
        ].join("\n"), {
          docsPath: docsPath8,
          name: "AbiConstructorNotFoundError"
        });
      }
    };
    AbiConstructorParamsNotFoundError = class extends BaseError2 {
      constructor({ docsPath: docsPath8 }) {
        super([
          "Constructor arguments were provided (`args`), but a constructor parameters (`inputs`) were not found on the ABI.",
          "Make sure you are using the correct ABI, and that the `inputs` attribute on the constructor exists."
        ].join("\n"), {
          docsPath: docsPath8,
          name: "AbiConstructorParamsNotFoundError"
        });
      }
    };
    AbiDecodingDataSizeTooSmallError = class extends BaseError2 {
      constructor({ data, params, size: size5 }) {
        super([`Data size of ${size5} bytes is too small for given parameters.`].join("\n"), {
          metaMessages: [
            `Params: (${formatAbiParams(params, { includeName: true })})`,
            `Data:   ${data} (${size5} bytes)`
          ],
          name: "AbiDecodingDataSizeTooSmallError"
        });
        Object.defineProperty(this, "data", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "params", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "size", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.data = data;
        this.params = params;
        this.size = size5;
      }
    };
    AbiDecodingZeroDataError = class extends BaseError2 {
      constructor({ cause } = {}) {
        super('Cannot decode zero data ("0x") with ABI parameters.', {
          name: "AbiDecodingZeroDataError",
          cause
        });
      }
    };
    AbiEncodingArrayLengthMismatchError = class extends BaseError2 {
      constructor({ expectedLength, givenLength, type }) {
        super([
          `ABI encoding array length mismatch for type ${type}.`,
          `Expected length: ${expectedLength}`,
          `Given length: ${givenLength}`
        ].join("\n"), { name: "AbiEncodingArrayLengthMismatchError" });
      }
    };
    AbiEncodingBytesSizeMismatchError = class extends BaseError2 {
      constructor({ expectedSize, value }) {
        super(`Size of bytes "${value}" (bytes${size(value)}) does not match expected size (bytes${expectedSize}).`, { name: "AbiEncodingBytesSizeMismatchError" });
      }
    };
    AbiEncodingLengthMismatchError = class extends BaseError2 {
      constructor({ expectedLength, givenLength }) {
        super([
          "ABI encoding params/values length mismatch.",
          `Expected length (params): ${expectedLength}`,
          `Given length (values): ${givenLength}`
        ].join("\n"), { name: "AbiEncodingLengthMismatchError" });
      }
    };
    AbiErrorInputsNotFoundError = class extends BaseError2 {
      constructor(errorName, { docsPath: docsPath8 }) {
        super([
          `Arguments (\`args\`) were provided to "${errorName}", but "${errorName}" on the ABI does not contain any parameters (\`inputs\`).`,
          "Cannot encode error result without knowing what the parameter types are.",
          "Make sure you are using the correct ABI and that the inputs exist on it."
        ].join("\n"), {
          docsPath: docsPath8,
          name: "AbiErrorInputsNotFoundError"
        });
      }
    };
    AbiErrorNotFoundError = class extends BaseError2 {
      constructor(errorName, { docsPath: docsPath8 } = {}) {
        super([
          `Error ${errorName ? `"${errorName}" ` : ""}not found on ABI.`,
          "Make sure you are using the correct ABI and that the error exists on it."
        ].join("\n"), {
          docsPath: docsPath8,
          name: "AbiErrorNotFoundError"
        });
      }
    };
    AbiErrorSignatureNotFoundError = class extends BaseError2 {
      constructor(signature, { docsPath: docsPath8, cause }) {
        super([
          `Encoded error signature "${signature}" not found on ABI.`,
          "Make sure you are using the correct ABI and that the error exists on it.",
          `You can look up the decoded signature here: https://4byte.sourcify.dev/?q=${signature}.`
        ].join("\n"), {
          docsPath: docsPath8,
          name: "AbiErrorSignatureNotFoundError",
          cause
        });
        Object.defineProperty(this, "signature", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.signature = signature;
      }
    };
    AbiEventSignatureEmptyTopicsError = class extends BaseError2 {
      constructor({ docsPath: docsPath8 }) {
        super("Cannot extract event signature from empty topics.", {
          docsPath: docsPath8,
          name: "AbiEventSignatureEmptyTopicsError"
        });
      }
    };
    AbiEventSignatureNotFoundError = class extends BaseError2 {
      constructor(signature, { docsPath: docsPath8 }) {
        super([
          `Encoded event signature "${signature}" not found on ABI.`,
          "Make sure you are using the correct ABI and that the event exists on it.",
          `You can look up the signature here: https://4byte.sourcify.dev/?q=${signature}.`
        ].join("\n"), {
          docsPath: docsPath8,
          name: "AbiEventSignatureNotFoundError"
        });
      }
    };
    AbiEventNotFoundError = class extends BaseError2 {
      constructor(eventName, { docsPath: docsPath8 } = {}) {
        super([
          `Event ${eventName ? `"${eventName}" ` : ""}not found on ABI.`,
          "Make sure you are using the correct ABI and that the event exists on it."
        ].join("\n"), {
          docsPath: docsPath8,
          name: "AbiEventNotFoundError"
        });
      }
    };
    AbiFunctionNotFoundError = class extends BaseError2 {
      constructor(functionName, { docsPath: docsPath8 } = {}) {
        super([
          `Function ${functionName ? `"${functionName}" ` : ""}not found on ABI.`,
          "Make sure you are using the correct ABI and that the function exists on it."
        ].join("\n"), {
          docsPath: docsPath8,
          name: "AbiFunctionNotFoundError"
        });
      }
    };
    AbiFunctionOutputsNotFoundError = class extends BaseError2 {
      constructor(functionName, { docsPath: docsPath8 }) {
        super([
          `Function "${functionName}" does not contain any \`outputs\` on ABI.`,
          "Cannot decode function result without knowing what the parameter types are.",
          "Make sure you are using the correct ABI and that the function exists on it."
        ].join("\n"), {
          docsPath: docsPath8,
          name: "AbiFunctionOutputsNotFoundError"
        });
      }
    };
    AbiFunctionSignatureNotFoundError = class extends BaseError2 {
      constructor(signature, { docsPath: docsPath8 }) {
        super([
          `Encoded function signature "${signature}" not found on ABI.`,
          "Make sure you are using the correct ABI and that the function exists on it.",
          `You can look up the signature here: https://4byte.sourcify.dev/?q=${signature}.`
        ].join("\n"), {
          docsPath: docsPath8,
          name: "AbiFunctionSignatureNotFoundError"
        });
      }
    };
    AbiItemAmbiguityError = class extends BaseError2 {
      constructor(x, y) {
        super("Found ambiguous types in overloaded ABI items.", {
          metaMessages: [
            `\`${x.type}\` in \`${formatAbiItem2(x.abiItem)}\`, and`,
            `\`${y.type}\` in \`${formatAbiItem2(y.abiItem)}\``,
            "",
            "These types encode differently and cannot be distinguished at runtime.",
            "Remove one of the ambiguous items in the ABI."
          ],
          name: "AbiItemAmbiguityError"
        });
      }
    };
    BytesSizeMismatchError = class extends BaseError2 {
      constructor({ expectedSize, givenSize }) {
        super(`Expected bytes${expectedSize}, got bytes${givenSize}.`, {
          name: "BytesSizeMismatchError"
        });
      }
    };
    DecodeLogDataMismatch = class extends BaseError2 {
      constructor({ abiItem, data, params, size: size5 }) {
        super([
          `Data size of ${size5} bytes is too small for non-indexed event parameters.`
        ].join("\n"), {
          metaMessages: [
            `Params: (${formatAbiParams(params, { includeName: true })})`,
            `Data:   ${data} (${size5} bytes)`
          ],
          name: "DecodeLogDataMismatch"
        });
        Object.defineProperty(this, "abiItem", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "data", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "params", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "size", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.abiItem = abiItem;
        this.data = data;
        this.params = params;
        this.size = size5;
      }
    };
    DecodeLogTopicsMismatch = class extends BaseError2 {
      constructor({ abiItem, param }) {
        super([
          `Expected a topic for indexed event parameter${param.name ? ` "${param.name}"` : ""} on event "${formatAbiItem2(abiItem, { includeName: true })}".`
        ].join("\n"), { name: "DecodeLogTopicsMismatch" });
        Object.defineProperty(this, "abiItem", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.abiItem = abiItem;
      }
    };
    InvalidAbiEncodingTypeError = class extends BaseError2 {
      constructor(type, { docsPath: docsPath8 }) {
        super([
          `Type "${type}" is not a valid encoding type.`,
          "Please provide a valid ABI type."
        ].join("\n"), { docsPath: docsPath8, name: "InvalidAbiEncodingType" });
      }
    };
    InvalidAbiDecodingTypeError = class extends BaseError2 {
      constructor(type, { docsPath: docsPath8 }) {
        super([
          `Type "${type}" is not a valid decoding type.`,
          "Please provide a valid ABI type."
        ].join("\n"), { docsPath: docsPath8, name: "InvalidAbiDecodingType" });
      }
    };
    InvalidArrayError = class extends BaseError2 {
      constructor(value) {
        super([`Value "${value}" is not a valid array.`].join("\n"), {
          name: "InvalidArrayError"
        });
      }
    };
    InvalidDefinitionTypeError = class extends BaseError2 {
      constructor(type) {
        super([
          `"${type}" is not a valid definition type.`,
          'Valid types: "function", "event", "error"'
        ].join("\n"), { name: "InvalidDefinitionTypeError" });
      }
    };
  }
});

// node_modules/viem/_esm/errors/data.js
var SliceOffsetOutOfBoundsError, SizeExceedsPaddingSizeError, InvalidBytesLengthError;
var init_data = __esm({
  "node_modules/viem/_esm/errors/data.js"() {
    init_base();
    SliceOffsetOutOfBoundsError = class extends BaseError2 {
      constructor({ offset, position, size: size5 }) {
        super(`Slice ${position === "start" ? "starting" : "ending"} at offset "${offset}" is out-of-bounds (size: ${size5}).`, { name: "SliceOffsetOutOfBoundsError" });
      }
    };
    SizeExceedsPaddingSizeError = class extends BaseError2 {
      constructor({ size: size5, targetSize, type }) {
        super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size5}) exceeds padding size (${targetSize}).`, { name: "SizeExceedsPaddingSizeError" });
      }
    };
    InvalidBytesLengthError = class extends BaseError2 {
      constructor({ size: size5, targetSize, type }) {
        super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} is expected to be ${targetSize} ${type} long, but is ${size5} ${type} long.`, { name: "InvalidBytesLengthError" });
      }
    };
  }
});

// node_modules/viem/_esm/utils/data/pad.js
function pad(hexOrBytes, { dir, size: size5 = 32 } = {}) {
  if (typeof hexOrBytes === "string")
    return padHex(hexOrBytes, { dir, size: size5 });
  return padBytes(hexOrBytes, { dir, size: size5 });
}
function padHex(hex_, { dir, size: size5 = 32 } = {}) {
  if (size5 === null)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size5 * 2)
    throw new SizeExceedsPaddingSizeError({
      size: Math.ceil(hex.length / 2),
      targetSize: size5,
      type: "hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size5 * 2, "0")}`;
}
function padBytes(bytes, { dir, size: size5 = 32 } = {}) {
  if (size5 === null)
    return bytes;
  if (bytes.length > size5)
    throw new SizeExceedsPaddingSizeError({
      size: bytes.length,
      targetSize: size5,
      type: "bytes"
    });
  const paddedBytes = new Uint8Array(size5);
  for (let i = 0; i < size5; i++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i : size5 - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
  }
  return paddedBytes;
}
var init_pad = __esm({
  "node_modules/viem/_esm/utils/data/pad.js"() {
    init_data();
  }
});

// node_modules/viem/_esm/errors/encoding.js
var IntegerOutOfRangeError, InvalidBytesBooleanError, InvalidHexBooleanError, SizeOverflowError;
var init_encoding = __esm({
  "node_modules/viem/_esm/errors/encoding.js"() {
    init_base();
    IntegerOutOfRangeError = class extends BaseError2 {
      constructor({ max, min, signed, size: size5, value }) {
        super(`Number "${value}" is not in safe ${size5 ? `${size5 * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, { name: "IntegerOutOfRangeError" });
      }
    };
    InvalidBytesBooleanError = class extends BaseError2 {
      constructor(bytes) {
        super(`Bytes value "${bytes}" is not a valid boolean. The bytes array must contain a single byte of either a 0 or 1 value.`, {
          name: "InvalidBytesBooleanError"
        });
      }
    };
    InvalidHexBooleanError = class extends BaseError2 {
      constructor(hex) {
        super(`Hex value "${hex}" is not a valid boolean. The hex value must be "0x0" (false) or "0x1" (true).`, { name: "InvalidHexBooleanError" });
      }
    };
    SizeOverflowError = class extends BaseError2 {
      constructor({ givenSize, maxSize }) {
        super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, { name: "SizeOverflowError" });
      }
    };
  }
});

// node_modules/viem/_esm/utils/data/trim.js
function trim(hexOrBytes, { dir = "left" } = {}) {
  let data = typeof hexOrBytes === "string" ? hexOrBytes.replace("0x", "") : hexOrBytes;
  let sliceLength = 0;
  for (let i = 0; i < data.length - 1; i++) {
    if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  if (typeof hexOrBytes === "string") {
    if (data.length === 1 && dir === "right")
      data = `${data}0`;
    return `0x${data.length % 2 === 1 ? `0${data}` : data}`;
  }
  return data;
}
var init_trim = __esm({
  "node_modules/viem/_esm/utils/data/trim.js"() {
  }
});

// node_modules/viem/_esm/utils/encoding/fromHex.js
function assertSize(hexOrBytes, { size: size5 }) {
  if (size(hexOrBytes) > size5)
    throw new SizeOverflowError({
      givenSize: size(hexOrBytes),
      maxSize: size5
    });
}
function hexToBigInt(hex, opts = {}) {
  const { signed } = opts;
  if (opts.size)
    assertSize(hex, { size: opts.size });
  const value = BigInt(hex);
  if (!signed)
    return value;
  const size5 = Math.ceil((hex.length - 2) / 2);
  const max = (1n << BigInt(size5) * 8n - 1n) - 1n;
  if (value <= max)
    return value;
  return value - BigInt(`0x${"f".padStart(size5 * 2, "f")}`) - 1n;
}
function hexToBool(hex_, opts = {}) {
  let hex = hex_;
  if (opts.size) {
    assertSize(hex, { size: opts.size });
    hex = trim(hex);
  }
  if (trim(hex) === "0x00")
    return false;
  if (trim(hex) === "0x01")
    return true;
  throw new InvalidHexBooleanError(hex);
}
function hexToNumber(hex, opts = {}) {
  const value = hexToBigInt(hex, opts);
  const number = Number(value);
  if (!Number.isSafeInteger(number))
    throw new IntegerOutOfRangeError({
      max: `${Number.MAX_SAFE_INTEGER}`,
      min: `${Number.MIN_SAFE_INTEGER}`,
      signed: opts.signed,
      size: opts.size,
      value: `${value}n`
    });
  return number;
}
var init_fromHex = __esm({
  "node_modules/viem/_esm/utils/encoding/fromHex.js"() {
    init_encoding();
    init_size();
    init_trim();
  }
});

// node_modules/viem/_esm/utils/encoding/toHex.js
function toHex(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToHex(value, opts);
  if (typeof value === "string") {
    return stringToHex(value, opts);
  }
  if (typeof value === "boolean")
    return boolToHex(value, opts);
  return bytesToHex(value, opts);
}
function boolToHex(value, opts = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { size: opts.size });
  }
  return hex;
}
function bytesToHex(value, opts = {}) {
  let string = "";
  for (let i = 0; i < value.length; i++) {
    string += hexes[value[i]];
  }
  const hex = `0x${string}`;
  if (typeof opts.size === "number") {
    assertSize(hex, { size: opts.size });
    return pad(hex, { dir: "right", size: opts.size });
  }
  return hex;
}
function numberToHex(value_, opts = {}) {
  const { signed, size: size5 } = opts;
  const value = BigInt(value_);
  let maxValue;
  if (size5) {
    if (signed)
      maxValue = (1n << BigInt(size5) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size5) * 8n) - 1n;
  } else if (typeof value_ === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value > maxValue || value < minValue) {
    const suffix = typeof value_ === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size5,
      value: `${value_}${suffix}`
    });
  }
  const hex = `0x${(signed && value < 0 ? (1n << BigInt(size5 * 8)) + BigInt(value) : value).toString(16)}`;
  if (size5)
    return pad(hex, { size: size5 });
  return hex;
}
function stringToHex(value_, opts = {}) {
  const value = encoder.encode(value_);
  return bytesToHex(value, opts);
}
var hexes, encoder;
var init_toHex = __esm({
  "node_modules/viem/_esm/utils/encoding/toHex.js"() {
    init_encoding();
    init_pad();
    init_fromHex();
    hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
    encoder = /* @__PURE__ */ new TextEncoder();
  }
});

// node_modules/viem/_esm/utils/encoding/toBytes.js
function toBytes(value, opts = {}) {
  if (typeof value === "number" || typeof value === "bigint")
    return numberToBytes(value, opts);
  if (typeof value === "boolean")
    return boolToBytes(value, opts);
  if (isHex(value))
    return hexToBytes(value, opts);
  return stringToBytes(value, opts);
}
function boolToBytes(value, opts = {}) {
  const bytes = new Uint8Array(1);
  bytes[0] = Number(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { size: opts.size });
  }
  return bytes;
}
function charCodeToBase16(char) {
  if (char >= charCodeMap.zero && char <= charCodeMap.nine)
    return char - charCodeMap.zero;
  if (char >= charCodeMap.A && char <= charCodeMap.F)
    return char - (charCodeMap.A - 10);
  if (char >= charCodeMap.a && char <= charCodeMap.f)
    return char - (charCodeMap.a - 10);
  return void 0;
}
function hexToBytes(hex_, opts = {}) {
  let hex = hex_;
  if (opts.size) {
    assertSize(hex, { size: opts.size });
    hex = pad(hex, { dir: "right", size: opts.size });
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index2 = 0, j = 0; index2 < length; index2++) {
    const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError2(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes[index2] = nibbleLeft * 16 + nibbleRight;
  }
  return bytes;
}
function numberToBytes(value, opts) {
  const hex = numberToHex(value, opts);
  return hexToBytes(hex);
}
function stringToBytes(value, opts = {}) {
  const bytes = encoder2.encode(value);
  if (typeof opts.size === "number") {
    assertSize(bytes, { size: opts.size });
    return pad(bytes, { dir: "right", size: opts.size });
  }
  return bytes;
}
var encoder2, charCodeMap;
var init_toBytes = __esm({
  "node_modules/viem/_esm/utils/encoding/toBytes.js"() {
    init_base();
    init_isHex();
    init_pad();
    init_fromHex();
    init_toHex();
    encoder2 = /* @__PURE__ */ new TextEncoder();
    charCodeMap = {
      zero: 48,
      nine: 57,
      A: 65,
      F: 70,
      a: 97,
      f: 102
    };
  }
});

// node_modules/@noble/hashes/esm/_u64.js
function fromBig(n2, le = false) {
  if (le)
    return { h: Number(n2 & U32_MASK64), l: Number(n2 >> _32n & U32_MASK64) };
  return { h: Number(n2 >> _32n & U32_MASK64) | 0, l: Number(n2 & U32_MASK64) | 0 };
}
function split(lst, le = false) {
  const len = lst.length;
  let Ah = new Uint32Array(len);
  let Al = new Uint32Array(len);
  for (let i = 0; i < len; i++) {
    const { h, l } = fromBig(lst[i], le);
    [Ah[i], Al[i]] = [h, l];
  }
  return [Ah, Al];
}
var U32_MASK64, _32n, rotlSH, rotlSL, rotlBH, rotlBL;
var init_u64 = __esm({
  "node_modules/@noble/hashes/esm/_u64.js"() {
    U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
    _32n = /* @__PURE__ */ BigInt(32);
    rotlSH = (h, l, s) => h << s | l >>> 32 - s;
    rotlSL = (h, l, s) => l << s | h >>> 32 - s;
    rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
    rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
  }
});

// node_modules/@noble/hashes/esm/crypto.js
var crypto2;
var init_crypto = __esm({
  "node_modules/@noble/hashes/esm/crypto.js"() {
    crypto2 = typeof globalThis === "object" && "crypto" in globalThis ? globalThis.crypto : void 0;
  }
});

// node_modules/@noble/hashes/esm/utils.js
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function anumber(n2) {
  if (!Number.isSafeInteger(n2) || n2 < 0)
    throw new Error("positive integer expected, got " + n2);
}
function abytes(b, ...lengths) {
  if (!isBytes(b))
    throw new Error("Uint8Array expected");
  if (lengths.length > 0 && !lengths.includes(b.length))
    throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
}
function ahash(h) {
  if (typeof h !== "function" || typeof h.create !== "function")
    throw new Error("Hash should be wrapped by utils.createHasher");
  anumber(h.outputLen);
  anumber(h.blockLen);
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out);
  const min = instance.outputLen;
  if (out.length < min) {
    throw new Error("digestInto() expects output buffer of length at least " + min);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function createView(arr) {
  return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
}
function rotr(word, shift) {
  return word << 32 - shift | word >>> shift;
}
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = byteSwap(arr[i]);
  }
  return arr;
}
function utf8ToBytes(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function toBytes2(data) {
  if (typeof data === "string")
    data = utf8ToBytes(data);
  abytes(data);
  return data;
}
function concatBytes(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    abytes(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad4 = 0; i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad4);
    pad4 += a.length;
  }
  return res;
}
function createHasher(hashCons) {
  const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
  const tmp = hashCons();
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.create = () => hashCons();
  return hashC;
}
function randomBytes(bytesLength = 32) {
  if (crypto2 && typeof crypto2.getRandomValues === "function") {
    return crypto2.getRandomValues(new Uint8Array(bytesLength));
  }
  if (crypto2 && typeof crypto2.randomBytes === "function") {
    return Uint8Array.from(crypto2.randomBytes(bytesLength));
  }
  throw new Error("crypto.getRandomValues must be defined");
}
var isLE, swap32IfBE, Hash;
var init_utils2 = __esm({
  "node_modules/@noble/hashes/esm/utils.js"() {
    init_crypto();
    isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    swap32IfBE = isLE ? (u) => u : byteSwap32;
    Hash = class {
    };
  }
});

// node_modules/@noble/hashes/esm/sha3.js
function keccakP(s, rounds = 24) {
  const B = new Uint32Array(5 * 2);
  for (let round = 24 - rounds; round < 24; round++) {
    for (let x = 0; x < 10; x++)
      B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
    for (let x = 0; x < 10; x += 2) {
      const idx1 = (x + 8) % 10;
      const idx0 = (x + 2) % 10;
      const B0 = B[idx0];
      const B1 = B[idx0 + 1];
      const Th = rotlH(B0, B1, 1) ^ B[idx1];
      const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
      for (let y = 0; y < 50; y += 10) {
        s[x + y] ^= Th;
        s[x + y + 1] ^= Tl;
      }
    }
    let curH = s[2];
    let curL = s[3];
    for (let t = 0; t < 24; t++) {
      const shift = SHA3_ROTL[t];
      const Th = rotlH(curH, curL, shift);
      const Tl = rotlL(curH, curL, shift);
      const PI = SHA3_PI[t];
      curH = s[PI];
      curL = s[PI + 1];
      s[PI] = Th;
      s[PI + 1] = Tl;
    }
    for (let y = 0; y < 50; y += 10) {
      for (let x = 0; x < 10; x++)
        B[x] = s[y + x];
      for (let x = 0; x < 10; x++)
        s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
    }
    s[0] ^= SHA3_IOTA_H[round];
    s[1] ^= SHA3_IOTA_L[round];
  }
  clean(B);
}
var _0n, _1n, _2n, _7n, _256n, _0x71n, SHA3_PI, SHA3_ROTL, _SHA3_IOTA, IOTAS, SHA3_IOTA_H, SHA3_IOTA_L, rotlH, rotlL, Keccak, gen, keccak_256;
var init_sha3 = __esm({
  "node_modules/@noble/hashes/esm/sha3.js"() {
    init_u64();
    init_utils2();
    _0n = BigInt(0);
    _1n = BigInt(1);
    _2n = BigInt(2);
    _7n = BigInt(7);
    _256n = BigInt(256);
    _0x71n = BigInt(113);
    SHA3_PI = [];
    SHA3_ROTL = [];
    _SHA3_IOTA = [];
    for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
      [x, y] = [y, (2 * x + 3 * y) % 5];
      SHA3_PI.push(2 * (5 * y + x));
      SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
      let t = _0n;
      for (let j = 0; j < 7; j++) {
        R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
        if (R & _2n)
          t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
      }
      _SHA3_IOTA.push(t);
    }
    IOTAS = split(_SHA3_IOTA, true);
    SHA3_IOTA_H = IOTAS[0];
    SHA3_IOTA_L = IOTAS[1];
    rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
    rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
    Keccak = class _Keccak extends Hash {
      // NOTE: we accept arguments in bytes instead of bits here.
      constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
        super();
        this.pos = 0;
        this.posOut = 0;
        this.finished = false;
        this.destroyed = false;
        this.enableXOF = false;
        this.blockLen = blockLen;
        this.suffix = suffix;
        this.outputLen = outputLen;
        this.enableXOF = enableXOF;
        this.rounds = rounds;
        anumber(outputLen);
        if (!(0 < blockLen && blockLen < 200))
          throw new Error("only keccak-f1600 function is supported");
        this.state = new Uint8Array(200);
        this.state32 = u32(this.state);
      }
      clone() {
        return this._cloneInto();
      }
      keccak() {
        swap32IfBE(this.state32);
        keccakP(this.state32, this.rounds);
        swap32IfBE(this.state32);
        this.posOut = 0;
        this.pos = 0;
      }
      update(data) {
        aexists(this);
        data = toBytes2(data);
        abytes(data);
        const { blockLen, state } = this;
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          for (let i = 0; i < take; i++)
            state[this.pos++] ^= data[pos++];
          if (this.pos === blockLen)
            this.keccak();
        }
        return this;
      }
      finish() {
        if (this.finished)
          return;
        this.finished = true;
        const { state, suffix, pos, blockLen } = this;
        state[pos] ^= suffix;
        if ((suffix & 128) !== 0 && pos === blockLen - 1)
          this.keccak();
        state[blockLen - 1] ^= 128;
        this.keccak();
      }
      writeInto(out) {
        aexists(this, false);
        abytes(out);
        this.finish();
        const bufferOut = this.state;
        const { blockLen } = this;
        for (let pos = 0, len = out.length; pos < len; ) {
          if (this.posOut >= blockLen)
            this.keccak();
          const take = Math.min(blockLen - this.posOut, len - pos);
          out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
          this.posOut += take;
          pos += take;
        }
        return out;
      }
      xofInto(out) {
        if (!this.enableXOF)
          throw new Error("XOF is not possible for this instance");
        return this.writeInto(out);
      }
      xof(bytes) {
        anumber(bytes);
        return this.xofInto(new Uint8Array(bytes));
      }
      digestInto(out) {
        aoutput(out, this);
        if (this.finished)
          throw new Error("digest() was already called");
        this.writeInto(out);
        this.destroy();
        return out;
      }
      digest() {
        return this.digestInto(new Uint8Array(this.outputLen));
      }
      destroy() {
        this.destroyed = true;
        clean(this.state);
      }
      _cloneInto(to) {
        const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
        to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
        to.state32.set(this.state32);
        to.pos = this.pos;
        to.posOut = this.posOut;
        to.finished = this.finished;
        to.rounds = rounds;
        to.suffix = suffix;
        to.outputLen = outputLen;
        to.enableXOF = enableXOF;
        to.destroyed = this.destroyed;
        return to;
      }
    };
    gen = (suffix, blockLen, outputLen) => createHasher(() => new Keccak(blockLen, suffix, outputLen));
    keccak_256 = /* @__PURE__ */ (() => gen(1, 136, 256 / 8))();
  }
});

// node_modules/viem/_esm/utils/hash/keccak256.js
function keccak256(value, to_) {
  const to = to_ || "hex";
  const bytes = keccak_256(isHex(value, { strict: false }) ? toBytes(value) : value);
  if (to === "bytes")
    return bytes;
  return toHex(bytes);
}
var init_keccak256 = __esm({
  "node_modules/viem/_esm/utils/hash/keccak256.js"() {
    init_sha3();
    init_isHex();
    init_toBytes();
    init_toHex();
  }
});

// node_modules/viem/_esm/utils/hash/hashSignature.js
function hashSignature(sig) {
  return hash(sig);
}
var hash;
var init_hashSignature = __esm({
  "node_modules/viem/_esm/utils/hash/hashSignature.js"() {
    init_toBytes();
    init_keccak256();
    hash = (value) => keccak256(toBytes(value));
  }
});

// node_modules/viem/_esm/utils/hash/normalizeSignature.js
function normalizeSignature(signature) {
  let active = true;
  let current = "";
  let level = 0;
  let result = "";
  let valid = false;
  for (let i = 0; i < signature.length; i++) {
    const char = signature[i];
    if (["(", ")", ","].includes(char))
      active = true;
    if (char === "(")
      level++;
    if (char === ")")
      level--;
    if (!active)
      continue;
    if (level === 0) {
      if (char === " " && ["event", "function", ""].includes(result))
        result = "";
      else {
        result += char;
        if (char === ")") {
          valid = true;
          break;
        }
      }
      continue;
    }
    if (char === " ") {
      if (signature[i - 1] !== "," && current !== "," && current !== ",(") {
        current = "";
        active = false;
      }
      continue;
    }
    result += char;
    current += char;
  }
  if (!valid)
    throw new BaseError2("Unable to normalize signature.");
  return result;
}
var init_normalizeSignature = __esm({
  "node_modules/viem/_esm/utils/hash/normalizeSignature.js"() {
    init_base();
  }
});

// node_modules/viem/_esm/utils/hash/toSignature.js
var toSignature;
var init_toSignature = __esm({
  "node_modules/viem/_esm/utils/hash/toSignature.js"() {
    init_exports();
    init_normalizeSignature();
    toSignature = (def) => {
      const def_ = (() => {
        if (typeof def === "string")
          return def;
        return formatAbiItem(def);
      })();
      return normalizeSignature(def_);
    };
  }
});

// node_modules/viem/_esm/utils/hash/toSignatureHash.js
function toSignatureHash(fn) {
  return hashSignature(toSignature(fn));
}
var init_toSignatureHash = __esm({
  "node_modules/viem/_esm/utils/hash/toSignatureHash.js"() {
    init_hashSignature();
    init_toSignature();
  }
});

// node_modules/viem/_esm/utils/hash/toEventSelector.js
var toEventSelector;
var init_toEventSelector = __esm({
  "node_modules/viem/_esm/utils/hash/toEventSelector.js"() {
    init_toSignatureHash();
    toEventSelector = toSignatureHash;
  }
});

// node_modules/viem/_esm/errors/address.js
var InvalidAddressError;
var init_address = __esm({
  "node_modules/viem/_esm/errors/address.js"() {
    init_base();
    InvalidAddressError = class extends BaseError2 {
      constructor({ address }) {
        super(`Address "${address}" is invalid.`, {
          metaMessages: [
            "- Address must be a hex value of 20 bytes (40 hex characters).",
            "- Address must match its checksum counterpart."
          ],
          name: "InvalidAddressError"
        });
      }
    };
  }
});

// node_modules/viem/_esm/utils/lru.js
var LruMap;
var init_lru = __esm({
  "node_modules/viem/_esm/utils/lru.js"() {
    LruMap = class extends Map {
      constructor(size5) {
        super();
        Object.defineProperty(this, "maxSize", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.maxSize = size5;
      }
      get(key) {
        const value = super.get(key);
        if (super.has(key)) {
          super.delete(key);
          super.set(key, value);
        }
        return value;
      }
      set(key, value) {
        if (super.has(key))
          super.delete(key);
        super.set(key, value);
        if (this.maxSize && this.size > this.maxSize) {
          const firstKey = super.keys().next().value;
          if (firstKey !== void 0)
            super.delete(firstKey);
        }
        return this;
      }
    };
  }
});

// node_modules/viem/_esm/utils/address/getAddress.js
function checksumAddress(address_, chainId) {
  if (checksumAddressCache.has(`${address_}.${chainId}`))
    return checksumAddressCache.get(`${address_}.${chainId}`);
  const hexAddress = chainId ? `${chainId}${address_.toLowerCase()}` : address_.substring(2).toLowerCase();
  const hash3 = keccak256(stringToBytes(hexAddress), "bytes");
  const address = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split("");
  for (let i = 0; i < 40; i += 2) {
    if (hash3[i >> 1] >> 4 >= 8 && address[i]) {
      address[i] = address[i].toUpperCase();
    }
    if ((hash3[i >> 1] & 15) >= 8 && address[i + 1]) {
      address[i + 1] = address[i + 1].toUpperCase();
    }
  }
  const result = `0x${address.join("")}`;
  checksumAddressCache.set(`${address_}.${chainId}`, result);
  return result;
}
function getAddress(address, chainId) {
  if (!isAddress(address, { strict: false }))
    throw new InvalidAddressError({ address });
  return checksumAddress(address, chainId);
}
var checksumAddressCache;
var init_getAddress = __esm({
  "node_modules/viem/_esm/utils/address/getAddress.js"() {
    init_address();
    init_toBytes();
    init_keccak256();
    init_lru();
    init_isAddress();
    checksumAddressCache = /* @__PURE__ */ new LruMap(8192);
  }
});

// node_modules/viem/_esm/utils/address/isAddress.js
function isAddress(address, options) {
  const { strict = true } = options ?? {};
  const cacheKey2 = `${address}.${strict}`;
  if (isAddressCache.has(cacheKey2))
    return isAddressCache.get(cacheKey2);
  const result = (() => {
    if (!addressRegex.test(address))
      return false;
    if (address.toLowerCase() === address)
      return true;
    if (strict)
      return checksumAddress(address) === address;
    return true;
  })();
  isAddressCache.set(cacheKey2, result);
  return result;
}
var addressRegex, isAddressCache;
var init_isAddress = __esm({
  "node_modules/viem/_esm/utils/address/isAddress.js"() {
    init_lru();
    init_getAddress();
    addressRegex = /^0x[a-fA-F0-9]{40}$/;
    isAddressCache = /* @__PURE__ */ new LruMap(8192);
  }
});

// node_modules/viem/_esm/utils/data/concat.js
function concat(values) {
  if (typeof values[0] === "string")
    return concatHex(values);
  return concatBytes2(values);
}
function concatBytes2(values) {
  let length = 0;
  for (const arr of values) {
    length += arr.length;
  }
  const result = new Uint8Array(length);
  let offset = 0;
  for (const arr of values) {
    result.set(arr, offset);
    offset += arr.length;
  }
  return result;
}
function concatHex(values) {
  return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
}
var init_concat = __esm({
  "node_modules/viem/_esm/utils/data/concat.js"() {
  }
});

// node_modules/viem/_esm/utils/data/slice.js
function slice(value, start, end, { strict } = {}) {
  if (isHex(value, { strict: false }))
    return sliceHex(value, start, end, {
      strict
    });
  return sliceBytes(value, start, end, {
    strict
  });
}
function assertStartOffset(value, start) {
  if (typeof start === "number" && start > 0 && start > size(value) - 1)
    throw new SliceOffsetOutOfBoundsError({
      offset: start,
      position: "start",
      size: size(value)
    });
}
function assertEndOffset(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError({
      offset: end,
      position: "end",
      size: size(value)
    });
  }
}
function sliceBytes(value_, start, end, { strict } = {}) {
  assertStartOffset(value_, start);
  const value = value_.slice(start, end);
  if (strict)
    assertEndOffset(value, start, end);
  return value;
}
function sliceHex(value_, start, end, { strict } = {}) {
  assertStartOffset(value_, start);
  const value = `0x${value_.replace("0x", "").slice((start ?? 0) * 2, (end ?? value_.length) * 2)}`;
  if (strict)
    assertEndOffset(value, start, end);
  return value;
}
var init_slice = __esm({
  "node_modules/viem/_esm/utils/data/slice.js"() {
    init_data();
    init_isHex();
    init_size();
  }
});

// node_modules/viem/_esm/utils/regex.js
var bytesRegex2, integerRegex2;
var init_regex2 = __esm({
  "node_modules/viem/_esm/utils/regex.js"() {
    bytesRegex2 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
    integerRegex2 = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
  }
});

// node_modules/viem/_esm/utils/abi/encodeAbiParameters.js
function encodeAbiParameters(params, values) {
  if (params.length !== values.length)
    throw new AbiEncodingLengthMismatchError({
      expectedLength: params.length,
      givenLength: values.length
    });
  const preparedParams = prepareParams({
    params,
    values
  });
  return encodeParams(preparedParams);
}
function prepareParams({ params, values }) {
  const preparedParams = [];
  for (let i = 0; i < params.length; i++) {
    preparedParams.push(prepareParam({ param: params[i], value: values[i] }));
  }
  return preparedParams;
}
function prepareParam({ param, value }) {
  const arrayComponents = getArrayComponents(param.type);
  if (arrayComponents) {
    const [length, type] = arrayComponents;
    return encodeArray(value, { length, param: { ...param, type } });
  }
  if (param.type === "tuple") {
    return encodeTuple(value, {
      param
    });
  }
  if (param.type === "address") {
    return encodeAddress(value);
  }
  if (param.type === "bool") {
    return encodeBool(value);
  }
  if (param.type.startsWith("uint") || param.type.startsWith("int")) {
    const signed = param.type.startsWith("int");
    const [, , size5 = "256"] = integerRegex2.exec(param.type) ?? [];
    return encodeNumber(value, {
      signed,
      size: Number(size5)
    });
  }
  if (param.type.startsWith("bytes")) {
    return encodeBytes(value, { param });
  }
  if (param.type === "string") {
    return encodeString(value);
  }
  throw new InvalidAbiEncodingTypeError(param.type, {
    docsPath: "/docs/contract/encodeAbiParameters"
  });
}
function encodeParams(preparedParams) {
  let staticSize = 0;
  for (let i = 0; i < preparedParams.length; i++) {
    const { dynamic, encoded } = preparedParams[i];
    if (dynamic)
      staticSize += 32;
    else
      staticSize += size(encoded);
  }
  const staticParams = [];
  const dynamicParams = [];
  let dynamicSize = 0;
  for (let i = 0; i < preparedParams.length; i++) {
    const { dynamic, encoded } = preparedParams[i];
    if (dynamic) {
      staticParams.push(numberToHex(staticSize + dynamicSize, { size: 32 }));
      dynamicParams.push(encoded);
      dynamicSize += size(encoded);
    } else {
      staticParams.push(encoded);
    }
  }
  return concatHex([...staticParams, ...dynamicParams]);
}
function encodeAddress(value) {
  if (!isAddress(value))
    throw new InvalidAddressError({ address: value });
  return { dynamic: false, encoded: padHex(value.toLowerCase()) };
}
function encodeArray(value, { length, param }) {
  const dynamic = length === null;
  if (!Array.isArray(value))
    throw new InvalidArrayError(value);
  if (!dynamic && value.length !== length)
    throw new AbiEncodingArrayLengthMismatchError({
      expectedLength: length,
      givenLength: value.length,
      type: `${param.type}[${length}]`
    });
  let dynamicChild = value.length === 0 && isDynamicType(param);
  const preparedParams = [];
  for (let i = 0; i < value.length; i++) {
    const preparedParam = prepareParam({ param, value: value[i] });
    if (preparedParam.dynamic)
      dynamicChild = true;
    preparedParams.push(preparedParam);
  }
  if (dynamic || dynamicChild) {
    const data = encodeParams(preparedParams);
    if (dynamic) {
      const length2 = numberToHex(preparedParams.length, { size: 32 });
      return {
        dynamic: true,
        encoded: concatHex([length2, data])
      };
    }
    if (dynamicChild)
      return { dynamic: true, encoded: data };
  }
  return {
    dynamic: false,
    encoded: concatHex(preparedParams.map(({ encoded }) => encoded))
  };
}
function encodeBytes(value, { param }) {
  const [, paramSize] = param.type.split("bytes");
  const bytesSize = size(value);
  if (!paramSize) {
    let value_ = value;
    if (bytesSize % 32 !== 0)
      value_ = padHex(value_, {
        dir: "right",
        size: Math.ceil((value.length - 2) / 2 / 32) * 32
      });
    return {
      dynamic: true,
      encoded: concatHex([
        padHex(numberToHex(bytesSize, { size: 32 })),
        value_
      ])
    };
  }
  if (bytesSize !== Number.parseInt(paramSize, 10))
    throw new AbiEncodingBytesSizeMismatchError({
      expectedSize: Number.parseInt(paramSize, 10),
      value
    });
  return { dynamic: false, encoded: padHex(value, { dir: "right" }) };
}
function encodeBool(value) {
  if (typeof value !== "boolean")
    throw new BaseError2(`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
  return { dynamic: false, encoded: padHex(boolToHex(value)) };
}
function encodeNumber(value, { signed, size: size5 = 256 }) {
  if (typeof size5 === "number") {
    const max = 2n ** (BigInt(size5) - (signed ? 1n : 0n)) - 1n;
    const min = signed ? -max - 1n : 0n;
    if (value > max || value < min)
      throw new IntegerOutOfRangeError({
        max: max.toString(),
        min: min.toString(),
        signed,
        size: size5 / 8,
        value: value.toString()
      });
  }
  return {
    dynamic: false,
    encoded: numberToHex(value, {
      size: 32,
      signed
    })
  };
}
function encodeString(value) {
  const hexValue = stringToHex(value);
  const partsLength = Math.ceil(size(hexValue) / 32);
  const parts = [];
  for (let i = 0; i < partsLength; i++) {
    parts.push(padHex(slice(hexValue, i * 32, (i + 1) * 32), {
      dir: "right"
    }));
  }
  return {
    dynamic: true,
    encoded: concatHex([
      padHex(numberToHex(size(hexValue), { size: 32 })),
      ...parts
    ])
  };
}
function encodeTuple(value, { param }) {
  let dynamic = false;
  const preparedParams = [];
  for (let i = 0; i < param.components.length; i++) {
    const param_ = param.components[i];
    const index2 = Array.isArray(value) ? i : param_.name;
    const preparedParam = prepareParam({
      param: param_,
      value: value[index2]
    });
    preparedParams.push(preparedParam);
    if (preparedParam.dynamic)
      dynamic = true;
  }
  return {
    dynamic,
    encoded: dynamic ? encodeParams(preparedParams) : concatHex(preparedParams.map(({ encoded }) => encoded))
  };
}
function getArrayComponents(type) {
  const matches = type.match(/^(.*)\[(\d+)?\]$/);
  return matches ? (
    // Return `null` if the array is dynamic.
    [matches[2] ? Number(matches[2]) : null, matches[1]]
  ) : void 0;
}
function isDynamicType(param) {
  const { type } = param;
  if (type === "string")
    return true;
  if (type === "bytes")
    return true;
  if (type.endsWith("[]"))
    return true;
  if (type === "tuple")
    return param.components.some(isDynamicType);
  const arrayComponents = getArrayComponents(type);
  if (arrayComponents)
    return isDynamicType({ ...param, type: arrayComponents[1] });
  return false;
}
var init_encodeAbiParameters = __esm({
  "node_modules/viem/_esm/utils/abi/encodeAbiParameters.js"() {
    init_abi();
    init_address();
    init_base();
    init_encoding();
    init_isAddress();
    init_concat();
    init_pad();
    init_size();
    init_slice();
    init_toHex();
    init_regex2();
  }
});

// node_modules/viem/_esm/utils/hash/toFunctionSelector.js
var toFunctionSelector;
var init_toFunctionSelector = __esm({
  "node_modules/viem/_esm/utils/hash/toFunctionSelector.js"() {
    init_slice();
    init_toSignatureHash();
    toFunctionSelector = (fn) => slice(toSignatureHash(fn), 0, 4);
  }
});

// node_modules/viem/_esm/utils/abi/getAbiItem.js
function getAbiItem(parameters) {
  const { abi: abi2, args = [], name } = parameters;
  const isSelector = isHex(name, { strict: false });
  const abiItems = abi2.filter((abiItem) => {
    if (isSelector) {
      if (abiItem.type === "function")
        return toFunctionSelector(abiItem) === name;
      if (abiItem.type === "event")
        return toEventSelector(abiItem) === name;
      return false;
    }
    return "name" in abiItem && abiItem.name === name;
  });
  if (abiItems.length === 0)
    return void 0;
  if (abiItems.length === 1)
    return abiItems[0];
  let matchedAbiItem;
  for (const abiItem of abiItems) {
    if (!("inputs" in abiItem))
      continue;
    if (!args || args.length === 0) {
      if (!abiItem.inputs || abiItem.inputs.length === 0)
        return abiItem;
      continue;
    }
    if (!abiItem.inputs)
      continue;
    if (abiItem.inputs.length === 0)
      continue;
    if (abiItem.inputs.length !== args.length)
      continue;
    const matched = args.every((arg, index2) => {
      const abiParameter = "inputs" in abiItem && abiItem.inputs[index2];
      if (!abiParameter)
        return false;
      return isArgOfType(arg, abiParameter);
    });
    if (matched) {
      if (matchedAbiItem && "inputs" in matchedAbiItem && matchedAbiItem.inputs) {
        const ambiguousTypes = getAmbiguousTypes(abiItem.inputs, matchedAbiItem.inputs, args);
        if (ambiguousTypes)
          throw new AbiItemAmbiguityError({
            abiItem,
            type: ambiguousTypes[0]
          }, {
            abiItem: matchedAbiItem,
            type: ambiguousTypes[1]
          });
      }
      matchedAbiItem = abiItem;
    }
  }
  if (matchedAbiItem)
    return matchedAbiItem;
  return abiItems[0];
}
function isArgOfType(arg, abiParameter) {
  const argType = typeof arg;
  const abiParameterType = abiParameter.type;
  switch (abiParameterType) {
    case "address":
      return isAddress(arg, { strict: false });
    case "bool":
      return argType === "boolean";
    case "function":
      return argType === "string";
    case "string":
      return argType === "string";
    default: {
      if (abiParameterType === "tuple" && "components" in abiParameter)
        return Object.values(abiParameter.components).every((component, index2) => {
          return argType === "object" && isArgOfType(Object.values(arg)[index2], component);
        });
      if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(abiParameterType))
        return argType === "number" || argType === "bigint";
      if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
        return argType === "string" || arg instanceof Uint8Array;
      if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
        return Array.isArray(arg) && arg.every((x) => isArgOfType(x, {
          ...abiParameter,
          // Pop off `[]` or `[M]` from end of type
          type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, "")
        }));
      }
      return false;
    }
  }
}
function getAmbiguousTypes(sourceParameters, targetParameters, args) {
  for (const parameterIndex in sourceParameters) {
    const sourceParameter = sourceParameters[parameterIndex];
    const targetParameter = targetParameters[parameterIndex];
    if (sourceParameter.type === "tuple" && targetParameter.type === "tuple" && "components" in sourceParameter && "components" in targetParameter)
      return getAmbiguousTypes(sourceParameter.components, targetParameter.components, args[parameterIndex]);
    const types = [sourceParameter.type, targetParameter.type];
    const ambiguous = (() => {
      if (types.includes("address") && types.includes("bytes20"))
        return true;
      if (types.includes("address") && types.includes("string"))
        return isAddress(args[parameterIndex], { strict: false });
      if (types.includes("address") && types.includes("bytes"))
        return isAddress(args[parameterIndex], { strict: false });
      return false;
    })();
    if (ambiguous)
      return types;
  }
  return;
}
var init_getAbiItem = __esm({
  "node_modules/viem/_esm/utils/abi/getAbiItem.js"() {
    init_abi();
    init_isHex();
    init_isAddress();
    init_toEventSelector();
    init_toFunctionSelector();
  }
});

// node_modules/viem/_esm/accounts/utils/parseAccount.js
function parseAccount(account) {
  if (typeof account === "string")
    return { address: account, type: "json-rpc" };
  return account;
}
var init_parseAccount = __esm({
  "node_modules/viem/_esm/accounts/utils/parseAccount.js"() {
  }
});

// node_modules/viem/_esm/utils/abi/prepareEncodeFunctionData.js
function prepareEncodeFunctionData(parameters) {
  const { abi: abi2, args, functionName } = parameters;
  let abiItem = abi2[0];
  if (functionName) {
    const item = getAbiItem({
      abi: abi2,
      args,
      name: functionName
    });
    if (!item)
      throw new AbiFunctionNotFoundError(functionName, { docsPath: docsPath2 });
    abiItem = item;
  }
  if (abiItem.type !== "function")
    throw new AbiFunctionNotFoundError(void 0, { docsPath: docsPath2 });
  return {
    abi: [abiItem],
    functionName: toFunctionSelector(formatAbiItem2(abiItem))
  };
}
var docsPath2;
var init_prepareEncodeFunctionData = __esm({
  "node_modules/viem/_esm/utils/abi/prepareEncodeFunctionData.js"() {
    init_abi();
    init_toFunctionSelector();
    init_formatAbiItem2();
    init_getAbiItem();
    docsPath2 = "/docs/contract/encodeFunctionData";
  }
});

// node_modules/viem/_esm/utils/abi/encodeFunctionData.js
function encodeFunctionData(parameters) {
  const { args } = parameters;
  const { abi: abi2, functionName } = (() => {
    if (parameters.abi.length === 1 && parameters.functionName?.startsWith("0x"))
      return parameters;
    return prepareEncodeFunctionData(parameters);
  })();
  const abiItem = abi2[0];
  const signature = functionName;
  const data = "inputs" in abiItem && abiItem.inputs ? encodeAbiParameters(abiItem.inputs, args ?? []) : void 0;
  return concatHex([signature, data ?? "0x"]);
}
var init_encodeFunctionData = __esm({
  "node_modules/viem/_esm/utils/abi/encodeFunctionData.js"() {
    init_concat();
    init_encodeAbiParameters();
    init_prepareEncodeFunctionData();
  }
});

// node_modules/viem/_esm/constants/solidity.js
var panicReasons, solidityError, solidityPanic;
var init_solidity = __esm({
  "node_modules/viem/_esm/constants/solidity.js"() {
    panicReasons = {
      1: "An `assert` condition failed.",
      17: "Arithmetic operation resulted in underflow or overflow.",
      18: "Division or modulo by zero (e.g. `5 / 0` or `23 % 0`).",
      33: "Attempted to convert to an invalid type.",
      34: "Attempted to access a storage byte array that is incorrectly encoded.",
      49: "Performed `.pop()` on an empty array",
      50: "Array index is out of bounds.",
      65: "Allocated too much memory or created an array which is too large.",
      81: "Attempted to call a zero-initialized variable of internal function type."
    };
    solidityError = {
      inputs: [
        {
          name: "message",
          type: "string"
        }
      ],
      name: "Error",
      type: "error"
    };
    solidityPanic = {
      inputs: [
        {
          name: "reason",
          type: "uint256"
        }
      ],
      name: "Panic",
      type: "error"
    };
  }
});

// node_modules/viem/_esm/errors/cursor.js
var NegativeOffsetError, PositionOutOfBoundsError, RecursiveReadLimitExceededError;
var init_cursor = __esm({
  "node_modules/viem/_esm/errors/cursor.js"() {
    init_base();
    NegativeOffsetError = class extends BaseError2 {
      constructor({ offset }) {
        super(`Offset \`${offset}\` cannot be negative.`, {
          name: "NegativeOffsetError"
        });
      }
    };
    PositionOutOfBoundsError = class extends BaseError2 {
      constructor({ length, position }) {
        super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`, { name: "PositionOutOfBoundsError" });
      }
    };
    RecursiveReadLimitExceededError = class extends BaseError2 {
      constructor({ count, limit }) {
        super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`, { name: "RecursiveReadLimitExceededError" });
      }
    };
  }
});

// node_modules/viem/_esm/utils/cursor.js
function createCursor(bytes, { recursiveReadLimit = 8192 } = {}) {
  const cursor = Object.create(staticCursor);
  cursor.bytes = bytes;
  cursor.dataView = new DataView(bytes.buffer ?? bytes, bytes.byteOffset, bytes.byteLength);
  cursor.positionReadCount = /* @__PURE__ */ new Map();
  cursor.recursiveReadLimit = recursiveReadLimit;
  return cursor;
}
var staticCursor;
var init_cursor2 = __esm({
  "node_modules/viem/_esm/utils/cursor.js"() {
    init_cursor();
    staticCursor = {
      bytes: new Uint8Array(),
      dataView: new DataView(new ArrayBuffer(0)),
      position: 0,
      positionReadCount: /* @__PURE__ */ new Map(),
      recursiveReadCount: 0,
      recursiveReadLimit: Number.POSITIVE_INFINITY,
      assertReadLimit() {
        if (this.recursiveReadCount >= this.recursiveReadLimit)
          throw new RecursiveReadLimitExceededError({
            count: this.recursiveReadCount + 1,
            limit: this.recursiveReadLimit
          });
      },
      assertPosition(position) {
        if (position < 0 || position > this.bytes.length - 1)
          throw new PositionOutOfBoundsError({
            length: this.bytes.length,
            position
          });
      },
      decrementPosition(offset) {
        if (offset < 0)
          throw new NegativeOffsetError({ offset });
        const position = this.position - offset;
        this.assertPosition(position);
        this.position = position;
      },
      getReadCount(position) {
        return this.positionReadCount.get(position || this.position) || 0;
      },
      incrementPosition(offset) {
        if (offset < 0)
          throw new NegativeOffsetError({ offset });
        const position = this.position + offset;
        this.assertPosition(position);
        this.position = position;
      },
      inspectByte(position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position);
        return this.bytes[position];
      },
      inspectBytes(length, position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position + length - 1);
        return this.bytes.subarray(position, position + length);
      },
      inspectUint8(position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position);
        return this.bytes[position];
      },
      inspectUint16(position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position + 1);
        return this.dataView.getUint16(position);
      },
      inspectUint24(position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position + 2);
        return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
      },
      inspectUint32(position_) {
        const position = position_ ?? this.position;
        this.assertPosition(position + 3);
        return this.dataView.getUint32(position);
      },
      pushByte(byte) {
        this.assertPosition(this.position);
        this.bytes[this.position] = byte;
        this.position++;
      },
      pushBytes(bytes) {
        this.assertPosition(this.position + bytes.length - 1);
        this.bytes.set(bytes, this.position);
        this.position += bytes.length;
      },
      pushUint8(value) {
        this.assertPosition(this.position);
        this.bytes[this.position] = value;
        this.position++;
      },
      pushUint16(value) {
        this.assertPosition(this.position + 1);
        this.dataView.setUint16(this.position, value);
        this.position += 2;
      },
      pushUint24(value) {
        this.assertPosition(this.position + 2);
        this.dataView.setUint16(this.position, value >> 8);
        this.dataView.setUint8(this.position + 2, value & ~4294967040);
        this.position += 3;
      },
      pushUint32(value) {
        this.assertPosition(this.position + 3);
        this.dataView.setUint32(this.position, value);
        this.position += 4;
      },
      readByte() {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectByte();
        this.position++;
        return value;
      },
      readBytes(length, size5) {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectBytes(length);
        this.position += size5 ?? length;
        return value;
      },
      readUint8() {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectUint8();
        this.position += 1;
        return value;
      },
      readUint16() {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectUint16();
        this.position += 2;
        return value;
      },
      readUint24() {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectUint24();
        this.position += 3;
        return value;
      },
      readUint32() {
        this.assertReadLimit();
        this._touch();
        const value = this.inspectUint32();
        this.position += 4;
        return value;
      },
      get remaining() {
        return this.bytes.length - this.position;
      },
      setPosition(position) {
        const oldPosition = this.position;
        this.assertPosition(position);
        this.position = position;
        return () => this.position = oldPosition;
      },
      _touch() {
        if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
          return;
        const count = this.getReadCount();
        this.positionReadCount.set(this.position, count + 1);
        if (count > 0)
          this.recursiveReadCount++;
      }
    };
  }
});

// node_modules/viem/_esm/utils/encoding/fromBytes.js
function bytesToBigInt(bytes, opts = {}) {
  if (typeof opts.size !== "undefined")
    assertSize(bytes, { size: opts.size });
  const hex = bytesToHex(bytes);
  return hexToBigInt(hex, opts);
}
function bytesToBool(bytes_, opts = {}) {
  let bytes = bytes_;
  if (typeof opts.size !== "undefined") {
    assertSize(bytes, { size: opts.size });
    bytes = trim(bytes);
  }
  if (bytes.length > 1 || bytes[0] > 1)
    throw new InvalidBytesBooleanError(bytes);
  return Boolean(bytes[0]);
}
function bytesToNumber(bytes, opts = {}) {
  if (typeof opts.size !== "undefined")
    assertSize(bytes, { size: opts.size });
  const hex = bytesToHex(bytes);
  return hexToNumber(hex, opts);
}
function bytesToString(bytes_, opts = {}) {
  let bytes = bytes_;
  if (typeof opts.size !== "undefined") {
    assertSize(bytes, { size: opts.size });
    bytes = trim(bytes, { dir: "right" });
  }
  return new TextDecoder().decode(bytes);
}
var init_fromBytes = __esm({
  "node_modules/viem/_esm/utils/encoding/fromBytes.js"() {
    init_encoding();
    init_trim();
    init_fromHex();
    init_toHex();
  }
});

// node_modules/viem/_esm/utils/abi/decodeAbiParameters.js
function decodeAbiParameters(params, data) {
  const bytes = typeof data === "string" ? hexToBytes(data) : data;
  const cursor = createCursor(bytes);
  if (size(bytes) === 0 && params.length > 0)
    throw new AbiDecodingZeroDataError();
  if (size(data) && size(data) < 32)
    throw new AbiDecodingDataSizeTooSmallError({
      data: typeof data === "string" ? data : bytesToHex(data),
      params,
      size: size(data)
    });
  let consumed = 0;
  const values = [];
  for (let i = 0; i < params.length; ++i) {
    const param = params[i];
    if (consumed < bytes.length)
      cursor.setPosition(consumed);
    const [data2, consumed_] = decodeParameter(cursor, param, {
      staticPosition: 0
    });
    consumed += consumed_;
    values.push(data2);
  }
  return values;
}
function decodeParameter(cursor, param, { staticPosition }) {
  const arrayComponents = getArrayComponents(param.type);
  if (arrayComponents) {
    const [length, type] = arrayComponents;
    return decodeArray(cursor, { ...param, type }, { length, staticPosition });
  }
  if (param.type === "tuple")
    return decodeTuple(cursor, param, { staticPosition });
  if (param.type === "address")
    return decodeAddress(cursor);
  if (param.type === "bool")
    return decodeBool(cursor);
  if (param.type.startsWith("bytes"))
    return decodeBytes(cursor, param, { staticPosition });
  if (param.type.startsWith("uint") || param.type.startsWith("int"))
    return decodeNumber(cursor, param);
  if (param.type === "string")
    return decodeString(cursor, { staticPosition });
  throw new InvalidAbiDecodingTypeError(param.type, {
    docsPath: "/docs/contract/decodeAbiParameters"
  });
}
function decodeAddress(cursor) {
  const value = cursor.readBytes(32);
  return [checksumAddress(bytesToHex(sliceBytes(value, -20))), 32];
}
function decodeArray(cursor, param, { length, staticPosition }) {
  if (length === null) {
    const offset = bytesToNumber(cursor.readBytes(sizeOfOffset));
    const start = staticPosition + offset;
    const startOfData = start + sizeOfLength;
    cursor.setPosition(start);
    const length2 = bytesToNumber(cursor.readBytes(sizeOfLength));
    const dynamicChild = hasDynamicChild(param);
    let consumed2 = 0;
    const value2 = [];
    for (let i = 0; i < length2; ++i) {
      cursor.setPosition(startOfData + (dynamicChild ? i * 32 : consumed2));
      const [data, consumed_] = decodeParameter(cursor, param, {
        staticPosition: startOfData
      });
      consumed2 += consumed_;
      value2.push(data);
      if (consumed_ === 0) {
        cursor.assertReadLimit();
        cursor._touch();
      }
    }
    cursor.setPosition(staticPosition + 32);
    return [value2, 32];
  }
  if (hasDynamicChild(param)) {
    const offset = bytesToNumber(cursor.readBytes(sizeOfOffset));
    const start = staticPosition + offset;
    const value2 = [];
    for (let i = 0; i < length; ++i) {
      cursor.setPosition(start + i * 32);
      const [data] = decodeParameter(cursor, param, {
        staticPosition: start
      });
      value2.push(data);
    }
    cursor.setPosition(staticPosition + 32);
    return [value2, 32];
  }
  let consumed = 0;
  const value = [];
  for (let i = 0; i < length; ++i) {
    const [data, consumed_] = decodeParameter(cursor, param, {
      staticPosition: staticPosition + consumed
    });
    consumed += consumed_;
    value.push(data);
    if (consumed_ === 0) {
      cursor.assertReadLimit();
      cursor._touch();
    }
  }
  return [value, consumed];
}
function decodeBool(cursor) {
  return [bytesToBool(cursor.readBytes(32), { size: 32 }), 32];
}
function decodeBytes(cursor, param, { staticPosition }) {
  const [_, size5] = param.type.split("bytes");
  if (!size5) {
    const offset = bytesToNumber(cursor.readBytes(32));
    cursor.setPosition(staticPosition + offset);
    const length = bytesToNumber(cursor.readBytes(32));
    if (length === 0) {
      cursor.setPosition(staticPosition + 32);
      return ["0x", 32];
    }
    const data = cursor.readBytes(length);
    cursor.setPosition(staticPosition + 32);
    return [bytesToHex(data), 32];
  }
  const value = bytesToHex(cursor.readBytes(Number.parseInt(size5, 10), 32));
  return [value, 32];
}
function decodeNumber(cursor, param) {
  const signed = param.type.startsWith("int");
  const size5 = Number.parseInt(param.type.split("int")[1] || "256", 10);
  const value = cursor.readBytes(32);
  return [
    size5 > 48 ? bytesToBigInt(value, { signed }) : bytesToNumber(value, { signed }),
    32
  ];
}
function decodeTuple(cursor, param, { staticPosition }) {
  const hasUnnamedChild = param.components.length === 0 || param.components.some(({ name }) => !name);
  const value = hasUnnamedChild ? [] : {};
  let consumed = 0;
  if (hasDynamicChild(param)) {
    const offset = bytesToNumber(cursor.readBytes(sizeOfOffset));
    const start = staticPosition + offset;
    for (let i = 0; i < param.components.length; ++i) {
      const component = param.components[i];
      cursor.setPosition(start + consumed);
      const [data, consumed_] = decodeParameter(cursor, component, {
        staticPosition: start
      });
      consumed += consumed_;
      value[hasUnnamedChild ? i : component?.name] = data;
    }
    cursor.setPosition(staticPosition + 32);
    return [value, 32];
  }
  for (let i = 0; i < param.components.length; ++i) {
    const component = param.components[i];
    const [data, consumed_] = decodeParameter(cursor, component, {
      staticPosition
    });
    value[hasUnnamedChild ? i : component?.name] = data;
    consumed += consumed_;
  }
  return [value, consumed];
}
function decodeString(cursor, { staticPosition }) {
  const offset = bytesToNumber(cursor.readBytes(32));
  const start = staticPosition + offset;
  cursor.setPosition(start);
  const length = bytesToNumber(cursor.readBytes(32));
  if (length === 0) {
    cursor.setPosition(staticPosition + 32);
    return ["", 32];
  }
  const data = cursor.readBytes(length, 32);
  const value = bytesToString(data);
  cursor.setPosition(staticPosition + 32);
  return [value, 32];
}
function hasDynamicChild(param) {
  const { type } = param;
  if (type === "string")
    return true;
  if (type === "bytes")
    return true;
  if (type.endsWith("[]"))
    return true;
  if (type === "tuple")
    return param.components?.some(hasDynamicChild);
  const arrayComponents = getArrayComponents(param.type);
  if (arrayComponents && hasDynamicChild({ ...param, type: arrayComponents[1] }))
    return true;
  return false;
}
var sizeOfLength, sizeOfOffset;
var init_decodeAbiParameters = __esm({
  "node_modules/viem/_esm/utils/abi/decodeAbiParameters.js"() {
    init_abi();
    init_getAddress();
    init_cursor2();
    init_size();
    init_slice();
    init_fromBytes();
    init_toBytes();
    init_toHex();
    init_encodeAbiParameters();
    sizeOfLength = 32;
    sizeOfOffset = 32;
  }
});

// node_modules/viem/_esm/utils/abi/decodeErrorResult.js
function decodeErrorResult(parameters) {
  const { abi: abi2, data, cause } = parameters;
  const signature = slice(data, 0, 4);
  if (signature === "0x")
    throw new AbiDecodingZeroDataError({ cause });
  const abi_ = [...abi2 || [], solidityError, solidityPanic];
  const abiItem = abi_.find((x) => x.type === "error" && signature === toFunctionSelector(formatAbiItem2(x)));
  if (!abiItem)
    throw new AbiErrorSignatureNotFoundError(signature, {
      docsPath: "/docs/contract/decodeErrorResult",
      cause
    });
  return {
    abiItem,
    args: "inputs" in abiItem && abiItem.inputs && abiItem.inputs.length > 0 ? decodeAbiParameters(abiItem.inputs, slice(data, 4)) : void 0,
    errorName: abiItem.name
  };
}
var init_decodeErrorResult = __esm({
  "node_modules/viem/_esm/utils/abi/decodeErrorResult.js"() {
    init_solidity();
    init_abi();
    init_slice();
    init_toFunctionSelector();
    init_decodeAbiParameters();
    init_formatAbiItem2();
  }
});

// node_modules/viem/_esm/utils/stringify.js
var stringify;
var init_stringify = __esm({
  "node_modules/viem/_esm/utils/stringify.js"() {
    stringify = (value, replacer, space) => JSON.stringify(value, (key, value_) => {
      const value2 = typeof value_ === "bigint" ? value_.toString() : value_;
      return typeof replacer === "function" ? replacer(key, value2) : value2;
    }, space);
  }
});

// node_modules/viem/_esm/utils/abi/formatAbiItemWithArgs.js
function formatAbiItemWithArgs({ abiItem, args, includeFunctionName = true, includeName = false }) {
  if (!("name" in abiItem))
    return;
  if (!("inputs" in abiItem))
    return;
  if (!abiItem.inputs)
    return;
  return `${includeFunctionName ? abiItem.name : ""}(${abiItem.inputs.map((input, i) => `${includeName && input.name ? `${input.name}: ` : ""}${typeof args[i] === "object" ? stringify(args[i]) : args[i]}`).join(", ")})`;
}
var init_formatAbiItemWithArgs = __esm({
  "node_modules/viem/_esm/utils/abi/formatAbiItemWithArgs.js"() {
    init_stringify();
  }
});

// node_modules/viem/_esm/utils/unit/Value.js
function format(value, decimals = 0) {
  if (!Number.isInteger(decimals) || decimals < 0)
    throw new InvalidDecimalsError({ decimals });
  let display = value.toString();
  const negative = display.startsWith("-");
  if (negative)
    display = display.slice(1);
  display = display.padStart(decimals, "0");
  let [integer, fraction] = [
    display.slice(0, display.length - decimals),
    display.slice(display.length - decimals)
  ];
  fraction = fraction.replace(/(0+)$/, "");
  return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`;
}
function formatEther(wei, unit2 = "wei") {
  return format(wei, exponents.ether - exponents[unit2]);
}
function formatGwei(wei, unit2 = "wei") {
  return format(wei, exponents.gwei - exponents[unit2]);
}
var exponents, InvalidDecimalsError;
var init_Value = __esm({
  "node_modules/viem/_esm/utils/unit/Value.js"() {
    exponents = {
      wei: 0,
      gwei: 9,
      szabo: 12,
      finney: 15,
      ether: 18
    };
    InvalidDecimalsError = class extends Error {
      constructor({ decimals }) {
        super(`\`decimals\` must be a non-negative integer. Got \`${decimals}\`.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Value.InvalidDecimalsError"
        });
      }
    };
  }
});

// node_modules/viem/_esm/utils/unit/formatEther.js
function formatEther2(wei, unit2 = "wei") {
  return formatEther(wei, unit2);
}
var init_formatEther = __esm({
  "node_modules/viem/_esm/utils/unit/formatEther.js"() {
    init_Value();
  }
});

// node_modules/viem/_esm/utils/unit/formatGwei.js
function formatGwei2(wei, unit2 = "wei") {
  return formatGwei(wei, unit2);
}
var init_formatGwei = __esm({
  "node_modules/viem/_esm/utils/unit/formatGwei.js"() {
    init_Value();
  }
});

// node_modules/viem/_esm/errors/stateOverride.js
function prettyStateMapping(stateMapping) {
  return stateMapping.reduce((pretty, { slot, value }) => {
    return `${pretty}        ${slot}: ${value}
`;
  }, "");
}
function prettyStateOverride(stateOverride) {
  return stateOverride.reduce((pretty, { address, ...state }) => {
    let val = `${pretty}    ${address}:
`;
    if (state.nonce)
      val += `      nonce: ${state.nonce}
`;
    if (state.balance)
      val += `      balance: ${state.balance}
`;
    if (state.code)
      val += `      code: ${state.code}
`;
    if (state.state) {
      val += "      state:\n";
      val += prettyStateMapping(state.state);
    }
    if (state.stateDiff) {
      val += "      stateDiff:\n";
      val += prettyStateMapping(state.stateDiff);
    }
    return val;
  }, "  State Override:\n").slice(0, -1);
}
var AccountStateConflictError, StateAssignmentConflictError;
var init_stateOverride = __esm({
  "node_modules/viem/_esm/errors/stateOverride.js"() {
    init_base();
    AccountStateConflictError = class extends BaseError2 {
      constructor({ address }) {
        super(`State for account "${address}" is set multiple times.`, {
          name: "AccountStateConflictError"
        });
      }
    };
    StateAssignmentConflictError = class extends BaseError2 {
      constructor() {
        super("state and stateDiff are set on the same account.", {
          name: "StateAssignmentConflictError"
        });
      }
    };
  }
});

// node_modules/viem/_esm/errors/transaction.js
function prettyPrint(args) {
  const entries = Object.entries(args).map(([key, value]) => {
    if (value === void 0 || value === false)
      return null;
    return [key, value];
  }).filter(Boolean);
  const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
  return entries.map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
}
var FeePayerNonceMismatchError, InvalidSerializableTransactionError, TransactionExecutionError, TransactionNotFoundError, TransactionReceiptNotFoundError, TransactionReceiptRevertedError, WaitForTransactionReceiptTimeoutError;
var init_transaction = __esm({
  "node_modules/viem/_esm/errors/transaction.js"() {
    init_formatEther();
    init_formatGwei();
    init_base();
    FeePayerNonceMismatchError = class extends BaseError2 {
      constructor({ filledNonce, requestedNonce }) {
        super("The filled transaction nonce does not match the requested nonce.", {
          metaMessages: [
            `Requested Nonce: ${requestedNonce}`,
            `Filled Nonce: ${filledNonce}`
          ],
          name: "FeePayerNonceMismatchError"
        });
      }
    };
    InvalidSerializableTransactionError = class extends BaseError2 {
      constructor({ transaction }) {
        super("Cannot infer a transaction type from provided transaction.", {
          metaMessages: [
            "Provided Transaction:",
            "{",
            prettyPrint(transaction),
            "}",
            "",
            "To infer the type, either provide:",
            "- a `type` to the Transaction, or",
            "- an EIP-1559 Transaction with `maxFeePerGas`, or",
            "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
            "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or",
            "- an EIP-7702 Transaction with `authorizationList`, or",
            "- a Legacy Transaction with `gasPrice`"
          ],
          name: "InvalidSerializableTransactionError"
        });
      }
    };
    TransactionExecutionError = class extends BaseError2 {
      constructor(cause, { account, docsPath: docsPath8, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
        const prettyArgs = prettyPrint({
          chain: chain && `${chain?.name} (id: ${chain?.id})`,
          from: account?.address,
          to,
          value: typeof value !== "undefined" && `${formatEther2(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
          data,
          gas,
          gasPrice: typeof gasPrice !== "undefined" && `${formatGwei2(gasPrice)} gwei`,
          maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei2(maxFeePerGas)} gwei`,
          maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei2(maxPriorityFeePerGas)} gwei`,
          nonce
        });
        super(cause.shortMessage, {
          cause,
          docsPath: docsPath8,
          metaMessages: [
            ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
            "Request Arguments:",
            prettyArgs
          ].filter(Boolean),
          name: "TransactionExecutionError"
        });
        Object.defineProperty(this, "cause", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.cause = cause;
      }
    };
    TransactionNotFoundError = class extends BaseError2 {
      constructor({ blockHash, blockNumber, blockTag, hash: hash3, index: index2 }) {
        let identifier = "Transaction";
        if (blockTag && index2 !== void 0)
          identifier = `Transaction at block time "${blockTag}" at index "${index2}"`;
        if (blockHash && index2 !== void 0)
          identifier = `Transaction at block hash "${blockHash}" at index "${index2}"`;
        if (blockNumber && index2 !== void 0)
          identifier = `Transaction at block number "${blockNumber}" at index "${index2}"`;
        if (hash3)
          identifier = `Transaction with hash "${hash3}"`;
        super(`${identifier} could not be found.`, {
          name: "TransactionNotFoundError"
        });
      }
    };
    TransactionReceiptNotFoundError = class extends BaseError2 {
      constructor({ hash: hash3 }) {
        super(`Transaction receipt with hash "${hash3}" could not be found. The Transaction may not be processed on a block yet.`, {
          name: "TransactionReceiptNotFoundError"
        });
      }
    };
    TransactionReceiptRevertedError = class extends BaseError2 {
      constructor({ receipt }) {
        super(`Transaction with hash "${receipt.transactionHash}" reverted.`, {
          metaMessages: [
            'The receipt marked the transaction as "reverted". This could mean that the function on the contract you are trying to call threw an error.',
            " ",
            "You can attempt to extract the revert reason by:",
            "- calling the `simulateContract` or `simulateCalls` Action with the `abi` and `functionName` of the contract",
            "- using the `call` Action with raw `data`"
          ],
          name: "TransactionReceiptRevertedError"
        });
        Object.defineProperty(this, "receipt", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.receipt = receipt;
      }
    };
    WaitForTransactionReceiptTimeoutError = class extends BaseError2 {
      constructor({ hash: hash3 }) {
        super(`Timed out while waiting for transaction with hash "${hash3}" to be confirmed.`, { name: "WaitForTransactionReceiptTimeoutError" });
      }
    };
  }
});

// node_modules/viem/_esm/errors/utils.js
function getAbortError(signal) {
  if (signal?.reason)
    return signal.reason;
  if (typeof DOMException === "function")
    return new DOMException("This operation was aborted", "AbortError");
  const error = new Error("This operation was aborted");
  error.name = "AbortError";
  return error;
}
function isAbortError(error) {
  return typeof error === "object" && error !== null && "name" in error && error.name === "AbortError";
}
var getContractAddress, getUrl;
var init_utils3 = __esm({
  "node_modules/viem/_esm/errors/utils.js"() {
    getContractAddress = (address) => address;
    getUrl = (url) => {
      try {
        const parsed = new URL(url);
        if (!parsed.username && !parsed.password)
          return url;
        parsed.username = "";
        parsed.password = "";
        return parsed.toString();
      } catch {
        return url;
      }
    };
  }
});

// node_modules/viem/_esm/errors/contract.js
var CallExecutionError, ContractFunctionExecutionError, ContractFunctionRevertedError, ContractFunctionZeroDataError, CounterfactualDeploymentFailedError, RawContractError;
var init_contract = __esm({
  "node_modules/viem/_esm/errors/contract.js"() {
    init_parseAccount();
    init_solidity();
    init_decodeErrorResult();
    init_formatAbiItem2();
    init_formatAbiItemWithArgs();
    init_getAbiItem();
    init_formatEther();
    init_formatGwei();
    init_abi();
    init_base();
    init_stateOverride();
    init_transaction();
    init_utils3();
    CallExecutionError = class extends BaseError2 {
      constructor(cause, { account: account_, docsPath: docsPath8, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value, stateOverride }) {
        const account = account_ ? parseAccount(account_) : void 0;
        let prettyArgs = prettyPrint({
          from: account?.address,
          to,
          value: typeof value !== "undefined" && `${formatEther2(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
          data,
          gas,
          gasPrice: typeof gasPrice !== "undefined" && `${formatGwei2(gasPrice)} gwei`,
          maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei2(maxFeePerGas)} gwei`,
          maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei2(maxPriorityFeePerGas)} gwei`,
          nonce
        });
        if (stateOverride) {
          prettyArgs += `
${prettyStateOverride(stateOverride)}`;
        }
        super(cause.shortMessage, {
          cause,
          docsPath: docsPath8,
          metaMessages: [
            ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
            "Raw Call Arguments:",
            prettyArgs
          ].filter(Boolean),
          name: "CallExecutionError"
        });
        Object.defineProperty(this, "cause", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.cause = cause;
      }
    };
    ContractFunctionExecutionError = class extends BaseError2 {
      constructor(cause, { abi: abi2, args, contractAddress, docsPath: docsPath8, functionName, sender }) {
        const abiItem = getAbiItem({ abi: abi2, args, name: functionName });
        const formattedArgs = abiItem ? formatAbiItemWithArgs({
          abiItem,
          args,
          includeFunctionName: false,
          includeName: false
        }) : void 0;
        const functionWithParams = abiItem ? formatAbiItem2(abiItem, { includeName: true }) : void 0;
        const prettyArgs = prettyPrint({
          address: contractAddress && getContractAddress(contractAddress),
          function: functionWithParams,
          args: formattedArgs && formattedArgs !== "()" && `${[...Array(functionName?.length ?? 0).keys()].map(() => " ").join("")}${formattedArgs}`,
          sender
        });
        super(cause.shortMessage || `An unknown error occurred while executing the contract function "${functionName}".`, {
          cause,
          docsPath: docsPath8,
          metaMessages: [
            ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
            prettyArgs && "Contract Call:",
            prettyArgs
          ].filter(Boolean),
          name: "ContractFunctionExecutionError"
        });
        Object.defineProperty(this, "abi", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "args", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "cause", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "contractAddress", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "formattedArgs", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "functionName", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "sender", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.abi = abi2;
        this.args = args;
        this.cause = cause;
        this.contractAddress = contractAddress;
        this.functionName = functionName;
        this.sender = sender;
      }
    };
    ContractFunctionRevertedError = class extends BaseError2 {
      constructor({ abi: abi2, data, functionName, message, cause: error }) {
        let cause;
        let decodedData;
        let metaMessages;
        let reason;
        if (data && data !== "0x") {
          try {
            decodedData = decodeErrorResult({ abi: abi2, data, cause: error });
            const { abiItem, errorName, args: errorArgs } = decodedData;
            if (errorName === "Error") {
              reason = errorArgs[0];
            } else if (errorName === "Panic") {
              const [firstArg] = errorArgs;
              reason = panicReasons[firstArg];
            } else {
              const errorWithParams = abiItem ? formatAbiItem2(abiItem, { includeName: true }) : void 0;
              const formattedArgs = abiItem && errorArgs ? formatAbiItemWithArgs({
                abiItem,
                args: errorArgs,
                includeFunctionName: false,
                includeName: false
              }) : void 0;
              metaMessages = [
                errorWithParams ? `Error: ${errorWithParams}` : "",
                formattedArgs && formattedArgs !== "()" ? `       ${[...Array(errorName?.length ?? 0).keys()].map(() => " ").join("")}${formattedArgs}` : ""
              ];
            }
          } catch (err) {
            cause = err;
          }
        } else if (message)
          reason = message;
        let signature;
        if (cause instanceof AbiErrorSignatureNotFoundError) {
          signature = cause.signature;
          metaMessages = [
            `Unable to decode signature "${signature}" as it was not found on the provided ABI.`,
            "Make sure you are using the correct ABI and that the error exists on it.",
            `You can look up the decoded signature here: https://4byte.sourcify.dev/?q=${signature}.`
          ];
        }
        super(reason && reason !== "execution reverted" || signature ? [
          `The contract function "${functionName}" reverted with the following ${signature ? "signature" : "reason"}:`,
          reason || signature
        ].join("\n") : `The contract function "${functionName}" reverted.`, {
          cause: cause ?? error,
          metaMessages,
          name: "ContractFunctionRevertedError"
        });
        Object.defineProperty(this, "data", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "raw", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "reason", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "signature", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.data = decodedData;
        this.raw = data;
        this.reason = reason;
        this.signature = signature;
      }
    };
    ContractFunctionZeroDataError = class extends BaseError2 {
      constructor({ functionName, cause }) {
        super(`The contract function "${functionName}" returned no data ("0x").`, {
          metaMessages: [
            "This could be due to any of the following:",
            `  - The contract does not have the function "${functionName}",`,
            "  - The parameters passed to the contract function may be invalid, or",
            "  - The address is not a contract."
          ],
          name: "ContractFunctionZeroDataError",
          cause
        });
      }
    };
    CounterfactualDeploymentFailedError = class extends BaseError2 {
      constructor({ factory }) {
        super(`Deployment for counterfactual contract call failed${factory ? ` for factory "${factory}".` : ""}`, {
          metaMessages: [
            "Please ensure:",
            "- The `factory` is a valid contract deployment factory (ie. Create2 Factory, ERC-4337 Factory, etc).",
            "- The `factoryData` is a valid encoded function call for contract deployment function on the factory."
          ],
          name: "CounterfactualDeploymentFailedError"
        });
      }
    };
    RawContractError = class extends BaseError2 {
      constructor({ data, message }) {
        super(message || "", { name: "RawContractError" });
        Object.defineProperty(this, "code", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: 3
        });
        Object.defineProperty(this, "data", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.data = data;
      }
    };
  }
});

// node_modules/viem/_esm/errors/request.js
var HttpRequestError, ResponseBodyTooLargeError, RpcRequestError, TimeoutError;
var init_request = __esm({
  "node_modules/viem/_esm/errors/request.js"() {
    init_stringify();
    init_base();
    init_utils3();
    HttpRequestError = class extends BaseError2 {
      constructor({ body, cause, details, headers, status, url }) {
        super("HTTP request failed.", {
          cause,
          details,
          metaMessages: [
            status && `Status: ${status}`,
            `URL: ${getUrl(url)}`,
            body && `Request body: ${stringify(body)}`
          ].filter(Boolean),
          name: "HttpRequestError"
        });
        Object.defineProperty(this, "body", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "headers", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "status", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "url", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.body = body;
        this.headers = headers;
        this.status = status;
        this.url = url;
      }
    };
    ResponseBodyTooLargeError = class extends BaseError2 {
      constructor({ maxSize, size: size5 }) {
        super("HTTP response body exceeded the size limit.", {
          metaMessages: [`Max: ${maxSize} bytes`, `Received: ${size5} bytes`],
          name: "ResponseBodyTooLargeError"
        });
        Object.defineProperty(this, "maxSize", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "size", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.maxSize = maxSize;
        this.size = size5;
      }
    };
    RpcRequestError = class extends BaseError2 {
      constructor({ body, error, url }) {
        super("RPC Request failed.", {
          cause: error,
          details: error.message,
          metaMessages: [`URL: ${getUrl(url)}`, `Request body: ${stringify(body)}`],
          name: "RpcRequestError"
        });
        Object.defineProperty(this, "code", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "data", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "url", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.code = error.code;
        this.data = error.data;
        this.url = url;
      }
    };
    TimeoutError = class extends BaseError2 {
      constructor({ body, url }) {
        super("The request took too long to respond.", {
          details: "The request timed out.",
          metaMessages: [`URL: ${getUrl(url)}`, `Request body: ${stringify(body)}`],
          name: "TimeoutError"
        });
        Object.defineProperty(this, "url", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.url = url;
      }
    };
  }
});

// node_modules/viem/_esm/errors/rpc.js
var unknownErrorCode, RpcError, ProviderRpcError, ParseRpcError, InvalidRequestRpcError, MethodNotFoundRpcError, InvalidParamsRpcError, InternalRpcError, InvalidInputRpcError, ResourceNotFoundRpcError, ResourceUnavailableRpcError, TransactionRejectedRpcError, MethodNotSupportedRpcError, LimitExceededRpcError, JsonRpcVersionUnsupportedError, UserRejectedRequestError, UnauthorizedProviderError, UnsupportedProviderMethodError, ProviderDisconnectedError, ChainDisconnectedError, SwitchChainError, UnsupportedNonOptionalCapabilityError, UnsupportedChainIdError, DuplicateIdError, UnknownBundleIdError, BundleTooLargeError, AtomicReadyWalletRejectedUpgradeError, AtomicityNotSupportedError, WalletConnectSessionSettlementError, UnknownRpcError;
var init_rpc = __esm({
  "node_modules/viem/_esm/errors/rpc.js"() {
    init_base();
    init_request();
    unknownErrorCode = -1;
    RpcError = class extends BaseError2 {
      constructor(cause, { code, docsPath: docsPath8, metaMessages, name, shortMessage }) {
        super(shortMessage, {
          cause,
          docsPath: docsPath8,
          metaMessages: metaMessages || cause?.metaMessages,
          name: name || "RpcError"
        });
        Object.defineProperty(this, "code", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.name = name || cause.name;
        this.code = cause instanceof RpcRequestError ? cause.code : code ?? unknownErrorCode;
      }
    };
    ProviderRpcError = class extends RpcError {
      constructor(cause, options) {
        super(cause, options);
        Object.defineProperty(this, "data", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        this.data = options.data;
      }
    };
    ParseRpcError = class _ParseRpcError extends RpcError {
      constructor(cause) {
        super(cause, {
          code: _ParseRpcError.code,
          name: "ParseRpcError",
          shortMessage: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
        });
      }
    };
    Object.defineProperty(ParseRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32700
    });
    InvalidRequestRpcError = class _InvalidRequestRpcError extends RpcError {
      constructor(cause) {
        super(cause, {
          code: _InvalidRequestRpcError.code,
          name: "InvalidRequestRpcError",
          shortMessage: "JSON is not a valid request object."
        });
      }
    };
    Object.defineProperty(InvalidRequestRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32600
    });
    MethodNotFoundRpcError = class _MethodNotFoundRpcError extends RpcError {
      constructor(cause, { method } = {}) {
        super(cause, {
          code: _MethodNotFoundRpcError.code,
          name: "MethodNotFoundRpcError",
          shortMessage: `The method${method ? ` "${method}"` : ""} does not exist / is not available.`
        });
      }
    };
    Object.defineProperty(MethodNotFoundRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32601
    });
    InvalidParamsRpcError = class _InvalidParamsRpcError extends RpcError {
      constructor(cause) {
        super(cause, {
          code: _InvalidParamsRpcError.code,
          name: "InvalidParamsRpcError",
          shortMessage: [
            "Invalid parameters were provided to the RPC method.",
            "Double check you have provided the correct parameters."
          ].join("\n")
        });
      }
    };
    Object.defineProperty(InvalidParamsRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32602
    });
    InternalRpcError = class _InternalRpcError extends RpcError {
      constructor(cause) {
        super(cause, {
          code: _InternalRpcError.code,
          name: "InternalRpcError",
          shortMessage: "An internal error was received."
        });
      }
    };
    Object.defineProperty(InternalRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32603
    });
    InvalidInputRpcError = class _InvalidInputRpcError extends RpcError {
      constructor(cause) {
        super(cause, {
          code: _InvalidInputRpcError.code,
          name: "InvalidInputRpcError",
          shortMessage: [
            "Missing or invalid parameters.",
            "Double check you have provided the correct parameters."
          ].join("\n")
        });
      }
    };
    Object.defineProperty(InvalidInputRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32e3
    });
    ResourceNotFoundRpcError = class _ResourceNotFoundRpcError extends RpcError {
      constructor(cause) {
        super(cause, {
          code: _ResourceNotFoundRpcError.code,
          name: "ResourceNotFoundRpcError",
          shortMessage: "Requested resource not found."
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "ResourceNotFoundRpcError"
        });
      }
    };
    Object.defineProperty(ResourceNotFoundRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32001
    });
    ResourceUnavailableRpcError = class _ResourceUnavailableRpcError extends RpcError {
      constructor(cause) {
        super(cause, {
          code: _ResourceUnavailableRpcError.code,
          name: "ResourceUnavailableRpcError",
          shortMessage: "Requested resource not available."
        });
      }
    };
    Object.defineProperty(ResourceUnavailableRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32002
    });
    TransactionRejectedRpcError = class _TransactionRejectedRpcError extends RpcError {
      constructor(cause) {
        super(cause, {
          code: _TransactionRejectedRpcError.code,
          name: "TransactionRejectedRpcError",
          shortMessage: "Transaction creation failed."
        });
      }
    };
    Object.defineProperty(TransactionRejectedRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32003
    });
    MethodNotSupportedRpcError = class _MethodNotSupportedRpcError extends RpcError {
      constructor(cause, { method } = {}) {
        super(cause, {
          code: _MethodNotSupportedRpcError.code,
          name: "MethodNotSupportedRpcError",
          shortMessage: `Method${method ? ` "${method}"` : ""} is not supported.`
        });
      }
    };
    Object.defineProperty(MethodNotSupportedRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32004
    });
    LimitExceededRpcError = class _LimitExceededRpcError extends RpcError {
      constructor(cause) {
        super(cause, {
          code: _LimitExceededRpcError.code,
          name: "LimitExceededRpcError",
          shortMessage: "Request exceeds defined limit."
        });
      }
    };
    Object.defineProperty(LimitExceededRpcError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32005
    });
    JsonRpcVersionUnsupportedError = class _JsonRpcVersionUnsupportedError extends RpcError {
      constructor(cause) {
        super(cause, {
          code: _JsonRpcVersionUnsupportedError.code,
          name: "JsonRpcVersionUnsupportedError",
          shortMessage: "Version of JSON-RPC protocol is not supported."
        });
      }
    };
    Object.defineProperty(JsonRpcVersionUnsupportedError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: -32006
    });
    UserRejectedRequestError = class _UserRejectedRequestError extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: _UserRejectedRequestError.code,
          name: "UserRejectedRequestError",
          shortMessage: "User rejected the request."
        });
      }
    };
    Object.defineProperty(UserRejectedRequestError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4001
    });
    UnauthorizedProviderError = class _UnauthorizedProviderError extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: _UnauthorizedProviderError.code,
          name: "UnauthorizedProviderError",
          shortMessage: "The requested method and/or account has not been authorized by the user."
        });
      }
    };
    Object.defineProperty(UnauthorizedProviderError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4100
    });
    UnsupportedProviderMethodError = class _UnsupportedProviderMethodError extends ProviderRpcError {
      constructor(cause, { method } = {}) {
        super(cause, {
          code: _UnsupportedProviderMethodError.code,
          name: "UnsupportedProviderMethodError",
          shortMessage: `The Provider does not support the requested method${method ? ` " ${method}"` : ""}.`
        });
      }
    };
    Object.defineProperty(UnsupportedProviderMethodError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4200
    });
    ProviderDisconnectedError = class _ProviderDisconnectedError extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: _ProviderDisconnectedError.code,
          name: "ProviderDisconnectedError",
          shortMessage: "The Provider is disconnected from all chains."
        });
      }
    };
    Object.defineProperty(ProviderDisconnectedError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4900
    });
    ChainDisconnectedError = class _ChainDisconnectedError extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: _ChainDisconnectedError.code,
          name: "ChainDisconnectedError",
          shortMessage: "The Provider is not connected to the requested chain."
        });
      }
    };
    Object.defineProperty(ChainDisconnectedError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4901
    });
    SwitchChainError = class _SwitchChainError extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: _SwitchChainError.code,
          name: "SwitchChainError",
          shortMessage: "An error occurred when attempting to switch chain."
        });
      }
    };
    Object.defineProperty(SwitchChainError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 4902
    });
    UnsupportedNonOptionalCapabilityError = class _UnsupportedNonOptionalCapabilityError extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: _UnsupportedNonOptionalCapabilityError.code,
          name: "UnsupportedNonOptionalCapabilityError",
          shortMessage: "This Wallet does not support a capability that was not marked as optional."
        });
      }
    };
    Object.defineProperty(UnsupportedNonOptionalCapabilityError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 5700
    });
    UnsupportedChainIdError = class _UnsupportedChainIdError extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: _UnsupportedChainIdError.code,
          name: "UnsupportedChainIdError",
          shortMessage: "This Wallet does not support the requested chain ID."
        });
      }
    };
    Object.defineProperty(UnsupportedChainIdError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 5710
    });
    DuplicateIdError = class _DuplicateIdError extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: _DuplicateIdError.code,
          name: "DuplicateIdError",
          shortMessage: "There is already a bundle submitted with this ID."
        });
      }
    };
    Object.defineProperty(DuplicateIdError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 5720
    });
    UnknownBundleIdError = class _UnknownBundleIdError extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: _UnknownBundleIdError.code,
          name: "UnknownBundleIdError",
          shortMessage: "This bundle id is unknown / has not been submitted"
        });
      }
    };
    Object.defineProperty(UnknownBundleIdError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 5730
    });
    BundleTooLargeError = class _BundleTooLargeError extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: _BundleTooLargeError.code,
          name: "BundleTooLargeError",
          shortMessage: "The call bundle is too large for the Wallet to process."
        });
      }
    };
    Object.defineProperty(BundleTooLargeError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 5740
    });
    AtomicReadyWalletRejectedUpgradeError = class _AtomicReadyWalletRejectedUpgradeError extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: _AtomicReadyWalletRejectedUpgradeError.code,
          name: "AtomicReadyWalletRejectedUpgradeError",
          shortMessage: "The Wallet can support atomicity after an upgrade, but the user rejected the upgrade."
        });
      }
    };
    Object.defineProperty(AtomicReadyWalletRejectedUpgradeError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 5750
    });
    AtomicityNotSupportedError = class _AtomicityNotSupportedError extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: _AtomicityNotSupportedError.code,
          name: "AtomicityNotSupportedError",
          shortMessage: "The wallet does not support atomic execution but the request requires it."
        });
      }
    };
    Object.defineProperty(AtomicityNotSupportedError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 5760
    });
    WalletConnectSessionSettlementError = class _WalletConnectSessionSettlementError extends ProviderRpcError {
      constructor(cause) {
        super(cause, {
          code: _WalletConnectSessionSettlementError.code,
          name: "WalletConnectSessionSettlementError",
          shortMessage: "WalletConnect session settlement failed."
        });
      }
    };
    Object.defineProperty(WalletConnectSessionSettlementError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 7e3
    });
    UnknownRpcError = class extends RpcError {
      constructor(cause) {
        super(cause, {
          name: "UnknownRpcError",
          shortMessage: "An unknown RPC error occurred."
        });
      }
    };
  }
});

// node_modules/@noble/hashes/esm/_md.js
function setBigUint64(view2, byteOffset, value, isLE2) {
  if (typeof view2.setBigUint64 === "function")
    return view2.setBigUint64(byteOffset, value, isLE2);
  const _32n2 = BigInt(32);
  const _u32_max = BigInt(4294967295);
  const wh = Number(value >> _32n2 & _u32_max);
  const wl = Number(value & _u32_max);
  const h = isLE2 ? 4 : 0;
  const l = isLE2 ? 0 : 4;
  view2.setUint32(byteOffset + h, wh, isLE2);
  view2.setUint32(byteOffset + l, wl, isLE2);
}
function Chi(a, b, c) {
  return a & b ^ ~a & c;
}
function Maj(a, b, c) {
  return a & b ^ a & c ^ b & c;
}
var HashMD, SHA256_IV;
var init_md = __esm({
  "node_modules/@noble/hashes/esm/_md.js"() {
    init_utils2();
    HashMD = class extends Hash {
      constructor(blockLen, outputLen, padOffset, isLE2) {
        super();
        this.finished = false;
        this.length = 0;
        this.pos = 0;
        this.destroyed = false;
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.padOffset = padOffset;
        this.isLE = isLE2;
        this.buffer = new Uint8Array(blockLen);
        this.view = createView(this.buffer);
      }
      update(data) {
        aexists(this);
        data = toBytes2(data);
        abytes(data);
        const { view: view2, buffer: buffer2, blockLen } = this;
        const len = data.length;
        for (let pos = 0; pos < len; ) {
          const take = Math.min(blockLen - this.pos, len - pos);
          if (take === blockLen) {
            const dataView = createView(data);
            for (; blockLen <= len - pos; pos += blockLen)
              this.process(dataView, pos);
            continue;
          }
          buffer2.set(data.subarray(pos, pos + take), this.pos);
          this.pos += take;
          pos += take;
          if (this.pos === blockLen) {
            this.process(view2, 0);
            this.pos = 0;
          }
        }
        this.length += data.length;
        this.roundClean();
        return this;
      }
      digestInto(out) {
        aexists(this);
        aoutput(out, this);
        this.finished = true;
        const { buffer: buffer2, view: view2, blockLen, isLE: isLE2 } = this;
        let { pos } = this;
        buffer2[pos++] = 128;
        clean(this.buffer.subarray(pos));
        if (this.padOffset > blockLen - pos) {
          this.process(view2, 0);
          pos = 0;
        }
        for (let i = pos; i < blockLen; i++)
          buffer2[i] = 0;
        setBigUint64(view2, blockLen - 8, BigInt(this.length * 8), isLE2);
        this.process(view2, 0);
        const oview = createView(out);
        const len = this.outputLen;
        if (len % 4)
          throw new Error("_sha2: outputLen should be aligned to 32bit");
        const outLen = len / 4;
        const state = this.get();
        if (outLen > state.length)
          throw new Error("_sha2: outputLen bigger than state");
        for (let i = 0; i < outLen; i++)
          oview.setUint32(4 * i, state[i], isLE2);
      }
      digest() {
        const { buffer: buffer2, outputLen } = this;
        this.digestInto(buffer2);
        const res = buffer2.slice(0, outputLen);
        this.destroy();
        return res;
      }
      _cloneInto(to) {
        to || (to = new this.constructor());
        to.set(...this.get());
        const { blockLen, buffer: buffer2, length, finished, destroyed, pos } = this;
        to.destroyed = destroyed;
        to.finished = finished;
        to.length = length;
        to.pos = pos;
        if (length % blockLen)
          to.buffer.set(buffer2);
        return to;
      }
      clone() {
        return this._cloneInto();
      }
    };
    SHA256_IV = /* @__PURE__ */ Uint32Array.from([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]);
  }
});

// node_modules/@noble/hashes/esm/sha2.js
var SHA256_K, SHA256_W, SHA256, sha256;
var init_sha2 = __esm({
  "node_modules/@noble/hashes/esm/sha2.js"() {
    init_md();
    init_utils2();
    SHA256_K = /* @__PURE__ */ Uint32Array.from([
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ]);
    SHA256_W = /* @__PURE__ */ new Uint32Array(64);
    SHA256 = class extends HashMD {
      constructor(outputLen = 32) {
        super(64, outputLen, 8, false);
        this.A = SHA256_IV[0] | 0;
        this.B = SHA256_IV[1] | 0;
        this.C = SHA256_IV[2] | 0;
        this.D = SHA256_IV[3] | 0;
        this.E = SHA256_IV[4] | 0;
        this.F = SHA256_IV[5] | 0;
        this.G = SHA256_IV[6] | 0;
        this.H = SHA256_IV[7] | 0;
      }
      get() {
        const { A, B, C, D, E, F, G, H } = this;
        return [A, B, C, D, E, F, G, H];
      }
      // prettier-ignore
      set(A, B, C, D, E, F, G, H) {
        this.A = A | 0;
        this.B = B | 0;
        this.C = C | 0;
        this.D = D | 0;
        this.E = E | 0;
        this.F = F | 0;
        this.G = G | 0;
        this.H = H | 0;
      }
      process(view2, offset) {
        for (let i = 0; i < 16; i++, offset += 4)
          SHA256_W[i] = view2.getUint32(offset, false);
        for (let i = 16; i < 64; i++) {
          const W15 = SHA256_W[i - 15];
          const W2 = SHA256_W[i - 2];
          const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
          const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
          SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
        }
        let { A, B, C, D, E, F, G, H } = this;
        for (let i = 0; i < 64; i++) {
          const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
          const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
          const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
          const T2 = sigma0 + Maj(A, B, C) | 0;
          H = G;
          G = F;
          F = E;
          E = D + T1 | 0;
          D = C;
          C = B;
          B = A;
          A = T1 + T2 | 0;
        }
        A = A + this.A | 0;
        B = B + this.B | 0;
        C = C + this.C | 0;
        D = D + this.D | 0;
        E = E + this.E | 0;
        F = F + this.F | 0;
        G = G + this.G | 0;
        H = H + this.H | 0;
        this.set(A, B, C, D, E, F, G, H);
      }
      roundClean() {
        clean(SHA256_W);
      }
      destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0);
        clean(this.buffer);
      }
    };
    sha256 = /* @__PURE__ */ createHasher(() => new SHA256());
  }
});

// node_modules/@noble/hashes/esm/hmac.js
var HMAC, hmac;
var init_hmac = __esm({
  "node_modules/@noble/hashes/esm/hmac.js"() {
    init_utils2();
    HMAC = class extends Hash {
      constructor(hash3, _key) {
        super();
        this.finished = false;
        this.destroyed = false;
        ahash(hash3);
        const key = toBytes2(_key);
        this.iHash = hash3.create();
        if (typeof this.iHash.update !== "function")
          throw new Error("Expected instance of class which extends utils.Hash");
        this.blockLen = this.iHash.blockLen;
        this.outputLen = this.iHash.outputLen;
        const blockLen = this.blockLen;
        const pad4 = new Uint8Array(blockLen);
        pad4.set(key.length > blockLen ? hash3.create().update(key).digest() : key);
        for (let i = 0; i < pad4.length; i++)
          pad4[i] ^= 54;
        this.iHash.update(pad4);
        this.oHash = hash3.create();
        for (let i = 0; i < pad4.length; i++)
          pad4[i] ^= 54 ^ 92;
        this.oHash.update(pad4);
        clean(pad4);
      }
      update(buf) {
        aexists(this);
        this.iHash.update(buf);
        return this;
      }
      digestInto(out) {
        aexists(this);
        abytes(out, this.outputLen);
        this.finished = true;
        this.iHash.digestInto(out);
        this.oHash.update(out);
        this.oHash.digestInto(out);
        this.destroy();
      }
      digest() {
        const out = new Uint8Array(this.oHash.outputLen);
        this.digestInto(out);
        return out;
      }
      _cloneInto(to) {
        to || (to = Object.create(Object.getPrototypeOf(this), {}));
        const { oHash, iHash, finished, destroyed, blockLen, outputLen } = this;
        to = to;
        to.finished = finished;
        to.destroyed = destroyed;
        to.blockLen = blockLen;
        to.outputLen = outputLen;
        to.oHash = oHash._cloneInto(to.oHash);
        to.iHash = iHash._cloneInto(to.iHash);
        return to;
      }
      clone() {
        return this._cloneInto();
      }
      destroy() {
        this.destroyed = true;
        this.oHash.destroy();
        this.iHash.destroy();
      }
    };
    hmac = (hash3, key, message) => new HMAC(hash3, key).update(message).digest();
    hmac.create = (hash3, key) => new HMAC(hash3, key);
  }
});

// node_modules/@noble/curves/esm/abstract/utils.js
function isBytes2(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
}
function abytes2(item) {
  if (!isBytes2(item))
    throw new Error("Uint8Array expected");
}
function abool(title, value) {
  if (typeof value !== "boolean")
    throw new Error(title + " boolean expected, got " + value);
}
function numberToHexUnpadded(num2) {
  const hex = num2.toString(16);
  return hex.length & 1 ? "0" + hex : hex;
}
function hexToNumber2(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  return hex === "" ? _0n2 : BigInt("0x" + hex);
}
function bytesToHex2(bytes) {
  abytes2(bytes);
  if (hasHexBuiltin)
    return bytes.toHex();
  let hex = "";
  for (let i = 0; i < bytes.length; i++) {
    hex += hexes2[bytes[i]];
  }
  return hex;
}
function asciiToBase16(ch) {
  if (ch >= asciis._0 && ch <= asciis._9)
    return ch - asciis._0;
  if (ch >= asciis.A && ch <= asciis.F)
    return ch - (asciis.A - 10);
  if (ch >= asciis.a && ch <= asciis.f)
    return ch - (asciis.a - 10);
  return;
}
function hexToBytes2(hex) {
  if (typeof hex !== "string")
    throw new Error("hex string expected, got " + typeof hex);
  if (hasHexBuiltin)
    return Uint8Array.fromHex(hex);
  const hl = hex.length;
  const al = hl / 2;
  if (hl % 2)
    throw new Error("hex string expected, got unpadded hex of length " + hl);
  const array2 = new Uint8Array(al);
  for (let ai = 0, hi = 0; ai < al; ai++, hi += 2) {
    const n1 = asciiToBase16(hex.charCodeAt(hi));
    const n2 = asciiToBase16(hex.charCodeAt(hi + 1));
    if (n1 === void 0 || n2 === void 0) {
      const char = hex[hi] + hex[hi + 1];
      throw new Error('hex string expected, got non-hex character "' + char + '" at index ' + hi);
    }
    array2[ai] = n1 * 16 + n2;
  }
  return array2;
}
function bytesToNumberBE(bytes) {
  return hexToNumber2(bytesToHex2(bytes));
}
function bytesToNumberLE(bytes) {
  abytes2(bytes);
  return hexToNumber2(bytesToHex2(Uint8Array.from(bytes).reverse()));
}
function numberToBytesBE(n2, len) {
  return hexToBytes2(n2.toString(16).padStart(len * 2, "0"));
}
function numberToBytesLE(n2, len) {
  return numberToBytesBE(n2, len).reverse();
}
function ensureBytes(title, hex, expectedLength) {
  let res;
  if (typeof hex === "string") {
    try {
      res = hexToBytes2(hex);
    } catch (e) {
      throw new Error(title + " must be hex string or Uint8Array, cause: " + e);
    }
  } else if (isBytes2(hex)) {
    res = Uint8Array.from(hex);
  } else {
    throw new Error(title + " must be hex string or Uint8Array");
  }
  const len = res.length;
  if (typeof expectedLength === "number" && len !== expectedLength)
    throw new Error(title + " of length " + expectedLength + " expected, got " + len);
  return res;
}
function concatBytes3(...arrays) {
  let sum = 0;
  for (let i = 0; i < arrays.length; i++) {
    const a = arrays[i];
    abytes2(a);
    sum += a.length;
  }
  const res = new Uint8Array(sum);
  for (let i = 0, pad4 = 0; i < arrays.length; i++) {
    const a = arrays[i];
    res.set(a, pad4);
    pad4 += a.length;
  }
  return res;
}
function utf8ToBytes2(str) {
  if (typeof str !== "string")
    throw new Error("string expected");
  return new Uint8Array(new TextEncoder().encode(str));
}
function inRange(n2, min, max) {
  return isPosBig(n2) && isPosBig(min) && isPosBig(max) && min <= n2 && n2 < max;
}
function aInRange(title, n2, min, max) {
  if (!inRange(n2, min, max))
    throw new Error("expected valid " + title + ": " + min + " <= n < " + max + ", got " + n2);
}
function bitLen(n2) {
  let len;
  for (len = 0; n2 > _0n2; n2 >>= _1n2, len += 1)
    ;
  return len;
}
function createHmacDrbg(hashLen, qByteLen, hmacFn) {
  if (typeof hashLen !== "number" || hashLen < 2)
    throw new Error("hashLen must be a number");
  if (typeof qByteLen !== "number" || qByteLen < 2)
    throw new Error("qByteLen must be a number");
  if (typeof hmacFn !== "function")
    throw new Error("hmacFn must be a function");
  let v = u8n(hashLen);
  let k = u8n(hashLen);
  let i = 0;
  const reset = () => {
    v.fill(1);
    k.fill(0);
    i = 0;
  };
  const h = (...b) => hmacFn(k, v, ...b);
  const reseed = (seed = u8n(0)) => {
    k = h(u8fr([0]), seed);
    v = h();
    if (seed.length === 0)
      return;
    k = h(u8fr([1]), seed);
    v = h();
  };
  const gen2 = () => {
    if (i++ >= 1e3)
      throw new Error("drbg: tried 1000 values");
    let len = 0;
    const out = [];
    while (len < qByteLen) {
      v = h();
      const sl = v.slice();
      out.push(sl);
      len += v.length;
    }
    return concatBytes3(...out);
  };
  const genUntil = (seed, pred) => {
    reset();
    reseed(seed);
    let res = void 0;
    while (!(res = pred(gen2())))
      reseed();
    reset();
    return res;
  };
  return genUntil;
}
function validateObject(object, validators, optValidators = {}) {
  const checkField = (fieldName, type, isOptional) => {
    const checkVal = validatorFns[type];
    if (typeof checkVal !== "function")
      throw new Error("invalid validator function");
    const val = object[fieldName];
    if (isOptional && val === void 0)
      return;
    if (!checkVal(val, object)) {
      throw new Error("param " + String(fieldName) + " is invalid. Expected " + type + ", got " + val);
    }
  };
  for (const [fieldName, type] of Object.entries(validators))
    checkField(fieldName, type, false);
  for (const [fieldName, type] of Object.entries(optValidators))
    checkField(fieldName, type, true);
  return object;
}
function memoized(fn) {
  const map = /* @__PURE__ */ new WeakMap();
  return (arg, ...args) => {
    const val = map.get(arg);
    if (val !== void 0)
      return val;
    const computed = fn(arg, ...args);
    map.set(arg, computed);
    return computed;
  };
}
var _0n2, _1n2, hasHexBuiltin, hexes2, asciis, isPosBig, bitMask, u8n, u8fr, validatorFns;
var init_utils4 = __esm({
  "node_modules/@noble/curves/esm/abstract/utils.js"() {
    _0n2 = /* @__PURE__ */ BigInt(0);
    _1n2 = /* @__PURE__ */ BigInt(1);
    hasHexBuiltin = // @ts-ignore
    typeof Uint8Array.from([]).toHex === "function" && typeof Uint8Array.fromHex === "function";
    hexes2 = /* @__PURE__ */ Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
    asciis = { _0: 48, _9: 57, A: 65, F: 70, a: 97, f: 102 };
    isPosBig = (n2) => typeof n2 === "bigint" && _0n2 <= n2;
    bitMask = (n2) => (_1n2 << BigInt(n2)) - _1n2;
    u8n = (len) => new Uint8Array(len);
    u8fr = (arr) => Uint8Array.from(arr);
    validatorFns = {
      bigint: (val) => typeof val === "bigint",
      function: (val) => typeof val === "function",
      boolean: (val) => typeof val === "boolean",
      string: (val) => typeof val === "string",
      stringOrUint8Array: (val) => typeof val === "string" || isBytes2(val),
      isSafeInteger: (val) => Number.isSafeInteger(val),
      array: (val) => Array.isArray(val),
      field: (val, object) => object.Fp.isValid(val),
      hash: (val) => typeof val === "function" && Number.isSafeInteger(val.outputLen)
    };
  }
});

// node_modules/@noble/curves/esm/abstract/modular.js
function mod(a, b) {
  const result = a % b;
  return result >= _0n3 ? result : b + result;
}
function pow2(x, power, modulo) {
  let res = x;
  while (power-- > _0n3) {
    res *= res;
    res %= modulo;
  }
  return res;
}
function invert(number, modulo) {
  if (number === _0n3)
    throw new Error("invert: expected non-zero number");
  if (modulo <= _0n3)
    throw new Error("invert: expected positive modulus, got " + modulo);
  let a = mod(number, modulo);
  let b = modulo;
  let x = _0n3, y = _1n3, u = _1n3, v = _0n3;
  while (a !== _0n3) {
    const q = b / a;
    const r = b % a;
    const m = x - u * q;
    const n2 = y - v * q;
    b = a, a = r, x = u, y = v, u = m, v = n2;
  }
  const gcd = b;
  if (gcd !== _1n3)
    throw new Error("invert: does not exist");
  return mod(x, modulo);
}
function sqrt3mod4(Fp, n2) {
  const p1div4 = (Fp.ORDER + _1n3) / _4n;
  const root = Fp.pow(n2, p1div4);
  if (!Fp.eql(Fp.sqr(root), n2))
    throw new Error("Cannot find square root");
  return root;
}
function sqrt5mod8(Fp, n2) {
  const p5div8 = (Fp.ORDER - _5n) / _8n;
  const n22 = Fp.mul(n2, _2n2);
  const v = Fp.pow(n22, p5div8);
  const nv = Fp.mul(n2, v);
  const i = Fp.mul(Fp.mul(nv, _2n2), v);
  const root = Fp.mul(nv, Fp.sub(i, Fp.ONE));
  if (!Fp.eql(Fp.sqr(root), n2))
    throw new Error("Cannot find square root");
  return root;
}
function tonelliShanks(P) {
  if (P < BigInt(3))
    throw new Error("sqrt is not defined for small field");
  let Q = P - _1n3;
  let S = 0;
  while (Q % _2n2 === _0n3) {
    Q /= _2n2;
    S++;
  }
  let Z = _2n2;
  const _Fp = Field(P);
  while (FpLegendre(_Fp, Z) === 1) {
    if (Z++ > 1e3)
      throw new Error("Cannot find square root: probably non-prime P");
  }
  if (S === 1)
    return sqrt3mod4;
  let cc = _Fp.pow(Z, Q);
  const Q1div2 = (Q + _1n3) / _2n2;
  return function tonelliSlow(Fp, n2) {
    if (Fp.is0(n2))
      return n2;
    if (FpLegendre(Fp, n2) !== 1)
      throw new Error("Cannot find square root");
    let M = S;
    let c = Fp.mul(Fp.ONE, cc);
    let t = Fp.pow(n2, Q);
    let R = Fp.pow(n2, Q1div2);
    while (!Fp.eql(t, Fp.ONE)) {
      if (Fp.is0(t))
        return Fp.ZERO;
      let i = 1;
      let t_tmp = Fp.sqr(t);
      while (!Fp.eql(t_tmp, Fp.ONE)) {
        i++;
        t_tmp = Fp.sqr(t_tmp);
        if (i === M)
          throw new Error("Cannot find square root");
      }
      const exponent = _1n3 << BigInt(M - i - 1);
      const b = Fp.pow(c, exponent);
      M = i;
      c = Fp.sqr(b);
      t = Fp.mul(t, c);
      R = Fp.mul(R, b);
    }
    return R;
  };
}
function FpSqrt(P) {
  if (P % _4n === _3n)
    return sqrt3mod4;
  if (P % _8n === _5n)
    return sqrt5mod8;
  return tonelliShanks(P);
}
function validateField(field) {
  const initial = {
    ORDER: "bigint",
    MASK: "bigint",
    BYTES: "isSafeInteger",
    BITS: "isSafeInteger"
  };
  const opts = FIELD_FIELDS.reduce((map, val) => {
    map[val] = "function";
    return map;
  }, initial);
  return validateObject(field, opts);
}
function FpPow(Fp, num2, power) {
  if (power < _0n3)
    throw new Error("invalid exponent, negatives unsupported");
  if (power === _0n3)
    return Fp.ONE;
  if (power === _1n3)
    return num2;
  let p = Fp.ONE;
  let d = num2;
  while (power > _0n3) {
    if (power & _1n3)
      p = Fp.mul(p, d);
    d = Fp.sqr(d);
    power >>= _1n3;
  }
  return p;
}
function FpInvertBatch(Fp, nums, passZero = false) {
  const inverted = new Array(nums.length).fill(passZero ? Fp.ZERO : void 0);
  const multipliedAcc = nums.reduce((acc, num2, i) => {
    if (Fp.is0(num2))
      return acc;
    inverted[i] = acc;
    return Fp.mul(acc, num2);
  }, Fp.ONE);
  const invertedAcc = Fp.inv(multipliedAcc);
  nums.reduceRight((acc, num2, i) => {
    if (Fp.is0(num2))
      return acc;
    inverted[i] = Fp.mul(acc, inverted[i]);
    return Fp.mul(acc, num2);
  }, invertedAcc);
  return inverted;
}
function FpLegendre(Fp, n2) {
  const p1mod2 = (Fp.ORDER - _1n3) / _2n2;
  const powered = Fp.pow(n2, p1mod2);
  const yes = Fp.eql(powered, Fp.ONE);
  const zero = Fp.eql(powered, Fp.ZERO);
  const no = Fp.eql(powered, Fp.neg(Fp.ONE));
  if (!yes && !zero && !no)
    throw new Error("invalid Legendre symbol result");
  return yes ? 1 : zero ? 0 : -1;
}
function nLength(n2, nBitLength) {
  if (nBitLength !== void 0)
    anumber(nBitLength);
  const _nBitLength = nBitLength !== void 0 ? nBitLength : n2.toString(2).length;
  const nByteLength = Math.ceil(_nBitLength / 8);
  return { nBitLength: _nBitLength, nByteLength };
}
function Field(ORDER, bitLen2, isLE2 = false, redef = {}) {
  if (ORDER <= _0n3)
    throw new Error("invalid field: expected ORDER > 0, got " + ORDER);
  const { nBitLength: BITS, nByteLength: BYTES } = nLength(ORDER, bitLen2);
  if (BYTES > 2048)
    throw new Error("invalid field: expected ORDER of <= 2048 bytes");
  let sqrtP;
  const f = Object.freeze({
    ORDER,
    isLE: isLE2,
    BITS,
    BYTES,
    MASK: bitMask(BITS),
    ZERO: _0n3,
    ONE: _1n3,
    create: (num2) => mod(num2, ORDER),
    isValid: (num2) => {
      if (typeof num2 !== "bigint")
        throw new Error("invalid field element: expected bigint, got " + typeof num2);
      return _0n3 <= num2 && num2 < ORDER;
    },
    is0: (num2) => num2 === _0n3,
    isOdd: (num2) => (num2 & _1n3) === _1n3,
    neg: (num2) => mod(-num2, ORDER),
    eql: (lhs, rhs) => lhs === rhs,
    sqr: (num2) => mod(num2 * num2, ORDER),
    add: (lhs, rhs) => mod(lhs + rhs, ORDER),
    sub: (lhs, rhs) => mod(lhs - rhs, ORDER),
    mul: (lhs, rhs) => mod(lhs * rhs, ORDER),
    pow: (num2, power) => FpPow(f, num2, power),
    div: (lhs, rhs) => mod(lhs * invert(rhs, ORDER), ORDER),
    // Same as above, but doesn't normalize
    sqrN: (num2) => num2 * num2,
    addN: (lhs, rhs) => lhs + rhs,
    subN: (lhs, rhs) => lhs - rhs,
    mulN: (lhs, rhs) => lhs * rhs,
    inv: (num2) => invert(num2, ORDER),
    sqrt: redef.sqrt || ((n2) => {
      if (!sqrtP)
        sqrtP = FpSqrt(ORDER);
      return sqrtP(f, n2);
    }),
    toBytes: (num2) => isLE2 ? numberToBytesLE(num2, BYTES) : numberToBytesBE(num2, BYTES),
    fromBytes: (bytes) => {
      if (bytes.length !== BYTES)
        throw new Error("Field.fromBytes: expected " + BYTES + " bytes, got " + bytes.length);
      return isLE2 ? bytesToNumberLE(bytes) : bytesToNumberBE(bytes);
    },
    // TODO: we don't need it here, move out to separate fn
    invertBatch: (lst) => FpInvertBatch(f, lst),
    // We can't move this out because Fp6, Fp12 implement it
    // and it's unclear what to return in there.
    cmov: (a, b, c) => c ? b : a
  });
  return Object.freeze(f);
}
function getFieldBytesLength(fieldOrder) {
  if (typeof fieldOrder !== "bigint")
    throw new Error("field order must be bigint");
  const bitLength = fieldOrder.toString(2).length;
  return Math.ceil(bitLength / 8);
}
function getMinHashLength(fieldOrder) {
  const length = getFieldBytesLength(fieldOrder);
  return length + Math.ceil(length / 2);
}
function mapHashToField(key, fieldOrder, isLE2 = false) {
  const len = key.length;
  const fieldLen = getFieldBytesLength(fieldOrder);
  const minLen = getMinHashLength(fieldOrder);
  if (len < 16 || len < minLen || len > 1024)
    throw new Error("expected " + minLen + "-1024 bytes of input, got " + len);
  const num2 = isLE2 ? bytesToNumberLE(key) : bytesToNumberBE(key);
  const reduced = mod(num2, fieldOrder - _1n3) + _1n3;
  return isLE2 ? numberToBytesLE(reduced, fieldLen) : numberToBytesBE(reduced, fieldLen);
}
var _0n3, _1n3, _2n2, _3n, _4n, _5n, _8n, FIELD_FIELDS;
var init_modular = __esm({
  "node_modules/@noble/curves/esm/abstract/modular.js"() {
    init_utils2();
    init_utils4();
    _0n3 = BigInt(0);
    _1n3 = BigInt(1);
    _2n2 = /* @__PURE__ */ BigInt(2);
    _3n = /* @__PURE__ */ BigInt(3);
    _4n = /* @__PURE__ */ BigInt(4);
    _5n = /* @__PURE__ */ BigInt(5);
    _8n = /* @__PURE__ */ BigInt(8);
    FIELD_FIELDS = [
      "create",
      "isValid",
      "is0",
      "neg",
      "inv",
      "sqrt",
      "sqr",
      "eql",
      "add",
      "sub",
      "mul",
      "pow",
      "div",
      "addN",
      "subN",
      "mulN",
      "sqrN"
    ];
  }
});

// node_modules/@noble/curves/esm/abstract/curve.js
function constTimeNegate(condition, item) {
  const neg = item.negate();
  return condition ? neg : item;
}
function validateW(W, bits) {
  if (!Number.isSafeInteger(W) || W <= 0 || W > bits)
    throw new Error("invalid window size, expected [1.." + bits + "], got W=" + W);
}
function calcWOpts(W, scalarBits) {
  validateW(W, scalarBits);
  const windows = Math.ceil(scalarBits / W) + 1;
  const windowSize = 2 ** (W - 1);
  const maxNumber = 2 ** W;
  const mask = bitMask(W);
  const shiftBy = BigInt(W);
  return { windows, windowSize, mask, maxNumber, shiftBy };
}
function calcOffsets(n2, window2, wOpts) {
  const { windowSize, mask, maxNumber, shiftBy } = wOpts;
  let wbits = Number(n2 & mask);
  let nextN = n2 >> shiftBy;
  if (wbits > windowSize) {
    wbits -= maxNumber;
    nextN += _1n4;
  }
  const offsetStart = window2 * windowSize;
  const offset = offsetStart + Math.abs(wbits) - 1;
  const isZero = wbits === 0;
  const isNeg = wbits < 0;
  const isNegF = window2 % 2 !== 0;
  const offsetF = offsetStart;
  return { nextN, offset, isZero, isNeg, isNegF, offsetF };
}
function validateMSMPoints(points, c) {
  if (!Array.isArray(points))
    throw new Error("array expected");
  points.forEach((p, i) => {
    if (!(p instanceof c))
      throw new Error("invalid point at index " + i);
  });
}
function validateMSMScalars(scalars, field) {
  if (!Array.isArray(scalars))
    throw new Error("array of scalars expected");
  scalars.forEach((s, i) => {
    if (!field.isValid(s))
      throw new Error("invalid scalar at index " + i);
  });
}
function getW(P) {
  return pointWindowSizes.get(P) || 1;
}
function wNAF(c, bits) {
  return {
    constTimeNegate,
    hasPrecomputes(elm) {
      return getW(elm) !== 1;
    },
    // non-const time multiplication ladder
    unsafeLadder(elm, n2, p = c.ZERO) {
      let d = elm;
      while (n2 > _0n4) {
        if (n2 & _1n4)
          p = p.add(d);
        d = d.double();
        n2 >>= _1n4;
      }
      return p;
    },
    /**
     * Creates a wNAF precomputation window. Used for caching.
     * Default window size is set by `utils.precompute()` and is equal to 8.
     * Number of precomputed points depends on the curve size:
     * 2^(𝑊−1) * (Math.ceil(𝑛 / 𝑊) + 1), where:
     * - 𝑊 is the window size
     * - 𝑛 is the bitlength of the curve order.
     * For a 256-bit curve and window size 8, the number of precomputed points is 128 * 33 = 4224.
     * @param elm Point instance
     * @param W window size
     * @returns precomputed point tables flattened to a single array
     */
    precomputeWindow(elm, W) {
      const { windows, windowSize } = calcWOpts(W, bits);
      const points = [];
      let p = elm;
      let base = p;
      for (let window2 = 0; window2 < windows; window2++) {
        base = p;
        points.push(base);
        for (let i = 1; i < windowSize; i++) {
          base = base.add(p);
          points.push(base);
        }
        p = base.double();
      }
      return points;
    },
    /**
     * Implements ec multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @returns real and fake (for const-time) points
     */
    wNAF(W, precomputes, n2) {
      let p = c.ZERO;
      let f = c.BASE;
      const wo = calcWOpts(W, bits);
      for (let window2 = 0; window2 < wo.windows; window2++) {
        const { nextN, offset, isZero, isNeg, isNegF, offsetF } = calcOffsets(n2, window2, wo);
        n2 = nextN;
        if (isZero) {
          f = f.add(constTimeNegate(isNegF, precomputes[offsetF]));
        } else {
          p = p.add(constTimeNegate(isNeg, precomputes[offset]));
        }
      }
      return { p, f };
    },
    /**
     * Implements ec unsafe (non const-time) multiplication using precomputed tables and w-ary non-adjacent form.
     * @param W window size
     * @param precomputes precomputed tables
     * @param n scalar (we don't check here, but should be less than curve order)
     * @param acc accumulator point to add result of multiplication
     * @returns point
     */
    wNAFUnsafe(W, precomputes, n2, acc = c.ZERO) {
      const wo = calcWOpts(W, bits);
      for (let window2 = 0; window2 < wo.windows; window2++) {
        if (n2 === _0n4)
          break;
        const { nextN, offset, isZero, isNeg } = calcOffsets(n2, window2, wo);
        n2 = nextN;
        if (isZero) {
          continue;
        } else {
          const item = precomputes[offset];
          acc = acc.add(isNeg ? item.negate() : item);
        }
      }
      return acc;
    },
    getPrecomputes(W, P, transform) {
      let comp = pointPrecomputes.get(P);
      if (!comp) {
        comp = this.precomputeWindow(P, W);
        if (W !== 1)
          pointPrecomputes.set(P, transform(comp));
      }
      return comp;
    },
    wNAFCached(P, n2, transform) {
      const W = getW(P);
      return this.wNAF(W, this.getPrecomputes(W, P, transform), n2);
    },
    wNAFCachedUnsafe(P, n2, transform, prev) {
      const W = getW(P);
      if (W === 1)
        return this.unsafeLadder(P, n2, prev);
      return this.wNAFUnsafe(W, this.getPrecomputes(W, P, transform), n2, prev);
    },
    // We calculate precomputes for elliptic curve point multiplication
    // using windowed method. This specifies window size and
    // stores precomputed values. Usually only base point would be precomputed.
    setWindowSize(P, W) {
      validateW(W, bits);
      pointWindowSizes.set(P, W);
      pointPrecomputes.delete(P);
    }
  };
}
function pippenger(c, fieldN, points, scalars) {
  validateMSMPoints(points, c);
  validateMSMScalars(scalars, fieldN);
  const plength = points.length;
  const slength = scalars.length;
  if (plength !== slength)
    throw new Error("arrays of points and scalars must have equal length");
  const zero = c.ZERO;
  const wbits = bitLen(BigInt(plength));
  let windowSize = 1;
  if (wbits > 12)
    windowSize = wbits - 3;
  else if (wbits > 4)
    windowSize = wbits - 2;
  else if (wbits > 0)
    windowSize = 2;
  const MASK = bitMask(windowSize);
  const buckets = new Array(Number(MASK) + 1).fill(zero);
  const lastBits = Math.floor((fieldN.BITS - 1) / windowSize) * windowSize;
  let sum = zero;
  for (let i = lastBits; i >= 0; i -= windowSize) {
    buckets.fill(zero);
    for (let j = 0; j < slength; j++) {
      const scalar = scalars[j];
      const wbits2 = Number(scalar >> BigInt(i) & MASK);
      buckets[wbits2] = buckets[wbits2].add(points[j]);
    }
    let resI = zero;
    for (let j = buckets.length - 1, sumI = zero; j > 0; j--) {
      sumI = sumI.add(buckets[j]);
      resI = resI.add(sumI);
    }
    sum = sum.add(resI);
    if (i !== 0)
      for (let j = 0; j < windowSize; j++)
        sum = sum.double();
  }
  return sum;
}
function validateBasic(curve) {
  validateField(curve.Fp);
  validateObject(curve, {
    n: "bigint",
    h: "bigint",
    Gx: "field",
    Gy: "field"
  }, {
    nBitLength: "isSafeInteger",
    nByteLength: "isSafeInteger"
  });
  return Object.freeze({
    ...nLength(curve.n, curve.nBitLength),
    ...curve,
    ...{ p: curve.Fp.ORDER }
  });
}
var _0n4, _1n4, pointPrecomputes, pointWindowSizes;
var init_curve = __esm({
  "node_modules/@noble/curves/esm/abstract/curve.js"() {
    init_modular();
    init_utils4();
    _0n4 = BigInt(0);
    _1n4 = BigInt(1);
    pointPrecomputes = /* @__PURE__ */ new WeakMap();
    pointWindowSizes = /* @__PURE__ */ new WeakMap();
  }
});

// node_modules/@noble/curves/esm/abstract/weierstrass.js
function validateSigVerOpts(opts) {
  if (opts.lowS !== void 0)
    abool("lowS", opts.lowS);
  if (opts.prehash !== void 0)
    abool("prehash", opts.prehash);
}
function validatePointOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(opts, {
    a: "field",
    b: "field"
  }, {
    allowInfinityPoint: "boolean",
    allowedPrivateKeyLengths: "array",
    clearCofactor: "function",
    fromBytes: "function",
    isTorsionFree: "function",
    toBytes: "function",
    wrapPrivateKey: "boolean"
  });
  const { endo, Fp, a } = opts;
  if (endo) {
    if (!Fp.eql(a, Fp.ZERO)) {
      throw new Error("invalid endo: CURVE.a must be 0");
    }
    if (typeof endo !== "object" || typeof endo.beta !== "bigint" || typeof endo.splitScalar !== "function") {
      throw new Error('invalid endo: expected "beta": bigint and "splitScalar": function');
    }
  }
  return Object.freeze({ ...opts });
}
function numToSizedHex(num2, size5) {
  return bytesToHex2(numberToBytesBE(num2, size5));
}
function weierstrassPoints(opts) {
  const CURVE = validatePointOpts(opts);
  const { Fp } = CURVE;
  const Fn = Field(CURVE.n, CURVE.nBitLength);
  const toBytes4 = CURVE.toBytes || ((_c, point2, _isCompressed) => {
    const a = point2.toAffine();
    return concatBytes3(Uint8Array.from([4]), Fp.toBytes(a.x), Fp.toBytes(a.y));
  });
  const fromBytes4 = CURVE.fromBytes || ((bytes) => {
    const tail = bytes.subarray(1);
    const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
    const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
    return { x, y };
  });
  function weierstrassEquation(x) {
    const { a, b } = CURVE;
    const x2 = Fp.sqr(x);
    const x3 = Fp.mul(x2, x);
    return Fp.add(Fp.add(x3, Fp.mul(x, a)), b);
  }
  function isValidXY(x, y) {
    const left = Fp.sqr(y);
    const right = weierstrassEquation(x);
    return Fp.eql(left, right);
  }
  if (!isValidXY(CURVE.Gx, CURVE.Gy))
    throw new Error("bad curve params: generator point");
  const _4a3 = Fp.mul(Fp.pow(CURVE.a, _3n2), _4n2);
  const _27b2 = Fp.mul(Fp.sqr(CURVE.b), BigInt(27));
  if (Fp.is0(Fp.add(_4a3, _27b2)))
    throw new Error("bad curve params: a or b");
  function isWithinCurveOrder(num2) {
    return inRange(num2, _1n5, CURVE.n);
  }
  function normPrivateKeyToScalar(key) {
    const { allowedPrivateKeyLengths: lengths, nByteLength, wrapPrivateKey, n: N } = CURVE;
    if (lengths && typeof key !== "bigint") {
      if (isBytes2(key))
        key = bytesToHex2(key);
      if (typeof key !== "string" || !lengths.includes(key.length))
        throw new Error("invalid private key");
      key = key.padStart(nByteLength * 2, "0");
    }
    let num2;
    try {
      num2 = typeof key === "bigint" ? key : bytesToNumberBE(ensureBytes("private key", key, nByteLength));
    } catch (error) {
      throw new Error("invalid private key, expected hex or " + nByteLength + " bytes, got " + typeof key);
    }
    if (wrapPrivateKey)
      num2 = mod(num2, N);
    aInRange("private key", num2, _1n5, N);
    return num2;
  }
  function aprjpoint(other) {
    if (!(other instanceof Point2))
      throw new Error("ProjectivePoint expected");
  }
  const toAffineMemo = memoized((p, iz) => {
    const { px: x, py: y, pz: z } = p;
    if (Fp.eql(z, Fp.ONE))
      return { x, y };
    const is0 = p.is0();
    if (iz == null)
      iz = is0 ? Fp.ONE : Fp.inv(z);
    const ax = Fp.mul(x, iz);
    const ay = Fp.mul(y, iz);
    const zz = Fp.mul(z, iz);
    if (is0)
      return { x: Fp.ZERO, y: Fp.ZERO };
    if (!Fp.eql(zz, Fp.ONE))
      throw new Error("invZ was invalid");
    return { x: ax, y: ay };
  });
  const assertValidMemo = memoized((p) => {
    if (p.is0()) {
      if (CURVE.allowInfinityPoint && !Fp.is0(p.py))
        return;
      throw new Error("bad point: ZERO");
    }
    const { x, y } = p.toAffine();
    if (!Fp.isValid(x) || !Fp.isValid(y))
      throw new Error("bad point: x or y not FE");
    if (!isValidXY(x, y))
      throw new Error("bad point: equation left != right");
    if (!p.isTorsionFree())
      throw new Error("bad point: not in prime-order subgroup");
    return true;
  });
  class Point2 {
    constructor(px, py, pz) {
      if (px == null || !Fp.isValid(px))
        throw new Error("x required");
      if (py == null || !Fp.isValid(py) || Fp.is0(py))
        throw new Error("y required");
      if (pz == null || !Fp.isValid(pz))
        throw new Error("z required");
      this.px = px;
      this.py = py;
      this.pz = pz;
      Object.freeze(this);
    }
    // Does not validate if the point is on-curve.
    // Use fromHex instead, or call assertValidity() later.
    static fromAffine(p) {
      const { x, y } = p || {};
      if (!p || !Fp.isValid(x) || !Fp.isValid(y))
        throw new Error("invalid affine point");
      if (p instanceof Point2)
        throw new Error("projective point not allowed");
      const is0 = (i) => Fp.eql(i, Fp.ZERO);
      if (is0(x) && is0(y))
        return Point2.ZERO;
      return new Point2(x, y, Fp.ONE);
    }
    get x() {
      return this.toAffine().x;
    }
    get y() {
      return this.toAffine().y;
    }
    /**
     * Takes a bunch of Projective Points but executes only one
     * inversion on all of them. Inversion is very slow operation,
     * so this improves performance massively.
     * Optimization: converts a list of projective points to a list of identical points with Z=1.
     */
    static normalizeZ(points) {
      const toInv = FpInvertBatch(Fp, points.map((p) => p.pz));
      return points.map((p, i) => p.toAffine(toInv[i])).map(Point2.fromAffine);
    }
    /**
     * Converts hash string or Uint8Array to Point.
     * @param hex short/long ECDSA hex
     */
    static fromHex(hex) {
      const P = Point2.fromAffine(fromBytes4(ensureBytes("pointHex", hex)));
      P.assertValidity();
      return P;
    }
    // Multiplies generator point by privateKey.
    static fromPrivateKey(privateKey) {
      return Point2.BASE.multiply(normPrivateKeyToScalar(privateKey));
    }
    // Multiscalar Multiplication
    static msm(points, scalars) {
      return pippenger(Point2, Fn, points, scalars);
    }
    // "Private method", don't use it directly
    _setWindowSize(windowSize) {
      wnaf.setWindowSize(this, windowSize);
    }
    // A point on curve is valid if it conforms to equation.
    assertValidity() {
      assertValidMemo(this);
    }
    hasEvenY() {
      const { y } = this.toAffine();
      if (Fp.isOdd)
        return !Fp.isOdd(y);
      throw new Error("Field doesn't support isOdd");
    }
    /**
     * Compare one point to another.
     */
    equals(other) {
      aprjpoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      const U1 = Fp.eql(Fp.mul(X1, Z2), Fp.mul(X2, Z1));
      const U2 = Fp.eql(Fp.mul(Y1, Z2), Fp.mul(Y2, Z1));
      return U1 && U2;
    }
    /**
     * Flips point to one corresponding to (x, -y) in Affine coordinates.
     */
    negate() {
      return new Point2(this.px, Fp.neg(this.py), this.pz);
    }
    // Renes-Costello-Batina exception-free doubling formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 3
    // Cost: 8M + 3S + 3*a + 2*b3 + 15add.
    double() {
      const { a, b } = CURVE;
      const b3 = Fp.mul(b, _3n2);
      const { px: X1, py: Y1, pz: Z1 } = this;
      let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
      let t0 = Fp.mul(X1, X1);
      let t1 = Fp.mul(Y1, Y1);
      let t2 = Fp.mul(Z1, Z1);
      let t3 = Fp.mul(X1, Y1);
      t3 = Fp.add(t3, t3);
      Z3 = Fp.mul(X1, Z1);
      Z3 = Fp.add(Z3, Z3);
      X3 = Fp.mul(a, Z3);
      Y3 = Fp.mul(b3, t2);
      Y3 = Fp.add(X3, Y3);
      X3 = Fp.sub(t1, Y3);
      Y3 = Fp.add(t1, Y3);
      Y3 = Fp.mul(X3, Y3);
      X3 = Fp.mul(t3, X3);
      Z3 = Fp.mul(b3, Z3);
      t2 = Fp.mul(a, t2);
      t3 = Fp.sub(t0, t2);
      t3 = Fp.mul(a, t3);
      t3 = Fp.add(t3, Z3);
      Z3 = Fp.add(t0, t0);
      t0 = Fp.add(Z3, t0);
      t0 = Fp.add(t0, t2);
      t0 = Fp.mul(t0, t3);
      Y3 = Fp.add(Y3, t0);
      t2 = Fp.mul(Y1, Z1);
      t2 = Fp.add(t2, t2);
      t0 = Fp.mul(t2, t3);
      X3 = Fp.sub(X3, t0);
      Z3 = Fp.mul(t2, t1);
      Z3 = Fp.add(Z3, Z3);
      Z3 = Fp.add(Z3, Z3);
      return new Point2(X3, Y3, Z3);
    }
    // Renes-Costello-Batina exception-free addition formula.
    // There is 30% faster Jacobian formula, but it is not complete.
    // https://eprint.iacr.org/2015/1060, algorithm 1
    // Cost: 12M + 0S + 3*a + 3*b3 + 23add.
    add(other) {
      aprjpoint(other);
      const { px: X1, py: Y1, pz: Z1 } = this;
      const { px: X2, py: Y2, pz: Z2 } = other;
      let X3 = Fp.ZERO, Y3 = Fp.ZERO, Z3 = Fp.ZERO;
      const a = CURVE.a;
      const b3 = Fp.mul(CURVE.b, _3n2);
      let t0 = Fp.mul(X1, X2);
      let t1 = Fp.mul(Y1, Y2);
      let t2 = Fp.mul(Z1, Z2);
      let t3 = Fp.add(X1, Y1);
      let t4 = Fp.add(X2, Y2);
      t3 = Fp.mul(t3, t4);
      t4 = Fp.add(t0, t1);
      t3 = Fp.sub(t3, t4);
      t4 = Fp.add(X1, Z1);
      let t5 = Fp.add(X2, Z2);
      t4 = Fp.mul(t4, t5);
      t5 = Fp.add(t0, t2);
      t4 = Fp.sub(t4, t5);
      t5 = Fp.add(Y1, Z1);
      X3 = Fp.add(Y2, Z2);
      t5 = Fp.mul(t5, X3);
      X3 = Fp.add(t1, t2);
      t5 = Fp.sub(t5, X3);
      Z3 = Fp.mul(a, t4);
      X3 = Fp.mul(b3, t2);
      Z3 = Fp.add(X3, Z3);
      X3 = Fp.sub(t1, Z3);
      Z3 = Fp.add(t1, Z3);
      Y3 = Fp.mul(X3, Z3);
      t1 = Fp.add(t0, t0);
      t1 = Fp.add(t1, t0);
      t2 = Fp.mul(a, t2);
      t4 = Fp.mul(b3, t4);
      t1 = Fp.add(t1, t2);
      t2 = Fp.sub(t0, t2);
      t2 = Fp.mul(a, t2);
      t4 = Fp.add(t4, t2);
      t0 = Fp.mul(t1, t4);
      Y3 = Fp.add(Y3, t0);
      t0 = Fp.mul(t5, t4);
      X3 = Fp.mul(t3, X3);
      X3 = Fp.sub(X3, t0);
      t0 = Fp.mul(t3, t1);
      Z3 = Fp.mul(t5, Z3);
      Z3 = Fp.add(Z3, t0);
      return new Point2(X3, Y3, Z3);
    }
    subtract(other) {
      return this.add(other.negate());
    }
    is0() {
      return this.equals(Point2.ZERO);
    }
    wNAF(n2) {
      return wnaf.wNAFCached(this, n2, Point2.normalizeZ);
    }
    /**
     * Non-constant-time multiplication. Uses double-and-add algorithm.
     * It's faster, but should only be used when you don't care about
     * an exposed private key e.g. sig verification, which works over *public* keys.
     */
    multiplyUnsafe(sc) {
      const { endo: endo2, n: N } = CURVE;
      aInRange("scalar", sc, _0n5, N);
      const I = Point2.ZERO;
      if (sc === _0n5)
        return I;
      if (this.is0() || sc === _1n5)
        return this;
      if (!endo2 || wnaf.hasPrecomputes(this))
        return wnaf.wNAFCachedUnsafe(this, sc, Point2.normalizeZ);
      let { k1neg, k1, k2neg, k2 } = endo2.splitScalar(sc);
      let k1p = I;
      let k2p = I;
      let d = this;
      while (k1 > _0n5 || k2 > _0n5) {
        if (k1 & _1n5)
          k1p = k1p.add(d);
        if (k2 & _1n5)
          k2p = k2p.add(d);
        d = d.double();
        k1 >>= _1n5;
        k2 >>= _1n5;
      }
      if (k1neg)
        k1p = k1p.negate();
      if (k2neg)
        k2p = k2p.negate();
      k2p = new Point2(Fp.mul(k2p.px, endo2.beta), k2p.py, k2p.pz);
      return k1p.add(k2p);
    }
    /**
     * Constant time multiplication.
     * Uses wNAF method. Windowed method may be 10% faster,
     * but takes 2x longer to generate and consumes 2x memory.
     * Uses precomputes when available.
     * Uses endomorphism for Koblitz curves.
     * @param scalar by which the point would be multiplied
     * @returns New point
     */
    multiply(scalar) {
      const { endo: endo2, n: N } = CURVE;
      aInRange("scalar", scalar, _1n5, N);
      let point2, fake;
      if (endo2) {
        const { k1neg, k1, k2neg, k2 } = endo2.splitScalar(scalar);
        let { p: k1p, f: f1p } = this.wNAF(k1);
        let { p: k2p, f: f2p } = this.wNAF(k2);
        k1p = wnaf.constTimeNegate(k1neg, k1p);
        k2p = wnaf.constTimeNegate(k2neg, k2p);
        k2p = new Point2(Fp.mul(k2p.px, endo2.beta), k2p.py, k2p.pz);
        point2 = k1p.add(k2p);
        fake = f1p.add(f2p);
      } else {
        const { p, f } = this.wNAF(scalar);
        point2 = p;
        fake = f;
      }
      return Point2.normalizeZ([point2, fake])[0];
    }
    /**
     * Efficiently calculate `aP + bQ`. Unsafe, can expose private key, if used incorrectly.
     * Not using Strauss-Shamir trick: precomputation tables are faster.
     * The trick could be useful if both P and Q are not G (not in our case).
     * @returns non-zero affine point
     */
    multiplyAndAddUnsafe(Q, a, b) {
      const G = Point2.BASE;
      const mul = (P, a2) => a2 === _0n5 || a2 === _1n5 || !P.equals(G) ? P.multiplyUnsafe(a2) : P.multiply(a2);
      const sum = mul(this, a).add(mul(Q, b));
      return sum.is0() ? void 0 : sum;
    }
    // Converts Projective point to affine (x, y) coordinates.
    // Can accept precomputed Z^-1 - for example, from invertBatch.
    // (x, y, z) ∋ (x=x/z, y=y/z)
    toAffine(iz) {
      return toAffineMemo(this, iz);
    }
    isTorsionFree() {
      const { h: cofactor, isTorsionFree } = CURVE;
      if (cofactor === _1n5)
        return true;
      if (isTorsionFree)
        return isTorsionFree(Point2, this);
      throw new Error("isTorsionFree() has not been declared for the elliptic curve");
    }
    clearCofactor() {
      const { h: cofactor, clearCofactor } = CURVE;
      if (cofactor === _1n5)
        return this;
      if (clearCofactor)
        return clearCofactor(Point2, this);
      return this.multiplyUnsafe(CURVE.h);
    }
    toRawBytes(isCompressed = true) {
      abool("isCompressed", isCompressed);
      this.assertValidity();
      return toBytes4(Point2, this, isCompressed);
    }
    toHex(isCompressed = true) {
      abool("isCompressed", isCompressed);
      return bytesToHex2(this.toRawBytes(isCompressed));
    }
  }
  Point2.BASE = new Point2(CURVE.Gx, CURVE.Gy, Fp.ONE);
  Point2.ZERO = new Point2(Fp.ZERO, Fp.ONE, Fp.ZERO);
  const { endo, nBitLength } = CURVE;
  const wnaf = wNAF(Point2, endo ? Math.ceil(nBitLength / 2) : nBitLength);
  return {
    CURVE,
    ProjectivePoint: Point2,
    normPrivateKeyToScalar,
    weierstrassEquation,
    isWithinCurveOrder
  };
}
function validateOpts(curve) {
  const opts = validateBasic(curve);
  validateObject(opts, {
    hash: "hash",
    hmac: "function",
    randomBytes: "function"
  }, {
    bits2int: "function",
    bits2int_modN: "function",
    lowS: "boolean"
  });
  return Object.freeze({ lowS: true, ...opts });
}
function weierstrass(curveDef) {
  const CURVE = validateOpts(curveDef);
  const { Fp, n: CURVE_ORDER, nByteLength, nBitLength } = CURVE;
  const compressedLen = Fp.BYTES + 1;
  const uncompressedLen = 2 * Fp.BYTES + 1;
  function modN2(a) {
    return mod(a, CURVE_ORDER);
  }
  function invN(a) {
    return invert(a, CURVE_ORDER);
  }
  const { ProjectivePoint: Point2, normPrivateKeyToScalar, weierstrassEquation, isWithinCurveOrder } = weierstrassPoints({
    ...CURVE,
    toBytes(_c, point2, isCompressed) {
      const a = point2.toAffine();
      const x = Fp.toBytes(a.x);
      const cat = concatBytes3;
      abool("isCompressed", isCompressed);
      if (isCompressed) {
        return cat(Uint8Array.from([point2.hasEvenY() ? 2 : 3]), x);
      } else {
        return cat(Uint8Array.from([4]), x, Fp.toBytes(a.y));
      }
    },
    fromBytes(bytes) {
      const len = bytes.length;
      const head = bytes[0];
      const tail = bytes.subarray(1);
      if (len === compressedLen && (head === 2 || head === 3)) {
        const x = bytesToNumberBE(tail);
        if (!inRange(x, _1n5, Fp.ORDER))
          throw new Error("Point is not on curve");
        const y2 = weierstrassEquation(x);
        let y;
        try {
          y = Fp.sqrt(y2);
        } catch (sqrtError) {
          const suffix = sqrtError instanceof Error ? ": " + sqrtError.message : "";
          throw new Error("Point is not on curve" + suffix);
        }
        const isYOdd = (y & _1n5) === _1n5;
        const isHeadOdd = (head & 1) === 1;
        if (isHeadOdd !== isYOdd)
          y = Fp.neg(y);
        return { x, y };
      } else if (len === uncompressedLen && head === 4) {
        const x = Fp.fromBytes(tail.subarray(0, Fp.BYTES));
        const y = Fp.fromBytes(tail.subarray(Fp.BYTES, 2 * Fp.BYTES));
        return { x, y };
      } else {
        const cl = compressedLen;
        const ul = uncompressedLen;
        throw new Error("invalid Point, expected length of " + cl + ", or uncompressed " + ul + ", got " + len);
      }
    }
  });
  function isBiggerThanHalfOrder(number) {
    const HALF = CURVE_ORDER >> _1n5;
    return number > HALF;
  }
  function normalizeS(s) {
    return isBiggerThanHalfOrder(s) ? modN2(-s) : s;
  }
  const slcNum = (b, from15, to) => bytesToNumberBE(b.slice(from15, to));
  class Signature {
    constructor(r, s, recovery) {
      aInRange("r", r, _1n5, CURVE_ORDER);
      aInRange("s", s, _1n5, CURVE_ORDER);
      this.r = r;
      this.s = s;
      if (recovery != null)
        this.recovery = recovery;
      Object.freeze(this);
    }
    // pair (bytes of r, bytes of s)
    static fromCompact(hex) {
      const l = nByteLength;
      hex = ensureBytes("compactSignature", hex, l * 2);
      return new Signature(slcNum(hex, 0, l), slcNum(hex, l, 2 * l));
    }
    // DER encoded ECDSA signature
    // https://bitcoin.stackexchange.com/questions/57644/what-are-the-parts-of-a-bitcoin-transaction-input-script
    static fromDER(hex) {
      const { r, s } = DER.toSig(ensureBytes("DER", hex));
      return new Signature(r, s);
    }
    /**
     * @todo remove
     * @deprecated
     */
    assertValidity() {
    }
    addRecoveryBit(recovery) {
      return new Signature(this.r, this.s, recovery);
    }
    recoverPublicKey(msgHash) {
      const { r, s, recovery: rec } = this;
      const h = bits2int_modN(ensureBytes("msgHash", msgHash));
      if (rec == null || ![0, 1, 2, 3].includes(rec))
        throw new Error("recovery id invalid");
      const radj = rec === 2 || rec === 3 ? r + CURVE.n : r;
      if (radj >= Fp.ORDER)
        throw new Error("recovery id 2 or 3 invalid");
      const prefix = (rec & 1) === 0 ? "02" : "03";
      const R = Point2.fromHex(prefix + numToSizedHex(radj, Fp.BYTES));
      const ir = invN(radj);
      const u1 = modN2(-h * ir);
      const u2 = modN2(s * ir);
      const Q = Point2.BASE.multiplyAndAddUnsafe(R, u1, u2);
      if (!Q)
        throw new Error("point at infinify");
      Q.assertValidity();
      return Q;
    }
    // Signatures should be low-s, to prevent malleability.
    hasHighS() {
      return isBiggerThanHalfOrder(this.s);
    }
    normalizeS() {
      return this.hasHighS() ? new Signature(this.r, modN2(-this.s), this.recovery) : this;
    }
    // DER-encoded
    toDERRawBytes() {
      return hexToBytes2(this.toDERHex());
    }
    toDERHex() {
      return DER.hexFromSig(this);
    }
    // padded bytes of r, then padded bytes of s
    toCompactRawBytes() {
      return hexToBytes2(this.toCompactHex());
    }
    toCompactHex() {
      const l = nByteLength;
      return numToSizedHex(this.r, l) + numToSizedHex(this.s, l);
    }
  }
  const utils = {
    isValidPrivateKey(privateKey) {
      try {
        normPrivateKeyToScalar(privateKey);
        return true;
      } catch (error) {
        return false;
      }
    },
    normPrivateKeyToScalar,
    /**
     * Produces cryptographically secure private key from random of size
     * (groupLen + ceil(groupLen / 2)) with modulo bias being negligible.
     */
    randomPrivateKey: () => {
      const length = getMinHashLength(CURVE.n);
      return mapHashToField(CURVE.randomBytes(length), CURVE.n);
    },
    /**
     * Creates precompute table for an arbitrary EC point. Makes point "cached".
     * Allows to massively speed-up `point.multiply(scalar)`.
     * @returns cached point
     * @example
     * const fast = utils.precompute(8, ProjectivePoint.fromHex(someonesPubKey));
     * fast.multiply(privKey); // much faster ECDH now
     */
    precompute(windowSize = 8, point2 = Point2.BASE) {
      point2._setWindowSize(windowSize);
      point2.multiply(BigInt(3));
      return point2;
    }
  };
  function getPublicKey(privateKey, isCompressed = true) {
    return Point2.fromPrivateKey(privateKey).toRawBytes(isCompressed);
  }
  function isProbPub(item) {
    if (typeof item === "bigint")
      return false;
    if (item instanceof Point2)
      return true;
    const arr = ensureBytes("key", item);
    const len = arr.length;
    const fpl = Fp.BYTES;
    const compLen = fpl + 1;
    const uncompLen = 2 * fpl + 1;
    if (CURVE.allowedPrivateKeyLengths || nByteLength === compLen) {
      return void 0;
    } else {
      return len === compLen || len === uncompLen;
    }
  }
  function getSharedSecret(privateA, publicB, isCompressed = true) {
    if (isProbPub(privateA) === true)
      throw new Error("first arg must be private key");
    if (isProbPub(publicB) === false)
      throw new Error("second arg must be public key");
    const b = Point2.fromHex(publicB);
    return b.multiply(normPrivateKeyToScalar(privateA)).toRawBytes(isCompressed);
  }
  const bits2int = CURVE.bits2int || function(bytes) {
    if (bytes.length > 8192)
      throw new Error("input is too large");
    const num2 = bytesToNumberBE(bytes);
    const delta = bytes.length * 8 - nBitLength;
    return delta > 0 ? num2 >> BigInt(delta) : num2;
  };
  const bits2int_modN = CURVE.bits2int_modN || function(bytes) {
    return modN2(bits2int(bytes));
  };
  const ORDER_MASK = bitMask(nBitLength);
  function int2octets(num2) {
    aInRange("num < 2^" + nBitLength, num2, _0n5, ORDER_MASK);
    return numberToBytesBE(num2, nByteLength);
  }
  function prepSig(msgHash, privateKey, opts = defaultSigOpts) {
    if (["recovered", "canonical"].some((k) => k in opts))
      throw new Error("sign() legacy options not supported");
    const { hash: hash3, randomBytes: randomBytes2 } = CURVE;
    let { lowS, prehash, extraEntropy: ent } = opts;
    if (lowS == null)
      lowS = true;
    msgHash = ensureBytes("msgHash", msgHash);
    validateSigVerOpts(opts);
    if (prehash)
      msgHash = ensureBytes("prehashed msgHash", hash3(msgHash));
    const h1int = bits2int_modN(msgHash);
    const d = normPrivateKeyToScalar(privateKey);
    const seedArgs = [int2octets(d), int2octets(h1int)];
    if (ent != null && ent !== false) {
      const e = ent === true ? randomBytes2(Fp.BYTES) : ent;
      seedArgs.push(ensureBytes("extraEntropy", e));
    }
    const seed = concatBytes3(...seedArgs);
    const m = h1int;
    function k2sig(kBytes) {
      const k = bits2int(kBytes);
      if (!isWithinCurveOrder(k))
        return;
      const ik = invN(k);
      const q = Point2.BASE.multiply(k).toAffine();
      const r = modN2(q.x);
      if (r === _0n5)
        return;
      const s = modN2(ik * modN2(m + r * d));
      if (s === _0n5)
        return;
      let recovery = (q.x === r ? 0 : 2) | Number(q.y & _1n5);
      let normS = s;
      if (lowS && isBiggerThanHalfOrder(s)) {
        normS = normalizeS(s);
        recovery ^= 1;
      }
      return new Signature(r, normS, recovery);
    }
    return { seed, k2sig };
  }
  const defaultSigOpts = { lowS: CURVE.lowS, prehash: false };
  const defaultVerOpts = { lowS: CURVE.lowS, prehash: false };
  function sign(msgHash, privKey, opts = defaultSigOpts) {
    const { seed, k2sig } = prepSig(msgHash, privKey, opts);
    const C = CURVE;
    const drbg = createHmacDrbg(C.hash.outputLen, C.nByteLength, C.hmac);
    return drbg(seed, k2sig);
  }
  Point2.BASE._setWindowSize(8);
  function verify(signature, msgHash, publicKey, opts = defaultVerOpts) {
    const sg = signature;
    msgHash = ensureBytes("msgHash", msgHash);
    publicKey = ensureBytes("publicKey", publicKey);
    const { lowS, prehash, format: format2 } = opts;
    validateSigVerOpts(opts);
    if ("strict" in opts)
      throw new Error("options.strict was renamed to lowS");
    if (format2 !== void 0 && format2 !== "compact" && format2 !== "der")
      throw new Error("format must be compact or der");
    const isHex2 = typeof sg === "string" || isBytes2(sg);
    const isObj = !isHex2 && !format2 && typeof sg === "object" && sg !== null && typeof sg.r === "bigint" && typeof sg.s === "bigint";
    if (!isHex2 && !isObj)
      throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
    let _sig = void 0;
    let P;
    try {
      if (isObj)
        _sig = new Signature(sg.r, sg.s);
      if (isHex2) {
        try {
          if (format2 !== "compact")
            _sig = Signature.fromDER(sg);
        } catch (derError) {
          if (!(derError instanceof DER.Err))
            throw derError;
        }
        if (!_sig && format2 !== "der")
          _sig = Signature.fromCompact(sg);
      }
      P = Point2.fromHex(publicKey);
    } catch (error) {
      return false;
    }
    if (!_sig)
      return false;
    if (lowS && _sig.hasHighS())
      return false;
    if (prehash)
      msgHash = CURVE.hash(msgHash);
    const { r, s } = _sig;
    const h = bits2int_modN(msgHash);
    const is = invN(s);
    const u1 = modN2(h * is);
    const u2 = modN2(r * is);
    const R = Point2.BASE.multiplyAndAddUnsafe(P, u1, u2)?.toAffine();
    if (!R)
      return false;
    const v = modN2(R.x);
    return v === r;
  }
  return {
    CURVE,
    getPublicKey,
    getSharedSecret,
    sign,
    verify,
    ProjectivePoint: Point2,
    Signature,
    utils
  };
}
function SWUFpSqrtRatio(Fp, Z) {
  const q = Fp.ORDER;
  let l = _0n5;
  for (let o = q - _1n5; o % _2n3 === _0n5; o /= _2n3)
    l += _1n5;
  const c1 = l;
  const _2n_pow_c1_1 = _2n3 << c1 - _1n5 - _1n5;
  const _2n_pow_c1 = _2n_pow_c1_1 * _2n3;
  const c2 = (q - _1n5) / _2n_pow_c1;
  const c3 = (c2 - _1n5) / _2n3;
  const c4 = _2n_pow_c1 - _1n5;
  const c5 = _2n_pow_c1_1;
  const c6 = Fp.pow(Z, c2);
  const c7 = Fp.pow(Z, (c2 + _1n5) / _2n3);
  let sqrtRatio = (u, v) => {
    let tv1 = c6;
    let tv2 = Fp.pow(v, c4);
    let tv3 = Fp.sqr(tv2);
    tv3 = Fp.mul(tv3, v);
    let tv5 = Fp.mul(u, tv3);
    tv5 = Fp.pow(tv5, c3);
    tv5 = Fp.mul(tv5, tv2);
    tv2 = Fp.mul(tv5, v);
    tv3 = Fp.mul(tv5, u);
    let tv4 = Fp.mul(tv3, tv2);
    tv5 = Fp.pow(tv4, c5);
    let isQR = Fp.eql(tv5, Fp.ONE);
    tv2 = Fp.mul(tv3, c7);
    tv5 = Fp.mul(tv4, tv1);
    tv3 = Fp.cmov(tv2, tv3, isQR);
    tv4 = Fp.cmov(tv5, tv4, isQR);
    for (let i = c1; i > _1n5; i--) {
      let tv52 = i - _2n3;
      tv52 = _2n3 << tv52 - _1n5;
      let tvv5 = Fp.pow(tv4, tv52);
      const e1 = Fp.eql(tvv5, Fp.ONE);
      tv2 = Fp.mul(tv3, tv1);
      tv1 = Fp.mul(tv1, tv1);
      tvv5 = Fp.mul(tv4, tv1);
      tv3 = Fp.cmov(tv2, tv3, e1);
      tv4 = Fp.cmov(tvv5, tv4, e1);
    }
    return { isValid: isQR, value: tv3 };
  };
  if (Fp.ORDER % _4n2 === _3n2) {
    const c12 = (Fp.ORDER - _3n2) / _4n2;
    const c22 = Fp.sqrt(Fp.neg(Z));
    sqrtRatio = (u, v) => {
      let tv1 = Fp.sqr(v);
      const tv2 = Fp.mul(u, v);
      tv1 = Fp.mul(tv1, tv2);
      let y1 = Fp.pow(tv1, c12);
      y1 = Fp.mul(y1, tv2);
      const y2 = Fp.mul(y1, c22);
      const tv3 = Fp.mul(Fp.sqr(y1), v);
      const isQR = Fp.eql(tv3, u);
      let y = Fp.cmov(y2, y1, isQR);
      return { isValid: isQR, value: y };
    };
  }
  return sqrtRatio;
}
function mapToCurveSimpleSWU(Fp, opts) {
  validateField(Fp);
  if (!Fp.isValid(opts.A) || !Fp.isValid(opts.B) || !Fp.isValid(opts.Z))
    throw new Error("mapToCurveSimpleSWU: invalid opts");
  const sqrtRatio = SWUFpSqrtRatio(Fp, opts.Z);
  if (!Fp.isOdd)
    throw new Error("Fp.isOdd is not implemented!");
  return (u) => {
    let tv1, tv2, tv3, tv4, tv5, tv6, x, y;
    tv1 = Fp.sqr(u);
    tv1 = Fp.mul(tv1, opts.Z);
    tv2 = Fp.sqr(tv1);
    tv2 = Fp.add(tv2, tv1);
    tv3 = Fp.add(tv2, Fp.ONE);
    tv3 = Fp.mul(tv3, opts.B);
    tv4 = Fp.cmov(opts.Z, Fp.neg(tv2), !Fp.eql(tv2, Fp.ZERO));
    tv4 = Fp.mul(tv4, opts.A);
    tv2 = Fp.sqr(tv3);
    tv6 = Fp.sqr(tv4);
    tv5 = Fp.mul(tv6, opts.A);
    tv2 = Fp.add(tv2, tv5);
    tv2 = Fp.mul(tv2, tv3);
    tv6 = Fp.mul(tv6, tv4);
    tv5 = Fp.mul(tv6, opts.B);
    tv2 = Fp.add(tv2, tv5);
    x = Fp.mul(tv1, tv3);
    const { isValid, value } = sqrtRatio(tv2, tv6);
    y = Fp.mul(tv1, u);
    y = Fp.mul(y, value);
    x = Fp.cmov(x, tv3, isValid);
    y = Fp.cmov(y, value, isValid);
    const e1 = Fp.isOdd(u) === Fp.isOdd(y);
    y = Fp.cmov(Fp.neg(y), y, e1);
    const tv4_inv = FpInvertBatch(Fp, [tv4], true)[0];
    x = Fp.mul(x, tv4_inv);
    return { x, y };
  };
}
var DERErr, DER, _0n5, _1n5, _2n3, _3n2, _4n2;
var init_weierstrass = __esm({
  "node_modules/@noble/curves/esm/abstract/weierstrass.js"() {
    init_curve();
    init_modular();
    init_utils4();
    DERErr = class extends Error {
      constructor(m = "") {
        super(m);
      }
    };
    DER = {
      // asn.1 DER encoding utils
      Err: DERErr,
      // Basic building block is TLV (Tag-Length-Value)
      _tlv: {
        encode: (tag, data) => {
          const { Err: E } = DER;
          if (tag < 0 || tag > 256)
            throw new E("tlv.encode: wrong tag");
          if (data.length & 1)
            throw new E("tlv.encode: unpadded data");
          const dataLen = data.length / 2;
          const len = numberToHexUnpadded(dataLen);
          if (len.length / 2 & 128)
            throw new E("tlv.encode: long form length too big");
          const lenLen = dataLen > 127 ? numberToHexUnpadded(len.length / 2 | 128) : "";
          const t = numberToHexUnpadded(tag);
          return t + lenLen + len + data;
        },
        // v - value, l - left bytes (unparsed)
        decode(tag, data) {
          const { Err: E } = DER;
          let pos = 0;
          if (tag < 0 || tag > 256)
            throw new E("tlv.encode: wrong tag");
          if (data.length < 2 || data[pos++] !== tag)
            throw new E("tlv.decode: wrong tlv");
          const first = data[pos++];
          const isLong = !!(first & 128);
          let length = 0;
          if (!isLong)
            length = first;
          else {
            const lenLen = first & 127;
            if (!lenLen)
              throw new E("tlv.decode(long): indefinite length not supported");
            if (lenLen > 4)
              throw new E("tlv.decode(long): byte length is too big");
            const lengthBytes = data.subarray(pos, pos + lenLen);
            if (lengthBytes.length !== lenLen)
              throw new E("tlv.decode: length bytes not complete");
            if (lengthBytes[0] === 0)
              throw new E("tlv.decode(long): zero leftmost byte");
            for (const b of lengthBytes)
              length = length << 8 | b;
            pos += lenLen;
            if (length < 128)
              throw new E("tlv.decode(long): not minimal encoding");
          }
          const v = data.subarray(pos, pos + length);
          if (v.length !== length)
            throw new E("tlv.decode: wrong value length");
          return { v, l: data.subarray(pos + length) };
        }
      },
      // https://crypto.stackexchange.com/a/57734 Leftmost bit of first byte is 'negative' flag,
      // since we always use positive integers here. It must always be empty:
      // - add zero byte if exists
      // - if next byte doesn't have a flag, leading zero is not allowed (minimal encoding)
      _int: {
        encode(num2) {
          const { Err: E } = DER;
          if (num2 < _0n5)
            throw new E("integer: negative integers are not allowed");
          let hex = numberToHexUnpadded(num2);
          if (Number.parseInt(hex[0], 16) & 8)
            hex = "00" + hex;
          if (hex.length & 1)
            throw new E("unexpected DER parsing assertion: unpadded hex");
          return hex;
        },
        decode(data) {
          const { Err: E } = DER;
          if (data[0] & 128)
            throw new E("invalid signature integer: negative");
          if (data[0] === 0 && !(data[1] & 128))
            throw new E("invalid signature integer: unnecessary leading zero");
          return bytesToNumberBE(data);
        }
      },
      toSig(hex) {
        const { Err: E, _int: int, _tlv: tlv } = DER;
        const data = ensureBytes("signature", hex);
        const { v: seqBytes, l: seqLeftBytes } = tlv.decode(48, data);
        if (seqLeftBytes.length)
          throw new E("invalid signature: left bytes after parsing");
        const { v: rBytes, l: rLeftBytes } = tlv.decode(2, seqBytes);
        const { v: sBytes, l: sLeftBytes } = tlv.decode(2, rLeftBytes);
        if (sLeftBytes.length)
          throw new E("invalid signature: left bytes after parsing");
        return { r: int.decode(rBytes), s: int.decode(sBytes) };
      },
      hexFromSig(sig) {
        const { _tlv: tlv, _int: int } = DER;
        const rs = tlv.encode(2, int.encode(sig.r));
        const ss = tlv.encode(2, int.encode(sig.s));
        const seq = rs + ss;
        return tlv.encode(48, seq);
      }
    };
    _0n5 = BigInt(0);
    _1n5 = BigInt(1);
    _2n3 = BigInt(2);
    _3n2 = BigInt(3);
    _4n2 = BigInt(4);
  }
});

// node_modules/@noble/curves/esm/_shortw_utils.js
function getHash(hash3) {
  return {
    hash: hash3,
    hmac: (key, ...msgs) => hmac(hash3, key, concatBytes(...msgs)),
    randomBytes
  };
}
function createCurve(curveDef, defHash) {
  const create2 = (hash3) => weierstrass({ ...curveDef, ...getHash(hash3) });
  return { ...create2(defHash), create: create2 };
}
var init_shortw_utils = __esm({
  "node_modules/@noble/curves/esm/_shortw_utils.js"() {
    init_hmac();
    init_utils2();
    init_weierstrass();
  }
});

// node_modules/@noble/curves/esm/abstract/hash-to-curve.js
function i2osp(value, length) {
  anum(value);
  anum(length);
  if (value < 0 || value >= 1 << 8 * length)
    throw new Error("invalid I2OSP input: " + value);
  const res = Array.from({ length }).fill(0);
  for (let i = length - 1; i >= 0; i--) {
    res[i] = value & 255;
    value >>>= 8;
  }
  return new Uint8Array(res);
}
function strxor(a, b) {
  const arr = new Uint8Array(a.length);
  for (let i = 0; i < a.length; i++) {
    arr[i] = a[i] ^ b[i];
  }
  return arr;
}
function anum(item) {
  if (!Number.isSafeInteger(item))
    throw new Error("number expected");
}
function expand_message_xmd(msg, DST, lenInBytes, H) {
  abytes2(msg);
  abytes2(DST);
  anum(lenInBytes);
  if (DST.length > 255)
    DST = H(concatBytes3(utf8ToBytes2("H2C-OVERSIZE-DST-"), DST));
  const { outputLen: b_in_bytes, blockLen: r_in_bytes } = H;
  const ell = Math.ceil(lenInBytes / b_in_bytes);
  if (lenInBytes > 65535 || ell > 255)
    throw new Error("expand_message_xmd: invalid lenInBytes");
  const DST_prime = concatBytes3(DST, i2osp(DST.length, 1));
  const Z_pad = i2osp(0, r_in_bytes);
  const l_i_b_str = i2osp(lenInBytes, 2);
  const b = new Array(ell);
  const b_0 = H(concatBytes3(Z_pad, msg, l_i_b_str, i2osp(0, 1), DST_prime));
  b[0] = H(concatBytes3(b_0, i2osp(1, 1), DST_prime));
  for (let i = 1; i <= ell; i++) {
    const args = [strxor(b_0, b[i - 1]), i2osp(i + 1, 1), DST_prime];
    b[i] = H(concatBytes3(...args));
  }
  const pseudo_random_bytes = concatBytes3(...b);
  return pseudo_random_bytes.slice(0, lenInBytes);
}
function expand_message_xof(msg, DST, lenInBytes, k, H) {
  abytes2(msg);
  abytes2(DST);
  anum(lenInBytes);
  if (DST.length > 255) {
    const dkLen = Math.ceil(2 * k / 8);
    DST = H.create({ dkLen }).update(utf8ToBytes2("H2C-OVERSIZE-DST-")).update(DST).digest();
  }
  if (lenInBytes > 65535 || DST.length > 255)
    throw new Error("expand_message_xof: invalid lenInBytes");
  return H.create({ dkLen: lenInBytes }).update(msg).update(i2osp(lenInBytes, 2)).update(DST).update(i2osp(DST.length, 1)).digest();
}
function hash_to_field(msg, count, options) {
  validateObject(options, {
    DST: "stringOrUint8Array",
    p: "bigint",
    m: "isSafeInteger",
    k: "isSafeInteger",
    hash: "hash"
  });
  const { p, k, m, hash: hash3, expand, DST: _DST } = options;
  abytes2(msg);
  anum(count);
  const DST = typeof _DST === "string" ? utf8ToBytes2(_DST) : _DST;
  const log2p = p.toString(2).length;
  const L = Math.ceil((log2p + k) / 8);
  const len_in_bytes = count * m * L;
  let prb;
  if (expand === "xmd") {
    prb = expand_message_xmd(msg, DST, len_in_bytes, hash3);
  } else if (expand === "xof") {
    prb = expand_message_xof(msg, DST, len_in_bytes, k, hash3);
  } else if (expand === "_internal_pass") {
    prb = msg;
  } else {
    throw new Error('expand must be "xmd" or "xof"');
  }
  const u = new Array(count);
  for (let i = 0; i < count; i++) {
    const e = new Array(m);
    for (let j = 0; j < m; j++) {
      const elm_offset = L * (j + i * m);
      const tv = prb.subarray(elm_offset, elm_offset + L);
      e[j] = mod(os2ip(tv), p);
    }
    u[i] = e;
  }
  return u;
}
function isogenyMap(field, map) {
  const coeff = map.map((i) => Array.from(i).reverse());
  return (x, y) => {
    const [xn, xd, yn, yd] = coeff.map((val) => val.reduce((acc, i) => field.add(field.mul(acc, x), i)));
    const [xd_inv, yd_inv] = FpInvertBatch(field, [xd, yd], true);
    x = field.mul(xn, xd_inv);
    y = field.mul(y, field.mul(yn, yd_inv));
    return { x, y };
  };
}
function createHasher2(Point2, mapToCurve, defaults) {
  if (typeof mapToCurve !== "function")
    throw new Error("mapToCurve() must be defined");
  function map(num2) {
    return Point2.fromAffine(mapToCurve(num2));
  }
  function clear(initial) {
    const P = initial.clearCofactor();
    if (P.equals(Point2.ZERO))
      return Point2.ZERO;
    P.assertValidity();
    return P;
  }
  return {
    defaults,
    // Encodes byte string to elliptic curve.
    // hash_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
    hashToCurve(msg, options) {
      const u = hash_to_field(msg, 2, { ...defaults, DST: defaults.DST, ...options });
      const u0 = map(u[0]);
      const u1 = map(u[1]);
      return clear(u0.add(u1));
    },
    // Encodes byte string to elliptic curve.
    // encode_to_curve from https://www.rfc-editor.org/rfc/rfc9380#section-3
    encodeToCurve(msg, options) {
      const u = hash_to_field(msg, 1, { ...defaults, DST: defaults.encodeDST, ...options });
      return clear(map(u[0]));
    },
    // Same as encodeToCurve, but without hash
    mapToCurve(scalars) {
      if (!Array.isArray(scalars))
        throw new Error("expected array of bigints");
      for (const i of scalars)
        if (typeof i !== "bigint")
          throw new Error("expected array of bigints");
      return clear(map(scalars));
    }
  };
}
var os2ip;
var init_hash_to_curve = __esm({
  "node_modules/@noble/curves/esm/abstract/hash-to-curve.js"() {
    init_modular();
    init_utils4();
    os2ip = bytesToNumberBE;
  }
});

// node_modules/@noble/curves/esm/secp256k1.js
var secp256k1_exports = {};
__export(secp256k1_exports, {
  encodeToCurve: () => encodeToCurve,
  hashToCurve: () => hashToCurve,
  schnorr: () => schnorr,
  secp256k1: () => secp256k1,
  secp256k1_hasher: () => secp256k1_hasher
});
function sqrtMod(y) {
  const P = secp256k1P;
  const _3n3 = BigInt(3), _6n = BigInt(6), _11n = BigInt(11), _22n = BigInt(22);
  const _23n = BigInt(23), _44n = BigInt(44), _88n = BigInt(88);
  const b2 = y * y * y % P;
  const b3 = b2 * b2 * y % P;
  const b6 = pow2(b3, _3n3, P) * b3 % P;
  const b9 = pow2(b6, _3n3, P) * b3 % P;
  const b11 = pow2(b9, _2n4, P) * b2 % P;
  const b22 = pow2(b11, _11n, P) * b11 % P;
  const b44 = pow2(b22, _22n, P) * b22 % P;
  const b88 = pow2(b44, _44n, P) * b44 % P;
  const b176 = pow2(b88, _88n, P) * b88 % P;
  const b220 = pow2(b176, _44n, P) * b44 % P;
  const b223 = pow2(b220, _3n3, P) * b3 % P;
  const t1 = pow2(b223, _23n, P) * b22 % P;
  const t2 = pow2(t1, _6n, P) * b2 % P;
  const root = pow2(t2, _2n4, P);
  if (!Fpk1.eql(Fpk1.sqr(root), y))
    throw new Error("Cannot find square root");
  return root;
}
function taggedHash(tag, ...messages) {
  let tagP = TAGGED_HASH_PREFIXES[tag];
  if (tagP === void 0) {
    const tagH = sha256(Uint8Array.from(tag, (c) => c.charCodeAt(0)));
    tagP = concatBytes3(tagH, tagH);
    TAGGED_HASH_PREFIXES[tag] = tagP;
  }
  return sha256(concatBytes3(tagP, ...messages));
}
function schnorrGetExtPubKey(priv) {
  let d_ = secp256k1.utils.normPrivateKeyToScalar(priv);
  let p = Point.fromPrivateKey(d_);
  const scalar = p.hasEvenY() ? d_ : modN(-d_);
  return { scalar, bytes: pointToBytes(p) };
}
function lift_x(x) {
  aInRange("x", x, _1n6, secp256k1P);
  const xx = modP(x * x);
  const c = modP(xx * x + BigInt(7));
  let y = sqrtMod(c);
  if (y % _2n4 !== _0n6)
    y = modP(-y);
  const p = new Point(x, y, _1n6);
  p.assertValidity();
  return p;
}
function challenge(...args) {
  return modN(num(taggedHash("BIP0340/challenge", ...args)));
}
function schnorrGetPublicKey(privateKey) {
  return schnorrGetExtPubKey(privateKey).bytes;
}
function schnorrSign(message, privateKey, auxRand = randomBytes(32)) {
  const m = ensureBytes("message", message);
  const { bytes: px, scalar: d } = schnorrGetExtPubKey(privateKey);
  const a = ensureBytes("auxRand", auxRand, 32);
  const t = numTo32b(d ^ num(taggedHash("BIP0340/aux", a)));
  const rand = taggedHash("BIP0340/nonce", t, px, m);
  const k_ = modN(num(rand));
  if (k_ === _0n6)
    throw new Error("sign failed: k is zero");
  const { bytes: rx, scalar: k } = schnorrGetExtPubKey(k_);
  const e = challenge(rx, px, m);
  const sig = new Uint8Array(64);
  sig.set(rx, 0);
  sig.set(numTo32b(modN(k + e * d)), 32);
  if (!schnorrVerify(sig, m, px))
    throw new Error("sign: Invalid signature produced");
  return sig;
}
function schnorrVerify(signature, message, publicKey) {
  const sig = ensureBytes("signature", signature, 64);
  const m = ensureBytes("message", message);
  const pub = ensureBytes("publicKey", publicKey, 32);
  try {
    const P = lift_x(num(pub));
    const r = num(sig.subarray(0, 32));
    if (!inRange(r, _1n6, secp256k1P))
      return false;
    const s = num(sig.subarray(32, 64));
    if (!inRange(s, _1n6, secp256k1N))
      return false;
    const e = challenge(numTo32b(r), pointToBytes(P), m);
    const R = GmulAdd(P, s, modN(-e));
    if (!R || !R.hasEvenY() || R.toAffine().x !== r)
      return false;
    return true;
  } catch (error) {
    return false;
  }
}
var secp256k1P, secp256k1N, _0n6, _1n6, _2n4, divNearest, Fpk1, secp256k1, TAGGED_HASH_PREFIXES, pointToBytes, numTo32b, modP, modN, Point, GmulAdd, num, schnorr, isoMap, mapSWU, secp256k1_hasher, hashToCurve, encodeToCurve;
var init_secp256k1 = __esm({
  "node_modules/@noble/curves/esm/secp256k1.js"() {
    init_sha2();
    init_utils2();
    init_shortw_utils();
    init_hash_to_curve();
    init_modular();
    init_utils4();
    init_weierstrass();
    secp256k1P = BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f");
    secp256k1N = BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141");
    _0n6 = BigInt(0);
    _1n6 = BigInt(1);
    _2n4 = BigInt(2);
    divNearest = (a, b) => (a + b / _2n4) / b;
    Fpk1 = Field(secp256k1P, void 0, void 0, { sqrt: sqrtMod });
    secp256k1 = createCurve({
      a: _0n6,
      b: BigInt(7),
      Fp: Fpk1,
      n: secp256k1N,
      Gx: BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),
      Gy: BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),
      h: BigInt(1),
      lowS: true,
      // Allow only low-S signatures by default in sign() and verify()
      endo: {
        // Endomorphism, see above
        beta: BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),
        splitScalar: (k) => {
          const n2 = secp256k1N;
          const a1 = BigInt("0x3086d221a7d46bcde86c90e49284eb15");
          const b1 = -_1n6 * BigInt("0xe4437ed6010e88286f547fa90abfe4c3");
          const a2 = BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8");
          const b2 = a1;
          const POW_2_128 = BigInt("0x100000000000000000000000000000000");
          const c1 = divNearest(b2 * k, n2);
          const c2 = divNearest(-b1 * k, n2);
          let k1 = mod(k - c1 * a1 - c2 * a2, n2);
          let k2 = mod(-c1 * b1 - c2 * b2, n2);
          const k1neg = k1 > POW_2_128;
          const k2neg = k2 > POW_2_128;
          if (k1neg)
            k1 = n2 - k1;
          if (k2neg)
            k2 = n2 - k2;
          if (k1 > POW_2_128 || k2 > POW_2_128) {
            throw new Error("splitScalar: Endomorphism failed, k=" + k);
          }
          return { k1neg, k1, k2neg, k2 };
        }
      }
    }, sha256);
    TAGGED_HASH_PREFIXES = {};
    pointToBytes = (point2) => point2.toRawBytes(true).slice(1);
    numTo32b = (n2) => numberToBytesBE(n2, 32);
    modP = (x) => mod(x, secp256k1P);
    modN = (x) => mod(x, secp256k1N);
    Point = /* @__PURE__ */ (() => secp256k1.ProjectivePoint)();
    GmulAdd = (Q, a, b) => Point.BASE.multiplyAndAddUnsafe(Q, a, b);
    num = bytesToNumberBE;
    schnorr = /* @__PURE__ */ (() => ({
      getPublicKey: schnorrGetPublicKey,
      sign: schnorrSign,
      verify: schnorrVerify,
      utils: {
        randomPrivateKey: secp256k1.utils.randomPrivateKey,
        lift_x,
        pointToBytes,
        numberToBytesBE,
        bytesToNumberBE,
        taggedHash,
        mod
      }
    }))();
    isoMap = /* @__PURE__ */ (() => isogenyMap(Fpk1, [
      // xNum
      [
        "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa8c7",
        "0x7d3d4c80bc321d5b9f315cea7fd44c5d595d2fc0bf63b92dfff1044f17c6581",
        "0x534c328d23f234e6e2a413deca25caece4506144037c40314ecbd0b53d9dd262",
        "0x8e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38e38daaaaa88c"
      ],
      // xDen
      [
        "0xd35771193d94918a9ca34ccbb7b640dd86cd409542f8487d9fe6b745781eb49b",
        "0xedadc6f64383dc1df7c4b2d51b54225406d36b641f5e41bbc52a56612a8c6d14",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
        // LAST 1
      ],
      // yNum
      [
        "0x4bda12f684bda12f684bda12f684bda12f684bda12f684bda12f684b8e38e23c",
        "0xc75e0c32d5cb7c0fa9d0a54b12a0a6d5647ab046d686da6fdffc90fc201d71a3",
        "0x29a6194691f91a73715209ef6512e576722830a201be2018a765e85a9ecee931",
        "0x2f684bda12f684bda12f684bda12f684bda12f684bda12f684bda12f38e38d84"
      ],
      // yDen
      [
        "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffff93b",
        "0x7a06534bb8bdb49fd5e9e6632722c2989467c1bfc8e8d978dfb425d2685c2573",
        "0x6484aa716545ca2cf3a70c3fa8fe337e0a3d21162f0d6299a7bf8192bfd2a76f",
        "0x0000000000000000000000000000000000000000000000000000000000000001"
        // LAST 1
      ]
    ].map((i) => i.map((j) => BigInt(j)))))();
    mapSWU = /* @__PURE__ */ (() => mapToCurveSimpleSWU(Fpk1, {
      A: BigInt("0x3f8731abdd661adca08a5558f0f5d272e953d363cb6f0e5d405447c01a444533"),
      B: BigInt("1771"),
      Z: Fpk1.create(BigInt("-11"))
    }))();
    secp256k1_hasher = /* @__PURE__ */ (() => createHasher2(secp256k1.ProjectivePoint, (scalars) => {
      const { x, y } = mapSWU(Fpk1.create(scalars[0]));
      return isoMap(x, y);
    }, {
      DST: "secp256k1_XMD:SHA-256_SSWU_RO_",
      encodeDST: "secp256k1_XMD:SHA-256_SSWU_NU_",
      p: Fpk1.ORDER,
      m: 1,
      k: 128,
      expand: "xmd",
      hash: sha256
    }))();
    hashToCurve = /* @__PURE__ */ (() => secp256k1_hasher.hashToCurve)();
    encodeToCurve = /* @__PURE__ */ (() => secp256k1_hasher.encodeToCurve)();
  }
});

// node_modules/viem/_esm/errors/node.js
var ExecutionRevertedError, FeeCapTooHighError, FeeCapTooLowError, NonceTooHighError, NonceTooLowError, NonceMaxValueError, InsufficientFundsError, IntrinsicGasTooHighError, IntrinsicGasTooLowError, TransactionTypeNotSupportedError, TipAboveFeeCapError, UnknownNodeError;
var init_node = __esm({
  "node_modules/viem/_esm/errors/node.js"() {
    init_formatGwei();
    init_base();
    ExecutionRevertedError = class extends BaseError2 {
      constructor({ cause, message } = {}) {
        const reason = message?.replace("execution reverted: ", "")?.replace("execution reverted", "");
        super(`Execution reverted ${reason ? `with reason: ${reason}` : "for an unknown reason"}.`, {
          cause,
          name: "ExecutionRevertedError"
        });
      }
    };
    Object.defineProperty(ExecutionRevertedError, "code", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 3
    });
    Object.defineProperty(ExecutionRevertedError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /execution reverted|gas required exceeds allowance/
    });
    FeeCapTooHighError = class extends BaseError2 {
      constructor({ cause, maxFeePerGas } = {}) {
        super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei2(maxFeePerGas)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
          cause,
          name: "FeeCapTooHighError"
        });
      }
    };
    Object.defineProperty(FeeCapTooHighError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
    });
    FeeCapTooLowError = class extends BaseError2 {
      constructor({ cause, maxFeePerGas } = {}) {
        super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei2(maxFeePerGas)}` : ""} gwei) cannot be lower than the block base fee.`, {
          cause,
          name: "FeeCapTooLowError"
        });
      }
    };
    Object.defineProperty(FeeCapTooLowError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
    });
    NonceTooHighError = class extends BaseError2 {
      constructor({ cause, nonce } = {}) {
        super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is higher than the next one expected.`, { cause, name: "NonceTooHighError" });
      }
    };
    Object.defineProperty(NonceTooHighError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /nonce too high/
    });
    NonceTooLowError = class extends BaseError2 {
      constructor({ cause, nonce } = {}) {
        super([
          `Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is lower than the current nonce of the account.`,
          "Try increasing the nonce or find the latest nonce with `getTransactionCount`."
        ].join("\n"), { cause, name: "NonceTooLowError" });
      }
    };
    Object.defineProperty(NonceTooLowError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /nonce too low|transaction already imported|already known/
    });
    NonceMaxValueError = class extends BaseError2 {
      constructor({ cause, nonce } = {}) {
        super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}exceeds the maximum allowed nonce.`, { cause, name: "NonceMaxValueError" });
      }
    };
    Object.defineProperty(NonceMaxValueError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /nonce has max value/
    });
    InsufficientFundsError = class extends BaseError2 {
      constructor({ cause } = {}) {
        super([
          "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."
        ].join("\n"), {
          cause,
          metaMessages: [
            "This error could arise when the account does not have enough funds to:",
            " - pay for the total gas fee,",
            " - pay for the value to send.",
            " ",
            "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
            " - `gas` is the amount of gas needed for transaction to execute,",
            " - `gas fee` is the gas fee,",
            " - `value` is the amount of ether to send to the recipient."
          ],
          name: "InsufficientFundsError"
        });
      }
    };
    Object.defineProperty(InsufficientFundsError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /insufficient funds|exceeds transaction sender account balance/
    });
    IntrinsicGasTooHighError = class extends BaseError2 {
      constructor({ cause, gas } = {}) {
        super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
          cause,
          name: "IntrinsicGasTooHighError"
        });
      }
    };
    Object.defineProperty(IntrinsicGasTooHighError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /intrinsic gas too high|gas limit reached/
    });
    IntrinsicGasTooLowError = class extends BaseError2 {
      constructor({ cause, gas } = {}) {
        super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction is too low.`, {
          cause,
          name: "IntrinsicGasTooLowError"
        });
      }
    };
    Object.defineProperty(IntrinsicGasTooLowError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /intrinsic gas too low/
    });
    TransactionTypeNotSupportedError = class extends BaseError2 {
      constructor({ cause }) {
        super("The transaction type is not supported for this chain.", {
          cause,
          name: "TransactionTypeNotSupportedError"
        });
      }
    };
    Object.defineProperty(TransactionTypeNotSupportedError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /transaction type not valid/
    });
    TipAboveFeeCapError = class extends BaseError2 {
      constructor({ cause, maxPriorityFeePerGas, maxFeePerGas } = {}) {
        super([
          `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${formatGwei2(maxPriorityFeePerGas)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei2(maxFeePerGas)} gwei` : ""}).`
        ].join("\n"), {
          cause,
          name: "TipAboveFeeCapError"
        });
      }
    };
    Object.defineProperty(TipAboveFeeCapError, "nodeMessage", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
    });
    UnknownNodeError = class extends BaseError2 {
      constructor({ cause }) {
        super(`An error occurred while executing: ${cause?.shortMessage}`, {
          cause,
          name: "UnknownNodeError"
        });
      }
    };
  }
});

// node_modules/viem/_esm/utils/errors/getNodeError.js
function getNodeError(err, args) {
  const message = (err.details || "").toLowerCase();
  const executionRevertedError = err instanceof BaseError2 ? err.walk((e) => e?.code === ExecutionRevertedError.code) : err;
  if (executionRevertedError instanceof BaseError2)
    return new ExecutionRevertedError({
      cause: err,
      message: executionRevertedError.details
    });
  if (ExecutionRevertedError.nodeMessage.test(message))
    return new ExecutionRevertedError({
      cause: err,
      message: err.details
    });
  if (FeeCapTooHighError.nodeMessage.test(message))
    return new FeeCapTooHighError({
      cause: err,
      maxFeePerGas: args?.maxFeePerGas
    });
  if (FeeCapTooLowError.nodeMessage.test(message))
    return new FeeCapTooLowError({
      cause: err,
      maxFeePerGas: args?.maxFeePerGas
    });
  if (NonceTooHighError.nodeMessage.test(message))
    return new NonceTooHighError({ cause: err, nonce: args?.nonce });
  if (NonceTooLowError.nodeMessage.test(message))
    return new NonceTooLowError({ cause: err, nonce: args?.nonce });
  if (NonceMaxValueError.nodeMessage.test(message))
    return new NonceMaxValueError({ cause: err, nonce: args?.nonce });
  if (InsufficientFundsError.nodeMessage.test(message))
    return new InsufficientFundsError({ cause: err });
  if (IntrinsicGasTooHighError.nodeMessage.test(message))
    return new IntrinsicGasTooHighError({ cause: err, gas: args?.gas });
  if (IntrinsicGasTooLowError.nodeMessage.test(message))
    return new IntrinsicGasTooLowError({ cause: err, gas: args?.gas });
  if (TransactionTypeNotSupportedError.nodeMessage.test(message))
    return new TransactionTypeNotSupportedError({ cause: err });
  if (TipAboveFeeCapError.nodeMessage.test(message))
    return new TipAboveFeeCapError({
      cause: err,
      maxFeePerGas: args?.maxFeePerGas,
      maxPriorityFeePerGas: args?.maxPriorityFeePerGas
    });
  return new UnknownNodeError({
    cause: err
  });
}
var init_getNodeError = __esm({
  "node_modules/viem/_esm/utils/errors/getNodeError.js"() {
    init_base();
    init_node();
  }
});

// node_modules/viem/_esm/utils/formatters/extract.js
function extract(value_, { format: format2 }) {
  if (!format2)
    return {};
  const value = {};
  function extract_(formatted2) {
    const keys = Object.keys(formatted2);
    for (const key of keys) {
      if (key in value_)
        value[key] = value_[key];
      if (formatted2[key] && typeof formatted2[key] === "object" && !Array.isArray(formatted2[key]))
        extract_(formatted2[key]);
    }
  }
  const formatted = format2(value_ || {});
  extract_(formatted);
  return value;
}
var init_extract = __esm({
  "node_modules/viem/_esm/utils/formatters/extract.js"() {
  }
});

// node_modules/viem/_esm/utils/formatters/transactionRequest.js
function formatTransactionRequest(request, _) {
  const rpcRequest = {};
  if (typeof request.authorizationList !== "undefined")
    rpcRequest.authorizationList = formatAuthorizationList(request.authorizationList);
  if (typeof request.accessList !== "undefined")
    rpcRequest.accessList = request.accessList;
  if (typeof request.blobVersionedHashes !== "undefined")
    rpcRequest.blobVersionedHashes = request.blobVersionedHashes;
  if (typeof request.blobs !== "undefined") {
    if (typeof request.blobs[0] !== "string")
      rpcRequest.blobs = request.blobs.map((x) => bytesToHex(x));
    else
      rpcRequest.blobs = request.blobs;
  }
  if (typeof request.data !== "undefined")
    rpcRequest.data = request.data;
  if (request.account)
    rpcRequest.from = request.account.address;
  if (typeof request.from !== "undefined")
    rpcRequest.from = request.from;
  if (typeof request.gas !== "undefined")
    rpcRequest.gas = numberToHex(request.gas);
  if (typeof request.gasPrice !== "undefined")
    rpcRequest.gasPrice = numberToHex(request.gasPrice);
  if (typeof request.maxFeePerBlobGas !== "undefined")
    rpcRequest.maxFeePerBlobGas = numberToHex(request.maxFeePerBlobGas);
  if (typeof request.maxFeePerGas !== "undefined")
    rpcRequest.maxFeePerGas = numberToHex(request.maxFeePerGas);
  if (typeof request.maxPriorityFeePerGas !== "undefined")
    rpcRequest.maxPriorityFeePerGas = numberToHex(request.maxPriorityFeePerGas);
  if (typeof request.nonce !== "undefined")
    rpcRequest.nonce = numberToHex(request.nonce);
  if (typeof request.to !== "undefined")
    rpcRequest.to = request.to;
  if (typeof request.type !== "undefined")
    rpcRequest.type = rpcTransactionType[request.type];
  if (typeof request.value !== "undefined")
    rpcRequest.value = numberToHex(request.value);
  return rpcRequest;
}
function formatAuthorizationList(authorizationList) {
  return authorizationList.map((authorization) => ({
    address: authorization.address,
    r: authorization.r ? numberToHex(BigInt(authorization.r)) : authorization.r,
    s: authorization.s ? numberToHex(BigInt(authorization.s)) : authorization.s,
    chainId: numberToHex(authorization.chainId),
    nonce: numberToHex(authorization.nonce),
    ...typeof authorization.yParity !== "undefined" ? { yParity: numberToHex(authorization.yParity) } : {},
    ...typeof authorization.v !== "undefined" && typeof authorization.yParity === "undefined" ? { v: numberToHex(authorization.v) } : {}
  }));
}
var rpcTransactionType;
var init_transactionRequest = __esm({
  "node_modules/viem/_esm/utils/formatters/transactionRequest.js"() {
    init_toHex();
    rpcTransactionType = {
      legacy: "0x0",
      eip2930: "0x1",
      eip1559: "0x2",
      eip4844: "0x3",
      eip7702: "0x4"
    };
  }
});

// node_modules/viem/_esm/utils/stateOverride.js
function serializeStateMapping(stateMapping) {
  if (!stateMapping || stateMapping.length === 0)
    return void 0;
  return stateMapping.reduce((acc, { slot, value }) => {
    if (slot.length !== 66)
      throw new InvalidBytesLengthError({
        size: slot.length,
        targetSize: 66,
        type: "hex"
      });
    if (value.length !== 66)
      throw new InvalidBytesLengthError({
        size: value.length,
        targetSize: 66,
        type: "hex"
      });
    acc[slot] = value;
    return acc;
  }, {});
}
function serializeAccountStateOverride(parameters) {
  const { balance, nonce, state, stateDiff, code } = parameters;
  const rpcAccountStateOverride = {};
  if (code !== void 0)
    rpcAccountStateOverride.code = code;
  if (balance !== void 0)
    rpcAccountStateOverride.balance = numberToHex(balance);
  if (nonce !== void 0)
    rpcAccountStateOverride.nonce = numberToHex(nonce);
  if (state !== void 0)
    rpcAccountStateOverride.state = serializeStateMapping(state);
  if (stateDiff !== void 0) {
    if (rpcAccountStateOverride.state)
      throw new StateAssignmentConflictError();
    rpcAccountStateOverride.stateDiff = serializeStateMapping(stateDiff);
  }
  return rpcAccountStateOverride;
}
function serializeStateOverride(parameters) {
  if (!parameters)
    return void 0;
  const rpcStateOverride = {};
  for (const { address, ...accountState } of parameters) {
    if (!isAddress(address, { strict: false }))
      throw new InvalidAddressError({ address });
    if (rpcStateOverride[address])
      throw new AccountStateConflictError({ address });
    rpcStateOverride[address] = serializeAccountStateOverride(accountState);
  }
  return rpcStateOverride;
}
var init_stateOverride2 = __esm({
  "node_modules/viem/_esm/utils/stateOverride.js"() {
    init_address();
    init_data();
    init_stateOverride();
    init_isAddress();
    init_toHex();
  }
});

// node_modules/viem/_esm/constants/number.js
var maxInt8, maxInt16, maxInt24, maxInt32, maxInt40, maxInt48, maxInt56, maxInt64, maxInt72, maxInt80, maxInt88, maxInt96, maxInt104, maxInt112, maxInt120, maxInt128, maxInt136, maxInt144, maxInt152, maxInt160, maxInt168, maxInt176, maxInt184, maxInt192, maxInt200, maxInt208, maxInt216, maxInt224, maxInt232, maxInt240, maxInt248, maxInt256, minInt8, minInt16, minInt24, minInt32, minInt40, minInt48, minInt56, minInt64, minInt72, minInt80, minInt88, minInt96, minInt104, minInt112, minInt120, minInt128, minInt136, minInt144, minInt152, minInt160, minInt168, minInt176, minInt184, minInt192, minInt200, minInt208, minInt216, minInt224, minInt232, minInt240, minInt248, minInt256, maxUint8, maxUint16, maxUint24, maxUint32, maxUint40, maxUint48, maxUint56, maxUint64, maxUint72, maxUint80, maxUint88, maxUint96, maxUint104, maxUint112, maxUint120, maxUint128, maxUint136, maxUint144, maxUint152, maxUint160, maxUint168, maxUint176, maxUint184, maxUint192, maxUint200, maxUint208, maxUint216, maxUint224, maxUint232, maxUint240, maxUint248, maxUint256;
var init_number = __esm({
  "node_modules/viem/_esm/constants/number.js"() {
    maxInt8 = 2n ** (8n - 1n) - 1n;
    maxInt16 = 2n ** (16n - 1n) - 1n;
    maxInt24 = 2n ** (24n - 1n) - 1n;
    maxInt32 = 2n ** (32n - 1n) - 1n;
    maxInt40 = 2n ** (40n - 1n) - 1n;
    maxInt48 = 2n ** (48n - 1n) - 1n;
    maxInt56 = 2n ** (56n - 1n) - 1n;
    maxInt64 = 2n ** (64n - 1n) - 1n;
    maxInt72 = 2n ** (72n - 1n) - 1n;
    maxInt80 = 2n ** (80n - 1n) - 1n;
    maxInt88 = 2n ** (88n - 1n) - 1n;
    maxInt96 = 2n ** (96n - 1n) - 1n;
    maxInt104 = 2n ** (104n - 1n) - 1n;
    maxInt112 = 2n ** (112n - 1n) - 1n;
    maxInt120 = 2n ** (120n - 1n) - 1n;
    maxInt128 = 2n ** (128n - 1n) - 1n;
    maxInt136 = 2n ** (136n - 1n) - 1n;
    maxInt144 = 2n ** (144n - 1n) - 1n;
    maxInt152 = 2n ** (152n - 1n) - 1n;
    maxInt160 = 2n ** (160n - 1n) - 1n;
    maxInt168 = 2n ** (168n - 1n) - 1n;
    maxInt176 = 2n ** (176n - 1n) - 1n;
    maxInt184 = 2n ** (184n - 1n) - 1n;
    maxInt192 = 2n ** (192n - 1n) - 1n;
    maxInt200 = 2n ** (200n - 1n) - 1n;
    maxInt208 = 2n ** (208n - 1n) - 1n;
    maxInt216 = 2n ** (216n - 1n) - 1n;
    maxInt224 = 2n ** (224n - 1n) - 1n;
    maxInt232 = 2n ** (232n - 1n) - 1n;
    maxInt240 = 2n ** (240n - 1n) - 1n;
    maxInt248 = 2n ** (248n - 1n) - 1n;
    maxInt256 = 2n ** (256n - 1n) - 1n;
    minInt8 = -(2n ** (8n - 1n));
    minInt16 = -(2n ** (16n - 1n));
    minInt24 = -(2n ** (24n - 1n));
    minInt32 = -(2n ** (32n - 1n));
    minInt40 = -(2n ** (40n - 1n));
    minInt48 = -(2n ** (48n - 1n));
    minInt56 = -(2n ** (56n - 1n));
    minInt64 = -(2n ** (64n - 1n));
    minInt72 = -(2n ** (72n - 1n));
    minInt80 = -(2n ** (80n - 1n));
    minInt88 = -(2n ** (88n - 1n));
    minInt96 = -(2n ** (96n - 1n));
    minInt104 = -(2n ** (104n - 1n));
    minInt112 = -(2n ** (112n - 1n));
    minInt120 = -(2n ** (120n - 1n));
    minInt128 = -(2n ** (128n - 1n));
    minInt136 = -(2n ** (136n - 1n));
    minInt144 = -(2n ** (144n - 1n));
    minInt152 = -(2n ** (152n - 1n));
    minInt160 = -(2n ** (160n - 1n));
    minInt168 = -(2n ** (168n - 1n));
    minInt176 = -(2n ** (176n - 1n));
    minInt184 = -(2n ** (184n - 1n));
    minInt192 = -(2n ** (192n - 1n));
    minInt200 = -(2n ** (200n - 1n));
    minInt208 = -(2n ** (208n - 1n));
    minInt216 = -(2n ** (216n - 1n));
    minInt224 = -(2n ** (224n - 1n));
    minInt232 = -(2n ** (232n - 1n));
    minInt240 = -(2n ** (240n - 1n));
    minInt248 = -(2n ** (248n - 1n));
    minInt256 = -(2n ** (256n - 1n));
    maxUint8 = 2n ** 8n - 1n;
    maxUint16 = 2n ** 16n - 1n;
    maxUint24 = 2n ** 24n - 1n;
    maxUint32 = 2n ** 32n - 1n;
    maxUint40 = 2n ** 40n - 1n;
    maxUint48 = 2n ** 48n - 1n;
    maxUint56 = 2n ** 56n - 1n;
    maxUint64 = 2n ** 64n - 1n;
    maxUint72 = 2n ** 72n - 1n;
    maxUint80 = 2n ** 80n - 1n;
    maxUint88 = 2n ** 88n - 1n;
    maxUint96 = 2n ** 96n - 1n;
    maxUint104 = 2n ** 104n - 1n;
    maxUint112 = 2n ** 112n - 1n;
    maxUint120 = 2n ** 120n - 1n;
    maxUint128 = 2n ** 128n - 1n;
    maxUint136 = 2n ** 136n - 1n;
    maxUint144 = 2n ** 144n - 1n;
    maxUint152 = 2n ** 152n - 1n;
    maxUint160 = 2n ** 160n - 1n;
    maxUint168 = 2n ** 168n - 1n;
    maxUint176 = 2n ** 176n - 1n;
    maxUint184 = 2n ** 184n - 1n;
    maxUint192 = 2n ** 192n - 1n;
    maxUint200 = 2n ** 200n - 1n;
    maxUint208 = 2n ** 208n - 1n;
    maxUint216 = 2n ** 216n - 1n;
    maxUint224 = 2n ** 224n - 1n;
    maxUint232 = 2n ** 232n - 1n;
    maxUint240 = 2n ** 240n - 1n;
    maxUint248 = 2n ** 248n - 1n;
    maxUint256 = 2n ** 256n - 1n;
  }
});

// node_modules/viem/_esm/utils/transaction/assertRequest.js
function assertRequest(args) {
  const { account: account_, maxFeePerGas, maxPriorityFeePerGas, to } = args;
  const account = account_ ? parseAccount(account_) : void 0;
  if (account && !isAddress(account.address))
    throw new InvalidAddressError({ address: account.address });
  if (to && !isAddress(to))
    throw new InvalidAddressError({ address: to });
  if (maxFeePerGas && maxFeePerGas > maxUint256)
    throw new FeeCapTooHighError({ maxFeePerGas });
  if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
    throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
}
var init_assertRequest = __esm({
  "node_modules/viem/_esm/utils/transaction/assertRequest.js"() {
    init_parseAccount();
    init_number();
    init_address();
    init_node();
    init_isAddress();
  }
});

// node_modules/viem/_esm/utils/block/formatBlockParameter.js
function formatBlockParameter(parameters) {
  const { blockHash, blockNumber, blockTag, requireCanonical } = parameters;
  if (requireCanonical !== void 0 && !blockHash)
    throw new BaseError2("`requireCanonical` can only be provided when `blockHash` is set.");
  if (blockHash)
    return requireCanonical ? { blockHash, requireCanonical } : { blockHash };
  if (typeof blockNumber === "bigint")
    return numberToHex(blockNumber);
  return blockTag ?? "latest";
}
var init_formatBlockParameter = __esm({
  "node_modules/viem/_esm/utils/block/formatBlockParameter.js"() {
    init_base();
    init_toHex();
  }
});

// node_modules/viem/_esm/utils/address/isAddressEqual.js
function isAddressEqual(a, b) {
  if (!isAddress(a, { strict: false }))
    throw new InvalidAddressError({ address: a });
  if (!isAddress(b, { strict: false }))
    throw new InvalidAddressError({ address: b });
  return a.toLowerCase() === b.toLowerCase();
}
var init_isAddressEqual = __esm({
  "node_modules/viem/_esm/utils/address/isAddressEqual.js"() {
    init_address();
    init_isAddress();
  }
});

// node_modules/viem/_esm/utils/abi/decodeFunctionResult.js
function decodeFunctionResult(parameters) {
  const { abi: abi2, args, functionName, data } = parameters;
  let abiItem = abi2[0];
  if (functionName) {
    const item = getAbiItem({ abi: abi2, args, name: functionName });
    if (!item)
      throw new AbiFunctionNotFoundError(functionName, { docsPath: docsPath4 });
    abiItem = item;
  }
  if (abiItem.type !== "function")
    throw new AbiFunctionNotFoundError(void 0, { docsPath: docsPath4 });
  if (!abiItem.outputs)
    throw new AbiFunctionOutputsNotFoundError(abiItem.name, { docsPath: docsPath4 });
  const values = decodeAbiParameters(abiItem.outputs, data);
  if (values && values.length > 1)
    return values;
  if (values && values.length === 1)
    return values[0];
  return void 0;
}
var docsPath4;
var init_decodeFunctionResult = __esm({
  "node_modules/viem/_esm/utils/abi/decodeFunctionResult.js"() {
    init_abi();
    init_decodeAbiParameters();
    init_getAbiItem();
    docsPath4 = "/docs/contract/decodeFunctionResult";
  }
});

// node_modules/ox/_esm/core/version.js
var version3;
var init_version3 = __esm({
  "node_modules/ox/_esm/core/version.js"() {
    version3 = "0.1.1";
  }
});

// node_modules/ox/_esm/core/internal/errors.js
function getVersion() {
  return version3;
}
var init_errors2 = __esm({
  "node_modules/ox/_esm/core/internal/errors.js"() {
    init_version3();
  }
});

// node_modules/ox/_esm/core/Errors.js
function walk2(err, fn) {
  if (fn?.(err))
    return err;
  if (err && typeof err === "object" && "cause" in err && err.cause)
    return walk2(err.cause, fn);
  return fn ? null : err;
}
var BaseError3;
var init_Errors = __esm({
  "node_modules/ox/_esm/core/Errors.js"() {
    init_errors2();
    BaseError3 = class _BaseError extends Error {
      static setStaticOptions(options) {
        _BaseError.prototype.docsOrigin = options.docsOrigin;
        _BaseError.prototype.showVersion = options.showVersion;
        _BaseError.prototype.version = options.version;
      }
      constructor(shortMessage, options = {}) {
        const details = (() => {
          if (options.cause instanceof _BaseError) {
            if (options.cause.details)
              return options.cause.details;
            if (options.cause.shortMessage)
              return options.cause.shortMessage;
          }
          if (options.cause && "details" in options.cause && typeof options.cause.details === "string")
            return options.cause.details;
          if (options.cause?.message)
            return options.cause.message;
          return options.details;
        })();
        const docsPath8 = (() => {
          if (options.cause instanceof _BaseError)
            return options.cause.docsPath || options.docsPath;
          return options.docsPath;
        })();
        const docsBaseUrl = options.docsOrigin ?? _BaseError.prototype.docsOrigin;
        const docs = `${docsBaseUrl}${docsPath8 ?? ""}`;
        const showVersion = Boolean(options.version ?? _BaseError.prototype.showVersion);
        const version4 = options.version ?? _BaseError.prototype.version;
        const message = [
          shortMessage || "An error occurred.",
          ...options.metaMessages ? ["", ...options.metaMessages] : [],
          ...details || docsPath8 || showVersion ? [
            "",
            details ? `Details: ${details}` : void 0,
            docsPath8 ? `See: ${docs}` : void 0,
            showVersion ? `Version: ${version4}` : void 0
          ] : []
        ].filter((x) => typeof x === "string").join("\n");
        super(message, options.cause ? { cause: options.cause } : void 0);
        Object.defineProperty(this, "details", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "docs", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "docsOrigin", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "docsPath", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "shortMessage", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "showVersion", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "version", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "cause", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: void 0
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "BaseError"
        });
        this.cause = options.cause;
        this.details = details;
        this.docs = docs;
        this.docsOrigin = docsBaseUrl;
        this.docsPath = docsPath8;
        this.shortMessage = shortMessage;
        this.showVersion = showVersion;
        this.version = version4;
      }
      walk(fn) {
        return walk2(this, fn);
      }
    };
    Object.defineProperty(BaseError3, "defaultStaticOptions", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: {
        docsOrigin: "https://oxlib.sh",
        showVersion: false,
        version: `ox@${getVersion()}`
      }
    });
    (() => {
      BaseError3.setStaticOptions(BaseError3.defaultStaticOptions);
    })();
  }
});

// node_modules/ox/_esm/core/internal/bytes.js
function assertSize2(bytes, size_) {
  if (size2(bytes) > size_)
    throw new SizeOverflowError2({
      givenSize: size2(bytes),
      maxSize: size_
    });
}
function assertStartOffset2(value, start) {
  if (typeof start === "number" && start > 0 && start > size2(value) - 1)
    throw new SliceOffsetOutOfBoundsError2({
      offset: start,
      position: "start",
      size: size2(value)
    });
}
function assertEndOffset2(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size2(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError2({
      offset: end,
      position: "end",
      size: size2(value)
    });
  }
}
function charCodeToBase162(char) {
  if (char >= charCodeMap2.zero && char <= charCodeMap2.nine)
    return char - charCodeMap2.zero;
  if (char >= charCodeMap2.A && char <= charCodeMap2.F)
    return char - (charCodeMap2.A - 10);
  if (char >= charCodeMap2.a && char <= charCodeMap2.f)
    return char - (charCodeMap2.a - 10);
  return void 0;
}
function pad2(bytes, options = {}) {
  const { dir, size: size5 = 32 } = options;
  if (size5 === 0)
    return bytes;
  if (bytes.length > size5)
    throw new SizeExceedsPaddingSizeError2({
      size: bytes.length,
      targetSize: size5,
      type: "Bytes"
    });
  const paddedBytes = new Uint8Array(size5);
  for (let i = 0; i < size5; i++) {
    const padEnd = dir === "right";
    paddedBytes[padEnd ? i : size5 - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
  }
  return paddedBytes;
}
function trim2(value, options = {}) {
  const { dir = "left" } = options;
  let data = value;
  let sliceLength = 0;
  for (let i = 0; i < data.length - 1; i++) {
    if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  return data;
}
var charCodeMap2;
var init_bytes = __esm({
  "node_modules/ox/_esm/core/internal/bytes.js"() {
    init_Bytes();
    charCodeMap2 = {
      zero: 48,
      nine: 57,
      A: 65,
      F: 70,
      a: 97,
      f: 102
    };
  }
});

// node_modules/ox/_esm/core/internal/hex.js
function assertSize3(hex, size_) {
  if (size3(hex) > size_)
    throw new SizeOverflowError3({
      givenSize: size3(hex),
      maxSize: size_
    });
}
function assertStartOffset3(value, start) {
  if (typeof start === "number" && start > 0 && start > size3(value) - 1)
    throw new SliceOffsetOutOfBoundsError3({
      offset: start,
      position: "start",
      size: size3(value)
    });
}
function assertEndOffset3(value, start, end) {
  if (typeof start === "number" && typeof end === "number" && size3(value) !== end - start) {
    throw new SliceOffsetOutOfBoundsError3({
      offset: end,
      position: "end",
      size: size3(value)
    });
  }
}
function pad3(hex_, options = {}) {
  const { dir, size: size5 = 32 } = options;
  if (size5 === 0)
    return hex_;
  const hex = hex_.replace("0x", "");
  if (hex.length > size5 * 2)
    throw new SizeExceedsPaddingSizeError3({
      size: Math.ceil(hex.length / 2),
      targetSize: size5,
      type: "Hex"
    });
  return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size5 * 2, "0")}`;
}
function trim3(value, options = {}) {
  const { dir = "left" } = options;
  let data = value.replace("0x", "");
  let sliceLength = 0;
  for (let i = 0; i < data.length - 1; i++) {
    if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
      sliceLength++;
    else
      break;
  }
  data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
  if (data === "0")
    return "0x";
  if (dir === "right" && data.length % 2 === 1)
    return `0x${data}0`;
  return `0x${data}`;
}
var init_hex = __esm({
  "node_modules/ox/_esm/core/internal/hex.js"() {
    init_Hex();
  }
});

// node_modules/ox/_esm/core/Json.js
function stringify2(value, replacer, space) {
  return JSON.stringify(value, (key, value2) => {
    if (typeof replacer === "function")
      return replacer(key, value2);
    if (typeof value2 === "bigint")
      return value2.toString() + bigIntSuffix;
    return value2;
  }, space);
}
var bigIntSuffix;
var init_Json = __esm({
  "node_modules/ox/_esm/core/Json.js"() {
    bigIntSuffix = "#__bigint";
  }
});

// node_modules/ox/_esm/core/Bytes.js
function assert(value) {
  if (value instanceof Uint8Array)
    return;
  if (!value)
    throw new InvalidBytesTypeError(value);
  if (typeof value !== "object")
    throw new InvalidBytesTypeError(value);
  if (!("BYTES_PER_ELEMENT" in value))
    throw new InvalidBytesTypeError(value);
  if (value.BYTES_PER_ELEMENT !== 1 || value.constructor.name !== "Uint8Array")
    throw new InvalidBytesTypeError(value);
}
function from(value) {
  if (value instanceof Uint8Array)
    return value;
  if (typeof value === "string")
    return fromHex(value);
  return fromArray(value);
}
function fromArray(value) {
  return value instanceof Uint8Array ? value : new Uint8Array(value);
}
function fromHex(value, options = {}) {
  const { size: size5 } = options;
  let hex = value;
  if (size5) {
    assertSize3(value, size5);
    hex = padRight(value, size5);
  }
  let hexString = hex.slice(2);
  if (hexString.length % 2)
    hexString = `0${hexString}`;
  const length = hexString.length / 2;
  const bytes = new Uint8Array(length);
  for (let index2 = 0, j = 0; index2 < length; index2++) {
    const nibbleLeft = charCodeToBase162(hexString.charCodeAt(j++));
    const nibbleRight = charCodeToBase162(hexString.charCodeAt(j++));
    if (nibbleLeft === void 0 || nibbleRight === void 0) {
      throw new BaseError3(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
    }
    bytes[index2] = nibbleLeft << 4 | nibbleRight;
  }
  return bytes;
}
function fromString(value, options = {}) {
  const { size: size5 } = options;
  const bytes = encoder3.encode(value);
  if (typeof size5 === "number") {
    assertSize2(bytes, size5);
    return padRight2(bytes, size5);
  }
  return bytes;
}
function padRight2(value, size5) {
  return pad2(value, { dir: "right", size: size5 });
}
function size2(value) {
  return value.length;
}
function slice2(value, start, end, options = {}) {
  const { strict } = options;
  assertStartOffset2(value, start);
  const value_ = value.slice(start, end);
  if (strict)
    assertEndOffset2(value_, start, end);
  return value_;
}
function toBigInt2(bytes, options = {}) {
  const { size: size5 } = options;
  if (typeof size5 !== "undefined")
    assertSize2(bytes, size5);
  const hex = fromBytes(bytes, options);
  return toBigInt(hex, options);
}
function toBoolean(bytes, options = {}) {
  const { size: size5 } = options;
  let bytes_ = bytes;
  if (typeof size5 !== "undefined") {
    assertSize2(bytes_, size5);
    bytes_ = trimLeft(bytes_);
  }
  if (bytes_.length > 1 || bytes_[0] > 1)
    throw new InvalidBytesBooleanError2(bytes_);
  return Boolean(bytes_[0]);
}
function toNumber2(bytes, options = {}) {
  const { size: size5 } = options;
  if (typeof size5 !== "undefined")
    assertSize2(bytes, size5);
  const hex = fromBytes(bytes, options);
  return toNumber(hex, options);
}
function toString(bytes, options = {}) {
  const { size: size5 } = options;
  let bytes_ = bytes;
  if (typeof size5 !== "undefined") {
    assertSize2(bytes_, size5);
    bytes_ = trimRight(bytes_);
  }
  return decoder.decode(bytes_);
}
function trimLeft(value) {
  return trim2(value, { dir: "left" });
}
function trimRight(value) {
  return trim2(value, { dir: "right" });
}
function validate(value) {
  try {
    assert(value);
    return true;
  } catch {
    return false;
  }
}
var decoder, encoder3, InvalidBytesBooleanError2, InvalidBytesTypeError, SizeOverflowError2, SliceOffsetOutOfBoundsError2, SizeExceedsPaddingSizeError2;
var init_Bytes = __esm({
  "node_modules/ox/_esm/core/Bytes.js"() {
    init_Errors();
    init_Hex();
    init_bytes();
    init_hex();
    init_Json();
    decoder = /* @__PURE__ */ new TextDecoder();
    encoder3 = /* @__PURE__ */ new TextEncoder();
    InvalidBytesBooleanError2 = class extends BaseError3 {
      constructor(bytes) {
        super(`Bytes value \`${bytes}\` is not a valid boolean.`, {
          metaMessages: [
            "The bytes array must contain a single byte of either a `0` or `1` value."
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Bytes.InvalidBytesBooleanError"
        });
      }
    };
    InvalidBytesTypeError = class extends BaseError3 {
      constructor(value) {
        super(`Value \`${typeof value === "object" ? stringify2(value) : value}\` of type \`${typeof value}\` is an invalid Bytes value.`, {
          metaMessages: ["Bytes values must be of type `Bytes`."]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Bytes.InvalidBytesTypeError"
        });
      }
    };
    SizeOverflowError2 = class extends BaseError3 {
      constructor({ givenSize, maxSize }) {
        super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Bytes.SizeOverflowError"
        });
      }
    };
    SliceOffsetOutOfBoundsError2 = class extends BaseError3 {
      constructor({ offset, position, size: size5 }) {
        super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size5}\`).`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Bytes.SliceOffsetOutOfBoundsError"
        });
      }
    };
    SizeExceedsPaddingSizeError2 = class extends BaseError3 {
      constructor({ size: size5, targetSize, type }) {
        super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size5}\`) exceeds padding size (\`${targetSize}\`).`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Bytes.SizeExceedsPaddingSizeError"
        });
      }
    };
  }
});

// node_modules/ox/_esm/core/Hex.js
function assert2(value, options = {}) {
  const { strict = false } = options;
  if (!value)
    throw new InvalidHexTypeError(value);
  if (typeof value !== "string")
    throw new InvalidHexTypeError(value);
  if (strict) {
    if (!/^0x[0-9a-fA-F]*$/.test(value))
      throw new InvalidHexValueError(value);
  }
  if (!value.startsWith("0x"))
    throw new InvalidHexValueError(value);
}
function concat2(...values) {
  return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
}
function from2(value) {
  if (value instanceof Uint8Array)
    return fromBytes(value);
  if (Array.isArray(value))
    return fromBytes(new Uint8Array(value));
  return value;
}
function fromBoolean(value, options = {}) {
  const hex = `0x${Number(value)}`;
  if (typeof options.size === "number") {
    assertSize3(hex, options.size);
    return padLeft(hex, options.size);
  }
  return hex;
}
function fromBytes(value, options = {}) {
  let string = "";
  for (let i = 0; i < value.length; i++)
    string += hexes3[value[i]];
  const hex = `0x${string}`;
  if (typeof options.size === "number") {
    assertSize3(hex, options.size);
    return padRight(hex, options.size);
  }
  return hex;
}
function fromNumber(value, options = {}) {
  const { signed, size: size5 } = options;
  const value_ = BigInt(value);
  let maxValue;
  if (size5) {
    if (signed)
      maxValue = (1n << BigInt(size5) * 8n - 1n) - 1n;
    else
      maxValue = 2n ** (BigInt(size5) * 8n) - 1n;
  } else if (typeof value === "number") {
    maxValue = BigInt(Number.MAX_SAFE_INTEGER);
  }
  const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
  if (maxValue && value_ > maxValue || value_ < minValue) {
    const suffix = typeof value === "bigint" ? "n" : "";
    throw new IntegerOutOfRangeError2({
      max: maxValue ? `${maxValue}${suffix}` : void 0,
      min: `${minValue}${suffix}`,
      signed,
      size: size5,
      value: `${value}${suffix}`
    });
  }
  const stringValue = (signed && value_ < 0 ? BigInt.asUintN(size5 * 8, BigInt(value_)) : value_).toString(16);
  const hex = `0x${stringValue}`;
  if (size5)
    return padLeft(hex, size5);
  return hex;
}
function fromString2(value, options = {}) {
  return fromBytes(encoder4.encode(value), options);
}
function padLeft(value, size5) {
  return pad3(value, { dir: "left", size: size5 });
}
function padRight(value, size5) {
  return pad3(value, { dir: "right", size: size5 });
}
function slice3(value, start, end, options = {}) {
  const { strict } = options;
  assertStartOffset3(value, start);
  const value_ = `0x${value.replace("0x", "").slice((start ?? 0) * 2, (end ?? value.length) * 2)}`;
  if (strict)
    assertEndOffset3(value_, start, end);
  return value_;
}
function size3(value) {
  return Math.ceil((value.length - 2) / 2);
}
function trimLeft2(value) {
  return trim3(value, { dir: "left" });
}
function toBigInt(hex, options = {}) {
  const { signed } = options;
  if (options.size)
    assertSize3(hex, options.size);
  const value = BigInt(hex);
  if (!signed)
    return value;
  const size5 = (hex.length - 2) / 2;
  const max_unsigned = (1n << BigInt(size5) * 8n) - 1n;
  const max_signed = max_unsigned >> 1n;
  if (value <= max_signed)
    return value;
  return value - max_unsigned - 1n;
}
function toNumber(hex, options = {}) {
  const { signed, size: size5 } = options;
  if (!signed && !size5)
    return Number(hex);
  return Number(toBigInt(hex, options));
}
function validate2(value, options = {}) {
  const { strict = false } = options;
  try {
    assert2(value, { strict });
    return true;
  } catch {
    return false;
  }
}
var encoder4, hexes3, IntegerOutOfRangeError2, InvalidHexTypeError, InvalidHexValueError, SizeOverflowError3, SliceOffsetOutOfBoundsError3, SizeExceedsPaddingSizeError3;
var init_Hex = __esm({
  "node_modules/ox/_esm/core/Hex.js"() {
    init_Errors();
    init_hex();
    init_Json();
    encoder4 = /* @__PURE__ */ new TextEncoder();
    hexes3 = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
    IntegerOutOfRangeError2 = class extends BaseError3 {
      constructor({ max, min, signed, size: size5, value }) {
        super(`Number \`${value}\` is not in safe${size5 ? ` ${size5 * 8}-bit` : ""}${signed ? " signed" : " unsigned"} integer range ${max ? `(\`${min}\` to \`${max}\`)` : `(above \`${min}\`)`}`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Hex.IntegerOutOfRangeError"
        });
      }
    };
    InvalidHexTypeError = class extends BaseError3 {
      constructor(value) {
        super(`Value \`${typeof value === "object" ? stringify2(value) : value}\` of type \`${typeof value}\` is an invalid hex type.`, {
          metaMessages: ['Hex types must be represented as `"0x${string}"`.']
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Hex.InvalidHexTypeError"
        });
      }
    };
    InvalidHexValueError = class extends BaseError3 {
      constructor(value) {
        super(`Value \`${value}\` is an invalid hex value.`, {
          metaMessages: [
            'Hex values must start with `"0x"` and contain only hexadecimal characters (0-9, a-f, A-F).'
          ]
        });
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Hex.InvalidHexValueError"
        });
      }
    };
    SizeOverflowError3 = class extends BaseError3 {
      constructor({ givenSize, maxSize }) {
        super(`Size cannot exceed \`${maxSize}\` bytes. Given size: \`${givenSize}\` bytes.`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Hex.SizeOverflowError"
        });
      }
    };
    SliceOffsetOutOfBoundsError3 = class extends BaseError3 {
      constructor({ offset, position, size: size5 }) {
        super(`Slice ${position === "start" ? "starting" : "ending"} at offset \`${offset}\` is out-of-bounds (size: \`${size5}\`).`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Hex.SliceOffsetOutOfBoundsError"
        });
      }
    };
    SizeExceedsPaddingSizeError3 = class extends BaseError3 {
      constructor({ size: size5, targetSize, type }) {
        super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (\`${size5}\`) exceeds padding size (\`${targetSize}\`).`);
        Object.defineProperty(this, "name", {
          enumerable: true,
          configurable: true,
          writable: true,
          value: "Hex.SizeExceedsPaddingSizeError"
        });
      }
    };
  }
});

// node_modules/ox/_esm/core/Withdrawal.js
function toRpc(withdrawal) {
  return {
    address: withdrawal.address,
    amount: fromNumber(withdrawal.amount),
    index: fromNumber(withdrawal.index),
    validatorIndex: fromNumber(withdrawal.validatorIndex)
  };
}
var init_Withdrawal = __esm({
  "node_modules/ox/_esm/core/Withdrawal.js"() {
    init_Hex();
  }
});

// node_modules/ox/_esm/core/BlockOverrides.js
function toRpc2(blockOverrides) {
  return {
    ...typeof blockOverrides.baseFeePerGas === "bigint" && {
      baseFeePerGas: fromNumber(blockOverrides.baseFeePerGas)
    },
    ...typeof blockOverrides.blobBaseFee === "bigint" && {
      blobBaseFee: fromNumber(blockOverrides.blobBaseFee)
    },
    ...typeof blockOverrides.feeRecipient === "string" && {
      feeRecipient: blockOverrides.feeRecipient
    },
    ...typeof blockOverrides.gasLimit === "bigint" && {
      gasLimit: fromNumber(blockOverrides.gasLimit)
    },
    ...typeof blockOverrides.number === "bigint" && {
      number: fromNumber(blockOverrides.number)
    },
    ...typeof blockOverrides.prevRandao === "bigint" && {
      prevRandao: fromNumber(blockOverrides.prevRandao)
    },
    ...typeof blockOverrides.time === "bigint" && {
      time: fromNumber(blockOverrides.time)
    },
    ...blockOverrides.withdrawals && {
      withdrawals: blockOverrides.withdrawals.map(toRpc)
    }
  };
}
var init_BlockOverrides = __esm({
  "node_modules/ox/_esm/core/BlockOverrides.js"() {
    init_Hex();
    init_Withdrawal();
  }
});

// node_modules/viem/_esm/constants/abis.js
var multicall3Abi, batchGatewayAbi, universalResolverErrors, universalResolverResolveAbi, universalResolverReverseAbi, textResolverAbi, addressResolverAbi, erc1271Abi, erc6492SignatureValidatorAbi, erc20Abi;
var init_abis = __esm({
  "node_modules/viem/_esm/constants/abis.js"() {
    multicall3Abi = [
      {
        inputs: [
          {
            components: [
              {
                name: "target",
                type: "address"
              },
              {
                name: "allowFailure",
                type: "bool"
              },
              {
                name: "callData",
                type: "bytes"
              }
            ],
            name: "calls",
            type: "tuple[]"
          }
        ],
        name: "aggregate3",
        outputs: [
          {
            components: [
              {
                name: "success",
                type: "bool"
              },
              {
                name: "returnData",
                type: "bytes"
              }
            ],
            name: "returnData",
            type: "tuple[]"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [
          {
            name: "addr",
            type: "address"
          }
        ],
        name: "getEthBalance",
        outputs: [
          {
            name: "balance",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      },
      {
        inputs: [],
        name: "getCurrentBlockTimestamp",
        outputs: [
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256"
          }
        ],
        stateMutability: "view",
        type: "function"
      }
    ];
    batchGatewayAbi = [
      {
        name: "query",
        type: "function",
        stateMutability: "view",
        inputs: [
          {
            type: "tuple[]",
            name: "queries",
            components: [
              {
                type: "address",
                name: "sender"
              },
              {
                type: "string[]",
                name: "urls"
              },
              {
                type: "bytes",
                name: "data"
              }
            ]
          }
        ],
        outputs: [
          {
            type: "bool[]",
            name: "failures"
          },
          {
            type: "bytes[]",
            name: "responses"
          }
        ]
      },
      {
        name: "HttpError",
        type: "error",
        inputs: [
          {
            type: "uint16",
            name: "status"
          },
          {
            type: "string",
            name: "message"
          }
        ]
      }
    ];
    universalResolverErrors = [
      {
        inputs: [
          {
            name: "dns",
            type: "bytes"
          }
        ],
        name: "DNSDecodingFailed",
        type: "error"
      },
      {
        inputs: [
          {
            name: "ens",
            type: "string"
          }
        ],
        name: "DNSEncodingFailed",
        type: "error"
      },
      {
        inputs: [],
        name: "EmptyAddress",
        type: "error"
      },
      {
        inputs: [
          {
            name: "status",
            type: "uint16"
          },
          {
            name: "message",
            type: "string"
          }
        ],
        name: "HttpError",
        type: "error"
      },
      {
        inputs: [],
        name: "InvalidBatchGatewayResponse",
        type: "error"
      },
      {
        inputs: [
          {
            name: "errorData",
            type: "bytes"
          }
        ],
        name: "ResolverError",
        type: "error"
      },
      {
        inputs: [
          {
            name: "name",
            type: "bytes"
          },
          {
            name: "resolver",
            type: "address"
          }
        ],
        name: "ResolverNotContract",
        type: "error"
      },
      {
        inputs: [
          {
            name: "name",
            type: "bytes"
          }
        ],
        name: "ResolverNotFound",
        type: "error"
      },
      {
        inputs: [
          {
            name: "primary",
            type: "string"
          },
          {
            name: "primaryAddress",
            type: "bytes"
          }
        ],
        name: "ReverseAddressMismatch",
        type: "error"
      },
      {
        inputs: [
          {
            internalType: "bytes4",
            name: "selector",
            type: "bytes4"
          }
        ],
        name: "UnsupportedResolverProfile",
        type: "error"
      }
    ];
    universalResolverResolveAbi = [
      ...universalResolverErrors,
      {
        name: "resolveWithGateways",
        type: "function",
        stateMutability: "view",
        inputs: [
          { name: "name", type: "bytes" },
          { name: "data", type: "bytes" },
          { name: "gateways", type: "string[]" }
        ],
        outputs: [
          { name: "", type: "bytes" },
          { name: "address", type: "address" }
        ]
      }
    ];
    universalResolverReverseAbi = [
      ...universalResolverErrors,
      {
        name: "reverseWithGateways",
        type: "function",
        stateMutability: "view",
        inputs: [
          { type: "bytes", name: "reverseName" },
          { type: "uint256", name: "coinType" },
          { type: "string[]", name: "gateways" }
        ],
        outputs: [
          { type: "string", name: "resolvedName" },
          { type: "address", name: "resolver" },
          { type: "address", name: "reverseResolver" }
        ]
      }
    ];
    textResolverAbi = [
      {
        name: "text",
        type: "function",
        stateMutability: "view",
        inputs: [
          { name: "name", type: "bytes32" },
          { name: "key", type: "string" }
        ],
        outputs: [{ name: "", type: "string" }]
      }
    ];
    addressResolverAbi = [
      {
        name: "addr",
        type: "function",
        stateMutability: "view",
        inputs: [{ name: "name", type: "bytes32" }],
        outputs: [{ name: "", type: "address" }]
      },
      {
        name: "addr",
        type: "function",
        stateMutability: "view",
        inputs: [
          { name: "name", type: "bytes32" },
          { name: "coinType", type: "uint256" }
        ],
        outputs: [{ name: "", type: "bytes" }]
      }
    ];
    erc1271Abi = [
      {
        name: "isValidSignature",
        type: "function",
        stateMutability: "view",
        inputs: [
          { name: "hash", type: "bytes32" },
          { name: "signature", type: "bytes" }
        ],
        outputs: [{ name: "", type: "bytes4" }]
      }
    ];
    erc6492SignatureValidatorAbi = [
      {
        inputs: [
          {
            name: "_signer",
            type: "address"
          },
          {
            name: "_hash",
            type: "bytes32"
          },
          {
            name: "_signature",
            type: "bytes"
          }
        ],
        stateMutability: "nonpayable",
        type: "constructor"
      },
      {
        inputs: [
          {
            name: "_signer",
            type: "address"
          },
          {
            name: "_hash",
            type: "bytes32"
          },
          {
            name: "_signature",
            type: "bytes"
          }
        ],
        outputs: [
          {
            type: "bool"
          }
        ],
        stateMutability: "nonpayable",
        type: "function",
        name: "isValidSig"
      }
    ];
    erc20Abi = [
      {
        type: "event",
        name: "Approval",
        inputs: [
          {
            indexed: true,
            name: "owner",
            type: "address"
          },
          {
            indexed: true,
            name: "spender",
            type: "address"
          },
          {
            indexed: false,
            name: "value",
            type: "uint256"
          }
        ]
      },
      {
        type: "event",
        name: "Transfer",
        inputs: [
          {
            indexed: true,
            name: "from",
            type: "address"
          },
          {
            indexed: true,
            name: "to",
            type: "address"
          },
          {
            indexed: false,
            name: "value",
            type: "uint256"
          }
        ]
      },
      {
        type: "function",
        name: "allowance",
        stateMutability: "view",
        inputs: [
          {
            name: "owner",
            type: "address"
          },
          {
            name: "spender",
            type: "address"
          }
        ],
        outputs: [
          {
            type: "uint256"
          }
        ]
      },
      {
        type: "function",
        name: "approve",
        stateMutability: "nonpayable",
        inputs: [
          {
            name: "spender",
            type: "address"
          },
          {
            name: "amount",
            type: "uint256"
          }
        ],
        outputs: [
          {
            type: "bool"
          }
        ]
      },
      {
        type: "function",
        name: "balanceOf",
        stateMutability: "view",
        inputs: [
          {
            name: "account",
            type: "address"
          }
        ],
        outputs: [
          {
            type: "uint256"
          }
        ]
      },
      {
        type: "function",
        name: "decimals",
        stateMutability: "view",
        inputs: [],
        outputs: [
          {
            type: "uint8"
          }
        ]
      },
      {
        type: "function",
        name: "name",
        stateMutability: "view",
        inputs: [],
        outputs: [
          {
            type: "string"
          }
        ]
      },
      {
        type: "function",
        name: "symbol",
        stateMutability: "view",
        inputs: [],
        outputs: [
          {
            type: "string"
          }
        ]
      },
      {
        type: "function",
        name: "totalSupply",
        stateMutability: "view",
        inputs: [],
        outputs: [
          {
            type: "uint256"
          }
        ]
      },
      {
        type: "function",
        name: "transfer",
        stateMutability: "nonpayable",
        inputs: [
          {
            name: "recipient",
            type: "address"
          },
          {
            name: "amount",
            type: "uint256"
          }
        ],
        outputs: [
          {
            type: "bool"
          }
        ]
      },
      {
        type: "function",
        name: "transferFrom",
        stateMutability: "nonpayable",
        inputs: [
          {
            name: "sender",
            type: "address"
          },
          {
            name: "recipient",
            type: "address"
          },
          {
            name: "amount",
            type: "uint256"
          }
        ],
        outputs: [
          {
            type: "bool"
          }
        ]
      }
    ];
  }
});

// node_modules/viem/_esm/constants/contract.js
var aggregate3Signature;
var init_contract2 = __esm({
  "node_modules/viem/_esm/constants/contract.js"() {
    aggregate3Signature = "0x82ad56cb";
  }
});

// node_modules/viem/_esm/constants/contracts.js
var deploylessCallViaBytecodeBytecode, deploylessCallViaFactoryBytecode, erc6492SignatureValidatorByteCode, multicall3Bytecode;
var init_contracts = __esm({
  "node_modules/viem/_esm/constants/contracts.js"() {
    deploylessCallViaBytecodeBytecode = "0x608060405234801561001057600080fd5b5060405161018e38038061018e83398101604081905261002f91610124565b6000808351602085016000f59050803b61004857600080fd5b6000808351602085016000855af16040513d6000823e81610067573d81fd5b3d81f35b634e487b7160e01b600052604160045260246000fd5b600082601f83011261009257600080fd5b81516001600160401b038111156100ab576100ab61006b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156100d9576100d961006b565b6040528181528382016020018510156100f157600080fd5b60005b82811015610110576020818601810151838301820152016100f4565b506000918101602001919091529392505050565b6000806040838503121561013757600080fd5b82516001600160401b0381111561014d57600080fd5b61015985828601610081565b602085015190935090506001600160401b0381111561017757600080fd5b61018385828601610081565b915050925092905056fe";
    deploylessCallViaFactoryBytecode = "0x608060405234801561001057600080fd5b506040516102c03803806102c083398101604081905261002f916101e6565b836001600160a01b03163b6000036100e457600080836001600160a01b03168360405161005c9190610270565b6000604051808303816000865af19150503d8060008114610099576040519150601f19603f3d011682016040523d82523d6000602084013e61009e565b606091505b50915091508115806100b857506001600160a01b0386163b155b156100e1578060405163101bb98d60e01b81526004016100d8919061028c565b60405180910390fd5b50505b6000808451602086016000885af16040513d6000823e81610103573d81fd5b3d81f35b80516001600160a01b038116811461011e57600080fd5b919050565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561015457818101518382015260200161013c565b50506000910152565b600082601f83011261016e57600080fd5b81516001600160401b0381111561018757610187610123565b604051601f8201601f19908116603f011681016001600160401b03811182821017156101b5576101b5610123565b6040528181528382016020018510156101cd57600080fd5b6101de826020830160208701610139565b949350505050565b600080600080608085870312156101fc57600080fd5b61020585610107565b60208601519094506001600160401b0381111561022157600080fd5b61022d8782880161015d565b93505061023c60408601610107565b60608601519092506001600160401b0381111561025857600080fd5b6102648782880161015d565b91505092959194509250565b60008251610282818460208701610139565b9190910192915050565b60208152600082518060208401526102ab816040850160208701610139565b601f01601f1916919091016040019291505056fe";
    erc6492SignatureValidatorByteCode = "0x608060405234801561001057600080fd5b5060405161069438038061069483398101604081905261002f9161051e565b600061003c848484610048565b9050806000526001601ff35b60007f64926492649264926492649264926492649264926492649264926492649264926100748361040c565b036101e7576000606080848060200190518101906100929190610577565b60405192955090935091506000906001600160a01b038516906100b69085906105dd565b6000604051808303816000865af19150503d80600081146100f3576040519150601f19603f3d011682016040523d82523d6000602084013e6100f8565b606091505b50509050876001600160a01b03163b60000361016057806101605760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90610190908b9087906004016105f9565b602060405180830381865afa1580156101ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d19190610633565b6001600160e01b03191614945050505050610405565b6001600160a01b0384163b1561027a57604051630b135d3f60e11b808252906001600160a01b03861690631626ba7e9061022790879087906004016105f9565b602060405180830381865afa158015610244573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102689190610633565b6001600160e01b031916149050610405565b81516041146102df5760405162461bcd60e51b815260206004820152603a602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e6774680000000000006064820152608401610157565b6102e7610425565b5060208201516040808401518451859392600091859190811061030c5761030c61065d565b016020015160f81c9050601b811480159061032b57508060ff16601c14155b1561038c5760405162461bcd60e51b815260206004820152603b602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c756500000000006064820152608401610157565b60408051600081526020810180835289905260ff83169181019190915260608101849052608081018390526001600160a01b0389169060019060a0016020604051602081039080840390855afa1580156103ea573d6000803e3d6000fd5b505050602060405103516001600160a01b0316149450505050505b9392505050565b600060208251101561041d57600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b038116811461045857600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561048c578181015183820152602001610474565b50506000910152565b600082601f8301126104a657600080fd5b81516001600160401b038111156104bf576104bf61045b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156104ed576104ed61045b565b60405281815283820160200185101561050557600080fd5b610516826020830160208701610471565b949350505050565b60008060006060848603121561053357600080fd5b835161053e81610443565b6020850151604086015191945092506001600160401b0381111561056157600080fd5b61056d86828701610495565b9150509250925092565b60008060006060848603121561058c57600080fd5b835161059781610443565b60208501519093506001600160401b038111156105b357600080fd5b6105bf86828701610495565b604086015190935090506001600160401b0381111561056157600080fd5b600082516105ef818460208701610471565b9190910192915050565b828152604060208201526000825180604084015261061e816060850160208701610471565b601f01601f1916919091016060019392505050565b60006020828403121561064557600080fd5b81516001600160e01b03198116811461040557600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572";
    multicall3Bytecode = "0x608060405234801561001057600080fd5b506115b9806100206000396000f3fe6080604052600436106100f35760003560e01c80634d2301cc1161008a578063a8b0574e11610059578063a8b0574e14610325578063bce38bd714610350578063c3077fa914610380578063ee82ac5e146103b2576100f3565b80634d2301cc1461026257806372425d9d1461029f57806382ad56cb146102ca57806386d516e8146102fa576100f3565b80633408e470116100c65780633408e470146101af578063399542e9146101da5780633e64a6961461020c57806342cbb15c14610237576100f3565b80630f28c97d146100f8578063174dea7114610123578063252dba421461015357806327e86d6e14610184575b600080fd5b34801561010457600080fd5b5061010d6103ef565b60405161011a9190610c0a565b60405180910390f35b61013d60048036038101906101389190610c94565b6103f7565b60405161014a9190610e94565b60405180910390f35b61016d60048036038101906101689190610f0c565b610615565b60405161017b92919061101b565b60405180910390f35b34801561019057600080fd5b506101996107ab565b6040516101a69190611064565b60405180910390f35b3480156101bb57600080fd5b506101c46107b7565b6040516101d19190610c0a565b60405180910390f35b6101f460048036038101906101ef91906110ab565b6107bf565b6040516102039392919061110b565b60405180910390f35b34801561021857600080fd5b506102216107e1565b60405161022e9190610c0a565b60405180910390f35b34801561024357600080fd5b5061024c6107e9565b6040516102599190610c0a565b60405180910390f35b34801561026e57600080fd5b50610289600480360381019061028491906111a7565b6107f1565b6040516102969190610c0a565b60405180910390f35b3480156102ab57600080fd5b506102b4610812565b6040516102c19190610c0a565b60405180910390f35b6102e460048036038101906102df919061122a565b61081a565b6040516102f19190610e94565b60405180910390f35b34801561030657600080fd5b5061030f6109e4565b60405161031c9190610c0a565b60405180910390f35b34801561033157600080fd5b5061033a6109ec565b6040516103479190611286565b60405180910390f35b61036a600480360381019061036591906110ab565b6109f4565b6040516103779190610e94565b60405180910390f35b61039a60048036038101906103959190610f0c565b610ba6565b6040516103a99392919061110b565b60405180910390f35b3480156103be57600080fd5b506103d960048036038101906103d491906112cd565b610bca565b6040516103e69190611064565b60405180910390f35b600042905090565b60606000808484905090508067ffffffffffffffff81111561041c5761041b6112fa565b5b60405190808252806020026020018201604052801561045557816020015b610442610bd5565b81526020019060019003908161043a5790505b5092503660005b828110156105c957600085828151811061047957610478611329565b5b6020026020010151905087878381811061049657610495611329565b5b90506020028101906104a89190611367565b925060008360400135905080860195508360000160208101906104cb91906111a7565b73ffffffffffffffffffffffffffffffffffffffff16818580606001906104f2919061138f565b604051610500929190611431565b60006040518083038185875af1925050503d806000811461053d576040519150601f19603f3d011682016040523d82523d6000602084013e610542565b606091505b5083600001846020018290528215151515815250505081516020850135176105bc577f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260846000fd5b826001019250505061045c565b5082341461060c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610603906114a7565b60405180910390fd5b50505092915050565b6000606043915060008484905090508067ffffffffffffffff81111561063e5761063d6112fa565b5b60405190808252806020026020018201604052801561067157816020015b606081526020019060019003908161065c5790505b5091503660005b828110156107a157600087878381811061069557610694611329565b5b90506020028101906106a791906114c7565b92508260000160208101906106bc91906111a7565b73ffffffffffffffffffffffffffffffffffffffff168380602001906106e2919061138f565b6040516106f0929190611431565b6000604051808303816000865af19150503d806000811461072d576040519150601f19603f3d011682016040523d82523d6000602084013e610732565b606091505b5086848151811061074657610745611329565b5b60200260200101819052819250505080610795576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161078c9061153b565b60405180910390fd5b81600101915050610678565b5050509250929050565b60006001430340905090565b600046905090565b6000806060439250434091506107d68686866109f4565b905093509350939050565b600048905090565b600043905090565b60008173ffffffffffffffffffffffffffffffffffffffff16319050919050565b600044905090565b606060008383905090508067ffffffffffffffff81111561083e5761083d6112fa565b5b60405190808252806020026020018201604052801561087757816020015b610864610bd5565b81526020019060019003908161085c5790505b5091503660005b828110156109db57600084828151811061089b5761089a611329565b5b602002602001015190508686838181106108b8576108b7611329565b5b90506020028101906108ca919061155b565b92508260000160208101906108df91906111a7565b73ffffffffffffffffffffffffffffffffffffffff16838060400190610905919061138f565b604051610913929190611431565b6000604051808303816000865af19150503d8060008114610950576040519150601f19603f3d011682016040523d82523d6000602084013e610955565b606091505b5082600001836020018290528215151515815250505080516020840135176109cf577f08c379a000000000000000000000000000000000000000000000000000000000600052602060045260176024527f4d756c746963616c6c333a2063616c6c206661696c656400000000000000000060445260646000fd5b8160010191505061087e565b50505092915050565b600045905090565b600041905090565b606060008383905090508067ffffffffffffffff811115610a1857610a176112fa565b5b604051908082528060200260200182016040528015610a5157816020015b610a3e610bd5565b815260200190600190039081610a365790505b5091503660005b82811015610b9c576000848281518110610a7557610a74611329565b5b60200260200101519050868683818110610a9257610a91611329565b5b9050602002810190610aa491906114c7565b9250826000016020810190610ab991906111a7565b73ffffffffffffffffffffffffffffffffffffffff16838060200190610adf919061138f565b604051610aed929190611431565b6000604051808303816000865af19150503d8060008114610b2a576040519150601f19603f3d011682016040523d82523d6000602084013e610b2f565b606091505b508260000183602001829052821515151581525050508715610b90578060000151610b8f576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b869061153b565b60405180910390fd5b5b81600101915050610a58565b5050509392505050565b6000806060610bb7600186866107bf565b8093508194508295505050509250925092565b600081409050919050565b6040518060400160405280600015158152602001606081525090565b6000819050919050565b610c0481610bf1565b82525050565b6000602082019050610c1f6000830184610bfb565b92915050565b600080fd5b600080fd5b600080fd5b600080fd5b600080fd5b60008083601f840112610c5457610c53610c2f565b5b8235905067ffffffffffffffff811115610c7157610c70610c34565b5b602083019150836020820283011115610c8d57610c8c610c39565b5b9250929050565b60008060208385031215610cab57610caa610c25565b5b600083013567ffffffffffffffff811115610cc957610cc8610c2a565b5b610cd585828601610c3e565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b60008115159050919050565b610d2281610d0d565b82525050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610d62578082015181840152602081019050610d47565b83811115610d71576000848401525b50505050565b6000601f19601f8301169050919050565b6000610d9382610d28565b610d9d8185610d33565b9350610dad818560208601610d44565b610db681610d77565b840191505092915050565b6000604083016000830151610dd96000860182610d19565b5060208301518482036020860152610df18282610d88565b9150508091505092915050565b6000610e0a8383610dc1565b905092915050565b6000602082019050919050565b6000610e2a82610ce1565b610e348185610cec565b935083602082028501610e4685610cfd565b8060005b85811015610e825784840389528151610e638582610dfe565b9450610e6e83610e12565b925060208a01995050600181019050610e4a565b50829750879550505050505092915050565b60006020820190508181036000830152610eae8184610e1f565b905092915050565b60008083601f840112610ecc57610ecb610c2f565b5b8235905067ffffffffffffffff811115610ee957610ee8610c34565b5b602083019150836020820283011115610f0557610f04610c39565b5b9250929050565b60008060208385031215610f2357610f22610c25565b5b600083013567ffffffffffffffff811115610f4157610f40610c2a565b5b610f4d85828601610eb6565b92509250509250929050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b6000610f918383610d88565b905092915050565b6000602082019050919050565b6000610fb182610f59565b610fbb8185610f64565b935083602082028501610fcd85610f75565b8060005b858110156110095784840389528151610fea8582610f85565b9450610ff583610f99565b925060208a01995050600181019050610fd1565b50829750879550505050505092915050565b60006040820190506110306000830185610bfb565b81810360208301526110428184610fa6565b90509392505050565b6000819050919050565b61105e8161104b565b82525050565b60006020820190506110796000830184611055565b92915050565b61108881610d0d565b811461109357600080fd5b50565b6000813590506110a58161107f565b92915050565b6000806000604084860312156110c4576110c3610c25565b5b60006110d286828701611096565b935050602084013567ffffffffffffffff8111156110f3576110f2610c2a565b5b6110ff86828701610eb6565b92509250509250925092565b60006060820190506111206000830186610bfb565b61112d6020830185611055565b818103604083015261113f8184610e1f565b9050949350505050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061117482611149565b9050919050565b61118481611169565b811461118f57600080fd5b50565b6000813590506111a18161117b565b92915050565b6000602082840312156111bd576111bc610c25565b5b60006111cb84828501611192565b91505092915050565b60008083601f8401126111ea576111e9610c2f565b5b8235905067ffffffffffffffff81111561120757611206610c34565b5b60208301915083602082028301111561122357611222610c39565b5b9250929050565b6000806020838503121561124157611240610c25565b5b600083013567ffffffffffffffff81111561125f5761125e610c2a565b5b61126b858286016111d4565b92509250509250929050565b61128081611169565b82525050565b600060208201905061129b6000830184611277565b92915050565b6112aa81610bf1565b81146112b557600080fd5b50565b6000813590506112c7816112a1565b92915050565b6000602082840312156112e3576112e2610c25565b5b60006112f1848285016112b8565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600080fd5b600080fd5b600080fd5b60008235600160800383360303811261138357611382611358565b5b80830191505092915050565b600080833560016020038436030381126113ac576113ab611358565b5b80840192508235915067ffffffffffffffff8211156113ce576113cd61135d565b5b6020830192506001820236038313156113ea576113e9611362565b5b509250929050565b600081905092915050565b82818337600083830152505050565b600061141883856113f2565b93506114258385846113fd565b82840190509392505050565b600061143e82848661140c565b91508190509392505050565b600082825260208201905092915050565b7f4d756c746963616c6c333a2076616c7565206d69736d61746368000000000000600082015250565b6000611491601a8361144a565b915061149c8261145b565b602082019050919050565b600060208201905081810360008301526114c081611484565b9050919050565b6000823560016040038336030381126114e3576114e2611358565b5b80830191505092915050565b7f4d756c746963616c6c333a2063616c6c206661696c6564000000000000000000600082015250565b600061152560178361144a565b9150611530826114ef565b602082019050919050565b6000602082019050818103600083015261155481611518565b9050919050565b60008235600160600383360303811261157757611576611358565b5b8083019150509291505056fea264697066735822122020c1bc9aacf8e4a6507193432a895a8e77094f45a1395583f07b24e860ef06cd64736f6c634300080c0033";
  }
});

// node_modules/viem/_esm/errors/chain.js
var ChainDoesNotSupportContract, ClientChainNotConfiguredError;
var init_chain = __esm({
  "node_modules/viem/_esm/errors/chain.js"() {
    init_base();
    ChainDoesNotSupportContract = class extends BaseError2 {
      constructor({ blockNumber, chain, contract }) {
        super(`Chain "${chain.name}" does not support contract "${contract.name}".`, {
          metaMessages: [
            "This could be due to any of the following:",
            ...blockNumber && contract.blockCreated && contract.blockCreated > blockNumber ? [
              `- The contract "${contract.name}" was not deployed until block ${contract.blockCreated} (current block ${blockNumber}).`
            ] : [
              `- The chain does not have the contract "${contract.name}" configured.`
            ]
          ],
          name: "ChainDoesNotSupportContract"
        });
      }
    };
    ClientChainNotConfiguredError = class extends BaseError2 {
      constructor() {
        super("No chain was provided to the Client.", {
          name: "ClientChainNotConfiguredError"
        });
      }
    };
  }
});

// node_modules/viem/_esm/utils/abi/encodeDeployData.js
function encodeDeployData(parameters) {
  const { abi: abi2, args, bytecode } = parameters;
  if (!args || args.length === 0)
    return bytecode;
  const description = abi2.find((x) => "type" in x && x.type === "constructor");
  if (!description)
    throw new AbiConstructorNotFoundError({ docsPath: docsPath5 });
  if (!("inputs" in description))
    throw new AbiConstructorParamsNotFoundError({ docsPath: docsPath5 });
  if (!description.inputs || description.inputs.length === 0)
    throw new AbiConstructorParamsNotFoundError({ docsPath: docsPath5 });
  const data = encodeAbiParameters(description.inputs, args);
  return concatHex([bytecode, data]);
}
var docsPath5;
var init_encodeDeployData = __esm({
  "node_modules/viem/_esm/utils/abi/encodeDeployData.js"() {
    init_abi();
    init_concat();
    init_encodeAbiParameters();
    docsPath5 = "/docs/contract/encodeDeployData";
  }
});

// node_modules/viem/_esm/utils/chain/getChainContractAddress.js
function getChainContractAddress({ blockNumber, chain, contract: name }) {
  const contract = chain?.contracts?.[name];
  if (!contract)
    throw new ChainDoesNotSupportContract({
      chain,
      contract: { name }
    });
  if (blockNumber && contract.blockCreated && contract.blockCreated > blockNumber)
    throw new ChainDoesNotSupportContract({
      blockNumber,
      chain,
      contract: {
        name,
        blockCreated: contract.blockCreated
      }
    });
  return contract.address;
}
var init_getChainContractAddress = __esm({
  "node_modules/viem/_esm/utils/chain/getChainContractAddress.js"() {
    init_chain();
  }
});

// node_modules/viem/_esm/utils/errors/getCallError.js
function getCallError(err, { docsPath: docsPath8, ...args }) {
  const cause = (() => {
    const cause2 = getNodeError(err, args);
    if (cause2 instanceof UnknownNodeError)
      return err;
    return cause2;
  })();
  return new CallExecutionError(cause, {
    docsPath: docsPath8,
    ...args
  });
}
var init_getCallError = __esm({
  "node_modules/viem/_esm/utils/errors/getCallError.js"() {
    init_contract();
    init_node();
    init_getNodeError();
  }
});

// node_modules/viem/_esm/utils/promise/withResolvers.js
function withResolvers() {
  let resolve = () => void 0;
  let reject = () => void 0;
  const promise = new Promise((resolve_, reject_) => {
    resolve = resolve_;
    reject = reject_;
  });
  return { promise, resolve, reject };
}
var init_withResolvers = __esm({
  "node_modules/viem/_esm/utils/promise/withResolvers.js"() {
  }
});

// node_modules/viem/_esm/utils/promise/createBatchScheduler.js
function createBatchScheduler({ fn, id, shouldSplitBatch, wait: wait2 = 0, sort }) {
  const exec = async () => {
    const scheduler = getScheduler();
    flush();
    const args = scheduler.map(({ args: args2 }) => args2);
    if (args.length === 0)
      return;
    fn(args).then((data) => {
      if (sort && Array.isArray(data))
        data.sort(sort);
      for (let i = 0; i < scheduler.length; i++) {
        const { resolve } = scheduler[i];
        resolve?.([data[i], data]);
      }
    }).catch((err) => {
      for (let i = 0; i < scheduler.length; i++) {
        const { reject } = scheduler[i];
        reject?.(err);
      }
    });
  };
  const flush = () => schedulerCache.delete(id);
  const getBatchedArgs = () => getScheduler().map(({ args }) => args);
  const getScheduler = () => schedulerCache.get(id) || [];
  const setScheduler = (item) => schedulerCache.set(id, [...getScheduler(), item]);
  return {
    flush,
    async schedule(args) {
      const { promise, resolve, reject } = withResolvers();
      const split2 = shouldSplitBatch?.([...getBatchedArgs(), args]);
      if (split2)
        exec();
      const hasActiveScheduler = getScheduler().length > 0;
      if (hasActiveScheduler) {
        setScheduler({ args, resolve, reject });
        return promise;
      }
      setScheduler({ args, resolve, reject });
      setTimeout(exec, wait2);
      return promise;
    }
  };
}
var schedulerCache;
var init_createBatchScheduler = __esm({
  "node_modules/viem/_esm/utils/promise/createBatchScheduler.js"() {
    init_withResolvers();
    schedulerCache = /* @__PURE__ */ new Map();
  }
});

// node_modules/viem/_esm/errors/ccip.js
var OffchainLookupError, OffchainLookupResponseMalformedError, OffchainLookupSenderMismatchError;
var init_ccip = __esm({
  "node_modules/viem/_esm/errors/ccip.js"() {
    init_stringify();
    init_base();
    init_utils3();
    OffchainLookupError = class extends BaseError2 {
      constructor({ callbackSelector, cause, data, extraData, sender, urls }) {
        super(cause.shortMessage || "An error occurred while fetching for an offchain result.", {
          cause,
          metaMessages: [
            ...cause.metaMessages || [],
            cause.metaMessages?.length ? "" : [],
            "Offchain Gateway Call:",
            urls && [
              "  Gateway URL(s):",
              ...urls.map((url) => `    ${getUrl(url)}`)
            ],
            `  Sender: ${sender}`,
            `  Data: ${data}`,
            `  Callback selector: ${callbackSelector}`,
            `  Extra data: ${extraData}`
          ].flat(),
          name: "OffchainLookupError"
        });
      }
    };
    OffchainLookupResponseMalformedError = class extends BaseError2 {
      constructor({ result, url }) {
        super("Offchain gateway response is malformed. Response data must be a hex value.", {
          metaMessages: [
            `Gateway URL: ${getUrl(url)}`,
            `Response: ${stringify(result)}`
          ],
          name: "OffchainLookupResponseMalformedError"
        });
      }
    };
    OffchainLookupSenderMismatchError = class extends BaseError2 {
      constructor({ sender, to }) {
        super("Reverted sender address does not match target contract address (`to`).", {
          metaMessages: [
            `Contract address: ${to}`,
            `OffchainLookup sender address: ${sender}`
          ],
          name: "OffchainLookupSenderMismatchError"
        });
      }
    };
  }
});

// node_modules/viem/_esm/utils/abi/decodeFunctionData.js
function decodeFunctionData(parameters) {
  const { abi: abi2, data } = parameters;
  const signature = slice(data, 0, 4);
  const description = abi2.find((x) => x.type === "function" && signature === toFunctionSelector(formatAbiItem2(x)));
  if (!description)
    throw new AbiFunctionSignatureNotFoundError(signature, {
      docsPath: "/docs/contract/decodeFunctionData"
    });
  return {
    functionName: description.name,
    args: "inputs" in description && description.inputs && description.inputs.length > 0 ? decodeAbiParameters(description.inputs, slice(data, 4)) : void 0
  };
}
var init_decodeFunctionData = __esm({
  "node_modules/viem/_esm/utils/abi/decodeFunctionData.js"() {
    init_abi();
    init_slice();
    init_toFunctionSelector();
    init_decodeAbiParameters();
    init_formatAbiItem2();
  }
});

// node_modules/viem/_esm/utils/abi/encodeErrorResult.js
function encodeErrorResult(parameters) {
  const { abi: abi2, errorName, args } = parameters;
  let abiItem = abi2[0];
  if (errorName) {
    const item = getAbiItem({ abi: abi2, args, name: errorName });
    if (!item)
      throw new AbiErrorNotFoundError(errorName, { docsPath: docsPath6 });
    abiItem = item;
  }
  if (abiItem.type !== "error")
    throw new AbiErrorNotFoundError(void 0, { docsPath: docsPath6 });
  const definition = formatAbiItem2(abiItem);
  const signature = toFunctionSelector(definition);
  let data = "0x";
  if (args && args.length > 0) {
    if (!abiItem.inputs)
      throw new AbiErrorInputsNotFoundError(abiItem.name, { docsPath: docsPath6 });
    data = encodeAbiParameters(abiItem.inputs, args);
  }
  return concatHex([signature, data]);
}
var docsPath6;
var init_encodeErrorResult = __esm({
  "node_modules/viem/_esm/utils/abi/encodeErrorResult.js"() {
    init_abi();
    init_concat();
    init_toFunctionSelector();
    init_encodeAbiParameters();
    init_formatAbiItem2();
    init_getAbiItem();
    docsPath6 = "/docs/contract/encodeErrorResult";
  }
});

// node_modules/viem/_esm/utils/abi/encodeFunctionResult.js
function encodeFunctionResult(parameters) {
  const { abi: abi2, functionName, result } = parameters;
  let abiItem = abi2[0];
  if (functionName) {
    const item = getAbiItem({ abi: abi2, name: functionName });
    if (!item)
      throw new AbiFunctionNotFoundError(functionName, { docsPath: docsPath7 });
    abiItem = item;
  }
  if (abiItem.type !== "function")
    throw new AbiFunctionNotFoundError(void 0, { docsPath: docsPath7 });
  if (!abiItem.outputs)
    throw new AbiFunctionOutputsNotFoundError(abiItem.name, { docsPath: docsPath7 });
  const values = (() => {
    if (abiItem.outputs.length === 0)
      return [];
    if (abiItem.outputs.length === 1)
      return [result];
    if (Array.isArray(result))
      return result;
    throw new InvalidArrayError(result);
  })();
  return encodeAbiParameters(abiItem.outputs, values);
}
var docsPath7;
var init_encodeFunctionResult = __esm({
  "node_modules/viem/_esm/utils/abi/encodeFunctionResult.js"() {
    init_abi();
    init_encodeAbiParameters();
    init_getAbiItem();
    docsPath7 = "/docs/contract/encodeFunctionResult";
  }
});

// node_modules/viem/_esm/utils/ens/localBatchGatewayRequest.js
async function localBatchGatewayRequest(parameters) {
  const { data, ccipRequest: ccipRequest2 } = parameters;
  const { args: [queries] } = decodeFunctionData({ abi: batchGatewayAbi, data });
  const failures = [];
  const responses = [];
  await Promise.all(queries.map(async (query, i) => {
    try {
      responses[i] = query.urls.includes(localBatchGatewayUrl) ? await localBatchGatewayRequest({ data: query.data, ccipRequest: ccipRequest2 }) : await ccipRequest2(query);
      failures[i] = false;
    } catch (err) {
      failures[i] = true;
      responses[i] = encodeError(err);
    }
  }));
  return encodeFunctionResult({
    abi: batchGatewayAbi,
    functionName: "query",
    result: [failures, responses]
  });
}
function encodeError(error) {
  if (error.name === "HttpRequestError" && error.status)
    return encodeErrorResult({
      abi: batchGatewayAbi,
      errorName: "HttpError",
      args: [error.status, error.shortMessage]
    });
  return encodeErrorResult({
    abi: [solidityError],
    errorName: "Error",
    args: ["shortMessage" in error ? error.shortMessage : error.message]
  });
}
var localBatchGatewayUrl;
var init_localBatchGatewayRequest = __esm({
  "node_modules/viem/_esm/utils/ens/localBatchGatewayRequest.js"() {
    init_abis();
    init_solidity();
    init_decodeFunctionData();
    init_encodeErrorResult();
    init_encodeFunctionResult();
    localBatchGatewayUrl = "x-batch-gateway:true";
  }
});

// node_modules/viem/_esm/utils/ccip.js
var ccip_exports = {};
__export(ccip_exports, {
  ccipRequest: () => ccipRequest,
  offchainLookup: () => offchainLookup,
  offchainLookupAbiItem: () => offchainLookupAbiItem,
  offchainLookupSignature: () => offchainLookupSignature
});
async function offchainLookup(client, { blockNumber, blockTag, data, requestOptions, to }) {
  const { args } = decodeErrorResult({
    data,
    abi: [offchainLookupAbiItem]
  });
  const [sender, urls, callData, callbackSelector, extraData] = args;
  const { ccipRead } = client;
  const ccipRequest_ = ccipRead && typeof ccipRead?.request === "function" ? ccipRead.request : ccipRequest;
  try {
    if (!isAddressEqual(to, sender))
      throw new OffchainLookupSenderMismatchError({ sender, to });
    const result = urls.includes(localBatchGatewayUrl) ? await localBatchGatewayRequest({
      data: callData,
      ccipRequest: (parameters) => ccipRequest_({ ...parameters, requestOptions })
    }) : await ccipRequest_({ data: callData, requestOptions, sender, urls });
    const { data: data_ } = await call(client, {
      blockNumber,
      blockTag,
      data: concat([
        callbackSelector,
        encodeAbiParameters([{ type: "bytes" }, { type: "bytes" }], [result, extraData])
      ]),
      requestOptions,
      to
    });
    return data_;
  } catch (err) {
    if (requestOptions?.signal?.aborted)
      throw getAbortError(requestOptions.signal);
    if (isAbortError(err))
      throw err;
    throw new OffchainLookupError({
      callbackSelector,
      cause: err,
      data,
      extraData,
      sender,
      urls
    });
  }
}
async function ccipRequest({ data, requestOptions, sender, urls }) {
  let error = new Error("An unknown error occurred.");
  for (let i = 0; i < urls.length; i++) {
    if (requestOptions?.signal?.aborted)
      throw getAbortError(requestOptions.signal);
    const url = urls[i];
    const method = url.includes("{data}") ? "GET" : "POST";
    const body = method === "POST" ? { data, sender } : void 0;
    const headers = method === "POST" ? { "Content-Type": "application/json" } : {};
    try {
      const response = await fetch(url.replace("{sender}", sender.toLowerCase()).replace("{data}", data), {
        body: JSON.stringify(body),
        headers,
        method,
        ...requestOptions?.signal ? { signal: requestOptions.signal } : {}
      });
      let result;
      if (response.headers.get("Content-Type")?.startsWith("application/json")) {
        result = (await response.json()).data;
      } else {
        result = await response.text();
      }
      if (!response.ok) {
        error = new HttpRequestError({
          body,
          details: result?.error ? stringify(result.error) : response.statusText,
          headers: response.headers,
          status: response.status,
          url
        });
        continue;
      }
      if (!isHex(result)) {
        error = new OffchainLookupResponseMalformedError({
          result,
          url
        });
        continue;
      }
      return result;
    } catch (err) {
      if (requestOptions?.signal?.aborted)
        throw getAbortError(requestOptions.signal);
      if (isAbortError(err))
        throw err;
      error = new HttpRequestError({
        body,
        details: err.message,
        url
      });
    }
  }
  throw error;
}
var offchainLookupSignature, offchainLookupAbiItem;
var init_ccip2 = __esm({
  "node_modules/viem/_esm/utils/ccip.js"() {
    init_call();
    init_ccip();
    init_request();
    init_utils3();
    init_decodeErrorResult();
    init_encodeAbiParameters();
    init_isAddressEqual();
    init_concat();
    init_isHex();
    init_localBatchGatewayRequest();
    init_stringify();
    offchainLookupSignature = "0x556f1830";
    offchainLookupAbiItem = {
      name: "OffchainLookup",
      type: "error",
      inputs: [
        {
          name: "sender",
          type: "address"
        },
        {
          name: "urls",
          type: "string[]"
        },
        {
          name: "callData",
          type: "bytes"
        },
        {
          name: "callbackFunction",
          type: "bytes4"
        },
        {
          name: "extraData",
          type: "bytes"
        }
      ]
    };
  }
});

// node_modules/viem/_esm/actions/public/call.js
async function call(client, args) {
  const { account: account_ = client.account, authorizationList, batch = Boolean(client.batch?.multicall), blockHash, blockNumber, blockTag = client.experimental_blockTag ?? "latest", requireCanonical, accessList, blobs, blockOverrides, code, data: data_, factory, factoryData, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, requestOptions, to, value, stateOverride, ...rest } = args;
  const account = account_ ? parseAccount(account_) : void 0;
  if (code && (factory || factoryData))
    throw new BaseError2("Cannot provide both `code` & `factory`/`factoryData` as parameters.");
  if (code && to)
    throw new BaseError2("Cannot provide both `code` & `to` as parameters.");
  const deploylessCallViaBytecode = code && data_;
  const deploylessCallViaFactory = factory && factoryData && to && data_;
  const deploylessCall = deploylessCallViaBytecode || deploylessCallViaFactory;
  const data = (() => {
    if (deploylessCallViaBytecode)
      return toDeploylessCallViaBytecodeData({
        code,
        data: data_
      });
    if (deploylessCallViaFactory)
      return toDeploylessCallViaFactoryData({
        data: data_,
        factory,
        factoryData,
        to
      });
    return data_;
  })();
  try {
    assertRequest(args);
    const block = formatBlockParameter({
      blockHash,
      blockNumber,
      blockTag,
      requireCanonical
    });
    const rpcBlockOverrides = blockOverrides ? toRpc2(blockOverrides) : void 0;
    const rpcStateOverride = serializeStateOverride(stateOverride);
    const chainFormat = client.chain?.formatters?.transactionRequest?.format;
    const format2 = chainFormat || formatTransactionRequest;
    const request = format2({
      // Pick out extra data that might exist on the chain's transaction request type.
      ...extract(rest, { format: chainFormat }),
      accessList,
      account,
      authorizationList,
      blobs,
      data,
      gas,
      gasPrice,
      maxFeePerBlobGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      to: deploylessCall ? void 0 : to,
      value
    }, "call");
    if (batch && shouldPerformMulticall({ request }) && !rpcBlockOverrides && blockHash === void 0) {
      try {
        const { deployless = false } = typeof client.batch?.multicall === "object" ? client.batch.multicall : {};
        const multicallAddress = getMulticallAddress(client, {
          blockNumber,
          deployless
        });
        if (!multicallAddress || !hasStateOverrideForAddress(rpcStateOverride, multicallAddress))
          return await scheduleMulticall(client, {
            ...request,
            blockHash,
            blockNumber,
            blockTag,
            multicallAddress,
            requestOptions,
            requireCanonical,
            rpcStateOverride
          });
      } catch (err) {
        if (!(err instanceof ClientChainNotConfiguredError) && !(err instanceof ChainDoesNotSupportContract))
          throw err;
      }
    }
    const params = (() => {
      const base = [
        request,
        block
      ];
      if (rpcStateOverride && rpcBlockOverrides)
        return [...base, rpcStateOverride, rpcBlockOverrides];
      if (rpcStateOverride)
        return [...base, rpcStateOverride];
      if (rpcBlockOverrides)
        return [...base, {}, rpcBlockOverrides];
      return base;
    })();
    const response = await client.request({
      method: "eth_call",
      params
    }, requestOptions);
    if (response === "0x")
      return { data: void 0 };
    return { data: response };
  } catch (err) {
    if (requestOptions?.signal?.aborted)
      throw getAbortError(requestOptions.signal);
    if (isAbortError(err))
      throw err;
    const data2 = getRevertErrorData(err);
    const { offchainLookup: offchainLookup2, offchainLookupSignature: offchainLookupSignature2 } = await Promise.resolve().then(() => (init_ccip2(), ccip_exports));
    if (client.ccipRead !== false && data2?.slice(0, 10) === offchainLookupSignature2 && to)
      return {
        data: await offchainLookup2(client, { data: data2, requestOptions, to })
      };
    if (deploylessCall && data2?.slice(0, 10) === "0x101bb98d")
      throw new CounterfactualDeploymentFailedError({ factory });
    throw getCallError(err, {
      ...args,
      account,
      chain: client.chain
    });
  }
}
function shouldPerformMulticall({ request }) {
  const { data, to, ...request_ } = request;
  if (!data)
    return false;
  if (data.startsWith(aggregate3Signature))
    return false;
  if (!to)
    return false;
  if (Object.values(request_).filter((x) => typeof x !== "undefined").length > 0)
    return false;
  return true;
}
function getRequestOptionsId(requestOptions) {
  if (!requestOptions)
    return "default";
  const id = requestOptionsIds.get(requestOptions);
  if (id !== void 0)
    return id;
  const nextId = requestOptionsId++;
  requestOptionsIds.set(requestOptions, nextId);
  return nextId;
}
async function scheduleMulticall(client, args) {
  const { batchSize = 1024, deployless = false, wait: wait2 = 0 } = typeof client.batch?.multicall === "object" ? client.batch.multicall : {};
  const { blockHash, blockNumber, blockTag = client.experimental_blockTag ?? "latest", requireCanonical, data, multicallAddress: multicallAddress_, requestOptions, rpcStateOverride, to } = args;
  const multicallAddress = multicallAddress_ !== void 0 ? multicallAddress_ : getMulticallAddress(client, {
    blockNumber,
    deployless
  });
  const block = formatBlockParameter({
    blockHash,
    blockNumber,
    blockTag,
    requireCanonical
  });
  const blockId = typeof block === "string" ? block : JSON.stringify(block);
  const stateOverrideKey = rpcStateOverride ? `.${JSON.stringify(rpcStateOverride)}` : "";
  const { schedule } = createBatchScheduler({
    id: `${client.uid}.${blockId}.${getRequestOptionsId(requestOptions)}${stateOverrideKey}`,
    wait: wait2,
    shouldSplitBatch(args2) {
      const size5 = args2.reduce((size6, { data: data2 }) => size6 + (data2.length - 2), 0);
      return size5 > batchSize * 2;
    },
    fn: async (requests) => {
      const calls = requests.map((request) => ({
        allowFailure: true,
        callData: request.data,
        target: request.to
      }));
      const calldata = encodeFunctionData({
        abi: multicall3Abi,
        args: [calls],
        functionName: "aggregate3"
      });
      const multicallRequest = {
        ...multicallAddress === null ? {
          data: toDeploylessCallViaBytecodeData({
            code: multicall3Bytecode,
            data: calldata
          })
        } : { to: multicallAddress, data: calldata }
      };
      const data2 = await client.request({
        method: "eth_call",
        params: rpcStateOverride ? [multicallRequest, block, rpcStateOverride] : [multicallRequest, block]
      }, requestOptions);
      return decodeFunctionResult({
        abi: multicall3Abi,
        args: [calls],
        functionName: "aggregate3",
        data: data2 || "0x"
      });
    }
  });
  const [{ returnData, success }] = await schedule({ data, to });
  if (!success)
    throw new RawContractError({ data: returnData });
  if (returnData === "0x")
    return { data: void 0 };
  return { data: returnData };
}
function getMulticallAddress(client, parameters) {
  const { blockNumber, deployless } = parameters;
  if (deployless)
    return null;
  if (client.chain)
    return getChainContractAddress({
      blockNumber,
      chain: client.chain,
      contract: "multicall3"
    });
  throw new ClientChainNotConfiguredError();
}
function hasStateOverrideForAddress(rpcStateOverride, address) {
  if (!rpcStateOverride)
    return false;
  return Object.keys(rpcStateOverride).some((stateOverrideAddress) => isAddressEqual(stateOverrideAddress, address));
}
function toDeploylessCallViaBytecodeData(parameters) {
  const { code, data } = parameters;
  return encodeDeployData({
    abi: parseAbi(["constructor(bytes, bytes)"]),
    bytecode: deploylessCallViaBytecodeBytecode,
    args: [code, data]
  });
}
function toDeploylessCallViaFactoryData(parameters) {
  const { data, factory, factoryData, to } = parameters;
  return encodeDeployData({
    abi: parseAbi(["constructor(address, bytes, address, bytes)"]),
    bytecode: deploylessCallViaFactoryBytecode,
    args: [to, data, factory, factoryData]
  });
}
function getRevertErrorData(err) {
  if (!(err instanceof BaseError2))
    return void 0;
  const error = err.walk();
  return typeof error?.data === "object" ? error.data?.data : error.data;
}
var requestOptionsId, requestOptionsIds;
var init_call = __esm({
  "node_modules/viem/_esm/actions/public/call.js"() {
    init_exports();
    init_BlockOverrides();
    init_parseAccount();
    init_abis();
    init_contract2();
    init_contracts();
    init_base();
    init_chain();
    init_contract();
    init_utils3();
    init_decodeFunctionResult();
    init_encodeDeployData();
    init_encodeFunctionData();
    init_isAddressEqual();
    init_formatBlockParameter();
    init_getChainContractAddress();
    init_getCallError();
    init_extract();
    init_transactionRequest();
    init_createBatchScheduler();
    init_stateOverride2();
    init_assertRequest();
    requestOptionsId = 0;
    requestOptionsIds = /* @__PURE__ */ new WeakMap();
  }
});

// examples/fishing/index.tsx
import { useEffect as useEffect5, useRef as useRef5, useState as useState6 } from "react";

// src/game.ts
var RF = 10n ** 18n;
var UINT256_MAX = (1n << 256n) - 1n;
function uint(value, name, positive = false) {
  if (typeof value !== "bigint" || value < (positive ? 1n : 0n) || value > UINT256_MAX) throw new RangeError(`Invalid ${name}.`);
  return value;
}
function defineChanceGame(input) {
  uint(input.price, "price", true);
  if (!input.name.trim() || !input.consumable.trim()) throw new TypeError("Game and consumable names are required.");
  if (!input.outcomes.length) throw new RangeError("Provide at least one outcome.");
  const outcomes = input.outcomes.map((outcome) => {
    if (!outcome.name.trim() || !Number.isInteger(outcome.chanceBps) || outcome.chanceBps < 1 || outcome.chanceBps > 1e4) throw new RangeError("Invalid outcome.");
    uint(outcome.reward, "reward");
    return Object.freeze({ ...outcome });
  });
  if (outcomes.reduce((sum, outcome) => sum + outcome.chanceBps, 0) !== 1e4) throw new RangeError("Outcome chances must total 10000 basis points.");
  if (!outcomes.some((outcome) => outcome.reward > 0n)) throw new RangeError("At least one prize is required.");
  return Object.freeze({ ...input, outcomes: Object.freeze(outcomes) });
}
function parseChanceGame(input) {
  if (!input || typeof input !== "object") throw new TypeError("Expected a game definition.");
  const game = input;
  const amount = (value) => {
    if (typeof value !== "string" || !/^[0-9]+$/.test(value)) throw new TypeError("RF amounts must be decimal base-unit strings.");
    return BigInt(value);
  };
  if (typeof game.name !== "string" || typeof game.consumable !== "string" || !Array.isArray(game.outcomes)) throw new TypeError("Invalid game definition.");
  return defineChanceGame({
    name: game.name,
    consumable: game.consumable,
    price: amount(game.price),
    outcomes: game.outcomes.map((row) => {
      if (!row || typeof row !== "object") throw new TypeError("Invalid outcome.");
      const outcome = row;
      if (typeof outcome.name !== "string" || typeof outcome.chanceBps !== "number") throw new TypeError("Invalid outcome.");
      return { name: outcome.name, chanceBps: outcome.chanceBps, reward: amount(outcome.reward) };
    })
  });
}
function maximumPrize(game) {
  return game.outcomes.reduce((max, outcome) => outcome.reward > max ? outcome.reward : max, 0n);
}
function outcomeForRoll(game, roll) {
  if (!Number.isInteger(roll) || roll < 0 || roll >= 1e4) throw new RangeError("Roll must be an integer from 0 to 9999.");
  let boundary = 0;
  for (let index2 = 0; index2 < game.outcomes.length; index2++) {
    boundary += game.outcomes[index2].chanceBps;
    if (roll < boundary) return index2 + 1;
  }
  throw new RangeError("Invalid outcome table.");
}
function samplePreviewRoll() {
  const word = new Uint32Array(1);
  do {
    globalThis.crypto.getRandomValues(word);
  } while (word[0] >= 429496e4);
  return word[0] % 1e4;
}
function createGamePreview(input, options) {
  const definition = defineChanceGame(input), maxPrize = maximumPrize(definition);
  const friendId = uint(options.friendId ?? 0n, "friend ID");
  let stake = uint(options.stake, "stake"), rfBalance = uint(options.rfBalance, "RF balance");
  let consumables = 0n, reservedPlays = 0n, rewardLiability = 0n;
  const inventory = definition.outcomes.map(() => 0n), plays = [];
  const draw = options.draw ?? samplePreviewRoll;
  const freeStake = () => stake - reservedPlays - rewardLiability;
  function canBuy(quantity) {
    if (typeof quantity !== "bigint" || quantity < 1n || quantity > UINT256_MAX) return false;
    const cost = quantity * definition.price, reserve = quantity * maxPrize;
    return cost <= UINT256_MAX && reserve <= UINT256_MAX && stake + cost <= UINT256_MAX && freeStake() >= maxPrize && freeStake() + cost >= reserve;
  }
  function snapshot() {
    return Object.freeze({
      mode: "preview",
      friendId,
      rfBalance,
      consumables,
      stake,
      freeStake: freeStake(),
      reservedPlays,
      rewardLiability,
      inventory: Object.freeze([...inventory]),
      plays: Object.freeze([...plays])
    });
  }
  const client = Object.freeze({
    mode: "preview",
    definition,
    read: async () => snapshot(),
    canBuy: async (quantity) => canBuy(quantity),
    async buy(quantity) {
      uint(quantity, "quantity", true);
      const cost = quantity * definition.price;
      if (!canBuy(quantity)) throw new Error("Game needs more free stake to back this purchase.");
      if (cost > rfBalance) throw new Error("Insufficient RF.");
      stake += cost;
      rfBalance -= cost;
      consumables += quantity;
      reservedPlays += quantity * maxPrize;
    },
    async play(quantity = 1n) {
      uint(quantity, "quantity", true);
      if (quantity > consumables) throw new Error("Insufficient consumables.");
      consumables -= quantity;
      const added = [];
      for (let index2 = 0n; index2 < quantity; index2++) {
        const play = Object.freeze({ id: BigInt(plays.length + 1), outcomeId: null });
        plays.push(play);
        added.push(play);
      }
      return Object.freeze(added);
    },
    async settle(playId) {
      uint(playId, "play ID", true);
      if (playId > BigInt(plays.length)) throw new RangeError("Unknown play.");
      const index2 = Number(playId - 1n), play = plays[index2];
      if (play.outcomeId !== null) throw new Error("Play is already settled.");
      const outcomeId = outcomeForRoll(definition, draw()), outcome = definition.outcomes[outcomeId - 1];
      const result = Object.freeze({ id: play.id, outcomeId });
      reservedPlays -= maxPrize;
      rewardLiability += outcome.reward;
      inventory[outcomeId - 1] += 1n;
      plays[index2] = result;
      return result;
    },
    async redeem(outcomeId, quantity) {
      uint(quantity, "quantity", true);
      if (!Number.isInteger(outcomeId) || outcomeId < 1 || outcomeId > definition.outcomes.length) throw new RangeError("Unknown outcome.");
      const index2 = outcomeId - 1, reward = definition.outcomes[index2].reward;
      if (reward === 0n) throw new Error("This collectible has no RF redemption value.");
      if (inventory[index2] < quantity) throw new Error("Insufficient inventory.");
      const amount = reward * quantity;
      uint(rfBalance + amount, "RF balance");
      inventory[index2] -= quantity;
      rewardLiability -= amount;
      stake -= amount;
      rfBalance += amount;
    }
  });
  return Object.freeze({
    client,
    fund(amount) {
      uint(amount, "funding", true);
      stake = uint(stake + amount, "stake");
    },
    withdraw(amount) {
      uint(amount, "withdrawal", true);
      if (amount > freeStake()) throw new Error("Cannot withdraw reserved RF.");
      stake -= amount;
    }
  });
}

// src/friend-sounds.ts
var FRIEND_SOUND_IDS = ["select", "purchase", "action-start", "action-ready", "anticipation", "impact", "reveal-common", "reveal-rare", "reveal-legendary", "reward"];
var FRIEND_SOUND_SAMPLE_RATE = 48e3;
var FRIEND_SOUND_MAX_VOICES = 4;
var FRIEND_SOUND_MAX_GAIN = 0.3;
var FRIEND_SOUND_PEAK = 0.7;
var tone = (midi, duration, level, at = 0, options = {}) => ({ kind: "tone", at, midi, duration, level, ...options });
var tick = (at, level, clap = false) => ({ kind: "tick", at, level, clap });
var sparkle = (notes, at = 0, level = 0.25) => notes.map((midi, index2) => tone(midi, [0.09, 0.11, 0.22][index2], level * [1, 0.85, 0.7][index2], at + [0, 0.055, 0.12][index2], { attack: 5e-3, release: 0.027, chip: 0.18 }));
var definitions = {
  select: { label: "Select", duration: 0.1, motif: "A short rounded chip pluck", voices: [tone(67, 0.08, 0.22, 0, { attack: 3e-3, release: 0.02 })] },
  "purchase": { label: "Purchase", duration: 0.36, motif: "The earlier mint-confirm C-major triplet", voices: [
    tone(48, 0.18, 0.1, 0, { chip: 0.12 }),
    ...[60, 64, 67].map((midi, index2) => tone(midi, [0.1, 0.11, 0.21][index2], 0.26 * [1, 0.86, 0.68][index2], [0, 0.065, 0.135][index2], { decay: 0.65, attack: 5e-3, release: 0.028, chip: 0.19 }))
  ] },
  "action-start": { label: "Action start", duration: 0.25, motif: "The mint's rounded octave rise with a soft release tick", voices: [tone(48, 0.21, 0.23, 0, { endMidi: 60, decay: 1, chip: 0.16 }), tick(0.025, 0.09)] },
  "action-ready": { label: "Action ready", duration: 0.27, motif: "Two bright pickup notes", voices: [tone(76, 0.085, 0.24, 0, { attack: 4e-3, release: 0.025, chip: 0.18 }), tone(79, 0.12, 0.25, 0.115, { attack: 4e-3, release: 0.03, chip: 0.18 })] },
  "anticipation": { label: "Anticipation", duration: 0.3, motif: "Three climbing plucks and soft mechanical ticks", voices: [...sparkle([60, 64, 67]).map((voice) => ({ ...voice, duration: Math.min(voice.duration, 0.14) })), tick(0, 0.08), tick(0.055, 0.07), tick(0.12, 0.06)] },
  "impact": { label: "Impact", duration: 0.23, motif: "A rounded falling tone with the trailer's filtered soft percussion", voices: [tone(57, 0.17, 0.14, 0, { endMidi: 40, chip: 0.12, decay: 0.55 }), tick(0, 0.25, true), tick(0.035, 0.13, true), tick(0.075, 0.08, true)] },
  "reveal-common": { label: "Common reward", duration: 0.38, motif: "A warm landing and compact C-major sparkle", voices: [tone(48, 0.24, 0.17, 0, { chip: 0.12, decay: 0.65 }), ...sparkle([60, 64, 67])] },
  "reveal-rare": { label: "Rare reward", duration: 0.58, motif: "The latest stat-transition G\u2013C\u2013E sparkle with a held top note", voices: [tone(43, 0.24, 0.15, 0, { chip: 0.12, decay: 0.65 }), ...sparkle([67, 72, 76]), tone(76, 0.37, 0.09, 0.18, { chip: 0.1, decay: 1.2, release: 0.1 })] },
  "reveal-legendary": { label: "Legendary reward", duration: 1.05, motif: "A mint rise, high pickup sparkle and warm final C-major resolution", voices: [
    tone(48, 0.18, 0.12, 0, { endMidi: 60, chip: 0.16 }),
    ...sparkle([72, 76, 79], 0.13, 0.27),
    ...[36, 60, 64, 67].map((midi, index2) => tone(midi, 0.65, [0.19, 0.14, 0.1, 0.08][index2], 0.37, { decay: 1.4, attack: 0.016, release: 0.2, chip: 0.1 }))
  ] },
  reward: { label: "Reward", duration: 0.36, motif: "The latest world-token-pickup C\u2013E\u2013G sparkle", voices: sparkle([72, 76, 79]) }
};
var FRIEND_SOUND_CUES = Object.freeze(
  Object.fromEntries(FRIEND_SOUND_IDS.map((id) => {
    const { label, duration, motif } = definitions[id];
    return [id, Object.freeze({ label, duration, motif })];
  }))
);
function cueDefinition(cue) {
  if (!FRIEND_SOUND_IDS.includes(cue)) throw new TypeError(`Unknown Friend sound: ${String(cue)}`);
  return definitions[cue];
}
function unit(value, name) {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0 || value > 1) throw new RangeError(`${name} must be between 0 and 1`);
  return value;
}
var hz = (midi) => 440 * 2 ** ((midi - 69) / 12);
var triangle = (phase) => 4 * Math.abs(phase % 1 - 0.5) - 1;
var smooth = (amount) => Math.sin(Math.PI / 2 * Math.min(1, Math.max(0, amount))) ** 2;
function renderFriendSound(cue, options = {}) {
  const definition = cueDefinition(cue);
  const sampleRate = options.sampleRate ?? FRIEND_SOUND_SAMPLE_RATE;
  if (!Number.isInteger(sampleRate) || sampleRate < 8e3 || sampleRate > 192e3) throw new RangeError("sampleRate must be an integer between 8000 and 192000");
  const output = new Float64Array(Math.round(definition.duration * sampleRate));
  let randomState = 1380340564 ^ FRIEND_SOUND_IDS.indexOf(cue) + 1;
  const noise = () => {
    randomState ^= randomState << 13;
    randomState ^= randomState >>> 17;
    randomState ^= randomState << 5;
    return (randomState >>> 0) / 4294967296 * 2 - 1;
  };
  for (const voice of definition.voices) {
    const duration = voice.kind === "tone" ? voice.duration : voice.clap ? 0.105 : 0.037;
    const count = Math.round(duration * sampleRate), start = Math.round(voice.at * sampleRate);
    let phase = 0, filtered = 0;
    for (let index2 = 0; index2 < count && start + index2 < output.length; index2++) {
      const t = index2 / sampleRate, remaining = (count - 1 - index2) / sampleRate;
      let sample;
      if (voice.kind === "tone") {
        const frequency = hz(voice.midi), end = hz(voice.endMidi ?? voice.midi);
        phase += frequency * (end / frequency) ** (t / duration) / sampleRate;
        const envelope = smooth(t / (voice.attack ?? 9e-3)) * smooth(remaining / (voice.release ?? 0.045)) * Math.exp(-t / (duration * (voice.decay ?? 0.78)));
        const chip = voice.chip ?? 0.24;
        sample = voice.level * envelope * ((1 - chip) * Math.sin(2 * Math.PI * phase) + chip * triangle(phase + 0.75));
      } else {
        filtered += (1 - (1 - 0.17) ** (48e3 / sampleRate)) * (noise() - filtered);
        const envelope = Math.min(1, t / 1e-3) * Math.exp(-t / (voice.clap ? 0.021 : 7e-3)) * Math.min(1, remaining / 9e-3);
        sample = voice.level * envelope * (0.8 * filtered + 0.2 * Math.sin(2 * Math.PI * (voice.clap ? 210 : 740) * t));
      }
      output[start + index2] += sample;
    }
  }
  let peak = 0;
  for (const sample of output) peak = Math.max(peak, Math.abs(sample));
  const gain = peak ? FRIEND_SOUND_PEAK / peak : 0;
  return Float32Array.from(output, (sample) => sample * gain);
}
function createFriendSoundKit(options = {}) {
  if (options.muted !== void 0 && typeof options.muted !== "boolean") throw new TypeError("muted must be a boolean");
  let muted = options.muted ?? false, volume = unit(options.volume ?? 0.65, "volume");
  let context = null, master = null;
  let unlocked = false, unsupported = false, disposed = false, epoch = 0;
  let pending = null, listening = false;
  const buffers = /* @__PURE__ */ new Map();
  const voices = /* @__PURE__ */ new Set();
  const doc = typeof document === "undefined" ? null : document;
  const win = typeof window === "undefined" ? null : window;
  const hidden = () => Boolean(doc?.hidden);
  function release(voice) {
    if (voice.released) return;
    voice.released = true;
    voices.delete(voice);
    voice.source.onended = null;
    try {
      voice.source.disconnect();
    } catch {
    }
    try {
      voice.gain.disconnect();
    } catch {
    }
  }
  function halt(voice) {
    try {
      voice.source.stop();
    } catch {
    }
    release(voice);
  }
  function stop() {
    epoch++;
    if (pending) {
      pending = null;
      unlocked = false;
    }
    for (const voice of [...voices]) halt(voice);
  }
  const visibility = () => {
    if (hidden()) stop();
  };
  const pageHide = () => stop();
  function masterLevel() {
    if (master) master.gain.value = muted ? 0 : volume * FRIEND_SOUND_MAX_GAIN;
  }
  function attach() {
    if (listening) return;
    doc?.addEventListener("visibilitychange", visibility);
    win?.addEventListener("pagehide", pageHide);
    listening = true;
  }
  function dispose() {
    if (disposed) return;
    disposed = true;
    unlocked = false;
    stop();
    buffers.clear();
    if (listening) {
      doc?.removeEventListener("visibilitychange", visibility);
      win?.removeEventListener("pagehide", pageHide);
      listening = false;
    }
    try {
      master?.disconnect();
    } catch {
    }
    const previous = context;
    context = null;
    master = null;
    if (previous) {
      try {
        void previous.close().catch(() => {
        });
      } catch {
      }
    }
  }
  function unlock() {
    if (disposed || muted || hidden() || unsupported) return Promise.resolve(false);
    if (unlocked && context?.state === "running") return Promise.resolve(true);
    if (pending) return pending;
    if (context?.state === "closed") {
      for (const voice of [...voices]) halt(voice);
      try {
        master?.disconnect();
      } catch {
      }
      context = null;
      master = null;
      unlocked = false;
      buffers.clear();
    }
    const generation = epoch;
    if (!context || context.state === "closed") {
      try {
        const AudioContextClass = globalThis.AudioContext ?? globalThis.webkitAudioContext;
        if (!AudioContextClass) {
          unsupported = true;
          return Promise.resolve(false);
        }
        context = new AudioContextClass();
        master = context.createGain();
        masterLevel();
        master.connect(context.destination);
        buffers.clear();
        attach();
      } catch {
        const failed = context;
        context = null;
        master = null;
        unsupported = true;
        if (failed) {
          try {
            void failed.close().catch(() => {
            });
          } catch {
          }
        }
        return Promise.resolve(false);
      }
    }
    const active = context;
    let resume;
    try {
      resume = active.state === "running" ? Promise.resolve() : active.resume();
    } catch {
      unlocked = false;
      return Promise.resolve(false);
    }
    unlocked = false;
    const attempt = resume.then(() => {
      if (disposed || generation !== epoch || muted || hidden() || context !== active || active.state !== "running") return false;
      unlocked = true;
      return true;
    }, () => false).finally(() => {
      if (pending === attempt) pending = null;
    });
    pending = attempt;
    return attempt;
  }
  function play(cue, playOptions = {}) {
    cueDefinition(cue);
    const level = unit(playOptions.volume ?? 1, "cue volume"), delay = unit(playOptions.delay ?? 0, "delay");
    if (disposed || muted || hidden() || !unlocked || !context || !master || context.state !== "running" || !volume || !level) return false;
    let source = null, gain = null, voice = null;
    try {
      let buffer2 = buffers.get(cue);
      if (!buffer2) {
        const pcm = renderFriendSound(cue);
        buffer2 = context.createBuffer(1, pcm.length, FRIEND_SOUND_SAMPLE_RATE);
        buffer2.getChannelData(0).set(pcm);
        buffers.set(cue, buffer2);
      }
      if (voices.size >= FRIEND_SOUND_MAX_VOICES) halt(voices.values().next().value);
      source = context.createBufferSource();
      gain = context.createGain();
      gain.gain.value = level;
      source.buffer = buffer2;
      source.connect(gain);
      gain.connect(master);
      voice = { source, gain, released: false };
      voices.add(voice);
      const playing = voice;
      source.onended = () => release(playing);
      source.start(context.currentTime + delay);
      return true;
    } catch {
      if (voice) halt(voice);
      else {
        try {
          source?.disconnect();
        } catch {
        }
        try {
          gain?.disconnect();
        } catch {
        }
      }
      return false;
    }
  }
  return Object.freeze({
    get state() {
      return Object.freeze({ status: disposed ? "disposed" : unsupported ? "unsupported" : unlocked && context?.state === "running" ? "ready" : "locked", muted, volume, activeVoices: voices.size });
    },
    unlock,
    play,
    stop,
    dispose,
    setMuted(next) {
      if (typeof next !== "boolean") throw new TypeError("muted must be a boolean");
      if (disposed) return;
      muted = next;
      masterLevel();
      if (muted) stop();
    },
    setVolume(next) {
      const checked = unit(next, "volume");
      if (disposed) return;
      volume = checked;
      masterLevel();
      if (!volume) stop();
    }
  });
}

// src/experience-ui.tsx
import { useId, useState as useState2 } from "react";

// src/items.ts
function formatGameItemQuantity(item, quantity) {
  const places = item.token?.decimals ?? 0;
  if (typeof quantity !== "bigint" || quantity < 0n || quantity >= 1n << 256n) throw new RangeError("Quantity must fit uint256.");
  if (!Number.isInteger(places) || places < 0 || places > 255) throw new RangeError("Decimals must be from 0 through 255.");
  if (places === 0) return quantity.toString();
  const digits = quantity.toString().padStart(places + 1, "0");
  const fraction = digits.slice(-places).replace(/0+$/, "");
  return `${digits.slice(0, -places)}${fraction ? `.${fraction}` : ""}`;
}

// src/reward-reveal.tsx
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
var REWARD_REVEAL_TIMING = Object.freeze({ emergence: 720, reveal: 1320, complete: 2400 });
var reducedQuery = "(prefers-reduced-motion: reduce)";
var subscribeMotion = (callback) => {
  const query = window.matchMedia(reducedQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
};
var readMotion = () => window.matchMedia(reducedQuery).matches;
var serverMotion = () => false;
function ItemBitmap({ item }) {
  const width = item.art?.rows.length ? Math.max(1, ...item.art.rows.map((row) => row.length)) : 16;
  const height = item.art?.rows.length || 16;
  const path = (item.art?.rows ?? []).flatMap((row, y) => [...row].flatMap((pixel, x) => pixel === "#" ? [`M${x} ${y}h1v1h-1z`] : [])).join("");
  return /* @__PURE__ */ jsx("svg", { viewBox: `0 0 ${width} ${height}`, fill: "currentColor", shapeRendering: "crispEdges", children: path ? /* @__PURE__ */ jsx("path", { d: path }) : /* @__PURE__ */ jsx("path", { d: "M8 1 15 8 8 15 1 8Z" }) });
}
function RewardReveal(props) {
  return /* @__PURE__ */ jsx(RewardRevealSequence, { ...props }, props.revealKey);
}
function RewardRevealSequence({ item, reducedMotion, onPhase, onComplete, skipSignal = 0, showSkipControl = true, skipLabel = "Reveal reward", slots = {}, className = "", style }) {
  const systemReducedMotion = useSyncExternalStore(subscribeMotion, readMotion, serverMotion);
  const reduceMotion = reducedMotion ?? systemReducedMotion;
  const [phase, setPhase] = useState(reduceMotion ? "complete" : "anticipation");
  const callbacks = useRef({ item, onPhase, onComplete });
  const timers = useRef([]);
  const completed = useRef(false);
  const lastPhase = useRef(null);
  const previousSkipSignal = useRef(skipSignal);
  useEffect(() => {
    callbacks.current = { item, onPhase, onComplete };
  }, [item, onPhase, onComplete]);
  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);
  const announcePhase = useCallback((next) => {
    if (lastPhase.current === next) return;
    lastPhase.current = next;
    callbacks.current.onPhase?.(next, callbacks.current.item);
  }, []);
  const finish = useCallback((reason) => {
    if (completed.current) return;
    completed.current = true;
    clearTimers();
    setPhase("complete");
    announcePhase("complete");
    callbacks.current.onComplete?.(callbacks.current.item, reason);
  }, [announcePhase, clearTimers]);
  useEffect(() => {
    if (completed.current) return;
    if (reduceMotion) {
      timers.current = [setTimeout(() => finish("reduced-motion"), 0)];
    } else {
      announcePhase("anticipation");
      const advance = (next) => {
        if (completed.current) return;
        setPhase(next);
        announcePhase(next);
      };
      timers.current = [
        setTimeout(() => advance("emergence"), REWARD_REVEAL_TIMING.emergence),
        setTimeout(() => advance("reveal"), REWARD_REVEAL_TIMING.reveal),
        setTimeout(() => finish("finished"), REWARD_REVEAL_TIMING.complete)
      ];
    }
    return clearTimers;
  }, [announcePhase, clearTimers, finish, reduceMotion]);
  useEffect(() => {
    if (previousSkipSignal.current === skipSignal) return;
    previousSkipSignal.current = skipSignal;
    finish("skipped");
  }, [finish, skipSignal]);
  const special = ["rare", "epic", "legendary", "mythic"].includes(item.rarity ?? "");
  const revealed = phase === "reveal" || phase === "complete";
  const itemArt = slots.itemArt ?? /* @__PURE__ */ jsx(ItemBitmap, { item });
  const particleCount = item.rarity === "mythic" ? 18 : item.rarity === "legendary" ? 14 : special ? 10 : item.rarity === "uncommon" ? 6 : 4;
  return /* @__PURE__ */ jsxs("div", { className: `rf-reward-reveal ${className}`.trim(), "data-reveal-phase": phase, "data-rarity": item.rarity, "data-reduced-motion": reduceMotion || void 0, "data-skip-control": showSkipControl || void 0, style, children: [
    /* @__PURE__ */ jsxs("div", { className: "rf-reward-scene", "aria-hidden": "true", inert: true, children: [
      slots.backdrop && /* @__PURE__ */ jsx("div", { className: "rf-reward-backdrop", children: slots.backdrop }),
      phase === "anticipation" && /* @__PURE__ */ jsx("div", { className: "rf-reward-anticipation", children: slots.anticipation ?? /* @__PURE__ */ jsxs("div", { className: "rf-reward-focus", children: [
        /* @__PURE__ */ jsx("i", {}),
        /* @__PURE__ */ jsx("i", {}),
        /* @__PURE__ */ jsx("i", {}),
        /* @__PURE__ */ jsx("i", {}),
        /* @__PURE__ */ jsx("span", {})
      ] }) }),
      phase === "emergence" && /* @__PURE__ */ jsx("div", { className: "rf-reward-emergence", children: slots.emergence ?? /* @__PURE__ */ jsx("div", { className: "rf-reward-silhouette", children: itemArt }) }),
      /* @__PURE__ */ jsx("div", { className: "rf-reward-halo" }),
      revealed && /* @__PURE__ */ jsx("div", { className: "rf-reward-item", children: itemArt }),
      /* @__PURE__ */ jsx("div", { className: "rf-reward-particles", children: Array.from({ length: particleCount }, (_, index2) => /* @__PURE__ */ jsx("i", { style: { "--particle-index": index2, "--particle-count": particleCount } }, index2)) })
    ] }),
    /* @__PURE__ */ jsx("span", { className: "rf-reward-announcement", role: "status", "aria-live": "polite", children: revealed ? [item.name, item.rarity].filter(Boolean).join(", ") : phase === "anticipation" ? "Preparing reward" : "Reward appearing" }),
    showSkipControl && /* @__PURE__ */ jsx("button", { type: "button", className: "rf-reward-skip", onClick: () => finish("skipped"), disabled: phase === "complete", "aria-label": phase === "complete" ? "Reward revealed" : skipLabel, children: phase === "complete" ? "Reward revealed" : skipLabel })
  ] });
}

// src/experience-ui.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var DEFAULT_CURRENCY = { symbol: "", decimals: 0 };
var GAME_VISIBLE_CHOICES = 6;
function formatGameAmount(value, decimals = 0) {
  if (!Number.isInteger(decimals) || decimals < 0 || decimals > 255) throw new RangeError("Currency decimals must be an integer from 0 to 255");
  const negative = value < 0n;
  const digits = (negative ? -value : value).toString().padStart(decimals + 1, "0");
  const integer = decimals ? digits.slice(0, -decimals) : digits;
  const fraction = decimals ? digits.slice(-decimals).replace(/0+$/, "") : "";
  return `${negative ? "-" : ""}${integer.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${fraction ? `.${fraction}` : ""}`;
}
function Keycap({ children }) {
  return /* @__PURE__ */ jsx2("kbd", { className: "rf-game-keycap", children });
}
function ItemArt({ item, className = "" }) {
  const rows = item.art?.rows ?? [];
  const width = rows.length ? Math.max(1, ...rows.map((row) => row.length)) : 16;
  const height = rows.length || 16;
  const path = rows.flatMap((row, y) => [...row].flatMap((pixel, x) => pixel === "#" ? [`M${x} ${y}h1v1h-1z`] : [])).join("");
  return /* @__PURE__ */ jsx2("svg", { className: `rf-game-item-art ${className}`.trim(), viewBox: `0 0 ${width} ${height}`, fill: "currentColor", shapeRendering: "crispEdges", role: "img", "aria-label": item.name, children: /* @__PURE__ */ jsx2("path", { d: path || "M8 1 15 8 8 15 1 8Z" }) });
}
function InventoryIcon() {
  return /* @__PURE__ */ jsx2("svg", { className: "rf-game-inventory-icon", viewBox: "0 0 32 32", fill: "none", stroke: "currentColor", strokeWidth: "2", shapeRendering: "crispEdges", "aria-hidden": "true", children: /* @__PURE__ */ jsx2("path", { d: "M5 8h22v20H5zM10 8V4h12v4M5 14h22M13 14v5h6v-5" }) });
}
function ProgressArt() {
  return /* @__PURE__ */ jsxs2("div", { className: "rf-game-loading-mark", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx2("i", {}),
    /* @__PURE__ */ jsx2("i", {}),
    /* @__PURE__ */ jsx2("i", {}),
    /* @__PURE__ */ jsx2("i", {})
  ] });
}
function ItemPicker({ items, counts = {}, selectedItemId, onSelectItem, label = "Choose item", itemArt }) {
  const name = useId();
  if (items.length > GAME_VISIBLE_CHOICES) return /* @__PURE__ */ jsxs2("p", { className: "rf-game-configuration-error", role: "alert", children: [
    "Builder setup: show at most ",
    GAME_VISIBLE_CHOICES,
    " item choices per activity."
  ] });
  return /* @__PURE__ */ jsx2("div", { className: "rf-game-item-picker", "data-count": items.length, "data-rows": items.length > 3 ? 2 : 1, children: /* @__PURE__ */ jsx2("div", { className: "rf-game-item-choices", role: "radiogroup", "aria-label": label, children: items.map((item) => {
    const count = counts[item.id] ?? 0n;
    const accessibleName = `${item.name}, ${formatGameItemQuantity(item, count)} owned`;
    return /* @__PURE__ */ jsxs2("label", { className: "rf-game-item-choice", "data-item-id": item.id, "data-selected": item.id === selectedItemId, "data-stock": count > 0n, title: accessibleName, children: [
      /* @__PURE__ */ jsx2("input", { type: "radio", name, checked: item.id === selectedItemId, onChange: () => onSelectItem?.(item.id), disabled: !onSelectItem || count <= 0n, "aria-label": accessibleName }),
      /* @__PURE__ */ jsx2("span", { className: "rf-game-choice-art rf-game-art-slot", "aria-hidden": "true", children: itemArt?.(item) ?? /* @__PURE__ */ jsx2(ItemArt, { item }) }),
      /* @__PURE__ */ jsx2("span", { className: "rf-game-choice-name", children: item.name }),
      /* @__PURE__ */ jsxs2("small", { children: [
        formatGameItemQuantity(item, count),
        " owned"
      ] })
    ] }, item.id);
  }) }) });
}
var DEFAULT_LABELS = {
  activityLocation: "Activity",
  shopLocation: "Shop",
  rewardLocation: "Reward",
  activityTitle: "Choose an item",
  activityDescription: "",
  action: "Start",
  selectItem: "Choose item",
  reviewTitle: "Review purchase",
  reviewDescription: "",
  confirm: "Confirm",
  cancel: "Cancel",
  pendingTitle: "Confirming",
  pendingDescription: "",
  workingTitle: "In progress",
  readyTitle: "Ready",
  workingDescription: "",
  readyDescription: "",
  resolve: "Finish",
  waiting: "Waiting",
  rewardTitle: "Your reward",
  keep: "Keep item",
  openShop: "Visit shop",
  emptyInventory: "No items yet.",
  emptyShop: "No offers available.",
  buy: "Buy",
  sell: "Sell",
  returnToActivity: "Back",
  close: "Close panel",
  balance: "Balance",
  item: "Item",
  total: "Total",
  value: "Value",
  reviewNotice: "",
  insufficientBalance: "Insufficient balance.",
  missingItems: "Get the required items from the shop.",
  buyTab: "Buy",
  sellTab: "Sell",
  activityCost: "Required",
  anticipationTitle: "Preparing reward",
  emergenceTitle: "Reward appearing",
  reveal: "Reveal reward",
  previousOffer: "Previous offer",
  nextOffer: "Next offer",
  previousInventory: "Previous item",
  nextInventory: "Next item",
  previousChoices: "Previous items",
  nextChoices: "Next items"
};
function PanelAction({ label, accessibleLabel = label, glyph, primary = false, disabled = false, onClick }) {
  return /* @__PURE__ */ jsxs2("button", { type: "button", className: `rf-game-button${primary ? " rf-game-button-primary" : ""}`, "data-primary-action": primary || void 0, onClick, disabled: disabled || !onClick, "aria-label": accessibleLabel, title: accessibleLabel, children: [
    /* @__PURE__ */ jsx2("span", { className: "rf-game-button-label", children: label }),
    glyph && /* @__PURE__ */ jsx2("span", { className: "rf-game-button-glyph", "aria-hidden": "true", children: glyph })
  ] });
}
function ExperiencePanel({
  stage,
  itemCatalog,
  itemCounts = {},
  selectableItemIds,
  selectedItemId,
  activeItemId,
  itemCost = 0n,
  requirements = {},
  balance,
  currency: currency2 = DEFAULT_CURRENCY,
  shopOffers = [],
  sellOffers = [],
  purchase,
  inventory = [],
  reward,
  rewardValue,
  purchaseDisabled = false,
  shopTab: controlledTab,
  pendingStep = 0,
  pendingSteps = ["Request submitted", "Confirming"],
  status,
  error,
  workingReady = false,
  revealKey,
  reducedMotion,
  onRevealPhase,
  onRevealComplete,
  onSelectItem,
  onBuy,
  onSell,
  onSellReward,
  canSellReward,
  onAction,
  onConfirm,
  onResolve,
  onKeep,
  onShop,
  onReturn,
  onClose,
  onShopTabChange,
  labels: overrides,
  slots = {},
  className = "",
  style,
  dataAttributes
}) {
  const [selectedOfferId, setSelectedOfferId] = useState2(null);
  const [inventoryPage, setInventoryPage] = useState2(0);
  const [localTab, setLocalTab] = useState2("buy");
  const [revealState, setRevealState] = useState2(null);
  const [skipSignal, setSkipSignal] = useState2(0);
  const id = useId();
  const labels = { ...DEFAULT_LABELS, ...overrides };
  const tab = controlledTab ?? localTab;
  const changeTab = (next) => {
    setLocalTab(next);
    onShopTabChange?.(next);
  };
  const item = (itemId) => itemCatalog.find((value) => value.id === itemId);
  const quantity = (value, itemId) => {
    const definition = item(itemId);
    return definition ? formatGameItemQuantity(definition, value) : formatGameAmount(value);
  };
  const renderArt = (value) => slots.itemArt?.(value) ?? /* @__PURE__ */ jsx2(ItemArt, { item: value });
  const selectedItem = item(selectedItemId), activeItem = item(activeItemId) ?? selectedItem, rewardItem = item(reward?.itemId), purchaseItem = item(purchase?.itemId);
  const choices = selectableItemIds ? selectableItemIds.flatMap((itemId) => {
    const value = item(itemId);
    return value ? [value] : [];
  }) : itemCatalog;
  const selectedCount = selectedItem ? itemCounts[selectedItem.id] ?? 0n : 0n;
  const requiredItems = { ...requirements };
  if (selectedItem && itemCost > 0n) requiredItems[selectedItem.id] = (requiredItems[selectedItem.id] ?? 0n) + itemCost;
  const requiredEntries = Object.entries(requiredItems).filter(([, quantity2]) => quantity2 > 0n);
  const missingItems = itemCost > 0n && !selectedItem || requiredEntries.some(([itemId, quantity2]) => (itemCounts[itemId] ?? 0n) < quantity2);
  const requirementText = requiredEntries.map(([itemId, count]) => `${quantity(count, itemId)} ${item(itemId)?.name ?? itemId}`).join(" + ");
  const choiceError = choices.length > GAME_VISIBLE_CHOICES ? `Builder setup: show at most ${GAME_VISIBLE_CHOICES} item choices per activity.` : "";
  const offerError = shopOffers.length > GAME_VISIBLE_CHOICES ? `Builder setup: show at most ${GAME_VISIBLE_CHOICES} offers per shop.` : shopOffers.some((value) => !item(value.itemId)) ? "Builder setup: every shop offer needs an item in the catalog." : "";
  const configurationError = stage === "activity" ? choiceError : stage === "shop" && tab === "buy" ? offerError : "";
  const offer = !offerError ? shopOffers.find((value) => value.id === selectedOfferId) ?? shopOffers[0] : void 0, offerItem = item(offer?.itemId);
  const inventoryIndex = Math.min(inventoryPage, Math.max(0, inventory.length - 1));
  const inventoryEntry = inventory[inventoryIndex], inventoryItem = item(inventoryEntry?.itemId);
  const sellOffer = inventoryEntry && sellOffers.find((value) => value.itemId === inventoryEntry.itemId && value.quantity <= inventoryEntry.quantity);
  const canSell = Boolean(sellOffer && inventoryEntry && (itemCounts[inventoryEntry.itemId] ?? 0n) >= sellOffer.quantity && (canSellReward?.(inventoryEntry) ?? true));
  const revealPhase = revealKey === void 0 || !rewardItem ? "complete" : revealState?.key === revealKey ? revealState.phase : "anticipation";
  const revealReady = revealPhase === "complete";
  const revealTitle = revealPhase === "anticipation" ? labels.anticipationTitle : revealPhase === "emergence" ? labels.emergenceTitle : labels.rewardTitle;
  const steps = pendingSteps.length ? pendingSteps : [labels.pendingTitle];
  const activeStep = Math.max(0, Math.min(steps.length - 1, Number.isFinite(pendingStep) ? Math.floor(pendingStep) : 0));
  const stepStart = Math.max(0, Math.min(activeStep - 1, steps.length - 3));
  const money = (value) => `${formatGameAmount(value, currency2.decimals)}${currency2.symbol ? ` ${currency2.symbol}` : ""}`;
  let summaryLabel = labels.total, summaryText = money(purchase?.price ?? 0n), summaryAmount = purchase?.price ?? 0n;
  if (stage === "activity" || stage === "working") {
    summaryLabel = stage === "activity" ? labels.activityCost : labels.item;
    summaryAmount = void 0;
    summaryText = stage === "working" ? itemCost > 0n && activeItem ? `${quantity(itemCost, activeItem.id)} ${activeItem.name} used` : requirementText || labels.workingTitle : requirementText ? `${requirementText}${selectedItem && requiredEntries.length === 1 ? ` \xB7 ${quantity(selectedCount, selectedItem.id)} owned` : ""}` : labels.readyTitle;
  }
  if (stage === "reward") {
    summaryLabel = !revealReady ? labels.rewardLocation : rewardValue === void 0 ? labels.item : labels.value;
    summaryAmount = revealReady ? rewardValue : void 0;
    summaryText = !revealReady ? revealTitle : rewardValue !== void 0 ? money(rewardValue) : `${quantity(reward?.quantity ?? 0n, rewardItem?.id)} ${rewardItem?.name ?? labels.item}`;
  }
  if (stage === "shop") {
    summaryLabel = tab === "buy" && offer ? `${quantity(offer.quantity, offer.itemId)} ${offerItem?.name ?? labels.item}` : labels.balance;
    summaryAmount = tab === "buy" ? offer?.price ?? 0n : balance;
    summaryText = money(summaryAmount);
  }
  const feedbackError = error || configurationError;
  const feedback = feedbackError || status || (stage === "activity" && missingItems ? labels.missingItems : stage === "review" ? purchase && balance < purchase.price ? labels.insufficientBalance : labels.reviewNotice : stage === "pending" ? `${activeStep + 1} / ${steps.length} \xB7 ${steps[activeStep]}` : "");
  const location = ["shop", "review", "pending"].includes(stage) ? labels.shopLocation : stage === "reward" ? labels.rewardLocation : labels.activityLocation;
  const busy = stage === "pending" || stage === "working";
  const revealProps = rewardItem && revealKey !== void 0 ? { item: rewardItem, revealKey, reducedMotion, skipSignal, showSkipControl: false, slots: { itemArt: renderArt(rewardItem) }, onPhase: (phase, value) => {
    setRevealState({ key: revealKey, phase });
    onRevealPhase?.(phase, value);
  }, onComplete: onRevealComplete } : void 0;
  return /* @__PURE__ */ jsxs2("section", { className: `rf-game-panel ${className}`.trim(), "data-stage": stage, "data-experience-stage": stage, "data-shop-tab": tab, "data-reveal-phase": stage === "reward" ? revealPhase : void 0, "data-ready": workingReady || void 0, "data-footer": slots.footer != null || void 0, "data-reward-details": slots.rewardDetails != null || void 0, style, ...dataAttributes, children: [
    /* @__PURE__ */ jsxs2("div", { className: "rf-game-panel-bar", children: [
      /* @__PURE__ */ jsx2("span", { title: location, children: location }),
      /* @__PURE__ */ jsxs2("div", { className: "rf-game-header-actions", children: [
        slots.headerActions,
        onClose && !busy && /* @__PURE__ */ jsx2("button", { type: "button", className: "rf-game-close", onClick: onClose, "aria-label": labels.close, children: "\xD7" })
      ] })
    ] }),
    stage === "activity" && /* @__PURE__ */ jsxs2("div", { className: "rf-game-panel-body rf-game-activity-body", "data-picker": choices.length > 0 || void 0, children: [
      /* @__PURE__ */ jsxs2("div", { className: "rf-game-activity-intro", children: [
        slots.activityArt && /* @__PURE__ */ jsx2("div", { className: "rf-game-activity-art rf-game-art-slot", children: slots.activityArt }),
        /* @__PURE__ */ jsx2("h2", { className: "rf-game-title", title: labels.activityTitle, children: labels.activityTitle }),
        /* @__PURE__ */ jsx2("p", { className: "rf-game-description", children: labels.activityDescription })
      ] }),
      choices.length > 0 && /* @__PURE__ */ jsx2(ItemPicker, { items: choices, counts: itemCounts, selectedItemId, onSelectItem, label: labels.selectItem, itemArt: renderArt })
    ] }),
    stage === "review" && /* @__PURE__ */ jsxs2("div", { className: "rf-game-panel-body rf-game-review-body", children: [
      /* @__PURE__ */ jsx2("h2", { className: "rf-game-title", title: labels.reviewTitle, children: labels.reviewTitle }),
      /* @__PURE__ */ jsx2("p", { className: "rf-game-description", children: labels.reviewDescription }),
      purchaseItem && /* @__PURE__ */ jsx2("div", { className: "rf-game-purchase-art rf-game-art-slot", children: renderArt(purchaseItem) }),
      /* @__PURE__ */ jsxs2("dl", { className: "rf-game-receipt", children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("dt", { children: labels.item }),
          /* @__PURE__ */ jsxs2("dd", { title: `${quantity(purchase?.quantity ?? 0n, purchase?.itemId)} ${purchaseItem?.name ?? labels.item}`, children: [
            quantity(purchase?.quantity ?? 0n, purchase?.itemId),
            " ",
            purchaseItem?.name ?? labels.item
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("dt", { children: labels.balance }),
          /* @__PURE__ */ jsxs2("dd", { title: money(balance), children: [
            formatGameAmount(balance, currency2.decimals),
            " ",
            /* @__PURE__ */ jsx2("span", { children: currency2.symbol })
          ] })
        ] })
      ] })
    ] }),
    stage === "pending" && /* @__PURE__ */ jsxs2("div", { className: "rf-game-panel-body rf-game-pending-body", children: [
      /* @__PURE__ */ jsx2("div", { className: "rf-game-pending-art rf-game-art-slot", children: slots.pendingArt ?? /* @__PURE__ */ jsx2(ProgressArt, {}) }),
      /* @__PURE__ */ jsx2("h2", { className: "rf-game-title", title: labels.pendingTitle, children: labels.pendingTitle }),
      /* @__PURE__ */ jsx2("p", { className: "rf-game-description", children: labels.pendingDescription }),
      /* @__PURE__ */ jsx2("ol", { className: "rf-game-progress", start: stepStart + 1, children: steps.slice(stepStart, stepStart + 3).map((step, index2) => {
        const originalIndex = stepStart + index2;
        return /* @__PURE__ */ jsxs2("li", { "data-state": originalIndex < activeStep ? "complete" : originalIndex === activeStep ? "current" : "waiting", "aria-current": originalIndex === activeStep ? "step" : void 0, children: [
          /* @__PURE__ */ jsx2("span", { className: "rf-game-progress-mark", "aria-hidden": "true", children: originalIndex < activeStep ? "\u2713" : String(originalIndex + 1).padStart(2, "0") }),
          /* @__PURE__ */ jsx2("span", { title: step, children: step })
        ] }, originalIndex);
      }) })
    ] }),
    stage === "working" && /* @__PURE__ */ jsxs2("div", { className: "rf-game-panel-body rf-game-working-body", children: [
      /* @__PURE__ */ jsx2("div", { className: "rf-game-working-art rf-game-art-slot", children: slots.workingArt ?? /* @__PURE__ */ jsx2(ProgressArt, {}) }),
      /* @__PURE__ */ jsx2("h2", { className: "rf-game-title", title: workingReady ? labels.readyTitle : labels.workingTitle, children: workingReady ? labels.readyTitle : labels.workingTitle }),
      /* @__PURE__ */ jsx2("p", { className: "rf-game-description", children: workingReady ? labels.readyDescription : labels.workingDescription })
    ] }),
    stage === "reward" && /* @__PURE__ */ jsxs2("div", { className: "rf-game-panel-body rf-game-reward-body", children: [
      /* @__PURE__ */ jsx2("h2", { className: "rf-game-reward-title", title: revealTitle, children: revealTitle }),
      /* @__PURE__ */ jsx2("div", { className: "rf-game-reward-art rf-game-art-slot", children: revealProps ? slots.reveal?.(revealProps) ?? /* @__PURE__ */ jsx2(RewardReveal, { ...revealProps }) : rewardItem ? renderArt(rewardItem) : /* @__PURE__ */ jsx2(InventoryIcon, {}) }),
      /* @__PURE__ */ jsx2("span", { className: "rf-game-rarity", "data-rarity": rewardItem?.rarity, "data-reveal-hidden": !revealReady || !rewardItem?.rarity || void 0, "aria-hidden": !revealReady || !rewardItem?.rarity, children: rewardItem?.rarity }),
      /* @__PURE__ */ jsx2("h3", { className: "rf-game-item-name", title: revealReady ? rewardItem?.name : void 0, "data-reveal-hidden": !revealReady || void 0, "aria-hidden": !revealReady, children: rewardItem?.name }),
      slots.rewardDetails != null && /* @__PURE__ */ jsx2("div", { className: "rf-game-reward-details", "data-reveal-hidden": !revealReady || void 0, "aria-hidden": !revealReady, children: slots.rewardDetails })
    ] }),
    stage === "shop" && /* @__PURE__ */ jsxs2("div", { className: "rf-game-panel-body rf-game-shop-body", children: [
      /* @__PURE__ */ jsx2("div", { className: "rf-game-shop-tabs", role: "tablist", "aria-label": labels.shopLocation, onKeyDown: (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "Home" ? "buy" : event.key === "End" ? "sell" : tab === "buy" ? "sell" : "buy";
        changeTab(next);
        event.currentTarget.querySelector(`[data-tab="${next}"]`)?.focus();
      }, children: ["buy", "sell"].map((value) => /* @__PURE__ */ jsx2("button", { type: "button", role: "tab", "data-tab": value, id: `${id}-${value}-tab`, "aria-selected": tab === value, "aria-controls": `${id}-items`, tabIndex: tab === value ? 0 : -1, onClick: () => changeTab(value), children: /* @__PURE__ */ jsx2("span", { children: value === "buy" ? labels.buyTab : labels.sellTab }) }, value)) }),
      /* @__PURE__ */ jsx2("div", { className: "rf-game-shop-items", role: "tabpanel", id: `${id}-items`, "aria-labelledby": `${id}-${tab}-tab`, children: tab === "buy" ? offerError ? /* @__PURE__ */ jsx2("p", { className: "rf-game-configuration-error", role: "alert", children: offerError }) : shopOffers.length ? /* @__PURE__ */ jsx2("div", { className: "rf-game-shop-offers", role: "radiogroup", "aria-label": labels.buyTab, "data-count": shopOffers.length, "data-rows": shopOffers.length > 3 ? 2 : 1, children: shopOffers.map((value) => {
        const definition = item(value.itemId);
        const accessibleName = `${definition.name}, ${quantity(value.quantity, value.itemId)} for ${money(value.price)}`;
        return /* @__PURE__ */ jsxs2("label", { className: "rf-game-shop-offer", "data-offer-id": value.id, "data-item-id": value.itemId, "data-selected": value.id === offer?.id, title: accessibleName, children: [
          /* @__PURE__ */ jsx2("input", { type: "radio", name: `${id}-offer`, checked: value.id === offer?.id, onChange: () => setSelectedOfferId(value.id), "aria-label": accessibleName }),
          /* @__PURE__ */ jsx2("span", { className: "rf-game-offer-art rf-game-art-slot", "aria-hidden": "true", children: renderArt(definition) }),
          /* @__PURE__ */ jsx2("strong", { className: "rf-game-offer-name", children: definition.name }),
          /* @__PURE__ */ jsxs2("span", { className: "rf-game-offer-terms", children: [
            /* @__PURE__ */ jsxs2("span", { children: [
              "\xD7",
              quantity(value.quantity, value.itemId)
            ] }),
            /* @__PURE__ */ jsx2("span", { children: money(value.price) })
          ] }),
          /* @__PURE__ */ jsxs2("small", { className: "rf-game-offer-owned", children: [
            quantity(itemCounts[value.itemId] ?? 0n, value.itemId),
            " owned"
          ] })
        ] }, value.id);
      }) }) : /* @__PURE__ */ jsx2("p", { className: "rf-game-empty-copy", children: labels.emptyShop }) : inventoryEntry && inventoryItem ? /* @__PURE__ */ jsx2("ul", { className: "rf-game-inventory", "aria-label": "Your items", children: /* @__PURE__ */ jsxs2("li", { children: [
        /* @__PURE__ */ jsx2("div", { className: "rf-game-inventory-art rf-game-art-slot", children: renderArt(inventoryItem) }),
        /* @__PURE__ */ jsxs2("div", { className: "rf-game-inventory-copy", children: [
          /* @__PURE__ */ jsx2("span", { className: "rf-game-inventory-rarity", children: inventoryItem.rarity }),
          /* @__PURE__ */ jsx2("strong", { title: inventoryItem.name, children: inventoryItem.name }),
          /* @__PURE__ */ jsx2("span", { title: sellOffer ? `${quantity(sellOffer.quantity, sellOffer.itemId)} for ${money(sellOffer.price)}` : `${quantity(inventoryEntry.quantity, inventoryEntry.itemId)} owned`, children: sellOffer ? `${quantity(sellOffer.quantity, sellOffer.itemId)} for ${money(sellOffer.price)}` : `${quantity(inventoryEntry.quantity, inventoryEntry.itemId)} owned` })
        ] })
      ] }) }) : /* @__PURE__ */ jsxs2("div", { className: "rf-game-empty-inventory", children: [
        /* @__PURE__ */ jsx2("div", { className: "rf-game-art-slot", children: slots.emptyArt ?? /* @__PURE__ */ jsx2(InventoryIcon, {}) }),
        /* @__PURE__ */ jsx2("p", { children: labels.emptyInventory })
      ] }) }),
      tab === "sell" && /* @__PURE__ */ jsxs2("nav", { className: "rf-game-pagination", "aria-label": "Inventory pages", children: [
        /* @__PURE__ */ jsx2("button", { type: "button", disabled: inventory.length < 2, onClick: () => setInventoryPage((inventoryIndex + inventory.length - 1) % inventory.length), "aria-label": labels.previousInventory, children: "\u2190" }),
        /* @__PURE__ */ jsx2("span", { role: "status", "aria-live": "polite", children: inventory.length ? `${inventoryIndex + 1} / ${inventory.length}` : "0" }),
        /* @__PURE__ */ jsx2("button", { type: "button", disabled: inventory.length < 2, onClick: () => setInventoryPage((inventoryIndex + 1) % inventory.length), "aria-label": labels.nextInventory, children: "\u2192" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs2("div", { className: "rf-game-action-zone", children: [
      /* @__PURE__ */ jsxs2("div", { className: "rf-game-action-summary", "data-long-amount": summaryAmount !== void 0 && formatGameAmount(summaryAmount, currency2.decimals).length > 18 || void 0, children: [
        /* @__PURE__ */ jsx2("span", { title: summaryLabel, children: summaryLabel }),
        summaryAmount === void 0 ? /* @__PURE__ */ jsx2("strong", { className: "rf-game-text-summary", title: summaryText, "aria-label": summaryText, children: summaryText }) : /* @__PURE__ */ jsxs2("strong", { title: summaryText, "aria-label": summaryText, children: [
          /* @__PURE__ */ jsx2("span", { children: formatGameAmount(summaryAmount, currency2.decimals) }),
          /* @__PURE__ */ jsx2("span", { children: currency2.symbol })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: "rf-game-actions", "data-pair": stage === "review" || stage === "reward" && revealReady && Boolean(onSellReward || onShop) || stage === "shop" && Boolean(tab === "buy" ? offer : sellOffer) || void 0, children: [
        stage === "activity" && /* @__PURE__ */ jsx2(PanelAction, { label: missingItems ? labels.openShop : labels.action, primary: true, glyph: "\u2197", disabled: Boolean(choiceError), onClick: missingItems ? onShop : onAction }),
        stage === "review" && /* @__PURE__ */ jsxs2(Fragment, { children: [
          /* @__PURE__ */ jsx2(PanelAction, { label: labels.confirm, primary: true, glyph: "\u2192", onClick: onConfirm, disabled: purchaseDisabled || !purchase || balance < purchase.price }),
          /* @__PURE__ */ jsx2(PanelAction, { label: labels.cancel, onClick: onClose })
        ] }),
        stage === "pending" && /* @__PURE__ */ jsx2(PanelAction, { label: labels.pendingTitle, primary: true, glyph: "\xB7\xB7\xB7", disabled: true }),
        stage === "working" && /* @__PURE__ */ jsx2(PanelAction, { label: workingReady ? labels.resolve : labels.waiting, primary: true, glyph: workingReady ? "\u2191" : "\xB7\xB7\xB7", onClick: onResolve, disabled: !workingReady }),
        stage === "reward" && /* @__PURE__ */ jsxs2(Fragment, { children: [
          /* @__PURE__ */ jsx2(PanelAction, { label: revealReady ? labels.keep : labels.reveal, primary: true, glyph: revealReady ? "+" : "\u2192", onClick: revealReady ? onKeep : () => setSkipSignal((value) => value + 1) }),
          revealReady && (onSellReward || onShop) && /* @__PURE__ */ jsx2(PanelAction, { label: onSellReward ? labels.sell : labels.openShop, glyph: "\u2192", disabled: Boolean(onSellReward && reward && canSellReward && !canSellReward(reward)), onClick: onSellReward ?? onShop })
        ] }),
        stage === "shop" && /* @__PURE__ */ jsxs2(Fragment, { children: [
          tab === "buy" ? offer && /* @__PURE__ */ jsx2(PanelAction, { label: labels.buy, accessibleLabel: `${labels.buy}: ${quantity(offer.quantity, offer.itemId)} ${offerItem?.name ?? labels.item} for ${money(offer.price)}`, primary: true, glyph: "\u2197", disabled: purchaseDisabled || !offerItem || balance < offer.price, onClick: onBuy ? () => onBuy(offer.id) : void 0 }) : sellOffer && inventoryEntry && /* @__PURE__ */ jsx2(PanelAction, { label: labels.sell, accessibleLabel: `${labels.sell}: ${inventoryItem?.name ?? labels.item} for ${money(sellOffer.price)}`, primary: true, glyph: "\u2197", disabled: !canSell, onClick: onSell ? () => onSell(inventoryEntry.id, sellOffer.id) : void 0 }),
          /* @__PURE__ */ jsx2(PanelAction, { label: labels.returnToActivity, primary: !(tab === "buy" ? offer : sellOffer), glyph: "\u2192", onClick: onReturn ?? onClose })
        ] })
      ] }),
      /* @__PURE__ */ jsx2("div", { className: "rf-game-feedback", "data-error": Boolean(feedbackError) || void 0, role: feedbackError ? "alert" : "status", "aria-live": feedbackError ? "assertive" : "polite", children: /* @__PURE__ */ jsx2("span", { title: feedback, children: feedback }) })
    ] }),
    slots.footer != null && /* @__PURE__ */ jsx2("div", { className: "rf-game-panel-foot", children: slots.footer })
  ] });
}
function GameHud({ balance, currency: currency2 = DEFAULT_CURRENCY, inventoryCount = 0n, itemCount, itemCountLabel = "items", quest, onReset, onInventory, labels = {}, slots = {}, className = "", style }) {
  return /* @__PURE__ */ jsxs2("div", { className: `rf-game-hud ${className}`.trim(), style, children: [
    /* @__PURE__ */ jsxs2("div", { className: "rf-game-hud-top", children: [
      /* @__PURE__ */ jsxs2("div", { className: "rf-game-wallet", children: [
        /* @__PURE__ */ jsx2("span", { children: labels.balance ?? "Balance" }),
        /* @__PURE__ */ jsxs2("strong", { title: `${formatGameAmount(balance, currency2.decimals)} ${currency2.symbol}`, children: [
          formatGameAmount(balance, currency2.decimals),
          " ",
          /* @__PURE__ */ jsx2("span", { children: currency2.symbol })
        ] }),
        itemCount !== void 0 && /* @__PURE__ */ jsxs2("span", { className: "rf-game-wallet-items", children: [
          formatGameAmount(itemCount),
          " ",
          itemCountLabel
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: "rf-game-hud-controls", children: [
        /* @__PURE__ */ jsxs2("button", { type: "button", className: "rf-game-inventory-button", onClick: onInventory, disabled: !onInventory, "aria-label": labels.inventory ?? `Open inventory, ${formatGameAmount(inventoryCount)} items`, children: [
          slots.inventoryIcon ?? /* @__PURE__ */ jsx2(InventoryIcon, {}),
          /* @__PURE__ */ jsx2("span", { children: formatGameAmount(inventoryCount) })
        ] }),
        onReset && /* @__PURE__ */ jsx2("button", { type: "button", className: "rf-game-reset", onClick: onReset, "aria-label": labels.reset ?? "Reset experience", title: labels.reset ?? "Reset", children: "\u21BA" })
      ] })
    ] }),
    quest && /* @__PURE__ */ jsx2("div", { className: "rf-game-quest", children: /* @__PURE__ */ jsx2("p", { children: quest }) })
  ] });
}
function ActivityPrompt({ label, detail, active = false, pulse = false, onClick, keyLabel = "E", className = "", style, dataAttributes }) {
  return /* @__PURE__ */ jsxs2("button", { type: "button", className: `rf-game-hotspot ${className}`.trim(), "data-active": active, "data-pulse": pulse || void 0, onClick, disabled: !onClick, "aria-label": label, style, ...dataAttributes, children: [
    /* @__PURE__ */ jsx2(Keycap, { children: keyLabel }),
    /* @__PURE__ */ jsxs2("span", { className: "rf-game-hotspot-copy", children: [
      /* @__PURE__ */ jsx2("span", { children: label }),
      detail && /* @__PURE__ */ jsx2("small", { children: detail })
    ] })
  ] });
}

// src/game-frame.tsx
import { useEffect as useEffect2, useId as useId2, useRef as useRef2, useState as useState3 } from "react";
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var GAME_VIEWPORT = Object.freeze({ width: 960, height: 640 });
function GameMenu({ title, onClose, children, footer }) {
  const id = useId2();
  const node = useRef2(null);
  useEffect2(() => {
    const previous = document.activeElement;
    node.current?.focus();
    return () => {
      if (previous?.isConnected) previous.focus();
    };
  }, []);
  return /* @__PURE__ */ jsx3("div", { className: "rf-frame-scrim", children: /* @__PURE__ */ jsxs3(
    "div",
    {
      ref: node,
      className: "rf-frame-menu",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": id,
      tabIndex: -1,
      onKeyDown: (event) => {
        if (event.key === "Escape" && onClose) {
          event.preventDefault();
          onClose();
        }
        if (event.key !== "Tab") return;
        const buttons = [...event.currentTarget.querySelectorAll('button:not(:disabled), input:not(:disabled), a[href], [tabindex="0"]')].filter((element) => element.getClientRects().length > 0);
        const first = buttons[0], last = buttons.at(-1);
        if (!first) {
          event.preventDefault();
          return;
        }
        if (event.shiftKey && (document.activeElement === first || document.activeElement === node.current)) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && (document.activeElement === last || document.activeElement === node.current)) {
          event.preventDefault();
          first.focus();
        }
      },
      children: [
        /* @__PURE__ */ jsxs3("header", { className: "rf-frame-menu-heading", children: [
          /* @__PURE__ */ jsx3("h2", { id, children: title }),
          onClose && /* @__PURE__ */ jsx3("button", { type: "button", onClick: onClose, "aria-label": `Close ${title}`, children: "\xD7" })
        ] }),
        /* @__PURE__ */ jsx3("div", { className: "rf-frame-menu-body", children }),
        footer && /* @__PURE__ */ jsx3("footer", { className: "rf-frame-menu-footer", children: footer })
      ]
    }
  ) });
}
function GameFrame({ children, friends, selectedFriendId, onSelectFriend, friendsLoading, friendsError, friendsEmptyMessage = "No playable Friends found.", friendsHiddenCount = 0, onConnect, wallet, confirmation, connection, walletActions, selectionMode = "picker", mode, onMenuChange }) {
  const [menu, setMenu] = useState3(null);
  const friend = friends.find((value) => value.id === selectedFriendId);
  const selecting = selectionMode === "picker" && (!friend || menu === "friends");
  const menuOpen = selecting || menu === "wallet" || Boolean(confirmation);
  useEffect2(() => {
    onMenuChange?.(menuOpen);
  }, [menuOpen, onMenuChange]);
  return /* @__PURE__ */ jsxs3("section", { className: "rf-game-frame", "aria-label": "Game container", "data-mode": mode, children: [
    /* @__PURE__ */ jsxs3("div", { className: "rf-frame-chrome", inert: menuOpen || void 0, children: [
      /* @__PURE__ */ jsxs3("div", { className: "rf-frame-toolbar", children: [
        /* @__PURE__ */ jsx3("span", { className: "rf-frame-mode", children: mode === "preview" ? "Local preview" : "Live \xB7 Robinhood" }),
        selectionMode === "host" ? /* @__PURE__ */ jsx3("span", { className: "rf-frame-selected-friend", children: friend?.label ?? "Choose a Friend" }) : /* @__PURE__ */ jsx3("button", { type: "button", onClick: () => setMenu("friends"), "aria-label": "Choose Friend", children: friend?.label ?? "Choose Friend" }),
        /* @__PURE__ */ jsx3("button", { type: "button", onClick: () => setMenu("wallet"), disabled: !friend, "aria-label": "Open Friend wallet", children: "Friend wallet" })
      ] }),
      /* @__PURE__ */ jsx3("div", { className: "rf-frame-viewport", children })
    ] }),
    confirmation ? /* @__PURE__ */ jsxs3(
      GameMenu,
      {
        title: confirmation.title,
        onClose: confirmation.busy ? void 0 : confirmation.onCancel,
        footer: /* @__PURE__ */ jsxs3(Fragment2, { children: [
          /* @__PURE__ */ jsx3("button", { type: "button", disabled: confirmation.busy, onClick: confirmation.onCancel, children: "Cancel" }),
          /* @__PURE__ */ jsx3("button", { type: "button", className: "rf-frame-primary", disabled: confirmation.busy, onClick: confirmation.onConfirm, children: confirmation.busy ? "Waiting\u2026" : mode === "preview" ? "Confirm preview" : "Confirm" })
        ] }),
        children: [
          /* @__PURE__ */ jsx3("p", { children: confirmation.description }),
          confirmation.amount !== void 0 && /* @__PURE__ */ jsx3("p", { children: /* @__PURE__ */ jsxs3("strong", { children: [
            formatGameAmount(confirmation.amount, 18),
            " RF"
          ] }) }),
          confirmation.notice && /* @__PURE__ */ jsx3("p", { children: confirmation.notice }),
          /* @__PURE__ */ jsx3("p", { children: friend?.label }),
          /* @__PURE__ */ jsx3("p", { className: "rf-frame-note", children: mode === "preview" ? "Simulated RF. No transaction will be sent." : "This action uses the selected Friend\u2019s canonical wallet. A result is confirmed only after its receipt." }),
          confirmation.error && /* @__PURE__ */ jsx3("p", { role: "alert", children: confirmation.error })
        ]
      }
    ) : selecting ? /* @__PURE__ */ jsxs3(GameMenu, { title: "Choose your Friend", onClose: friend ? () => setMenu(null) : void 0, children: [
      /* @__PURE__ */ jsx3("p", { children: mode === "preview" ? !friends.some((value) => value.kind === "sample") ? "Choose your Friend for this local preview. Balances, items and outcomes are simulated." : "Choose a sample Friend. Each has separate simulated balances and items." : "Choose an owned, hardwired Generations NFT. Its inventory and RF stay with its wallet." }),
      connection,
      friendsLoading && /* @__PURE__ */ jsx3("p", { role: "status", children: "Loading your Friends\u2026" }),
      friendsError && /* @__PURE__ */ jsx3("p", { role: "alert", children: friendsError }),
      /* @__PURE__ */ jsx3("div", { className: "rf-frame-friends", children: friends.map((value) => /* @__PURE__ */ jsxs3("button", { type: "button", "aria-pressed": value.id === selectedFriendId, onClick: () => {
        onSelectFriend?.(value.id);
        setMenu(null);
      }, children: [
        /* @__PURE__ */ jsx3("strong", { children: value.label }),
        /* @__PURE__ */ jsx3("small", { children: value.kind === "sample" ? "Sample \xB7 no ownership claim" : "Hardwired Generations" })
      ] }, value.id.toString())) }),
      !friendsLoading && !friendsError && friendsHiddenCount > 0 && /* @__PURE__ */ jsxs3("p", { children: [
        friendsHiddenCount,
        " ",
        friendsHiddenCount === 1 ? "Friend" : "Friends",
        " hidden: not hardwired (generation 0). Playing requires generation 1 or higher."
      ] }),
      !friendsLoading && !friendsError && !friends.length && friendsEmptyMessage && /* @__PURE__ */ jsx3("p", { children: friendsEmptyMessage }),
      onConnect && /* @__PURE__ */ jsx3("button", { type: "button", className: "rf-frame-primary", onClick: onConnect, children: "Connect wallet" })
    ] }) : menu === "wallet" ? /* @__PURE__ */ jsxs3(GameMenu, { title: "Friend wallet", onClose: () => setMenu(null), children: [
      /* @__PURE__ */ jsx3("h3", { children: friend?.label }),
      /* @__PURE__ */ jsx3("p", { children: mode === "preview" ? "Preview balance. RF is simulated and no transactions are sent." : "Items and RF belong to this Friend\u2019s canonical wallet." }),
      friend?.walletAddress && /* @__PURE__ */ jsx3("p", { className: "rf-frame-address", children: friend.walletAddress }),
      wallet?.status === "loading" ? /* @__PURE__ */ jsx3("p", { role: "status", children: "Loading RF balance\u2026" }) : wallet?.balance !== void 0 ? /* @__PURE__ */ jsxs3("p", { className: "rf-frame-wallet-balance", children: [
        formatGameAmount(wallet.balance, 18),
        " RF"
      ] }) : /* @__PURE__ */ jsx3("p", { children: "RF balance unavailable." }),
      wallet?.error && /* @__PURE__ */ jsx3("p", { role: "alert", children: wallet.error }),
      walletActions,
      selectionMode === "picker" && /* @__PURE__ */ jsx3("button", { type: "button", onClick: () => setMenu("friends"), children: "Change Friend" })
    ] }) : null
  ] });
}

// examples/fishing/game.json
var game_default = {
  name: "Rare Friends: Fishing",
  consumable: "Bait",
  price: "1000000000000000000",
  outcomes: [
    { name: "Old Boot", chanceBps: 1500, reward: "0" },
    { name: "Sardine", chanceBps: 3e3, reward: "250000000000000000" },
    { name: "Sunfish", chanceBps: 2200, reward: "500000000000000000" },
    { name: "Bream", chanceBps: 1400, reward: "750000000000000000" },
    { name: "Rainbow Trout", chanceBps: 900, reward: "1500000000000000000" },
    { name: "Catfish", chanceBps: 500, reward: "2500000000000000000" },
    { name: "Sturgeon", chanceBps: 300, reward: "5000000000000000000" },
    { name: "Legend", chanceBps: 200, reward: "10000000000000000000" }
  ]
};

// examples/fishing/art.json
var art_default = [
  {
    id: "old-boot",
    rarity: "junk",
    rows: [
      "........................",
      "......########..........",
      "......#......#..........",
      "......#.#.##.#..........",
      "......#......#..........",
      "......#.##.#.#..........",
      "......#......#..........",
      "......#.#.##.#..........",
      "......#......#..........",
      "......#......#####......",
      "......#..........##.....",
      ".....##...........#.....",
      ".....##############.....",
      ".....##############.....",
      "........................",
      "........................"
    ]
  },
  {
    id: "sardine",
    rarity: "common",
    rows: [
      "........................",
      "........................",
      "........................",
      "........................",
      "...........##...........",
      "..........####..........",
      "..##....##########......",
      "..#####.########.###....",
      "..###################...",
      "..#####.############....",
      "..##....##########......",
      "..........####..........",
      "...........##...........",
      "........................",
      "........................",
      "........................"
    ]
  },
  {
    id: "sunfish",
    rarity: "common",
    rows: [
      "........................",
      "..........###...........",
      "........#######.........",
      ".......#########........",
      "......###########.......",
      "..##..########.###......",
      "..###.#############.....",
      "..##################....",
      "..##################....",
      "..###.#############.....",
      "..##..############......",
      "......###########.......",
      ".......#########........",
      "........#######.........",
      "..........###...........",
      "........................"
    ]
  },
  {
    id: "bream",
    rarity: "uncommon",
    rows: [
      "........................",
      "........................",
      ".........#.#.#..........",
      "........########........",
      ".......##########.......",
      ".##...############......",
      ".####.#########.###.....",
      ".########.##.#######....",
      ".########.##.########...",
      ".####.###.##.#######....",
      ".##...############......",
      ".......##########.......",
      ".........#####..........",
      "..........###...........",
      "........................",
      "........................"
    ]
  },
  {
    id: "rainbow-trout",
    rarity: "rare",
    rows: [
      "........................",
      "........................",
      "............###.........",
      "..........#####.........",
      "..#.....############....",
      "..##..####.##.#######...",
      "..######.##.##.###.###..",
      "..#####################.",
      "..###................##.",
      "..####################..",
      "..##..##.##.##.######...",
      "..#.....############....",
      "..........#####.........",
      "............###.........",
      "........................",
      "........................"
    ]
  },
  {
    id: "catfish",
    rarity: "epic",
    rows: [
      "........................",
      "........................",
      "...........###..........",
      "..........####..........",
      ".##....############.....",
      ".####.###############...",
      ".################.####..",
      ".######################.",
      ".#####################..",
      ".####.#############.#.#.",
      ".##....###########..#.#.",
      ".........######.....#.#.",
      "..........####.......#..",
      "...........##...........",
      "........................",
      "........................"
    ]
  },
  {
    id: "sturgeon",
    rarity: "legendary",
    rows: [
      "........................",
      "........................",
      ".........#...#..........",
      "........###.###.........",
      ".#....############......",
      ".##..###.###.#######....",
      ".######.###.###.#######.",
      ".#######################",
      ".######.###.###.###.###.",
      ".##..###.###.########...",
      ".#....############......",
      "........####..##........",
      ".........##....#........",
      "........................",
      "........................",
      "........................"
    ]
  },
  {
    id: "legend",
    rarity: "mythic",
    rows: [
      "..........#..#..........",
      ".........######.........",
      "...#....########........",
      "...##..###########......",
      "..#######..#########....",
      ".########....#####.###..",
      "..########..###########.",
      "...####################.",
      "..########..###########.",
      ".########....#########..",
      "..#######..#########....",
      "...##..###########......",
      "...#....########........",
      ".........######.........",
      "..........#..#..........",
      "........................"
    ]
  }
];

// examples/fishing/world.tsx
import { useEffect as useEffect3, useRef as useRef3, useState as useState4 } from "react";

// src/friend-worlds.json
var friend_worlds_default = {
  version: 1,
  collection: "Rare Friends / Isometric Worlds",
  source: {
    livingMap: "src/friend-world.ts",
    projection: "src/friend-worlds.json#style.projection",
    characterRule: "Use canonical on-chain Generations sprites through the SDK sprite reader. Preserve integer pixel edges and the white outline."
  },
  style: {
    projection: {
      a: 0.8660254038,
      b: 0.28
    },
    ground: {
      width: 576,
      height: 384,
      chunkSize: 48
    },
    viewport: {
      width: 1600,
      height: 1200,
      centerX: 800,
      centerY: 690,
      scale: 1.5
    },
    palette: {
      ink: "#000000",
      paper: "#FFFFFF",
      signal: "#CCFF00"
    },
    spriteSize: 80,
    background: "transparent",
    previewBackground: "#090B09",
    grid: {
      cell: 24,
      strokeWidth: 0.55,
      opacity: 0.18
    },
    edgeStrokeWidth: 1.5,
    loadingRules: {
      void: "Subtract this chunk from the top and floor texture. Show only a subtle dotted guide if needed.",
      wireframe: "Subtract the chunk; show an open green isometric outline with sparse node corners, no fill.",
      floating: "Subtract the chunk; draw a separate white/dither unfinished tile lifted by lift screen pixels with a slim green guide.",
      occlusion: "Mask all floor paths and texture to the actual loaded surface. Do not leave upright actors or props anchored over a missing chunk."
    },
    characterPixelScale: 5,
    characterSourceResolution: [
      16,
      16
    ]
  },
  worlds: [
    {
      family: "garden-oval",
      name: "Garden Commons",
      setting: "Botanical garden",
      shape: "Organic oval",
      summary: "A soft island with a pond, pixel trees and an open gathering route.",
      geometry: {
        polygons: [
          [
            [
              72,
              48
            ],
            [
              144,
              16
            ],
            [
              240,
              0
            ],
            [
              384,
              8
            ],
            [
              480,
              48
            ],
            [
              544,
              104
            ],
            [
              576,
              176
            ],
            [
              560,
              248
            ],
            [
              512,
              312
            ],
            [
              432,
              360
            ],
            [
              304,
              384
            ],
            [
              176,
              376
            ],
            [
              80,
              336
            ],
            [
              24,
              272
            ],
            [
              0,
              192
            ],
            [
              16,
              112
            ]
          ]
        ],
        holes: [],
        depth: 18
      },
      props: [
        {
          type: "tree",
          x: 144,
          y: 90,
          scale: 1.05
        },
        {
          type: "tree",
          x: 452,
          y: 110,
          scale: 1.12
        },
        {
          type: "flower",
          x: 95,
          y: 130,
          scale: 0.8
        },
        {
          type: "flower",
          x: 180,
          y: 100,
          scale: 0.9
        },
        {
          type: "flower",
          x: 351,
          y: 335,
          scale: 0.9
        },
        {
          type: "flower",
          x: 248,
          y: 337,
          scale: 0.8
        },
        {
          type: "bench",
          x: 340,
          y: 58,
          scale: 0.9
        },
        {
          type: "reeds",
          x: 126,
          y: 282,
          scale: 0.85
        }
      ],
      actors: [
        {
          sprite: 0,
          x: 120,
          y: 212
        },
        {
          sprite: 1,
          x: 240,
          y: 94
        },
        {
          sprite: 2,
          x: 344,
          y: 168
        },
        {
          sprite: 3,
          x: 453,
          y: 207
        },
        {
          sprite: 4,
          x: 260,
          y: 294
        },
        {
          sprite: 5,
          x: 380,
          y: 290
        }
      ],
      paths: [
        {
          points: [
            [
              64,
              184
            ],
            [
              184,
              184
            ],
            [
              184,
              144
            ],
            [
              320,
              144
            ],
            [
              320,
              232
            ],
            [
              464,
              232
            ]
          ],
          width: 22
        }
      ],
      patches: [
        {
          x: 89,
          y: 52,
          w: 112,
          h: 64,
          pattern: "dither"
        },
        {
          x: 410,
          y: 54,
          w: 104,
          h: 70,
          pattern: "dither"
        },
        {
          x: 70,
          y: 258,
          w: 128,
          h: 64,
          pattern: "water"
        },
        {
          x: 226,
          y: 310,
          w: 180,
          h: 42,
          pattern: "dither"
        }
      ],
      signals: [
        {
          x: 176,
          y: 164,
          kind: "currency"
        },
        {
          x: 292,
          y: 152,
          kind: "currency"
        },
        {
          x: 402,
          y: 235,
          kind: "currency"
        },
        {
          x: 162,
          y: 247,
          kind: "currency"
        }
      ],
      id: "01-garden-oval-complete",
      variant: "complete",
      missingChunks: []
    },
    {
      family: "garden-oval",
      name: "Garden Commons / Loading",
      setting: "Botanical garden",
      shape: "Organic oval",
      summary: "A soft island with a pond, pixel trees and an open gathering route. An unfinished outer section reveals missing, wireframe and suspended grid chunks.",
      geometry: {
        polygons: [
          [
            [
              72,
              48
            ],
            [
              144,
              16
            ],
            [
              240,
              0
            ],
            [
              384,
              8
            ],
            [
              480,
              48
            ],
            [
              544,
              104
            ],
            [
              576,
              176
            ],
            [
              560,
              248
            ],
            [
              512,
              312
            ],
            [
              432,
              360
            ],
            [
              304,
              384
            ],
            [
              176,
              376
            ],
            [
              80,
              336
            ],
            [
              24,
              272
            ],
            [
              0,
              192
            ],
            [
              16,
              112
            ]
          ]
        ],
        holes: [],
        depth: 18
      },
      props: [
        {
          type: "tree",
          x: 144,
          y: 90,
          scale: 1.05
        },
        {
          type: "tree",
          x: 452,
          y: 110,
          scale: 1.12
        },
        {
          type: "flower",
          x: 95,
          y: 130,
          scale: 0.8
        },
        {
          type: "flower",
          x: 180,
          y: 100,
          scale: 0.9
        },
        {
          type: "flower",
          x: 351,
          y: 335,
          scale: 0.9
        },
        {
          type: "flower",
          x: 248,
          y: 337,
          scale: 0.8
        },
        {
          type: "bench",
          x: 340,
          y: 58,
          scale: 0.9
        },
        {
          type: "reeds",
          x: 126,
          y: 282,
          scale: 0.85
        }
      ],
      actors: [
        {
          sprite: 0,
          x: 120,
          y: 212
        },
        {
          sprite: 1,
          x: 240,
          y: 94
        },
        {
          sprite: 2,
          x: 344,
          y: 168
        },
        {
          sprite: 3,
          x: 453,
          y: 207
        },
        {
          sprite: 4,
          x: 260,
          y: 294
        },
        {
          sprite: 5,
          x: 380,
          y: 290
        }
      ],
      paths: [
        {
          points: [
            [
              64,
              184
            ],
            [
              184,
              184
            ],
            [
              184,
              144
            ],
            [
              320,
              144
            ],
            [
              320,
              232
            ],
            [
              464,
              232
            ]
          ],
          width: 22
        }
      ],
      patches: [
        {
          x: 89,
          y: 52,
          w: 112,
          h: 64,
          pattern: "dither"
        },
        {
          x: 410,
          y: 54,
          w: 104,
          h: 70,
          pattern: "dither"
        },
        {
          x: 70,
          y: 258,
          w: 128,
          h: 64,
          pattern: "water"
        },
        {
          x: 226,
          y: 310,
          w: 180,
          h: 42,
          pattern: "dither"
        }
      ],
      signals: [
        {
          x: 176,
          y: 164,
          kind: "currency"
        },
        {
          x: 292,
          y: 152,
          kind: "currency"
        },
        {
          x: 402,
          y: 235,
          kind: "currency"
        },
        {
          x: 162,
          y: 247,
          kind: "currency"
        }
      ],
      id: "01-garden-oval-loading",
      variant: "loading",
      missingChunks: [
        {
          x: 432,
          y: 240,
          w: 48,
          h: 48,
          stage: "wireframe",
          lift: 0
        },
        {
          x: 480,
          y: 240,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 528,
          y: 240,
          w: 48,
          h: 48,
          stage: "floating",
          lift: 30
        },
        {
          x: 432,
          y: 288,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 480,
          y: 288,
          w: 48,
          h: 48,
          stage: "wireframe",
          lift: 0
        },
        {
          x: 384,
          y: 336,
          w: 48,
          h: 48,
          stage: "floating",
          lift: 22
        },
        {
          x: 432,
          y: 336,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        }
      ]
    },
    {
      family: "circuit-courtyard",
      name: "Circuit Courtyard",
      setting: "Industrial circuit workshop",
      shape: "Courtyard ring",
      summary: "A compact workshop wrapped around an open square, with terminals, tanks and circuit traces.",
      geometry: {
        polygons: [
          [
            [
              48,
              0
            ],
            [
              528,
              0
            ],
            [
              576,
              48
            ],
            [
              576,
              336
            ],
            [
              528,
              384
            ],
            [
              48,
              384
            ],
            [
              0,
              336
            ],
            [
              0,
              48
            ]
          ]
        ],
        holes: [
          [
            [
              192,
              120
            ],
            [
              384,
              120
            ],
            [
              384,
              264
            ],
            [
              192,
              264
            ]
          ]
        ],
        depth: 24
      },
      props: [
        {
          type: "tank",
          x: 95,
          y: 74,
          scale: 1.1
        },
        {
          type: "pipe",
          x: 158,
          y: 68,
          scale: 0.95
        },
        {
          type: "terminal",
          x: 426,
          y: 72,
          scale: 1.05
        },
        {
          type: "crate",
          x: 518,
          y: 133,
          scale: 0.95
        },
        {
          type: "tank",
          x: 88,
          y: 286,
          scale: 0.8
        },
        {
          type: "terminal",
          x: 448,
          y: 314,
          scale: 0.9
        },
        {
          type: "pipe",
          x: 285,
          y: 340,
          scale: 0.9
        },
        {
          type: "crate",
          x: 132,
          y: 344,
          scale: 0.8
        }
      ],
      actors: [
        {
          sprite: 0,
          x: 200,
          y: 60
        },
        {
          sprite: 2,
          x: 346,
          y: 75
        },
        {
          sprite: 4,
          x: 490,
          y: 210
        },
        {
          sprite: 6,
          x: 394,
          y: 324
        },
        {
          sprite: 1,
          x: 187,
          y: 318
        },
        {
          sprite: 3,
          x: 92,
          y: 183
        }
      ],
      paths: [
        {
          points: [
            [
              48,
              144
            ],
            [
              48,
              216
            ],
            [
              144,
              216
            ],
            [
              144,
              312
            ],
            [
              360,
              312
            ],
            [
              360,
              344
            ],
            [
              528,
              344
            ]
          ],
          width: 10
        },
        {
          points: [
            [
              168,
              48
            ],
            [
              264,
              48
            ],
            [
              264,
              96
            ],
            [
              480,
              96
            ],
            [
              480,
              160
            ]
          ],
          width: 10
        }
      ],
      patches: [
        {
          x: 54,
          y: 30,
          w: 110,
          h: 56,
          pattern: "dense"
        },
        {
          x: 400,
          y: 32,
          w: 140,
          h: 76,
          pattern: "grid"
        },
        {
          x: 40,
          y: 268,
          w: 110,
          h: 94,
          pattern: "dither"
        },
        {
          x: 412,
          y: 278,
          w: 132,
          h: 62,
          pattern: "grid"
        }
      ],
      signals: [
        {
          x: 280,
          y: 76,
          kind: "node"
        },
        {
          x: 539,
          y: 208,
          kind: "node"
        },
        {
          x: 322,
          y: 322,
          kind: "currency"
        },
        {
          x: 125,
          y: 195,
          kind: "currency"
        }
      ],
      id: "02-circuit-courtyard-complete",
      variant: "complete",
      missingChunks: []
    },
    {
      family: "circuit-courtyard",
      name: "Circuit Courtyard / Loading",
      setting: "Industrial circuit workshop",
      shape: "Courtyard ring",
      summary: "A compact workshop wrapped around an open square, with terminals, tanks and circuit traces. An unfinished outer section reveals missing, wireframe and suspended grid chunks.",
      geometry: {
        polygons: [
          [
            [
              48,
              0
            ],
            [
              528,
              0
            ],
            [
              576,
              48
            ],
            [
              576,
              336
            ],
            [
              528,
              384
            ],
            [
              48,
              384
            ],
            [
              0,
              336
            ],
            [
              0,
              48
            ]
          ]
        ],
        holes: [
          [
            [
              192,
              120
            ],
            [
              384,
              120
            ],
            [
              384,
              264
            ],
            [
              192,
              264
            ]
          ]
        ],
        depth: 24
      },
      props: [
        {
          type: "tank",
          x: 95,
          y: 74,
          scale: 1.1
        },
        {
          type: "pipe",
          x: 158,
          y: 68,
          scale: 0.95
        },
        {
          type: "terminal",
          x: 426,
          y: 72,
          scale: 1.05
        },
        {
          type: "tank",
          x: 88,
          y: 286,
          scale: 0.8
        },
        {
          type: "terminal",
          x: 448,
          y: 314,
          scale: 0.9
        },
        {
          type: "pipe",
          x: 285,
          y: 340,
          scale: 0.9
        },
        {
          type: "crate",
          x: 132,
          y: 344,
          scale: 0.8
        }
      ],
      actors: [
        {
          sprite: 0,
          x: 200,
          y: 60
        },
        {
          sprite: 2,
          x: 346,
          y: 75
        },
        {
          sprite: 4,
          x: 490,
          y: 210
        },
        {
          sprite: 6,
          x: 394,
          y: 324
        },
        {
          sprite: 1,
          x: 187,
          y: 318
        },
        {
          sprite: 3,
          x: 92,
          y: 183
        }
      ],
      paths: [
        {
          points: [
            [
              48,
              144
            ],
            [
              48,
              216
            ],
            [
              144,
              216
            ],
            [
              144,
              312
            ],
            [
              360,
              312
            ],
            [
              360,
              344
            ],
            [
              528,
              344
            ]
          ],
          width: 10
        },
        {
          points: [
            [
              168,
              48
            ],
            [
              264,
              48
            ],
            [
              264,
              96
            ],
            [
              480,
              96
            ],
            [
              480,
              160
            ]
          ],
          width: 10
        }
      ],
      patches: [
        {
          x: 54,
          y: 30,
          w: 110,
          h: 56,
          pattern: "dense"
        },
        {
          x: 400,
          y: 32,
          w: 140,
          h: 76,
          pattern: "grid"
        },
        {
          x: 40,
          y: 268,
          w: 110,
          h: 94,
          pattern: "dither"
        },
        {
          x: 412,
          y: 278,
          w: 132,
          h: 62,
          pattern: "grid"
        }
      ],
      signals: [
        {
          x: 280,
          y: 76,
          kind: "node"
        },
        {
          x: 539,
          y: 208,
          kind: "node"
        },
        {
          x: 322,
          y: 322,
          kind: "currency"
        },
        {
          x: 125,
          y: 195,
          kind: "currency"
        }
      ],
      id: "02-circuit-courtyard-loading",
      variant: "loading",
      missingChunks: [
        {
          x: 432,
          y: 0,
          w: 48,
          h: 48,
          stage: "wireframe",
          lift: 0
        },
        {
          x: 480,
          y: 0,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 528,
          y: 0,
          w: 48,
          h: 48,
          stage: "floating",
          lift: 28
        },
        {
          x: 432,
          y: 48,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 480,
          y: 48,
          w: 48,
          h: 48,
          stage: "wireframe",
          lift: 0
        },
        {
          x: 528,
          y: 48,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 480,
          y: 96,
          w: 48,
          h: 48,
          stage: "floating",
          lift: 24
        },
        {
          x: 528,
          y: 96,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        }
      ]
    },
    {
      family: "crystal-mesa",
      name: "Crystal Steps",
      setting: "Crystal cavern",
      shape: "Stepped mesa",
      summary: "A broad, cut stone plateau with dense crystal clusters and exposed strata.",
      geometry: {
        polygons: [
          [
            [
              64,
              0
            ],
            [
              432,
              0
            ],
            [
              432,
              48
            ],
            [
              512,
              48
            ],
            [
              512,
              112
            ],
            [
              560,
              112
            ],
            [
              560,
              288
            ],
            [
              496,
              288
            ],
            [
              496,
              336
            ],
            [
              336,
              336
            ],
            [
              336,
              384
            ],
            [
              96,
              384
            ],
            [
              96,
              336
            ],
            [
              48,
              336
            ],
            [
              48,
              272
            ],
            [
              0,
              272
            ],
            [
              0,
              112
            ],
            [
              64,
              112
            ]
          ]
        ],
        holes: [],
        depth: 30
      },
      props: [
        {
          type: "crystal",
          x: 118,
          y: 70,
          scale: 1.25
        },
        {
          type: "crystal",
          x: 161,
          y: 93,
          scale: 0.75
        },
        {
          type: "crystal",
          x: 445,
          y: 112,
          scale: 1.45
        },
        {
          type: "crystal",
          x: 479,
          y: 148,
          scale: 0.75
        },
        {
          type: "rock",
          x: 313,
          y: 60,
          scale: 0.95
        },
        {
          type: "rock",
          x: 79,
          y: 216,
          scale: 0.95
        },
        {
          type: "crystal",
          x: 184,
          y: 336,
          scale: 1.15
        },
        {
          type: "rock",
          x: 398,
          y: 294,
          scale: 1.05
        }
      ],
      actors: [
        {
          sprite: 0,
          x: 218,
          y: 107
        },
        {
          sprite: 1,
          x: 350,
          y: 146
        },
        {
          sprite: 3,
          x: 450,
          y: 243
        },
        {
          sprite: 4,
          x: 286,
          y: 262
        },
        {
          sprite: 6,
          x: 111,
          y: 165
        },
        {
          sprite: 7,
          x: 297,
          y: 343
        }
      ],
      paths: [
        {
          points: [
            [
              88,
              152
            ],
            [
              200,
              152
            ],
            [
              200,
              212
            ],
            [
              376,
              212
            ],
            [
              376,
              274
            ],
            [
              496,
              274
            ]
          ],
          width: 18
        }
      ],
      patches: [
        {
          x: 82,
          y: 36,
          w: 132,
          h: 102,
          pattern: "dense"
        },
        {
          x: 404,
          y: 74,
          w: 96,
          h: 95,
          pattern: "dither"
        },
        {
          x: 98,
          y: 302,
          w: 232,
          h: 70,
          pattern: "dense"
        },
        {
          x: 40,
          y: 180,
          w: 72,
          h: 84,
          pattern: "dither"
        }
      ],
      signals: [
        {
          x: 186,
          y: 172,
          kind: "currency"
        },
        {
          x: 317,
          y: 204,
          kind: "currency"
        },
        {
          x: 405,
          y: 250,
          kind: "currency"
        }
      ],
      id: "03-crystal-mesa-complete",
      variant: "complete",
      missingChunks: []
    },
    {
      family: "crystal-mesa",
      name: "Crystal Steps / Loading",
      setting: "Crystal cavern",
      shape: "Stepped mesa",
      summary: "A broad, cut stone plateau with dense crystal clusters and exposed strata. An unfinished outer section reveals missing, wireframe and suspended grid chunks.",
      geometry: {
        polygons: [
          [
            [
              64,
              0
            ],
            [
              432,
              0
            ],
            [
              432,
              48
            ],
            [
              512,
              48
            ],
            [
              512,
              112
            ],
            [
              560,
              112
            ],
            [
              560,
              288
            ],
            [
              496,
              288
            ],
            [
              496,
              336
            ],
            [
              336,
              336
            ],
            [
              336,
              384
            ],
            [
              96,
              384
            ],
            [
              96,
              336
            ],
            [
              48,
              336
            ],
            [
              48,
              272
            ],
            [
              0,
              272
            ],
            [
              0,
              112
            ],
            [
              64,
              112
            ]
          ]
        ],
        holes: [],
        depth: 30
      },
      props: [
        {
          type: "crystal",
          x: 118,
          y: 70,
          scale: 1.25
        },
        {
          type: "crystal",
          x: 161,
          y: 93,
          scale: 0.75
        },
        {
          type: "crystal",
          x: 445,
          y: 112,
          scale: 1.45
        },
        {
          type: "crystal",
          x: 479,
          y: 148,
          scale: 0.75
        },
        {
          type: "rock",
          x: 313,
          y: 60,
          scale: 0.95
        },
        {
          type: "crystal",
          x: 184,
          y: 336,
          scale: 1.15
        },
        {
          type: "rock",
          x: 398,
          y: 294,
          scale: 1.05
        }
      ],
      actors: [
        {
          sprite: 0,
          x: 218,
          y: 107
        },
        {
          sprite: 1,
          x: 350,
          y: 146
        },
        {
          sprite: 3,
          x: 450,
          y: 243
        },
        {
          sprite: 4,
          x: 286,
          y: 262
        },
        {
          sprite: 6,
          x: 111,
          y: 165
        },
        {
          sprite: 7,
          x: 297,
          y: 343
        }
      ],
      paths: [
        {
          points: [
            [
              88,
              152
            ],
            [
              200,
              152
            ],
            [
              200,
              212
            ],
            [
              376,
              212
            ],
            [
              376,
              274
            ],
            [
              496,
              274
            ]
          ],
          width: 18
        }
      ],
      patches: [
        {
          x: 82,
          y: 36,
          w: 132,
          h: 102,
          pattern: "dense"
        },
        {
          x: 404,
          y: 74,
          w: 96,
          h: 95,
          pattern: "dither"
        },
        {
          x: 98,
          y: 302,
          w: 232,
          h: 70,
          pattern: "dense"
        },
        {
          x: 40,
          y: 180,
          w: 72,
          h: 84,
          pattern: "dither"
        }
      ],
      signals: [
        {
          x: 186,
          y: 172,
          kind: "currency"
        },
        {
          x: 317,
          y: 204,
          kind: "currency"
        },
        {
          x: 405,
          y: 250,
          kind: "currency"
        }
      ],
      id: "03-crystal-mesa-loading",
      variant: "loading",
      missingChunks: [
        {
          x: 48,
          y: 192,
          w: 48,
          h: 48,
          stage: "wireframe",
          lift: 0
        },
        {
          x: 0,
          y: 192,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 48,
          y: 240,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 0,
          y: 240,
          w: 48,
          h: 48,
          stage: "floating",
          lift: 24
        },
        {
          x: 96,
          y: 240,
          w: 48,
          h: 48,
          stage: "wireframe",
          lift: 0
        },
        {
          x: 96,
          y: 288,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 48,
          y: 288,
          w: 48,
          h: 48,
          stage: "floating",
          lift: 32
        },
        {
          x: 96,
          y: 336,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        }
      ]
    },
    {
      family: "rooftop-terrace",
      name: "Rooftop Hangout",
      setting: "Urban rooftop",
      shape: "L terrace",
      summary: "A city roof with an open terrace, vents and planter boxes around an angular footprint.",
      geometry: {
        polygons: [
          [
            [
              0,
              0
            ],
            [
              576,
              0
            ],
            [
              576,
              144
            ],
            [
              240,
              144
            ],
            [
              240,
              384
            ],
            [
              0,
              384
            ]
          ]
        ],
        holes: [],
        depth: 22
      },
      props: [
        {
          type: "tank",
          x: 78,
          y: 52,
          scale: 1.1
        },
        {
          type: "vent",
          x: 316,
          y: 45,
          scale: 0.95
        },
        {
          type: "antenna",
          x: 510,
          y: 42,
          scale: 0.95
        },
        {
          type: "planter",
          x: 421,
          y: 100,
          scale: 0.95
        },
        {
          type: "planter",
          x: 42,
          y: 166,
          scale: 0.9
        },
        {
          type: "bench",
          x: 172,
          y: 222,
          scale: 0.95
        },
        {
          type: "vent",
          x: 55,
          y: 350,
          scale: 0.9
        },
        {
          type: "planter",
          x: 179,
          y: 350,
          scale: 0.95
        }
      ],
      actors: [
        {
          sprite: 0,
          x: 180,
          y: 71
        },
        {
          sprite: 2,
          x: 315,
          y: 120
        },
        {
          sprite: 4,
          x: 500,
          y: 108
        },
        {
          sprite: 5,
          x: 162,
          y: 151
        },
        {
          sprite: 6,
          x: 25,
          y: 252
        },
        {
          sprite: 7,
          x: 196,
          y: 305
        }
      ],
      paths: [
        {
          points: [
            [
              112,
              32
            ],
            [
              112,
              110
            ],
            [
              544,
              110
            ]
          ],
          width: 16
        },
        {
          points: [
            [
              112,
              110
            ],
            [
              112,
              352
            ]
          ],
          width: 16
        }
      ],
      patches: [
        {
          x: 26,
          y: 24,
          w: 98,
          h: 66,
          pattern: "dense"
        },
        {
          x: 274,
          y: 24,
          w: 86,
          h: 48,
          pattern: "grid"
        },
        {
          x: 162,
          y: 227,
          w: 62,
          h: 74,
          pattern: "dither"
        },
        {
          x: 22,
          y: 286,
          w: 66,
          h: 67,
          pattern: "grid"
        },
        {
          x: 160,
          y: 328,
          w: 66,
          h: 40,
          pattern: "dither"
        }
      ],
      signals: [
        {
          x: 271,
          y: 110,
          kind: "currency"
        },
        {
          x: 113,
          y: 220,
          kind: "currency"
        },
        {
          x: 112,
          y: 315,
          kind: "currency"
        }
      ],
      id: "04-rooftop-terrace-complete",
      variant: "complete",
      missingChunks: []
    },
    {
      family: "rooftop-terrace",
      name: "Rooftop Hangout / Loading",
      setting: "Urban rooftop",
      shape: "L terrace",
      summary: "A city roof with an open terrace, vents and planter boxes around an angular footprint. An unfinished outer section reveals missing, wireframe and suspended grid chunks.",
      geometry: {
        polygons: [
          [
            [
              0,
              0
            ],
            [
              576,
              0
            ],
            [
              576,
              144
            ],
            [
              240,
              144
            ],
            [
              240,
              384
            ],
            [
              0,
              384
            ]
          ]
        ],
        holes: [],
        depth: 22
      },
      props: [
        {
          type: "tank",
          x: 78,
          y: 52,
          scale: 1.1
        },
        {
          type: "vent",
          x: 316,
          y: 45,
          scale: 0.95
        },
        {
          type: "planter",
          x: 421,
          y: 100,
          scale: 0.95
        },
        {
          type: "planter",
          x: 42,
          y: 166,
          scale: 0.9
        },
        {
          type: "bench",
          x: 172,
          y: 222,
          scale: 0.95
        },
        {
          type: "vent",
          x: 55,
          y: 350,
          scale: 0.9
        },
        {
          type: "planter",
          x: 179,
          y: 350,
          scale: 0.95
        }
      ],
      actors: [
        {
          sprite: 0,
          x: 180,
          y: 71
        },
        {
          sprite: 2,
          x: 315,
          y: 120
        },
        {
          sprite: 5,
          x: 162,
          y: 151
        },
        {
          sprite: 6,
          x: 25,
          y: 252
        },
        {
          sprite: 7,
          x: 196,
          y: 305
        }
      ],
      paths: [
        {
          points: [
            [
              112,
              32
            ],
            [
              112,
              110
            ],
            [
              544,
              110
            ]
          ],
          width: 16
        },
        {
          points: [
            [
              112,
              110
            ],
            [
              112,
              352
            ]
          ],
          width: 16
        }
      ],
      patches: [
        {
          x: 26,
          y: 24,
          w: 98,
          h: 66,
          pattern: "dense"
        },
        {
          x: 274,
          y: 24,
          w: 86,
          h: 48,
          pattern: "grid"
        },
        {
          x: 162,
          y: 227,
          w: 62,
          h: 74,
          pattern: "dither"
        },
        {
          x: 22,
          y: 286,
          w: 66,
          h: 67,
          pattern: "grid"
        },
        {
          x: 160,
          y: 328,
          w: 66,
          h: 40,
          pattern: "dither"
        }
      ],
      signals: [
        {
          x: 271,
          y: 110,
          kind: "currency"
        },
        {
          x: 113,
          y: 220,
          kind: "currency"
        },
        {
          x: 112,
          y: 315,
          kind: "currency"
        }
      ],
      id: "04-rooftop-terrace-loading",
      variant: "loading",
      missingChunks: [
        {
          x: 384,
          y: 0,
          w: 48,
          h: 48,
          stage: "wireframe",
          lift: 0
        },
        {
          x: 432,
          y: 0,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 480,
          y: 0,
          w: 48,
          h: 48,
          stage: "floating",
          lift: 32
        },
        {
          x: 528,
          y: 0,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 432,
          y: 48,
          w: 48,
          h: 48,
          stage: "wireframe",
          lift: 0
        },
        {
          x: 480,
          y: 48,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 528,
          y: 48,
          w: 48,
          h: 48,
          stage: "wireframe",
          lift: 0
        },
        {
          x: 480,
          y: 96,
          w: 48,
          h: 48,
          stage: "floating",
          lift: 24
        },
        {
          x: 528,
          y: 96,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        }
      ]
    },
    {
      family: "tidal-islands",
      name: "Tidal Islands",
      setting: "Archipelago water world",
      shape: "Fractured islands",
      summary: "Three distinct shore platforms with reed beds, wave marks and buoy signals.",
      geometry: {
        polygons: [
          [
            [
              48,
              48
            ],
            [
              144,
              8
            ],
            [
              208,
              24
            ],
            [
              256,
              80
            ],
            [
              248,
              168
            ],
            [
              192,
              216
            ],
            [
              80,
              208
            ],
            [
              16,
              160
            ],
            [
              0,
              96
            ]
          ],
          [
            [
              344,
              32
            ],
            [
              496,
              24
            ],
            [
              552,
              64
            ],
            [
              576,
              136
            ],
            [
              552,
              208
            ],
            [
              456,
              232
            ],
            [
              352,
              200
            ],
            [
              304,
              128
            ]
          ],
          [
            [
              176,
              280
            ],
            [
              248,
              240
            ],
            [
              320,
              264
            ],
            [
              384,
              328
            ],
            [
              352,
              376
            ],
            [
              240,
              384
            ],
            [
              144,
              360
            ],
            [
              112,
              312
            ]
          ]
        ],
        holes: [],
        depth: 20
      },
      props: [
        {
          type: "reeds",
          x: 53,
          y: 116,
          scale: 1.2
        },
        {
          type: "reeds",
          x: 198,
          y: 173,
          scale: 0.95
        },
        {
          type: "buoy",
          x: 181,
          y: 48,
          scale: 0.9
        },
        {
          type: "rock",
          x: 120,
          y: 63,
          scale: 0.85
        },
        {
          type: "reeds",
          x: 501,
          y: 163,
          scale: 1.1
        },
        {
          type: "buoy",
          x: 387,
          y: 75,
          scale: 1
        },
        {
          type: "rock",
          x: 514,
          y: 91,
          scale: 0.8
        },
        {
          type: "reeds",
          x: 178,
          y: 326,
          scale: 0.9
        },
        {
          type: "buoy",
          x: 352,
          y: 342,
          scale: 0.9
        }
      ],
      actors: [
        {
          sprite: 0,
          x: 121,
          y: 145
        },
        {
          sprite: 2,
          x: 206,
          y: 104
        },
        {
          sprite: 4,
          x: 449,
          y: 90
        },
        {
          sprite: 1,
          x: 421,
          y: 176
        },
        {
          sprite: 5,
          x: 228,
          y: 318
        },
        {
          sprite: 7,
          x: 316,
          y: 353
        }
      ],
      paths: [
        {
          points: [
            [
              72,
              154
            ],
            [
              168,
              154
            ],
            [
              168,
              110
            ],
            [
              216,
              110
            ]
          ],
          width: 14
        },
        {
          points: [
            [
              363,
              116
            ],
            [
              458,
              116
            ],
            [
              458,
              179
            ],
            [
              521,
              179
            ]
          ],
          width: 14
        },
        {
          points: [
            [
              202,
              343
            ],
            [
              275,
              343
            ],
            [
              275,
              298
            ]
          ],
          width: 14
        }
      ],
      patches: [
        {
          x: 25,
          y: 82,
          w: 70,
          h: 56,
          pattern: "water"
        },
        {
          x: 133,
          y: 171,
          w: 87,
          h: 30,
          pattern: "dense"
        },
        {
          x: 358,
          y: 152,
          w: 162,
          h: 51,
          pattern: "water"
        },
        {
          x: 372,
          y: 43,
          w: 128,
          h: 38,
          pattern: "water"
        },
        {
          x: 154,
          y: 318,
          w: 172,
          h: 42,
          pattern: "water"
        }
      ],
      signals: [
        {
          x: 150,
          y: 176,
          kind: "currency"
        },
        {
          x: 485,
          y: 174,
          kind: "currency"
        },
        {
          x: 245,
          y: 369,
          kind: "currency"
        }
      ],
      id: "05-tidal-islands-complete",
      variant: "complete",
      missingChunks: []
    },
    {
      family: "tidal-islands",
      name: "Tidal Islands / Loading",
      setting: "Archipelago water world",
      shape: "Fractured islands",
      summary: "Three distinct shore platforms with reed beds, wave marks and buoy signals. An unfinished outer section reveals missing, wireframe and suspended grid chunks.",
      geometry: {
        polygons: [
          [
            [
              48,
              48
            ],
            [
              144,
              8
            ],
            [
              208,
              24
            ],
            [
              256,
              80
            ],
            [
              248,
              168
            ],
            [
              192,
              216
            ],
            [
              80,
              208
            ],
            [
              16,
              160
            ],
            [
              0,
              96
            ]
          ],
          [
            [
              344,
              32
            ],
            [
              496,
              24
            ],
            [
              552,
              64
            ],
            [
              576,
              136
            ],
            [
              552,
              208
            ],
            [
              456,
              232
            ],
            [
              352,
              200
            ],
            [
              304,
              128
            ]
          ],
          [
            [
              176,
              280
            ],
            [
              248,
              240
            ],
            [
              320,
              264
            ],
            [
              384,
              328
            ],
            [
              352,
              376
            ],
            [
              240,
              384
            ],
            [
              144,
              360
            ],
            [
              112,
              312
            ]
          ]
        ],
        holes: [],
        depth: 20
      },
      props: [
        {
          type: "reeds",
          x: 53,
          y: 116,
          scale: 1.2
        },
        {
          type: "reeds",
          x: 198,
          y: 173,
          scale: 0.95
        },
        {
          type: "buoy",
          x: 181,
          y: 48,
          scale: 0.9
        },
        {
          type: "rock",
          x: 120,
          y: 63,
          scale: 0.85
        },
        {
          type: "buoy",
          x: 387,
          y: 75,
          scale: 1
        },
        {
          type: "reeds",
          x: 178,
          y: 326,
          scale: 0.9
        },
        {
          type: "buoy",
          x: 352,
          y: 342,
          scale: 0.9
        }
      ],
      actors: [
        {
          sprite: 0,
          x: 121,
          y: 145
        },
        {
          sprite: 2,
          x: 206,
          y: 104
        },
        {
          sprite: 1,
          x: 421,
          y: 176
        },
        {
          sprite: 5,
          x: 228,
          y: 318
        },
        {
          sprite: 7,
          x: 316,
          y: 353
        }
      ],
      paths: [
        {
          points: [
            [
              72,
              154
            ],
            [
              168,
              154
            ],
            [
              168,
              110
            ],
            [
              216,
              110
            ]
          ],
          width: 14
        },
        {
          points: [
            [
              363,
              116
            ],
            [
              458,
              116
            ],
            [
              458,
              179
            ],
            [
              521,
              179
            ]
          ],
          width: 14
        },
        {
          points: [
            [
              202,
              343
            ],
            [
              275,
              343
            ],
            [
              275,
              298
            ]
          ],
          width: 14
        }
      ],
      patches: [
        {
          x: 25,
          y: 82,
          w: 70,
          h: 56,
          pattern: "water"
        },
        {
          x: 133,
          y: 171,
          w: 87,
          h: 30,
          pattern: "dense"
        },
        {
          x: 358,
          y: 152,
          w: 162,
          h: 51,
          pattern: "water"
        },
        {
          x: 372,
          y: 43,
          w: 128,
          h: 38,
          pattern: "water"
        },
        {
          x: 154,
          y: 318,
          w: 172,
          h: 42,
          pattern: "water"
        }
      ],
      signals: [
        {
          x: 150,
          y: 176,
          kind: "currency"
        },
        {
          x: 245,
          y: 369,
          kind: "currency"
        }
      ],
      id: "05-tidal-islands-loading",
      variant: "loading",
      missingChunks: [
        {
          x: 432,
          y: 48,
          w: 48,
          h: 48,
          stage: "wireframe",
          lift: 0
        },
        {
          x: 480,
          y: 48,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 528,
          y: 48,
          w: 48,
          h: 48,
          stage: "floating",
          lift: 30
        },
        {
          x: 480,
          y: 96,
          w: 48,
          h: 48,
          stage: "wireframe",
          lift: 0
        },
        {
          x: 528,
          y: 96,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 480,
          y: 144,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 528,
          y: 144,
          w: 48,
          h: 48,
          stage: "floating",
          lift: 26
        }
      ]
    },
    {
      family: "orbital-hex",
      name: "Orbital Array",
      setting: "Orbital outpost",
      shape: "Hex cluster",
      summary: "Three hexagonal decks with dish antennas, solar panels and spare landing geometry.",
      geometry: {
        polygons: [
          [
            [
              20,
              112
            ],
            [
              80,
              32
            ],
            [
              200,
              32
            ],
            [
              260,
              112
            ],
            [
              200,
              192
            ],
            [
              80,
              192
            ]
          ],
          [
            [
              312,
              112
            ],
            [
              372,
              32
            ],
            [
              492,
              32
            ],
            [
              552,
              112
            ],
            [
              492,
              192
            ],
            [
              372,
              192
            ]
          ],
          [
            [
              166,
              300
            ],
            [
              226,
              220
            ],
            [
              346,
              220
            ],
            [
              406,
              300
            ],
            [
              346,
              380
            ],
            [
              226,
              380
            ]
          ]
        ],
        holes: [],
        depth: 26
      },
      props: [
        {
          type: "dish",
          x: 107,
          y: 67,
          scale: 1.2
        },
        {
          type: "terminal",
          x: 203,
          y: 120,
          scale: 0.8
        },
        {
          type: "solar",
          x: 394,
          y: 72,
          scale: 1.05
        },
        {
          type: "solar",
          x: 453,
          y: 92,
          scale: 1
        },
        {
          type: "antenna",
          x: 491,
          y: 148,
          scale: 1
        },
        {
          type: "crate",
          x: 319,
          y: 237,
          scale: 0.65
        },
        {
          type: "dish",
          x: 234,
          y: 247,
          scale: 0.65
        },
        {
          type: "terminal",
          x: 347,
          y: 310,
          scale: 0.75
        }
      ],
      actors: [
        {
          sprite: 0,
          x: 88,
          y: 143
        },
        {
          sprite: 2,
          x: 224,
          y: 82
        },
        {
          sprite: 4,
          x: 393,
          y: 154
        },
        {
          sprite: 6,
          x: 487,
          y: 75
        },
        {
          sprite: 1,
          x: 215,
          y: 326
        },
        {
          sprite: 7,
          x: 306,
          y: 353
        }
      ],
      paths: [
        {
          points: [
            [
              72,
              128
            ],
            [
              146,
              128
            ],
            [
              146,
              157
            ],
            [
              203,
              157
            ]
          ],
          width: 10
        },
        {
          points: [
            [
              353,
              128
            ],
            [
              419,
              128
            ],
            [
              419,
              162
            ],
            [
              494,
              162
            ]
          ],
          width: 10
        },
        {
          points: [
            [
              215,
              323
            ],
            [
              281,
              323
            ],
            [
              281,
              351
            ],
            [
              348,
              351
            ]
          ],
          width: 10
        }
      ],
      patches: [
        {
          x: 59,
          y: 74,
          w: 105,
          h: 50,
          pattern: "grid"
        },
        {
          x: 360,
          y: 55,
          w: 137,
          h: 56,
          pattern: "dense"
        },
        {
          x: 220,
          y: 275,
          w: 120,
          h: 56,
          pattern: "grid"
        }
      ],
      signals: [
        {
          x: 120,
          y: 146,
          kind: "node"
        },
        {
          x: 455,
          y: 155,
          kind: "node"
        },
        {
          x: 279,
          y: 367,
          kind: "currency"
        }
      ],
      id: "06-orbital-hex-complete",
      variant: "complete",
      missingChunks: []
    },
    {
      family: "orbital-hex",
      name: "Orbital Array / Loading",
      setting: "Orbital outpost",
      shape: "Hex cluster",
      summary: "Three hexagonal decks with dish antennas, solar panels and spare landing geometry. An unfinished outer section reveals missing, wireframe and suspended grid chunks.",
      geometry: {
        polygons: [
          [
            [
              20,
              112
            ],
            [
              80,
              32
            ],
            [
              200,
              32
            ],
            [
              260,
              112
            ],
            [
              200,
              192
            ],
            [
              80,
              192
            ]
          ],
          [
            [
              312,
              112
            ],
            [
              372,
              32
            ],
            [
              492,
              32
            ],
            [
              552,
              112
            ],
            [
              492,
              192
            ],
            [
              372,
              192
            ]
          ],
          [
            [
              166,
              300
            ],
            [
              226,
              220
            ],
            [
              346,
              220
            ],
            [
              406,
              300
            ],
            [
              346,
              380
            ],
            [
              226,
              380
            ]
          ]
        ],
        holes: [],
        depth: 26
      },
      props: [
        {
          type: "dish",
          x: 107,
          y: 67,
          scale: 1.2
        },
        {
          type: "terminal",
          x: 203,
          y: 120,
          scale: 0.8
        },
        {
          type: "solar",
          x: 394,
          y: 72,
          scale: 1.05
        },
        {
          type: "antenna",
          x: 491,
          y: 148,
          scale: 1
        },
        {
          type: "crate",
          x: 319,
          y: 237,
          scale: 0.65
        },
        {
          type: "dish",
          x: 234,
          y: 247,
          scale: 0.65
        },
        {
          type: "terminal",
          x: 347,
          y: 310,
          scale: 0.75
        }
      ],
      actors: [
        {
          sprite: 0,
          x: 88,
          y: 143
        },
        {
          sprite: 2,
          x: 224,
          y: 82
        },
        {
          sprite: 4,
          x: 393,
          y: 154
        },
        {
          sprite: 1,
          x: 215,
          y: 326
        },
        {
          sprite: 7,
          x: 306,
          y: 353
        }
      ],
      paths: [
        {
          points: [
            [
              72,
              128
            ],
            [
              146,
              128
            ],
            [
              146,
              157
            ],
            [
              203,
              157
            ]
          ],
          width: 10
        },
        {
          points: [
            [
              353,
              128
            ],
            [
              419,
              128
            ],
            [
              419,
              162
            ],
            [
              494,
              162
            ]
          ],
          width: 10
        },
        {
          points: [
            [
              215,
              323
            ],
            [
              281,
              323
            ],
            [
              281,
              351
            ],
            [
              348,
              351
            ]
          ],
          width: 10
        }
      ],
      patches: [
        {
          x: 59,
          y: 74,
          w: 105,
          h: 50,
          pattern: "grid"
        },
        {
          x: 360,
          y: 55,
          w: 137,
          h: 56,
          pattern: "dense"
        },
        {
          x: 220,
          y: 275,
          w: 120,
          h: 56,
          pattern: "grid"
        }
      ],
      signals: [
        {
          x: 120,
          y: 146,
          kind: "node"
        },
        {
          x: 455,
          y: 155,
          kind: "node"
        },
        {
          x: 279,
          y: 367,
          kind: "currency"
        }
      ],
      id: "06-orbital-hex-loading",
      variant: "loading",
      missingChunks: [
        {
          x: 384,
          y: 0,
          w: 48,
          h: 48,
          stage: "wireframe",
          lift: 0
        },
        {
          x: 432,
          y: 0,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 480,
          y: 0,
          w: 48,
          h: 48,
          stage: "floating",
          lift: 34
        },
        {
          x: 432,
          y: 48,
          w: 48,
          h: 48,
          stage: "wireframe",
          lift: 0
        },
        {
          x: 480,
          y: 48,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 528,
          y: 48,
          w: 48,
          h: 48,
          stage: "void",
          lift: 0
        },
        {
          x: 480,
          y: 96,
          w: 48,
          h: 48,
          stage: "wireframe",
          lift: 0
        },
        {
          x: 528,
          y: 96,
          w: 48,
          h: 48,
          stage: "floating",
          lift: 25
        }
      ]
    }
  ]
};

// src/friend-world.ts
var CANVAS = Object.freeze({ width: 1600, height: 1200 });
var PALETTE = Object.freeze({ white: "#FFFFFF", black: "#000000", accent: "#CCFF00" });
var GAME_PALETTE = Object.freeze({
  meadow: "#B9D984",
  pond: "#7DB4DB",
  sun: "#F2CE68",
  coral: "#ED927E",
  lilac: "#B3A0D8"
});
var PROJECTION = Object.freeze({ a: 0.8660254038, b: 0.28, scale: 1.5, width: 576, height: 384, cx: 800, cy: 690 });
var PROP_CANVAS = Object.freeze({ width: 240, height: 240, anchorX: 120, anchorY: 180 });
var PROP_TYPES = Object.freeze([
  "tree",
  "flower",
  "bench",
  "planter",
  "terminal",
  "crate",
  "pipe",
  "tank",
  "crystal",
  "rock",
  "vent",
  "antenna",
  "solar",
  "dish",
  "buoy",
  "reeds",
  "bridge",
  "circuit"
]);
var trustedWorlds = /* @__PURE__ */ new WeakSet();
var boundaryCache = /* @__PURE__ */ new WeakMap();
var esc = (value) => String(value ?? "").replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;"
})[character]);
function finite(value, label, min = -1e6, max = 1e6) {
  if (typeof value !== "number" || !Number.isFinite(value)) throw new TypeError(`${label} must be a finite number.`);
  if (value < min || value > max) throw new RangeError(`${label} must be between ${min} and ${max}.`);
}
function record(value, label) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new TypeError(`${label} must be an object.`);
  return value;
}
function text(value, label, max = 500) {
  if (typeof value !== "string" || !value.trim() || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) {
    throw new TypeError(`${label} must be nonempty text of at most ${max} characters.`);
  }
  return value;
}
function array(value, label, max = 128) {
  if (value === void 0) return [];
  if (!Array.isArray(value) || value.length > max) throw new TypeError(`${label} must be an array with at most ${max} entries.`);
  return value;
}
function choice(value, choices, label) {
  if (typeof value !== "string" || !choices.includes(value)) throw new TypeError(`Unsupported ${label}: ${String(value)}.`);
  return value;
}
function point(value, label, bounded = true) {
  if (!Array.isArray(value) || value.length !== 2) throw new TypeError(`${label} must be [x, y].`);
  finite(value[0], `${label}.x`, bounded ? 0 : -1e6, bounded ? PROJECTION.width : 1e6);
  finite(value[1], `${label}.y`, bounded ? 0 : -1e6, bounded ? PROJECTION.height : 1e6);
  return [value[0], value[1]];
}
function anchor(value, label) {
  const item = record(value, label);
  const [x, y] = point([item.x, item.y], label);
  return { x, y };
}
function rectangle(value, label, relative = false) {
  const item = record(value, label);
  finite(item.x, `${label}.x`, relative ? -576 : 0, 576);
  finite(item.y, `${label}.y`, relative ? -384 : 0, 384);
  finite(item.w, `${label}.w`, 1e-3, 576);
  finite(item.h, `${label}.h`, 1e-3, 384);
  if (!relative && (item.x + item.w > 576 || item.y + item.h > 384)) throw new RangeError(`${label} extends beyond the world coordinate grid.`);
  return { x: item.x, y: item.y, w: item.w, h: item.h };
}
function deepFreeze(value) {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}
function polygonPoints(value, label) {
  const points = array(value, label).map((entry, index2) => point(entry, `${label}[${index2}]`));
  if (points.length < 3) throw new TypeError(`${label} needs at least three vertices.`);
  let twiceArea = 0;
  for (let index2 = 0; index2 < points.length; index2++) {
    const a = points[index2], b = points[(index2 + 1) % points.length];
    if (a[0] === b[0] && a[1] === b[1]) throw new TypeError(`${label} contains a zero-length edge.`);
    twiceArea += a[0] * b[1] - b[0] * a[1];
  }
  if (Math.abs(twiceArea) < 1e-3) throw new TypeError(`${label} must enclose an area.`);
  const cross = (a, b, c) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
  const onSegment = (a, b, p) => Math.abs(cross(a, b, p)) < 1e-8 && p[0] >= Math.min(a[0], b[0]) && p[0] <= Math.max(a[0], b[0]) && p[1] >= Math.min(a[1], b[1]) && p[1] <= Math.max(a[1], b[1]);
  for (let i = 0; i < points.length; i++) for (let j = i + 1; j < points.length; j++) {
    if (j === i + 1 || i === 0 && j === points.length - 1) continue;
    const a = points[i], b = points[(i + 1) % points.length], c = points[j], d = points[(j + 1) % points.length];
    if (cross(a, b, c) * cross(a, b, d) < 0 && cross(c, d, a) * cross(c, d, b) < 0 || onSegment(a, b, c) || onSegment(a, b, d) || onSegment(c, d, a) || onSegment(c, d, b)) {
      throw new TypeError(`${label} must be a simple polygon without crossing edges.`);
    }
  }
  return points;
}
function validateWorld(value) {
  if (value && typeof value === "object" && trustedWorlds.has(value)) return value;
  const source = record(value, "world"), geometry = record(source.geometry, "geometry");
  const polygons = array(geometry.polygons, "geometry.polygons", 16).map((entry, index2) => polygonPoints(entry, `polygons[${index2}]`));
  if (!polygons.length) throw new TypeError("World geometry needs a polygon.");
  const holes = array(geometry.holes, "geometry.holes", 16).map((entry, index2) => polygonPoints(entry, `holes[${index2}]`));
  if ([...polygons, ...holes].reduce((sum, loop) => sum + loop.length, 0) > 512) throw new RangeError("World geometry supports at most 512 vertices.");
  const depth = geometry.depth ?? 18;
  finite(depth, "geometry.depth", 1, 100);
  const props = array(source.props, "props").map((entry, index2) => {
    const item = record(entry, `props[${index2}]`);
    const type = choice(item.type, PROP_TYPES, "prop type");
    const scale = item.scale ?? 1;
    finite(scale, "prop.scale", 0.1, 4);
    return {
      ...anchor(item, `props[${index2}]`),
      type,
      scale,
      ...item.footprint === void 0 ? {} : { footprint: item.footprint === null ? null : rectangle(item.footprint, "prop.footprint", true) }
    };
  });
  const actors = array(source.actors, "actors").map((entry, index2) => {
    const item = record(entry, `actors[${index2}]`);
    if (item.sprite !== void 0) {
      finite(item.sprite, "actor.sprite", 0, 255);
      if (!Number.isInteger(item.sprite)) throw new TypeError("actor.sprite must be an integer index.");
    }
    return { ...anchor(item, `actors[${index2}]`), ...item.sprite === void 0 ? {} : { sprite: item.sprite } };
  });
  const signals = array(source.signals, "signals").map((entry, index2) => {
    const item = record(entry, `signals[${index2}]`);
    return { ...anchor(item, `signals[${index2}]`), kind: choice(item.kind, ["currency", "node"], "signal kind") };
  });
  const paths = array(source.paths, "paths", 64).map((entry, index2) => {
    const item = record(entry, `paths[${index2}]`);
    const points = array(item.points, "path.points").map((entry2, index3) => point(entry2, `path.points[${index3}]`));
    if (points.length < 2) throw new TypeError("A path needs at least two points.");
    const width = item.width ?? 20;
    finite(width, "path.width", 1, 96);
    return { points, width };
  });
  const patches = array(source.patches, "patches").map((entry, index2) => {
    const item = record(entry, `patches[${index2}]`);
    return { ...rectangle(item, `patches[${index2}]`), pattern: choice(item.pattern, ["dither", "dense", "grid", "hatch", "water"], "patch pattern") };
  });
  const missingChunks = array(source.missingChunks, "missingChunks", 64).map((entry, index2) => {
    const item = record(entry, `missingChunks[${index2}]`), rect = rectangle(item, `missingChunks[${index2}]`);
    if (rect.w !== 48 || rect.h !== 48 || rect.x % 48 !== 0 || rect.y % 48 !== 0) throw new RangeError("Missing chunks must use the 48 \xD7 48 world grid.");
    const stage = choice(item.stage, ["void", "wireframe", "floating"], "chunk stage"), lift = item.lift ?? (stage === "floating" ? 24 : 0);
    finite(lift, "chunk.lift", stage === "floating" ? 1 : 0, stage === "floating" ? 160 : 0);
    return { ...rect, stage, lift };
  });
  const collision = source.collision === void 0 ? void 0 : record(source.collision, "collision");
  const world2 = {
    id: text(source.id, "world.id", 100),
    name: text(source.name, "world.name", 120),
    family: text(source.family, "world.family", 100),
    setting: text(source.setting, "world.setting", 120),
    shape: text(source.shape, "world.shape", 120),
    summary: text(source.summary, "world.summary"),
    variant: choice(source.variant, ["complete", "loading"], "world variant"),
    geometry: { polygons, holes, depth },
    props,
    actors,
    signals,
    paths,
    patches,
    missingChunks,
    ...collision ? { collision: { blocked: array(collision.blocked, "collision.blocked").map((entry, index2) => rectangle(entry, `collision.blocked[${index2}]`)) } } : {}
  };
  if (world2.variant === "complete" && missingChunks.length) throw new TypeError("A complete world cannot contain missing chunks.");
  if (world2.variant === "loading" && !missingChunks.length) throw new TypeError("A loading world needs missing chunks.");
  for (const item of [...props, ...actors, ...signals]) {
    if (!containsLoaded(world2, [item.x, item.y])) throw new RangeError(`World anchor (${item.x}, ${item.y}) is outside loaded ground.`);
  }
  deepFreeze(world2);
  trustedWorlds.add(world2);
  return world2;
}
var n = (value) => Math.round(value * 1e3) / 1e3;
function project(x, y, lift = 0) {
  finite(x, "x");
  finite(y, "y");
  finite(lift, "lift");
  const { a, b, scale, width, height, cx, cy } = PROJECTION;
  return [n(cx + scale * a * (x - y - (width - height) / 2)), n(cy + scale * b * (x + y - (width + height) / 2) - lift)];
}
var pointList = (points) => points.map((p) => p.map(n).join(",")).join(" ");
var polygon = (points, attrs = "") => `<polygon points="${pointList(points)}" ${attrs}/>`;
var line = (points, attrs = "") => `<polyline points="${pointList(points)}" fill="none" ${attrs}/>`;
var planeMatrix = () => {
  const { a, b, scale, width, height, cx, cy } = PROJECTION;
  return `matrix(${scale * a} ${scale * b} ${-scale * a} ${scale * b} ${cx - scale * a * (width - height) / 2} ${cy - scale * b * (width + height) / 2})`;
};
var rectPoly = ({ x, y, w, h }) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
function inPolygon([x, y], points) {
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [xi, yi] = points[i], [xj, yj] = points[j];
    if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}
function containsLoaded(world2, point2) {
  return world2.geometry.polygons.some((p) => inPolygon(point2, p)) && !(world2.geometry.holes || []).some((p) => inPolygon(point2, p)) && !(world2.missingChunks || []).some((r) => inPolygon(point2, rectPoly(r)));
}
function materialBoundary(world2) {
  const loops = [...world2.geometry.polygons, ...world2.geometry.holes || [], ...(world2.missingChunks || []).map(rectPoly)];
  const edges = loops.flatMap((p) => p.map((a, i) => [a, p[(i + 1) % p.length]]));
  const cross = (a, b) => a[0] * b[1] - a[1] * b[0], sub = (a, b) => [a[0] - b[0], a[1] - b[1]];
  const result = [], seen = /* @__PURE__ */ new Set();
  for (const [a, b] of edges) {
    const v = sub(b, a), vv = v[0] * v[0] + v[1] * v[1], ts = [0, 1];
    if (vv < 1e-8) continue;
    for (const [c, d] of edges) {
      const w = sub(d, c), ca = sub(c, a), den = cross(v, w);
      if (Math.abs(den) > 1e-8) {
        const t = cross(ca, w) / den, u = cross(ca, v) / den;
        if (t > 1e-7 && t < 1 - 1e-7 && u >= -1e-7 && u <= 1 + 1e-7) ts.push(t);
      } else if (Math.abs(cross(ca, v)) < 1e-7) {
        for (const q of [c, d]) {
          const t = ((q[0] - a[0]) * v[0] + (q[1] - a[1]) * v[1]) / vv;
          if (t > 1e-7 && t < 1 - 1e-7) ts.push(t);
        }
      }
    }
    ts.sort((x, y) => x - y);
    for (let i = 1; i < ts.length; i++) {
      if (ts[i] - ts[i - 1] < 1e-7) continue;
      let p = [a[0] + v[0] * ts[i - 1], a[1] + v[1] * ts[i - 1]], q = [a[0] + v[0] * ts[i], a[1] + v[1] * ts[i]];
      const m = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2], e = 0.04 / Math.sqrt(vv), normal = [-v[1] * e, v[0] * e];
      const left = containsLoaded(world2, [m[0] + normal[0], m[1] + normal[1]]), right = containsLoaded(world2, [m[0] - normal[0], m[1] - normal[1]]);
      if (left === right) continue;
      if (!left) [p, q] = [q, p];
      const key = [p, q].map((k) => k.map(n).join(",")).sort().join("|");
      if (!seen.has(key)) {
        seen.add(key);
        result.push([p, q]);
      }
    }
  }
  return result;
}
function definitions2(id, color = false) {
  const patterns = `<pattern id="${id}-dither" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="${color ? GAME_PALETTE.sun : "#fff"}"/><rect width="1" height="1" fill="#000"/><rect x="2" y="2" width="1" height="1" fill="#000"/></pattern>
<pattern id="${id}-dense" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="${color ? GAME_PALETTE.meadow : "#fff"}"/><path d="M0 0h2v2H0zM2 2h2v2H2z" fill="#000"/></pattern>
<pattern id="${id}-grid" width="32" height="32" patternUnits="userSpaceOnUse"><path d="M14 16h4M16 14v4" stroke="#000" stroke-width=".8"/></pattern>
<pattern id="${id}-hatch" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="${color ? GAME_PALETTE.coral : "#fff"}"/><path d="M-1 1l2-2M0 7L7 0M6 8l2-2" stroke="#000"/></pattern>
<pattern id="${id}-water" width="44" height="30" patternUnits="userSpaceOnUse"><rect width="44" height="30" fill="${color ? GAME_PALETTE.pond : "#000"}"/><path d="M3 6h18m9 14h11M5 23h7" stroke="#fff" stroke-width="2"/></pattern>`;
  if (!color) return patterns;
  return patterns + Object.entries(GAME_PALETTE).map(
    ([name, fill]) => `<pattern id="${id}-dither-${name}" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="${fill}"/><rect width="1" height="1" fill="#000"/><rect x="2" y="2" width="1" height="1" fill="#000"/></pattern><pattern id="${id}-dense-${name}" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="${fill}"/><path d="M0 0h2v2H0zM2 2h2v2H2z" fill="#000"/></pattern>`
  ).join("");
}
function box(w, d, h, fill = "#fff", id = "") {
  const a = 0.8660254038, b = 0.28, pts = [[-w / 2, -d / 2], [w / 2, -d / 2], [w / 2, d / 2], [-w / 2, d / 2]].map(([x, y]) => [a * (x - y), b * (x + y)]);
  const top = pts.map(([x, y]) => [x, y - h]);
  return `<g stroke="#000" stroke-width="2" stroke-linejoin="miter">${polygon([top[1], top[2], pts[2], pts[1]], `fill="${id ? `url(#${id}-dither)` : "#fff"}"`)}${polygon([top[2], top[3], pts[3], pts[2]], 'fill="#000" stroke="#fff" stroke-width="1.5"')}${polygon(top, `fill="${fill}"`)}</g>`;
}
function tree(id) {
  return `<path d="M-5-15h10v20H-5z" fill="url(#${id}-dense)" stroke="#000" stroke-width="2"/><path d="M-28-19v-16h-8v-24h8v-16h16v-8h24v8h16v16h8v24h-8v16z" fill="#fff" stroke="#000" stroke-width="2"/><path d="M-27-23h16v-8h8v-8h8v-8h24v12h-8v12H5v8h-24z" fill="url(#${id}-dense)"/><path d="M-18-62h8v-8h10M9-65h10v10M-26-47h8" fill="none" stroke="#000" stroke-width="3"/>`;
}
function flower() {
  return `<path d="M-2 0h4v-18h-4zM-2-6h-6v-4h6M2-3h6v-4H2" fill="#000"/><path d="M-6-22h12v8H-6zM-2-26h4v16h-4z" fill="#fff" stroke="#000" stroke-width="2"/><rect x="-2" y="-20" width="4" height="4" fill="#000"/>`;
}
function canonicalPropArtwork(type, id) {
  const dither = `url(#${id}-dither)`;
  switch (type) {
    case "tree":
      return tree(id);
    case "flower":
      return flower();
    case "bench":
      return `<path d="M-34-9v15m53-12v14M-28-38v28m53-7v-28" stroke="#000" stroke-width="5"/>${box(58, 18, 17, "#fff", id)}<path d="M-28-38l53 17v-11l-53-17z" fill="#fff" stroke="#000" stroke-width="2"/><path d="M-23-40l43 14" stroke="#000"/>`;
    case "planter":
      return `${box(44, 30, 19, dither, id)}<g transform="translate(-10 -24) scale(.85)">${flower()}</g><path d="M8-23v-20m0 8l-10-9m10 4l10-13M-6-19v-26m0 9l-10-8m10 1l7-9" stroke="#000" stroke-width="3" fill="none"/><path d="M-16-42h8v7h-8M15-55h7v7h-7" fill="#fff" stroke="#000" stroke-width="2"/>`;
    case "terminal":
      return `${box(28, 26, 12, "#fff", id)}<path d="M-17-9v-56l33 10v55z" fill="#fff" stroke="#000" stroke-width="2"/><path d="M16 0l11-5v-56l-11 6" fill="${dither}" stroke="#000" stroke-width="2"/><path d="M-11-54l21 6v22l-21-6z" fill="#000"/><path d="M-6-44l5 2m-5 5l12 4" stroke="#CCFF00" stroke-width="2"/><path d="M-10-22l18 5m-18 5l12 4" stroke="#000" stroke-width="3"/>`;
    case "crate":
      return `${box(31, 31, 30, dither, id)}<path d="M0 8v-30M-26-10l26 8 26-8M-23-26l22 7 21-7" stroke="#000" stroke-width="3"/><path d="M-15-4l7 3v5l-7-3" fill="#fff"/>`;
    case "pipe":
      return `<path d="M-30 0v-24h13v-24h36v34h12" stroke="#000" stroke-width="16" fill="none" stroke-linejoin="miter"/><path d="M-30 0v-24h13v-24h36v34h12" stroke="#fff" stroke-width="10" fill="none" stroke-linejoin="miter"/><path d="M-36-6h12M-23-29h12M1-55v14M12-23h14" stroke="#000" stroke-width="3"/><rect x="27" y="-22" width="7" height="15" fill="#fff" stroke="#000" stroke-width="2"/>`;
    case "tank":
      return `<path d="M-20-6v8m40-8v8" stroke="#000" stroke-width="5"/><path d="M-26-17v-42l8-11h32l12 11v42l-12 9h-32z" fill="#fff" stroke="#000" stroke-width="2"/><path d="M7-68h8l11 10v41l-12 9H7z" fill="${dither}"/><path d="M-26-56l8 5h32l12-5m-52 29l8 5h32l12-5" fill="none" stroke="#000" stroke-width="3"/><path d="M-7-70v-11H7v11" fill="#fff" stroke="#000" stroke-width="2"/><rect x="-14" y="-43" width="12" height="9" fill="#000"/><rect x="-11" y="-40" width="6" height="3" fill="#CCFF00"/>`;
    case "crystal":
      return `<g stroke="#000" stroke-width="2" stroke-linejoin="miter"><path d="M-30-4l-9-26 6-21 17 13L-9-8z" fill="#fff"/><path d="M-33-49l8 22 16 19" fill="none"/><path d="M-14 2l-4-65L-2-94l19 22 3 61L3 8z" fill="#fff"/><path d="M-2-94l4 32 1 70 17-19-3-61z" fill="${dither}"/><path d="M-18-63L2-62l15-10" fill="none"/><path d="M17-4l6-35 17-15 7 24-17 31z" fill="#fff"/><path d="M40-54l-6 24-4 31" fill="none"/></g>`;
    case "rock":
      return `<path d="M-25-8l6-17 22-6 22 13 5 15L8 7l-26-5z" fill="${dither}" stroke="#000" stroke-width="2"/><path d="M-19-25l17 11 27-4M-2-14L8 7" stroke="#000" stroke-width="2" fill="none"/>`;
    case "vent":
      return `${box(47, 37, 29, "#fff", id)}<path d="M-18-35l29 9m-35-5l29 9m-35-5l29 9m-35-5l29 9" stroke="#000" stroke-width="3"/><path d="M24-7v-12m6 10v-12" stroke="#000" stroke-width="2"/>`;
    case "antenna":
      return `${box(30, 27, 10, dither, id)}<path d="M-12-8L0-96 14-7M-7-37h15M-10-18h22M-4-60h9M0-96v-17M-13-87h27M-8-99H8" stroke="#000" stroke-width="3" fill="none"/><path d="M-12-8L0-96 14-7" stroke="#fff" stroke-width="1" fill="none"/><rect x="-3" y="-117" width="6" height="6" fill="#CCFF00" stroke="#000" stroke-width="1.5"/>`;
    case "solar":
      return `<path d="M-19-17v23m40-11v14M-19-9L21 4" stroke="#000" stroke-width="4"/><path d="M-42-51L7-65 47-29-2-14z" fill="#000" stroke="#fff" stroke-width="2"/><path d="M-42-51L7-65 47-29-2-14zM-30-39l49-14M-16-27l49-14M-30-55L10-18M-18-58L22-22M-5-61l40 36" stroke="#fff" stroke-width="1.3" fill="none"/><path d="M-42-51L7-65 47-29-2-14z" fill="none" stroke="#000" stroke-width="2"/>`;
    case "dish":
      return `${box(40, 33, 12, "#fff", id)}<path d="M-9-7l8-40 12 6 7 39" fill="${dither}" stroke="#000" stroke-width="2"/><path d="M-39-77L25-44C7-16-24-20-39-77Z" fill="#fff" stroke="#000" stroke-width="2"/><path d="M-39-77L25-44l-5 8-55-29z" fill="${dither}" stroke="#000" stroke-width="2"/><path d="M-16-52L5-84M-30-67L5-84 14-49" fill="none" stroke="#fff" stroke-width="4"/><path d="M-16-52L5-84M-30-67L5-84 14-49" fill="none" stroke="#000" stroke-width="2"/><rect x="2" y="-88" width="7" height="6" fill="#CCFF00" stroke="#000" stroke-width="2"/>`;
    case "buoy":
      return `<path d="M-21-1l12-8H9l12 8L8 6H-8z" fill="#fff" stroke="#000" stroke-width="2"/><path d="M-10-3l5-30H5l5 30z" fill="#fff" stroke="#000" stroke-width="2"/><path d="M-7-15H7" stroke="#000" stroke-width="7"/><path d="M0-33v-19h14v10H0" fill="#CCFF00" stroke="#000" stroke-width="2"/>`;
    case "reeds":
      return `<path d="M-13 1v-39M-1 2v-51M11 0v-32M-13-7l-11-11M-1-12L8-25M11-7l12-12" stroke="#fff" stroke-width="4.5" fill="none"/><path d="M-13 1v-39M-1 2v-51M11 0v-32M-13-7l-11-11M-1-12L8-25M11-7l12-12" stroke="#000" stroke-width="2.5" fill="none"/><path d="M-16-44h6v13h-6zM-4-56h6v14h-6zM8-38h6v12H8z" fill="#fff" stroke="#000" stroke-width="2"/>`;
    case "bridge":
      return `${box(86, 26, 10, "#fff", id)}<path d="M-42-18l76 24M-29-30l76 24" stroke="#000" stroke-width="3"/><path d="M-42-18v-15m25 23v-15m25 23v-15m26 23v-15" stroke="#000" stroke-width="3"/>`;
    case "circuit":
      return `<path d="M-40-12h25v-20h32v21h24M-28 4h24v-20h20" stroke="#000" stroke-width="3" fill="none"/><rect x="-4" y="-39" width="17" height="13" fill="#000"/><rect x="0" y="-35" width="9" height="5" fill="#CCFF00"/>`;
    default:
      throw new Error(`Unsupported prop type: ${type}`);
  }
}
var PROP_COLORS = Object.freeze({
  tree: "meadow",
  flower: "coral",
  bench: "sun",
  planter: "coral",
  terminal: "lilac",
  crate: "sun",
  pipe: "pond",
  tank: "pond",
  crystal: "lilac",
  rock: "lilac",
  vent: "coral",
  antenna: "lilac",
  solar: "pond",
  dish: "lilac",
  buoy: "coral",
  reeds: "sun",
  bridge: "sun",
  circuit: "lilac"
});
function paintedPropArtwork(type, id, color) {
  const artwork = canonicalPropArtwork(type, id);
  if (!color) return artwork;
  const name = PROP_COLORS[type], fill = GAME_PALETTE[name];
  let painted = artwork.split('fill="#fff"').join(`fill="${fill}"`).split(`#${id}-dither)`).join(`#${id}-dither-${name})`).split(`#${id}-dense)`).join(`#${id}-dense-${name})`).split("#CCFF00").join(GAME_PALETTE.sun);
  if (type === "solar") painted = painted.replace('fill="#000"', `fill="${fill}"`);
  return painted;
}
function signalArtwork(signal, color = false) {
  const [x, y] = project(signal.x, signal.y);
  const accent = color ? GAME_PALETTE.sun : "#CCFF00";
  if (signal.kind === "node") return `<g transform="translate(${x} ${y})"><path d="M-6 0l6-3 6 3-6 3z" fill="${accent}" stroke="#000" stroke-width="1.5"/><path d="M0-3v-10" stroke="#000" stroke-width="2"/><rect x="-3" y="-16" width="6" height="6" fill="${accent}" stroke="#000" stroke-width="1.5"/></g>`;
  return `<g transform="translate(${n(x - 12)} ${n(y - 2)})"><path d="M250 500L250 625L375 625L375 750L500 750L500 625L625 625L625 500ZM250 -125L250 0L125 0L125 125L500 125L500 250L250 250L250 375L125 375L125 500L250 500L250 375L500 375L500 250L625 250L625 125L500 125L500 0L375 0L375 -125Z" transform="scale(.032 -.032)" fill="${accent}" stroke="#000" stroke-width="62.5" paint-order="stroke"/></g>`;
}
function chunkArtwork(chunk, index2, id, color = false) {
  const base = rectPoly(chunk).map(([x, y]) => project(x, y));
  const accent = color ? GAME_PALETTE.lilac : "#CCFF00";
  if (chunk.stage === "void") {
    return `<g data-chunk="${index2}" data-stage="void" stroke="${accent}" stroke-width="1.5">${base.map(([x, y]) => `<path d="M${n(x - 3)} ${y}h6M${x} ${n(y - 3)}v6"/>`).join("")}</g>`;
  }
  const lift = chunk.stage === "floating" ? chunk.lift || 24 : 0;
  const top = base.map(([x, y]) => [x, y - lift]);
  let s = `<g data-chunk="${index2}" data-stage="${esc(chunk.stage)}">`;
  if (lift) {
    s += line([...base, base[0]], `stroke="${accent}" stroke-width="1.1" stroke-dasharray="4 7"`);
    for (let i = 0; i < 4; i++) s += line([base[i], top[i]], `stroke="${accent}" stroke-width="1" stroke-dasharray="3 5"`);
    s += polygon([top[1], top[2], [top[2][0], top[2][1] + 6], [top[1][0], top[1][1] + 6]], 'fill="#000" stroke="#fff" stroke-width="1"');
    s += polygon([top[2], top[3], [top[3][0], top[3][1] + 6], [top[2][0], top[2][1] + 6]], 'fill="#000" stroke="#fff" stroke-width="1"');
    s += polygon(top, `fill="url(#${id}-dither)" stroke="#fff" stroke-width="1.2"`);
    s += top.map(([x, y]) => `<path d="M${n(x - 3)} ${n(y - 1)}h6" stroke="${accent}" stroke-width="2"/>`).join("");
  } else {
    s += line([...top, top[0]], `stroke="${accent}" stroke-width="1.5"`);
    s += line([top[0], top[2]], `stroke="${accent}" stroke-width=".9" stroke-dasharray="2 5"`);
    s += line([top[1], top[3]], `stroke="${accent}" stroke-width=".9" stroke-dasharray="2 5"`);
  }
  return s + "</g>";
}
function unproject(screenX, screenY, lift = 0) {
  finite(screenX, "screenX");
  finite(screenY, "screenY");
  finite(lift, "lift");
  const difference = (screenX - PROJECTION.cx) / (PROJECTION.scale * PROJECTION.a) + (PROJECTION.width - PROJECTION.height) / 2;
  const sum = (screenY + lift - PROJECTION.cy) / (PROJECTION.scale * PROJECTION.b) + (PROJECTION.width + PROJECTION.height) / 2;
  return [(sum + difference) / 2, (sum - difference) / 2];
}
var PROP_FOOTPRINTS = deepFreeze({
  tree: { w: 12, h: 12 },
  flower: null,
  bench: { w: 58, h: 18 },
  planter: { w: 44, h: 30 },
  terminal: { w: 28, h: 26 },
  crate: { w: 31, h: 31 },
  pipe: { w: 60, h: 26 },
  tank: { w: 52, h: 40 },
  crystal: { w: 60, h: 26 },
  rock: { w: 50, h: 32 },
  vent: { w: 47, h: 37 },
  antenna: { w: 30, h: 27 },
  solar: { w: 76, h: 36 },
  dish: { w: 40, h: 33 },
  buoy: { w: 30, h: 20 },
  reeds: null,
  bridge: null,
  circuit: null
});
function boundaryOf(world2) {
  let boundary = boundaryCache.get(world2);
  if (!boundary) {
    boundary = materialBoundary(world2);
    boundaryCache.set(world2, boundary);
  }
  return boundary;
}
function distanceToSegment([x, y], a, b) {
  const dx = b[0] - a[0], dy = b[1] - a[1];
  const t = Math.max(0, Math.min(1, ((x - a[0]) * dx + (y - a[1]) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(x - a[0] - t * dx, y - a[1] - t * dy);
}
function circleIntersectsRect([x, y], radius, rect) {
  const nearX = Math.max(rect.x, Math.min(rect.x + rect.w, x));
  const nearY = Math.max(rect.y, Math.min(rect.y + rect.h, y));
  return Math.hypot(x - nearX, y - nearY) <= radius;
}
function isWorldWalkable(world2, location, radius = 0) {
  const config = validateWorld(world2), position = point(location, "location", false);
  finite(radius, "radius", 0, 48);
  if (!containsLoaded(config, position)) return false;
  if (radius && boundaryOf(config).some(([a, b]) => distanceToSegment(position, a, b) < radius)) return false;
  const blocked = [...config.collision?.blocked ?? [], ...config.patches.filter((patch) => patch.pattern === "water")];
  for (const prop of config.props) {
    const size5 = PROP_FOOTPRINTS[prop.type];
    const scale = prop.scale ?? 1;
    const relative = prop.footprint === void 0 ? size5 && {
      x: -size5.w * 1.4 / PROJECTION.scale / 2,
      y: -size5.h * 1.4 / PROJECTION.scale / 2,
      w: size5.w * 1.4 / PROJECTION.scale,
      h: size5.h * 1.4 / PROJECTION.scale
    } : prop.footprint;
    if (relative) blocked.push({ x: prop.x + relative.x * scale, y: prop.y + relative.y * scale, w: relative.w * scale, h: relative.h * scale });
  }
  return !blocked.some((rect) => circleIntersectsRect(position, radius, rect));
}
function sortWorldItems(items) {
  for (const item of items) {
    finite(item.x, "item.x");
    finite(item.y, "item.y");
  }
  return [...items].sort((a, b) => a.x + a.y - (b.x + b.y));
}
function renderOptions(options) {
  record(options, "render options");
  if (options.signals !== void 0 && typeof options.signals !== "boolean") throw new TypeError("signals must be a boolean.");
  const color = colorOption(options);
  const background = options.background ?? "transparent";
  choice(background, ["transparent", "black"], "background");
  return { signals: options.signals !== false, background, color };
}
function colorOption(options) {
  record(options, "render options");
  if (options.color !== void 0 && typeof options.color !== "boolean") throw new TypeError("color must be a boolean.");
  return options.color === true;
}
var projectPoint = ([x, y]) => project(x, y);
function terrainParts(world2, color = false) {
  const id = `rf-${world2.id.replace(/[^a-zA-Z0-9_-]/g, "-")}`;
  const boundary = boundaryOf(world2), depth = world2.geometry.depth;
  const screenPolys = world2.geometry.polygons.map((p) => p.map(projectPoint));
  const holes = [...world2.geometry.holes, ...world2.missingChunks.map(rectPoly)].map((p) => p.map(projectPoint));
  const mask = `<mask id="${id}-surface" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="1200"><rect width="1600" height="1200" fill="#000"/>${screenPolys.map((p) => polygon(p, 'fill="#fff"')).join("")}${holes.map((p) => polygon(p, 'fill="#000"')).join("")}</mask>`;
  let body = `<g id="${id}-terrain" class="world-terrain">`;
  const visible = boundary.map(([a, b]) => [projectPoint(a), projectPoint(b)]).filter(([a, b]) => b[0] < a[0] - 1e-3).sort((a, b) => a[0][1] + a[1][1] - (b[0][1] + b[1][1]));
  for (const [a, b] of visible) {
    body += polygon([a, b, [b[0], b[1] + depth], [a[0], a[1] + depth]], `fill="${color ? GAME_PALETTE.coral : "#000"}" stroke="${color ? "#000" : "#fff"}" stroke-width="1.5" stroke-linejoin="miter"`);
    const length = Math.hypot(b[0] - a[0], b[1] - a[1]);
    for (let j = 24; j < length - 10; j += 55) {
      const t = j / length, x = a[0] + (b[0] - a[0]) * t, y = a[1] + (b[1] - a[1]) * t;
      body += `<path d="M${n(x)} ${n(y + depth - 5)}v4" stroke="#fff" stroke-width="1"/>`;
    }
  }
  body += `<g mask="url(#${id}-surface)"><rect width="1600" height="1200" fill="${color ? GAME_PALETTE.meadow : "#fff"}"/><g transform="${planeMatrix()}"><rect x="-100" y="-100" width="800" height="650" fill="url(#${id}-grid)"/>`;
  for (const patch of world2.patches) body += `<rect x="${patch.x}" y="${patch.y}" width="${patch.w}" height="${patch.h}" fill="url(#${id}-${patch.pattern})" stroke="#000" stroke-width="1"/>`;
  for (const path of world2.paths) {
    body += line(path.points, `stroke="#000" stroke-width="${path.width + 2}" stroke-linejoin="miter"`);
    body += line(path.points, `stroke="url(#${id}-dither)" stroke-width="${path.width}" stroke-linejoin="miter"`);
  }
  body += "</g></g>";
  for (const edge of boundary) body += line(edge.map(projectPoint), 'stroke="#000" stroke-width="2"');
  body += `</g><g class="world-loading">${world2.missingChunks.map((chunk, index2) => chunkArtwork(chunk, index2, id, color)).join("")}</g>`;
  return { id, defs: definitions2(id, color) + mask, body };
}
function svgDocument(world2, id, defs, body, background = "transparent") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200" role="img" aria-labelledby="${id}-title ${id}-desc" data-world-id="${esc(world2.id)}" data-variant="${world2.variant}"><title id="${id}-title">${esc(world2.name)}</title><desc id="${id}-desc">${esc(world2.summary)}. Rare Friends shallow isometric world. Character pixels, when present, are supplied by the caller.</desc><defs>${defs}</defs>${background === "black" ? '<rect width="1600" height="1200" fill="#000"/>' : ""}${body}</svg>
`;
}
function objectParts(world2, id, signals, color = false) {
  return sortWorldItems([
    ...world2.props.map((prop) => {
      const [x, y] = project(prop.x, prop.y);
      return {
        kind: "prop",
        x: prop.x,
        y: prop.y,
        depth: prop.x + prop.y,
        body: `<g class="world-prop" data-prop="${prop.type}" transform="translate(${x} ${y}) scale(${n((prop.scale ?? 1) * 1.4)})">${paintedPropArtwork(prop.type, id, color)}</g>`
      };
    }),
    ...signals ? world2.signals.map((signal) => ({
      kind: "signal",
      x: signal.x,
      y: signal.y,
      depth: signal.x + signal.y,
      body: signalArtwork(signal, color)
    })) : []
  ]);
}
function renderWorldLayers(world2, options = {}) {
  const config = validateWorld(world2), settings = renderOptions(options);
  const terrain = terrainParts(config, settings.color);
  return Object.freeze({
    width: CANVAS.width,
    height: CANVAS.height,
    terrainSvg: svgDocument(config, terrain.id, terrain.defs, terrain.body, settings.background),
    objects: Object.freeze(objectParts(config, terrain.id, settings.signals, settings.color).map(({ body, ...item }) => Object.freeze({
      ...item,
      svg: svgDocument(config, terrain.id, definitions2(terrain.id, settings.color), body)
    })))
  });
}
var WORLD_PRESETS = Object.freeze(friend_worlds_default.worlds.map(validateWorld));
function getWorldPreset(id) {
  const world2 = WORLD_PRESETS.find((candidate) => candidate.id === id);
  if (!world2) throw new RangeError(`Unknown world preset: ${id}.`);
  return world2;
}

// src/assets.ts
function loadImage(source, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }
    const image = new Image();
    const clear = () => {
      image.onload = null;
      image.onerror = null;
      signal?.removeEventListener("abort", abort);
    };
    const abort = () => {
      clear();
      image.src = "";
      reject(signal?.reason);
    };
    image.onload = () => {
      clear();
      resolve(image);
    };
    image.onerror = () => {
      clear();
      reject(new Error("The image could not load."));
    };
    signal?.addEventListener("abort", abort, { once: true });
    image.src = source;
  });
}
function loadSvg(svg, signal) {
  return loadImage(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`, signal);
}
async function loadWorldAssets(world2, options = {}, signal) {
  const layers = renderWorldLayers(world2, options);
  const [terrain, objects] = await Promise.all([
    loadSvg(layers.terrainSvg, signal),
    Promise.all(layers.objects.map(async ({ svg, ...object }) => ({ ...object, image: await loadSvg(svg, signal) })))
  ]);
  return { width: layers.width, height: layers.height, terrain, objects };
}

// src/friend-navigation.ts
function createWorldNavigator(world2, radius = 7, spacing = 8) {
  if (!Number.isFinite(radius) || radius < 0 || !Number.isFinite(spacing) || spacing < 2 || spacing > 32) {
    throw new RangeError("Navigation needs a nonnegative radius and a grid spacing from 2 to 32.");
  }
  const columns = Math.floor(576 / spacing) + 1;
  const rows = Math.floor(384 / spacing) + 1;
  const count = columns * rows;
  const valid = new Uint8Array(count);
  const location = (index2) => [index2 % columns * spacing, Math.floor(index2 / columns) * spacing];
  const finite2 = (point2) => point2.every(Number.isFinite);
  const distance = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  for (let index2 = 0; index2 < count; index2++) valid[index2] = Number(isWorldWalkable(world2, location(index2), radius));
  function segmentClear(from15, to) {
    if (!finite2(from15) || !finite2(to)) return false;
    const length = distance(from15, to);
    if (length > 1200) return false;
    const steps = Math.max(1, Math.ceil(length / 2));
    for (let index2 = 0; index2 <= steps; index2++) {
      const t = index2 / steps;
      if (!isWorldWalkable(world2, [from15[0] + (to[0] - from15[0]) * t, from15[1] + (to[1] - from15[1]) * t], radius)) return false;
    }
    return true;
  }
  function nearby(point2) {
    const centerX = Math.round(point2[0] / spacing), centerY = Math.round(point2[1] / spacing);
    const result = [];
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      const x = centerX + dx, y = centerY + dy;
      if (x < 0 || y < 0 || x >= columns || y >= rows) continue;
      const index2 = y * columns + x;
      if (valid[index2] && segmentClear(point2, location(index2))) result.push(index2);
    }
    return result;
  }
  function route(from15, to) {
    if (!finite2(from15) || !finite2(to) || !isWorldWalkable(world2, from15, radius) || !isWorldWalkable(world2, to, radius)) return null;
    if (segmentClear(from15, to)) return [[to[0], to[1]]];
    const starts = nearby(from15), ends = new Set(nearby(to));
    if (!starts.length || !ends.size) return null;
    const parents = new Int32Array(count).fill(-1);
    const costs = new Float64Array(count).fill(Infinity);
    const closed = new Uint8Array(count);
    const open = new Set(starts);
    for (const index2 of starts) costs[index2] = distance(from15, location(index2));
    let reached = -1;
    while (open.size) {
      let current = -1, best = Infinity;
      for (const candidate of open) {
        const score = costs[candidate] + distance(location(candidate), to);
        if (score < best) {
          current = candidate;
          best = score;
        }
      }
      if (current < 0) break;
      if (ends.has(current)) {
        reached = current;
        break;
      }
      open.delete(current);
      closed[current] = 1;
      const x = current % columns, y = Math.floor(current / columns);
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy || x + dx < 0 || x + dx >= columns || y + dy < 0 || y + dy >= rows) continue;
        const neighbor = (y + dy) * columns + x + dx;
        if (!valid[neighbor] || closed[neighbor]) continue;
        const nextCost = costs[current] + spacing * Math.hypot(dx, dy);
        if (nextCost >= costs[neighbor] || !segmentClear(location(current), location(neighbor))) continue;
        costs[neighbor] = nextCost;
        parents[neighbor] = current;
        open.add(neighbor);
      }
    }
    if (reached < 0) return null;
    const path = [[to[0], to[1]]];
    for (let index2 = reached; index2 !== -1; index2 = parents[index2]) path.unshift(location(index2));
    const simplified = [];
    let anchor2 = from15;
    for (let index2 = 0; index2 < path.length; ) {
      let last = path.length - 1;
      while (last > index2 && !segmentClear(anchor2, path[last])) last--;
      simplified.push(path[last]);
      anchor2 = path[last];
      index2 = last + 1;
    }
    return simplified;
  }
  return { route, segmentClear };
}

// src/movement.ts
var directions = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right"
};
var vectors = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
function createWorldMovement(world2, spawn, options = {}) {
  const speed = options.speed ?? 170, radius = options.radius ?? 7;
  if (!Number.isFinite(speed) || speed <= 0) throw new RangeError("Movement speed must be positive.");
  const navigation = createWorldNavigator(world2, radius);
  if (!isWorldWalkable(world2, spawn, radius)) throw new RangeError("Spawn must be walkable.");
  let position = [...spawn], facing = "down", walking = false;
  let route = [];
  const held = /* @__PURE__ */ new Map();
  const state = () => ({
    position: [...position],
    facing,
    walking,
    destination: route.length ? [...route[route.length - 1]] : null
  });
  const stop = () => {
    held.clear();
    route = [];
    walking = false;
  };
  return {
    get state() {
      return state();
    },
    /** Returns whether a key is handled. Clear held keys with stop() on blur/pause. */
    setKey(key, pressed) {
      const normalized = key.length === 1 ? key.toLowerCase() : key;
      const direction = directions[normalized];
      if (!direction) return false;
      if (pressed) {
        route = [];
        held.set(normalized, direction);
      } else held.delete(normalized);
      return true;
    },
    moveTo(point2) {
      const path = navigation.route(position, point2);
      if (!path) return false;
      stop();
      route = path;
      return true;
    },
    stop,
    reset() {
      stop();
      position = [...spawn];
      facing = "down";
    },
    /** Delta is milliseconds; a suspended tab advances by at most 40 ms. */
    update(deltaMs) {
      if (!Number.isFinite(deltaMs) || deltaMs < 0) throw new RangeError("Frame delta must be nonnegative.");
      walking = false;
      const [sx, sy] = project(...position);
      let dx = 0, dy = 0, step = Math.min(40, deltaMs) * speed / 1e3;
      const inputs = [...new Set(held.values())];
      if (inputs.length) {
        for (const direction of inputs) {
          dx += vectors[direction][0];
          dy += vectors[direction][1];
        }
        const magnitude = Math.hypot(dx, dy);
        if (magnitude) {
          dx /= magnitude;
          dy /= magnitude;
          facing = [...inputs].reverse().find((direction) => vectors[direction][0] * dx + vectors[direction][1] * dy > 0);
        }
      } else if (route.length) {
        while (route.length && Math.hypot(route[0][0] - position[0], route[0][1] - position[1]) < 1e-3) position = route.shift();
        if (route.length) {
          const [tx, ty] = project(...route[0]);
          const distance = Math.hypot(tx - sx, ty - sy);
          dx = (tx - sx) / distance;
          dy = (ty - sy) / distance;
          step = Math.min(step, distance);
          facing = Math.abs(dx) > Math.abs(dy) ? dx < 0 ? "left" : "right" : dy < 0 ? "up" : "down";
        }
      }
      if (step > 0 && (dx || dy)) {
        const next = unproject(sx + dx * step, sy + dy * step);
        if (navigation.segmentClear(position, next)) {
          position = next;
          walking = true;
        } else if (route.length) stop();
        else if (dx && dy) {
          const slide = [unproject(sx + dx * step, sy), unproject(sx, sy + dy * step)].find((point2) => navigation.segmentClear(position, point2));
          if (slide) {
            position = slide;
            walking = true;
          }
        }
        if (route.length && Math.hypot(route[0][0] - position[0], route[0][1] - position[1]) < 1e-3) {
          position = route.shift();
        }
      }
      return state();
    }
  };
}

// node_modules/viem/_esm/index.js
init_exports();

// node_modules/viem/_esm/utils/getAction.js
function getAction(client, actionFn, name) {
  const action_implicit = client[actionFn.name];
  if (typeof action_implicit === "function")
    return action_implicit;
  const action_explicit = client[name];
  if (typeof action_explicit === "function")
    return action_explicit;
  return (params) => actionFn(client, params);
}

// node_modules/viem/_esm/utils/abi/encodeEventTopics.js
init_abi();

// node_modules/viem/_esm/errors/log.js
init_base();
var FilterTypeNotSupportedError = class extends BaseError2 {
  constructor(type) {
    super(`Filter type "${type}" is not supported.`, {
      name: "FilterTypeNotSupportedError"
    });
  }
};

// node_modules/viem/_esm/utils/abi/encodeEventTopics.js
init_toBytes();
init_keccak256();
init_toEventSelector();
init_encodeAbiParameters();
init_formatAbiItem2();
init_getAbiItem();
var docsPath = "/docs/contract/encodeEventTopics";
function encodeEventTopics(parameters) {
  const { abi: abi2, eventName, args } = parameters;
  let abiItem = abi2[0];
  if (eventName) {
    const item = getAbiItem({ abi: abi2, name: eventName });
    if (!item)
      throw new AbiEventNotFoundError(eventName, { docsPath });
    abiItem = item;
  }
  if (abiItem.type !== "event")
    throw new AbiEventNotFoundError(void 0, { docsPath });
  let topics = [];
  if (args && "inputs" in abiItem) {
    const indexedInputs = abiItem.inputs?.filter((param) => "indexed" in param && param.indexed);
    const args_ = Array.isArray(args) ? args : Object.values(args).length > 0 ? indexedInputs?.map((x) => args[x.name]) ?? [] : [];
    if (args_.length > 0) {
      topics = indexedInputs?.map((param, i) => {
        if (Array.isArray(args_[i]))
          return args_[i].map((_, j) => encodeArg({ param, value: args_[i][j] }));
        return typeof args_[i] !== "undefined" && args_[i] !== null ? encodeArg({ param, value: args_[i] }) : null;
      }) ?? [];
    }
  }
  if (abiItem.anonymous)
    return topics;
  const definition = formatAbiItem2(abiItem);
  const signature = toEventSelector(definition);
  return [signature, ...topics];
}
function encodeArg({ param, value }) {
  if (param.type === "string" || param.type === "bytes")
    return keccak256(toBytes(value));
  if (param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
    throw new FilterTypeNotSupportedError(param.type);
  return encodeAbiParameters([param], [value]);
}

// node_modules/viem/_esm/actions/public/createContractEventFilter.js
init_toHex();

// node_modules/viem/_esm/utils/filters/createFilterRequestScope.js
function createFilterRequestScope(client, { method }) {
  const requestMap = {};
  if (client.transport.type === "fallback")
    client.transport.onResponse?.(({ method: method_, response: id, status, transport }) => {
      if (status === "success" && method === method_)
        requestMap[id] = transport.request;
    });
  return ((id) => requestMap[id] || client.request);
}

// node_modules/viem/_esm/actions/public/createContractEventFilter.js
async function createContractEventFilter(client, parameters) {
  const { address, abi: abi2, args, eventName, fromBlock, strict, toBlock } = parameters;
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newFilter"
  });
  const topics = eventName ? encodeEventTopics({
    abi: abi2,
    args,
    eventName
  }) : void 0;
  const id = await client.request({
    method: "eth_newFilter",
    params: [
      {
        address,
        fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
        toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
        topics
      }
    ]
  });
  return {
    abi: abi2,
    args,
    eventName,
    id,
    request: getRequest(id),
    strict: Boolean(strict),
    type: "event"
  };
}

// node_modules/viem/_esm/actions/public/estimateContractGas.js
init_parseAccount();
init_encodeFunctionData();

// node_modules/viem/_esm/utils/errors/getContractError.js
init_abi();
init_base();
init_contract();
init_request();
init_rpc();
var EXECUTION_REVERTED_ERROR_CODE = 3;
function getContractError(err, { abi: abi2, address, args, docsPath: docsPath8, functionName, sender }) {
  const error = err instanceof RawContractError ? err : err instanceof BaseError2 ? err.walk((err2) => "data" in err2) || err.walk() : {};
  const { code, data, details, message, shortMessage } = error;
  const cause = (() => {
    if (err instanceof AbiDecodingZeroDataError)
      return new ContractFunctionZeroDataError({ functionName, cause: err });
    if ([EXECUTION_REVERTED_ERROR_CODE, InternalRpcError.code].includes(code) && (data || details || message || shortMessage) || code === InvalidInputRpcError.code && details === "execution reverted" && data) {
      return new ContractFunctionRevertedError({
        abi: abi2,
        data: typeof data === "object" ? data.data : data,
        functionName,
        message: error instanceof RpcRequestError ? details : shortMessage ?? message,
        cause: err
      });
    }
    return err;
  })();
  return new ContractFunctionExecutionError(cause, {
    abi: abi2,
    args,
    contractAddress: address,
    docsPath: docsPath8,
    functionName,
    sender
  });
}

// node_modules/viem/_esm/actions/public/estimateGas.js
init_parseAccount();
init_base();

// node_modules/viem/_esm/accounts/utils/publicKeyToAddress.js
init_getAddress();
init_keccak256();
function publicKeyToAddress(publicKey) {
  const address = keccak256(`0x${publicKey.substring(4)}`).substring(26);
  return checksumAddress(`0x${address}`);
}

// node_modules/viem/_esm/utils/signature/recoverPublicKey.js
init_isHex();
init_size();
init_fromHex();
init_toHex();
async function recoverPublicKey({ hash: hash3, signature }) {
  const hashHex = isHex(hash3) ? hash3 : toHex(hash3);
  const { secp256k1: secp256k12 } = await Promise.resolve().then(() => (init_secp256k1(), secp256k1_exports));
  const signature_ = (() => {
    if (typeof signature === "object" && "r" in signature && "s" in signature) {
      const { r, s, v, yParity } = signature;
      const yParityOrV2 = Number(yParity ?? v);
      const recoveryBit2 = toRecoveryBit(yParityOrV2);
      return new secp256k12.Signature(hexToBigInt(r), hexToBigInt(s)).addRecoveryBit(recoveryBit2);
    }
    const signatureHex = isHex(signature) ? signature : toHex(signature);
    if (size(signatureHex) !== 65)
      throw new Error("invalid signature length");
    const yParityOrV = hexToNumber(`0x${signatureHex.slice(130)}`);
    const recoveryBit = toRecoveryBit(yParityOrV);
    return secp256k12.Signature.fromCompact(signatureHex.substring(2, 130)).addRecoveryBit(recoveryBit);
  })();
  const publicKey = signature_.recoverPublicKey(hashHex.substring(2)).toHex(false);
  return `0x${publicKey}`;
}
function toRecoveryBit(yParityOrV) {
  if (yParityOrV === 0 || yParityOrV === 1)
    return yParityOrV;
  if (yParityOrV === 27)
    return 0;
  if (yParityOrV === 28)
    return 1;
  throw new Error("Invalid yParityOrV value");
}

// node_modules/viem/_esm/utils/signature/recoverAddress.js
async function recoverAddress({ hash: hash3, signature }) {
  return publicKeyToAddress(await recoverPublicKey({ hash: hash3, signature }));
}

// node_modules/viem/_esm/utils/authorization/hashAuthorization.js
init_concat();
init_toBytes();
init_toHex();

// node_modules/viem/_esm/utils/encoding/toRlp.js
init_base();
init_cursor2();
init_toBytes();
init_toHex();
function toRlp(bytes, to = "hex") {
  const encodable = getEncodable(bytes);
  const cursor = createCursor(new Uint8Array(encodable.length));
  encodable.encode(cursor);
  if (to === "hex")
    return bytesToHex(cursor.bytes);
  return cursor.bytes;
}
function getEncodable(bytes) {
  if (Array.isArray(bytes))
    return getEncodableList(bytes.map((x) => getEncodable(x)));
  return getEncodableBytes(bytes);
}
function getEncodableList(list) {
  const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
  const sizeOfBodyLength = getSizeOfLength(bodyLength);
  const length = (() => {
    if (bodyLength <= 55)
      return 1 + bodyLength;
    return 1 + sizeOfBodyLength + bodyLength;
  })();
  return {
    length,
    encode(cursor) {
      if (bodyLength <= 55) {
        cursor.pushByte(192 + bodyLength);
      } else {
        cursor.pushByte(192 + 55 + sizeOfBodyLength);
        if (sizeOfBodyLength === 1)
          cursor.pushUint8(bodyLength);
        else if (sizeOfBodyLength === 2)
          cursor.pushUint16(bodyLength);
        else if (sizeOfBodyLength === 3)
          cursor.pushUint24(bodyLength);
        else
          cursor.pushUint32(bodyLength);
      }
      for (const { encode: encode4 } of list) {
        encode4(cursor);
      }
    }
  };
}
function getEncodableBytes(bytesOrHex) {
  const bytes = typeof bytesOrHex === "string" ? hexToBytes(bytesOrHex) : bytesOrHex;
  const sizeOfBytesLength = getSizeOfLength(bytes.length);
  const length = (() => {
    if (bytes.length === 1 && bytes[0] < 128)
      return 1;
    if (bytes.length <= 55)
      return 1 + bytes.length;
    return 1 + sizeOfBytesLength + bytes.length;
  })();
  return {
    length,
    encode(cursor) {
      if (bytes.length === 1 && bytes[0] < 128) {
        cursor.pushBytes(bytes);
      } else if (bytes.length <= 55) {
        cursor.pushByte(128 + bytes.length);
        cursor.pushBytes(bytes);
      } else {
        cursor.pushByte(128 + 55 + sizeOfBytesLength);
        if (sizeOfBytesLength === 1)
          cursor.pushUint8(bytes.length);
        else if (sizeOfBytesLength === 2)
          cursor.pushUint16(bytes.length);
        else if (sizeOfBytesLength === 3)
          cursor.pushUint24(bytes.length);
        else
          cursor.pushUint32(bytes.length);
        cursor.pushBytes(bytes);
      }
    }
  };
}
function getSizeOfLength(length) {
  if (length < 2 ** 8)
    return 1;
  if (length < 2 ** 16)
    return 2;
  if (length < 2 ** 24)
    return 3;
  if (length < 2 ** 32)
    return 4;
  throw new BaseError2("Length is too large.");
}

// node_modules/viem/_esm/utils/authorization/hashAuthorization.js
init_keccak256();
function hashAuthorization(parameters) {
  const { chainId, nonce, to } = parameters;
  const address = parameters.contractAddress ?? parameters.address;
  const hash3 = keccak256(concatHex([
    "0x05",
    toRlp([
      chainId ? numberToHex(chainId) : "0x",
      address,
      nonce ? numberToHex(nonce) : "0x"
    ])
  ]));
  if (to === "bytes")
    return hexToBytes(hash3);
  return hash3;
}

// node_modules/viem/_esm/utils/authorization/recoverAuthorizationAddress.js
async function recoverAuthorizationAddress(parameters) {
  const { authorization, signature } = parameters;
  return recoverAddress({
    hash: hashAuthorization(authorization),
    signature: signature ?? authorization
  });
}

// node_modules/viem/_esm/actions/public/estimateGas.js
init_toHex();

// node_modules/viem/_esm/errors/estimateGas.js
init_formatEther();
init_formatGwei();
init_base();
init_transaction();
var EstimateGasExecutionError = class extends BaseError2 {
  constructor(cause, { account, docsPath: docsPath8, chain, data, gas, gasPrice, maxFeePerGas, maxPriorityFeePerGas, nonce, to, value }) {
    const prettyArgs = prettyPrint({
      from: account?.address,
      to,
      value: typeof value !== "undefined" && `${formatEther2(value)} ${chain?.nativeCurrency?.symbol || "ETH"}`,
      data,
      gas,
      gasPrice: typeof gasPrice !== "undefined" && `${formatGwei2(gasPrice)} gwei`,
      maxFeePerGas: typeof maxFeePerGas !== "undefined" && `${formatGwei2(maxFeePerGas)} gwei`,
      maxPriorityFeePerGas: typeof maxPriorityFeePerGas !== "undefined" && `${formatGwei2(maxPriorityFeePerGas)} gwei`,
      nonce
    });
    super(cause.shortMessage, {
      cause,
      docsPath: docsPath8,
      metaMessages: [
        ...cause.metaMessages ? [...cause.metaMessages, " "] : [],
        "Estimate Gas Arguments:",
        prettyArgs
      ].filter(Boolean),
      name: "EstimateGasExecutionError"
    });
    Object.defineProperty(this, "cause", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.cause = cause;
  }
};

// node_modules/viem/_esm/utils/errors/getEstimateGasError.js
init_node();
init_getNodeError();
function getEstimateGasError(err, { docsPath: docsPath8, ...args }) {
  const cause = (() => {
    const cause2 = getNodeError(err, args);
    if (cause2 instanceof UnknownNodeError)
      return err;
    return cause2;
  })();
  return new EstimateGasExecutionError(cause, {
    docsPath: docsPath8,
    ...args
  });
}

// node_modules/viem/_esm/actions/public/estimateGas.js
init_extract();
init_transactionRequest();
init_stateOverride2();
init_assertRequest();

// node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
init_parseAccount();

// node_modules/viem/_esm/errors/fee.js
init_formatGwei();
init_base();
var BaseFeeScalarError = class extends BaseError2 {
  constructor() {
    super("`baseFeeMultiplier` must be greater than 1.", {
      name: "BaseFeeScalarError"
    });
  }
};
var Eip1559FeesNotSupportedError = class extends BaseError2 {
  constructor() {
    super("Chain does not support EIP-1559 fees.", {
      name: "Eip1559FeesNotSupportedError"
    });
  }
};
var MaxFeePerGasTooLowError = class extends BaseError2 {
  constructor({ maxPriorityFeePerGas }) {
    super(`\`maxFeePerGas\` cannot be less than the \`maxPriorityFeePerGas\` (${formatGwei2(maxPriorityFeePerGas)} gwei).`, { name: "MaxFeePerGasTooLowError" });
  }
};

// node_modules/viem/_esm/actions/public/estimateMaxPriorityFeePerGas.js
init_fromHex();

// node_modules/viem/_esm/errors/block.js
init_base();
var BlockNotFoundError = class extends BaseError2 {
  constructor({ blockHash, blockNumber }) {
    let identifier = "Block";
    if (blockHash)
      identifier = `Block at hash "${blockHash}"`;
    if (blockNumber)
      identifier = `Block at number "${blockNumber}"`;
    super(`${identifier} could not be found.`, { name: "BlockNotFoundError" });
  }
};

// node_modules/viem/_esm/actions/public/getBlock.js
init_toHex();

// node_modules/viem/_esm/utils/formatters/transaction.js
init_fromHex();
var transactionType = {
  "0x0": "legacy",
  "0x1": "eip2930",
  "0x2": "eip1559",
  "0x3": "eip4844",
  "0x4": "eip7702"
};
function formatTransaction(transaction, _) {
  const transaction_ = {
    ...transaction,
    blockHash: transaction.blockHash ? transaction.blockHash : null,
    blockNumber: transaction.blockNumber ? BigInt(transaction.blockNumber) : null,
    ...transaction.blockTimestamp != null && {
      blockTimestamp: BigInt(transaction.blockTimestamp)
    },
    chainId: transaction.chainId ? hexToNumber(transaction.chainId) : void 0,
    gas: transaction.gas ? BigInt(transaction.gas) : void 0,
    gasPrice: transaction.gasPrice ? BigInt(transaction.gasPrice) : void 0,
    maxFeePerBlobGas: transaction.maxFeePerBlobGas ? BigInt(transaction.maxFeePerBlobGas) : void 0,
    maxFeePerGas: transaction.maxFeePerGas ? BigInt(transaction.maxFeePerGas) : void 0,
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ? BigInt(transaction.maxPriorityFeePerGas) : void 0,
    nonce: transaction.nonce ? hexToNumber(transaction.nonce) : void 0,
    to: transaction.to ? transaction.to : null,
    transactionIndex: transaction.transactionIndex ? Number(transaction.transactionIndex) : null,
    type: transaction.type ? transactionType[transaction.type] : void 0,
    typeHex: transaction.type ? transaction.type : void 0,
    value: transaction.value ? BigInt(transaction.value) : void 0,
    v: transaction.v ? BigInt(transaction.v) : void 0
  };
  if (transaction.authorizationList)
    transaction_.authorizationList = formatAuthorizationList2(transaction.authorizationList);
  transaction_.yParity = (() => {
    if (transaction.yParity)
      return Number(transaction.yParity);
    if (typeof transaction_.v === "bigint") {
      if (transaction_.v === 0n || transaction_.v === 27n)
        return 0;
      if (transaction_.v === 1n || transaction_.v === 28n)
        return 1;
      if (transaction_.v >= 35n)
        return transaction_.v % 2n === 0n ? 1 : 0;
    }
    return void 0;
  })();
  if (transaction_.type === "legacy") {
    delete transaction_.accessList;
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
    delete transaction_.yParity;
  }
  if (transaction_.type === "eip2930") {
    delete transaction_.maxFeePerBlobGas;
    delete transaction_.maxFeePerGas;
    delete transaction_.maxPriorityFeePerGas;
  }
  if (transaction_.type === "eip1559")
    delete transaction_.maxFeePerBlobGas;
  return transaction_;
}
function formatAuthorizationList2(authorizationList) {
  return authorizationList.map((authorization) => ({
    address: authorization.address,
    chainId: Number(authorization.chainId),
    nonce: Number(authorization.nonce),
    r: authorization.r,
    s: authorization.s,
    yParity: Number(authorization.yParity)
  }));
}

// node_modules/viem/_esm/utils/formatters/block.js
function formatBlock(block, _) {
  const transactions = (block.transactions ?? []).map((transaction) => {
    if (typeof transaction === "string")
      return transaction;
    return formatTransaction(transaction);
  });
  return {
    ...block,
    baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
    blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : void 0,
    difficulty: block.difficulty ? BigInt(block.difficulty) : void 0,
    excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : void 0,
    gasLimit: block.gasLimit ? BigInt(block.gasLimit) : void 0,
    gasUsed: block.gasUsed ? BigInt(block.gasUsed) : void 0,
    hash: block.hash ? block.hash : null,
    logsBloom: block.logsBloom ? block.logsBloom : null,
    nonce: block.nonce ? block.nonce : null,
    number: block.number ? BigInt(block.number) : null,
    size: block.size ? BigInt(block.size) : void 0,
    timestamp: block.timestamp ? BigInt(block.timestamp) : void 0,
    transactions,
    totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
  };
}

// node_modules/viem/_esm/actions/public/getBlock.js
async function getBlock(client, { blockHash, blockNumber, blockTag = client.experimental_blockTag ?? "latest", includeTransactions: includeTransactions_ } = {}) {
  const includeTransactions = includeTransactions_ ?? false;
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  let block = null;
  if (blockHash) {
    block = await client.request({
      method: "eth_getBlockByHash",
      params: [blockHash, includeTransactions]
    }, { dedupe: true });
  } else {
    block = await client.request({
      method: "eth_getBlockByNumber",
      params: [blockNumberHex || blockTag, includeTransactions]
    }, { dedupe: Boolean(blockNumberHex) });
  }
  if (!block)
    throw new BlockNotFoundError({ blockHash, blockNumber });
  const format2 = client.chain?.formatters?.block?.format || formatBlock;
  return format2(block, "getBlock");
}

// node_modules/viem/_esm/actions/public/getGasPrice.js
async function getGasPrice(client) {
  const gasPrice = await client.request({
    method: "eth_gasPrice"
  });
  return BigInt(gasPrice);
}

// node_modules/viem/_esm/actions/public/estimateMaxPriorityFeePerGas.js
async function estimateMaxPriorityFeePerGas(client, args) {
  return internal_estimateMaxPriorityFeePerGas(client, args);
}
async function internal_estimateMaxPriorityFeePerGas(client, args) {
  const { block: block_, chain = client.chain, request } = args || {};
  try {
    const maxPriorityFeePerGas = chain?.fees?.maxPriorityFeePerGas ?? chain?.fees?.defaultPriorityFee;
    if (typeof maxPriorityFeePerGas === "function") {
      const block = block_ || await getAction(client, getBlock, "getBlock")({});
      const maxPriorityFeePerGas_ = await maxPriorityFeePerGas({
        block,
        client,
        request
      });
      if (maxPriorityFeePerGas_ === null)
        throw new Error();
      return maxPriorityFeePerGas_;
    }
    if (typeof maxPriorityFeePerGas !== "undefined")
      return maxPriorityFeePerGas;
    const maxPriorityFeePerGasHex = await client.request({
      method: "eth_maxPriorityFeePerGas"
    });
    return hexToBigInt(maxPriorityFeePerGasHex);
  } catch {
    const [block, gasPrice] = await Promise.all([
      block_ ? Promise.resolve(block_) : getAction(client, getBlock, "getBlock")({}),
      getAction(client, getGasPrice, "getGasPrice")({})
    ]);
    if (typeof block.baseFeePerGas !== "bigint")
      throw new Eip1559FeesNotSupportedError();
    const maxPriorityFeePerGas = gasPrice - block.baseFeePerGas;
    if (maxPriorityFeePerGas < 0n)
      return 0n;
    return maxPriorityFeePerGas;
  }
}

// node_modules/viem/_esm/actions/public/estimateFeesPerGas.js
async function estimateFeesPerGas(client, args) {
  return internal_estimateFeesPerGas(client, args);
}
async function internal_estimateFeesPerGas(client, args) {
  const { block: block_, chain = client.chain, request, type = "eip1559" } = args || {};
  const baseFeeMultiplier = await (async () => {
    if (typeof chain?.fees?.baseFeeMultiplier === "function")
      return chain.fees.baseFeeMultiplier({
        block: block_,
        client,
        request
      });
    return chain?.fees?.baseFeeMultiplier ?? 1.2;
  })();
  if (baseFeeMultiplier < 1)
    throw new BaseFeeScalarError();
  const decimals = baseFeeMultiplier.toString().split(".")[1]?.length ?? 0;
  const denominator = 10 ** decimals;
  const multiply = (base) => base * BigInt(Math.round(baseFeeMultiplier * denominator)) / BigInt(denominator);
  const block = block_ ? block_ : await getAction(client, getBlock, "getBlock")({});
  if (typeof chain?.fees?.estimateFeesPerGas === "function") {
    const fees = await chain.fees.estimateFeesPerGas({
      block: block_,
      client,
      multiply,
      request,
      type
    });
    if (fees !== null)
      return fees;
  }
  if (type === "eip1559") {
    if (typeof block.baseFeePerGas !== "bigint")
      throw new Eip1559FeesNotSupportedError();
    const maxPriorityFeePerGas = typeof request?.maxPriorityFeePerGas === "bigint" ? request.maxPriorityFeePerGas : await internal_estimateMaxPriorityFeePerGas(client, {
      block,
      chain,
      request
    });
    const baseFeePerGas = multiply(block.baseFeePerGas);
    const maxFeePerGas = request?.maxFeePerGas ?? baseFeePerGas + maxPriorityFeePerGas;
    return {
      maxFeePerGas,
      maxPriorityFeePerGas
    };
  }
  const gasPrice = request?.gasPrice ?? multiply(await getAction(client, getGasPrice, "getGasPrice")({}));
  return {
    gasPrice
  };
}

// node_modules/viem/_esm/actions/public/getTransactionCount.js
init_formatBlockParameter();
init_fromHex();
async function getTransactionCount(client, { address, blockHash, blockNumber, blockTag = "latest", requireCanonical }) {
  const block = formatBlockParameter({
    blockHash,
    blockNumber,
    blockTag,
    requireCanonical
  });
  const count = await client.request({
    method: "eth_getTransactionCount",
    params: [address, block]
  }, {
    dedupe: typeof blockNumber === "bigint" || blockHash !== void 0
  });
  return hexToNumber(count);
}

// node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
init_transaction();

// node_modules/viem/_esm/utils/blob/blobsToCommitments.js
init_toBytes();
init_toHex();
function blobsToCommitments(parameters) {
  const { kzg } = parameters;
  const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
  const commitments = [];
  for (const blob of blobs)
    commitments.push(Uint8Array.from(kzg.blobToKzgCommitment(blob)));
  return to === "bytes" ? commitments : commitments.map((x) => bytesToHex(x));
}

// node_modules/viem/_esm/utils/blob/blobsToProofs.js
init_toBytes();
init_toHex();
function blobsToProofs(parameters) {
  const { kzg } = parameters;
  const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
  const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
  const commitments = typeof parameters.commitments[0] === "string" ? parameters.commitments.map((x) => hexToBytes(x)) : parameters.commitments;
  const proofs = [];
  for (let i = 0; i < blobs.length; i++) {
    const blob = blobs[i];
    const commitment = commitments[i];
    proofs.push(Uint8Array.from(kzg.computeBlobKzgProof(blob, commitment)));
  }
  return to === "bytes" ? proofs : proofs.map((x) => bytesToHex(x));
}

// node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js
init_toHex();

// node_modules/@noble/hashes/esm/sha256.js
init_sha2();
var sha2562 = sha256;

// node_modules/viem/_esm/utils/hash/sha256.js
init_isHex();
init_toBytes();
init_toHex();
function sha2563(value, to_) {
  const to = to_ || "hex";
  const bytes = sha2562(isHex(value, { strict: false }) ? toBytes(value) : value);
  if (to === "bytes")
    return bytes;
  return toHex(bytes);
}

// node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js
function commitmentToVersionedHash(parameters) {
  const { commitment, version: version4 = 1 } = parameters;
  const to = parameters.to ?? (typeof commitment === "string" ? "hex" : "bytes");
  const versionedHash = sha2563(commitment, "bytes");
  versionedHash.set([version4], 0);
  return to === "bytes" ? versionedHash : bytesToHex(versionedHash);
}

// node_modules/viem/_esm/utils/blob/commitmentsToVersionedHashes.js
function commitmentsToVersionedHashes(parameters) {
  const { commitments, version: version4 } = parameters;
  const to = parameters.to ?? (typeof commitments[0] === "string" ? "hex" : "bytes");
  const hashes = [];
  for (const commitment of commitments) {
    hashes.push(commitmentToVersionedHash({
      commitment,
      to,
      version: version4
    }));
  }
  return hashes;
}

// node_modules/viem/_esm/constants/blob.js
var blobsPerTransaction = 6;
var bytesPerFieldElement = 32;
var fieldElementsPerBlob = 4096;
var bytesPerBlob = bytesPerFieldElement * fieldElementsPerBlob;
var maxBytesPerTransaction = bytesPerBlob * blobsPerTransaction - // terminator byte (0x80).
1 - // zero byte (0x00) appended to each field element.
1 * fieldElementsPerBlob * blobsPerTransaction;

// node_modules/viem/_esm/errors/blob.js
init_base();
var BlobSizeTooLargeError = class extends BaseError2 {
  constructor({ maxSize, size: size5 }) {
    super("Blob size is too large.", {
      metaMessages: [`Max: ${maxSize} bytes`, `Given: ${size5} bytes`],
      name: "BlobSizeTooLargeError"
    });
  }
};
var EmptyBlobError = class extends BaseError2 {
  constructor() {
    super("Blob data must not be empty.", { name: "EmptyBlobError" });
  }
};

// node_modules/viem/_esm/utils/blob/toBlobs.js
init_cursor2();
init_size();
init_toBytes();
init_toHex();
function toBlobs(parameters) {
  const to = parameters.to ?? (typeof parameters.data === "string" ? "hex" : "bytes");
  const data = typeof parameters.data === "string" ? hexToBytes(parameters.data) : parameters.data;
  const size_ = size(data);
  if (!size_)
    throw new EmptyBlobError();
  if (size_ > maxBytesPerTransaction)
    throw new BlobSizeTooLargeError({
      maxSize: maxBytesPerTransaction,
      size: size_
    });
  const blobs = [];
  let active = true;
  let position = 0;
  while (active) {
    const blob = createCursor(new Uint8Array(bytesPerBlob));
    let size5 = 0;
    while (size5 < fieldElementsPerBlob) {
      const bytes = data.slice(position, position + (bytesPerFieldElement - 1));
      blob.pushByte(0);
      blob.pushBytes(bytes);
      if (bytes.length < 31) {
        blob.pushByte(128);
        active = false;
        break;
      }
      size5++;
      position += 31;
    }
    blobs.push(blob);
  }
  return to === "bytes" ? blobs.map((x) => x.bytes) : blobs.map((x) => bytesToHex(x.bytes));
}

// node_modules/viem/_esm/utils/blob/toBlobSidecars.js
function toBlobSidecars(parameters) {
  const { data, kzg, to } = parameters;
  const blobs = parameters.blobs ?? toBlobs({ data, to });
  const commitments = parameters.commitments ?? blobsToCommitments({ blobs, kzg, to });
  const proofs = parameters.proofs ?? blobsToProofs({ blobs, commitments, kzg, to });
  const sidecars = [];
  for (let i = 0; i < blobs.length; i++)
    sidecars.push({
      blob: blobs[i],
      commitment: commitments[i],
      proof: proofs[i]
    });
  return sidecars;
}

// node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
init_lru();
init_assertRequest();

// node_modules/viem/_esm/utils/transaction/getTransactionType.js
init_transaction();
function getTransactionType(transaction) {
  if (transaction.type)
    return transaction.type;
  if (typeof transaction.authorizationList !== "undefined")
    return "eip7702";
  if (typeof transaction.blobs !== "undefined" || typeof transaction.blobVersionedHashes !== "undefined" || typeof transaction.maxFeePerBlobGas !== "undefined" || typeof transaction.sidecars !== "undefined")
    return "eip4844";
  if (typeof transaction.maxFeePerGas !== "undefined" || typeof transaction.maxPriorityFeePerGas !== "undefined") {
    return "eip1559";
  }
  if (typeof transaction.gasPrice !== "undefined") {
    if (typeof transaction.accessList !== "undefined")
      return "eip2930";
    return "legacy";
  }
  throw new InvalidSerializableTransactionError({ transaction });
}

// node_modules/viem/_esm/actions/public/fillTransaction.js
init_parseAccount();
init_transaction();

// node_modules/viem/_esm/utils/errors/getTransactionError.js
init_node();
init_transaction();
init_getNodeError();
function getTransactionError(err, { docsPath: docsPath8, ...args }) {
  const cause = (() => {
    const cause2 = getNodeError(err, args);
    if (cause2 instanceof UnknownNodeError)
      return err;
    return cause2;
  })();
  return new TransactionExecutionError(cause, {
    docsPath: docsPath8,
    ...args
  });
}

// node_modules/viem/_esm/actions/public/fillTransaction.js
init_extract();
init_transactionRequest();
init_assertRequest();

// node_modules/viem/_esm/actions/public/getChainId.js
init_fromHex();
async function getChainId(client) {
  const chainIdHex = await client.request({
    method: "eth_chainId"
  }, { dedupe: true });
  return hexToNumber(chainIdHex);
}

// node_modules/viem/_esm/actions/public/fillTransaction.js
async function fillTransaction(client, parameters) {
  const { account = client.account, accessList, authorizationList, chain = client.chain, blobVersionedHashes, blobs, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce: nonce_, nonceManager, to, type, value, ...rest } = parameters;
  const nonce = await (async () => {
    if (!account)
      return nonce_;
    if (!nonceManager)
      return nonce_;
    if (typeof nonce_ !== "undefined")
      return nonce_;
    const account_ = parseAccount(account);
    const chainId = chain ? chain.id : await getAction(client, getChainId, "getChainId")({});
    return await nonceManager.consume({
      address: account_.address,
      chainId,
      client
    });
  })();
  assertRequest(parameters);
  const chainFormat = chain?.formatters?.transactionRequest?.format;
  const format2 = chainFormat || formatTransactionRequest;
  const request = format2({
    // Pick out extra data that might exist on the chain's transaction request type.
    ...extract(rest, { format: chainFormat }),
    account: account ? parseAccount(account) : void 0,
    accessList,
    authorizationList,
    blobs,
    blobVersionedHashes,
    data,
    gas,
    gasPrice,
    maxFeePerBlobGas,
    maxFeePerGas,
    maxPriorityFeePerGas,
    nonce,
    to,
    type,
    value
  }, "fillTransaction");
  try {
    const response = await client.request({
      method: "eth_fillTransaction",
      params: [request]
    });
    const format3 = chain?.formatters?.transaction?.format || formatTransaction;
    const transaction = format3(response.tx);
    delete transaction.blockHash;
    delete transaction.blockNumber;
    delete transaction.r;
    delete transaction.s;
    delete transaction.transactionIndex;
    delete transaction.v;
    delete transaction.yParity;
    transaction.data = transaction.input;
    const hasFeePayerSignature = typeof transaction.feePayerSignature !== "undefined" && transaction.feePayerSignature !== null;
    if (hasFeePayerSignature && typeof nonce !== "undefined" && transaction.nonce !== nonce)
      throw new FeePayerNonceMismatchError({
        filledNonce: transaction.nonce,
        requestedNonce: nonce
      });
    if (!hasFeePayerSignature) {
      if (transaction.gas)
        transaction.gas = parameters.gas ?? transaction.gas;
      if (transaction.gasPrice)
        transaction.gasPrice = parameters.gasPrice ?? transaction.gasPrice;
      if (transaction.maxFeePerBlobGas)
        transaction.maxFeePerBlobGas = parameters.maxFeePerBlobGas ?? transaction.maxFeePerBlobGas;
      if (transaction.maxFeePerGas)
        transaction.maxFeePerGas = parameters.maxFeePerGas ?? transaction.maxFeePerGas;
      if (transaction.maxPriorityFeePerGas)
        transaction.maxPriorityFeePerGas = parameters.maxPriorityFeePerGas ?? transaction.maxPriorityFeePerGas;
      if (typeof transaction.nonce !== "undefined")
        transaction.nonce = parameters.nonce ?? transaction.nonce;
      const feeMultiplier = await (async () => {
        if (typeof chain?.fees?.baseFeeMultiplier === "function") {
          const block = await getAction(client, getBlock, "getBlock")({});
          return chain.fees.baseFeeMultiplier({
            block,
            client,
            request: parameters
          });
        }
        return chain?.fees?.baseFeeMultiplier ?? 1.2;
      })();
      if (feeMultiplier < 1)
        throw new BaseFeeScalarError();
      const decimals = feeMultiplier.toString().split(".")[1]?.length ?? 0;
      const denominator = 10 ** decimals;
      const multiplyFee = (base) => base * BigInt(Math.round(feeMultiplier * denominator)) / BigInt(denominator);
      if (transaction.maxFeePerGas && !parameters.maxFeePerGas)
        transaction.maxFeePerGas = multiplyFee(transaction.maxFeePerGas);
      if (transaction.gasPrice && !parameters.gasPrice)
        transaction.gasPrice = multiplyFee(transaction.gasPrice);
    }
    return {
      raw: response.raw,
      transaction: {
        from: request.from,
        ...transaction
      },
      ...response.capabilities ? { capabilities: response.capabilities } : {}
    };
  } catch (err) {
    throw getTransactionError(err, {
      ...parameters,
      chain: client.chain
    });
  }
}

// node_modules/viem/_esm/actions/wallet/prepareTransactionRequest.js
var defaultParameters = [
  "blobVersionedHashes",
  "chainId",
  "fees",
  "gas",
  "nonce",
  "type"
];
var eip1559NetworkCache = /* @__PURE__ */ new Map();
var supportsFillTransaction = /* @__PURE__ */ new LruMap(128);
async function prepareTransactionRequest(client, args) {
  let request = args;
  request.account ??= client.account;
  request.parameters ??= defaultParameters;
  const { account: account_, chain = client.chain, nonceManager, parameters } = request;
  const prepareTransactionRequest2 = (() => {
    if (typeof chain?.prepareTransactionRequest === "function")
      return {
        fn: chain.prepareTransactionRequest,
        runAt: ["beforeFillTransaction"]
      };
    if (Array.isArray(chain?.prepareTransactionRequest))
      return {
        fn: chain.prepareTransactionRequest[0],
        runAt: chain.prepareTransactionRequest[1].runAt
      };
    return void 0;
  })();
  let chainId;
  async function getChainId2() {
    if (chainId)
      return chainId;
    if (typeof request.chainId !== "undefined")
      return request.chainId;
    if (chain)
      return chain.id;
    const chainId_ = await getAction(client, getChainId, "getChainId")({});
    chainId = chainId_;
    return chainId;
  }
  let account = account_ ? parseAccount(account_) : account_;
  let nonce = request.nonce;
  if (prepareTransactionRequest2?.fn && prepareTransactionRequest2.runAt?.includes("beforeFillTransaction")) {
    request = await prepareTransactionRequest2.fn({ ...request, chain }, {
      client,
      phase: "beforeFillTransaction"
    });
    nonce ??= request.nonce;
    const sender = request.account ?? request.from;
    account = sender ? parseAccount(sender) : void 0;
  }
  if (parameters.includes("nonce") && typeof nonce === "undefined" && account && nonceManager) {
    const chainId2 = await getChainId2();
    nonce = await nonceManager.consume({
      address: account.address,
      chainId: chainId2,
      client
    });
  }
  const attemptFill = (() => {
    if ((parameters.includes("blobVersionedHashes") || parameters.includes("sidecars")) && request.kzg && request.blobs)
      return false;
    if (parameters.length > 0 && "feePayer" in request && request.feePayer && !("feePayerSignature" in request && request.feePayerSignature))
      return true;
    if (supportsFillTransaction.get(client.uid) === false)
      return false;
    const shouldAttempt = ["fees", "gas"].some((parameter) => parameters.includes(parameter));
    if (!shouldAttempt)
      return false;
    if (parameters.includes("chainId") && typeof request.chainId !== "number")
      return true;
    if (parameters.includes("nonce") && typeof nonce !== "number")
      return true;
    if (parameters.includes("fees") && typeof request.gasPrice !== "bigint" && (typeof request.maxFeePerGas !== "bigint" || typeof request.maxPriorityFeePerGas !== "bigint"))
      return true;
    if (parameters.includes("gas") && typeof request.gas !== "bigint")
      return true;
    return false;
  })();
  const fillResult = attemptFill ? await getAction(client, fillTransaction, "fillTransaction")({ ...request, nonce }).then((result) => {
    const { chainId: chainId2, from: from15, gas: gas2, gasPrice, nonce: nonce2, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, type: type2, ...rest } = result.transaction;
    const feeToken = "feeToken" in rest ? rest.feeToken : void 0;
    const hasFilledFeePayerSignature = "feePayerSignature" in rest && rest.feePayerSignature !== null && typeof rest.feePayerSignature !== "undefined";
    const shouldUseFilledFeeToken = typeof feeToken !== "undefined" && feeToken !== null && (!("feeToken" in request) || hasFilledFeePayerSignature);
    supportsFillTransaction.set(client.uid, true);
    return {
      ...request,
      ...from15 ? { from: from15 } : {},
      ...type2 && !request.type ? { type: type2 } : {},
      ...typeof chainId2 !== "undefined" ? { chainId: chainId2 } : {},
      ...typeof gas2 !== "undefined" ? { gas: gas2 } : {},
      ...typeof gasPrice !== "undefined" ? { gasPrice } : {},
      ...typeof nonce2 !== "undefined" ? { nonce: nonce2 } : {},
      ...typeof maxFeePerBlobGas !== "undefined" && request.type !== "legacy" && request.type !== "eip2930" ? { maxFeePerBlobGas } : {},
      ...typeof maxFeePerGas !== "undefined" && request.type !== "legacy" && request.type !== "eip2930" ? { maxFeePerGas } : {},
      ...typeof maxPriorityFeePerGas !== "undefined" && request.type !== "legacy" && request.type !== "eip2930" ? { maxPriorityFeePerGas } : {},
      ..."nonceKey" in rest && typeof rest.nonceKey !== "undefined" ? { nonceKey: rest.nonceKey } : {},
      ..."keyAuthorization" in rest && typeof rest.keyAuthorization !== "undefined" && rest.keyAuthorization !== null && !("keyAuthorization" in request) ? { keyAuthorization: rest.keyAuthorization } : {},
      ..."feePayerSignature" in rest && typeof rest.feePayerSignature !== "undefined" && rest.feePayerSignature !== null ? { feePayerSignature: rest.feePayerSignature } : {},
      ...shouldUseFilledFeeToken ? { feeToken } : {},
      ...result.capabilities ? { _capabilities: result.capabilities } : {}
    };
  }).catch((e) => {
    const error = e;
    if (error.name !== "TransactionExecutionError")
      return request;
    const nonceMismatch = error.walk?.((error2) => error2 instanceof FeePayerNonceMismatchError);
    if (nonceMismatch)
      throw e;
    const executionReverted = error.walk?.((e2) => {
      const error2 = e2;
      return error2.name === "ExecutionRevertedError";
    });
    if (executionReverted)
      throw e;
    const unsupported = error.walk?.((e2) => {
      const error2 = e2;
      return error2.name === "MethodNotFoundRpcError" || error2.name === "MethodNotSupportedRpcError" || error2.message?.includes("eth_fillTransaction is not available");
    });
    if (unsupported)
      supportsFillTransaction.set(client.uid, false);
    return request;
  }) : request;
  nonce ??= fillResult.nonce;
  request = {
    ...fillResult,
    ...account ? { from: account?.address } : {},
    ...typeof nonce !== "undefined" ? { nonce } : {}
  };
  const { blobs, gas, kzg, type } = request;
  if (prepareTransactionRequest2?.fn && prepareTransactionRequest2.runAt?.includes("beforeFillParameters")) {
    request = await prepareTransactionRequest2.fn({ ...request, chain }, {
      client,
      phase: "beforeFillParameters"
    });
  }
  let block;
  async function getBlock2() {
    if (block)
      return block;
    block = await getAction(client, getBlock, "getBlock")({ blockTag: "latest" });
    return block;
  }
  if (parameters.includes("nonce") && typeof nonce === "undefined" && account && !nonceManager)
    request.nonce = await getAction(client, getTransactionCount, "getTransactionCount")({
      address: account.address,
      blockTag: "pending"
    });
  if ((parameters.includes("blobVersionedHashes") || parameters.includes("sidecars")) && blobs && kzg) {
    const commitments = blobsToCommitments({ blobs, kzg });
    if (parameters.includes("blobVersionedHashes")) {
      const versionedHashes = commitmentsToVersionedHashes({
        commitments,
        to: "hex"
      });
      request.blobVersionedHashes = versionedHashes;
    }
    if (parameters.includes("sidecars")) {
      const proofs = blobsToProofs({ blobs, commitments, kzg });
      const sidecars = toBlobSidecars({
        blobs,
        commitments,
        proofs,
        to: "hex"
      });
      request.sidecars = sidecars;
    }
  }
  if (parameters.includes("chainId"))
    request.chainId = await getChainId2();
  if ((parameters.includes("fees") || parameters.includes("type")) && typeof type === "undefined") {
    try {
      request.type = getTransactionType(request);
    } catch {
      let isEip1559Network = eip1559NetworkCache.get(client.uid);
      if (typeof isEip1559Network === "undefined") {
        const block2 = await getBlock2();
        isEip1559Network = typeof block2?.baseFeePerGas === "bigint";
        eip1559NetworkCache.set(client.uid, isEip1559Network);
      }
      request.type = isEip1559Network ? "eip1559" : "legacy";
    }
  }
  if (parameters.includes("fees")) {
    if (request.type !== "legacy" && request.type !== "eip2930") {
      if (typeof request.maxFeePerGas === "undefined" || typeof request.maxPriorityFeePerGas === "undefined") {
        const block2 = await getBlock2();
        const { maxFeePerGas, maxPriorityFeePerGas } = await internal_estimateFeesPerGas(client, {
          block: block2,
          chain,
          request
        });
        if (typeof request.maxPriorityFeePerGas === "undefined" && request.maxFeePerGas && request.maxFeePerGas < maxPriorityFeePerGas)
          throw new MaxFeePerGasTooLowError({
            maxPriorityFeePerGas
          });
        request.maxPriorityFeePerGas = maxPriorityFeePerGas;
        request.maxFeePerGas = maxFeePerGas;
      }
    } else {
      if (typeof request.maxFeePerGas !== "undefined" || typeof request.maxPriorityFeePerGas !== "undefined")
        throw new Eip1559FeesNotSupportedError();
      if (typeof request.gasPrice === "undefined") {
        const block2 = await getBlock2();
        const { gasPrice: gasPrice_ } = await internal_estimateFeesPerGas(client, {
          block: block2,
          chain,
          request,
          type: "legacy"
        });
        request.gasPrice = gasPrice_;
      }
    }
  }
  if (parameters.includes("gas") && typeof gas === "undefined")
    request.gas = await getAction(client, estimateGas, "estimateGas")({
      ...request,
      account,
      prepare: account?.type === "local" ? [] : ["blobVersionedHashes"]
    });
  if (prepareTransactionRequest2?.fn && prepareTransactionRequest2.runAt?.includes("afterFillParameters"))
    request = await prepareTransactionRequest2.fn({ ...request, chain }, {
      client,
      phase: "afterFillParameters"
    });
  assertRequest(request);
  delete request.parameters;
  return request;
}

// node_modules/viem/_esm/actions/public/estimateGas.js
async function estimateGas(client, args) {
  const { account: account_ = client.account, prepare = true } = args;
  const account = account_ ? parseAccount(account_) : void 0;
  const parameters = (() => {
    if (Array.isArray(prepare))
      return prepare;
    if (account?.type !== "local")
      return ["blobVersionedHashes"];
    return void 0;
  })();
  try {
    const to = await (async () => {
      if (args.to)
        return args.to;
      if (args.authorizationList && args.authorizationList.length > 0)
        return await recoverAuthorizationAddress({
          authorization: args.authorizationList[0]
        }).catch(() => {
          throw new BaseError2("`to` is required. Could not infer from `authorizationList`");
        });
      return void 0;
    })();
    const { accessList, authorizationList, blobs, blobVersionedHashes, blockNumber, blockTag, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, nonce, value, stateOverride, ...rest } = prepare ? await prepareTransactionRequest(client, {
      ...args,
      parameters,
      to
    }) : args;
    if (gas && args.gas !== gas)
      return gas;
    const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
    const block = blockNumberHex || blockTag;
    const rpcStateOverride = serializeStateOverride(stateOverride);
    assertRequest(args);
    const chainFormat = client.chain?.formatters?.transactionRequest?.format;
    const format2 = chainFormat || formatTransactionRequest;
    const request = format2({
      // Pick out extra data that might exist on the chain's transaction request type.
      ...extract(rest, { format: chainFormat }),
      account,
      accessList,
      authorizationList,
      blobs,
      blobVersionedHashes,
      data,
      gasPrice,
      maxFeePerBlobGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      nonce,
      to,
      value
    }, "estimateGas");
    return BigInt(await client.request({
      method: "eth_estimateGas",
      params: rpcStateOverride ? [
        request,
        block ?? client.experimental_blockTag ?? "latest",
        rpcStateOverride
      ] : block ? [request, block] : [request]
    }));
  } catch (err) {
    throw getEstimateGasError(err, {
      ...args,
      account,
      chain: client.chain
    });
  }
}

// node_modules/viem/_esm/actions/public/estimateContractGas.js
async function estimateContractGas(client, parameters) {
  const { abi: abi2, address, args, functionName, dataSuffix = typeof client.dataSuffix === "string" ? client.dataSuffix : client.dataSuffix?.value, ...request } = parameters;
  const data = encodeFunctionData({
    abi: abi2,
    args,
    functionName
  });
  try {
    const gas = await getAction(client, estimateGas, "estimateGas")({
      data: `${data}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
      to: address,
      ...request
    });
    return gas;
  } catch (error) {
    const account = request.account ? parseAccount(request.account) : void 0;
    throw getContractError(error, {
      abi: abi2,
      address,
      args,
      docsPath: "/docs/contract/estimateContractGas",
      functionName,
      sender: account?.address
    });
  }
}

// node_modules/viem/_esm/actions/public/getContractEvents.js
init_getAbiItem();

// node_modules/viem/_esm/utils/abi/parseEventLogs.js
init_isAddressEqual();
init_toBytes();

// node_modules/viem/_esm/utils/formatters/log.js
function formatLog(log, { args, eventName } = {}) {
  return {
    ...log,
    blockHash: log.blockHash ? log.blockHash : null,
    blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
    blockTimestamp: log.blockTimestamp ? BigInt(log.blockTimestamp) : log.blockTimestamp === null ? null : void 0,
    logIndex: log.logIndex ? Number(log.logIndex) : null,
    transactionHash: log.transactionHash ? log.transactionHash : null,
    transactionIndex: log.transactionIndex ? Number(log.transactionIndex) : null,
    ...eventName ? { args, eventName } : {}
  };
}

// node_modules/viem/_esm/utils/abi/parseEventLogs.js
init_keccak256();
init_toEventSelector();

// node_modules/viem/_esm/utils/abi/decodeEventLog.js
init_abi();
init_cursor();
init_size();
init_toEventSelector();
init_decodeAbiParameters();
init_formatAbiItem2();
var docsPath3 = "/docs/contract/decodeEventLog";
function decodeEventLog(parameters) {
  const { abi: abi2, data, strict: strict_, topics } = parameters;
  const strict = strict_ ?? true;
  const [signature, ...argTopics] = topics;
  if (!signature)
    throw new AbiEventSignatureEmptyTopicsError({ docsPath: docsPath3 });
  const abiItem = abi2.find((x) => x.type === "event" && signature === toEventSelector(formatAbiItem2(x)));
  if (!(abiItem && "name" in abiItem) || abiItem.type !== "event")
    throw new AbiEventSignatureNotFoundError(signature, { docsPath: docsPath3 });
  const { name, inputs } = abiItem;
  const isUnnamed = inputs?.some((x) => !("name" in x && x.name));
  const args = isUnnamed ? [] : {};
  const indexedInputs = inputs.map((x, i) => [x, i]).filter(([x]) => "indexed" in x && x.indexed);
  const missingIndexedInputs = [];
  for (let i = 0; i < indexedInputs.length; i++) {
    const [param, argIndex] = indexedInputs[i];
    const topic = argTopics[i];
    if (!topic) {
      if (strict)
        throw new DecodeLogTopicsMismatch({
          abiItem,
          param
        });
      missingIndexedInputs.push([param, argIndex]);
      continue;
    }
    args[isUnnamed ? argIndex : param.name || argIndex] = decodeTopic({
      param,
      value: topic
    });
  }
  const nonIndexedInputs = inputs.filter((x) => !("indexed" in x && x.indexed));
  const inputsToDecode = strict ? nonIndexedInputs : [...missingIndexedInputs.map(([param]) => param), ...nonIndexedInputs];
  if (inputsToDecode.length > 0) {
    if (data && data !== "0x") {
      try {
        const decodedData = decodeAbiParameters(inputsToDecode, data);
        if (decodedData) {
          let dataIndex = 0;
          if (!strict) {
            for (const [param, argIndex] of missingIndexedInputs) {
              args[isUnnamed ? argIndex : param.name || argIndex] = decodedData[dataIndex++];
            }
          }
          if (isUnnamed) {
            for (let i = 0; i < inputs.length; i++)
              if (args[i] === void 0 && dataIndex < decodedData.length)
                args[i] = decodedData[dataIndex++];
          } else
            for (let i = 0; i < nonIndexedInputs.length; i++)
              args[nonIndexedInputs[i].name] = decodedData[dataIndex++];
        }
      } catch (err) {
        if (strict) {
          if (err instanceof AbiDecodingDataSizeTooSmallError || err instanceof PositionOutOfBoundsError)
            throw new DecodeLogDataMismatch({
              abiItem,
              data,
              params: inputsToDecode,
              size: size(data)
            });
          throw err;
        }
      }
    } else if (strict) {
      throw new DecodeLogDataMismatch({
        abiItem,
        data: "0x",
        params: inputsToDecode,
        size: 0
      });
    }
  }
  return {
    eventName: name,
    args: Object.values(args).length > 0 ? args : void 0
  };
}
function decodeTopic({ param, value }) {
  if (param.type === "string" || param.type === "bytes" || param.type === "tuple" || param.type.match(/^(.*)\[(\d+)?\]$/))
    return value;
  const decodedArg = decodeAbiParameters([param], value) || [];
  return decodedArg[0];
}

// node_modules/viem/_esm/utils/abi/parseEventLogs.js
function parseEventLogs(parameters) {
  const { abi: abi2, args, logs, strict = true } = parameters;
  const eventName = (() => {
    if (!parameters.eventName)
      return void 0;
    if (Array.isArray(parameters.eventName))
      return parameters.eventName;
    return [parameters.eventName];
  })();
  const abiTopics = abi2.filter((abiItem) => abiItem.type === "event").map((abiItem) => ({
    abi: abiItem,
    selector: toEventSelector(abiItem)
  }));
  return logs.map((log) => {
    const formattedLog = typeof log.blockNumber === "string" ? formatLog(log) : log;
    const abiItems = abiTopics.filter((abiTopic) => formattedLog.topics[0] === abiTopic.selector);
    if (abiItems.length === 0)
      return null;
    let event;
    let abiItem;
    for (const item of abiItems) {
      try {
        event = decodeEventLog({
          ...formattedLog,
          abi: [item.abi],
          strict: true
        });
        abiItem = item;
        break;
      } catch {
      }
    }
    if (!event && !strict) {
      abiItem = abiItems[0];
      try {
        event = decodeEventLog({
          data: formattedLog.data,
          topics: formattedLog.topics,
          abi: [abiItem.abi],
          strict: false
        });
      } catch {
        const isUnnamed = abiItem.abi.inputs?.some((x) => !("name" in x && x.name));
        return {
          ...formattedLog,
          args: isUnnamed ? [] : {},
          eventName: abiItem.abi.name
        };
      }
    }
    if (!event || !abiItem)
      return null;
    if (eventName && !eventName.includes(event.eventName))
      return null;
    if (!includesArgs({
      args: event.args,
      inputs: abiItem.abi.inputs,
      matchArgs: args
    }))
      return null;
    return { ...event, ...formattedLog };
  }).filter(Boolean);
}
function includesArgs(parameters) {
  const { args, inputs, matchArgs } = parameters;
  if (!matchArgs)
    return true;
  if (!args)
    return false;
  function isEqual2(input, value, arg) {
    try {
      if (input.type === "address")
        return isAddressEqual(value, arg);
      if (input.type === "string" || input.type === "bytes")
        return keccak256(toBytes(value)) === arg;
      return value === arg;
    } catch {
      return false;
    }
  }
  if (Array.isArray(args) && Array.isArray(matchArgs)) {
    return matchArgs.every((value, index2) => {
      if (value === null || value === void 0)
        return true;
      const input = inputs[index2];
      if (!input)
        return false;
      const value_ = Array.isArray(value) ? value : [value];
      return value_.some((value2) => isEqual2(input, value2, args[index2]));
    });
  }
  if (typeof args === "object" && !Array.isArray(args) && typeof matchArgs === "object" && !Array.isArray(matchArgs))
    return Object.entries(matchArgs).every(([key, value]) => {
      if (value === null || value === void 0)
        return true;
      const input = inputs.find((input2) => input2.name === key);
      if (!input)
        return false;
      const value_ = Array.isArray(value) ? value : [value];
      return value_.some((value2) => isEqual2(input, value2, args[key]));
    });
  return false;
}

// node_modules/viem/_esm/actions/public/getLogs.js
init_toHex();
async function getLogs(client, { address, blockHash, fromBlock, toBlock, event, events: events_, args, strict: strict_ } = {}) {
  const strict = strict_ ?? false;
  const events = events_ ?? (event ? [event] : void 0);
  let topics = [];
  if (events) {
    const encoded = events.flatMap((event2) => encodeEventTopics({
      abi: [event2],
      eventName: event2.name,
      args: events_ ? void 0 : args
    }));
    topics = [encoded];
    if (event)
      topics = topics[0];
  }
  let logs;
  if (blockHash) {
    logs = await client.request({
      method: "eth_getLogs",
      params: [{ address, topics, blockHash }]
    });
  } else {
    logs = await client.request({
      method: "eth_getLogs",
      params: [
        {
          address,
          topics,
          fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
          toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock
        }
      ]
    });
  }
  const formattedLogs = logs.map((log) => formatLog(log));
  if (!events)
    return formattedLogs;
  return parseEventLogs({
    abi: events,
    args,
    logs: formattedLogs,
    strict
  });
}

// node_modules/viem/_esm/actions/public/getContractEvents.js
async function getContractEvents(client, parameters) {
  const { abi: abi2, address, args, blockHash, eventName, fromBlock, toBlock, strict } = parameters;
  const event = eventName ? getAbiItem({ abi: abi2, name: eventName }) : void 0;
  const events = !event ? abi2.filter((x) => x.type === "event") : void 0;
  return getAction(client, getLogs, "getLogs")({
    address,
    args,
    blockHash,
    event,
    events,
    fromBlock,
    toBlock,
    strict
  });
}

// node_modules/viem/_esm/actions/public/readContract.js
init_decodeFunctionResult();
init_encodeFunctionData();
init_call();
async function readContract(client, parameters) {
  const { abi: abi2, address, args, functionName, ...rest } = parameters;
  const calldata = encodeFunctionData({
    abi: abi2,
    args,
    functionName
  });
  try {
    const { data } = await getAction(client, call, "call")({
      ...rest,
      data: calldata,
      to: address
    });
    return decodeFunctionResult({
      abi: abi2,
      args,
      functionName,
      data: data || "0x"
    });
  } catch (error) {
    throw getContractError(error, {
      abi: abi2,
      address,
      args,
      docsPath: "/docs/contract/readContract",
      functionName
    });
  }
}

// node_modules/viem/_esm/actions/public/simulateContract.js
init_parseAccount();
init_decodeFunctionResult();
init_encodeFunctionData();
init_call();
async function simulateContract(client, parameters) {
  const { abi: abi2, address, args, functionName, dataSuffix = typeof client.dataSuffix === "string" ? client.dataSuffix : client.dataSuffix?.value, ...callRequest } = parameters;
  const account = callRequest.account ? parseAccount(callRequest.account) : client.account;
  const calldata = encodeFunctionData({ abi: abi2, args, functionName });
  try {
    const { data } = await getAction(client, call, "call")({
      batch: false,
      data: `${calldata}${dataSuffix ? dataSuffix.replace("0x", "") : ""}`,
      to: address,
      ...callRequest,
      account
    });
    const result = decodeFunctionResult({
      abi: abi2,
      args,
      functionName,
      data: data || "0x"
    });
    const minimizedAbi = abi2.filter((abiItem) => "name" in abiItem && abiItem.name === parameters.functionName);
    return {
      result,
      request: {
        abi: minimizedAbi,
        address,
        args,
        dataSuffix,
        functionName,
        ...callRequest,
        account
      }
    };
  } catch (error) {
    throw getContractError(error, {
      abi: abi2,
      address,
      args,
      docsPath: "/docs/contract/simulateContract",
      functionName,
      sender: account?.address
    });
  }
}

// node_modules/viem/_esm/actions/public/watchContractEvent.js
init_abi();
init_rpc();

// node_modules/viem/_esm/utils/observe.js
var listenersCache = /* @__PURE__ */ new Map();
var cleanupCache = /* @__PURE__ */ new Map();
var callbackCount = 0;
function observe(observerId, callbacks, fn) {
  const callbackId = ++callbackCount;
  const getListeners = () => listenersCache.get(observerId) || [];
  const unsubscribe = () => {
    const listeners2 = getListeners();
    const nextListeners = listeners2.filter((cb) => cb.id !== callbackId);
    if (nextListeners.length === 0) {
      listenersCache.delete(observerId);
      cleanupCache.delete(observerId);
      return;
    }
    listenersCache.set(observerId, nextListeners);
  };
  const unwatch = () => {
    const listeners2 = getListeners();
    if (!listeners2.some((cb) => cb.id === callbackId))
      return;
    const cleanup2 = cleanupCache.get(observerId);
    if (listeners2.length === 1 && cleanup2) {
      const p = cleanup2();
      if (p instanceof Promise)
        p.catch(() => {
        });
    }
    unsubscribe();
  };
  const listeners = getListeners();
  listenersCache.set(observerId, [
    ...listeners,
    { id: callbackId, fns: callbacks }
  ]);
  if (listeners && listeners.length > 0)
    return unwatch;
  const emit = {};
  for (const key in callbacks) {
    emit[key] = ((...args) => {
      const listeners2 = getListeners();
      if (listeners2.length === 0)
        return;
      for (const listener of listeners2)
        listener.fns[key]?.(...args);
    });
  }
  const cleanup = fn(emit);
  if (typeof cleanup === "function")
    cleanupCache.set(observerId, cleanup);
  return unwatch;
}

// node_modules/viem/_esm/utils/wait.js
init_utils3();
async function wait(time, { signal } = {}) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(getAbortError(signal));
      return;
    }
    const cleanup = () => signal?.removeEventListener("abort", onAbort);
    const timeout = setTimeout(() => {
      cleanup();
      resolve();
    }, time);
    const onAbort = () => {
      clearTimeout(timeout);
      cleanup();
      reject(getAbortError(signal));
    };
    signal?.addEventListener("abort", onAbort, { once: true });
  });
}

// node_modules/viem/_esm/utils/poll.js
function poll(fn, { emitOnBegin, initialWaitTime, interval }) {
  let active = true;
  const unwatch = () => active = false;
  const watch = async () => {
    let data;
    if (emitOnBegin)
      data = await fn({ unpoll: unwatch });
    const initialWait = await initialWaitTime?.(data) ?? interval;
    await wait(initialWait);
    const poll2 = async () => {
      if (!active)
        return;
      await fn({ unpoll: unwatch });
      await wait(interval);
      poll2();
    };
    poll2();
  };
  watch();
  return unwatch;
}

// node_modules/viem/_esm/actions/public/watchContractEvent.js
init_stringify();

// node_modules/viem/_esm/utils/promise/withCache.js
var promiseCache = /* @__PURE__ */ new Map();
var responseCache = /* @__PURE__ */ new Map();
function getCache(cacheKey2) {
  const buildCache = (cacheKey3, cache) => ({
    clear: () => cache.delete(cacheKey3),
    get: () => cache.get(cacheKey3),
    set: (data) => cache.set(cacheKey3, data)
  });
  const promise = buildCache(cacheKey2, promiseCache);
  const response = buildCache(cacheKey2, responseCache);
  return {
    clear: () => {
      promise.clear();
      response.clear();
    },
    promise,
    response
  };
}
async function withCache(fn, { cacheKey: cacheKey2, cacheTime = Number.POSITIVE_INFINITY }) {
  const cache = getCache(cacheKey2);
  const response = cache.response.get();
  if (response && cacheTime > 0) {
    const age = Date.now() - response.created.getTime();
    if (age < cacheTime)
      return response.data;
  }
  let promise = cache.promise.get();
  if (!promise) {
    promise = fn();
    cache.promise.set(promise);
  }
  try {
    const data = await promise;
    cache.response.set({ created: /* @__PURE__ */ new Date(), data });
    return data;
  } finally {
    cache.promise.clear();
  }
}

// node_modules/viem/_esm/actions/public/getBlockNumber.js
var cacheKey = (id) => `blockNumber.${id}`;
async function getBlockNumber(client, { cacheTime = client.cacheTime } = {}) {
  const blockNumberHex = await withCache(() => client.request({
    method: "eth_blockNumber"
  }), { cacheKey: cacheKey(client.uid), cacheTime });
  return BigInt(blockNumberHex);
}

// node_modules/viem/_esm/actions/public/getFilterChanges.js
async function getFilterChanges(_client, { filter }) {
  const strict = "strict" in filter && filter.strict;
  const logs = await filter.request({
    method: "eth_getFilterChanges",
    params: [filter.id]
  });
  if (typeof logs[0] === "string")
    return logs;
  const formattedLogs = logs.map((log) => formatLog(log));
  if (!("abi" in filter) || !filter.abi)
    return formattedLogs;
  return parseEventLogs({
    abi: filter.abi,
    logs: formattedLogs,
    strict
  });
}

// node_modules/viem/_esm/actions/public/uninstallFilter.js
async function uninstallFilter(_client, { filter }) {
  return filter.request({
    method: "eth_uninstallFilter",
    params: [filter.id]
  });
}

// node_modules/viem/_esm/actions/public/watchContractEvent.js
function watchContractEvent(client, parameters) {
  const { abi: abi2, address, args, batch = true, eventName, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ } = parameters;
  const enablePolling = (() => {
    if (typeof poll_ !== "undefined")
      return poll_;
    if (typeof fromBlock === "bigint")
      return true;
    if (client.transport.type === "webSocket" || client.transport.type === "ipc")
      return false;
    if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc"))
      return false;
    return true;
  })();
  const pollContractEvent = () => {
    const strict = strict_ ?? false;
    const observerId = stringify([
      "watchContractEvent",
      address,
      args,
      batch,
      client.uid,
      eventName,
      pollingInterval,
      strict,
      fromBlock
    ]);
    return observe(observerId, { onLogs, onError }, (emit) => {
      let previousBlockNumber;
      if (fromBlock !== void 0)
        previousBlockNumber = fromBlock - 1n;
      let filter;
      let initialized = false;
      const unwatch = poll(async () => {
        if (!initialized) {
          try {
            filter = await getAction(client, createContractEventFilter, "createContractEventFilter")({
              abi: abi2,
              address,
              args,
              eventName,
              strict,
              fromBlock
            });
          } catch {
          }
          initialized = true;
          return;
        }
        try {
          let logs;
          if (filter) {
            logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          } else {
            const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
            if (previousBlockNumber && previousBlockNumber < blockNumber) {
              logs = await getAction(client, getContractEvents, "getContractEvents")({
                abi: abi2,
                address,
                args,
                eventName,
                fromBlock: previousBlockNumber + 1n,
                toBlock: blockNumber,
                strict
              });
            } else {
              logs = [];
            }
            previousBlockNumber = blockNumber;
          }
          if (logs.length === 0)
            return;
          if (batch)
            emit.onLogs(logs);
          else
            for (const log of logs)
              emit.onLogs([log]);
        } catch (err) {
          if (filter && err instanceof InvalidInputRpcError)
            initialized = false;
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribeContractEvent = () => {
    const strict = strict_ ?? false;
    const observerId = stringify([
      "watchContractEvent",
      address,
      args,
      batch,
      client.uid,
      eventName,
      pollingInterval,
      strict
    ]);
    let active = true;
    let unsubscribe = () => active = false;
    return observe(observerId, { onLogs, onError }, (emit) => {
      ;
      (async () => {
        try {
          const transport = (() => {
            if (client.transport.type === "fallback") {
              const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
              if (!transport2)
                return client.transport;
              return transport2.value;
            }
            return client.transport;
          })();
          const topics = eventName ? encodeEventTopics({
            abi: abi2,
            eventName,
            args
          }) : [];
          const { unsubscribe: unsubscribe_ } = await transport.subscribe({
            params: ["logs", { address, topics }],
            onData(data) {
              if (!active)
                return;
              const log = data.result;
              try {
                const { eventName: eventName2, args: args2 } = decodeEventLog({
                  abi: abi2,
                  data: log.data,
                  topics: log.topics,
                  strict: strict_
                });
                const formatted = formatLog(log, {
                  args: args2,
                  eventName: eventName2
                });
                emit.onLogs([formatted]);
              } catch (err) {
                let eventName2;
                let isUnnamed;
                if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
                  if (strict_)
                    return;
                  eventName2 = err.abiItem.name;
                  isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
                }
                const formatted = formatLog(log, {
                  args: isUnnamed ? [] : {},
                  eventName: eventName2
                });
                emit.onLogs([formatted]);
              }
            },
            onError(error) {
              emit.onError?.(error);
            }
          });
          unsubscribe = unsubscribe_;
          if (!active)
            unsubscribe();
        } catch (err) {
          onError?.(err);
        }
      })();
      return () => unsubscribe();
    });
  };
  return enablePolling ? pollContractEvent() : subscribeContractEvent();
}

// node_modules/viem/_esm/errors/account.js
init_base();
var AccountNotFoundError = class extends BaseError2 {
  constructor({ docsPath: docsPath8 } = {}) {
    super([
      "Could not find an Account to execute with this Action.",
      "Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the Client."
    ].join("\n"), {
      docsPath: docsPath8,
      docsSlug: "account",
      name: "AccountNotFoundError"
    });
  }
};

// node_modules/viem/_esm/actions/wallet/sendRawTransaction.js
async function sendRawTransaction(client, { serializedTransaction }) {
  return client.request({
    method: "eth_sendRawTransaction",
    params: [serializedTransaction]
  }, { retryCount: 0 });
}

// node_modules/viem/_esm/utils/promise/withRetry.js
init_utils3();
function withRetry(fn, { delay: delay_ = 100, retryCount = 2, shouldRetry: shouldRetry2 = () => true, signal } = {}) {
  return new Promise((resolve, reject) => {
    const attemptRetry = async ({ count = 0 } = {}) => {
      if (signal?.aborted) {
        reject(getAbortError(signal));
        return;
      }
      const retry = async ({ error }) => {
        const delay = typeof delay_ === "function" ? delay_({ count, error }) : delay_;
        if (delay) {
          try {
            await wait(delay, { signal });
          } catch (err) {
            reject(err);
            return;
          }
        }
        return attemptRetry({ count: count + 1 });
      };
      try {
        const data = await fn();
        resolve(data);
      } catch (err) {
        if (signal?.aborted) {
          reject(getAbortError(signal));
          return;
        }
        if (isAbortError(err)) {
          reject(err);
          return;
        }
        if (count < retryCount && await shouldRetry2({ count, error: err }))
          return retry({ error: err });
        reject(err);
      }
    };
    void attemptRetry().catch(reject);
  });
}

// node_modules/viem/_esm/utils/formatters/transactionReceipt.js
init_fromHex();
var receiptStatuses = {
  "0x0": "reverted",
  "0x1": "success"
};
function formatTransactionReceipt(transactionReceipt, _) {
  const receipt = {
    ...transactionReceipt,
    blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
    contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
    cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
    effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
    gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
    logs: transactionReceipt.logs ? transactionReceipt.logs.map((log) => formatLog(log)) : null,
    to: transactionReceipt.to ? transactionReceipt.to : null,
    transactionIndex: transactionReceipt.transactionIndex ? hexToNumber(transactionReceipt.transactionIndex) : null,
    status: transactionReceipt.status ? receiptStatuses[transactionReceipt.status] : null,
    type: transactionReceipt.type ? transactionType[transactionReceipt.type] || transactionReceipt.type : null
  };
  if (transactionReceipt.blobGasPrice)
    receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
  if (transactionReceipt.blobGasUsed)
    receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
  return receipt;
}

// node_modules/viem/_esm/clients/createClient.js
init_parseAccount();

// node_modules/viem/_esm/utils/uid.js
var size4 = 256;
var index = size4;
var buffer;
function uid(length = 11) {
  if (!buffer || index + length > size4 * 2) {
    buffer = "";
    index = 0;
    for (let i = 0; i < size4; i++) {
      buffer += (256 + Math.random() * 256 | 0).toString(16).substring(1);
    }
  }
  return buffer.substring(index, index++ + length);
}

// node_modules/viem/_esm/clients/createClient.js
function createClient(parameters) {
  const { batch, chain, ccipRead, dataSuffix, key = "base", name = "Base Client", tokens, type = "base" } = parameters;
  const experimental_blockTag = parameters.experimental_blockTag ?? (typeof chain?.experimental_preconfirmationTime === "number" ? "pending" : void 0);
  const blockTime = chain?.blockTime ?? 12e3;
  const defaultPollingInterval = Math.min(Math.max(Math.floor(blockTime / 2), 500), 4e3);
  const pollingInterval = parameters.pollingInterval ?? defaultPollingInterval;
  const cacheTime = parameters.cacheTime ?? pollingInterval;
  const account = parameters.account ? parseAccount(parameters.account) : void 0;
  const { config, request, value } = parameters.transport({
    account,
    chain,
    pollingInterval
  });
  const transport = { ...config, ...value };
  const client = {
    account,
    batch,
    cacheTime,
    ccipRead,
    chain,
    dataSuffix,
    key,
    name,
    pollingInterval,
    request,
    tokens,
    transport,
    type,
    uid: uid(),
    ...experimental_blockTag ? { experimental_blockTag } : {}
  };
  function extend(base) {
    return (extendFn) => {
      const extended = extendFn(base);
      for (const key2 in client)
        delete extended[key2];
      const combined = { ...base, ...extended };
      for (const key2 in extended) {
        const a = base[key2];
        const b = extended[key2];
        if (isPlainObject(a) && isPlainObject(b))
          combined[key2] = { ...a, ...b };
      }
      return Object.assign(combined, { extend: extend(combined) });
    };
  }
  return Object.assign(client, { extend: extend(client) });
}
function isPlainObject(value) {
  if (typeof value !== "object" || value === null)
    return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}
function bindActionDecorators(client, action) {
  const wrapped = (parameters = {}) => action(client, parameters);
  for (const key of [
    "call",
    "calls",
    "callWithPeriod",
    "estimateGas",
    "prepare",
    "prepareRecipient",
    "predict",
    "simulate"
  ])
    if (Object.hasOwn(action, key)) {
      const helper = action[key];
      wrapped[key] = (args = {}) => {
        if (helper.length === 1)
          return helper(args);
        return helper(client, args);
      };
    }
  for (const key of ["extractEvent", "extractEvents"])
    if (Object.hasOwn(action, key))
      wrapped[key] = action[key];
  return wrapped;
}

// node_modules/viem/_esm/actions/ens/getEnsAddress.js
init_abis();
init_decodeFunctionResult();
init_encodeFunctionData();
init_getAddress();
init_getChainContractAddress();
init_size();
init_trim();
init_toHex();

// node_modules/viem/_esm/utils/ens/errors.js
init_base();
init_contract();
function isNullUniversalResolverError(err) {
  if (!(err instanceof BaseError2))
    return false;
  const cause = err.walk((e) => e instanceof ContractFunctionRevertedError);
  if (!(cause instanceof ContractFunctionRevertedError))
    return false;
  if (cause.data?.errorName === "HttpError")
    return true;
  if (cause.data?.errorName === "ResolverError")
    return true;
  if (cause.data?.errorName === "ResolverNotContract")
    return true;
  if (cause.data?.errorName === "ResolverNotFound")
    return true;
  if (cause.data?.errorName === "ReverseAddressMismatch")
    return true;
  if (cause.data?.errorName === "UnsupportedResolverProfile")
    return true;
  return false;
}

// node_modules/viem/_esm/actions/ens/getEnsAddress.js
init_localBatchGatewayRequest();

// node_modules/viem/_esm/utils/ens/namehash.js
init_concat();
init_toBytes();
init_toHex();
init_keccak256();

// node_modules/viem/_esm/utils/ens/encodedLabelToLabelhash.js
init_isHex();
function encodedLabelToLabelhash(label) {
  if (label.length !== 66)
    return null;
  if (label.indexOf("[") !== 0)
    return null;
  if (label.indexOf("]") !== 65)
    return null;
  const hash3 = `0x${label.slice(1, 65)}`;
  if (!isHex(hash3))
    return null;
  return hash3;
}

// node_modules/viem/_esm/utils/ens/namehash.js
function namehash(name) {
  let result = new Uint8Array(32).fill(0);
  if (!name)
    return bytesToHex(result);
  const labels = name.split(".");
  for (let i = labels.length - 1; i >= 0; i -= 1) {
    const hashFromEncodedLabel = encodedLabelToLabelhash(labels[i]);
    const hashed = hashFromEncodedLabel ? toBytes(hashFromEncodedLabel) : keccak256(stringToBytes(labels[i]), "bytes");
    result = keccak256(concat([result, hashed]), "bytes");
  }
  return bytesToHex(result);
}

// node_modules/viem/_esm/utils/ens/packetToBytes.js
init_toBytes();

// node_modules/viem/_esm/utils/ens/encodeLabelhash.js
function encodeLabelhash(hash3) {
  return `[${hash3.slice(2)}]`;
}

// node_modules/viem/_esm/utils/ens/labelhash.js
init_toBytes();
init_toHex();
init_keccak256();
function labelhash(label) {
  const result = new Uint8Array(32).fill(0);
  if (!label)
    return bytesToHex(result);
  return encodedLabelToLabelhash(label) || keccak256(stringToBytes(label));
}

// node_modules/viem/_esm/utils/ens/packetToBytes.js
function packetToBytes(packet) {
  const value = packet.replace(/^\.|\.$/gm, "");
  if (value.length === 0)
    return new Uint8Array(1);
  const bytes = new Uint8Array(stringToBytes(value).byteLength + 2);
  let offset = 0;
  const list = value.split(".");
  for (let i = 0; i < list.length; i++) {
    let encoded = stringToBytes(list[i]);
    if (encoded.byteLength > 255)
      encoded = stringToBytes(encodeLabelhash(labelhash(list[i])));
    bytes[offset] = encoded.length;
    bytes.set(encoded, offset + 1);
    offset += encoded.length + 1;
  }
  if (bytes.byteLength !== offset + 1)
    return bytes.slice(0, offset + 1);
  return bytes;
}

// node_modules/viem/_esm/actions/ens/getEnsAddress.js
async function getEnsAddress(client, parameters) {
  const { blockNumber, blockTag, coinType, name, gatewayUrls, strict } = parameters;
  const { chain } = client;
  const universalResolverAddress = (() => {
    if (parameters.universalResolverAddress)
      return parameters.universalResolverAddress;
    if (!chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    return getChainContractAddress({
      blockNumber,
      chain,
      contract: "ensUniversalResolver"
    });
  })();
  const tlds = chain?.ensTlds;
  if (tlds && !tlds.some((tld) => name.endsWith(tld)))
    return null;
  const args = (() => {
    if (coinType != null)
      return [namehash(name), BigInt(coinType)];
    return [namehash(name)];
  })();
  try {
    const functionData = encodeFunctionData({
      abi: addressResolverAbi,
      functionName: "addr",
      args
    });
    const readContractParameters = {
      address: universalResolverAddress,
      abi: universalResolverResolveAbi,
      functionName: "resolveWithGateways",
      args: [
        toHex(packetToBytes(name)),
        functionData,
        gatewayUrls ?? [localBatchGatewayUrl]
      ],
      blockNumber,
      blockTag
    };
    const readContractAction = getAction(client, readContract, "readContract");
    const res = await readContractAction(readContractParameters);
    if (res[0] === "0x")
      return null;
    const address = decodeAddress2({ coinType, data: res[0], args });
    if (address === "0x")
      return null;
    if (trim(address) === "0x00")
      return null;
    return address;
  } catch (err) {
    if (strict)
      throw err;
    if (isNullUniversalResolverError(err))
      return null;
    throw err;
  }
}
function decodeAddress2({ coinType, data, args }) {
  try {
    return decodeFunctionResult({
      abi: addressResolverAbi,
      args,
      functionName: "addr",
      data
    });
  } catch (err) {
    if (coinType == null)
      throw err;
    const address = trim(data);
    if (size(address) === 20)
      return getAddress(address);
    throw err;
  }
}

// node_modules/viem/_esm/errors/ens.js
init_base();
var EnsAvatarInvalidMetadataError = class extends BaseError2 {
  constructor({ data }) {
    super("Unable to extract image from metadata. The metadata may be malformed or invalid.", {
      metaMessages: [
        "- Metadata must be a JSON object with at least an `image`, `image_url` or `image_data` property.",
        "",
        `Provided data: ${JSON.stringify(data)}`
      ],
      name: "EnsAvatarInvalidMetadataError"
    });
  }
};
var EnsAvatarInvalidNftUriError = class extends BaseError2 {
  constructor({ reason }) {
    super(`ENS NFT avatar URI is invalid. ${reason}`, {
      name: "EnsAvatarInvalidNftUriError"
    });
  }
};
var EnsAvatarUriResolutionError = class extends BaseError2 {
  constructor({ uri }) {
    super(`Unable to resolve ENS avatar URI "${uri}". The URI may be malformed, invalid, or does not respond with a valid image.`, { name: "EnsAvatarUriResolutionError" });
  }
};
var EnsAvatarUnsupportedNamespaceError = class extends BaseError2 {
  constructor({ namespace }) {
    super(`ENS NFT avatar namespace "${namespace}" is not supported. Must be "erc721" or "erc1155".`, { name: "EnsAvatarUnsupportedNamespaceError" });
  }
};

// node_modules/viem/_esm/utils/ens/avatar/utils.js
var networkRegex = /(?<protocol>https?:\/\/[^/]*|ipfs:\/|ipns:\/|ar:\/)?(?<root>\/)?(?<subpath>ipfs\/|ipns\/)?(?<target>[\w\-.]+)(?<subtarget>\/.*)?/;
var ipfsHashRegex = /^(Qm[1-9A-HJ-NP-Za-km-z]{44,}|b[A-Za-z2-7]{58,}|B[A-Z2-7]{58,}|z[1-9A-HJ-NP-Za-km-z]{48,}|F[0-9A-F]{50,})(\/(?<target>[\w\-.]+))?(?<subtarget>\/.*)?$/;
var base64Regex = /^data:([a-zA-Z\-/+]*);base64,([^"].*)/;
var dataURIRegex = /^data:([a-zA-Z\-/+]*)?(;[a-zA-Z0-9].*?)?(,)/;
async function isImageUri(uri) {
  try {
    const res = await fetch(uri, { method: "HEAD" });
    if (res.status === 200) {
      const contentType = res.headers.get("content-type");
      return contentType?.startsWith("image/");
    }
    return false;
  } catch (error) {
    if (typeof error === "object" && typeof error.response !== "undefined") {
      return false;
    }
    if (!Object.hasOwn(globalThis, "Image"))
      return false;
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve(true);
      };
      img.onerror = () => {
        resolve(false);
      };
      img.src = uri;
    });
  }
}
function getGateway(custom, defaultGateway) {
  if (!custom)
    return defaultGateway;
  if (custom.endsWith("/"))
    return custom.slice(0, -1);
  return custom;
}
function resolveAvatarUri({ uri, gatewayUrls }) {
  const isEncoded = base64Regex.test(uri);
  if (isEncoded)
    return { uri, isOnChain: true, isEncoded };
  const ipfsGateway = getGateway(gatewayUrls?.ipfs, "https://ipfs.io");
  const arweaveGateway = getGateway(gatewayUrls?.arweave, "https://arweave.net");
  const networkRegexMatch = uri.match(networkRegex);
  const { protocol, subpath, target, subtarget = "" } = networkRegexMatch?.groups || {};
  const isIPNS = protocol === "ipns:/" || subpath === "ipns/";
  const isIPFS = protocol === "ipfs:/" || subpath === "ipfs/" || ipfsHashRegex.test(uri);
  if (uri.startsWith("http") && !isIPNS && !isIPFS) {
    let replacedUri = uri;
    if (gatewayUrls?.arweave)
      replacedUri = uri.replace(/https:\/\/arweave.net/g, gatewayUrls?.arweave);
    return { uri: replacedUri, isOnChain: false, isEncoded: false };
  }
  if ((isIPNS || isIPFS) && target) {
    return {
      uri: `${ipfsGateway}/${isIPNS ? "ipns" : "ipfs"}/${target}${subtarget}`,
      isOnChain: false,
      isEncoded: false
    };
  }
  if (protocol === "ar:/" && target) {
    return {
      uri: `${arweaveGateway}/${target}${subtarget || ""}`,
      isOnChain: false,
      isEncoded: false
    };
  }
  let parsedUri = uri.replace(dataURIRegex, "");
  if (parsedUri.startsWith("<svg")) {
    parsedUri = `data:image/svg+xml;base64,${btoa(parsedUri)}`;
  }
  if (parsedUri.startsWith("data:") || parsedUri.startsWith("{")) {
    return {
      uri: parsedUri,
      isOnChain: true,
      isEncoded: false
    };
  }
  throw new EnsAvatarUriResolutionError({ uri });
}
function getJsonImage(data) {
  if (typeof data !== "object" || !("image" in data) && !("image_url" in data) && !("image_data" in data)) {
    throw new EnsAvatarInvalidMetadataError({ data });
  }
  return data.image || data.image_url || data.image_data;
}
async function getMetadataAvatarUri({ gatewayUrls, uri }) {
  try {
    const res = await fetch(uri).then((res2) => res2.json());
    const image = await parseAvatarUri({
      gatewayUrls,
      uri: getJsonImage(res)
    });
    return image;
  } catch {
    throw new EnsAvatarUriResolutionError({ uri });
  }
}
async function parseAvatarUri({ gatewayUrls, uri }) {
  const { uri: resolvedURI, isOnChain } = resolveAvatarUri({ uri, gatewayUrls });
  if (isOnChain)
    return resolvedURI;
  const isImage = await isImageUri(resolvedURI);
  if (isImage)
    return resolvedURI;
  throw new EnsAvatarUriResolutionError({ uri });
}
function parseNftUri(uri_) {
  let uri = uri_;
  if (uri.startsWith("did:nft:")) {
    uri = uri.replace("did:nft:", "").replace(/_/g, "/");
  }
  const [reference, asset_namespace, tokenID] = uri.split("/");
  const [eip_namespace, chainID] = reference.split(":");
  const [erc_namespace, contractAddress] = asset_namespace.split(":");
  if (!eip_namespace || eip_namespace.toLowerCase() !== "eip155")
    throw new EnsAvatarInvalidNftUriError({ reason: "Only EIP-155 supported" });
  if (!chainID)
    throw new EnsAvatarInvalidNftUriError({ reason: "Chain ID not found" });
  if (!contractAddress)
    throw new EnsAvatarInvalidNftUriError({
      reason: "Contract address not found"
    });
  if (!tokenID)
    throw new EnsAvatarInvalidNftUriError({ reason: "Token ID not found" });
  if (!erc_namespace)
    throw new EnsAvatarInvalidNftUriError({ reason: "ERC namespace not found" });
  return {
    chainID: Number.parseInt(chainID, 10),
    namespace: erc_namespace.toLowerCase(),
    contractAddress,
    tokenID
  };
}
async function getNftTokenUri(client, { nft }) {
  if (nft.namespace === "erc721") {
    return readContract(client, {
      address: nft.contractAddress,
      abi: [
        {
          name: "tokenURI",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "tokenId", type: "uint256" }],
          outputs: [{ name: "", type: "string" }]
        }
      ],
      functionName: "tokenURI",
      args: [BigInt(nft.tokenID)]
    });
  }
  if (nft.namespace === "erc1155") {
    return readContract(client, {
      address: nft.contractAddress,
      abi: [
        {
          name: "uri",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "_id", type: "uint256" }],
          outputs: [{ name: "", type: "string" }]
        }
      ],
      functionName: "uri",
      args: [BigInt(nft.tokenID)]
    });
  }
  throw new EnsAvatarUnsupportedNamespaceError({ namespace: nft.namespace });
}

// node_modules/viem/_esm/utils/ens/avatar/parseAvatarRecord.js
async function parseAvatarRecord(client, { gatewayUrls, record: record2 }) {
  if (/eip155:/i.test(record2))
    return parseNftAvatarUri(client, { gatewayUrls, record: record2 });
  return parseAvatarUri({ uri: record2, gatewayUrls });
}
async function parseNftAvatarUri(client, { gatewayUrls, record: record2 }) {
  const nft = parseNftUri(record2);
  const nftUri = await getNftTokenUri(client, { nft });
  const { uri: resolvedNftUri, isOnChain, isEncoded } = resolveAvatarUri({ uri: nftUri, gatewayUrls });
  if (isOnChain && (resolvedNftUri.includes("data:application/json;base64,") || resolvedNftUri.startsWith("{"))) {
    const encodedJson = isEncoded ? (
      // if it is encoded, decode it
      atob(resolvedNftUri.replace("data:application/json;base64,", ""))
    ) : (
      // if it isn't encoded assume it is a JSON string, but it could be anything (it will error if it is)
      resolvedNftUri
    );
    const decoded = JSON.parse(encodedJson);
    return parseAvatarUri({ uri: getJsonImage(decoded), gatewayUrls });
  }
  let uriTokenId = nft.tokenID;
  if (nft.namespace === "erc1155")
    uriTokenId = uriTokenId.replace("0x", "").padStart(64, "0");
  return getMetadataAvatarUri({
    gatewayUrls,
    uri: resolvedNftUri.replace(/(?:0x)?{id}/, uriTokenId)
  });
}

// node_modules/viem/_esm/actions/ens/getEnsText.js
init_abis();
init_decodeFunctionResult();
init_encodeFunctionData();
init_getChainContractAddress();
init_toHex();
init_localBatchGatewayRequest();
async function getEnsText(client, parameters) {
  const { blockNumber, blockTag, key, name, gatewayUrls, strict } = parameters;
  const { chain } = client;
  const universalResolverAddress = (() => {
    if (parameters.universalResolverAddress)
      return parameters.universalResolverAddress;
    if (!chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    return getChainContractAddress({
      blockNumber,
      chain,
      contract: "ensUniversalResolver"
    });
  })();
  const tlds = chain?.ensTlds;
  if (tlds && !tlds.some((tld) => name.endsWith(tld)))
    return null;
  try {
    const readContractParameters = {
      address: universalResolverAddress,
      abi: universalResolverResolveAbi,
      args: [
        toHex(packetToBytes(name)),
        encodeFunctionData({
          abi: textResolverAbi,
          functionName: "text",
          args: [namehash(name), key]
        }),
        gatewayUrls ?? [localBatchGatewayUrl]
      ],
      functionName: "resolveWithGateways",
      blockNumber,
      blockTag
    };
    const readContractAction = getAction(client, readContract, "readContract");
    const res = await readContractAction(readContractParameters);
    if (res[0] === "0x")
      return null;
    const record2 = decodeFunctionResult({
      abi: textResolverAbi,
      functionName: "text",
      data: res[0]
    });
    return record2 === "" ? null : record2;
  } catch (err) {
    if (strict)
      throw err;
    if (isNullUniversalResolverError(err))
      return null;
    throw err;
  }
}

// node_modules/viem/_esm/actions/ens/getEnsAvatar.js
async function getEnsAvatar(client, { blockNumber, blockTag, assetGatewayUrls, name, gatewayUrls, strict, universalResolverAddress }) {
  const record2 = await getAction(client, getEnsText, "getEnsText")({
    blockNumber,
    blockTag,
    key: "avatar",
    name,
    universalResolverAddress,
    gatewayUrls,
    strict
  });
  if (!record2)
    return null;
  try {
    return await parseAvatarRecord(client, {
      record: record2,
      gatewayUrls: assetGatewayUrls
    });
  } catch {
    return null;
  }
}

// node_modules/viem/_esm/actions/ens/getEnsName.js
init_abis();
init_getChainContractAddress();
init_localBatchGatewayRequest();
async function getEnsName(client, parameters) {
  const { address, blockNumber, blockTag, coinType = 60n, gatewayUrls, strict } = parameters;
  const { chain } = client;
  const universalResolverAddress = (() => {
    if (parameters.universalResolverAddress)
      return parameters.universalResolverAddress;
    if (!chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    return getChainContractAddress({
      blockNumber,
      chain,
      contract: "ensUniversalResolver"
    });
  })();
  try {
    const readContractParameters = {
      address: universalResolverAddress,
      abi: universalResolverReverseAbi,
      args: [address, coinType, gatewayUrls ?? [localBatchGatewayUrl]],
      functionName: "reverseWithGateways",
      blockNumber,
      blockTag
    };
    const readContractAction = getAction(client, readContract, "readContract");
    const [name] = await readContractAction(readContractParameters);
    return name || null;
  } catch (err) {
    if (strict)
      throw err;
    if (isNullUniversalResolverError(err))
      return null;
    throw err;
  }
}

// node_modules/viem/_esm/actions/ens/getEnsResolver.js
init_getChainContractAddress();
init_toHex();
async function getEnsResolver(client, parameters) {
  const { blockNumber, blockTag, name } = parameters;
  const { chain } = client;
  const universalResolverAddress = (() => {
    if (parameters.universalResolverAddress)
      return parameters.universalResolverAddress;
    if (!chain)
      throw new Error("client chain not configured. universalResolverAddress is required.");
    return getChainContractAddress({
      blockNumber,
      chain,
      contract: "ensUniversalResolver"
    });
  })();
  const tlds = chain?.ensTlds;
  if (tlds && !tlds.some((tld) => name.endsWith(tld)))
    throw new Error(`${name} is not a valid ENS TLD (${tlds?.join(", ")}) for chain "${chain.name}" (id: ${chain.id}).`);
  const [resolverAddress] = await getAction(client, readContract, "readContract")({
    address: universalResolverAddress,
    abi: [
      {
        inputs: [{ type: "bytes" }],
        name: "findResolver",
        outputs: [
          { type: "address" },
          { type: "bytes32" },
          { type: "uint256" }
        ],
        stateMutability: "view",
        type: "function"
      }
    ],
    functionName: "findResolver",
    args: [toHex(packetToBytes(name))],
    blockNumber,
    blockTag
  });
  return resolverAddress;
}

// node_modules/viem/_esm/clients/decorators/public.js
init_call();

// node_modules/viem/_esm/actions/public/createAccessList.js
init_parseAccount();
init_base();
init_toHex();
init_getCallError();
init_extract();
init_transactionRequest();
init_assertRequest();
async function createAccessList(client, args) {
  const { account: account_ = client.account, blockNumber, blockTag = "latest", blobs, data, gas, gasPrice, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, to, value, ...rest } = args;
  const account = account_ ? parseAccount(account_) : void 0;
  try {
    assertRequest(args);
    const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
    const block = blockNumberHex || blockTag;
    const chainFormat = client.chain?.formatters?.transactionRequest?.format;
    const format2 = chainFormat || formatTransactionRequest;
    const request = format2({
      // Pick out extra data that might exist on the chain's transaction request type.
      ...extract(rest, { format: chainFormat }),
      account,
      blobs,
      data,
      gas,
      gasPrice,
      maxFeePerBlobGas,
      maxFeePerGas,
      maxPriorityFeePerGas,
      to,
      value
    }, "createAccessList");
    const response = await client.request({
      method: "eth_createAccessList",
      params: [request, block]
    });
    if (response.error)
      throw new BaseError2(response.error, { details: response.error });
    return {
      accessList: response.accessList,
      gasUsed: BigInt(response.gasUsed)
    };
  } catch (err) {
    throw getCallError(err, {
      ...args,
      account,
      chain: client.chain
    });
  }
}

// node_modules/viem/_esm/actions/public/createBlockFilter.js
async function createBlockFilter(client) {
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newBlockFilter"
  });
  const id = await client.request({
    method: "eth_newBlockFilter"
  });
  return { id, request: getRequest(id), type: "block" };
}

// node_modules/viem/_esm/actions/public/createEventFilter.js
init_toHex();
async function createEventFilter(client, { address, args, event, events: events_, fromBlock, strict, toBlock } = {}) {
  const events = events_ ?? (event ? [event] : void 0);
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newFilter"
  });
  let topics = [];
  if (events) {
    const encoded = events.flatMap((event2) => encodeEventTopics({
      abi: [event2],
      eventName: event2.name,
      args
    }));
    topics = [encoded];
    if (event)
      topics = topics[0];
  }
  const id = await client.request({
    method: "eth_newFilter",
    params: [
      {
        address,
        fromBlock: typeof fromBlock === "bigint" ? numberToHex(fromBlock) : fromBlock,
        toBlock: typeof toBlock === "bigint" ? numberToHex(toBlock) : toBlock,
        ...topics.length ? { topics } : {}
      }
    ]
  });
  return {
    abi: events,
    args,
    eventName: event ? event.name : void 0,
    fromBlock,
    id,
    request: getRequest(id),
    strict: Boolean(strict),
    toBlock,
    type: "event"
  };
}

// node_modules/viem/_esm/actions/public/createPendingTransactionFilter.js
async function createPendingTransactionFilter(client) {
  const getRequest = createFilterRequestScope(client, {
    method: "eth_newPendingTransactionFilter"
  });
  const id = await client.request({
    method: "eth_newPendingTransactionFilter"
  });
  return { id, request: getRequest(id), type: "transaction" };
}

// node_modules/viem/_esm/actions/public/getBalance.js
init_abis();
init_decodeFunctionResult();
init_encodeFunctionData();
init_formatBlockParameter();
init_call();
async function getBalance(client, { address, blockHash, blockNumber, blockTag = client.experimental_blockTag ?? "latest", requireCanonical }) {
  const block = formatBlockParameter({
    blockHash,
    blockNumber,
    blockTag,
    requireCanonical
  });
  if (client.batch?.multicall && client.chain?.contracts?.multicall3) {
    const multicall3Address = client.chain.contracts.multicall3.address;
    const calldata = encodeFunctionData({
      abi: multicall3Abi,
      functionName: "getEthBalance",
      args: [address]
    });
    const { data } = await getAction(client, call, "call")({
      to: multicall3Address,
      data: calldata,
      blockHash,
      blockNumber,
      blockTag,
      requireCanonical
    });
    return decodeFunctionResult({
      abi: multicall3Abi,
      functionName: "getEthBalance",
      args: [address],
      data: data || "0x"
    });
  }
  const balance = await client.request({
    method: "eth_getBalance",
    params: [address, block]
  });
  return BigInt(balance);
}

// node_modules/viem/_esm/actions/public/getBlobBaseFee.js
async function getBlobBaseFee(client) {
  const baseFee = await client.request({
    method: "eth_blobBaseFee"
  });
  return BigInt(baseFee);
}

// node_modules/viem/_esm/actions/public/getBlockReceipts.js
init_toHex();
async function getBlockReceipts(client, { blockHash, blockNumber, blockTag = client.experimental_blockTag ?? "latest" } = {}) {
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  const receipts = await client.request({
    method: "eth_getBlockReceipts",
    params: [blockHash || blockNumberHex || blockTag]
  }, { dedupe: Boolean(blockHash || blockNumberHex) });
  if (!receipts)
    throw new BlockNotFoundError({ blockHash, blockNumber });
  const format2 = client.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt;
  return receipts.map((receipt) => format2(receipt, "getBlockReceipts"));
}

// node_modules/viem/_esm/actions/public/getBlockTransactionCount.js
init_fromHex();
init_toHex();
async function getBlockTransactionCount(client, { blockHash, blockNumber, blockTag = "latest" } = {}) {
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  let count;
  if (blockHash) {
    count = await client.request({
      method: "eth_getBlockTransactionCountByHash",
      params: [blockHash]
    }, { dedupe: true });
  } else {
    count = await client.request({
      method: "eth_getBlockTransactionCountByNumber",
      params: [blockNumberHex || blockTag]
    }, { dedupe: Boolean(blockNumberHex) });
  }
  return hexToNumber(count);
}

// node_modules/viem/_esm/actions/public/getCode.js
init_formatBlockParameter();
async function getCode(client, { address, blockHash, blockNumber, blockTag = "latest", requireCanonical }) {
  const block = formatBlockParameter({
    blockHash,
    blockNumber,
    blockTag,
    requireCanonical
  });
  const hex = await client.request({
    method: "eth_getCode",
    params: [address, block]
  }, {
    dedupe: typeof blockNumber === "bigint" || blockHash !== void 0
  });
  if (hex === "0x")
    return void 0;
  return hex;
}

// node_modules/viem/_esm/actions/public/getDelegation.js
init_getAddress();
init_size();
init_slice();
async function getDelegation(client, { address, blockNumber, blockTag = "latest" }) {
  const code = await getCode(client, {
    address,
    ...blockNumber !== void 0 ? { blockNumber } : { blockTag }
  });
  if (!code)
    return void 0;
  if (size(code) !== 23)
    return void 0;
  if (!code.startsWith("0xef0100"))
    return void 0;
  return getAddress(slice(code, 3, 23));
}

// node_modules/viem/_esm/errors/eip712.js
init_base();
var Eip712DomainNotFoundError = class extends BaseError2 {
  constructor({ address }) {
    super(`No EIP-712 domain found on contract "${address}".`, {
      metaMessages: [
        "Ensure that:",
        `- The contract is deployed at the address "${address}".`,
        "- `eip712Domain()` function exists on the contract.",
        "- `eip712Domain()` function matches signature to ERC-5267 specification."
      ],
      name: "Eip712DomainNotFoundError"
    });
  }
};

// node_modules/viem/_esm/actions/public/getEip712Domain.js
async function getEip712Domain(client, parameters) {
  const { address, factory, factoryData } = parameters;
  try {
    const [fields, name, version4, chainId, verifyingContract, salt, extensions] = await getAction(client, readContract, "readContract")({
      abi,
      address,
      functionName: "eip712Domain",
      factory,
      factoryData
    });
    return {
      domain: {
        name,
        version: version4,
        chainId: Number(chainId),
        verifyingContract,
        salt
      },
      extensions,
      fields
    };
  } catch (e) {
    const error = e;
    if (error.name === "ContractFunctionExecutionError" && error.cause.name === "ContractFunctionZeroDataError") {
      throw new Eip712DomainNotFoundError({ address });
    }
    throw error;
  }
}
var abi = [
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      { name: "fields", type: "bytes1" },
      { name: "name", type: "string" },
      { name: "version", type: "string" },
      { name: "chainId", type: "uint256" },
      { name: "verifyingContract", type: "address" },
      { name: "salt", type: "bytes32" },
      { name: "extensions", type: "uint256[]" }
    ],
    stateMutability: "view",
    type: "function"
  }
];

// node_modules/viem/_esm/actions/public/getFeeHistory.js
init_toHex();

// node_modules/viem/_esm/utils/formatters/feeHistory.js
function formatFeeHistory(feeHistory) {
  return {
    baseFeePerGas: feeHistory.baseFeePerGas.map((value) => BigInt(value)),
    gasUsedRatio: feeHistory.gasUsedRatio,
    oldestBlock: BigInt(feeHistory.oldestBlock),
    reward: feeHistory.reward?.map((reward) => reward.map((value) => BigInt(value)))
  };
}

// node_modules/viem/_esm/actions/public/getFeeHistory.js
async function getFeeHistory(client, { blockCount, blockNumber, blockTag = "latest", rewardPercentiles }) {
  const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
  const feeHistory = await client.request({
    method: "eth_feeHistory",
    params: [
      numberToHex(blockCount),
      blockNumberHex || blockTag,
      rewardPercentiles
    ]
  }, { dedupe: Boolean(blockNumberHex) });
  return formatFeeHistory(feeHistory);
}

// node_modules/viem/_esm/actions/public/getFilterLogs.js
async function getFilterLogs(_client, { filter }) {
  const strict = filter.strict ?? false;
  const logs = await filter.request({
    method: "eth_getFilterLogs",
    params: [filter.id]
  });
  const formattedLogs = logs.map((log) => formatLog(log));
  if (!filter.abi)
    return formattedLogs;
  return parseEventLogs({
    abi: filter.abi,
    logs: formattedLogs,
    strict
  });
}

// node_modules/viem/_esm/actions/public/getProof.js
init_formatBlockParameter();

// node_modules/viem/_esm/utils/index.js
init_encodeFunctionData();

// node_modules/viem/_esm/utils/authorization/verifyAuthorization.js
init_getAddress();
init_isAddressEqual();
async function verifyAuthorization({ address, authorization, signature }) {
  return isAddressEqual(getAddress(address), await recoverAuthorizationAddress({
    authorization,
    signature
  }));
}

// node_modules/viem/_esm/utils/buildRequest.js
init_base();
init_request();
init_rpc();
init_utils3();

// node_modules/viem/_esm/utils/promise/withDedupe.js
init_lru();
var promiseCache2 = /* @__PURE__ */ new LruMap(8192);
function withDedupe(fn, { enabled = true, id }) {
  if (!enabled || !id)
    return fn();
  if (promiseCache2.get(id))
    return promiseCache2.get(id);
  const promise = fn().finally(() => promiseCache2.delete(id));
  promiseCache2.set(id, promise);
  return promise;
}

// node_modules/viem/_esm/utils/buildRequest.js
init_stringify();
function buildRequest(request, options = {}) {
  return async (args, overrideOptions = {}) => {
    const { dedupe = false, methods, retryDelay = 150, retryCount = 3, signal, uid: uid2 } = {
      ...options,
      ...overrideOptions
    };
    const { method } = args;
    if (methods?.exclude?.includes(method))
      throw new MethodNotSupportedRpcError(new Error("method not supported"), {
        method
      });
    if (methods?.include && !methods.include.includes(method))
      throw new MethodNotSupportedRpcError(new Error("method not supported"), {
        method
      });
    if (signal?.aborted)
      throw getAbortError(signal);
    const requestId = dedupe ? hashString(`${uid2}.${stringify(args)}`) : void 0;
    return withDedupe(() => withRetry(async () => {
      try {
        return await request(args, signal ? { signal } : void 0);
      } catch (err_) {
        if (signal?.aborted)
          throw getAbortError(signal);
        if (isAbortError(err_))
          throw err_;
        const err = err_;
        switch (err.code) {
          // -32700
          case ParseRpcError.code:
            throw new ParseRpcError(err);
          // -32600
          case InvalidRequestRpcError.code:
            throw new InvalidRequestRpcError(err);
          // -32601
          case MethodNotFoundRpcError.code:
            throw new MethodNotFoundRpcError(err, { method: args.method });
          // -32602
          case InvalidParamsRpcError.code:
            throw new InvalidParamsRpcError(err);
          // -32603
          case InternalRpcError.code:
            throw new InternalRpcError(err);
          // -32000
          case InvalidInputRpcError.code:
            throw new InvalidInputRpcError(err);
          // -32001
          case ResourceNotFoundRpcError.code:
            throw new ResourceNotFoundRpcError(err);
          // -32002
          case ResourceUnavailableRpcError.code:
            throw new ResourceUnavailableRpcError(err);
          // -32003
          case TransactionRejectedRpcError.code:
            throw new TransactionRejectedRpcError(err);
          // -32004
          case MethodNotSupportedRpcError.code:
            throw new MethodNotSupportedRpcError(err, {
              method: args.method
            });
          // -32005
          case LimitExceededRpcError.code:
            throw new LimitExceededRpcError(err);
          // -32006
          case JsonRpcVersionUnsupportedError.code:
            throw new JsonRpcVersionUnsupportedError(err);
          // 4001
          case UserRejectedRequestError.code:
            throw new UserRejectedRequestError(err);
          // 4100
          case UnauthorizedProviderError.code:
            throw new UnauthorizedProviderError(err);
          // 4200
          case UnsupportedProviderMethodError.code:
            throw new UnsupportedProviderMethodError(err);
          // 4900
          case ProviderDisconnectedError.code:
            throw new ProviderDisconnectedError(err);
          // 4901
          case ChainDisconnectedError.code:
            throw new ChainDisconnectedError(err);
          // 4902
          case SwitchChainError.code:
            throw new SwitchChainError(err);
          // 5700
          case UnsupportedNonOptionalCapabilityError.code:
            throw new UnsupportedNonOptionalCapabilityError(err);
          // 5710
          case UnsupportedChainIdError.code:
            throw new UnsupportedChainIdError(err);
          // 5720
          case DuplicateIdError.code:
            throw new DuplicateIdError(err);
          // 5730
          case UnknownBundleIdError.code:
            throw new UnknownBundleIdError(err);
          // 5740
          case BundleTooLargeError.code:
            throw new BundleTooLargeError(err);
          // 5750
          case AtomicReadyWalletRejectedUpgradeError.code:
            throw new AtomicReadyWalletRejectedUpgradeError(err);
          // 5760
          case AtomicityNotSupportedError.code:
            throw new AtomicityNotSupportedError(err);
          // CAIP-25: User Rejected Error
          // https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes#rejected-caip-25
          case 5e3:
            throw new UserRejectedRequestError(err);
          // WalletConnect: Session Settlement Failed
          // https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes
          case WalletConnectSessionSettlementError.code:
            throw new WalletConnectSessionSettlementError(err);
          default:
            if (err_ instanceof BaseError2)
              throw err_;
            throw new UnknownRpcError(err);
        }
      }
    }, {
      delay: ({ count, error }) => {
        if (error && error instanceof HttpRequestError) {
          const retryAfter = error?.headers?.get("Retry-After");
          if (retryAfter?.match(/\d/))
            return Number.parseInt(retryAfter, 10) * 1e3;
        }
        return ~~(1 << count) * retryDelay;
      },
      retryCount,
      signal,
      shouldRetry: ({ error }) => shouldRetry(error)
    }), { enabled: dedupe, id: requestId });
  };
}
function shouldRetry(error) {
  if (isAbortError(error))
    return false;
  if ("code" in error && typeof error.code === "number") {
    if (error.code === -1)
      return true;
    if (error.code === LimitExceededRpcError.code)
      return true;
    if (error.code === InternalRpcError.code)
      return true;
    if (error.code === 429)
      return true;
    return false;
  }
  if (error instanceof HttpRequestError && error.status) {
    if (error.status === 403)
      return true;
    if (error.status === 408)
      return true;
    if (error.status === 413)
      return true;
    if (error.status === 429)
      return true;
    if (error.status === 500)
      return true;
    if (error.status === 502)
      return true;
    if (error.status === 503)
      return true;
    if (error.status === 504)
      return true;
    return false;
  }
  return true;
}
function hashString(str, seed = 0) {
  let h1 = 3735928559 ^ seed;
  let h2 = 1103547991 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507);
  h1 ^= Math.imul(h2 ^ h2 >>> 16, 3266489909);
  h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507);
  h2 ^= Math.imul(h1 ^ h1 >>> 16, 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

// node_modules/viem/_esm/utils/index.js
init_fromHex();

// node_modules/viem/_esm/utils/rpc/http.js
init_request();
init_utils3();

// node_modules/viem/_esm/utils/promise/withTimeout.js
init_utils3();
function withTimeout(fn, { errorInstance = new Error("timed out"), timeout, signal }) {
  return new Promise((resolve, reject) => {
    ;
    (async () => {
      let timeoutId;
      const controller = new AbortController();
      try {
        if (timeout > 0) {
          timeoutId = setTimeout(() => {
            if (signal) {
              controller.abort();
            } else {
              reject(errorInstance);
            }
          }, timeout);
        }
        resolve(await fn({ signal: controller?.signal || null }));
      } catch (err) {
        if (controller?.signal.aborted && isAbortError(err)) {
          reject(errorInstance);
          return;
        }
        reject(err);
      } finally {
        clearTimeout(timeoutId);
      }
    })();
  });
}

// node_modules/viem/_esm/utils/rpc/http.js
init_stringify();

// node_modules/viem/_esm/utils/rpc/id.js
function createIdStore() {
  return {
    current: 0,
    take() {
      return this.current++;
    },
    reset() {
      this.current = 0;
    }
  };
}
var idCache = /* @__PURE__ */ createIdStore();

// node_modules/viem/_esm/utils/rpc/http.js
var defaultMaxResponseBodySize = 10485760;
function getHttpRpcClient(url_, options = {}) {
  const { url, headers: headers_url } = parseUrl(url_);
  return {
    async request(params) {
      const { body, fetchFn = options.fetchFn ?? fetch, maxResponseBodySize = options.maxResponseBodySize ?? defaultMaxResponseBodySize, onRequest = options.onRequest, onResponse = options.onResponse, timeout = options.timeout ?? 1e4 } = params;
      const fetchOptions = {
        ...options.fetchOptions ?? {},
        ...params.fetchOptions ?? {}
      };
      const { headers, method, signal: signal_ } = fetchOptions;
      try {
        const response = await withTimeout(async ({ signal }) => {
          const init = {
            ...fetchOptions,
            body: Array.isArray(body) ? stringify(body.map((body2) => ({
              jsonrpc: "2.0",
              id: body2.id ?? idCache.take(),
              ...body2
            }))) : stringify({
              jsonrpc: "2.0",
              id: body.id ?? idCache.take(),
              ...body
            }),
            headers: {
              ...headers_url,
              "Content-Type": "application/json",
              ...headers
            },
            method: method || "POST",
            signal: signal_ || (timeout > 0 ? signal : null)
          };
          const request = new Request(url, init);
          const args = await onRequest?.(request, init) ?? { ...init, url };
          const response2 = await fetchFn(args.url ?? url, args);
          return response2;
        }, {
          errorInstance: new TimeoutError({ body, url }),
          timeout,
          signal: true
        });
        if (onResponse)
          await onResponse(response);
        let data;
        const responseBody = await readResponseBody(response, {
          maxResponseBodySize
        });
        if (response.headers.get("Content-Type")?.startsWith("application/json"))
          data = JSON.parse(responseBody);
        else {
          data = responseBody;
          try {
            data = JSON.parse(data || "{}");
          } catch (err) {
            if (response.ok)
              throw err;
            data = { error: data };
          }
        }
        if (!response.ok) {
          if (typeof data.error?.code === "number" && typeof data.error?.message === "string")
            return data;
          throw new HttpRequestError({
            body,
            details: stringify(data.error) || response.statusText,
            headers: response.headers,
            status: response.status,
            url
          });
        }
        return data;
      } catch (err) {
        if (signal_?.aborted)
          throw getAbortError(signal_);
        if (isAbortError(err))
          throw err;
        if (err instanceof HttpRequestError)
          throw err;
        if (err instanceof ResponseBodyTooLargeError)
          throw err;
        if (err instanceof TimeoutError)
          throw err;
        throw new HttpRequestError({
          body,
          cause: err,
          url
        });
      }
    }
  };
}
async function readResponseBody(response, { maxResponseBodySize }) {
  if (maxResponseBodySize === false)
    return response.text();
  const contentLength = response.headers.get("Content-Length");
  if (contentLength) {
    const size6 = Number(contentLength);
    if (size6 > maxResponseBodySize)
      throw new ResponseBodyTooLargeError({
        maxSize: maxResponseBodySize,
        size: size6
      });
  }
  if (!response.body) {
    const body2 = await response.text();
    const size6 = new TextEncoder().encode(body2).length;
    if (size6 > maxResponseBodySize)
      throw new ResponseBodyTooLargeError({
        maxSize: maxResponseBodySize,
        size: size6
      });
    return body2;
  }
  const reader = response.body.getReader();
  const decoder2 = new TextDecoder();
  let body = "";
  let size5 = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done)
        break;
      size5 += value.byteLength;
      if (size5 > maxResponseBodySize) {
        await reader.cancel();
        throw new ResponseBodyTooLargeError({
          maxSize: maxResponseBodySize,
          size: size5
        });
      }
      body += decoder2.decode(value, { stream: true });
    }
    body += decoder2.decode();
    return body;
  } finally {
    reader.releaseLock();
  }
}
function parseUrl(url_) {
  try {
    const url = new URL(url_);
    const result = (() => {
      if (url.username) {
        const credentials = `${decodeURIComponent(url.username)}:${decodeURIComponent(url.password)}`;
        url.username = "";
        url.password = "";
        return {
          url: url.toString(),
          headers: { Authorization: `Basic ${btoa(credentials)}` }
        };
      }
      return;
    })();
    return { url: url.toString(), ...result };
  } catch {
    return { url: url_ };
  }
}

// node_modules/viem/_esm/utils/signature/hashMessage.js
init_keccak256();

// node_modules/viem/_esm/constants/strings.js
var presignMessagePrefix = "Ethereum Signed Message:\n";

// node_modules/viem/_esm/utils/signature/toPrefixedMessage.js
init_concat();
init_size();
init_toHex();
function toPrefixedMessage(message_) {
  const message = (() => {
    if (typeof message_ === "string")
      return stringToHex(message_);
    if (typeof message_.raw === "string")
      return message_.raw;
    return bytesToHex(message_.raw);
  })();
  const prefix = stringToHex(`${presignMessagePrefix}${size(message)}`);
  return concat([prefix, message]);
}

// node_modules/viem/_esm/utils/signature/hashMessage.js
function hashMessage(message, to_) {
  return keccak256(toPrefixedMessage(message), to_);
}

// node_modules/viem/_esm/utils/signature/hashTypedData.js
init_encodeAbiParameters();
init_concat();
init_toHex();
init_keccak256();

// node_modules/viem/_esm/utils/typedData.js
init_abi();
init_address();

// node_modules/viem/_esm/errors/typedData.js
init_stringify();
init_base();
var InvalidDomainError = class extends BaseError2 {
  constructor({ domain }) {
    super(`Invalid domain "${stringify(domain)}".`, {
      metaMessages: ["Must be a valid EIP-712 domain."]
    });
  }
};
var InvalidPrimaryTypeError = class extends BaseError2 {
  constructor({ primaryType, types }) {
    super(`Invalid primary type \`${primaryType}\` must be one of \`${JSON.stringify(Object.keys(types))}\`.`, {
      docsPath: "/api/glossary/Errors#typeddatainvalidprimarytypeerror",
      metaMessages: ["Check that the primary type is a key in `types`."]
    });
  }
};
var InvalidStructTypeError = class extends BaseError2 {
  constructor({ type }) {
    super(`Struct type "${type}" is invalid.`, {
      metaMessages: ["Struct type must not be a Solidity type."],
      name: "InvalidStructTypeError"
    });
  }
};
var InvalidTypedDataTypeError = class extends BaseError2 {
  constructor({ type }) {
    const canonicalType = type.replace(/^(u?int)/, "$&256");
    super(`Type "${type}" is not a valid EIP-712 type.`, {
      metaMessages: [`Use "${canonicalType}" instead.`],
      name: "InvalidTypedDataTypeError"
    });
  }
};

// node_modules/viem/_esm/utils/typedData.js
init_isAddress();
init_size();
init_toHex();
init_regex2();
function validateTypedData(parameters) {
  const { domain, message, primaryType, types } = parameters;
  const validateData = (struct, data) => {
    for (const param of struct) {
      const { name, type } = param;
      const value = data[name];
      const baseType = type.replace(/(\[[0-9]*\])+$/, "");
      if (baseType === "int" || baseType === "uint")
        throw new InvalidTypedDataTypeError({ type });
      const integerMatch = type.match(integerRegex2);
      if (integerMatch && (typeof value === "number" || typeof value === "bigint")) {
        const [_type, base, size_] = integerMatch;
        numberToHex(value, {
          signed: base === "int",
          size: Number.parseInt(size_, 10) / 8
        });
      }
      if (type === "address" && typeof value === "string" && !isAddress(value))
        throw new InvalidAddressError({ address: value });
      const bytesMatch = type.match(bytesRegex2);
      if (bytesMatch) {
        const [_type, size_] = bytesMatch;
        if (size_ && size(value) !== Number.parseInt(size_, 10))
          throw new BytesSizeMismatchError({
            expectedSize: Number.parseInt(size_, 10),
            givenSize: size(value)
          });
      }
      const struct2 = types[type];
      if (struct2) {
        validateReference(type);
        validateData(struct2, value);
      }
    }
  };
  if (types.EIP712Domain && domain) {
    if (typeof domain !== "object")
      throw new InvalidDomainError({ domain });
    validateData(types.EIP712Domain, domain);
  }
  if (primaryType !== "EIP712Domain") {
    if (types[primaryType])
      validateData(types[primaryType], message);
    else
      throw new InvalidPrimaryTypeError({ primaryType, types });
  }
}
function getTypesForEIP712Domain({ domain }) {
  return [
    typeof domain?.name === "string" && { name: "name", type: "string" },
    domain?.version && { name: "version", type: "string" },
    (typeof domain?.chainId === "number" || typeof domain?.chainId === "bigint") && {
      name: "chainId",
      type: "uint256"
    },
    domain?.verifyingContract && {
      name: "verifyingContract",
      type: "address"
    },
    domain?.salt && { name: "salt", type: "bytes32" }
  ].filter(Boolean);
}
function validateReference(type) {
  if (type === "address" || type === "bool" || type === "string" || type.startsWith("bytes") || type.startsWith("uint") || type.startsWith("int"))
    throw new InvalidStructTypeError({ type });
}

// node_modules/viem/_esm/utils/signature/hashTypedData.js
function hashTypedData(parameters) {
  const { domain = {}, message, primaryType } = parameters;
  const types = {
    EIP712Domain: getTypesForEIP712Domain({ domain }),
    ...parameters.types
  };
  validateTypedData({
    domain,
    message,
    primaryType,
    types
  });
  const parts = ["0x1901"];
  if (domain)
    parts.push(hashDomain({
      domain,
      types
    }));
  if (primaryType !== "EIP712Domain")
    parts.push(hashStruct({
      data: message,
      primaryType,
      types
    }));
  return keccak256(concat(parts));
}
function hashDomain({ domain, types }) {
  return hashStruct({
    data: domain,
    primaryType: "EIP712Domain",
    types
  });
}
function hashStruct({ data, primaryType, types }) {
  const encoded = encodeData({
    data,
    primaryType,
    types
  });
  return keccak256(encoded);
}
function encodeData({ data, primaryType, types }) {
  const encodedTypes = [{ type: "bytes32" }];
  const encodedValues = [hashType({ primaryType, types })];
  for (const field of types[primaryType]) {
    const [type, value] = encodeField({
      types,
      name: field.name,
      type: field.type,
      value: data[field.name]
    });
    encodedTypes.push(type);
    encodedValues.push(value);
  }
  return encodeAbiParameters(encodedTypes, encodedValues);
}
function hashType({ primaryType, types }) {
  const encodedHashType = toHex(encodeType({ primaryType, types }));
  return keccak256(encodedHashType);
}
function encodeType({ primaryType, types }) {
  let result = "";
  const unsortedDeps = findTypeDependencies({ primaryType, types });
  unsortedDeps.delete(primaryType);
  const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
  for (const type of deps) {
    result += `${type}(${types[type].map(({ name, type: t }) => `${t} ${name}`).join(",")})`;
  }
  return result;
}
function findTypeDependencies({ primaryType: primaryType_, types }, results = /* @__PURE__ */ new Set()) {
  const match = primaryType_.match(/^\w*/u);
  const primaryType = match?.[0];
  if (results.has(primaryType) || types[primaryType] === void 0) {
    return results;
  }
  results.add(primaryType);
  for (const field of types[primaryType]) {
    findTypeDependencies({ primaryType: field.type, types }, results);
  }
  return results;
}
function encodeField({ types, name, type, value }) {
  if (types[type] !== void 0) {
    return [
      { type: "bytes32" },
      keccak256(encodeData({ data: value, primaryType: type, types }))
    ];
  }
  if (type === "bytes")
    return [{ type: "bytes32" }, keccak256(value)];
  if (type === "string")
    return [{ type: "bytes32" }, keccak256(toHex(value))];
  if (type.lastIndexOf("]") === type.length - 1) {
    const parsedType = type.slice(0, type.lastIndexOf("["));
    const typeValuePairs = value.map((item) => encodeField({
      name,
      type: parsedType,
      types,
      value: item
    }));
    return [
      { type: "bytes32" },
      keccak256(encodeAbiParameters(typeValuePairs.map(([t]) => t), typeValuePairs.map(([, v]) => v)))
    ];
  }
  return [{ type }, value];
}

// node_modules/ox/_esm/erc8010/SignatureErc8010.js
var SignatureErc8010_exports = {};
__export(SignatureErc8010_exports, {
  InvalidWrappedSignatureError: () => InvalidWrappedSignatureError,
  assert: () => assert6,
  from: () => from9,
  magicBytes: () => magicBytes,
  suffixParameters: () => suffixParameters,
  unwrap: () => unwrap,
  validate: () => validate4,
  wrap: () => wrap
});

// node_modules/ox/_esm/core/AbiParameters.js
init_exports();

// node_modules/ox/_esm/core/Address.js
init_Bytes();

// node_modules/ox/_esm/core/internal/lru.js
var LruMap2 = class extends Map {
  constructor(size5) {
    super();
    Object.defineProperty(this, "maxSize", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0
    });
    this.maxSize = size5;
  }
  get(key) {
    const value = super.get(key);
    if (super.has(key) && value !== void 0) {
      this.delete(key);
      super.set(key, value);
    }
    return value;
  }
  set(key, value) {
    super.set(key, value);
    if (this.maxSize && this.size > this.maxSize) {
      const firstKey = this.keys().next().value;
      if (firstKey)
        this.delete(firstKey);
    }
    return this;
  }
};

// node_modules/ox/_esm/core/Caches.js
var caches = {
  checksum: /* @__PURE__ */ new LruMap2(8192)
};
var checksum = caches.checksum;

// node_modules/ox/_esm/core/Address.js
init_Errors();

// node_modules/ox/_esm/core/Hash.js
init_sha3();
init_Bytes();
init_Hex();
function keccak2562(value, options = {}) {
  const { as = typeof value === "string" ? "Hex" : "Bytes" } = options;
  const bytes = keccak_256(from(value));
  if (as === "Bytes")
    return bytes;
  return fromBytes(bytes);
}

// node_modules/ox/_esm/core/PublicKey.js
init_Bytes();
init_Errors();
init_Hex();
init_Json();
function assert3(publicKey, options = {}) {
  const { compressed } = options;
  const { prefix, x, y } = publicKey;
  if (compressed === false || typeof x === "bigint" && typeof y === "bigint") {
    if (prefix !== 4)
      throw new InvalidPrefixError({
        prefix,
        cause: new InvalidUncompressedPrefixError()
      });
    return;
  }
  if (compressed === true || typeof x === "bigint" && typeof y === "undefined") {
    if (prefix !== 3 && prefix !== 2)
      throw new InvalidPrefixError({
        prefix,
        cause: new InvalidCompressedPrefixError()
      });
    return;
  }
  throw new InvalidError({ publicKey });
}
function from3(value) {
  const publicKey = (() => {
    if (validate2(value))
      return fromHex2(value);
    if (validate(value))
      return fromBytes2(value);
    const { prefix, x, y } = value;
    if (typeof x === "bigint" && typeof y === "bigint")
      return { prefix: prefix ?? 4, x, y };
    return { prefix, x };
  })();
  assert3(publicKey);
  return publicKey;
}
function fromBytes2(publicKey) {
  return fromHex2(fromBytes(publicKey));
}
function fromHex2(publicKey) {
  if (publicKey.length !== 132 && publicKey.length !== 130 && publicKey.length !== 68)
    throw new InvalidSerializedSizeError({ publicKey });
  if (publicKey.length === 130) {
    const x2 = BigInt(slice3(publicKey, 0, 32));
    const y = BigInt(slice3(publicKey, 32, 64));
    return {
      prefix: 4,
      x: x2,
      y
    };
  }
  if (publicKey.length === 132) {
    const prefix2 = Number(slice3(publicKey, 0, 1));
    const x2 = BigInt(slice3(publicKey, 1, 33));
    const y = BigInt(slice3(publicKey, 33, 65));
    return {
      prefix: prefix2,
      x: x2,
      y
    };
  }
  const prefix = Number(slice3(publicKey, 0, 1));
  const x = BigInt(slice3(publicKey, 1, 33));
  return {
    prefix,
    x
  };
}
function toHex2(publicKey, options = {}) {
  assert3(publicKey);
  const { prefix, x, y } = publicKey;
  const { includePrefix = true } = options;
  const publicKey_ = concat2(
    includePrefix ? fromNumber(prefix, { size: 1 }) : "0x",
    fromNumber(x, { size: 32 }),
    // If the public key is not compressed, add the y coordinate.
    typeof y === "bigint" ? fromNumber(y, { size: 32 }) : "0x"
  );
  return publicKey_;
}
var InvalidError = class extends BaseError3 {
  constructor({ publicKey }) {
    super(`Value \`${stringify2(publicKey)}\` is not a valid public key.`, {
      metaMessages: [
        "Public key must contain:",
        "- an `x` and `prefix` value (compressed)",
        "- an `x`, `y`, and `prefix` value (uncompressed)"
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidError"
    });
  }
};
var InvalidPrefixError = class extends BaseError3 {
  constructor({ prefix, cause }) {
    super(`Prefix "${prefix}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidPrefixError"
    });
  }
};
var InvalidCompressedPrefixError = class extends BaseError3 {
  constructor() {
    super("Prefix must be 2 or 3 for compressed public keys.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidCompressedPrefixError"
    });
  }
};
var InvalidUncompressedPrefixError = class extends BaseError3 {
  constructor() {
    super("Prefix must be 4 for uncompressed public keys.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidUncompressedPrefixError"
    });
  }
};
var InvalidSerializedSizeError = class extends BaseError3 {
  constructor({ publicKey }) {
    super(`Value \`${publicKey}\` is an invalid public key size.`, {
      metaMessages: [
        "Expected: 33 bytes (compressed + prefix), 64 bytes (uncompressed) or 65 bytes (uncompressed + prefix).",
        `Received ${size3(from2(publicKey))} bytes.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "PublicKey.InvalidSerializedSizeError"
    });
  }
};

// node_modules/ox/_esm/core/Address.js
var addressRegex2 = /^0x[a-fA-F0-9]{40}$/;
function assert4(value, options = {}) {
  const { strict = true } = options;
  if (!addressRegex2.test(value))
    throw new InvalidAddressError2({
      address: value,
      cause: new InvalidInputError()
    });
  if (strict) {
    if (value.toLowerCase() === value)
      return;
    if (checksum2(value) !== value)
      throw new InvalidAddressError2({
        address: value,
        cause: new InvalidChecksumError()
      });
  }
}
function checksum2(address) {
  if (checksum.has(address))
    return checksum.get(address);
  assert4(address, { strict: false });
  const hexAddress = address.substring(2).toLowerCase();
  const hash3 = keccak2562(fromString(hexAddress), { as: "Bytes" });
  const characters = hexAddress.split("");
  for (let i = 0; i < 40; i += 2) {
    if (hash3[i >> 1] >> 4 >= 8 && characters[i]) {
      characters[i] = characters[i].toUpperCase();
    }
    if ((hash3[i >> 1] & 15) >= 8 && characters[i + 1]) {
      characters[i + 1] = characters[i + 1].toUpperCase();
    }
  }
  const result = `0x${characters.join("")}`;
  checksum.set(address, result);
  return result;
}
function from4(address, options = {}) {
  const { checksum: checksumVal = false } = options;
  assert4(address);
  if (checksumVal)
    return checksum2(address);
  return address;
}
function fromPublicKey(publicKey, options = {}) {
  const address = keccak2562(`0x${toHex2(publicKey).slice(4)}`).substring(26);
  return from4(`0x${address}`, options);
}
function validate3(address, options = {}) {
  const { strict = true } = options ?? {};
  try {
    assert4(address, { strict });
    return true;
  } catch {
    return false;
  }
}
var InvalidAddressError2 = class extends BaseError3 {
  constructor({ address, cause }) {
    super(`Address "${address}" is invalid.`, {
      cause
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidAddressError"
    });
  }
};
var InvalidInputError = class extends BaseError3 {
  constructor() {
    super("Address is not a 20 byte (40 hexadecimal character) value.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidInputError"
    });
  }
};
var InvalidChecksumError = class extends BaseError3 {
  constructor() {
    super("Address does not match its checksum counterpart.");
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Address.InvalidChecksumError"
    });
  }
};

// node_modules/ox/_esm/core/AbiParameters.js
init_Bytes();
init_Errors();
init_Hex();

// node_modules/ox/_esm/core/internal/abiParameters.js
init_Bytes();
init_Errors();
init_Hex();

// node_modules/ox/_esm/core/Solidity.js
var arrayRegex = /^(.*)\[([0-9]*)\]$/;
var bytesRegex3 = /^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/;
var integerRegex3 = /^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;
var maxInt82 = 2n ** (8n - 1n) - 1n;
var maxInt162 = 2n ** (16n - 1n) - 1n;
var maxInt242 = 2n ** (24n - 1n) - 1n;
var maxInt322 = 2n ** (32n - 1n) - 1n;
var maxInt402 = 2n ** (40n - 1n) - 1n;
var maxInt482 = 2n ** (48n - 1n) - 1n;
var maxInt562 = 2n ** (56n - 1n) - 1n;
var maxInt642 = 2n ** (64n - 1n) - 1n;
var maxInt722 = 2n ** (72n - 1n) - 1n;
var maxInt802 = 2n ** (80n - 1n) - 1n;
var maxInt882 = 2n ** (88n - 1n) - 1n;
var maxInt962 = 2n ** (96n - 1n) - 1n;
var maxInt1042 = 2n ** (104n - 1n) - 1n;
var maxInt1122 = 2n ** (112n - 1n) - 1n;
var maxInt1202 = 2n ** (120n - 1n) - 1n;
var maxInt1282 = 2n ** (128n - 1n) - 1n;
var maxInt1362 = 2n ** (136n - 1n) - 1n;
var maxInt1442 = 2n ** (144n - 1n) - 1n;
var maxInt1522 = 2n ** (152n - 1n) - 1n;
var maxInt1602 = 2n ** (160n - 1n) - 1n;
var maxInt1682 = 2n ** (168n - 1n) - 1n;
var maxInt1762 = 2n ** (176n - 1n) - 1n;
var maxInt1842 = 2n ** (184n - 1n) - 1n;
var maxInt1922 = 2n ** (192n - 1n) - 1n;
var maxInt2002 = 2n ** (200n - 1n) - 1n;
var maxInt2082 = 2n ** (208n - 1n) - 1n;
var maxInt2162 = 2n ** (216n - 1n) - 1n;
var maxInt2242 = 2n ** (224n - 1n) - 1n;
var maxInt2322 = 2n ** (232n - 1n) - 1n;
var maxInt2402 = 2n ** (240n - 1n) - 1n;
var maxInt2482 = 2n ** (248n - 1n) - 1n;
var maxInt2562 = 2n ** (256n - 1n) - 1n;
var minInt82 = -(2n ** (8n - 1n));
var minInt162 = -(2n ** (16n - 1n));
var minInt242 = -(2n ** (24n - 1n));
var minInt322 = -(2n ** (32n - 1n));
var minInt402 = -(2n ** (40n - 1n));
var minInt482 = -(2n ** (48n - 1n));
var minInt562 = -(2n ** (56n - 1n));
var minInt642 = -(2n ** (64n - 1n));
var minInt722 = -(2n ** (72n - 1n));
var minInt802 = -(2n ** (80n - 1n));
var minInt882 = -(2n ** (88n - 1n));
var minInt962 = -(2n ** (96n - 1n));
var minInt1042 = -(2n ** (104n - 1n));
var minInt1122 = -(2n ** (112n - 1n));
var minInt1202 = -(2n ** (120n - 1n));
var minInt1282 = -(2n ** (128n - 1n));
var minInt1362 = -(2n ** (136n - 1n));
var minInt1442 = -(2n ** (144n - 1n));
var minInt1522 = -(2n ** (152n - 1n));
var minInt1602 = -(2n ** (160n - 1n));
var minInt1682 = -(2n ** (168n - 1n));
var minInt1762 = -(2n ** (176n - 1n));
var minInt1842 = -(2n ** (184n - 1n));
var minInt1922 = -(2n ** (192n - 1n));
var minInt2002 = -(2n ** (200n - 1n));
var minInt2082 = -(2n ** (208n - 1n));
var minInt2162 = -(2n ** (216n - 1n));
var minInt2242 = -(2n ** (224n - 1n));
var minInt2322 = -(2n ** (232n - 1n));
var minInt2402 = -(2n ** (240n - 1n));
var minInt2482 = -(2n ** (248n - 1n));
var minInt2562 = -(2n ** (256n - 1n));
var maxUint82 = 2n ** 8n - 1n;
var maxUint162 = 2n ** 16n - 1n;
var maxUint242 = 2n ** 24n - 1n;
var maxUint322 = 2n ** 32n - 1n;
var maxUint402 = 2n ** 40n - 1n;
var maxUint482 = 2n ** 48n - 1n;
var maxUint562 = 2n ** 56n - 1n;
var maxUint642 = 2n ** 64n - 1n;
var maxUint722 = 2n ** 72n - 1n;
var maxUint802 = 2n ** 80n - 1n;
var maxUint882 = 2n ** 88n - 1n;
var maxUint962 = 2n ** 96n - 1n;
var maxUint1042 = 2n ** 104n - 1n;
var maxUint1122 = 2n ** 112n - 1n;
var maxUint1202 = 2n ** 120n - 1n;
var maxUint1282 = 2n ** 128n - 1n;
var maxUint1362 = 2n ** 136n - 1n;
var maxUint1442 = 2n ** 144n - 1n;
var maxUint1522 = 2n ** 152n - 1n;
var maxUint1602 = 2n ** 160n - 1n;
var maxUint1682 = 2n ** 168n - 1n;
var maxUint1762 = 2n ** 176n - 1n;
var maxUint1842 = 2n ** 184n - 1n;
var maxUint1922 = 2n ** 192n - 1n;
var maxUint2002 = 2n ** 200n - 1n;
var maxUint2082 = 2n ** 208n - 1n;
var maxUint2162 = 2n ** 216n - 1n;
var maxUint2242 = 2n ** 224n - 1n;
var maxUint2322 = 2n ** 232n - 1n;
var maxUint2402 = 2n ** 240n - 1n;
var maxUint2482 = 2n ** 248n - 1n;
var maxUint2562 = 2n ** 256n - 1n;

// node_modules/ox/_esm/core/internal/abiParameters.js
function decodeParameter2(cursor, param, options) {
  const { checksumAddress: checksumAddress2, staticPosition } = options;
  const arrayComponents = getArrayComponents2(param.type);
  if (arrayComponents) {
    const [length, type] = arrayComponents;
    return decodeArray2(cursor, { ...param, type }, { checksumAddress: checksumAddress2, length, staticPosition });
  }
  if (param.type === "tuple")
    return decodeTuple2(cursor, param, {
      checksumAddress: checksumAddress2,
      staticPosition
    });
  if (param.type === "address")
    return decodeAddress3(cursor, { checksum: checksumAddress2 });
  if (param.type === "bool")
    return decodeBool2(cursor);
  if (param.type.startsWith("bytes"))
    return decodeBytes2(cursor, param, { staticPosition });
  if (param.type.startsWith("uint") || param.type.startsWith("int"))
    return decodeNumber2(cursor, param);
  if (param.type === "string")
    return decodeString2(cursor, { staticPosition });
  throw new InvalidTypeError(param.type);
}
var sizeOfLength2 = 32;
var sizeOfOffset2 = 32;
function decodeAddress3(cursor, options = {}) {
  const { checksum: checksum3 = false } = options;
  const value = cursor.readBytes(32);
  const wrap3 = (address) => checksum3 ? checksum2(address) : address;
  return [wrap3(fromBytes(slice2(value, -20))), 32];
}
function decodeArray2(cursor, param, options) {
  const { checksumAddress: checksumAddress2, length, staticPosition } = options;
  if (length === null) {
    const offset = toNumber2(cursor.readBytes(sizeOfOffset2));
    const start = staticPosition + offset;
    const startOfData = start + sizeOfLength2;
    cursor.setPosition(start);
    const length2 = toNumber2(cursor.readBytes(sizeOfLength2));
    const dynamicChild = hasDynamicChild2(param);
    let consumed2 = 0;
    const value2 = [];
    for (let i = 0; i < length2; ++i) {
      cursor.setPosition(startOfData + (dynamicChild ? i * 32 : consumed2));
      const [data, consumed_] = decodeParameter2(cursor, param, {
        checksumAddress: checksumAddress2,
        staticPosition: startOfData
      });
      consumed2 += consumed_;
      value2.push(data);
      if (consumed_ === 0) {
        cursor.assertReadLimit();
        cursor._touch();
      }
    }
    cursor.setPosition(staticPosition + 32);
    return [value2, 32];
  }
  if (hasDynamicChild2(param)) {
    const offset = toNumber2(cursor.readBytes(sizeOfOffset2));
    const start = staticPosition + offset;
    const value2 = [];
    for (let i = 0; i < length; ++i) {
      cursor.setPosition(start + i * 32);
      const [data] = decodeParameter2(cursor, param, {
        checksumAddress: checksumAddress2,
        staticPosition: start
      });
      value2.push(data);
    }
    cursor.setPosition(staticPosition + 32);
    return [value2, 32];
  }
  let consumed = 0;
  const value = [];
  for (let i = 0; i < length; ++i) {
    const [data, consumed_] = decodeParameter2(cursor, param, {
      checksumAddress: checksumAddress2,
      staticPosition: staticPosition + consumed
    });
    consumed += consumed_;
    value.push(data);
    if (consumed_ === 0) {
      cursor.assertReadLimit();
      cursor._touch();
    }
  }
  return [value, consumed];
}
function decodeBool2(cursor) {
  return [toBoolean(cursor.readBytes(32), { size: 32 }), 32];
}
function decodeBytes2(cursor, param, { staticPosition }) {
  const [_, size5] = param.type.split("bytes");
  if (!size5) {
    const offset = toNumber2(cursor.readBytes(32));
    cursor.setPosition(staticPosition + offset);
    const length = toNumber2(cursor.readBytes(32));
    if (length === 0) {
      cursor.setPosition(staticPosition + 32);
      return ["0x", 32];
    }
    const data = cursor.readBytes(length);
    cursor.setPosition(staticPosition + 32);
    return [fromBytes(data), 32];
  }
  const value = fromBytes(cursor.readBytes(Number.parseInt(size5, 10), 32));
  return [value, 32];
}
function decodeNumber2(cursor, param) {
  const signed = param.type.startsWith("int");
  const size5 = Number.parseInt(param.type.split("int")[1] || "256", 10);
  const value = cursor.readBytes(32);
  return [
    size5 > 48 ? toBigInt2(value, { signed }) : toNumber2(value, { signed }),
    32
  ];
}
function decodeTuple2(cursor, param, options) {
  const { checksumAddress: checksumAddress2, staticPosition } = options;
  const hasUnnamedChild = param.components.length === 0 || param.components.some(({ name }) => !name);
  const value = hasUnnamedChild ? [] : {};
  let consumed = 0;
  if (hasDynamicChild2(param)) {
    const offset = toNumber2(cursor.readBytes(sizeOfOffset2));
    const start = staticPosition + offset;
    for (let i = 0; i < param.components.length; ++i) {
      const component = param.components[i];
      cursor.setPosition(start + consumed);
      const [data, consumed_] = decodeParameter2(cursor, component, {
        checksumAddress: checksumAddress2,
        staticPosition: start
      });
      consumed += consumed_;
      value[hasUnnamedChild ? i : component?.name] = data;
    }
    cursor.setPosition(staticPosition + 32);
    return [value, 32];
  }
  for (let i = 0; i < param.components.length; ++i) {
    const component = param.components[i];
    const [data, consumed_] = decodeParameter2(cursor, component, {
      checksumAddress: checksumAddress2,
      staticPosition
    });
    value[hasUnnamedChild ? i : component?.name] = data;
    consumed += consumed_;
  }
  return [value, consumed];
}
function decodeString2(cursor, { staticPosition }) {
  const offset = toNumber2(cursor.readBytes(32));
  const start = staticPosition + offset;
  cursor.setPosition(start);
  const length = toNumber2(cursor.readBytes(32));
  if (length === 0) {
    cursor.setPosition(staticPosition + 32);
    return ["", 32];
  }
  const data = cursor.readBytes(length, 32);
  const value = toString(trimLeft(data));
  cursor.setPosition(staticPosition + 32);
  return [value, 32];
}
function prepareParameters({ checksumAddress: checksumAddress2, parameters, values }) {
  const preparedParameters = [];
  for (let i = 0; i < parameters.length; i++) {
    preparedParameters.push(prepareParameter({
      checksumAddress: checksumAddress2,
      parameter: parameters[i],
      value: values[i]
    }));
  }
  return preparedParameters;
}
function prepareParameter({ checksumAddress: checksumAddress2 = false, parameter: parameter_, value }) {
  const parameter = parameter_;
  const arrayComponents = getArrayComponents2(parameter.type);
  if (arrayComponents) {
    const [length, type] = arrayComponents;
    return encodeArray2(value, {
      checksumAddress: checksumAddress2,
      length,
      parameter: {
        ...parameter,
        type
      }
    });
  }
  if (parameter.type === "tuple") {
    return encodeTuple2(value, {
      checksumAddress: checksumAddress2,
      parameter
    });
  }
  if (parameter.type === "address") {
    return encodeAddress2(value, {
      checksum: checksumAddress2
    });
  }
  if (parameter.type === "bool") {
    return encodeBoolean(value);
  }
  if (parameter.type.startsWith("uint") || parameter.type.startsWith("int")) {
    const signed = parameter.type.startsWith("int");
    const [, , size5 = "256"] = integerRegex3.exec(parameter.type) ?? [];
    return encodeNumber2(value, {
      signed,
      size: Number(size5)
    });
  }
  if (parameter.type.startsWith("bytes")) {
    return encodeBytes2(value, { type: parameter.type });
  }
  if (parameter.type === "string") {
    return encodeString2(value);
  }
  throw new InvalidTypeError(parameter.type);
}
function encode(preparedParameters) {
  let staticSize = 0;
  for (let i = 0; i < preparedParameters.length; i++) {
    const { dynamic, encoded } = preparedParameters[i];
    if (dynamic)
      staticSize += 32;
    else
      staticSize += size3(encoded);
  }
  const staticParameters = [];
  const dynamicParameters = [];
  let dynamicSize = 0;
  for (let i = 0; i < preparedParameters.length; i++) {
    const { dynamic, encoded } = preparedParameters[i];
    if (dynamic) {
      staticParameters.push(fromNumber(staticSize + dynamicSize, { size: 32 }));
      dynamicParameters.push(encoded);
      dynamicSize += size3(encoded);
    } else {
      staticParameters.push(encoded);
    }
  }
  return concat2(...staticParameters, ...dynamicParameters);
}
function encodeAddress2(value, options) {
  const { checksum: checksum3 = false } = options;
  assert4(value, { strict: checksum3 });
  return {
    dynamic: false,
    encoded: padLeft(value.toLowerCase())
  };
}
function encodeArray2(value, options) {
  const { checksumAddress: checksumAddress2, length, parameter } = options;
  const dynamic = length === null;
  if (!Array.isArray(value))
    throw new InvalidArrayError2(value);
  if (!dynamic && value.length !== length)
    throw new ArrayLengthMismatchError({
      expectedLength: length,
      givenLength: value.length,
      type: `${parameter.type}[${length}]`
    });
  let dynamicChild = value.length === 0 && hasDynamicChild2(parameter);
  const preparedParameters = [];
  for (let i = 0; i < value.length; i++) {
    const preparedParam = prepareParameter({
      checksumAddress: checksumAddress2,
      parameter,
      value: value[i]
    });
    if (preparedParam.dynamic)
      dynamicChild = true;
    preparedParameters.push(preparedParam);
  }
  if (dynamic || dynamicChild) {
    const data = encode(preparedParameters);
    if (dynamic) {
      const length2 = fromNumber(preparedParameters.length, { size: 32 });
      return {
        dynamic: true,
        encoded: preparedParameters.length > 0 ? concat2(length2, data) : length2
      };
    }
    if (dynamicChild)
      return { dynamic: true, encoded: data };
  }
  return {
    dynamic: false,
    encoded: concat2(...preparedParameters.map(({ encoded }) => encoded))
  };
}
function encodeBytes2(value, { type }) {
  const [, parametersize] = type.split("bytes");
  const bytesSize = size3(value);
  if (!parametersize) {
    let value_ = value;
    if (bytesSize % 32 !== 0)
      value_ = padRight(value_, Math.ceil((value.length - 2) / 2 / 32) * 32);
    return {
      dynamic: true,
      encoded: concat2(padLeft(fromNumber(bytesSize, { size: 32 })), value_)
    };
  }
  if (bytesSize !== Number.parseInt(parametersize, 10))
    throw new BytesSizeMismatchError2({
      expectedSize: Number.parseInt(parametersize, 10),
      value
    });
  return { dynamic: false, encoded: padRight(value) };
}
function encodeBoolean(value) {
  if (typeof value !== "boolean")
    throw new BaseError3(`Invalid boolean value: "${value}" (type: ${typeof value}). Expected: \`true\` or \`false\`.`);
  return { dynamic: false, encoded: padLeft(fromBoolean(value)) };
}
function encodeNumber2(value, { signed, size: size5 }) {
  if (typeof size5 === "number") {
    const max = 2n ** (BigInt(size5) - (signed ? 1n : 0n)) - 1n;
    const min = signed ? -max - 1n : 0n;
    if (value > max || value < min)
      throw new IntegerOutOfRangeError2({
        max: max.toString(),
        min: min.toString(),
        signed,
        size: size5 / 8,
        value: value.toString()
      });
  }
  return {
    dynamic: false,
    encoded: fromNumber(value, {
      size: 32,
      signed
    })
  };
}
function encodeString2(value) {
  const hexValue = fromString2(value);
  const partsLength = Math.ceil(size3(hexValue) / 32);
  const parts = [];
  for (let i = 0; i < partsLength; i++) {
    parts.push(padRight(slice3(hexValue, i * 32, (i + 1) * 32)));
  }
  return {
    dynamic: true,
    encoded: concat2(padRight(fromNumber(size3(hexValue), { size: 32 })), ...parts)
  };
}
function encodeTuple2(value, options) {
  const { checksumAddress: checksumAddress2, parameter } = options;
  let dynamic = false;
  const preparedParameters = [];
  for (let i = 0; i < parameter.components.length; i++) {
    const param_ = parameter.components[i];
    const index2 = Array.isArray(value) ? i : param_.name;
    const preparedParam = prepareParameter({
      checksumAddress: checksumAddress2,
      parameter: param_,
      value: value[index2]
    });
    preparedParameters.push(preparedParam);
    if (preparedParam.dynamic)
      dynamic = true;
  }
  return {
    dynamic,
    encoded: dynamic ? encode(preparedParameters) : concat2(...preparedParameters.map(({ encoded }) => encoded))
  };
}
function getArrayComponents2(type) {
  const matches = type.match(/^(.*)\[(\d+)?\]$/);
  return matches ? (
    // Return `null` if the array is dynamic.
    [matches[2] ? Number(matches[2]) : null, matches[1]]
  ) : void 0;
}
function hasDynamicChild2(param) {
  const { type } = param;
  if (type === "string")
    return true;
  if (type === "bytes")
    return true;
  if (type.endsWith("[]"))
    return true;
  if (type === "tuple")
    return param.components?.some(hasDynamicChild2);
  const arrayComponents = getArrayComponents2(param.type);
  if (arrayComponents && hasDynamicChild2({
    ...param,
    type: arrayComponents[1]
  }))
    return true;
  return false;
}

// node_modules/ox/_esm/core/internal/cursor.js
init_Errors();
var staticCursor2 = {
  bytes: new Uint8Array(),
  dataView: new DataView(new ArrayBuffer(0)),
  position: 0,
  positionReadCount: /* @__PURE__ */ new Map(),
  recursiveReadCount: 0,
  recursiveReadLimit: Number.POSITIVE_INFINITY,
  assertReadLimit() {
    if (this.recursiveReadCount >= this.recursiveReadLimit)
      throw new RecursiveReadLimitExceededError2({
        count: this.recursiveReadCount + 1,
        limit: this.recursiveReadLimit
      });
  },
  assertPosition(position) {
    if (position < 0 || position > this.bytes.length - 1)
      throw new PositionOutOfBoundsError2({
        length: this.bytes.length,
        position
      });
  },
  decrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError2({ offset });
    const position = this.position - offset;
    this.assertPosition(position);
    this.position = position;
  },
  getReadCount(position) {
    return this.positionReadCount.get(position || this.position) || 0;
  },
  incrementPosition(offset) {
    if (offset < 0)
      throw new NegativeOffsetError2({ offset });
    const position = this.position + offset;
    this.assertPosition(position);
    this.position = position;
  },
  inspectByte(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectBytes(length, position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + length - 1);
    return this.bytes.subarray(position, position + length);
  },
  inspectUint8(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position);
    return this.bytes[position];
  },
  inspectUint16(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 1);
    return this.dataView.getUint16(position);
  },
  inspectUint24(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 2);
    return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
  },
  inspectUint32(position_) {
    const position = position_ ?? this.position;
    this.assertPosition(position + 3);
    return this.dataView.getUint32(position);
  },
  pushByte(byte) {
    this.assertPosition(this.position);
    this.bytes[this.position] = byte;
    this.position++;
  },
  pushBytes(bytes) {
    this.assertPosition(this.position + bytes.length - 1);
    this.bytes.set(bytes, this.position);
    this.position += bytes.length;
  },
  pushUint8(value) {
    this.assertPosition(this.position);
    this.bytes[this.position] = value;
    this.position++;
  },
  pushUint16(value) {
    this.assertPosition(this.position + 1);
    this.dataView.setUint16(this.position, value);
    this.position += 2;
  },
  pushUint24(value) {
    this.assertPosition(this.position + 2);
    this.dataView.setUint16(this.position, value >> 8);
    this.dataView.setUint8(this.position + 2, value & ~4294967040);
    this.position += 3;
  },
  pushUint32(value) {
    this.assertPosition(this.position + 3);
    this.dataView.setUint32(this.position, value);
    this.position += 4;
  },
  readByte() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectByte();
    this.position++;
    return value;
  },
  readBytes(length, size5) {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectBytes(length);
    this.position += size5 ?? length;
    return value;
  },
  readUint8() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint8();
    this.position += 1;
    return value;
  },
  readUint16() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint16();
    this.position += 2;
    return value;
  },
  readUint24() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint24();
    this.position += 3;
    return value;
  },
  readUint32() {
    this.assertReadLimit();
    this._touch();
    const value = this.inspectUint32();
    this.position += 4;
    return value;
  },
  get remaining() {
    return this.bytes.length - this.position;
  },
  setPosition(position) {
    const oldPosition = this.position;
    this.assertPosition(position);
    this.position = position;
    return () => this.position = oldPosition;
  },
  _touch() {
    if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
      return;
    const count = this.getReadCount();
    this.positionReadCount.set(this.position, count + 1);
    if (count > 0)
      this.recursiveReadCount++;
  }
};
function create(bytes, { recursiveReadLimit = 8192 } = {}) {
  const cursor = Object.create(staticCursor2);
  cursor.bytes = bytes;
  cursor.dataView = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  cursor.positionReadCount = /* @__PURE__ */ new Map();
  cursor.recursiveReadLimit = recursiveReadLimit;
  return cursor;
}
var NegativeOffsetError2 = class extends BaseError3 {
  constructor({ offset }) {
    super(`Offset \`${offset}\` cannot be negative.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.NegativeOffsetError"
    });
  }
};
var PositionOutOfBoundsError2 = class extends BaseError3 {
  constructor({ length, position }) {
    super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.PositionOutOfBoundsError"
    });
  }
};
var RecursiveReadLimitExceededError2 = class extends BaseError3 {
  constructor({ count, limit }) {
    super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Cursor.RecursiveReadLimitExceededError"
    });
  }
};

// node_modules/ox/_esm/core/AbiParameters.js
function decode(parameters, data, options = {}) {
  const { as = "Array", checksumAddress: checksumAddress2 = false } = options;
  const bytes = typeof data === "string" ? fromHex(data) : data;
  const cursor = create(bytes);
  if (size2(bytes) === 0 && parameters.length > 0)
    throw new ZeroDataError();
  if (size2(bytes) && size2(bytes) < 32)
    throw new DataSizeTooSmallError({
      data: typeof data === "string" ? data : fromBytes(data),
      parameters,
      size: size2(bytes)
    });
  let consumed = 0;
  const values = as === "Array" ? [] : {};
  for (let i = 0; i < parameters.length; ++i) {
    const param = parameters[i];
    if (consumed < bytes.length)
      cursor.setPosition(consumed);
    const [data2, consumed_] = decodeParameter2(cursor, param, {
      checksumAddress: checksumAddress2,
      staticPosition: 0
    });
    consumed += consumed_;
    if (as === "Array")
      values.push(data2);
    else
      values[param.name ?? i] = data2;
  }
  return values;
}
function encode2(parameters, values, options) {
  const { checksumAddress: checksumAddress2 = false } = options ?? {};
  if (parameters.length !== values.length)
    throw new LengthMismatchError({
      expectedLength: parameters.length,
      givenLength: values.length
    });
  const preparedParameters = prepareParameters({
    checksumAddress: checksumAddress2,
    parameters,
    values
  });
  const data = encode(preparedParameters);
  if (data.length === 0)
    return "0x";
  return data;
}
function encodePacked(types, values) {
  if (types.length !== values.length)
    throw new LengthMismatchError({
      expectedLength: types.length,
      givenLength: values.length
    });
  const data = [];
  for (let i = 0; i < types.length; i++) {
    const type = types[i];
    const value = values[i];
    data.push(encodePacked.encode(type, value));
  }
  return concat2(...data);
}
(function(encodePacked2) {
  function encode4(type, value, isArray = false) {
    if (type === "address") {
      const address = value;
      assert4(address);
      return padLeft(address.toLowerCase(), isArray ? 32 : 0);
    }
    if (type === "string")
      return fromString2(value);
    if (type === "bytes")
      return value;
    if (type === "bool")
      return padLeft(fromBoolean(value), isArray ? 32 : 1);
    const intMatch = type.match(integerRegex3);
    if (intMatch) {
      const [_type, baseType, bits = "256"] = intMatch;
      const size5 = Number.parseInt(bits, 10) / 8;
      return fromNumber(value, {
        size: isArray ? 32 : size5,
        signed: baseType === "int"
      });
    }
    const bytesMatch = type.match(bytesRegex3);
    if (bytesMatch) {
      const [_type, size5] = bytesMatch;
      if (Number.parseInt(size5, 10) !== (value.length - 2) / 2)
        throw new BytesSizeMismatchError2({
          expectedSize: Number.parseInt(size5, 10),
          value
        });
      return padRight(value, isArray ? 32 : 0);
    }
    const arrayMatch = type.match(arrayRegex);
    if (arrayMatch && Array.isArray(value)) {
      const [_type, childType] = arrayMatch;
      const data = [];
      for (let i = 0; i < value.length; i++) {
        data.push(encode4(childType, value[i], true));
      }
      if (data.length === 0)
        return "0x";
      return concat2(...data);
    }
    throw new InvalidTypeError(type);
  }
  encodePacked2.encode = encode4;
})(encodePacked || (encodePacked = {}));
function from5(parameters) {
  if (Array.isArray(parameters) && typeof parameters[0] === "string")
    return parseAbiParameters(parameters);
  if (typeof parameters === "string")
    return parseAbiParameters(parameters);
  return parameters;
}
var DataSizeTooSmallError = class extends BaseError3 {
  constructor({ data, parameters, size: size5 }) {
    super(`Data size of ${size5} bytes is too small for given parameters.`, {
      metaMessages: [
        `Params: (${formatAbiParameters(parameters)})`,
        `Data:   ${data} (${size5} bytes)`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.DataSizeTooSmallError"
    });
  }
};
var ZeroDataError = class extends BaseError3 {
  constructor() {
    super('Cannot decode zero data ("0x") with ABI parameters.');
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.ZeroDataError"
    });
  }
};
var ArrayLengthMismatchError = class extends BaseError3 {
  constructor({ expectedLength, givenLength, type }) {
    super(`Array length mismatch for type \`${type}\`. Expected: \`${expectedLength}\`. Given: \`${givenLength}\`.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.ArrayLengthMismatchError"
    });
  }
};
var BytesSizeMismatchError2 = class extends BaseError3 {
  constructor({ expectedSize, value }) {
    super(`Size of bytes "${value}" (bytes${size3(value)}) does not match expected size (bytes${expectedSize}).`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.BytesSizeMismatchError"
    });
  }
};
var LengthMismatchError = class extends BaseError3 {
  constructor({ expectedLength, givenLength }) {
    super([
      "ABI encoding parameters/values length mismatch.",
      `Expected length (parameters): ${expectedLength}`,
      `Given length (values): ${givenLength}`
    ].join("\n"));
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.LengthMismatchError"
    });
  }
};
var InvalidArrayError2 = class extends BaseError3 {
  constructor(value) {
    super(`Value \`${value}\` is not a valid array.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.InvalidArrayError"
    });
  }
};
var InvalidTypeError = class extends BaseError3 {
  constructor(type) {
    super(`Type \`${type}\` is not a valid ABI Type.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiParameters.InvalidTypeError"
    });
  }
};

// node_modules/ox/_esm/core/Authorization.js
init_Hex();

// node_modules/ox/_esm/core/Rlp.js
init_Bytes();
init_Errors();
init_Hex();
function from6(value, options) {
  const { as } = options;
  const encodable = getEncodable2(value);
  const cursor = create(new Uint8Array(encodable.length));
  encodable.encode(cursor);
  if (as === "Hex")
    return fromBytes(cursor.bytes);
  return cursor.bytes;
}
function fromHex3(hex, options = {}) {
  const { as = "Hex" } = options;
  return from6(hex, { as });
}
function getEncodable2(bytes) {
  if (Array.isArray(bytes))
    return getEncodableList2(bytes.map((x) => getEncodable2(x)));
  return getEncodableBytes2(bytes);
}
function getEncodableList2(list) {
  const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
  const sizeOfBodyLength = getSizeOfLength2(bodyLength);
  const length = (() => {
    if (bodyLength <= 55)
      return 1 + bodyLength;
    return 1 + sizeOfBodyLength + bodyLength;
  })();
  return {
    length,
    encode(cursor) {
      if (bodyLength <= 55) {
        cursor.pushByte(192 + bodyLength);
      } else {
        cursor.pushByte(192 + 55 + sizeOfBodyLength);
        if (sizeOfBodyLength === 1)
          cursor.pushUint8(bodyLength);
        else if (sizeOfBodyLength === 2)
          cursor.pushUint16(bodyLength);
        else if (sizeOfBodyLength === 3)
          cursor.pushUint24(bodyLength);
        else
          cursor.pushUint32(bodyLength);
      }
      for (const { encode: encode4 } of list) {
        encode4(cursor);
      }
    }
  };
}
function getEncodableBytes2(bytesOrHex) {
  const bytes = typeof bytesOrHex === "string" ? fromHex(bytesOrHex) : bytesOrHex;
  const sizeOfBytesLength = getSizeOfLength2(bytes.length);
  const length = (() => {
    if (bytes.length === 1 && bytes[0] < 128)
      return 1;
    if (bytes.length <= 55)
      return 1 + bytes.length;
    return 1 + sizeOfBytesLength + bytes.length;
  })();
  return {
    length,
    encode(cursor) {
      if (bytes.length === 1 && bytes[0] < 128) {
        cursor.pushBytes(bytes);
      } else if (bytes.length <= 55) {
        cursor.pushByte(128 + bytes.length);
        cursor.pushBytes(bytes);
      } else {
        cursor.pushByte(128 + 55 + sizeOfBytesLength);
        if (sizeOfBytesLength === 1)
          cursor.pushUint8(bytes.length);
        else if (sizeOfBytesLength === 2)
          cursor.pushUint16(bytes.length);
        else if (sizeOfBytesLength === 3)
          cursor.pushUint24(bytes.length);
        else
          cursor.pushUint32(bytes.length);
        cursor.pushBytes(bytes);
      }
    }
  };
}
function getSizeOfLength2(length) {
  if (length <= 255)
    return 1;
  if (length <= 65535)
    return 2;
  if (length <= 16777215)
    return 3;
  if (length <= 4294967295)
    return 4;
  throw new BaseError3("Length is too large.");
}

// node_modules/ox/_esm/core/Signature.js
init_Errors();
init_Hex();
init_Json();
function assert5(signature, options = {}) {
  const { recovered } = options;
  if (typeof signature.r === "undefined")
    throw new MissingPropertiesError({ signature });
  if (typeof signature.s === "undefined")
    throw new MissingPropertiesError({ signature });
  if (recovered && typeof signature.yParity === "undefined")
    throw new MissingPropertiesError({ signature });
  if (signature.r < 0n || signature.r > maxUint2562)
    throw new InvalidRError({ value: signature.r });
  if (signature.s < 0n || signature.s > maxUint2562)
    throw new InvalidSError({ value: signature.s });
  if (typeof signature.yParity === "number" && signature.yParity !== 0 && signature.yParity !== 1)
    throw new InvalidYParityError({ value: signature.yParity });
}
function fromBytes3(signature) {
  return fromHex4(fromBytes(signature));
}
function fromHex4(signature) {
  if (signature.length !== 130 && signature.length !== 132)
    throw new InvalidSerializedSizeError2({ signature });
  const r = BigInt(slice3(signature, 0, 32));
  const s = BigInt(slice3(signature, 32, 64));
  const yParity = (() => {
    const yParity2 = Number(`0x${signature.slice(130)}`);
    if (Number.isNaN(yParity2))
      return void 0;
    try {
      return vToYParity(yParity2);
    } catch {
      throw new InvalidYParityError({ value: yParity2 });
    }
  })();
  if (typeof yParity === "undefined")
    return {
      r,
      s
    };
  return {
    r,
    s,
    yParity
  };
}
function extract2(value) {
  if (typeof value.r === "undefined")
    return void 0;
  if (typeof value.s === "undefined")
    return void 0;
  return from7(value);
}
function from7(signature) {
  const signature_ = (() => {
    if (typeof signature === "string")
      return fromHex4(signature);
    if (signature instanceof Uint8Array)
      return fromBytes3(signature);
    if (typeof signature.r === "string")
      return fromRpc2(signature);
    if (signature.v)
      return fromLegacy(signature);
    return {
      r: signature.r,
      s: signature.s,
      ...typeof signature.yParity !== "undefined" ? { yParity: signature.yParity } : {}
    };
  })();
  assert5(signature_);
  return signature_;
}
function fromLegacy(signature) {
  return {
    r: signature.r,
    s: signature.s,
    yParity: vToYParity(signature.v)
  };
}
function fromRpc2(signature) {
  const yParity = (() => {
    const v = signature.v ? Number(signature.v) : void 0;
    let yParity2 = signature.yParity ? Number(signature.yParity) : void 0;
    if (typeof v === "number" && typeof yParity2 !== "number")
      yParity2 = vToYParity(v);
    if (typeof yParity2 !== "number")
      throw new InvalidYParityError({ value: signature.yParity });
    return yParity2;
  })();
  return {
    r: BigInt(signature.r),
    s: BigInt(signature.s),
    yParity
  };
}
function toTuple(signature) {
  const { r, s, yParity } = signature;
  return [
    yParity ? "0x01" : "0x",
    r === 0n ? "0x" : trimLeft2(fromNumber(r)),
    s === 0n ? "0x" : trimLeft2(fromNumber(s))
  ];
}
function vToYParity(v) {
  if (v === 0 || v === 27)
    return 0;
  if (v === 1 || v === 28)
    return 1;
  if (v >= 35)
    return v % 2 === 0 ? 1 : 0;
  throw new InvalidVError({ value: v });
}
var InvalidSerializedSizeError2 = class extends BaseError3 {
  constructor({ signature }) {
    super(`Value \`${signature}\` is an invalid signature size.`, {
      metaMessages: [
        "Expected: 64 bytes or 65 bytes.",
        `Received ${size3(from2(signature))} bytes.`
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidSerializedSizeError"
    });
  }
};
var MissingPropertiesError = class extends BaseError3 {
  constructor({ signature }) {
    super(`Signature \`${stringify2(signature)}\` is missing either an \`r\`, \`s\`, or \`yParity\` property.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.MissingPropertiesError"
    });
  }
};
var InvalidRError = class extends BaseError3 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid r value. r must be a positive integer less than 2^256.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidRError"
    });
  }
};
var InvalidSError = class extends BaseError3 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid s value. s must be a positive integer less than 2^256.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidSError"
    });
  }
};
var InvalidYParityError = class extends BaseError3 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid y-parity value. Y-parity must be 0 or 1.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidYParityError"
    });
  }
};
var InvalidVError = class extends BaseError3 {
  constructor({ value }) {
    super(`Value \`${value}\` is an invalid v value. v must be 27, 28 or >=35.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "Signature.InvalidVError"
    });
  }
};

// node_modules/ox/_esm/core/Authorization.js
function from8(authorization, options = {}) {
  if (typeof authorization.chainId === "string")
    return fromRpc3(authorization);
  return { ...authorization, ...options.signature };
}
function fromRpc3(authorization) {
  const { address, chainId, nonce } = authorization;
  const signature = extract2(authorization);
  return {
    address,
    chainId: Number(chainId),
    nonce: BigInt(nonce),
    ...signature
  };
}
function getSignPayload(authorization) {
  return hash2(authorization, { presign: true });
}
function hash2(authorization, options = {}) {
  const { presign } = options;
  return keccak2562(concat2("0x05", fromHex3(toTuple2(presign ? {
    address: authorization.address,
    chainId: authorization.chainId,
    nonce: authorization.nonce
  } : authorization))));
}
function toTuple2(authorization) {
  const { address, chainId, nonce } = authorization;
  const signature = extract2(authorization);
  return [
    chainId ? fromNumber(chainId) : "0x",
    address,
    nonce ? fromNumber(nonce) : "0x",
    ...signature ? toTuple(signature) : []
  ];
}

// node_modules/ox/_esm/erc8010/SignatureErc8010.js
init_Errors();
init_Hex();

// node_modules/ox/_esm/core/Secp256k1.js
init_secp256k1();
init_Bytes();
init_Hex();
function recoverAddress2(options) {
  return fromPublicKey(recoverPublicKey2(options));
}
function recoverPublicKey2(options) {
  const { payload, signature } = options;
  const { r, s, yParity } = signature;
  const signature_ = new secp256k1.Signature(BigInt(r), BigInt(s)).addRecoveryBit(yParity);
  const point2 = signature_.recoverPublicKey(from2(payload).substring(2));
  return from3(point2);
}
var fromSeedDomain = fromString("ox.secp256k1.fromSeed.v1");

// node_modules/ox/_esm/erc8010/SignatureErc8010.js
var magicBytes = "0x8010801080108010801080108010801080108010801080108010801080108010";
var suffixParameters = from5("(uint256 chainId, address delegation, uint256 nonce, uint8 yParity, uint256 r, uint256 s), address to, bytes data");
function assert6(value) {
  if (typeof value === "string") {
    if (slice3(value, -32) !== magicBytes)
      throw new InvalidWrappedSignatureError(value);
  } else
    assert5(value.authorization);
}
function from9(value) {
  if (typeof value === "string")
    return unwrap(value);
  return value;
}
function unwrap(wrapped) {
  assert6(wrapped);
  const suffixLength = toNumber(slice3(wrapped, -64, -32));
  const suffix = slice3(wrapped, -suffixLength - 64, -64);
  const signature = slice3(wrapped, 0, -suffixLength - 64);
  const [auth, to, data] = decode(suffixParameters, suffix);
  const authorization = from8({
    address: auth.delegation,
    chainId: Number(auth.chainId),
    nonce: auth.nonce,
    yParity: auth.yParity,
    r: auth.r,
    s: auth.s
  });
  return {
    authorization,
    signature,
    ...data && data !== "0x" ? { data, to } : {}
  };
}
function wrap(value) {
  const { data, signature } = value;
  assert6(value);
  const self = recoverAddress2({
    payload: getSignPayload(value.authorization),
    signature: from7(value.authorization)
  });
  const suffix = encode2(suffixParameters, [
    {
      ...value.authorization,
      delegation: value.authorization.address,
      chainId: BigInt(value.authorization.chainId)
    },
    value.to ?? self,
    data ?? "0x"
  ]);
  const suffixLength = fromNumber(size3(suffix), { size: 32 });
  return concat2(signature, suffix, suffixLength, magicBytes);
}
function validate4(value) {
  try {
    assert6(value);
    return true;
  } catch {
    return false;
  }
}
var InvalidWrappedSignatureError = class extends BaseError3 {
  constructor(wrapped) {
    super(`Value \`${wrapped}\` is an invalid ERC-8010 wrapped signature.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SignatureErc8010.InvalidWrappedSignatureError"
    });
  }
};

// node_modules/viem/_esm/utils/unit/formatUnits.js
init_Value();
function formatUnits(value, decimals) {
  return format(value, decimals);
}

// node_modules/viem/_esm/utils/formatters/proof.js
function formatStorageProof(storageProof) {
  return storageProof.map((proof) => ({
    ...proof,
    value: BigInt(proof.value)
  }));
}
function formatProof(proof) {
  return {
    ...proof,
    balance: proof.balance ? BigInt(proof.balance) : void 0,
    nonce: proof.nonce ? hexToNumber(proof.nonce) : void 0,
    storageProof: proof.storageProof ? formatStorageProof(proof.storageProof) : void 0
  };
}

// node_modules/viem/_esm/actions/public/getProof.js
async function getProof(client, { address, blockHash, blockNumber, blockTag = "latest", requireCanonical, storageKeys }) {
  const block = formatBlockParameter({
    blockHash,
    blockNumber,
    blockTag,
    requireCanonical
  });
  const proof = await client.request({
    method: "eth_getProof",
    params: [address, storageKeys, block]
  });
  return formatProof(proof);
}

// node_modules/viem/_esm/actions/public/getRawTransaction.js
init_transaction();
async function getRawTransaction(client, { hash: hash3 }) {
  const rawTransaction = await client.request({
    method: "eth_getRawTransactionByHash",
    params: [hash3]
  }, { dedupe: true });
  if (!rawTransaction)
    throw new TransactionNotFoundError({ hash: hash3 });
  return rawTransaction;
}

// node_modules/viem/_esm/actions/public/getStorageAt.js
init_formatBlockParameter();
async function getStorageAt(client, { address, blockHash, blockNumber, blockTag = "latest", requireCanonical, slot }) {
  const block = formatBlockParameter({
    blockHash,
    blockNumber,
    blockTag,
    requireCanonical
  });
  const data = await client.request({
    method: "eth_getStorageAt",
    params: [address, slot, block]
  });
  return data;
}

// node_modules/viem/_esm/actions/public/getTransaction.js
init_transaction();
init_toHex();
async function getTransaction(client, { blockHash, blockNumber, blockTag: blockTag_, hash: hash3, index: index2, sender, nonce }) {
  const blockTag = blockTag_ || "latest";
  const blockNumberHex = blockNumber !== void 0 ? numberToHex(blockNumber) : void 0;
  let transaction = null;
  if (hash3) {
    transaction = await client.request({
      method: "eth_getTransactionByHash",
      params: [hash3]
    }, { dedupe: true });
  } else if (blockHash) {
    transaction = await client.request({
      method: "eth_getTransactionByBlockHashAndIndex",
      params: [blockHash, numberToHex(index2)]
    }, { dedupe: true });
  } else if ((blockNumberHex || blockTag) && typeof index2 === "number") {
    transaction = await client.request({
      method: "eth_getTransactionByBlockNumberAndIndex",
      params: [blockNumberHex || blockTag, numberToHex(index2)]
    }, { dedupe: Boolean(blockNumberHex) });
  } else if (sender && typeof nonce === "number") {
    transaction = await client.request({
      method: "eth_getTransactionBySenderAndNonce",
      params: [sender, numberToHex(nonce)]
    }, { dedupe: true });
  }
  if (!transaction)
    throw new TransactionNotFoundError({
      blockHash,
      blockNumber,
      blockTag,
      hash: hash3,
      index: index2
    });
  const format2 = client.chain?.formatters?.transaction?.format || formatTransaction;
  return format2(transaction, "getTransaction");
}

// node_modules/viem/_esm/actions/public/getTransactionConfirmations.js
async function getTransactionConfirmations(client, { hash: hash3, transactionReceipt }) {
  const [blockNumber, transaction] = await Promise.all([
    getAction(client, getBlockNumber, "getBlockNumber")({}),
    hash3 ? getAction(client, getTransaction, "getTransaction")({ hash: hash3 }) : void 0
  ]);
  const transactionBlockNumber = transactionReceipt?.blockNumber || transaction?.blockNumber;
  if (!transactionBlockNumber)
    return 0n;
  return blockNumber - transactionBlockNumber + 1n;
}

// node_modules/viem/_esm/actions/public/getTransactionReceipt.js
init_transaction();
async function getTransactionReceipt(client, { hash: hash3 }) {
  const receipt = await client.request({
    method: "eth_getTransactionReceipt",
    params: [hash3]
  }, { dedupe: true });
  if (!receipt)
    throw new TransactionReceiptNotFoundError({ hash: hash3 });
  const format2 = client.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt;
  return format2(receipt, "getTransactionReceipt");
}

// node_modules/viem/_esm/actions/public/multicall.js
init_abis();
init_contracts();
init_abi();
init_base();
init_contract();
init_decodeFunctionResult();
init_encodeFunctionData();
init_getChainContractAddress();
init_createBatchScheduler();
init_stringify();
async function multicall(client, parameters) {
  const { account, authorizationList, allowFailure = true, blockHash, blockNumber, blockOverrides, blockTag, requireCanonical, stateOverride } = parameters;
  const contracts = parameters.contracts;
  const batch = typeof client.batch?.multicall === "object" ? client.batch.multicall : {};
  const batchSize = parameters.batchSize ?? batch.batchSize ?? 1024;
  const deployless = parameters.deployless ?? batch.deployless ?? false;
  const multicallAddress = (() => {
    if (parameters.multicallAddress)
      return parameters.multicallAddress;
    if (deployless)
      return null;
    if (client.chain) {
      return getChainContractAddress({
        blockNumber,
        chain: client.chain,
        contract: "multicall3"
      });
    }
    throw new Error("client chain not configured. multicallAddress is required.");
  })();
  const chunkedCalls = [[]];
  let currentChunk = 0;
  let currentChunkSize = 0;
  for (let i = 0; i < contracts.length; i++) {
    const { abi: abi2, address, args, functionName } = contracts[i];
    try {
      const callData = encodeFunctionData({ abi: abi2, args, functionName });
      currentChunkSize += (callData.length - 2) / 2;
      if (
        // Check if batching is enabled.
        batchSize > 0 && // Check if the current size of the batch exceeds the size limit.
        currentChunkSize > batchSize && // Check if the current chunk is not already empty.
        chunkedCalls[currentChunk].length > 0
      ) {
        currentChunk++;
        currentChunkSize = (callData.length - 2) / 2;
        chunkedCalls[currentChunk] = [];
      }
      chunkedCalls[currentChunk] = [
        ...chunkedCalls[currentChunk],
        {
          allowFailure: true,
          callData,
          target: address
        }
      ];
    } catch (err) {
      const error = getContractError(err, {
        abi: abi2,
        address,
        args,
        docsPath: "/docs/contract/multicall",
        functionName,
        sender: account
      });
      if (!allowFailure)
        throw error;
      chunkedCalls[currentChunk] = [
        ...chunkedCalls[currentChunk],
        {
          allowFailure: true,
          callData: "0x",
          target: address
        }
      ];
    }
  }
  const batching = Boolean(client.batch?.multicall);
  const batches = batching ? chunkedCalls.flatMap((calls) => calls.map((call2) => [call2])) : chunkedCalls;
  const aggregate3Results = await Promise.allSettled(batches.map((calls) => {
    if (batching)
      return scheduleMulticall2(client, {
        account,
        authorizationList,
        batchSize,
        blockHash,
        blockNumber,
        blockOverrides,
        blockTag,
        call: calls[0],
        multicallAddress,
        requireCanonical,
        stateOverride
      }).then((result) => [result]);
    return getAction(client, readContract, "readContract")({
      ...multicallAddress === null ? { code: multicall3Bytecode } : { address: multicallAddress },
      abi: multicall3Abi,
      account,
      args: [calls],
      authorizationList,
      blockHash,
      blockNumber,
      blockOverrides,
      blockTag,
      functionName: "aggregate3",
      requireCanonical,
      stateOverride
    });
  }));
  const results = [];
  for (let i = 0; i < aggregate3Results.length; i++) {
    const result = aggregate3Results[i];
    if (result.status === "rejected") {
      if (!allowFailure)
        throw result.reason;
      for (let j = 0; j < batches[i].length; j++) {
        results.push({
          status: "failure",
          error: result.reason,
          result: void 0
        });
      }
      continue;
    }
    const aggregate3Result = result.value;
    for (let j = 0; j < aggregate3Result.length; j++) {
      const { returnData, success } = aggregate3Result[j];
      const { callData } = batches[i][j];
      const { abi: abi2, address, functionName, args } = contracts[results.length];
      try {
        if (callData === "0x")
          throw new AbiDecodingZeroDataError();
        if (!success)
          throw new RawContractError({ data: returnData });
        const result2 = decodeFunctionResult({
          abi: abi2,
          args,
          data: returnData,
          functionName
        });
        results.push(allowFailure ? { result: result2, status: "success" } : result2);
      } catch (err) {
        const error = getContractError(err, {
          abi: abi2,
          address,
          args,
          docsPath: "/docs/contract/multicall",
          functionName
        });
        if (!allowFailure)
          throw error;
        results.push({ error, result: void 0, status: "failure" });
      }
    }
  }
  if (results.length !== contracts.length)
    throw new BaseError2("multicall results mismatch");
  return results;
}
async function scheduleMulticall2(client, parameters) {
  const { batchSize, call: call2, multicallAddress, ...rest } = parameters;
  const { wait: wait2 = 0 } = typeof client.batch?.multicall === "object" ? client.batch.multicall : {};
  const { schedule } = createBatchScheduler({
    id: stringify(["multicall", client.uid, batchSize, multicallAddress, rest]),
    wait: wait2,
    shouldSplitBatch(calls) {
      if (batchSize === 0)
        return false;
      const size5 = calls.reduce((size6, { callData }) => size6 + (callData.length - 2) / 2, 0);
      return size5 > batchSize;
    },
    fn: (calls) => getAction(client, readContract, "readContract")({
      ...multicallAddress === null ? { code: multicall3Bytecode } : { address: multicallAddress },
      ...rest,
      abi: multicall3Abi,
      args: [calls],
      functionName: "aggregate3"
    })
  });
  const [result] = await schedule(call2);
  return result;
}

// node_modules/viem/_esm/actions/public/simulateBlocks.js
init_BlockOverrides();
init_parseAccount();
init_abi();
init_contract();
init_node();
init_decodeFunctionResult();
init_encodeFunctionData();
init_concat();
init_toHex();
init_getNodeError();
init_transactionRequest();
init_stateOverride2();
init_assertRequest();
async function simulateBlocks(client, parameters) {
  const { blockNumber, blockTag = client.experimental_blockTag ?? "latest", blocks, returnFullTransactions, traceTransfers, validation } = parameters;
  try {
    const blockStateCalls = [];
    for (const block2 of blocks) {
      const blockOverrides = block2.blockOverrides ? toRpc2(block2.blockOverrides) : void 0;
      const calls = block2.calls.map((call_) => {
        const call2 = call_;
        const account = call2.account ? parseAccount(call2.account) : void 0;
        const data = call2.abi ? encodeFunctionData(call2) : call2.data;
        const request = {
          ...call2,
          account,
          data: call2.dataSuffix ? concat([data || "0x", call2.dataSuffix]) : data,
          from: call2.from ?? account?.address
        };
        assertRequest(request);
        return formatTransactionRequest(request);
      });
      const stateOverrides = block2.stateOverrides ? serializeStateOverride(block2.stateOverrides) : void 0;
      blockStateCalls.push({
        blockOverrides,
        calls,
        stateOverrides
      });
    }
    const blockNumberHex = typeof blockNumber === "bigint" ? numberToHex(blockNumber) : void 0;
    const block = blockNumberHex || blockTag;
    const result = await client.request({
      method: "eth_simulateV1",
      params: [
        { blockStateCalls, returnFullTransactions, traceTransfers, validation },
        block
      ]
    });
    return result.map((block2, i) => ({
      ...formatBlock(block2),
      calls: block2.calls.map((call2, j) => {
        const { abi: abi2, args, functionName, to } = blocks[i].calls[j];
        const data = call2.error?.data ?? call2.returnData;
        const gasUsed = BigInt(call2.gasUsed);
        const logs = call2.logs?.map((log) => formatLog(log));
        const status = call2.status === "0x1" ? "success" : "failure";
        const result2 = abi2 && status === "success" && data !== "0x" ? decodeFunctionResult({
          abi: abi2,
          data,
          functionName
        }) : null;
        const error = (() => {
          if (status === "success")
            return void 0;
          let error2;
          if (data === "0x")
            error2 = new AbiDecodingZeroDataError();
          else if (data)
            error2 = new RawContractError({ data });
          if (!error2)
            return void 0;
          return getContractError(error2, {
            abi: abi2 ?? [],
            address: to ?? "0x",
            args,
            functionName: functionName ?? "<unknown>"
          });
        })();
        return {
          data,
          gasUsed,
          logs,
          status,
          ...status === "success" ? {
            result: result2
          } : {
            error
          }
        };
      })
    }));
  } catch (e) {
    const cause = e;
    const error = getNodeError(cause, {});
    if (error instanceof UnknownNodeError)
      throw cause;
    throw error;
  }
}

// node_modules/ox/_esm/core/AbiItem.js
init_exports();
init_Errors();
init_Hex();

// node_modules/ox/_esm/core/internal/abiItem.js
init_Errors();
function normalizeSignature2(signature) {
  let active = true;
  let current = "";
  let level = 0;
  let result = "";
  let valid = false;
  for (let i = 0; i < signature.length; i++) {
    const char = signature[i];
    if (["(", ")", ","].includes(char))
      active = true;
    if (char === "(")
      level++;
    if (char === ")")
      level--;
    if (!active)
      continue;
    if (level === 0) {
      if (char === " " && ["event", "function", "error", ""].includes(result))
        result = "";
      else {
        result += char;
        if (char === ")") {
          valid = true;
          break;
        }
      }
      continue;
    }
    if (char === " ") {
      if (signature[i - 1] !== "," && current !== "," && current !== ",(") {
        current = "";
        active = false;
      }
      continue;
    }
    result += char;
    current += char;
  }
  if (!valid)
    throw new BaseError3("Unable to normalize signature.");
  return result;
}
function isArgOfType2(arg, abiParameter) {
  const argType = typeof arg;
  const abiParameterType = abiParameter.type;
  switch (abiParameterType) {
    case "address":
      return validate3(arg, { strict: false });
    case "bool":
      return argType === "boolean";
    case "function":
      return argType === "string";
    case "string":
      return argType === "string";
    default: {
      if (abiParameterType === "tuple" && "components" in abiParameter)
        return Object.values(abiParameter.components).every((component, index2) => {
          return isArgOfType2(Object.values(arg)[index2], component);
        });
      if (/^u?int(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/.test(abiParameterType))
        return argType === "number" || argType === "bigint";
      if (/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/.test(abiParameterType))
        return argType === "string" || arg instanceof Uint8Array;
      if (/[a-z]+[1-9]{0,3}(\[[0-9]{0,}\])+$/.test(abiParameterType)) {
        return Array.isArray(arg) && arg.every((x) => isArgOfType2(x, {
          ...abiParameter,
          // Pop off `[]` or `[M]` from end of type
          type: abiParameterType.replace(/(\[[0-9]{0,}\])$/, "")
        }));
      }
      return false;
    }
  }
}
function getAmbiguousTypes2(sourceParameters, targetParameters, args) {
  for (const parameterIndex in sourceParameters) {
    const sourceParameter = sourceParameters[parameterIndex];
    const targetParameter = targetParameters[parameterIndex];
    if (sourceParameter.type === "tuple" && targetParameter.type === "tuple" && "components" in sourceParameter && "components" in targetParameter)
      return getAmbiguousTypes2(sourceParameter.components, targetParameter.components, args[parameterIndex]);
    const types = [sourceParameter.type, targetParameter.type];
    const ambiguous = (() => {
      if (types.includes("address") && types.includes("bytes20"))
        return true;
      if (types.includes("address") && types.includes("string"))
        return validate3(args[parameterIndex], {
          strict: false
        });
      if (types.includes("address") && types.includes("bytes"))
        return validate3(args[parameterIndex], {
          strict: false
        });
      return false;
    })();
    if (ambiguous)
      return types;
  }
  return;
}

// node_modules/ox/_esm/core/AbiItem.js
function from10(abiItem, options = {}) {
  const { prepare = true } = options;
  const item = (() => {
    if (Array.isArray(abiItem))
      return parseAbiItem(abiItem);
    if (typeof abiItem === "string")
      return parseAbiItem(abiItem);
    return abiItem;
  })();
  return {
    ...item,
    ...prepare ? { hash: getSignatureHash(item) } : {}
  };
}
function fromAbi(abi2, name, options) {
  const { args = [], prepare = true } = options ?? {};
  const isSelector = validate2(name, { strict: false });
  const abiItems = abi2.filter((abiItem2) => {
    if (isSelector) {
      if (abiItem2.type === "function" || abiItem2.type === "error")
        return getSelector(abiItem2) === slice3(name, 0, 4);
      if (abiItem2.type === "event")
        return getSignatureHash(abiItem2) === name;
      return false;
    }
    return "name" in abiItem2 && abiItem2.name === name;
  });
  if (abiItems.length === 0)
    throw new NotFoundError({ name });
  if (abiItems.length === 1)
    return {
      ...abiItems[0],
      ...prepare ? { hash: getSignatureHash(abiItems[0]) } : {}
    };
  let matchedAbiItem;
  for (const abiItem2 of abiItems) {
    if (!("inputs" in abiItem2))
      continue;
    if (!args || args.length === 0) {
      if (!abiItem2.inputs || abiItem2.inputs.length === 0)
        return {
          ...abiItem2,
          ...prepare ? { hash: getSignatureHash(abiItem2) } : {}
        };
      continue;
    }
    if (!abiItem2.inputs)
      continue;
    if (abiItem2.inputs.length === 0)
      continue;
    if (abiItem2.inputs.length !== args.length)
      continue;
    const matched = args.every((arg, index2) => {
      const abiParameter = "inputs" in abiItem2 && abiItem2.inputs[index2];
      if (!abiParameter)
        return false;
      return isArgOfType2(arg, abiParameter);
    });
    if (matched) {
      if (matchedAbiItem && "inputs" in matchedAbiItem && matchedAbiItem.inputs) {
        const ambiguousTypes = getAmbiguousTypes2(abiItem2.inputs, matchedAbiItem.inputs, args);
        if (ambiguousTypes)
          throw new AmbiguityError({
            abiItem: abiItem2,
            type: ambiguousTypes[0]
          }, {
            abiItem: matchedAbiItem,
            type: ambiguousTypes[1]
          });
      }
      matchedAbiItem = abiItem2;
    }
  }
  const abiItem = (() => {
    if (matchedAbiItem)
      return matchedAbiItem;
    const [abiItem2, ...overloads] = abiItems;
    return { ...abiItem2, overloads };
  })();
  if (!abiItem)
    throw new NotFoundError({ name });
  return {
    ...abiItem,
    ...prepare ? { hash: getSignatureHash(abiItem) } : {}
  };
}
function getSelector(...parameters) {
  const abiItem = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi2, name] = parameters;
      return fromAbi(abi2, name);
    }
    return parameters[0];
  })();
  return slice3(getSignatureHash(abiItem), 0, 4);
}
function getSignature(...parameters) {
  const abiItem = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi2, name] = parameters;
      return fromAbi(abi2, name);
    }
    return parameters[0];
  })();
  const signature = (() => {
    if (typeof abiItem === "string")
      return abiItem;
    return formatAbiItem(abiItem);
  })();
  return normalizeSignature2(signature);
}
function getSignatureHash(...parameters) {
  const abiItem = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi2, name] = parameters;
      return fromAbi(abi2, name);
    }
    return parameters[0];
  })();
  if (typeof abiItem !== "string" && "hash" in abiItem && abiItem.hash)
    return abiItem.hash;
  return keccak2562(fromString2(getSignature(abiItem)));
}
var AmbiguityError = class extends BaseError3 {
  constructor(x, y) {
    super("Found ambiguous types in overloaded ABI Items.", {
      metaMessages: [
        // TODO: abitype to add support for signature-formatted ABI items.
        `\`${x.type}\` in \`${normalizeSignature2(formatAbiItem(x.abiItem))}\`, and`,
        `\`${y.type}\` in \`${normalizeSignature2(formatAbiItem(y.abiItem))}\``,
        "",
        "These types encode differently and cannot be distinguished at runtime.",
        "Remove one of the ambiguous items in the ABI."
      ]
    });
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiItem.AmbiguityError"
    });
  }
};
var NotFoundError = class extends BaseError3 {
  constructor({ name, data, type = "item" }) {
    const selector = (() => {
      if (name)
        return ` with name "${name}"`;
      if (data)
        return ` with data "${data}"`;
      return "";
    })();
    super(`ABI ${type}${selector} not found.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "AbiItem.NotFoundError"
    });
  }
};

// node_modules/ox/_esm/core/AbiConstructor.js
init_Hex();
function encode3(...parameters) {
  const [abiConstructor, options] = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi2, options2] = parameters;
      return [fromAbi2(abi2), options2];
    }
    return parameters;
  })();
  const { bytecode, args } = options;
  return concat2(bytecode, abiConstructor.inputs?.length && args?.length ? encode2(abiConstructor.inputs, args) : "0x");
}
function from11(abiConstructor) {
  return from10(abiConstructor);
}
function fromAbi2(abi2) {
  const item = abi2.find((item2) => item2.type === "constructor");
  if (!item)
    throw new NotFoundError({ name: "constructor" });
  return item;
}

// node_modules/ox/_esm/core/AbiEvent.js
function from12(abiEvent, options = {}) {
  return from10(abiEvent, options);
}
function getSelector2(abiItem) {
  return getSignatureHash(abiItem);
}

// node_modules/ox/_esm/core/AbiFunction.js
init_Hex();
function decodeResult(...parameters) {
  const [abiFunction, data, options = {}] = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi2, name, data2, options2] = parameters;
      return [fromAbi3(abi2, name), data2, options2];
    }
    return parameters;
  })();
  const values = decode(abiFunction.outputs, data, options);
  if (values && Object.keys(values).length === 0)
    return void 0;
  if (values && Object.keys(values).length === 1) {
    if (Array.isArray(values))
      return values[0];
    return Object.values(values)[0];
  }
  return values;
}
function encodeData2(...parameters) {
  const [abiFunction, args = []] = (() => {
    if (Array.isArray(parameters[0])) {
      const [abi2, name, args3] = parameters;
      return [fromAbi3(abi2, name, { args: args3 }), args3];
    }
    const [abiFunction2, args2] = parameters;
    return [abiFunction2, args2];
  })();
  const { overloads } = abiFunction;
  const item = overloads ? fromAbi3([abiFunction, ...overloads], abiFunction.name, {
    args
  }) : abiFunction;
  const selector = getSelector3(item);
  const data = args.length > 0 ? encode2(item.inputs, args) : void 0;
  return data ? concat2(selector, data) : selector;
}
function from13(abiFunction, options = {}) {
  return from10(abiFunction, options);
}
function fromAbi3(abi2, name, options) {
  const item = fromAbi(abi2, name, options);
  if (item.type !== "function")
    throw new NotFoundError({ name, type: "function" });
  return item;
}
function getSelector3(abiItem) {
  return getSelector(abiItem);
}

// node_modules/viem/_esm/actions/public/simulateCalls.js
init_parseAccount();

// node_modules/viem/_esm/constants/address.js
var ethAddress = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";
var zeroAddress = "0x0000000000000000000000000000000000000000";

// node_modules/viem/_esm/actions/public/simulateCalls.js
init_contracts();
init_base();
init_contract();
init_node();
init_pad();
init_fromHex();
init_call();
var getBalanceCode = "0x6080604052348015600e575f80fd5b5061016d8061001c5f395ff3fe608060405234801561000f575f80fd5b5060043610610029575f3560e01c8063f8b2cb4f1461002d575b5f80fd5b610047600480360381019061004291906100db565b61005d565b604051610054919061011e565b60405180910390f35b5f8173ffffffffffffffffffffffffffffffffffffffff16319050919050565b5f80fd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6100aa82610081565b9050919050565b6100ba816100a0565b81146100c4575f80fd5b50565b5f813590506100d5816100b1565b92915050565b5f602082840312156100f0576100ef61007d565b5b5f6100fd848285016100c7565b91505092915050565b5f819050919050565b61011881610106565b82525050565b5f6020820190506101315f83018461010f565b9291505056fea26469706673582212203b9fe929fe995c7cf9887f0bdba8a36dd78e8b73f149b17d2d9ad7cd09d2dc6264736f6c634300081a0033";
var staticCallCode = "0x608060405234801561000f575f5ffd5b5060043610610029575f3560e01c8063fd00430c1461002d575b5f5ffd5b6100476004803603810190610042919061012b565b610049565b005b80825f375f5f825f865afa610060573d5f5f3e3d5ffd5b3d5f5f3e3d5ff35b5f5ffd5b5f5ffd5b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61009982610070565b9050919050565b6100a98161008f565b81146100b3575f5ffd5b50565b5f813590506100c4816100a0565b92915050565b5f5ffd5b5f5ffd5b5f5ffd5b5f5f83601f8401126100eb576100ea6100ca565b5b8235905067ffffffffffffffff811115610108576101076100ce565b5b602083019150836001820283011115610124576101236100d2565b5b9250929050565b5f5f5f6040848603121561014257610141610068565b5b5f61014f868287016100b6565b935050602084013567ffffffffffffffff8111156101705761016f61006c565b5b61017c868287016100d6565b9250925050925092509256fea2646970667358221220635ed99185cacf3f2acba6921f23687c969cec2bbaf5f9ad599f507e6e105e6964736f6c63430008230033";
var staticCallAddressBase = 0x00000000000000000000000000000000deadbeefn;
var transferEventSelector = getSelector2(from12("event Transfer(address indexed from, address indexed to, uint256 value)"));
var balanceOfFunction = from13("function balanceOf(address) returns (uint256)");
var decimalsFunction = from13("function decimals() returns (uint256)");
var tokenUriFunction = from13("function tokenURI(uint256) returns (string)");
var symbolFunction = from13("function symbol() returns (string)");
var staticCallFunction = from13("function query(address target, bytes data)");
async function simulateCalls(client, parameters) {
  const { blockNumber, blockTag, calls, stateOverrides, traceAssetChanges, traceTransfers, validation } = parameters;
  const account = parameters.account ? parseAccount(parameters.account) : void 0;
  if (traceAssetChanges && !account)
    throw new BaseError2("`account` is required when `traceAssetChanges` is true");
  const getBalanceData = account ? encode3(from11("constructor(bytes, bytes)"), {
    bytecode: deploylessCallViaBytecodeBytecode,
    args: [
      getBalanceCode,
      encodeData2(from13("function getBalance(address)"), [account.address])
    ]
  }) : void 0;
  const blockTag_ = blockTag ?? client.experimental_blockTag ?? "latest";
  let baseBlockNumber = blockNumber;
  if (traceAssetChanges && typeof baseBlockNumber !== "bigint" && blockTag_ !== "earliest" && blockTag_ !== "pending") {
    if (blockTag_ === "latest")
      baseBlockNumber = await getBlockNumber(client, { cacheTime: 0 });
    else {
      const block2 = await getBlock(client, { blockTag: blockTag_ });
      if (typeof block2.number !== "bigint")
        throw new BaseError2(`Block tag \`${blockTag_}\` did not resolve to a number.`);
      baseBlockNumber = block2.number;
    }
  }
  const block_ = typeof baseBlockNumber === "bigint" ? { blockNumber: baseBlockNumber } : { blockTag: blockTag_ };
  const discovery = traceAssetChanges ? await simulateBlocks(client, {
    ...block_,
    blocks: [
      {
        calls: calls.map((call2) => ({
          ...call2,
          from: account.address
        })),
        stateOverrides
      }
    ],
    traceTransfers,
    validation
  }) : void 0;
  const assetAddresses = discovery ? [
    .../* @__PURE__ */ new Set([
      ...tokensFromLogs(discovery[0].calls.flatMap((call2) => call2.logs ?? []), account.address),
      // Included even for calls without data: contracts that mint on receiving
      // native value (WETH) emit `Deposit`, not a `Transfer` the logs would catch.
      // Candidates without code fall out at `isBalance`.
      ...parameters.calls.map((call2) => call2.to?.toLowerCase())
    ])
  ].filter((address) => Boolean(address) && address !== ethAddress && address !== zeroAddress) : [];
  const staticCallAddress = getStaticCallAddress([
    ...account ? [account.address] : [],
    ...assetAddresses,
    ...stateOverrides?.map(({ address }) => address) ?? []
  ]);
  const staticCallStateOverrides = [
    { address: staticCallAddress, code: staticCallCode }
  ];
  const [balanceCallsPre, blocks] = await Promise.all([
    traceAssetChanges ? Promise.all([
      readBalance(client, {
        account: account.address,
        ...block_,
        data: getBalanceData,
        stateOverride: stateOverrides
      }),
      ...assetAddresses.map((address) => readBalance(client, {
        account: account.address,
        address,
        ...block_,
        data: encodeData2(balanceOfFunction, [
          account.address
        ]),
        staticCallAddress,
        stateOverride: stateOverrides
      }))
    ]) : [],
    simulateBlocks(client, {
      ...block_,
      blocks: [
        {
          calls: [...calls, { to: zeroAddress }].map((call2) => ({
            ...call2,
            from: account?.address
          })),
          stateOverrides
        },
        ...traceAssetChanges ? [
          // ETH post balances
          {
            calls: [{ data: getBalanceData }]
          },
          // Asset post balances
          {
            calls: assetAddresses.map((address) => ({
              to: staticCallAddress,
              data: encodeStaticCall(address, encodeData2(balanceOfFunction, [
                account.address
              ]))
            })),
            stateOverrides: staticCallStateOverrides
          },
          // Decimals
          {
            calls: assetAddresses.map((address) => ({
              to: staticCallAddress,
              data: encodeStaticCall(address, encodeData2(decimalsFunction))
            })),
            stateOverrides: staticCallStateOverrides
          },
          // Token URI
          {
            calls: assetAddresses.map((address) => ({
              to: staticCallAddress,
              data: encodeStaticCall(address, encodeData2(tokenUriFunction, [0n]))
            })),
            stateOverrides: staticCallStateOverrides
          },
          // Symbols
          {
            calls: assetAddresses.map((address) => ({
              to: staticCallAddress,
              data: encodeStaticCall(address, encodeData2(symbolFunction))
            })),
            stateOverrides: staticCallStateOverrides
          }
        ] : []
      ],
      traceTransfers,
      validation
    })
  ]);
  const block_results = blocks[0];
  const [block_ethPost, block_assetsPost, block_decimals, block_tokenURI, block_symbols] = traceAssetChanges ? blocks.slice(1) : [];
  const { calls: block_calls, ...block } = block_results;
  const results = block_calls.slice(0, -1);
  const balancesPre = balanceCallsPre.map((call2) => isBalance(call2) ? hexToBigInt(call2.data) : null);
  const ethPost = block_ethPost?.calls ?? [];
  const assetsPost = block_assetsPost?.calls ?? [];
  const balanceCallsPost = [...ethPost, ...assetsPost];
  const balancesPost = balanceCallsPost.map((call2) => isBalance(call2) ? hexToBigInt(call2.data) : null);
  const decimals = (block_decimals?.calls ?? []).map((call2) => decodeAssetResult(call2, decimalsFunction));
  const symbols = (block_symbols?.calls ?? []).map((call2) => decodeAssetResult(call2, symbolFunction));
  const tokenURI = (block_tokenURI?.calls ?? []).map((call2) => decodeAssetResult(call2, tokenUriFunction));
  const changes = [];
  for (const [i, balancePost] of balancesPost.entries()) {
    const balancePre_ = balancesPre[i];
    const preCall = balanceCallsPre[i];
    const balancePre = typeof balancePre_ === "bigint" ? balancePre_ : i > 0 && preCall?.status === "success" && preCall.data === "0x" ? 0n : null;
    if (typeof balancePost !== "bigint")
      continue;
    if (typeof balancePre !== "bigint")
      continue;
    const decimals_ = decimals[i - 1];
    const symbol_ = symbols[i - 1];
    const tokenURI_ = tokenURI[i - 1];
    const token = (() => {
      if (i === 0)
        return {
          address: ethAddress,
          decimals: 18,
          symbol: "ETH"
        };
      return {
        address: assetAddresses[i - 1],
        decimals: tokenURI_ || decimals_ ? Number(decimals_ ?? 1) : void 0,
        symbol: symbol_ ?? void 0
      };
    })();
    changes.push({
      token,
      value: {
        pre: balancePre,
        post: balancePost,
        diff: balancePost - balancePre
      }
    });
  }
  return {
    assetChanges: changes,
    block,
    results
  };
}
function encodeStaticCall(address, data) {
  return encodeData2(staticCallFunction, [address, data]);
}
function tokensFromLogs(logs, account) {
  const account_ = pad(account.toLowerCase(), { size: 32 });
  return logs.filter((log) => {
    if (log.topics[0]?.toLowerCase() !== transferEventSelector)
      return false;
    if (log.address.toLowerCase() === ethAddress)
      return false;
    return log.topics[1]?.toLowerCase() === account_ || log.topics[2]?.toLowerCase() === account_;
  }).map((log) => log.address.toLowerCase());
}
function isBalance(call2) {
  return call2.status === "success" && /^0x[\da-f]{64}$/i.test(call2.data);
}
function decodeAssetResult(call2, abiFunction) {
  if (call2.status === "failure" || call2.data === "0x")
    return null;
  try {
    return decodeResult(abiFunction, call2.data);
  } catch {
    return null;
  }
}
async function readBalance(client, parameters) {
  const { account, address, blockNumber, blockTag, data, staticCallAddress, stateOverride } = parameters;
  try {
    const result = await call({ ...client, ccipRead: false }, {
      account: address ? zeroAddress : account,
      data: address ? encodeStaticCall(address, data) : data,
      stateOverride: address && staticCallAddress ? [
        ...stateOverride ?? [],
        { address: staticCallAddress, code: staticCallCode }
      ] : stateOverride,
      ...address ? { to: staticCallAddress } : {},
      ...typeof blockNumber === "bigint" ? { blockNumber } : { blockTag }
    });
    return { data: result.data ?? "0x", status: "success" };
  } catch (error) {
    if (!(error instanceof CallExecutionError) || !(error.cause instanceof ExecutionRevertedError))
      throw error;
    return { data: "0x", status: "failure" };
  }
}
function getStaticCallAddress(addresses) {
  const occupied = new Set(addresses.map((address) => address.toLowerCase()));
  let value = staticCallAddressBase;
  while (occupied.has(`0x${value.toString(16).padStart(40, "0")}`))
    value++;
  return `0x${value.toString(16).padStart(40, "0")}`;
}

// node_modules/ox/_esm/erc6492/SignatureErc6492.js
var SignatureErc6492_exports = {};
__export(SignatureErc6492_exports, {
  InvalidWrappedSignatureError: () => InvalidWrappedSignatureError2,
  assert: () => assert7,
  from: () => from14,
  magicBytes: () => magicBytes2,
  universalSignatureValidatorAbi: () => universalSignatureValidatorAbi,
  universalSignatureValidatorBytecode: () => universalSignatureValidatorBytecode,
  unwrap: () => unwrap2,
  validate: () => validate5,
  wrap: () => wrap2
});
init_Errors();
init_Hex();
var magicBytes2 = "0x6492649264926492649264926492649264926492649264926492649264926492";
var universalSignatureValidatorBytecode = "0x608060405234801561001057600080fd5b5060405161069438038061069483398101604081905261002f9161051e565b600061003c848484610048565b9050806000526001601ff35b60007f64926492649264926492649264926492649264926492649264926492649264926100748361040c565b036101e7576000606080848060200190518101906100929190610577565b60405192955090935091506000906001600160a01b038516906100b69085906105dd565b6000604051808303816000865af19150503d80600081146100f3576040519150601f19603f3d011682016040523d82523d6000602084013e6100f8565b606091505b50509050876001600160a01b03163b60000361016057806101605760405162461bcd60e51b815260206004820152601e60248201527f5369676e617475726556616c696461746f723a206465706c6f796d656e74000060448201526064015b60405180910390fd5b604051630b135d3f60e11b808252906001600160a01b038a1690631626ba7e90610190908b9087906004016105f9565b602060405180830381865afa1580156101ad573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101d19190610633565b6001600160e01b03191614945050505050610405565b6001600160a01b0384163b1561027a57604051630b135d3f60e11b808252906001600160a01b03861690631626ba7e9061022790879087906004016105f9565b602060405180830381865afa158015610244573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102689190610633565b6001600160e01b031916149050610405565b81516041146102df5760405162461bcd60e51b815260206004820152603a602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e6174757265206c656e6774680000000000006064820152608401610157565b6102e7610425565b5060208201516040808401518451859392600091859190811061030c5761030c61065d565b016020015160f81c9050601b811480159061032b57508060ff16601c14155b1561038c5760405162461bcd60e51b815260206004820152603b602482015260008051602061067483398151915260448201527f3a20696e76616c6964207369676e617475726520762076616c756500000000006064820152608401610157565b60408051600081526020810180835289905260ff83169181019190915260608101849052608081018390526001600160a01b0389169060019060a0016020604051602081039080840390855afa1580156103ea573d6000803e3d6000fd5b505050602060405103516001600160a01b0316149450505050505b9392505050565b600060208251101561041d57600080fd5b508051015190565b60405180606001604052806003906020820280368337509192915050565b6001600160a01b038116811461045857600080fd5b50565b634e487b7160e01b600052604160045260246000fd5b60005b8381101561048c578181015183820152602001610474565b50506000910152565b600082601f8301126104a657600080fd5b81516001600160401b038111156104bf576104bf61045b565b604051601f8201601f19908116603f011681016001600160401b03811182821017156104ed576104ed61045b565b60405281815283820160200185101561050557600080fd5b610516826020830160208701610471565b949350505050565b60008060006060848603121561053357600080fd5b835161053e81610443565b6020850151604086015191945092506001600160401b0381111561056157600080fd5b61056d86828701610495565b9150509250925092565b60008060006060848603121561058c57600080fd5b835161059781610443565b60208501519093506001600160401b038111156105b357600080fd5b6105bf86828701610495565b604086015190935090506001600160401b0381111561056157600080fd5b600082516105ef818460208701610471565b9190910192915050565b828152604060208201526000825180604084015261061e816060850160208701610471565b601f01601f1916919091016060019392505050565b60006020828403121561064557600080fd5b81516001600160e01b03198116811461040557600080fd5b634e487b7160e01b600052603260045260246000fdfe5369676e617475726556616c696461746f72237265636f7665725369676e6572";
var universalSignatureValidatorAbi = [
  {
    inputs: [
      {
        name: "_signer",
        type: "address"
      },
      {
        name: "_hash",
        type: "bytes32"
      },
      {
        name: "_signature",
        type: "bytes"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [
      {
        name: "_signer",
        type: "address"
      },
      {
        name: "_hash",
        type: "bytes32"
      },
      {
        name: "_signature",
        type: "bytes"
      }
    ],
    outputs: [
      {
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function",
    name: "isValidSig"
  }
];
function assert7(wrapped) {
  if (slice3(wrapped, -32) !== magicBytes2)
    throw new InvalidWrappedSignatureError2(wrapped);
}
function from14(wrapped) {
  if (typeof wrapped === "string")
    return unwrap2(wrapped);
  return wrapped;
}
function unwrap2(wrapped) {
  assert7(wrapped);
  const [to, data, signature] = decode(from5("address, bytes, bytes"), wrapped);
  return { data, signature, to };
}
function wrap2(value) {
  const { data, signature, to } = value;
  return concat2(encode2(from5("address, bytes, bytes"), [
    to,
    data,
    signature
  ]), magicBytes2);
}
function validate5(wrapped) {
  try {
    assert7(wrapped);
    return true;
  } catch {
    return false;
  }
}
var InvalidWrappedSignatureError2 = class extends BaseError3 {
  constructor(wrapped) {
    super(`Value \`${wrapped}\` is an invalid ERC-6492 wrapped signature.`);
    Object.defineProperty(this, "name", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: "SignatureErc6492.InvalidWrappedSignatureError"
    });
  }
};

// node_modules/viem/_esm/actions/public/verifyHash.js
init_abis();
init_contracts();
init_contract();
init_encodeDeployData();
init_encodeFunctionData();
init_getAddress();
init_isAddressEqual();
init_concat();
init_isHex();
init_fromHex();
init_toHex();

// node_modules/viem/_esm/utils/signature/serializeSignature.js
init_secp256k1();
init_fromHex();
init_toBytes();
function serializeSignature({ r, s, to = "hex", v, yParity }) {
  const yParity_ = (() => {
    if (yParity === 0 || yParity === 1)
      return yParity;
    if (v && (v === 27n || v === 28n || v >= 35n))
      return v % 2n === 0n ? 1 : 0;
    throw new Error("Invalid `v` or `yParity` value");
  })();
  const signature = `0x${new secp256k1.Signature(hexToBigInt(r), hexToBigInt(s)).toCompactHex()}${yParity_ === 0 ? "1b" : "1c"}`;
  if (to === "hex")
    return signature;
  return hexToBytes(signature);
}

// node_modules/viem/_esm/actions/public/verifyHash.js
init_call();
async function verifyHash(client, parameters) {
  const { address, chain = client.chain, hash: hash3, erc6492VerifierAddress: verifierAddress = parameters.universalSignatureVerifierAddress ?? chain?.contracts?.erc6492Verifier?.address, multicallAddress = parameters.multicallAddress ?? chain?.contracts?.multicall3?.address, mode = "auto" } = parameters;
  if (chain?.verifyHash)
    return await chain.verifyHash(client, parameters);
  const signature = (() => {
    const signature2 = parameters.signature;
    if (isHex(signature2))
      return signature2;
    if (typeof signature2 === "object" && "r" in signature2 && "s" in signature2)
      return serializeSignature(signature2);
    return bytesToHex(signature2);
  })();
  try {
    if (mode === "eoa") {
      try {
        const verified = isAddressEqual(getAddress(address), await recoverAddress({ hash: hash3, signature }));
        if (verified)
          return true;
      } catch {
      }
    }
    if (SignatureErc8010_exports.validate(signature))
      return await verifyErc8010(client, {
        ...parameters,
        multicallAddress,
        signature
      });
    return await verifyErc6492(client, {
      ...parameters,
      verifierAddress,
      signature
    });
  } catch (error) {
    if (mode !== "eoa") {
      try {
        const verified = isAddressEqual(getAddress(address), await recoverAddress({ hash: hash3, signature }));
        if (verified)
          return true;
      } catch {
      }
    }
    if (error instanceof VerificationError) {
      return false;
    }
    throw error;
  }
}
async function verifyErc8010(client, parameters) {
  const { address, blockHash, blockNumber, blockTag, hash: hash3, multicallAddress, requireCanonical } = parameters;
  const { authorization: authorization_ox, data: initData, signature, to } = SignatureErc8010_exports.unwrap(parameters.signature);
  const code = await getCode(client, {
    address,
    blockHash,
    blockNumber,
    blockTag,
    requireCanonical
  });
  if (code === concatHex(["0xef0100", authorization_ox.address]))
    return await verifyErc1271(client, {
      ...parameters,
      signature
    });
  const authorization = {
    address: authorization_ox.address,
    chainId: Number(authorization_ox.chainId),
    nonce: Number(authorization_ox.nonce),
    r: numberToHex(authorization_ox.r, { size: 32 }),
    s: numberToHex(authorization_ox.s, { size: 32 }),
    yParity: authorization_ox.yParity
  };
  const valid = await verifyAuthorization({
    address,
    authorization
  });
  if (!valid)
    throw new VerificationError();
  const results = await getAction(client, readContract, "readContract")({
    ...multicallAddress ? { address: multicallAddress } : { code: multicall3Bytecode },
    authorizationList: [authorization],
    abi: multicall3Abi,
    blockHash,
    blockNumber,
    blockTag: "pending",
    functionName: "aggregate3",
    requireCanonical,
    args: [
      [
        ...initData ? [
          {
            allowFailure: true,
            target: to ?? address,
            callData: initData
          }
        ] : [],
        {
          allowFailure: true,
          target: address,
          callData: encodeFunctionData({
            abi: erc1271Abi,
            functionName: "isValidSignature",
            args: [hash3, signature]
          })
        }
      ]
    ]
  });
  const data = results[results.length - 1]?.returnData;
  if (data?.startsWith("0x1626ba7e"))
    return true;
  throw new VerificationError();
}
async function verifyErc6492(client, parameters) {
  const { address, factory, factoryData, hash: hash3, signature, verifierAddress, ...rest } = parameters;
  const wrappedSignature = await (async () => {
    if (!factory && !factoryData)
      return signature;
    if (SignatureErc6492_exports.validate(signature))
      return signature;
    return SignatureErc6492_exports.wrap({
      data: factoryData,
      signature,
      to: factory
    });
  })();
  const args = verifierAddress ? {
    to: verifierAddress,
    data: encodeFunctionData({
      abi: erc6492SignatureValidatorAbi,
      functionName: "isValidSig",
      args: [address, hash3, wrappedSignature]
    }),
    ...rest
  } : {
    data: encodeDeployData({
      abi: erc6492SignatureValidatorAbi,
      args: [address, hash3, wrappedSignature],
      bytecode: erc6492SignatureValidatorByteCode
    }),
    ...rest
  };
  const { data } = await getAction(client, call, "call")(args).catch((error) => {
    if (error instanceof CallExecutionError)
      throw new VerificationError();
    throw error;
  });
  if (hexToBool(data ?? "0x0"))
    return true;
  throw new VerificationError();
}
async function verifyErc1271(client, parameters) {
  const { address, blockHash, blockNumber, blockTag, hash: hash3, requireCanonical, signature } = parameters;
  const result = await getAction(client, readContract, "readContract")({
    address,
    abi: erc1271Abi,
    args: [hash3, signature],
    blockHash,
    blockNumber,
    blockTag,
    functionName: "isValidSignature",
    requireCanonical
  }).catch((error) => {
    if (error instanceof ContractFunctionExecutionError)
      throw new VerificationError();
    throw error;
  });
  if (result.startsWith("0x1626ba7e"))
    return true;
  throw new VerificationError();
}
var VerificationError = class extends Error {
};

// node_modules/viem/_esm/actions/public/verifyMessage.js
async function verifyMessage(client, { address, message, factory, factoryData, signature, ...callRequest }) {
  const hash3 = hashMessage(message);
  return getAction(client, verifyHash, "verifyHash")({
    address,
    factory,
    factoryData,
    hash: hash3,
    signature,
    ...callRequest
  });
}

// node_modules/viem/_esm/actions/public/verifyTypedData.js
async function verifyTypedData(client, parameters) {
  const { address, factory, factoryData, signature, message, primaryType, types, domain, ...callRequest } = parameters;
  const hash3 = hashTypedData({ message, primaryType, types, domain });
  return getAction(client, verifyHash, "verifyHash")({
    address,
    factory,
    factoryData,
    hash: hash3,
    signature,
    ...callRequest
  });
}

// node_modules/viem/_esm/actions/public/waitForTransactionReceipt.js
init_transaction();
init_withResolvers();
init_stringify();

// node_modules/viem/_esm/actions/public/watchBlockNumber.js
init_fromHex();
init_stringify();
function watchBlockNumber(client, { emitOnBegin = false, emitMissed = false, onBlockNumber, onError, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = (() => {
    if (typeof poll_ !== "undefined")
      return poll_;
    if (client.transport.type === "webSocket" || client.transport.type === "ipc")
      return false;
    if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc"))
      return false;
    return true;
  })();
  let prevBlockNumber;
  const pollBlockNumber = () => {
    const observerId = stringify([
      "watchBlockNumber",
      client.uid,
      emitOnBegin,
      emitMissed,
      pollingInterval
    ]);
    return observe(observerId, { onBlockNumber, onError }, (emit) => poll(async () => {
      try {
        const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({ cacheTime: 0 });
        if (prevBlockNumber !== void 0) {
          if (blockNumber === prevBlockNumber)
            return;
          if (blockNumber - prevBlockNumber > 1 && emitMissed) {
            for (let i = prevBlockNumber + 1n; i < blockNumber; i++) {
              emit.onBlockNumber(i, prevBlockNumber);
              prevBlockNumber = i;
            }
          }
        }
        if (prevBlockNumber === void 0 || blockNumber > prevBlockNumber) {
          emit.onBlockNumber(blockNumber, prevBlockNumber);
          prevBlockNumber = blockNumber;
        }
      } catch (err) {
        emit.onError?.(err);
      }
    }, {
      emitOnBegin,
      interval: pollingInterval
    }));
  };
  const subscribeBlockNumber = () => {
    const observerId = stringify([
      "watchBlockNumber",
      client.uid,
      emitOnBegin,
      emitMissed
    ]);
    return observe(observerId, { onBlockNumber, onError }, (emit) => {
      let active = true;
      let unsubscribe = () => active = false;
      (async () => {
        try {
          const transport = (() => {
            if (client.transport.type === "fallback") {
              const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
              if (!transport2)
                return client.transport;
              return transport2.value;
            }
            return client.transport;
          })();
          const { unsubscribe: unsubscribe_ } = await transport.subscribe({
            params: ["newHeads"],
            onData(data) {
              if (!active)
                return;
              const blockNumber = hexToBigInt(data.result?.number);
              emit.onBlockNumber(blockNumber, prevBlockNumber);
              prevBlockNumber = blockNumber;
            },
            onError(error) {
              emit.onError?.(error);
            }
          });
          unsubscribe = unsubscribe_;
          if (!active)
            unsubscribe();
        } catch (err) {
          onError?.(err);
        }
      })();
      return () => unsubscribe();
    });
  };
  return enablePolling ? pollBlockNumber() : subscribeBlockNumber();
}

// node_modules/viem/_esm/actions/public/waitForTransactionReceipt.js
async function waitForTransactionReceipt(client, parameters) {
  const {
    checkReplacement = client.chain?.supportsTransactionReplacementDetection ?? true,
    confirmations = 1,
    hash: hash3,
    onReplaced,
    retryCount = 6,
    retryDelay = ({ count }) => ~~(1 << count) * 200,
    // exponential backoff
    timeout = 18e4
  } = parameters;
  const observerId = stringify(["waitForTransactionReceipt", client.uid, hash3]);
  const pollingInterval = (() => {
    if (parameters.pollingInterval)
      return parameters.pollingInterval;
    if (client.chain?.experimental_preconfirmationTime)
      return client.chain.experimental_preconfirmationTime;
    return client.pollingInterval;
  })();
  let transaction;
  let replacedTransaction;
  let receipt;
  let retrying = false;
  let _unobserve;
  let _unwatch;
  const { promise, resolve, reject } = withResolvers();
  const timer = timeout ? setTimeout(() => {
    _unwatch?.();
    _unobserve?.();
    reject(new WaitForTransactionReceiptTimeoutError({ hash: hash3 }));
  }, timeout) : void 0;
  _unobserve = observe(observerId, { onReplaced, resolve, reject }, async (emit) => {
    receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash: hash3 }).catch(() => void 0);
    if (receipt && confirmations <= 1) {
      clearTimeout(timer);
      emit.resolve(receipt);
      _unobserve?.();
      return;
    }
    _unwatch = getAction(client, watchBlockNumber, "watchBlockNumber")({
      emitMissed: true,
      emitOnBegin: true,
      poll: true,
      pollingInterval,
      async onBlockNumber(blockNumber_) {
        const done = (fn) => {
          clearTimeout(timer);
          _unwatch?.();
          fn();
          _unobserve?.();
        };
        let blockNumber = blockNumber_;
        if (retrying)
          return;
        try {
          if (receipt) {
            if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
              return;
            done(() => emit.resolve(receipt));
            return;
          }
          if (checkReplacement && !transaction) {
            retrying = true;
            await withRetry(async () => {
              transaction = await getAction(client, getTransaction, "getTransaction")({ hash: hash3 });
              if (transaction.blockNumber)
                blockNumber = transaction.blockNumber;
            }, {
              delay: retryDelay,
              retryCount
            });
            retrying = false;
          }
          receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({ hash: hash3 });
          if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
            return;
          done(() => emit.resolve(receipt));
        } catch (err) {
          if (err instanceof TransactionNotFoundError || err instanceof TransactionReceiptNotFoundError) {
            if (!transaction) {
              retrying = false;
              return;
            }
            try {
              replacedTransaction = transaction;
              retrying = true;
              const block = await withRetry(() => getAction(client, getBlock, "getBlock")({
                blockNumber,
                includeTransactions: true
              }), {
                delay: retryDelay,
                retryCount,
                shouldRetry: ({ error }) => error instanceof BlockNotFoundError
              });
              retrying = false;
              const replacementTransaction = block.transactions.find(({ from: from15, nonce }) => from15 === replacedTransaction.from && nonce === replacedTransaction.nonce);
              if (!replacementTransaction)
                return;
              receipt = await getAction(client, getTransactionReceipt, "getTransactionReceipt")({
                hash: replacementTransaction.hash
              });
              if (confirmations > 1 && (!receipt.blockNumber || blockNumber - receipt.blockNumber + 1n < confirmations))
                return;
              let reason = "replaced";
              if (replacementTransaction.to === replacedTransaction.to && replacementTransaction.value === replacedTransaction.value && replacementTransaction.input === replacedTransaction.input) {
                reason = "repriced";
              } else if (replacementTransaction.from === replacementTransaction.to && replacementTransaction.value === 0n) {
                reason = "cancelled";
              }
              done(() => {
                emit.onReplaced?.({
                  reason,
                  replacedTransaction,
                  transaction: replacementTransaction,
                  transactionReceipt: receipt
                });
                emit.resolve(receipt);
              });
            } catch (err_) {
              done(() => emit.reject(err_));
            }
          } else {
            done(() => emit.reject(err));
          }
        }
      }
    });
  });
  return promise;
}

// node_modules/viem/_esm/actions/public/watchBlockHeaders.js
init_stringify();
var blockFields = [
  "size",
  "totalDifficulty",
  "transactions",
  "uncles",
  "withdrawals"
];
function watchBlockHeaders(client, { onBlockHeader, onError }) {
  let prevBlockHeader;
  const observerId = stringify(["watchBlockHeaders", client.uid]);
  return observe(observerId, { onBlockHeader, onError }, (emit) => {
    let active = true;
    let subscribed = false;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const transport = (() => {
          if (client.transport.type === "fallback") {
            const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
            if (!transport2)
              return client.transport;
            return transport2.value;
          }
          return client.transport;
        })();
        const { unsubscribe: unsubscribe_ } = await transport.subscribe({
          params: ["newHeads"],
          onData(data) {
            if (!active)
              return;
            const blockHeader = (client.chain?.formatters?.block?.format || formatBlock)(data.result, "watchBlockHeaders");
            for (const field of blockFields)
              delete blockHeader[field];
            emit.onBlockHeader(blockHeader, prevBlockHeader);
            prevBlockHeader = blockHeader;
          },
          onError(error) {
            if (subscribed)
              emit.onError?.(error);
          }
        });
        subscribed = true;
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        emit.onError?.(err);
      }
    })();
    return () => unsubscribe();
  });
}

// node_modules/viem/_esm/actions/public/watchBlocks.js
init_stringify();
function watchBlocks(client, { blockTag = client.experimental_blockTag ?? "latest", emitMissed = false, emitOnBegin = false, onBlock, onError, includeTransactions: includeTransactions_, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = (() => {
    if (typeof poll_ !== "undefined")
      return poll_;
    if (client.transport.type === "webSocket" || client.transport.type === "ipc")
      return false;
    if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc"))
      return false;
    return true;
  })();
  const includeTransactions = includeTransactions_ ?? false;
  let prevBlock;
  const pollBlocks = () => {
    const observerId = stringify([
      "watchBlocks",
      client.uid,
      blockTag,
      emitMissed,
      emitOnBegin,
      includeTransactions,
      pollingInterval
    ]);
    return observe(observerId, { onBlock, onError }, (emit) => poll(async () => {
      try {
        const block = await getAction(client, getBlock, "getBlock")({
          blockTag,
          includeTransactions
        });
        if (block.number !== null && prevBlock?.number != null) {
          if (block.number === prevBlock.number)
            return;
          if (block.number - prevBlock.number > 1 && emitMissed) {
            for (let i = prevBlock?.number + 1n; i < block.number; i++) {
              const block2 = await getAction(client, getBlock, "getBlock")({
                blockNumber: i,
                includeTransactions
              });
              emit.onBlock(block2, prevBlock);
              prevBlock = block2;
            }
          }
        }
        if (
          // If no previous block exists, emit.
          prevBlock?.number == null || // If the block tag is "pending" with no block number, emit.
          blockTag === "pending" && block?.number == null || // If the next block number is greater than the previous block number, emit.
          // We don't want to emit blocks in the past.
          block.number !== null && block.number > prevBlock.number
        ) {
          emit.onBlock(block, prevBlock);
          prevBlock = block;
        }
      } catch (err) {
        emit.onError?.(err);
      }
    }, {
      emitOnBegin,
      interval: pollingInterval
    }));
  };
  const subscribeBlocks = () => {
    let active = true;
    let emitFetched = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        if (emitOnBegin) {
          getAction(client, getBlock, "getBlock")({
            blockTag,
            includeTransactions
          }).then((block) => {
            if (!active)
              return;
            if (!emitFetched)
              return;
            onBlock(block, void 0);
            emitFetched = false;
          }).catch(onError);
        }
        const transport = (() => {
          if (client.transport.type === "fallback") {
            const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
            if (!transport2)
              return client.transport;
            return transport2.value;
          }
          return client.transport;
        })();
        const { unsubscribe: unsubscribe_ } = await transport.subscribe({
          params: ["newHeads"],
          async onData(data) {
            if (!active)
              return;
            const block = await getAction(client, getBlock, "getBlock")({
              blockNumber: data.result?.number,
              includeTransactions
            }).catch(() => {
            });
            if (!active)
              return;
            onBlock(block, prevBlock);
            emitFetched = false;
            prevBlock = block;
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return () => unsubscribe();
  };
  return enablePolling ? pollBlocks() : subscribeBlocks();
}

// node_modules/viem/_esm/actions/public/watchEvent.js
init_abi();
init_rpc();
init_stringify();
function watchEvent(client, { address, args, batch = true, event, events, fromBlock, onError, onLogs, poll: poll_, pollingInterval = client.pollingInterval, strict: strict_ }) {
  const enablePolling = (() => {
    if (typeof poll_ !== "undefined")
      return poll_;
    if (typeof fromBlock === "bigint")
      return true;
    if (client.transport.type === "webSocket" || client.transport.type === "ipc")
      return false;
    if (client.transport.type === "fallback" && (client.transport.transports[0].config.type === "webSocket" || client.transport.transports[0].config.type === "ipc"))
      return false;
    return true;
  })();
  const strict = strict_ ?? false;
  const pollEvent = () => {
    const observerId = stringify([
      "watchEvent",
      address,
      args,
      batch,
      client.uid,
      event,
      pollingInterval,
      fromBlock
    ]);
    return observe(observerId, { onLogs, onError }, (emit) => {
      let previousBlockNumber;
      if (fromBlock !== void 0)
        previousBlockNumber = fromBlock - 1n;
      let filter;
      let initialized = false;
      const unwatch = poll(async () => {
        if (!initialized) {
          try {
            filter = await getAction(client, createEventFilter, "createEventFilter")({
              address,
              args,
              event,
              events,
              strict,
              fromBlock
            });
          } catch {
          }
          initialized = true;
          return;
        }
        try {
          let logs;
          if (filter) {
            logs = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          } else {
            const blockNumber = await getAction(client, getBlockNumber, "getBlockNumber")({});
            if (previousBlockNumber && previousBlockNumber !== blockNumber) {
              logs = await getAction(client, getLogs, "getLogs")({
                address,
                args,
                event,
                events,
                fromBlock: previousBlockNumber + 1n,
                toBlock: blockNumber
              });
            } else {
              logs = [];
            }
            previousBlockNumber = blockNumber;
          }
          if (logs.length === 0)
            return;
          if (batch)
            emit.onLogs(logs);
          else
            for (const log of logs)
              emit.onLogs([log]);
        } catch (err) {
          if (filter && err instanceof InvalidInputRpcError)
            initialized = false;
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribeEvent = () => {
    let active = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const transport = (() => {
          if (client.transport.type === "fallback") {
            const transport2 = client.transport.transports.find((transport3) => transport3.config.type === "webSocket" || transport3.config.type === "ipc");
            if (!transport2)
              return client.transport;
            return transport2.value;
          }
          return client.transport;
        })();
        const events_ = events ?? (event ? [event] : void 0);
        let topics = [];
        if (events_) {
          const encoded = events_.flatMap((event2) => encodeEventTopics({
            abi: [event2],
            eventName: event2.name,
            args
          }));
          topics = [encoded];
          if (event)
            topics = topics[0];
        }
        const { unsubscribe: unsubscribe_ } = await transport.subscribe({
          params: ["logs", { address, topics }],
          onData(data) {
            if (!active)
              return;
            const log = data.result;
            try {
              const { eventName, args: args2 } = decodeEventLog({
                abi: events_ ?? [],
                data: log.data,
                topics: log.topics,
                strict
              });
              const formatted = formatLog(log, { args: args2, eventName });
              onLogs([formatted]);
            } catch (err) {
              let eventName;
              let isUnnamed;
              if (err instanceof DecodeLogDataMismatch || err instanceof DecodeLogTopicsMismatch) {
                if (strict_)
                  return;
                eventName = err.abiItem.name;
                isUnnamed = err.abiItem.inputs?.some((x) => !("name" in x && x.name));
              }
              const formatted = formatLog(log, {
                args: isUnnamed ? [] : {},
                eventName
              });
              onLogs([formatted]);
            }
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return () => unsubscribe();
  };
  return enablePolling ? pollEvent() : subscribeEvent();
}

// node_modules/viem/_esm/actions/public/watchPendingTransactions.js
init_stringify();
function watchPendingTransactions(client, { batch = true, onError, onTransactions, poll: poll_, pollingInterval = client.pollingInterval }) {
  const enablePolling = typeof poll_ !== "undefined" ? poll_ : client.transport.type !== "webSocket" && client.transport.type !== "ipc";
  const pollPendingTransactions = () => {
    const observerId = stringify([
      "watchPendingTransactions",
      client.uid,
      batch,
      pollingInterval
    ]);
    return observe(observerId, { onTransactions, onError }, (emit) => {
      let filter;
      const unwatch = poll(async () => {
        try {
          if (!filter) {
            try {
              filter = await getAction(client, createPendingTransactionFilter, "createPendingTransactionFilter")({});
              return;
            } catch (err) {
              unwatch();
              throw err;
            }
          }
          const hashes = await getAction(client, getFilterChanges, "getFilterChanges")({ filter });
          if (hashes.length === 0)
            return;
          if (batch)
            emit.onTransactions(hashes);
          else
            for (const hash3 of hashes)
              emit.onTransactions([hash3]);
        } catch (err) {
          emit.onError?.(err);
        }
      }, {
        emitOnBegin: true,
        interval: pollingInterval
      });
      return async () => {
        if (filter)
          await getAction(client, uninstallFilter, "uninstallFilter")({ filter });
        unwatch();
      };
    });
  };
  const subscribePendingTransactions = () => {
    let active = true;
    let unsubscribe = () => active = false;
    (async () => {
      try {
        const { unsubscribe: unsubscribe_ } = await client.transport.subscribe({
          params: ["newPendingTransactions"],
          onData(data) {
            if (!active)
              return;
            const transaction = data.result;
            onTransactions([transaction]);
          },
          onError(error) {
            onError?.(error);
          }
        });
        unsubscribe = unsubscribe_;
        if (!active)
          unsubscribe();
      } catch (err) {
        onError?.(err);
      }
    })();
    return () => unsubscribe();
  };
  return enablePolling ? pollPendingTransactions() : subscribePendingTransactions();
}

// node_modules/viem/_esm/utils/siwe/parseSiweMessage.js
var siweDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})$/;
function isValidSiweDateTime(value) {
  if (!siweDateTimeRegex.test(value))
    return false;
  return !Number.isNaN(new Date(value).getTime());
}
function parseSiweDateTime(value) {
  if (!isValidSiweDateTime(value))
    return new Date(Number.NaN);
  return new Date(value);
}
function parseSiweMessage(message) {
  const { scheme, statement, ...prefix } = message.match(prefixRegex)?.groups ?? {};
  const { chainId, expirationTime, issuedAt, notBefore, requestId, ...suffix } = message.match(suffixRegex)?.groups ?? {};
  const resources = message.split("Resources:")[1]?.split("\n- ").slice(1);
  return {
    ...prefix,
    ...suffix,
    ...chainId ? { chainId: Number(chainId) } : {},
    ...expirationTime ? { expirationTime: parseSiweDateTime(expirationTime) } : {},
    ...issuedAt ? { issuedAt: parseSiweDateTime(issuedAt) } : {},
    ...notBefore ? { notBefore: parseSiweDateTime(notBefore) } : {},
    ...requestId ? { requestId } : {},
    ...resources ? { resources } : {},
    ...scheme ? { scheme } : {},
    ...statement ? { statement } : {}
  };
}
var prefixRegex = /^(?:(?<scheme>[a-zA-Z][a-zA-Z0-9+-.]*):\/\/)?(?<domain>[a-zA-Z0-9+-.]*(?::[0-9]{1,5})?) (?:wants you to sign in with your Ethereum account:\n)(?<address>0x[a-fA-F0-9]{40})\n\n(?:(?<statement>.*)\n\n)?/;
var suffixRegex = /(?:URI: (?<uri>.+))\n(?:Version: (?<version>.+))\n(?:Chain ID: (?<chainId>\d+))\n(?:Nonce: (?<nonce>[a-zA-Z0-9]+))\n(?:Issued At: (?<issuedAt>.+))(?:\nExpiration Time: (?<expirationTime>.+))?(?:\nNot Before: (?<notBefore>.+))?(?:\nRequest ID: (?<requestId>.+))?/;

// node_modules/viem/_esm/utils/siwe/validateSiweMessage.js
init_isAddress();
init_isAddressEqual();
function validateSiweMessage(parameters) {
  const { address, domain, message, nonce, scheme, time = /* @__PURE__ */ new Date() } = parameters;
  if (domain && message.domain !== domain)
    return false;
  if (nonce && message.nonce !== nonce)
    return false;
  if (scheme && message.scheme !== scheme)
    return false;
  if (Number.isNaN(time.getTime()))
    return false;
  if (message.expirationTime) {
    if (Number.isNaN(message.expirationTime.getTime()))
      return false;
    if (time >= message.expirationTime)
      return false;
  }
  if (message.notBefore) {
    if (Number.isNaN(message.notBefore.getTime()))
      return false;
    if (time < message.notBefore)
      return false;
  }
  try {
    if (!message.address)
      return false;
    if (!isAddress(message.address, { strict: false }))
      return false;
    if (address && !isAddressEqual(message.address, address))
      return false;
  } catch {
    return false;
  }
  return true;
}

// node_modules/viem/_esm/actions/siwe/verifySiweMessage.js
async function verifySiweMessage(client, parameters) {
  const { address, domain, message, nonce, scheme, signature, time = /* @__PURE__ */ new Date(), ...callRequest } = parameters;
  const parsed = parseSiweMessage(message);
  if (!parsed.address)
    return false;
  const isValid = validateSiweMessage({
    address,
    domain,
    message: parsed,
    nonce,
    scheme,
    time
  });
  if (!isValid)
    return false;
  const hash3 = hashMessage(message);
  return verifyHash(client, {
    address: parsed.address,
    hash: hash3,
    signature,
    ...callRequest
  });
}

// node_modules/viem/_esm/actions/token/internal.js
init_abis();
init_isAddress();
init_isAddressEqual();
function toAmount(amount, decimals) {
  return { amount, decimals, formatted: formatUnits(amount, decimals) };
}
function resolveToken(client, parameters) {
  const { decimals, token } = parameters;
  const declared = findDeclaredToken(client, token);
  if (declared)
    return {
      address: declared.address,
      decimals: decimals ?? declared.decimals
    };
  if (isAddress(token, { strict: false }))
    return {
      address: token,
      decimals: decimals ?? inferDecimals(client, token)
    };
  throw new Error(`Token "${token}" is not a declared ERC-20 token on the client's \`tokens\` array (with an address for the client's chain), and is not a valid address.`);
}
function findDeclaredToken(client, token) {
  const tokens = client.tokens;
  const chainId = client.chain?.id;
  if (!tokens || chainId === void 0)
    return void 0;
  const bySymbol = findTokenBySymbol(tokens, token);
  if (bySymbol)
    return resolveTokenForChain(bySymbol, chainId);
  if (isAddress(token, { strict: false }))
    for (const token_ of tokens) {
      const resolved = resolveTokenForChain(token_, chainId);
      if (resolved && isAddressEqual(resolved.address, token))
        return resolved;
    }
  return void 0;
}
function resolveTokenForChain(token, chainId) {
  const address = token.addresses[chainId];
  if (!address)
    return void 0;
  return {
    address,
    currency: token.currency,
    decimals: token.decimals,
    name: token.name,
    popular: token.popular,
    symbol: token.symbol
  };
}
function findTokenBySymbol(tokens, symbol) {
  const lowerSymbol = symbol.toLowerCase();
  for (const token of tokens) {
    if (token.symbol?.toLowerCase() === lowerSymbol)
      return token;
  }
  return void 0;
}
function inferDecimals(client, address) {
  const tokens = client.tokens;
  const chainId = client.chain?.id;
  if (tokens && chainId !== void 0)
    for (const token of tokens) {
      const resolved = resolveTokenForChain(token, chainId);
      if (resolved && isAddressEqual(resolved.address, address))
        return resolved.decimals;
    }
  return void 0;
}
async function resolveTokenWithDecimals(client, parameters) {
  const { address, decimals } = resolveToken(client, parameters);
  if (decimals !== void 0)
    return { address, decimals };
  return {
    address,
    decimals: await readContract(client, {
      abi: erc20Abi,
      address,
      functionName: "decimals"
    })
  };
}
function defineCall(call2) {
  return {
    ...call2,
    data: encodeFunctionData(call2),
    to: call2.address
  };
}

// node_modules/viem/_esm/actions/wallet/sendRawTransactionSync.js
init_transaction();
async function sendRawTransactionSync(client, { serializedTransaction, throwOnReceiptRevert, timeout }) {
  const receipt = await client.request({
    method: "eth_sendRawTransactionSync",
    params: timeout ? [serializedTransaction, timeout] : [serializedTransaction]
  }, { retryCount: 0 });
  const format2 = client.chain?.formatters?.transactionReceipt?.format || formatTransactionReceipt;
  const formatted = format2(receipt);
  if (formatted.status === "reverted" && throwOnReceiptRevert)
    throw new TransactionReceiptRevertedError({ receipt: formatted });
  return formatted;
}

// node_modules/viem/_esm/actions/token/getAllowance.js
init_abis();
async function getAllowance(client, parameters) {
  const { account, decimals, spender, token, ...rest } = parameters;
  const [amount, { decimals: resolved }] = await Promise.all([
    readContract(client, {
      ...rest,
      ...getAllowance.call(client, { account, spender, token })
    }),
    resolveTokenWithDecimals(client, {
      decimals,
      token
    })
  ]);
  return toAmount(amount, resolved);
}
(function(getAllowance2) {
  function call2(client, args) {
    return defineCall({
      address: resolveToken(client, args).address,
      abi: erc20Abi,
      functionName: "allowance",
      args: [args.account, args.spender]
    });
  }
  getAllowance2.call = call2;
})(getAllowance || (getAllowance = {}));

// node_modules/viem/_esm/actions/token/getBalance.js
init_parseAccount();
init_abis();
async function getBalance2(client, parameters) {
  const { account: account_ = client.account, decimals, token, ...rest } = parameters;
  if (!account_)
    throw new AccountNotFoundError();
  const account = parseAccount(account_).address;
  const [amount, { decimals: resolved }] = await Promise.all([
    readContract(client, {
      ...rest,
      ...getBalance2.call(client, { account, token })
    }),
    resolveTokenWithDecimals(client, {
      decimals,
      token
    })
  ]);
  return toAmount(amount, resolved);
}
(function(getBalance3) {
  function call2(client, args) {
    const account_ = args.account ?? client.account;
    if (!account_)
      throw new AccountNotFoundError();
    const account = parseAccount(account_).address;
    return defineCall({
      address: resolveToken(client, args).address,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [account]
    });
  }
  getBalance3.call = call2;
})(getBalance2 || (getBalance2 = {}));

// node_modules/viem/_esm/actions/token/getMetadata.js
init_abis();
async function getMetadata(client, parameters) {
  const { token, ...rest } = parameters;
  const { address } = resolveToken(client, { token });
  const declared = findDeclaredToken(client, token);
  const [decimals_, name, symbol] = await Promise.all([
    declared?.decimals ?? readContract(client, {
      ...rest,
      abi: erc20Abi,
      address,
      functionName: "decimals"
    }),
    declared?.name ?? readContract(client, {
      ...rest,
      abi: erc20Abi,
      address,
      functionName: "name"
    }),
    declared?.symbol ?? readContract(client, {
      ...rest,
      abi: erc20Abi,
      address,
      functionName: "symbol"
    })
  ]);
  return {
    decimals: decimals_,
    name,
    symbol
  };
}

// node_modules/viem/_esm/actions/token/getTotalSupply.js
init_abis();
async function getTotalSupply(client, parameters) {
  const { decimals, token, ...rest } = parameters;
  const [amount, { decimals: resolved }] = await Promise.all([
    readContract(client, {
      ...rest,
      ...getTotalSupply.call(client, { token })
    }),
    resolveTokenWithDecimals(client, {
      decimals,
      token
    })
  ]);
  return toAmount(amount, resolved);
}
(function(getTotalSupply2) {
  function call2(client, args) {
    return defineCall({
      address: resolveToken(client, args).address,
      abi: erc20Abi,
      args: [],
      functionName: "totalSupply"
    });
  }
  getTotalSupply2.call = call2;
})(getTotalSupply || (getTotalSupply = {}));

// node_modules/viem/_esm/clients/decorators/public.js
function publicActions(client) {
  return {
    call: (args) => call(client, args),
    createAccessList: (args) => createAccessList(client, args),
    createBlockFilter: () => createBlockFilter(client),
    createContractEventFilter: (args) => createContractEventFilter(client, args),
    createEventFilter: (args) => createEventFilter(client, args),
    createPendingTransactionFilter: () => createPendingTransactionFilter(client),
    estimateContractGas: (args) => estimateContractGas(client, args),
    estimateGas: (args) => estimateGas(client, args),
    getBalance: (args) => getBalance(client, args),
    getBlobBaseFee: () => getBlobBaseFee(client),
    getBlock: (args) => getBlock(client, args),
    getBlockNumber: (args) => getBlockNumber(client, args),
    getBlockReceipts: (args) => getBlockReceipts(client, args),
    getBlockTransactionCount: (args) => getBlockTransactionCount(client, args),
    getBytecode: (args) => getCode(client, args),
    getChainId: () => getChainId(client),
    getCode: (args) => getCode(client, args),
    getContractEvents: (args) => getContractEvents(client, args),
    getDelegation: (args) => getDelegation(client, args),
    getEip712Domain: (args) => getEip712Domain(client, args),
    getEnsAddress: (args) => getEnsAddress(client, args),
    getEnsAvatar: (args) => getEnsAvatar(client, args),
    getEnsName: (args) => getEnsName(client, args),
    getEnsResolver: (args) => getEnsResolver(client, args),
    getEnsText: (args) => getEnsText(client, args),
    getFeeHistory: (args) => getFeeHistory(client, args),
    estimateFeesPerGas: (args) => estimateFeesPerGas(client, args),
    getFilterChanges: (args) => getFilterChanges(client, args),
    getFilterLogs: (args) => getFilterLogs(client, args),
    getGasPrice: () => getGasPrice(client),
    getLogs: (args) => getLogs(client, args),
    getProof: (args) => getProof(client, args),
    estimateMaxPriorityFeePerGas: (args) => estimateMaxPriorityFeePerGas(client, args),
    fillTransaction: (args) => fillTransaction(client, args),
    getRawTransaction: (args) => getRawTransaction(client, args),
    getStorageAt: (args) => getStorageAt(client, args),
    getTransaction: (args) => getTransaction(client, args),
    getTransactionConfirmations: (args) => getTransactionConfirmations(client, args),
    getTransactionCount: (args) => getTransactionCount(client, args),
    getTransactionReceipt: (args) => getTransactionReceipt(client, args),
    multicall: (args) => multicall(client, args),
    prepareTransactionRequest: (args) => prepareTransactionRequest(client, args),
    readContract: (args) => readContract(client, args),
    sendRawTransaction: (args) => sendRawTransaction(client, args),
    sendRawTransactionSync: (args) => sendRawTransactionSync(client, args),
    simulate: (args) => simulateBlocks(client, args),
    simulateBlocks: (args) => simulateBlocks(client, args),
    simulateCalls: (args) => simulateCalls(client, args),
    simulateContract: (args) => simulateContract(client, args),
    verifyHash: (args) => verifyHash(client, args),
    verifyMessage: (args) => verifyMessage(client, args),
    verifySiweMessage: (args) => verifySiweMessage(client, args),
    verifyTypedData: (args) => verifyTypedData(client, args),
    uninstallFilter: (args) => uninstallFilter(client, args),
    waitForTransactionReceipt: (args) => waitForTransactionReceipt(client, args),
    watchBlockHeaders: (args) => watchBlockHeaders(client, args),
    watchBlocks: (args) => watchBlocks(client, args),
    watchBlockNumber: (args) => watchBlockNumber(client, args),
    watchContractEvent: (args) => watchContractEvent(client, args),
    watchEvent: (args) => watchEvent(client, args),
    watchPendingTransactions: (args) => watchPendingTransactions(client, args),
    token: bindPublicToken(client)
  };
}
function bindPublicToken(client) {
  return {
    getAllowance: bindActionDecorators(client, getAllowance),
    getBalance: bindActionDecorators(client, getBalance2),
    getMetadata: bindActionDecorators(client, getMetadata),
    getTotalSupply: bindActionDecorators(client, getTotalSupply)
  };
}

// node_modules/viem/_esm/clients/createPublicClient.js
function createPublicClient(parameters) {
  const { key = "public", name = "Public Client" } = parameters;
  const client = createClient({
    ...parameters,
    key,
    name,
    type: "publicClient"
  });
  return client.extend(publicActions);
}

// node_modules/viem/_esm/clients/transports/createTransport.js
function createTransport({ key, methods, name, request, retryCount = 3, retryDelay = 150, timeout, type }, value) {
  const uid2 = uid();
  return {
    config: {
      key,
      methods,
      name,
      request,
      retryCount,
      retryDelay,
      timeout,
      type
    },
    request: buildRequest(request, { methods, retryCount, retryDelay, uid: uid2 }),
    value
  };
}

// node_modules/viem/_esm/clients/transports/http.js
init_request();

// node_modules/viem/_esm/errors/transport.js
init_base();
var UrlRequiredError = class extends BaseError2 {
  constructor() {
    super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.", {
      docsPath: "/docs/clients/intro",
      name: "UrlRequiredError"
    });
  }
};

// node_modules/viem/_esm/clients/transports/http.js
init_createBatchScheduler();
var signalId = 0;
var signalIds = /* @__PURE__ */ new WeakMap();
function getSignalId(signal) {
  if (!signal)
    return "default";
  const id = signalIds.get(signal);
  if (id !== void 0)
    return id;
  const nextId = signalId++;
  signalIds.set(signal, nextId);
  return nextId;
}
function http(url, config = {}) {
  const { batch, fetchFn, fetchOptions, key = "http", maxResponseBodySize, methods, name = "HTTP JSON-RPC", onFetchRequest, onFetchResponse, retryDelay, raw } = config;
  return ({ chain, retryCount: retryCount_, timeout: timeout_ }) => {
    const { batchSize = 1e3, wait: wait2 = 0 } = typeof batch === "object" ? batch : {};
    const retryCount = config.retryCount ?? retryCount_;
    const timeout = timeout_ ?? config.timeout ?? 1e4;
    const url_ = url || chain?.rpcUrls.default.http[0];
    if (!url_)
      throw new UrlRequiredError();
    const rpcClient = getHttpRpcClient(url_, {
      fetchFn,
      fetchOptions,
      maxResponseBodySize,
      onRequest: onFetchRequest,
      onResponse: onFetchResponse,
      timeout
    });
    return createTransport({
      key,
      methods,
      name,
      async request({ method, params }, options) {
        const body = { method, params };
        const fetchOptions2 = options?.signal ? { signal: options.signal } : void 0;
        const { schedule } = createBatchScheduler({
          id: `${url_}.${getSignalId(options?.signal)}`,
          wait: wait2,
          shouldSplitBatch(requests) {
            return requests.length > batchSize;
          },
          fn: (body2) => rpcClient.request({
            body: body2,
            fetchOptions: fetchOptions2
          }),
          sort: (a, b) => a.id - b.id
        });
        const fn = async (body2) => batch ? schedule(body2) : [
          await rpcClient.request({
            body: body2,
            fetchOptions: fetchOptions2
          })
        ];
        const [{ error, result }] = await fn(body);
        if (raw)
          return { error, result };
        if (error)
          throw new RpcRequestError({
            body,
            error,
            url: url_
          });
        return result;
      },
      retryCount,
      retryDelay,
      timeout,
      type: "http"
    }, {
      fetchOptions,
      url: url_
    });
  };
}

// src/generation-sprites.ts
var GENERATION_SPRITE_MANIFEST = Object.freeze({
  chainId: 4663,
  rpcUrl: "https://rpc.mainnet.chain.robinhood.com",
  generations: "0x14C49e6118F46525dE9ab41a51cBAA3c6EBF181D",
  /** First Transfer emitted by the canonical Generations collection. */
  transferStartBlock: 63102373n,
  metadata: "0x3A243E7f46970275CaE8375b0032e53dF91a9110",
  registry: "0x246E3E9730A7Eade94c79be0Fd78d210f89AEb8D",
  worldData: "0xB78F68992d4c61c491EDCCa7890a05e7DBeb3970",
  seededLandscape: "0x450E3a18cb4d0264C61ff6468FC988FD9F78967D"
});
var FAMILIES_REGISTRY_ABI = parseAbi([
  "function familyOf(uint256 tokenId) pure returns (uint8)",
  "function seedOf(uint256 tokenId) pure returns (uint32)",
  "function familyName(uint8 id) pure returns (string)",
  "function module(uint8 id) view returns (address)",
  "function portrait(uint8 id, uint32 seed) view returns (uint256)",
  "function frames(uint8 id, uint32 seed) view returns (uint256[64])",
  "function sceneFrames(uint8 id, uint32 seed) view returns (uint256[64])"
]);
var GENERATION_FAMILY_NAMES = Object.freeze([
  "Skeleton",
  "Mask",
  "Family",
  "Cellular",
  "Asymmetry",
  "Hoverer",
  "Colossus",
  "Sparkling",
  "Hollow"
]);
var SPRITE_FACINGS = Object.freeze(["down", "up", "left", "right"]);
var MAX_UINT256 = (1n << 256n) - 1n;
var MAX_CACHE_ENTRIES = 64;
function validateTokenId(tokenId) {
  if (typeof tokenId !== "bigint" || tokenId < 1n || tokenId > MAX_UINT256) {
    throw new RangeError("Token ID must be an integer from 1 through uint256 max.");
  }
}
async function assertChain(client, manifest) {
  if (await client.getChainId() !== manifest.chainId) {
    throw new Error(`Sprites require chain ${manifest.chainId}.`);
  }
}
function decodeSpriteBitmap(bitmap) {
  if (typeof bitmap !== "bigint" || bitmap < 0n || bitmap > MAX_UINT256) {
    throw new RangeError("A sprite bitmap must fit uint256.");
  }
  const rows = Array.from({ length: 16 }, (_, y) => Array.from({ length: 16 }, (_2, x) => bitmap & 1n << BigInt(y * 16 + x) ? "#" : ".").join(""));
  return Object.freeze({ bitmap, rows: Object.freeze(rows) });
}
function generationSpriteCacheKey(tokenId, manifest = GENERATION_SPRITE_MANIFEST) {
  validateTokenId(tokenId);
  return `${manifest.chainId}:${manifest.registry.toLowerCase()}:${tokenId}`;
}
function decodeGenerationSprites(tokenId, familyId, seed, bitmaps, manifest = GENERATION_SPRITE_MANIFEST) {
  validateTokenId(tokenId);
  if (!Number.isInteger(familyId) || familyId < 0 || familyId >= GENERATION_FAMILY_NAMES.length) {
    throw new RangeError("Unknown sprite family.");
  }
  if (!Number.isInteger(seed) || seed < 0 || seed > 4294967295) throw new RangeError("Seed must fit uint32.");
  if (bitmaps.length !== 64) throw new RangeError("The registry must return exactly 64 frames.");
  const decoded = bitmaps.map(decodeSpriteBitmap);
  const clips = (offset) => Object.freeze(Object.fromEntries(
    SPRITE_FACINGS.map((facing, index2) => [facing, Object.freeze(decoded.slice(offset + index2 * 8, offset + index2 * 8 + 8))])
  ));
  return Object.freeze({
    tokenId,
    familyId,
    familyName: GENERATION_FAMILY_NAMES[familyId],
    seed,
    frames: Object.freeze([...bitmaps]),
    clips: Object.freeze({ idle: clips(0), walk: clips(32) }),
    cacheKey: generationSpriteCacheKey(tokenId, manifest)
  });
}
function spriteFrame(sprites, facing, walking, frame, sideFallback = "right") {
  if (!SPRITE_FACINGS.includes(facing)) throw new RangeError("Unknown sprite direction.");
  if (!Number.isInteger(frame) || frame < 0 || frame > 7) throw new RangeError("Frame must be from 0 through 7.");
  if (sideFallback !== "left" && sideFallback !== "right") throw new RangeError("Fallback must face left or right.");
  const usedFallback = sprites.familyId === 6 && (facing === "down" || facing === "up");
  const resolvedFacing = usedFallback ? sideFallback : facing;
  return {
    frame: sprites.clips[walking ? "walk" : "idle"][resolvedFacing][frame],
    requestedFacing: facing,
    resolvedFacing,
    usedFallback
  };
}
function createGenerationSpriteReader(client, manifest = GENERATION_SPRITE_MANIFEST) {
  const cache = /* @__PURE__ */ new Map();
  return {
    async read(tokenId) {
      const key = generationSpriteCacheKey(tokenId, manifest);
      await assertChain(client, manifest);
      let result = cache.get(key);
      if (result) {
        cache.delete(key);
        cache.set(key, result);
        return result;
      }
      result = (async () => {
        const [familyId, seed] = await Promise.all([
          client.readContract({ address: manifest.registry, abi: FAMILIES_REGISTRY_ABI, functionName: "familyOf", args: [tokenId] }),
          client.readContract({ address: manifest.registry, abi: FAMILIES_REGISTRY_ABI, functionName: "seedOf", args: [tokenId] })
        ]);
        const frames = await client.readContract({
          address: manifest.registry,
          abi: FAMILIES_REGISTRY_ABI,
          functionName: "frames",
          args: [familyId, seed]
        });
        return decodeGenerationSprites(tokenId, familyId, seed, frames, manifest);
      })();
      cache.set(key, result);
      void result.catch(() => {
        if (cache.get(key) === result) cache.delete(key);
      });
      if (cache.size > MAX_CACHE_ENTRIES) cache.delete(cache.keys().next().value);
      return result;
    },
    clear() {
      cache.clear();
    }
  };
}

// src/friend-sprites.ts
function createFriendReader() {
  return createGenerationSpriteReader(createPublicClient({
    transport: http(GENERATION_SPRITE_MANIFEST.rpcUrl, { retryCount: 1, timeout: 12e3 })
  }));
}

// examples/fishing/sample-sprites.ts
var SAMPLES = Object.freeze({
  "7730": decodeGenerationSprites(7730n, 5, 7730, [
    0x7e000000000124812481ff81ff83ffc3ffc07e005a007e007e004200000n,
    0x7e000000000124812481ff81ff83ffc3ffc07e005a007e007e004200000n,
    0x7e000000000124812481ff81ff83ffc3ffc07e005a007e007e004200000n,
    0x7e00000124812481ff81ff83ffc3ffc07e005a007e007e0042000000000n,
    0xff00000124812481ff81ff83ffc3ffc07e005a007e007e0042000000000n,
    0xff00000124812481ff81ff83ffc3ffc07e005a007e007e0042000000000n,
    0xff000000000124812481ff81ff83ffc3ffc07e005a007e007e004200000n,
    0x7e000000000124812481ff81ff83ffc3ffc07e005a007e007e004200000n,
    0x7e000000000124812481ff81ff83ffc3ffc07e007e007e007e004200000n,
    0x7e000000000124812481ff81ff83ffc3ffc07e007e007e007e004200000n,
    0x7e000000000124812481ff81ff83ffc3ffc07e007e007e007e004200000n,
    0x7e00000124812481ff81ff83ffc3ffc07e007e007e007e0042000000000n,
    0xff00000124812481ff81ff83ffc3ffc07e007e007e007e0042000000000n,
    0xff00000124812481ff81ff83ffc3ffc07e007e007e007e0042000000000n,
    0xff000000000124812481ff81ff83ffc3ffc07e007e007e007e004200000n,
    0x7e000000000124812481ff81ff83ffc3ffc07e007e007e007e004200000n,
    0x7e000000000080808081ffc1ffc1ffc1ffc001e001a001e001e00000000n,
    0x7e000000000080808081ffc1ffc1ffc1ffc001e001a001e001e00000000n,
    0x7e000000000080808081ffc1ffc1ffc1ffc001e001a001e001e00000000n,
    0x7e00000080808081ffc1ffc1ffc1ffc001e001a001e001e000000000000n,
    0xff00000080808081ffc1ffc1ffc1ffc001e001a001e001e000000000000n,
    0xff00000080808081ffc1ffc1ffc1ffc001e001a001e001e000000000000n,
    0xff000000000080808081ffc1ffc1ffc1ffc001e001a001e001e00000000n,
    0x7e000000000080808081ffc1ffc1ffc1ffc001e001a001e001e00000000n,
    0x7e000000000101010103ff83ff83ff83ff8780058007800780000000000n,
    0x7e000000000101010103ff83ff83ff83ff8780058007800780000000000n,
    0x7e000000000101010103ff83ff83ff83ff8780058007800780000000000n,
    0x7e00000101010103ff83ff83ff83ff87800580078007800000000000000n,
    0xff00000101010103ff83ff83ff83ff87800580078007800000000000000n,
    0xff00000101010103ff83ff83ff83ff87800580078007800000000000000n,
    0xff000000000101010103ff83ff83ff83ff8780058007800780000000000n,
    0x7e000000000101010103ff83ff83ff83ff8780058007800780000000000n,
    0x7e000000000124812481ff81ff83ffc3ffc07e005a007e007e004200000n,
    0x7e000000000124812481ff81ff83ffc3ffc07e005a007e007e004200000n,
    0x7e000000000124812481ff81ff83ffc3ffc07e005a007e007e004200000n,
    0x7e00000124812481ff81ff83ffc3ffc07e005a007e007e0042000000000n,
    0xff00000124812481ff81ff83ffc3ffc07e005a007e007e0042000000000n,
    0xff00000124812481ff81ff83ffc3ffc07e005a007e007e0042000000000n,
    0xff000000000124812481ff81ff83ffc3ffc07e005a007e007e004200000n,
    0x7e000000000124812481ff81ff83ffc3ffc07e005a007e007e004200000n,
    0x7e000000000124812481ff81ff83ffc3ffc07e007e007e007e004200000n,
    0x7e000000000124812481ff81ff83ffc3ffc07e007e007e007e004200000n,
    0x7e000000000124812481ff81ff83ffc3ffc07e007e007e007e004200000n,
    0x7e00000124812481ff81ff83ffc3ffc07e007e007e007e0042000000000n,
    0xff00000124812481ff81ff83ffc3ffc07e007e007e007e0042000000000n,
    0xff00000124812481ff81ff83ffc3ffc07e007e007e007e0042000000000n,
    0xff000000000124812481ff81ff83ffc3ffc07e007e007e007e004200000n,
    0x7e000000000124812481ff81ff83ffc3ffc07e007e007e007e004200000n,
    0x7e000000000080808081ffc1ffc1ffc1ffc001e001a001e001e00000000n,
    0x7e000000000080808081ffc1ffc1ffc1ffc001e001a001e001e00000000n,
    0x7e000000000080808081ffc1ffc1ffc1ffc001e001a001e001e00000000n,
    0x7e00000080808081ffc1ffc1ffc1ffc001e001a001e001e000000000000n,
    0xff00000080808081ffc1ffc1ffc1ffc001e001a001e001e000000000000n,
    0xff00000080808081ffc1ffc1ffc1ffc001e001a001e001e000000000000n,
    0xff000000000080808081ffc1ffc1ffc1ffc001e001a001e001e00000000n,
    0x7e000000000080808081ffc1ffc1ffc1ffc001e001a001e001e00000000n,
    0x7e000000000101010103ff83ff83ff83ff8780058007800780000000000n,
    0x7e000000000101010103ff83ff83ff83ff8780058007800780000000000n,
    0x7e000000000101010103ff83ff83ff83ff8780058007800780000000000n,
    0x7e00000101010103ff83ff83ff83ff87800580078007800000000000000n,
    0xff00000101010103ff83ff83ff83ff87800580078007800000000000000n,
    0xff00000101010103ff83ff83ff83ff87800580078007800000000000000n,
    0xff000000000101010103ff83ff83ff83ff8780058007800780000000000n,
    0x7e000000000101010103ff83ff83ff83ff8780058007800780000000000n
  ]),
  "3412": decodeGenerationSprites(3412n, 0, 3412, [
    0x660066007e00ff00ff007e0018001801ff81bd81bd80ff007e006600000n,
    0x660066007e00ff00ff007e0018001801ff81bd81bd80ff007e006600000n,
    0x660066007e00ff00ff007e0018001801ff81bd81bd80ff007e006600000n,
    0x660066007e00ff007e0018001801ff81bd81bd80ff007e0066000000000n,
    0x660066007e00ff007e0018001801ff81bd81bd80ff007e0066000000000n,
    0x660066007e00ff00ff007e0018001801ff81bd81bd80ff007e006600000n,
    0x660066007e00ff00ff007e0018001801ff81bd81bd80ff007e006600000n,
    0x660066007e00ff00ff007e0018001801ff81bd81bd80ff007e006600000n,
    0x660066007e00ff00ff007e0018001801ff81ff81ff80ff007e006600000n,
    0x660066007e00ff00ff007e0018001801ff81ff81ff80ff007e006600000n,
    0x660066007e00ff00ff007e0018001801ff81ff81ff80ff007e006600000n,
    0x660066007e00ff007e0018001801ff81ff81ff80ff007e0066000000000n,
    0x660066007e00ff007e0018001801ff81ff81ff80ff007e0066000000000n,
    0x660066007e00ff00ff007e0018001801ff81ff81ff80ff007e006600000n,
    0x660066007e00ff00ff007e0018001801ff81ff81ff80ff007e006600000n,
    0x660066007e00ff00ff007e0018001801ff81ff81ff80ff007e006600000n,
    0x180018007e007e007e003c0018001800ff00fd00fd007f003c003000000n,
    0x180018007e007e007e003c0018001800ff00fd00fd007f003c003000000n,
    0x180018007e007e007e003c0018001800ff00fd00fd007f003c003000000n,
    0x180018007e007e003c0018001800ff00fd00fd007f003c0030000000000n,
    0x180018007e007e003c0018001800ff00fd00fd007f003c0030000000000n,
    0x180018007e007e007e003c0018001800ff00fd00fd007f003c003000000n,
    0x180018007e007e007e003c0018001800ff00fd00fd007f003c003000000n,
    0x180018007e007e007e003c0018001800ff00fd00fd007f003c003000000n,
    0x180018007e007e007e003c0018001800ff00bf00bf00fe003c000c00000n,
    0x180018007e007e007e003c0018001800ff00bf00bf00fe003c000c00000n,
    0x180018007e007e007e003c0018001800ff00bf00bf00fe003c000c00000n,
    0x180018007e007e003c0018001800ff00bf00bf00fe003c000c000000000n,
    0x180018007e007e003c0018001800ff00bf00bf00fe003c000c000000000n,
    0x180018007e007e007e003c0018001800ff00bf00bf00fe003c000c00000n,
    0x180018007e007e007e003c0018001800ff00bf00bf00fe003c000c00000n,
    0x180018007e007e007e003c0018001800ff00bf00bf00fe003c000c00000n,
    0x660066007e00ff00ff007e0018001801ff81bd81bd80ff007e006600000n,
    0x660066007e00ff007e0018001801ff81bd81bd80ff007e0066000000000n,
    0x600066007e00ff00ff007e0018001801ff81bd81bd80ff007e006600000n,
    0x600066007e00ff00ff007e0018001801ff81bd81bd80ff007e006600000n,
    0x660066007e00ff00ff007e0018001801ff81bd81bd80ff007e006600000n,
    0x660066007e00ff007e0018001801ff81bd81bd80ff007e0066000000000n,
    0x60066007e00ff00ff007e0018001801ff81bd81bd80ff007e006600000n,
    0x60066007e00ff00ff007e0018001801ff81bd81bd80ff007e006600000n,
    0x660066007e00ff00ff007e0018001801ff81ff81ff80ff007e006600000n,
    0x660066007e00ff007e0018001801ff81ff81ff80ff007e0066000000000n,
    0x60066007e00ff00ff007e0018001801ff81ff81ff80ff007e006600000n,
    0x60066007e00ff00ff007e0018001801ff81ff81ff80ff007e006600000n,
    0x660066007e00ff00ff007e0018001801ff81ff81ff80ff007e006600000n,
    0x660066007e00ff007e0018001801ff81ff81ff80ff007e0066000000000n,
    0x600066007e00ff00ff007e0018001801ff81ff81ff80ff007e006600000n,
    0x600066007e00ff00ff007e0018001801ff81ff81ff80ff007e006600000n,
    0x180018007e007e007e003c0018001800ff00fd00fd007f003c003000000n,
    0x180018007e007e003c0018001800ff00fd00fd007f003c0030000000000n,
    0x6c006c007e007e007e003c0018001800ff00fd00fd007f003c003000000n,
    0x6c006c007e007e007e003c0018001800ff00fd00fd007f003c003000000n,
    0x180018007e007e007e003c0018001800ff00fd00fd007f003c003000000n,
    0x180018007e007e003c0018001800ff00fd00fd007f003c0030000000000n,
    0xc006c007e007e007e003c0018001800ff00fd00fd007f003c003000000n,
    0xc006c007e007e007e003c0018001800ff00fd00fd007f003c003000000n,
    0x180018007e007e007e003c0018001800ff00bf00bf00fe003c000c00000n,
    0x180018007e007e003c0018001800ff00bf00bf00fe003c000c000000000n,
    0x360036007e007e007e003c0018001800ff00bf00bf00fe003c000c00000n,
    0x360036007e007e007e003c0018001800ff00bf00bf00fe003c000c00000n,
    0x180018007e007e007e003c0018001800ff00bf00bf00fe003c000c00000n,
    0x180018007e007e003c0018001800ff00bf00bf00fe003c000c000000000n,
    0x300036007e007e007e003c0018001800ff00bf00bf00fe003c000c00000n,
    0x300036007e007e007e003c0018001800ff00bf00bf00fe003c000c00000n
  ])
});
function sampleFriendSprites(tokenId) {
  return SAMPLES[String(tokenId)];
}

// examples/fishing/world.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
var world = validateWorld({ ...structuredClone(getWorldPreset("01-garden-oval-complete")), collision: { blocked: [{ x: 396, y: 233, w: 48, h: 34 }] } });
var view = { x: 320, y: 330, width: 960, height: 640 };
var targets = { pond: [214, 268], vendor: [420, 292] };
function nearest(point2) {
  const found = Object.keys(targets).sort((a, b) => Math.hypot(point2[0] - targets[a][0], point2[1] - targets[a][1]) - Math.hypot(point2[0] - targets[b][0], point2[1] - targets[b][1]))[0];
  return Math.hypot(point2[0] - targets[found][0], point2[1] - targets[found][1]) < 85 ? found : null;
}
function drawVendor(context) {
  const [x, y] = project(420, 250);
  context.save();
  context.translate(Math.round(x), Math.round(y));
  context.lineWidth = 2;
  const polygon2 = (points, fill = "#fff") => {
    context.beginPath();
    context.moveTo(...points[0]);
    for (const point2 of points.slice(1)) context.lineTo(...point2);
    context.closePath();
    context.fillStyle = fill;
    context.fill();
    context.strokeStyle = "#000";
    context.stroke();
  };
  context.fillStyle = "#000";
  context.fillRect(-42, -105, 4, 103);
  context.fillRect(40, -105, 4, 116);
  const vendor = sampleFriendSprites(3412n);
  if (vendor) drawFriend(context, vendor, 2, -23, "down", false, 0, 4);
  polygon2([[-48, -19], [5, -35], [48, -21], [-5, -4]]);
  polygon2([[-48, -19], [-5, -4], [-5, 24], [-48, 9]], "#000");
  polygon2([[-5, -4], [48, -21], [48, 8], [-5, 24]]);
  polygon2([[-55, -109], [7, -129], [59, -112], [-3, -92]]);
  polygon2([[-55, -109], [-3, -92], [-3, -82], [-55, -99]], "#000");
  polygon2([[-3, -92], [59, -112], [59, -102], [-3, -82]]);
  for (let index2 = 0; index2 < 4; index2++) polygon2([[-48 + index2 * 13, -111 + index2 * 4], [-38 + index2 * 13, -108 + index2 * 4], [24 + index2 * 9, -120 + index2 * 3], [15 + index2 * 9, -123 + index2 * 3]], index2 % 2 ? "#fff" : "#000");
  context.beginPath();
  context.moveTo(-61, 9);
  context.lineTo(-69, -61);
  context.lineTo(-78, -72);
  context.lineTo(-78, -24);
  context.lineTo(-74, -20);
  context.stroke();
  context.restore();
}
function drawFriend(context, sprites, x, y, facing, walking, frame, scale = 5, side = "right") {
  const rows = spriteFrame(sprites, facing, walking, frame, side).frame.rows;
  const pixels = rows.flatMap((row, py) => [...row].flatMap((pixel, px) => pixel === "#" ? [[px, py]] : []));
  const left = Math.round(x) - 8 * scale, top = Math.round(y) - 15 * scale;
  context.save();
  context.beginPath();
  context.rect(left, top, 16 * scale, 16 * scale);
  context.clip();
  context.fillStyle = "#fff";
  for (const [px, py] of pixels) context.fillRect(left + px * scale - scale, top + py * scale - scale, scale * 3, scale * 3);
  context.fillStyle = "#000";
  for (const [px, py] of pixels) context.fillRect(left + px * scale, top + py * scale, scale, scale);
  context.restore();
}
function FishingWorld({ friendId, paused, reducedMotion, onNearChange, onInteract }) {
  const canvas = useRef3(null);
  const movement = useRef3(null);
  const [artStatus, setArtStatus] = useState4("Loading Friend artwork\u2026");
  const [worldError, setWorldError] = useState4("");
  const pause = useRef3(paused);
  const callbacks = useRef3({ reducedMotion, onNearChange, onInteract });
  callbacks.current = { reducedMotion, onNearChange, onInteract };
  useEffect3(() => {
    pause.current = paused;
    if (paused) movement.current?.stop();
  }, [paused]);
  useEffect3(() => {
    const node = canvas.current, context = node?.getContext("2d");
    if (!node || !context) return;
    const controller = new AbortController();
    const mover = createWorldMovement(world, [288, 192]);
    movement.current = mover;
    let frame = 0, last = 0, sprites;
    let lastNear = null;
    let assets;
    let side = "right";
    const stop = () => mover.stop();
    const hidden = () => {
      if (document.hidden) stop();
    };
    window.addEventListener("blur", stop);
    document.addEventListener("visibilitychange", hidden);
    loadWorldAssets(world, { color: false, signals: false }, controller.signal).then((value) => {
      assets = value;
    }).catch(() => {
      if (!controller.signal.aborted) setWorldError("World artwork could not load. The game controls still work.");
    });
    (sampleFriendSprites(friendId) ? Promise.resolve(sampleFriendSprites(friendId)) : createFriendReader().read(friendId)).then((value) => {
      if (controller.signal.aborted) return;
      sprites = value;
      setArtStatus("");
    }).catch(() => {
      if (!controller.signal.aborted) setArtStatus("Friend artwork unavailable. The circle marks your position.");
    });
    const render = (now) => {
      const state = mover.update(!pause.current && !document.hidden && last ? now - last : 0);
      last = now;
      context.clearRect(0, 0, view.width, view.height);
      context.save();
      context.translate(-view.x, -view.y);
      context.imageSmoothingEnabled = false;
      if (assets) context.drawImage(assets.terrain, 0, 0);
      const [x, y] = project(...state.position);
      const character = () => {
        context.fillStyle = "#0003";
        context.beginPath();
        context.ellipse(x, y + 2, 20, 7, 0, 0, Math.PI * 2);
        context.fill();
        if (!sprites) {
          context.fillStyle = "#fff";
          context.strokeStyle = "#111";
          context.lineWidth = 2;
          context.beginPath();
          context.arc(x, y - 10, 8, 0, Math.PI * 2);
          context.fill();
          context.stroke();
          return;
        }
        if (state.facing === "left" || state.facing === "right") side = state.facing;
        drawFriend(context, sprites, x, y, state.facing, state.walking, callbacks.current.reducedMotion ? 0 : Math.floor(now / 110) % 8, 5, side);
      };
      const layers = (assets?.objects ?? []).map((object) => ({ depth: object.depth, draw: () => context.drawImage(object.image, 0, 0) }));
      layers.push({ depth: 670, draw: () => drawVendor(context) });
      layers.push({ depth: state.position[0] + state.position[1], draw: character });
      layers.sort((a, b) => a.depth - b.depth).forEach((layer) => layer.draw());
      const target = nearest(state.position);
      if (target !== lastNear) {
        lastNear = target;
        callbacks.current.onNearChange(target);
      }
      context.restore();
      node.dataset.x = state.position[0].toFixed(2);
      node.dataset.y = state.position[1].toFixed(2);
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => {
      controller.abort();
      cancelAnimationFrame(frame);
      mover.stop();
      movement.current = null;
      window.removeEventListener("blur", stop);
      document.removeEventListener("visibilitychange", hidden);
    };
  }, [friendId]);
  return /* @__PURE__ */ jsxs4("div", { className: "fv1-world", children: [
    /* @__PURE__ */ jsx4(
      "canvas",
      {
        ref: canvas,
        width: view.width,
        height: view.height,
        tabIndex: paused ? -1 : 0,
        "aria-label": "Garden lake. Use arrow keys or WASD to walk, or click or tap a destination.",
        onKeyDown: (event) => {
          if (paused) return;
          if (event.key.toLowerCase() === "e" && !event.repeat && movement.current) {
            const target = nearest(movement.current.state.position);
            if (target) {
              event.preventDefault();
              callbacks.current.onInteract(target);
            }
          }
          if (movement.current?.setKey(event.key, true)) event.preventDefault();
        },
        onKeyUp: (event) => {
          if (movement.current?.setKey(event.key, false)) event.preventDefault();
        },
        onBlur: () => movement.current?.stop(),
        onPointerDown: (event) => {
          if (paused) return;
          event.currentTarget.focus();
          const rect = event.currentTarget.getBoundingClientRect();
          const scale = Math.min(rect.width / view.width, rect.height / view.height);
          const x = (event.clientX - rect.left - (rect.width - view.width * scale) / 2) / scale;
          const y = (event.clientY - rect.top - (rect.height - view.height * scale) / 2) / scale;
          movement.current?.moveTo(unproject(view.x + x, view.y + y));
        }
      }
    ),
    /* @__PURE__ */ jsx4("p", { className: "fv1-world-status", "data-ready": !worldError && !artStatus, role: "status", children: worldError || artStatus })
  ] });
}

// examples/fishing/art.tsx
import { jsx as jsx5, jsxs as jsxs5 } from "react/jsx-runtime";
var fishingBait = {
  id: "bait",
  name: "Bait",
  rarity: "Basic",
  art: { rows: ["    ####    ", "  ##....##  ", " #........# ", "#..........#", "#..........#", "##........##", " #........# ", " #........# ", " #........# ", " #........# ", " ########## "] }
};
function Bobber({ ready = false }) {
  return /* @__PURE__ */ jsxs5("svg", { className: "fv1-bobber", viewBox: "0 0 80 84", fill: "none", stroke: "currentColor", strokeWidth: "2", shapeRendering: "crispEdges", "aria-hidden": "true", "data-ready": ready, children: [
    /* @__PURE__ */ jsx5("path", { d: "M40 0v35M34 35h12v12H34zM26 47h28v20H26zM26 57h28M14 72h52M24 79h32" }),
    ready && /* @__PURE__ */ jsx5("path", { d: "M9 28 2 19M69 28l8-9M7 43H0M73 43h7" })
  ] });
}
function SoundIcon({ muted }) {
  return /* @__PURE__ */ jsxs5("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", "aria-hidden": "true", children: [
    /* @__PURE__ */ jsx5("path", { d: "m11 4-5 5H3v6h3l5 5z" }),
    muted ? /* @__PURE__ */ jsx5("path", { d: "m15 9 6 6m0-6-6 6" }) : /* @__PURE__ */ jsx5("path", { d: "M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14" })
  ] });
}
function SettingsIcon() {
  return /* @__PURE__ */ jsx5("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.7", "aria-hidden": "true", children: /* @__PURE__ */ jsx5("path", { d: "M4 6h16M4 12h16M4 18h16M8 3v6m8 0v6m-6 0v6" }) });
}

// examples/fishing/preview.tsx
import { useCallback as useCallback2, useEffect as useEffect4, useMemo, useRef as useRef4, useState as useState5 } from "react";
import { jsx as jsx6 } from "react/jsx-runtime";
var SAMPLE_FRIENDS = [
  { id: 7730n, label: "Sample Friend A", kind: "sample" },
  { id: 3412n, label: "Sample Friend B", kind: "sample" }
];
function FishingPreview() {
  const sessions = useRef4(/* @__PURE__ */ new Map());
  const pending = useRef4(null);
  const [friendId, setFriendId] = useState5(null);
  const [snapshot, setSnapshot] = useState5(null);
  const [confirmation, setConfirmation] = useState5(null);
  const [paused, setPaused] = useState5(true);
  const confirm = useCallback2((title, description, amount) => new Promise((resolve, reject) => {
    const close = () => {
      pending.current = null;
      setConfirmation(null);
    };
    pending.current = () => {
      close();
      reject(new Error("Preview action cancelled."));
    };
    setConfirmation({ title, description, amount, onConfirm: () => {
      close();
      resolve();
    }, onCancel: () => pending.current?.() });
  }), []);
  useEffect4(() => () => pending.current?.(), []);
  const client = useMemo(() => {
    if (friendId === null) return void 0;
    let original = sessions.current.get(friendId);
    if (!original) {
      original = createGamePreview(fishingGame, { stake: 100n * RF, rfBalance: 20n * RF, friendId }).client;
      sessions.current.set(friendId, original);
    }
    const selected = original;
    return {
      ...selected,
      async buy(quantity) {
        await confirm("Buy bait", `${quantity} bait for this Friend.`, fishingGame.price * quantity);
        await selected.buy(quantity);
      },
      async play(quantity = 1n) {
        await confirm("Cast at the lake", `Use ${quantity} bait from this Friend.`);
        return selected.play(quantity);
      },
      async redeem(outcomeId, quantity) {
        await confirm("Sell catch", `${quantity} ${fishingGame.outcomes[outcomeId - 1].name}; RF returns to this Friend.`, fishingGame.outcomes[outcomeId - 1].reward * quantity);
        await selected.redeem(outcomeId, quantity);
      }
    };
  }, [friendId, confirm]);
  const receiveSnapshot = useCallback2((value) => {
    if (value.friendId === friendId) setSnapshot(value);
  }, [friendId]);
  return /* @__PURE__ */ jsx6(
    GameFrame,
    {
      mode: "preview",
      friends: SAMPLE_FRIENDS,
      selectedFriendId: friendId,
      onSelectFriend: (id) => {
        setFriendId(id);
        setSnapshot(null);
      },
      wallet: { balance: snapshot?.rfBalance },
      confirmation,
      onMenuChange: setPaused,
      children: /* @__PURE__ */ jsx6(FishingGame, { friendId, client, onSnapshot: receiveSnapshot, paused })
    }
  );
}

// examples/fishing/index.tsx
import { Fragment as Fragment3, jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var fishingGame = parseChanceGame(game_default);
var fishingItems = fishingGame.outcomes.map((outcome, index2) => ({
  id: art_default[index2].id,
  name: outcome.name,
  rarity: art_default[index2].rarity,
  art: { rows: art_default[index2].rows }
}));
var rf = (amount) => `${formatGameAmount(amount, 18)} RF`;
var currency = { symbol: "RF", decimals: 18 };
function FishingGame({ friendId, client, onSnapshot, paused = false }) {
  const sessions = useRef5(/* @__PURE__ */ new Map());
  if (friendId === null) return /* @__PURE__ */ jsx7("div", { className: "fv1 fv1-empty", children: "Choose a Friend to enter the lake." });
  let active = client ?? sessions.current.get(friendId);
  if (!active) {
    const preview = createGamePreview(fishingGame, { stake: 100n * RF, rfBalance: 20n * RF, friendId }).client;
    sessions.current.set(friendId, preview);
    active = preview;
  }
  return /* @__PURE__ */ jsx7(FishingSession, { friendId, client: active, onSnapshot, paused }, `${friendId}:${active.mode}`);
}
function FishingSession({ friendId, client, onSnapshot, paused }) {
  const isPreview = client.mode === "preview";
  const [snapshot, setSnapshot] = useState6(null);
  const [screen, setScreen] = useState6("world");
  const [shopTab, setShopTab] = useState6("buy");
  const [quantity, setQuantity] = useState6("1");
  const [selectedCatch, setSelectedCatch] = useState6(1);
  const [busy, setBusy] = useState6(false);
  const [error, setError] = useState6("");
  const [message, setMessage] = useState6("");
  const [result, setResult] = useState6(null);
  const [casting, setCasting] = useState6(false);
  const [bite, setBite] = useState6(false);
  const [muted, setMuted] = useState6(true);
  const [reduceMotion, setReduceMotion] = useState6(false);
  const [worldRevision, setWorldRevision] = useState6(0);
  const [near, setNear] = useState6(null);
  const locked = useRef5(false);
  const alive = useRef5(true);
  const sound = useRef5(null);
  useEffect5(() => {
    alive.current = true;
    sound.current = createFriendSoundKit({ muted: true });
    void client.read().then((value) => {
      if (alive.current) setSnapshot(value);
    }).catch((cause) => {
      if (alive.current) setError(cause instanceof Error ? cause.message : "The game could not load.");
    });
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => {
      alive.current = false;
      sound.current?.dispose();
      sound.current = null;
      query.removeEventListener("change", update);
    };
  }, [client]);
  useEffect5(() => {
    if (snapshot) onSnapshot?.(snapshot);
  }, [snapshot, onSnapshot]);
  useEffect5(() => {
    if (!casting || !result) return;
    const timer = setTimeout(() => {
      setBite(true);
      sound.current?.play("action-ready");
    }, reduceMotion ? 0 : 800);
    return () => clearTimeout(timer);
  }, [casting, result, reduceMotion]);
  async function action(work, cue) {
    if (locked.current || paused) return;
    locked.current = true;
    setBusy(true);
    setError("");
    setMessage("");
    void sound.current?.unlock();
    try {
      await work();
      const value = await client.read();
      if (alive.current) {
        setSnapshot(value);
        if (cue) sound.current?.play(cue);
      }
    } catch (cause) {
      const failure = cause instanceof Error ? cause.message : "Game action failed.";
      try {
        const value = await client.read();
        if (alive.current) {
          setSnapshot(value);
          setError(failure);
        }
      } catch {
        if (alive.current) setError(`${failure} Could not refresh the game state. Retry before continuing.`);
      }
    } finally {
      locked.current = false;
      if (alive.current) setBusy(false);
    }
  }
  if (!snapshot) return /* @__PURE__ */ jsxs6("div", { className: "fv1 fv1-empty", role: error ? "alert" : "status", children: [
    error || (isPreview ? "Loading fishing preview\u2026" : "Loading fishing\u2026"),
    error && /* @__PURE__ */ jsx7("button", { type: "button", disabled: busy || paused, onClick: () => void action(async () => {
    }), children: "Retry" })
  ] });
  if (snapshot.friendId !== friendId) return /* @__PURE__ */ jsx7("div", { className: "fv1 fv1-empty", role: "alert", children: "The selected Friend does not match this game session." });
  const count = /^[1-9]\d?$/.test(quantity) ? BigInt(quantity) : 0n;
  const cost = count * fishingGame.price;
  const hasBacking = snapshot.freeStake >= 10n * RF && snapshot.freeStake + cost >= count * 10n * RF;
  const canBuy = count > 0n && hasBacking && snapshot.rfBalance >= cost;
  const pendingPlays = snapshot.plays.filter((play) => play.outcomeId === null);
  const pendingPlay = pendingPlays[0];
  const caughtId = result?.outcomeId ?? null;
  const caughtItem = caughtId ? fishingItems[caughtId - 1] : null;
  const caughtValue = caughtId ? fishingGame.outcomes[caughtId - 1].reward : 0n;
  const totalValue = snapshot.inventory.reduce((sum, amount, index2) => sum + amount * fishingGame.outcomes[index2].reward, 0n);
  const totalCount = snapshot.inventory.reduce((sum, amount) => sum + amount, 0n);
  const bestIndex = snapshot.plays.reduce((best, play) => play.outcomeId !== null && play.outcomeId - 1 > best ? play.outcomeId - 1 : best, -1);
  const selectedItem = fishingItems[selectedCatch];
  const selectedValue = fishingGame.outcomes[selectedCatch].reward;
  const selectedCount = snapshot.inventory[selectedCatch];
  const navigate = (next) => {
    if (!casting && !busy && !paused) {
      setScreen(next);
      setError("");
      setMessage("");
      sound.current?.play("select");
    }
  };
  const openShop = () => {
    setShopTab("buy");
    navigate("shop");
  };
  const toggleSound = () => {
    const next = !muted;
    setMuted(next);
    sound.current?.setMuted(next);
    if (!next) void sound.current?.unlock();
  };
  const sell = (outcomeId, amount) => action(async () => {
    await client.redeem(outcomeId, amount);
    setMessage(`Sold ${amount} ${fishingItems[outcomeId - 1].name}. ${isPreview ? "Simulated RF added to this Friend." : "RF returned to this Friend wallet."}`);
  }, "reward");
  async function settleCast(playId) {
    const settled = await client.settle(playId);
    if (!alive.current) return;
    setBite(false);
    if (settled.outcomeId === null) {
      setResult(null);
      setCasting(false);
      setMessage(`Cast #${playId} is waiting for its result. Resume this cast to check again; no additional bait is used.`);
      return;
    }
    setResult(settled);
    setCasting(true);
    setMessage("");
  }
  const cast = () => action(async () => {
    if (pendingPlay) throw new Error(`Cast #${pendingPlay.id} is pending. Resume that cast at the lake.`);
    setResult(null);
    setBite(false);
    setCasting(false);
    const [play] = await client.play(1n);
    if (!play) throw new Error("The cast was not returned. Refresh the game state before trying again.");
    await settleCast(play.id);
  }, "action-start");
  const resumeCast = () => pendingPlay && action(() => settleCast(pendingPlay.id), "action-start");
  const soundButton = /* @__PURE__ */ jsx7("button", { className: "fv1-icon", type: "button", "aria-label": muted ? "Turn sound on" : "Mute sound", "aria-pressed": !muted, onClick: toggleSound, children: /* @__PURE__ */ jsx7(SoundIcon, { muted }) });
  const feedback = /* @__PURE__ */ jsx7("p", { className: "fv1-feedback", role: error ? "alert" : "status", children: error || message });
  const panelTitle = screen === "pond" ? "The lake" : screen === "shop" ? "Bait & tackle" : screen === "reveal" ? "Your catch" : screen === "collection" ? "Your catches" : screen === "odds" ? "Odds" : "Settings";
  const collection = /* @__PURE__ */ jsxs6(Fragment3, { children: [
    /* @__PURE__ */ jsxs6("div", { className: "fv1-collection-scroll", children: [
      /* @__PURE__ */ jsxs6("div", { className: "fv1-collection-best", children: [
        /* @__PURE__ */ jsxs6("span", { children: [
          totalCount.toString(),
          " kept"
        ] }),
        /* @__PURE__ */ jsx7("span", { className: "fv1-scroll-hint", children: "Scroll for all catches \u2193" }),
        /* @__PURE__ */ jsxs6("span", { children: [
          "Best: ",
          bestIndex < 0 ? "None yet" : fishingItems[bestIndex].name
        ] })
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "fv1-collection", "aria-label": "Catch collection", children: fishingItems.map((item, index2) => /* @__PURE__ */ jsxs6("button", { type: "button", "aria-label": `${item.name}, ${snapshot.inventory[index2]} owned`, "aria-pressed": selectedCatch === index2, "data-owned": snapshot.inventory[index2] > 0n, onClick: () => setSelectedCatch(index2), children: [
        /* @__PURE__ */ jsx7(ItemArt, { item }),
        /* @__PURE__ */ jsx7("span", { children: item.name }),
        /* @__PURE__ */ jsxs6("small", { children: [
          "\xD7",
          snapshot.inventory[index2].toString()
        ] })
      ] }, item.id)) }),
      /* @__PURE__ */ jsxs6("div", { className: "fv1-catch-detail", children: [
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx7("strong", { children: selectedItem.name }),
          /* @__PURE__ */ jsx7("span", { children: rf(selectedValue) })
        ] }),
        /* @__PURE__ */ jsx7("p", { children: selectedCount > 0n ? `${selectedCount} owned \xB7 ${rf(selectedValue)}${selectedValue ? " \xB7 No expiry" : " \xB7 Collectible only"}` : "Not caught yet." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs6("div", { className: "fv1-actions", children: [
      /* @__PURE__ */ jsxs6("button", { className: "fv1-primary", type: "button", "aria-label": `Sell one ${selectedItem.name}`, disabled: busy || paused || selectedCount === 0n || selectedValue === 0n, onClick: () => void sell(selectedCatch + 1, 1n), children: [
        "Sell \xB7 ",
        rf(selectedValue)
      ] }),
      /* @__PURE__ */ jsxs6("button", { type: "button", disabled: busy || paused || totalValue === 0n, onClick: () => void action(async () => {
        for (let index2 = 0; index2 < fishingItems.length; index2++) if (snapshot.inventory[index2] > 0n && fishingGame.outcomes[index2].reward > 0n) await client.redeem(index2 + 1, snapshot.inventory[index2]);
        setMessage("Sold all fish. Boots stay in your collection.");
      }, "reward"), children: [
        "Sell all \xB7 ",
        rf(totalValue)
      ] })
    ] }),
    feedback
  ] });
  return /* @__PURE__ */ jsxs6("section", { className: "fv1", "aria-label": "Fishing game", "aria-busy": busy, "data-screen": screen, children: [
    /* @__PURE__ */ jsxs6("div", { className: "fv1-world-ui", inert: screen !== "world" || paused || void 0, children: [
      /* @__PURE__ */ jsx7(FishingWorld, { friendId: snapshot.friendId, paused: paused || screen !== "world", reducedMotion: reduceMotion, onNearChange: setNear, onInteract: (target) => target === "pond" ? navigate("pond") : openShop() }, worldRevision),
      /* @__PURE__ */ jsx7(GameHud, { balance: snapshot.rfBalance, currency, itemCount: snapshot.consumables, itemCountLabel: "bait", inventoryCount: totalCount, onInventory: () => navigate("collection"), quest: pendingPlay ? `${pendingPlays.length} pending cast${pendingPlays.length === 1 ? "" : "s"} \xB7 Resume at the lake` : void 0, labels: { balance: isPreview ? "Preview RF" : "Friend wallet RF", inventory: "Your catches" } }),
      /* @__PURE__ */ jsx7("button", { className: "fv1-settings fv1-icon", type: "button", "aria-label": "Settings", onClick: () => navigate("settings"), children: /* @__PURE__ */ jsx7(SettingsIcon, {}) }),
      /* @__PURE__ */ jsx7("div", { className: "fv1-sound", children: soundButton }),
      /* @__PURE__ */ jsx7(ActivityPrompt, { className: "fv1-pond-prompt", label: "Go fishing", detail: pendingPlay ? `Resume cast #${pendingPlay.id}` : "Choose your bait", active: near === "pond", onClick: () => navigate("pond") }),
      /* @__PURE__ */ jsx7(ActivityPrompt, { className: "fv1-shop-prompt", label: "Bait & tackle", active: near === "vendor", onClick: openShop }),
      /* @__PURE__ */ jsx7("span", { className: "fv1-accessible", "data-testid": "bait", children: snapshot.consumables.toString() }),
      /* @__PURE__ */ jsx7("span", { className: "fv1-accessible", "data-testid": "balance", children: rf(snapshot.rfBalance) }),
      screen === "world" && (error || message) && /* @__PURE__ */ jsx7("div", { className: "fv1-world-feedback", children: feedback })
    ] }),
    screen !== "world" && /* @__PURE__ */ jsx7(GameMenu, { title: panelTitle, onClose: busy || casting || screen === "reveal" ? void 0 : () => navigate("world"), children: screen === "pond" || screen === "reveal" ? /* @__PURE__ */ jsx7(
      ExperiencePanel,
      {
        stage: screen === "reveal" ? "reward" : casting ? "working" : "activity",
        itemCatalog: [fishingBait, ...fishingItems],
        itemCounts: { bait: snapshot.consumables },
        selectableItemIds: pendingPlay ? [] : ["bait"],
        selectedItemId: "bait",
        activeItemId: "bait",
        itemCost: pendingPlay ? 0n : 1n,
        balance: snapshot.rfBalance,
        currency,
        onSelectItem: () => {
        },
        workingReady: bite,
        reward: caughtItem && result ? { id: result.id.toString(), itemId: caughtItem.id, quantity: 1n } : null,
        rewardValue: caughtValue,
        revealKey: result?.id.toString(),
        reducedMotion: reduceMotion,
        onRevealComplete: () => sound.current?.play(caughtValue >= 5n * RF ? "reveal-legendary" : caughtValue >= RF ? "reveal-rare" : "reveal-common"),
        onAction: !busy && !paused ? () => {
          void (pendingPlay ? resumeCast() : cast());
        } : void 0,
        onShop: openShop,
        onResolve: !busy && !paused ? () => {
          setCasting(false);
          setScreen("reveal");
          sound.current?.play("impact");
        } : void 0,
        onKeep: !busy && !paused ? () => {
          setSelectedCatch((caughtId ?? 2) - 1);
          setScreen("collection");
          setMessage(`Kept ${caughtItem?.name}.`);
        } : void 0,
        onSellReward: caughtValue > 0n && !busy && !paused ? () => void action(async () => {
          await client.redeem(caughtId, 1n);
          setScreen("world");
          setMessage(`Sold ${caughtItem?.name} for ${rf(caughtValue)}${isPreview ? " in preview" : ""}.`);
        }, "reward") : void 0,
        onClose: busy || casting || screen === "reveal" ? void 0 : () => navigate("world"),
        status: message,
        error,
        labels: { activityLocation: "The lake", rewardLocation: "Your catch", activityTitle: pendingPlay ? `Cast #${pendingPlay.id} pending` : "Choose bait", activityDescription: pendingPlay ? "Check this cast's result. Your bait has already been used." : "One bait. One cast.", action: pendingPlay ? `Resume cast #${pendingPlay.id}` : "Cast \xB7 1 bait", activityCost: pendingPlay ? "No additional bait" : "One bait per cast", openShop: "Visit bait shop", missingItems: "Pick up bait at the shop to get started.", workingTitle: "Gone fishing", workingDescription: "Waiting for a bite\u2026", readyTitle: pendingPlay && !casting ? "Result pending" : "A bite!", readyDescription: "Your catch is ready.", resolve: "Reel in", waiting: "Waiting for a bite\u2026", rewardTitle: "You caught", keep: "Keep catch", sell: `Sell catch \xB7 ${rf(caughtValue)}`, reveal: "Skip reveal", close: "Close The lake" },
        slots: { activityArt: /* @__PURE__ */ jsx7(Bobber, {}), workingArt: /* @__PURE__ */ jsx7(Bobber, { ready: bite }), headerActions: soundButton, footer: /* @__PURE__ */ jsx7("span", { children: "Bait \xB7 1 RF at the shop" }), rewardDetails: screen === "reveal" && caughtId ? /* @__PURE__ */ jsxs6("span", { children: [
          fishingGame.outcomes[caughtId - 1].chanceBps / 100,
          "% chance \xB7 ",
          caughtValue ? "Fixed value. No expiry." : "Collectible only."
        ] }) : void 0 }
      }
    ) : screen === "shop" ? /* @__PURE__ */ jsxs6("div", { className: "fv1-shop-panel", "data-tab": shopTab, children: [
      /* @__PURE__ */ jsxs6("div", { className: "fv1-tabs", role: "tablist", "aria-label": "Bait & tackle", onKeyDown: (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === "Home" ? "buy" : event.key === "End" ? "sell" : shopTab === "buy" ? "sell" : "buy";
        setShopTab(next);
        event.currentTarget.querySelector(`[data-tab="${next}"]`)?.focus();
      }, children: [
        /* @__PURE__ */ jsx7("button", { type: "button", role: "tab", "data-tab": "buy", tabIndex: shopTab === "buy" ? 0 : -1, disabled: busy || paused, "aria-selected": shopTab === "buy", onClick: () => setShopTab("buy"), children: "Bait" }),
        /* @__PURE__ */ jsx7("button", { type: "button", role: "tab", "data-tab": "sell", tabIndex: shopTab === "sell" ? 0 : -1, disabled: busy || paused, "aria-selected": shopTab === "sell", onClick: () => setShopTab("sell"), children: "Sell fish" })
      ] }),
      shopTab === "buy" ? /* @__PURE__ */ jsxs6(Fragment3, { children: [
        /* @__PURE__ */ jsxs6("div", { className: "fv1-shop-stock", children: [
          /* @__PURE__ */ jsxs6("div", { className: "fv1-bait-card", children: [
            /* @__PURE__ */ jsx7(ItemArt, { item: fishingBait }),
            /* @__PURE__ */ jsx7("strong", { children: "Bait" }),
            /* @__PURE__ */ jsx7("span", { children: "1 RF each" }),
            /* @__PURE__ */ jsxs6("small", { children: [
              snapshot.consumables.toString(),
              " owned"
            ] })
          ] }),
          /* @__PURE__ */ jsxs6("div", { className: "fv1-shop-copy", children: [
            /* @__PURE__ */ jsxs6("h3", { children: [
              "A little bait.",
              /* @__PURE__ */ jsx7("br", {}),
              "A little luck."
            ] }),
            /* @__PURE__ */ jsx7("p", { children: "One bait gives one cast at the lake." }),
            /* @__PURE__ */ jsxs6("label", { className: "fv1-quantity", children: [
              "Quantity ",
              /* @__PURE__ */ jsx7("input", { inputMode: "numeric", type: "number", min: "1", max: "99", value: quantity, onChange: (event) => setQuantity(event.target.value) })
            ] }),
            /* @__PURE__ */ jsx7("button", { className: "fv1-link", type: "button", onClick: () => navigate("odds"), children: "View odds" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs6("div", { className: "fv1-summary", children: [
          /* @__PURE__ */ jsxs6("span", { children: [
            count.toString(),
            " bait"
          ] }),
          /* @__PURE__ */ jsx7("strong", { children: rf(cost) })
        ] }),
        /* @__PURE__ */ jsxs6("div", { className: "fv1-actions", children: [
          /* @__PURE__ */ jsxs6("button", { className: "fv1-primary", type: "button", disabled: busy || paused || !canBuy, onClick: () => void action(async () => {
            await client.buy(count);
            setMessage(`Bought ${count} bait${isPreview ? " with simulated RF" : ""}.`);
          }, "purchase"), children: [
            "Buy bait ",
            /* @__PURE__ */ jsx7("span", { "aria-hidden": "true", children: "\u2197" })
          ] }),
          /* @__PURE__ */ jsxs6("button", { type: "button", disabled: busy, onClick: () => navigate("pond"), children: [
            "Back to the pond ",
            /* @__PURE__ */ jsx7("span", { "aria-hidden": "true", children: "\u2192" })
          ] })
        ] }),
        /* @__PURE__ */ jsx7("p", { className: "fv1-feedback", role: error ? "alert" : "status", children: error || message || (!hasBacking ? "Bait sales paused: not enough free stake. Purchased bait remains playable." : snapshot.rfBalance < cost ? isPreview ? "Not enough simulated RF." : "Not enough RF in this Friend wallet." : count === 0n ? "Choose 1 to 99 bait." : `${rf(snapshot.rfBalance)} available \xB7 ${isPreview ? "Simulated RF" : "Friend wallet"}`) })
      ] }) : /* @__PURE__ */ jsx7("div", { className: "fv1-collection-panel", children: collection })
    ] }) : screen === "collection" ? /* @__PURE__ */ jsx7("div", { className: "fv1-collection-panel", children: collection }) : /* @__PURE__ */ jsxs6("div", { className: "fv1-text-panel", children: [
      screen === "odds" ? /* @__PURE__ */ jsxs6(Fragment3, { children: [
        /* @__PURE__ */ jsx7("p", { children: "1 RF per bait \xB7 Expected return 0.90 RF \xB7 10% vendor edge" }),
        /* @__PURE__ */ jsxs6("table", { children: [
          /* @__PURE__ */ jsx7("thead", { children: /* @__PURE__ */ jsxs6("tr", { children: [
            /* @__PURE__ */ jsx7("th", { children: "Catch" }),
            /* @__PURE__ */ jsx7("th", { children: "Chance" }),
            /* @__PURE__ */ jsx7("th", { children: "Value" })
          ] }) }),
          /* @__PURE__ */ jsx7("tbody", { children: fishingGame.outcomes.map((outcome) => /* @__PURE__ */ jsxs6("tr", { children: [
            /* @__PURE__ */ jsx7("th", { scope: "row", children: outcome.name }),
            /* @__PURE__ */ jsxs6("td", { children: [
              outcome.chanceBps / 100,
              "%"
            ] }),
            /* @__PURE__ */ jsx7("td", { children: rf(outcome.reward) })
          ] }, outcome.name)) })
        ] }),
        /* @__PURE__ */ jsx7("p", { children: "Every bait reserves 10 RF. Kept fish remain backed until sold." }),
        /* @__PURE__ */ jsxs6("p", { children: [
          "Free stake: ",
          /* @__PURE__ */ jsx7("span", { "data-testid": "free-stake", children: rf(snapshot.freeStake) })
        ] })
      ] }) : /* @__PURE__ */ jsxs6(Fragment3, { children: [
        /* @__PURE__ */ jsx7("p", { children: isPreview ? "Local preview. Simulated RF and outcomes; no live transactions. Progress resets on reload." : "Robinhood mainnet. Purchases and rewards use this Friend's canonical RF wallet. Resume pending casts at the lake." }),
        /* @__PURE__ */ jsx7("button", { type: "button", "aria-pressed": !muted, onClick: toggleSound, children: muted ? "Sound off" : "Sound on" }),
        /* @__PURE__ */ jsxs6("label", { className: "fv1-motion", children: [
          /* @__PURE__ */ jsx7("input", { type: "checkbox", checked: reduceMotion, onChange: (event) => setReduceMotion(event.target.checked) }),
          " Reduce motion"
        ] }),
        /* @__PURE__ */ jsx7("button", { type: "button", onClick: () => setWorldRevision((value) => value + 1), children: "Reset walking position" }),
        /* @__PURE__ */ jsx7("button", { type: "button", onClick: () => navigate("odds"), children: "Odds" }),
        /* @__PURE__ */ jsx7("p", { children: "Click or tap to walk. Use arrows or WASD while the world is focused; press E near the pond or shop." })
      ] }),
      feedback
    ] }) })
  ] });
}
var index_default = FishingGame;
export {
  FishingGame,
  FishingPreview,
  index_default as default,
  fishingGame,
  fishingItems
};
/*! Bundled license information:

@noble/hashes/esm/utils.js:
  (*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) *)

@noble/curves/esm/abstract/utils.js:
@noble/curves/esm/abstract/modular.js:
@noble/curves/esm/abstract/curve.js:
@noble/curves/esm/abstract/weierstrass.js:
@noble/curves/esm/_shortw_utils.js:
@noble/curves/esm/secp256k1.js:
  (*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) *)
*/
