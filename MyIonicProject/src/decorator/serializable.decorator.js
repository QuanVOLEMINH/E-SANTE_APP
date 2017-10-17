export var METADATA_KEY_SERIALIZABLE = "SERIALIZABLE";
export function serializable(name) {
    return function (target, key) {
        Reflect.defineMetadata(METADATA_KEY_SERIALIZABLE, { key: key, name: name || key }, target, key);
    };
}
export function getSerializables(target) {
    var serializables = [];
    for (var key in target) {
        var metadata = Reflect.getMetadata(METADATA_KEY_SERIALIZABLE, target, key);
        if (metadata) {
            serializables.push(metadata);
        }
    }
    return serializables;
}
export function serialize(target, prototype) {
    return getSerializables(prototype || target).reduce(function (prev, prop) {
        prev[prop.name] = target[prop.key];
        return prev;
    }, {});
}

//# sourceMappingURL=serializable.decorator.js.map
