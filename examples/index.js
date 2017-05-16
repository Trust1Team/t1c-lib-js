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
                }else $("#readerlist").append( '<li> No readers connected </li>' );
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
        beid.allData(filter,callback);
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
        beid.allCerts(filter,callback);
    });
    $("#beidRn").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.rnData(callback);
    });
    $("#beidAddress").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.address(callback);
    });
    $("#beidPic").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.picture(callback);
    });
    $("#beidAllCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.allCerts([],callback);
    });
    $("#beidRootCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.rootCertificate(callback);
    });
    $("#beidCitizenCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.citizenCertificate(callback);
    });
    $("#beidRRNCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.rrnCertificate(callback);
    });
    $("#beidAuthCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.authenticationCertificate(callback);
    });
    $("#beidNonRepCert").on('click', function () {
        $("#information").empty();
        var beid = connector.beid($("#selected_reader").text());
        beid.nonRepudiationCertificate(callback);
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
        connector.beid($("#selected_reader").text()).verifyPin(_body, validationCallback);
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
        connector.beid($("#selected_reader").text()).signData(_body, signCallback);
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
        connector.beid($("#selected_reader").text()).authenticate(_body, authCallback);
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

    // EMV functionality
    $("#emvPan").on('click', function () {
        $("#information").empty();
        var emv = connector.emv($("#selected_reader").text());
        emv.pan(callback);
    });
    $("#emvVerifyPin").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        $("#validationInformation").empty();
        $("#validationInformation").hide();
        $("#validationError").empty();
        $("#validationError").hide();
        $("#pinModalEMV").modal('toggle');
    });

    $("#buttonValidateEMV").on('click', function () {
        var _body={};
        _body.pin = $("#pswEMV").val();
        connector.emv($("#selected_reader").text()).verifyPin(_body, validationCallbackEMV);
    });

    $("#emvAllData").on('click', function () {
        $("#information").empty();
        var emv = connector.emv($("#selected_reader").text());
        var filter = [];
        if($("#emvPanCheck").is(":checked"))filter.push($("#emvPanCheck").val());
        emv.allData(filter,callback);
    });

    $("#ocvGetChallenge").on('click',function(){
        $("#information").empty();
        $("#error").empty();
        var ocv = connector.ocv();
        ocv.getChallenge('SHA256',callback);
    });

    $("#ocvGetInfo").on('click',function(){
        $("#information").empty();
        $("#error").empty();
        var ocv = connector.ocv();
        ocv.getInfo(callback);
    });

    $("#ocvValidateSignature").on('click',function(){
        $("#information").empty();
        $("#error").empty();
        if($("#selected_reader").text()=="No card reader selected"){
            console.log("Please select a card reader and provide a card");
            return $("#error").append("Please select a card reader and provide a card");
        }
        var beid = connector.beid($("#selected_reader").text());
        var conn = connector;
        beid.rnData(function(err,rndata){
            if(err) return callback(err,rndata);
            var beid_conn = beid;
            var connector = conn;
            //get RRN certificate
            beid_conn.rrnCertificate(function(err,rrncertdata){
                var req = {};
                req.rawData = rndata.data.raw_data;
                req.signedData = rndata.data.signature;
                req.signingCert = rrncertdata.data;
                var ocv = connector.ocv();
                ocv.validateSignature(req,function(err,ocvResponse){
                    callback(err,ocvResponse);
                });
            });
        });
    });

    $("#ocvBeIDAuthenticate").on('click', function () {
        $("#information").empty();
        $("#error").empty();
        var ocv = connector.ocv();
        ocv.getChallenge('SHA256',function(err,data){
            if(err){$("#error").empty();$("#error").append("ERROR:\n", JSON.stringify(err, null, '  '));}
            else {
                $("#ocvtempvalue").val(data.hash);
            }
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
        connector.beid($("#selected_reader").text()).allCerts(certFilter,function(err,certdata){
            //print output
            callback(err,certdata);
            var authCert = {};
            authCert.order=0;
            authCert.certificate = certdata.data.authentication_certificate;
            var intermediateCert = {};
            intermediateCert.order=1;
            intermediateCert.certificate = certdata.data.citizen_certificate;
            var rootCert = {};
            rootCert.order=2;
            rootCert.certificate = certdata.data.root_certificate;
            var _body = {};
            var certificates = [];
            certificates.push(authCert);
            certificates.push(intermediateCert);
            certificates.push(rootCert);
            _body.certificateChain = certificates;
            connector.ocv().validateCertificateChain(_body,callback);
        });
    });

})(window.jQuery);
