(function ($) {
    var gclConfig = new GCLLib.GCLConfig();
    gclConfig.apiKey = "2cc27598-2af7-48af-a2df-c7352e5368ff"; //test apikey rate limited
    gclConfig.gclUrl = "https://localhost:10443/v1"; //override config for local dev
    gclConfig.ocvUrl = "https://accapim.t1t.be:443/trust1team/ocv-api/v1";
    //gclConfig.ocvUrl = "http://localhost:8080/ocv-api-web/v1";
    gclConfig.localTestMode=false;
    gclConfig.allowAutoUpdate = true;
    gclConfig.implicitDownload = false;

    if(gclConfig.localTestMode){
        gclConfig.dsUrl = "http://localhost:8080";
    }else {
        gclConfig.dsUrl = "https://accapim.t1t.be:443";
        //gclConfig.dsUrl = "https://accapim.t1t.be:443";
        //gclConfig.dsUrl = "https://prodapim.t1t.be:443";
        //gclConfig.dsUrl = "https://t1c.t1t.be:443";

    }

    var connector = new GCLLib.GCLClient(gclConfig);

    connector.core().info(function(err,data) {
        $("#error").empty();
        $("#error").append(data.data.version);
        if(data && data.data.activated==true){
            //check card readers upon refresh and provide the info
            var core = connector.core();
            core.readers(function(err,data){
                if(err) {
                    console.log(JSON.stringify(err));
                    return;
                }
                if(data && data.data){
                    for(var i=0; i < data.data.length ; i ++){
                        if(data.data[i].card){
                            $("#readerlist").append( '<li id="liid"><a href="#" ><h5><span class="label label-success" >' + data.data[i].id + '</span></h5></a></li>' );
                        }else{
                            $("#readerlist").append( '<li><a href="#"><h5><span class="label label-warning">' + data.data[i].id + '</span></h5></a></li>' );
                        }
                    }
                } else $("#readerlist").append( '<li> No readers connected </li>' );
            });
        }
    });

    function callback(err,data) {
        if(err){$("#error").empty();$("#error").append("ERROR:\n", JSON.stringify(err, null, '  '));}
        else {
            $("#information").append(JSON.stringify(data, null, '  '));
        }
    }

    function validationCallback(err, data) {
        console.log("error:"+JSON.stringify(err));
        console.log("data:"+JSON.stringify(data));
        $("#validationError").empty();
        $("#validationInfo").empty();
        $("#validationError").hide();
        $("#validationInfo").hide();

        if(err){
            $("#validationError").append(JSON.stringify(err, null, '  '));
            $("#validationError").show();
        }
        else{
            $("#validationInfo").append(JSON.stringify(data, null, '  '));
            $("#validationInfo").show();
        }
    }

    function validationCallbackEMV(err, data) {
        console.log("error:"+JSON.stringify(err));
        console.log("data:"+JSON.stringify(data));
        $("#validationErrorEMV").empty();
        $("#validationInfoEMV").empty();
        $("#validationErrorEMV").hide();
        $("#validationInfoEMV").hide();

        if(err){
            $("#validationErrorEMV").append(JSON.stringify(err, null, '  '));
            $("#validationErrorEMV").show();
        }
        else{
            $("#validationInfoEMV").append(JSON.stringify(data, null, '  '));
            $("#validationInfoEMV").show();
        }
    }

    function signCallback(err, data) {
        console.log("error:"+JSON.stringify(err));
        console.log("data:"+JSON.stringify(data));
        $("#signError").empty();
        $("#signInfo").empty();
        $("#signError").hide();
        $("#signInfo").hide();

        if(err){
            $("#signError").append(JSON.stringify(err, null, '  '));
            $("#signError").show();
        }
        else{
            $("#signInfo").append(JSON.stringify(data, null, '  '));
            $("#signInfo").show();
        }
    }

    function authCallback(err, data) {
        console.log("error:"+JSON.stringify(err));
        console.log("data:"+JSON.stringify(data));
        $("#authError").empty();
        $("#authInfo").empty();
        $("#authError").hide();
        $("#authInfo").hide();

        if(err){
            $("#authError").append(JSON.stringify(err, null, '  '));
            $("#authError").show();
        }
        else{
            $("#authInfo").append(JSON.stringify(data, null, '  '));
            $("#authInfo").show();
        }
    }

    function ocvAuthCallback(err, data) {
        console.log("error:"+JSON.stringify(err));
        console.log("data:"+JSON.stringify(data));
        $("#ocvAuthError").empty();
        $("#ocvAuthInfo").empty();
        $("#ocvAuthError").hide();
        $("#ocvAuthInfo").hide();

        if(err){
            $("#ocvAuthError").append(JSON.stringify(err, null, '  '));
            $("#ocvAuthError").show();
        }
        else{
            $("#ocvAuthInfo").append(JSON.stringify(data, null, '  '));
            $("#ocvAuthInfo").show();
        }
        var signature = data.data;
        // verify challenge against backend
        connector.beid($("#selected_reader").text()).authenticationCertificate(function(err,data){
            var _req = {};
            _req.hash = $("#ocvtempvalue").val();
            _req.digestAlgorithm = "SHA256";
            _req.base64Signature = signature;
            _req.base64Certificate = data.data;
            connector.ocv().validateChallengeSignedHash(_req,function(err,data){
                if(err){$("#error").empty();$("#error").append("ERROR:\n", JSON.stringify(err, null, '  '));}
                else {
                    $("#ocvAuthInfo").append(JSON.stringify(data, null, '  '));
                }
            });
        });
    }

    function handleSuccess(data) {
        $("#information").append(JSON.stringify(data, null, '  '));
    }

    function handleError(err) {
        console.log(err);
        $("#error").empty();$("#error").append("ERROR:\n", JSON.stringify(err, null, '  '));
    }

    function universalHandler(dataToShow, fieldToShow, fieldToHide) {
        $(fieldToHide).empty();
        $(fieldToHide).hide();

        $(fieldToShow).append(JSON.stringify(dataToShow, null, '  '));
        $(fieldToShow).show();
    }

    //show selected reader in menu
    $('.dropdown-menu').on('click', function(event){
        $('#selected_reader').empty();
        $('#selected_reader').append(event.target.innerHTML);
        $('.dropdown-toggle').html($(this).html() + '<span class="caret"></span>');
    });

    // Core Functionality
    $("#info").on('click', function () {
        $("#information").empty();
        var core = connector.core();
        core.info(callback);
    });
    $("#infoBrowser").on('click', function () {
        $("#information").empty();
        var core = connector.core();
        core.infoBrowser(callback);
    });
    $("#getReaders").on('click', function () {
        $("#information").empty();
        var core = connector.core();
        core.readers(callback);
    });
    $("#pollReaders").on('click', function () {
        $("#information").empty();
        var core = connector.core();
        core.pollReaders(15,callback,function(){console.log('Please connect a reader')},function(){console.log('Stop waiting for readers, none found')});
    });
    $("#pollCard").on('click', function () {
        $("#information").empty();
        connector.core().pollCardInserted(20,callback,function(){console.log('Please connect a reader')},
            function(){console.log("Please insert card")},
            function(){console.log("Stop waiting for card, none found")}
        );
    });
    $("#getReadersAvailable").on('click', function () {
        $("#information").empty();
        var core = connector.core();
        core.readersCardAvailable(callback);
    });
    $("#getReadersUnavailable").on('click', function () {
        $("#information").empty();
        var core = connector.core();
        core.readersCardsUnavailable(callback);
    });
    $("#getKey").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        var apikey = connector.config().apiKey;
        if(apikey) $("#information").append(apikey);
        else $("#information").append('no apikey set');
    });
    $("#getPubKeyDS").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        connector.ds().getPubKey(callback);
    });
    $("#getPubKeyGCL").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        connector.core().getPubKey(callback);
    });
    $("#getJWT").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        connector.ds().getJWT(callback);
    });
    $("#getJWTRefresh").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        $("#validationError").empty();
        connector.ds().refreshJWT(callback);
    });
    $("#getPlugins").on('click', function () {
        $("#information").empty();
        var core = connector.core();
        core.plugins(callback);
    });

    // belgian eid functionality
    $("#beidFiltered").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        var filter = [];
        if($("#rndata").is(":checked"))filter.push($("#rndata").val());
        if($("#address").is(":checked"))filter.push($("#address").val());
        if($("#photo").is(":checked"))filter.push($("#photo").val());
        if($("#rootcert").is(":checked"))filter.push($("#rootcert").val());
        if($("#authcert").is(":checked"))filter.push($("#authcert").val());
        if($("#nonrepcert").is(":checked"))filter.push($("#nonrepcert").val());
        if($("#citizencert").is(":checked"))filter.push($("#citizencert").val());
        if($("#rrncert").is(":checked"))filter.push($("#rrncert").val());
        beid.allData({ filters: filter, parseCerts: $("#parseCerts").is(":checked") }, callback);
    });
    $("#beidFilteredPromise").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        var filter = [];
        if($("#rndata").is(":checked"))filter.push($("#rndata").val());
        if($("#address").is(":checked"))filter.push($("#address").val());
        if($("#photo").is(":checked"))filter.push($("#photo").val());
        if($("#rootcert").is(":checked"))filter.push($("#rootcert").val());
        if($("#authcert").is(":checked"))filter.push($("#authcert").val());
        if($("#nonrepcert").is(":checked"))filter.push($("#nonrepcert").val());
        if($("#citizencert").is(":checked"))filter.push($("#citizencert").val());
        if($("#rrncert").is(":checked"))filter.push($("#rrncert").val());
        beid.allData({ filters: filter, parseCerts: $("#parseCerts").is(":checked") }).then(handleSuccess, handleError);
    });
    $("#beidCertsFiltered").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        var filter = [];
        if($("#rootcertx").is(":checked"))filter.push($("#rootcertx").val());
        if($("#authcertx").is(":checked"))filter.push($("#authcertx").val());
        if($("#nonrepcertx").is(":checked"))filter.push($("#nonrepcertx").val());
        if($("#citizencertx").is(":checked"))filter.push($("#citizencertx").val());
        if($("#rrncertx").is(":checked"))filter.push($("#rrncertx").val());
        beid.allCerts({ filters: filter, parseCerts: $("#parseCerts").is(":checked") }, callback);
    });
    $("#beidCertsFilteredPromise").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        var filter = [];
        if($("#rootcertx").is(":checked"))filter.push($("#rootcertx").val());
        if($("#authcertx").is(":checked"))filter.push($("#authcertx").val());
        if($("#nonrepcertx").is(":checked"))filter.push($("#nonrepcertx").val());
        if($("#citizencertx").is(":checked"))filter.push($("#citizencertx").val());
        if($("#rrncertx").is(":checked"))filter.push($("#rrncertx").val());
        beid.allCerts({ filters: filter, parseCerts: $("#parseCerts").is(":checked") }).then(handleSuccess, handleError);
    });
    $("#beidRn").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.rnData(callback);
    });
    $("#beidRnPromise").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.rnData().then(handleSuccess, handleError);
    });
    $("#beidAddress").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.address(callback);
    });
    $("#beidAddressPromise").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.address().then(handleSuccess, handleError);
    });
    $("#beidPic").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.picture(callback);
    });
    $("#beidPicPromise").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.picture().then(handleSuccess, handleError);
    });
    $("#beidAllCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.allCerts({ filters: [], parseCerts: $("#parseCerts").is(":checked") }, callback);
    });
    $("#beidAllCertPromise").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.allCerts({ filters: [], parseCerts: $("#parseCerts").is(":checked") }).then(handleSuccess, handleError);
    });
    $("#beidRootCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.rootCertificate({ parseCerts: $("#parseCerts").is(":checked") }, callback);
    });
    $("#beidRootCertPromise").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.rootCertificate({ parseCerts: $("#parseCerts").is(":checked") }).then(handleSuccess, handleError);
    });
    $("#beidCitizenCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.citizenCertificate({ parseCerts: $("#parseCerts").is(":checked") }, callback);
    });
    $("#beidCitizenCertPromise").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.citizenCertificate({ parseCerts: $("#parseCerts").is(":checked") }).then(handleSuccess, handleError);
    });
    $("#beidRRNCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.rrnCertificate({ parseCerts: $("#parseCerts").is(":checked") }, callback);
    });
    $("#beidRRNCertPromise").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.rrnCertificate({ parseCerts: $("#parseCerts").is(":checked") }).then(handleSuccess, handleError);
    });
    $("#beidAuthCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.authenticationCertificate({ parseCerts: $("#parseCerts").is(":checked") }, callback);
    });
    $("#beidAuthCertPromise").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.authenticationCertificate({ parseCerts: $("#parseCerts").is(":checked") }).then(handleSuccess, handleError);
    });
    $("#beidNonRepCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.nonRepudiationCertificate({ parseCerts: $("#parseCerts").is(":checked") }, callback);
    });
    $("#beidNonRepCertPromise").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.nonRepudiationCertificate({ parseCerts: $("#parseCerts").is(":checked") }).then(handleSuccess, handleError);
    });
    $("#beidVerifyPin").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        $("#psw").val("");
        $("#validationInfo").empty();
        $("#validationInfo").hide();
        $("#validationError").empty();
        $("#validationError").hide();
        $("#pinModal").modal('toggle');
    });
    $("#beidVerifyPinPromise").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        $("#pswPromise").val("");
        $("#validationInfoPromise").empty();
        $("#validationInfoPromise").hide();
        $("#validationErrorPromise").empty();
        $("#validationErrorPromise").hide();
        $("#pinModalPromise").modal('toggle');
    });


    $("#genericCanAuthenticate").on('click', function () {
        $("#information").empty();
        connector.readersCanAuthenticate().then(handleSuccess, handleError);
    });
    $("#genericCanSign").on('click', function () {
        $("#information").empty();
        connector.readersCanSign().then(handleSuccess, handleError);
    });
    $("#genericCanVerifyPin").on('click', function () {
        $("#information").empty();
        connector.readersCanVerifyPin().then(handleSuccess, handleError);
    });

    $("#genericAuthenticate").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        $("#testAllPswLabel").show();
        $("#buttonRunTests").hide();
        $("#buttonGenericAuthenticate").show();
        $("#buttonGenericSign").hide();
        $("#buttonGenericVerifyPin").hide();
        $("#testAllPsw").val("").show();
        $("#testAllInfo").empty().hide();
        $("#testAllError").empty().hide();
        $("#testAllModal").modal('toggle');
    });
    $("#buttonGenericAuthenticate").on('click', function () {
        var pinField = $("#testAllPsw");
        var pin = pinField.val();
        $("#testAllModal").modal('toggle');
        $("#information").empty();
        var data = {
            data: "E1uHACbPvhLew0gGmBH83lvtKIAKxU2/RezfBOsT6Vs=",
            pin: pin
        };
        connector.authenticate($("#selected_reader").text(), data).then(handleSuccess, handleError);
    });

    $("#genericVerifyPin").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        $("#testAllPswLabel").show();
        $("#buttonRunTests").hide();
        $("#buttonGenericAuthenticate").hide();
        $("#buttonGenericSign").hide();
        $("#buttonGenericVerifyPin").show();
        $("#testAllPsw").val("").show();
        $("#testAllInfo").empty().hide();
        $("#testAllError").empty().hide();
        $("#testAllModal").modal('toggle');
    });
    $("#buttonGenericVerifyPin").on('click', function () {
        var pinField = $("#testAllPsw");
        var pin = pinField.val();
        $("#testAllModal").modal('toggle');
        $("#information").empty();
        var data = {
            pin: pin
        };
        connector.verifyPin($("#selected_reader").text(), data).then(handleSuccess, handleError);
    });

    $("#genericSign").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        $("#testAllPswLabel").show();
        $("#buttonRunTests").hide();
        $("#buttonGenericAuthenticate").hide();
        $("#buttonGenericSign").show();
        $("#buttonGenericVerifyPin").hide();
        $("#testAllPsw").val("").show();
        $("#testAllInfo").empty().hide();
        $("#testAllError").empty().hide();
        $("#testAllModal").modal('toggle');
    });
    $("#buttonGenericSign").on('click', function () {
        var pinField = $("#testAllPsw");
        var pin = pinField.val();
        $("#testAllModal").modal('toggle');
        $("#information").empty();
        var data = {
            data: "E1uHACbPvhLew0gGmBH83lvtKIAKxU2/RezfBOsT6Vs=",
            pin: pin,
            algorithm_reference: "sha256"
        };
        connector.sign($("#selected_reader").text(), data).then(handleSuccess, handleError);
    });

    $("#buttonValidate").on('click', function () {
        var _body={};
        _body.pin = $("#psw").val();
        connector.beid($("#selected_reader").text()).verifyPin(_body, validationCallback);
    });
    $("#buttonValidatePromise").on('click', function () {
        var _body={};
        _body.pin = $("#pswPromise").val();
        connector.beid($("#selected_reader").text()).verifyPin(_body).then(function(data) {
            universalHandler(data, "#validationInfoPromise", "#validationErrorPromise");
        }, function(err) {
            universalHandler(err, "#validationErrorPromise", "#validationInfoPromise");
        });
    });

    $("#beidSign").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        $("#signpswPromise").val("");
        $("#signInformation").empty();
        $("#signInformation").hide();
        $("#signError").empty();
        $("#signError").hide();
        $("#signModal").modal('toggle');
    });
    $("#beidSignPromise").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        $("#signpswPromise").val("");
        $("#signInfoPromise").empty();
        $("#signInfoPromise").hide();
        $("#signErrorPromise").empty();
        $("#signErrorPromise").hide();
        $("#signModalPromise").modal('toggle');
    });

    $("#buttonSign").on('click', function () {
        var _body={};
        _body.pin = $("#signpsw").val();
        _body.algorithm_reference = "sha256";
        _body.data = "E1uHACbPvhLew0gGmBH83lvtKIAKxU2/RezfBOsT6Vs=";
        connector.beid($("#selected_reader").text()).signData(_body, signCallback);
    });
    $("#buttonSignPromise").on('click', function () {
        var _body={};
        _body.pin = $("#signpswPromise").val();
        _body.algorithm_reference = "sha256";
        _body.data = "E1uHACbPvhLew0gGmBH83lvtKIAKxU2/RezfBOsT6Vs=";
        connector.beid($("#selected_reader").text()).signData(_body).then(function(data) {
            universalHandler(data, "#signInfoPromise", "#signErrorPromise");
        }, function(err) {
            universalHandler(err, "#signErrorPromise", "#signInfoPromise");
        });
    });


    $("#beidAuthenticate").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        $("#authpsw").val("");
        $("#authInfo").empty().hide();
        $("#authError").empty().hide();
        $("#authModal").modal('toggle');
    });
    $("#beidAuthenticatePromise").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        $("#authpswPromise").val("");
        $("#authInfoPromise").empty().hide();
        $("#authErrorPromise").empty().hide();
        $("#authModalPromise").modal('toggle');
    });

    $("#buttonAuth").on('click', function () {
        var _body={};
        _body.data = "I2e+u/sgy7fYgh+DWA0p2jzXQ7E=";
        _body.algorithm_reference = "sha1";
        _body.pin = $("#authpsw").val();
        connector.beid($("#selected_reader").text()).authenticate(_body, authCallback);
    });
    $("#buttonAuthPromise").on('click', function () {
        var _body={};
        _body.data = "I2e+u/sgy7fYgh+DWA0p2jzXQ7E=";
        _body.algorithm_reference = "sha1";
        _body.pin = $("#authpswPromise").val();
        connector.beid($("#selected_reader").text()).authenticate(_body).then(function(data) {
            universalHandler(data, "#authInfoPromise", "#authErrorPromise");
        }, function(err) {
            universalHandler(err, "#authErrorPromise", "#authInfoPromise");
        });
    });

    $("#testAll").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        $("#testAllPswLabel").show();
        $("#buttonRunTests").show();
        $("#buttonGenericAuthenticate").hide();
        $("#buttonGenericSign").hide();
        $("#buttonGenericVerifyPin").hide();
        $("#testAllPsw").val("").show();
        $("#testAllInfo").empty().hide();
        $("#testAllError").empty().hide();
        $("#testAllModal").modal('toggle');
    });
    $("#buttonRunTests").on('click', function () {
        var pinField = $("#testAllPsw");
        var pin = pinField.val();
        var parseCerts = $("#parseCerts").is(":checked");
        var readerId = $("#selected_reader").text();

        var promises = [];

        $("#testAllPswLabel").hide();
        pinField.hide();
        $("#buttonRunTests").hide();
        $("#testAllInfo").append("Running tests, please wait...").show();

        // RN Data
        promises.push(connector.beid(readerId).rnData().then(function(value) {
            return {
                operation: 'RN Data (Promise)',
                result: value
            }
        }, function(error) {
            return {
                operation: 'RN Data (Promise)',
                result: error
            }
        }));
        promises.push(new Promise(function(resolve, reject) {
            connector.beid(readerId).rnData(function(error, data) {
                if (error) reject( { operation: 'RN Data (Callback)', error: error });
                else resolve({ operation: 'RN Data (Callback)',
                    result: data });
            });
        }));

        // Address
        promises.push(connector.beid(readerId).address().then(function(value) {
            return {
                operation: 'Address (Promise)',
                result: value
            }
        }, function(error) {
            return {
                operation: 'Address (Promise)',
                result: error
            }
        }));
        promises.push(new Promise(function(resolve, reject) {
            connector.beid(readerId).address(function(error, data) {
                if (error) reject( { operation: 'Address (Callback)', error: error });
                else resolve({ operation: 'Address (Callback)',
                    result: data });
            });
        }));

        // Picture
        promises.push(connector.beid(readerId).picture().then(function(value) {
            return {
                operation: 'Picture (Promise)',
                result: value
            }
        }, function(error) {
            return {
                operation: 'Picture (Promise)',
                result: error
            }
        }));
        promises.push(new Promise(function(resolve, reject) {
            connector.beid(readerId).picture(function(error, data) {
                if (error) reject( { operation: 'Picture (Callback)', error: error });
                else resolve({ operation: 'Picture (Callback)',
                    result: data });
            });
        }));

        // All Cert
        promises.push(connector.beid(readerId).allCerts({ filters: [], parseCerts: parseCerts }).then(function(value) {
            return {
                operation: 'All Certs (Promise)',
                result: value
            }
        }, function(error) {
            return {
                operation: 'All Certs (Promise)',
                result: error
            }
        }));
        promises.push(new Promise(function(resolve, reject) {
            connector.beid(readerId).allCerts({ filters: [], parseCerts: parseCerts }, function(error, data) {
                if (error) reject( { operation: 'All Certs (Callback)', error: error });
                else resolve({ operation: 'All Certs (Callback)',
                    result: data });
            });
        }));

        // Root Cert
        promises.push(connector.beid(readerId).rootCertificate({ parseCerts: parseCerts }).then(function(value) {
            return {
                operation: 'Root Cert (Promise)',
                result: value
            }
        }, function(error) {
            return {
                operation: 'Root Cert (Promise)',
                result: error
            }
        }));
        promises.push(new Promise(function(resolve, reject) {
            connector.beid(readerId).rootCertificate({ parseCerts: parseCerts }, function(error, data) {
                if (error) reject( { operation: 'Root Cert (Callback)', error: error });
                else resolve({ operation: 'Root Cert (Callback)',
                    result: data });
            });
        }));

        // Citizen Cert
        promises.push(connector.beid(readerId).citizenCertificate({ parseCerts: parseCerts }).then(function(value) {
            return {
                operation: 'Citizen Cert (Promise)',
                result: value
            }
        }, function(error) {
            return {
                operation: 'Citizen Cert (Promise)',
                result: error
            }
        }));
        promises.push(new Promise(function(resolve, reject) {
            connector.beid(readerId).citizenCertificate({ parseCerts: parseCerts }, function(error, data) {
                if (error) reject( { operation: 'Citizen Cert (Callback)', error: error });
                else resolve({ operation: 'Citizen Cert (Callback)',
                    result: data });
            });
        }));

        // Auth Cert
        promises.push(connector.beid(readerId).authenticationCertificate({ parseCerts: parseCerts }).then(function(value) {
            return {
                operation: 'Auth Cert (Promise)',
                result: value
            }
        }, function(error) {
            return {
                operation: 'Auth Cert (Promise)',
                result: error
            }
        }));
        promises.push(new Promise(function(resolve, reject) {
            connector.beid(readerId).authenticationCertificate({ parseCerts: parseCerts }, function(error, data) {
                if (error) reject( { operation: 'Auth Cert (Callback)', error: error });
                else resolve({ operation: 'Auth Cert (Callback)',
                    result: data });
            });
        }));

        // Non Repudiation Cert
        promises.push(connector.beid(readerId).nonRepudiationCertificate({ parseCerts: parseCerts }).then(function(value) {
            return {
                operation: 'Non Repudiation Cert (Promise)',
                result: value
            }
        }, function(error) {
            return {
                operation: 'Non Repudiation Cert (Promise)',
                result: error
            }
        }));
        promises.push(new Promise(function(resolve, reject) {
            connector.beid(readerId).nonRepudiationCertificate({ parseCerts: parseCerts }, function(error, data) {
                if (error) reject( { operation: 'Non Repudiation Cert (Callback)', error: error });
                else resolve({ operation: 'Non Repudiation Cert (Callback)',
                    result: data });
            });
        }));

        // RRN Cert
        promises.push(connector.beid(readerId).rrnCertificate({ parseCerts: parseCerts }).then(function(value) {
            return {
                operation: 'RRN Cert (Promise)',
                result: value
            }
        }, function(error) {
            return {
                operation: 'RRN Cert (Promise)',
                result: error
            }
        }));
        promises.push(new Promise(function(resolve, reject) {
            connector.beid(readerId).rrnCertificate({ parseCerts: parseCerts }, function(error, data) {
                if (error) reject( { operation: 'RRN Cert (Callback)', error: error });
                else resolve({ operation: 'RRN Cert (Callback)',
                    result: data });
            });
        }));

        // Verify PIN
        var body = { pin: pin };
        promises.push(connector.beid(readerId).verifyPin(body).then(function(value) {
            return {
                operation: 'Verify PIN (Promise)',
                result: value
            }
        }, function(error) {
            return {
                operation: 'Verify PIN (Promise)',
                result: error
            }
        }));
        promises.push(new Promise(function(resolve, reject) {
            connector.beid(readerId).verifyPin(body, function(error, data) {
                if (error) reject( { operation: 'Verify PIN (Callback)', error: error });
                else resolve({ operation: 'Verify PIN (Callback)',
                    result: data });
            });
        }));

        // Sign Data
        var signBody = {
            pin: pin,
            algorithm_reference: "sha256",
            data: "E1uHACbPvhLew0gGmBH83lvtKIAKxU2/RezfBOsT6Vs="
        };
        promises.push(connector.beid(readerId).signData(signBody).then(function(value) {
            return {
                operation: 'Sign Data (Promise)',
                result: value
            }
        }, function(error) {
            return {
                operation: 'Sign Data (Promise)',
                result: error
            }
        }));
        promises.push(new Promise(function(resolve, reject) {
            connector.beid(readerId).signData(signBody, function(error, data) {
                if (error) reject( { operation: 'Sign Data (Callback)', error: error });
                else resolve({ operation: 'Sign Data (Callback)',
                    result: data });
            });
        }));

        // Authenticate
        var authBody = {
            data: "I2e+u/sgy7fYgh+DWA0p2jzXQ7E=",
            algorithm_reference: 'sha1',
            pin: pin
        };

        promises.push(connector.beid(readerId).authenticate(authBody).then(function(value) {
            return {
                operation: 'Authenticate (Promise)',
                result: value
            }
        }, function(error) {
            return {
                operation: 'Authenticate (Promise)',
                result: error
            }
        }));
        promises.push(new Promise(function(resolve, reject) {
            connector.beid(readerId).authenticate(authBody, function(error, data) {
                if (error) reject( { operation: 'Authenticate (Callback)', error: error });
                else resolve({ operation: 'Authenticate (Callback)',
                    result: data });
            });
        }));


        Promise.all(promises).then(function(data) {
            $("#testAllModal").modal('toggle');
            handleSuccess(data);
        }, function(err) {
            $("#testAllModal").modal('toggle');
            handleError(err);
        });
    });

    //call to gcl in order to sign the server generated hash
    $("#ocvButtonAuth").on('click', function () {
        var _body={};
        _body.data = $("#ocvtempvalue").val();
        _body.algorithm_reference = "sha256";
        _body.pin = $("#ocvAuthpsw").val();
        connector.beid($("#selected_reader").text()).authenticate(_body, ocvAuthCallback);
    });

    $("#downloadgcl").on('click',function(){
        var core = connector.core();
        var self = this;
        core.infoBrowser(function(error,data){
            if(error){$("#error").append('Could not retrieve browser info');}
            connector.ds().downloadLink(data,function(error,data){
                if(error)$("#error").append('Error retrieving download link');
                $("#error").empty();
                $("#information").empty();
                $("#downloadModal").modal('toggle');
                $("a").remove('.downloadlinkref');
                $("#modalDownloadLink").append('<a class= "downloadlinkref" href="'+ data.url +'">Download link GCL</a>');
            });
        });
    });

    $("#clear").on('click', function () {
        $("#information").empty();
        $("#error").empty();

    });
})(window.jQuery);