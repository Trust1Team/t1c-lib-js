var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { GenericContainer } from '../GenericContainer';
var JavaKeyTool = (function (_super) {
    __extends(JavaKeyTool, _super);
    function JavaKeyTool(baseUrl, containerUrl, connection) {
        return _super.call(this, baseUrl, containerUrl, connection, JavaKeyTool.CONTAINER_PREFIX) || this;
    }
    JavaKeyTool.prototype.generateKeyPair = function (body, callback) {
        console.log(body);
        return this.connection.post(this.baseUrl, this.containerSuffix(JavaKeyTool.GENERATE_KEY_PAIR), body, undefined, undefined, callback);
    };
    JavaKeyTool.CONTAINER_PREFIX = 'java-keytool';
    JavaKeyTool.GENERATE_KEY_PAIR = '/genkeypair';
    return JavaKeyTool;
}(GenericContainer));
export { JavaKeyTool };
//# sourceMappingURL=JavaKeyTool.js.map