/**
 * @author Maarten Casteels
 * @since 2016
 */
var BeIDCard = (function () {
    function BeIDCard(url, connection) {
        this.url = url + '/beid';
        this.connection = connection;
    }
    // GET  Rn Data
    BeIDCard.prototype.rn = function (resolve, reject) {
        var p = this.connection.get(this.url + '/rn');
        p.then(function (result) {
            return resolve(result);
        }, function (error) {
            return reject(error);
        });
    };
    // GET  Address
    BeIDCard.prototype.address = function (resolve, reject) {
        var p = this.connection.get(this.url + '/address');
        p.then(function (result) {
            return resolve(result);
        }, function (error) {
            return reject(error);
        });
    };
    // GET  Photo
    BeIDCard.prototype.photo = function (resolve, reject) {
        var p = this.connection.get(this.url + '/photo');
        p.then(function (result) {
            return resolve(result);
        }, function (error) {
            return reject(error);
        });
    };
    // GET  Certificate Root
    BeIDCard.prototype.rootCertificate = function (resolve, reject) {
        var p = this.connection.get(this.url + '/rootCertificate');
        p.then(function (result) {
            return resolve(result);
        }, function (error) {
            return reject(error);
        });
    };
    return BeIDCard;
})();
exports.BeIDCard = BeIDCard;
//# sourceMappingURL=BeIDCard.js.map