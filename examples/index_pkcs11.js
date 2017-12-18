(function ($) {
    var gclConfig = new GCLLib.GCLConfig();
    gclConfig.apiKey = "2cc27598-2af7-48af-a2df-c7352e5368ff"; //test apikey rate limited
    gclConfig.gclUrl = "https://localhost:10443/v1"; //override config for local dev
    gclConfig.ocvUrl = "https://accapim.t1t.be:443/trust1team/ocv-api/v1";
    //gclConfig.ocvUrl = "http://localhost:8080/ocv-api-web/v1";
    gclConfig.localTestMode=false;
    gclConfig.allowAutoUpdate = true;
    gclConfig.implicitDownload = false;

    if (gclConfig.localTestMode) {
        gclConfig.dsUrl = "http://localhost:8080";
    } else {
        gclConfig.dsUrl = "https://accapim.t1t.be:443";
        //gclConfig.dsUrl = "https://accapim.t1t.be:443";
        //gclConfig.dsUrl = "https://prodapim.t1t.be:443";
        //gclConfig.dsUrl = "https://t1c.t1t.be:443";

    }

    var connector = new GCLLib.GCLClient(gclConfig);

    connector.core().info().then(function(data) {
        $("#error").empty();
        $("#error").append(data.data.version);

        if (data && data.data.activated === true) {
            //check card readers upon refresh and provide the info
            var core = connector.core();
            core.readers().then(function(data) {
                if (data && data.data) {
                    data.data.forEach(function(reader) {
                        if (reader.card) {
                            $("#readerlist").append( '<li id="liid"><a href="#" ><h5><span' +
                                                     ' class="label label-success" >' + reader.id + '</span></h5></a></li>' );
                        } else {
                            $("#readerlist").append( '<li><a href="#"><h5><span class="label' +
                                                     ' label-warning">' + reader.id + '</span></h5></a></li>' );
                        }
                    })
                } else {
                    $("#readerlist").append( '<li> No readers connected </li>' );
                }
            }, function(err) {
                console.log(JSON.stringify(err));
            });
        }
    });

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
        core.info().then(handleSuccess, handleError);
    });
    $("#infoBrowser").on('click', function () {
        $("#information").empty();
        var core = connector.core();
        core.infoBrowser().then(handleSuccess, handleError);
    });
    $("#getReaders").on('click', function () {
        $("#information").empty();
        var core = connector.core();
        core.readers().then(handleSuccess, handleError);
    });
    $("#pollReaders").on('click', function () {
        $("#information").empty();
        var core = connector.core();
        core.pollReaders(15).then(handleSuccess, handleError);
    });
    $("#pollCard").on('click', function () {
        $("#information").empty();
        connector.core().pollCardInserted(20).then(handleSuccess, handleError);
    });
    $("#getReadersAvailable").on('click', function () {
        $("#information").empty();
        var core = connector.core();
        core.readersCardAvailable().then(handleSuccess, handleError);
    });
    $("#getReadersUnavailable").on('click', function () {
        $("#information").empty();
        var core = connector.core();
        core.readersCardsUnavailable().then(handleSuccess, handleError);
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
        connector.ds().getPubKey().then(handleSuccess, handleError);
    });
    $("#getPubKeyGCL").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        connector.core().getPubKey().then(handleSuccess, handleError);
    });
    $("#getJWT").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        connector.ds().getJWT().then(handleSuccess, handleError);
    });
    $("#getJWTRefresh").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        $("#validationError").empty();
        connector.ds().refreshJWT().then(handleSuccess, handleError);
    });
    $("#getPlugins").on('click', function () {
        $("#information").empty();
        var core = connector.core();
        core.plugins().then(handleSuccess, handleError);
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
        beid.allData(filter).then(handleSuccess, handleError);
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
        beid.allCerts(filter).then(handleSuccess, handleError);
    });
    $("#beidRn").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.rnData().then(handleSuccess, handleError);
    });
    $("#beidAddress").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.address().then(handleSuccess, handleError);
    });
    $("#beidPic").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.picture().then(handleSuccess, handleError);
    });
    $("#beidAllCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.allCerts([]).then(handleSuccess, handleError);
    });
    $("#beidRootCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.rootCertificate().then(handleSuccess, handleError);
    });
    $("#beidCitizenCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.citizenCertificate().then(handleSuccess, handleError);
    });
    $("#beidRRNCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.rrnCertificate().then(handleSuccess, handleError);
    });
    $("#beidAuthCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.authenticationCertificate().then(handleSuccess, handleError);
    });
    $("#beidNonRepCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.nonRepudiationCertificate().then(handleSuccess, handleError);
    });
    $("#beidVerifyPin").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        $("#validationInformation").empty();
        $("#validationInformation").hide();
        $("#validationError").empty();
        $("#validationError").hide();
        $("#pinModal").modal('toggle');
    });

    $("#buttonValidate").on('click', function () {
        var _body={};
        _body.pin = $("#psw").val();
        connector.beid($("#selected_reader").text()).verifyPin(_body).then(function(data) {
            universalHandler(data, "#validationInfo", "#validationError");
        }, function(err) {
            universalHandler(err, "#validationError", "#validationInfo");
        });
    });

    $("#beidSign").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        $("#signInformation").empty();
        $("#signInformation").hide();
        $("#signError").empty();
        $("#signError").hide();
        $("#signModal").modal('toggle');
    });

    $("#buttonSign").on('click', function () {
        var _body={};
        _body.pin = $("#signpsw").val();
        _body.algorithm_reference = "sha256";
        _body.data = "E1uHACbPvhLew0gGmBH83lvtKIAKxU2/RezfBOsT6Vs=";
        connector.beid($("#selected_reader").text()).signData(_body).then(function(data) {
            universalHandler(data, "#signInfo", "#signError");
        }, function(err) {
            universalHandler(err, "#signError", "#signInfo");
        });
    });

    $("#beidAuthenticate").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        $("#authInformation").empty();
        $("#authInformation").hide();
        $("#vauthError").empty();
        $("#vauthError").hide();
        $("#authModal").modal('toggle');
    });

    $("#buttonAuth").on('click', function () {
        var _body={};
        _body.data = "I2e+u/sgy7fYgh+DWA0p2jzXQ7E=";
        _body.algorithm_reference = "sha1";
        _body.pin = $("#authpsw").val();
        connector.beid($("#selected_reader").text()).authenticate(_body).then(function(data) {
            universalHandler(data, "#authInfo", "#authError");
        }, function(err) {
            universalHandler(err, "#authError", "#authInfo");
        });
    });

    //call to gcl in order to sign the server generated hash
    $("#ocvButtonAuth").on('click', function () {
        var _body={};
        _body.data = $("#ocvtempvalue").val();
        _body.algorithm_reference = "sha256";
        _body.pin = $("#ocvAuthpsw").val();
        connector.beid($("#selected_reader").text()).authenticate(_body).then(function(data) {
            universalHandler(data, "#ocvAuthInfo", "#ocvAuthError");

            var signature = data.data;
            // verify challenge against backend
            connector.beid($("#selected_reader").text()).authenticationCertificate().then(function(authCert) {
                var req = {
                    hash:              $("#ocvtempvalue").val(),
                    digestAlgorithm:   "SHA256",
                    base64Signature:   signature,
                    base64Certificate: authCert.data
                };
                connector.ocv().validateChallengeSignedHash(req).then(function(data) {
                    $("#ocvAuthInfo").append(JSON.stringify(data, null, '  '));
                }, function(err) {
                    $("#error").empty();
                    $("#error").append("ERROR:\n", JSON.stringify(err, null, '  '));
                });
            });
        }, function(err) {
            universalHandler(err, "#ocvAuthError", "#ocvAuthInfo")
        });
    });

    $("#downloadgcl").on('click',function() {
        var core = connector.core();
        var self = this;
        core.infoBrowser().then(function(infoBrowser) {
            connector.ds().downloadLink(infoBrowser.data).then(function(data) {
                console.log(data);
                $("#error").empty();
                $("#information").empty();
                $("#downloadModal").modal('toggle');
                $("a").remove('.downloadlinkref');
                $("#modalDownloadLink").append('<a class= "downloadlinkref" href="'+ data.url +'">Download link GCL</a>');
            }, function(err) {
                console.log(err);
                $("#error").append('Error retrieving download link');
            })
        }, function() {
            $("#error").append('Could not retrieve browser info');
        });
    });

    $("#clear").on('click', function () {
        $("#information").empty();
        $("#error").empty();

    });

    // SafeNet PKCS11 functionality
    $("#safenetCerts").on('click', function () {
        $("#information").empty();
        var safenet = connector.safenet();
        safenet.certificates(parseInt($("#safenetSlot").val())).then(handleSuccess, handleError);
    });
    $("#safenetInfo").on('click', function () {
        $("#information").empty();
        var safenet = connector.safenet();
        var body = {
            pin: $("#safenetPin").val()
        };
        safenet.info(body).then(handleSuccess, handleError);
    });
    $("#safenetSign").on('click', function () {
        $("#information").empty();
        var safenet = connector.safenet();
        var data = {
            slot_id: parseInt($("#safenetSlot").val()),
            cert_id: $("#safenetCertId").val(),
            data: $("#safenetData").val(),
            pin: $("#safenetPin").val(),
            algorithm_reference: $("#safenetAlgo").val()
        };
        safenet.signData(data).then(handleSuccess, handleError);
    });
    $("#safenetSlots").on('click', function () {
        $("#information").empty();
        var safenet = connector.safenet();
        safenet.slots().then(handleSuccess, handleError);
    });
    $("#safenetSlotsWithToken").on('click', function () {
        $("#information").empty();
        var safenet = connector.safenet();
        safenet.slotsWithTokenPresent().then(handleSuccess, handleError);
    });
    $("#safenetTokens").on('click', function () {
        $("#information").empty();
        var safenet = connector.safenet();
        safenet.tokens().then(handleSuccess, handleError);
    });

    $("#buttonValidateEMV").on('click', function () {
        var _body={};
        _body.pin = $("#pswEMV").val();
        connector.emv($("#selected_reader").text()).verifyPin(_body).then(function(data) {
            universalHandler(data, "#validationInfoEMV", "#validationErrorEMV");
        }, function(err) {
            universalHandler(err, "#validationErrorEMV", "#validationInfoEMV");
        });
    });

    $("#emvAllData").on('click', function () {
        $("#information").empty();
        var emv = connector.emv($("#selected_reader").text());
        var filter = [];
        if($("#emvPanCheck").is(":checked"))filter.push($("#emvPanCheck").val());
        emv.allData(filter).then(handleSuccess, handleError);
    });

    $("#ocvGetChallenge").on('click',function(){
        $("#information").empty();
        $("#error").empty();
        var ocv = connector.ocv();
        ocv.getChallenge('SHA256').then(handleSuccess, handleError);
    });

    $("#ocvGetInfo").on('click',function(){
        $("#information").empty();
        $("#error").empty();
        var ocv = connector.ocv();
        ocv.getInfo().then(handleSuccess, handleError);
    });

    $("#ocvValidateSignature").on('click',function(){
        $("#information").empty();
        $("#error").empty();
        if($("#selected_reader").text() === "No card reader selected"){
            console.log("Please select a card reader and provide a card");
            return $("#error").append("Please select a card reader and provide a card");
        }
        var beid = connector.beid($("#selected_reader").text());
        var conn = connector;
        beid.rnData().then(function(rnData) {
            beid.rrnCertificate().then(function(rrnCert) {
                var req = {
                    rawData: rnData.data.raw_data,
                    signature: rnData.data.signature,
                    certificate: rrnCert.data
                };
                conn.ocv().validateSignature(req).then(handleSuccess, handleError);
            });
        }, handleError);
    });

    $("#ocvBeIDAuthenticate").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        var ocv = connector.ocv();
        ocv.getChallenge('SHA256').then(function(data) {
            $("#ocvtempvalue").val(data.hash);
        }, function(err) {
            $("#error").empty();$("#error").append("ERROR:\n", JSON.stringify(err, null, '  '));
        });
        $("#authInformation").empty();
        $("#authInformation").hide();
        $("#vauthError").empty();
        $("#vauthError").hide();
        $("#ocvAuthModal").modal('toggle');
    });

    $("#ocvValidateCertChain").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        //create certificate filter
        var certFilter = [];
        certFilter.push("root-certificate");
        certFilter.push("authentication-certificate");
        certFilter.push("citizen-certificate");
        connector.beid($("#selected_reader").text()).allCerts(certFilter).then(function(certData) {
            handleSuccess(certData);
            var authCert = {
                order: 0,
                certificate: certData.data.authentication_certificate
            };
            var intermediateCert = {
                order: 1,
                certificate: certData.data.citizen_certificate
            };
            var rootCert = {
                order: 2,
                certificate: certData.data.root_certificate
            };
            var body = {
                certificateChain: [ authCert, intermediateCert, rootCert ]
            };
            connector.ocv().validateCertificateChain(body).then(handleSuccess, handleError);
        }, handleError);
    });

})(window.jQuery);
