app.controller("NelaNaileditController", function ($scope, NelaNaileditService) {

    // Core Data Arrays & State Variables
    $scope.userarray = [
        {
            FName: "Janela",
            MName: "Rep",
            LName: "Chavez",
            Username: "janelachavez",
            Email: "janela@example.com",
            Contact: "09171234567",
            BirthDate: "2005-09-23",
            Points: 10,
            TotalSpent: 5200,
            VisitCount: 6,
            IsVip: true,
            VipId: "VIP-1001",
            Role: "client"
        }
    ];

    // Form containers for binding safely
    $scope.formData = {};
    $scope.loginData = {
        role: "client"
    };

    $scope.activeUser = $scope.userarray[0];

    // Page Load Notice
    $scope.initFunc = function () {
        var getData = NelaNaileditService.getBackendWelcomeMsgFunc();
        getData.then(function (returnedData) {
            Swal.fire({
                title: "NelaNailedit VIP",
                text: returnedData.data,
                icon: "info"
            });
        });
    };

    // Role Switcher
    $scope.setLoginRole = function (role) {
        $scope.loginData.role = role;
    };

    // User Registration
    $scope.RegisterName = function () {
        var form = $scope.formData || {};

        var fName = form.txtFirstname || $scope.txtFirstname;
        var mName = form.txtMiddlename || $scope.txtMiddlename;
        var lName = form.txtLastname || $scope.txtLastname;
        var uName = form.txtUsername || $scope.txtUsername;
        var contact = form.txtContact || $scope.txtContact;
        var email = form.txtEmail || $scope.txtEmail;
        var bDate = form.txtBirthDate || $scope.txtBirthDate;

        // 1. Validation check
        if (!fName || !lName || !uName || !email || !contact || !bDate) {
            Swal.fire({
                title: "Validation Error",
                text: "All required registration fields must be provided.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        // Payload matching DB entity structure
        var userPayload = {
            FName: String(fName).trim(),
            MName: mName ? String(mName).trim() : "N/A",
            LName: String(lName).trim(),
            Username: String(uName).trim(),
            Email: String(email).trim(),
            Contact: String(contact).trim(),
            BirthDate: String(bDate).trim(),
            Points: 10,
            TotalSpent: 0,
            VisitCount: 0,
            IsVip: false,
            VipId: "MEMBER",
            Role: "client"
        };

        /* ============================================================
           FUTURE DATABASE INTEGRATION:
           NelaNaileditService.registerUserFunc(userPayload).then(function(response) { ... });
           ============================================================ */

        // Temporary Client-side Validation & Persistence
        var isUsernameTaken = ($scope.userarray || []).some(function (user) {
            return user.Username && user.Username.toLowerCase() === userPayload.Username.toLowerCase();
        });

        if (isUsernameTaken) {
            Swal.fire({
                title: "Username Unavailable",
                text: "The username '" + userPayload.Username + "' is already taken.",
                icon: "warning"
            });
            return;
        }

        $scope.userarray.push(userPayload);

        Swal.fire({
            title: "Registration Successful",
            text: "Welcome, " + userPayload.FName + "! Your account has been created.",
            icon: "success",
            confirmButtonText: "OK"
        }).then(function () {
            $scope.ClearRegistrationFunc();
            window.location.href = "/NelaNailedit/Login";
        });
    };

    // Clear Form Inputs
    $scope.ClearRegistrationFunc = function () {
        $scope.formData = {};
        $scope.txtFirstname = "";
        $scope.txtMiddlename = "";
        $scope.txtLastname = "";
        $scope.txtUsername = "";
        $scope.txtEmail = "";
        $scope.txtContact = "";
        $scope.txtBirthDate = "";

        if ($scope.loyaltyForm) {
            $scope.loyaltyForm.$setPristine();
            $scope.loyaltyForm.$setUntouched();
        }
    };

    // Login Functionality
    $scope.LoginFunc = function () {
        var login = $scope.loginData || {};
        var uName = login.username || $scope.txtLoginUsername;
        var pWord = login.password || $scope.txtLoginPassword;
        var role = login.role || "client";

        if (!uName || !pWord) {
            Swal.fire({
                title: "Validation Error",
                text: "Please input both username and password.",
                icon: "error"
            });
            return;
        }

        var loginPayload = {
            Username: String(uName).trim(),
            Password: String(pWord).trim(),
            Role: role
        };

        /* ============================================================
           FUTURE DATABASE INTEGRATION:
           NelaNaileditService.loginUserFunc(loginPayload).then(function(response) { ... });
           ============================================================ */

        if (role === "admin") {
            // Admin authentication check
            if (loginPayload.Username.toLowerCase() === "admin" && loginPayload.Password === "admin123") {
                Swal.fire({
                    title: "Admin Access Granted",
                    text: "Redirecting to Admin Dashboard...",
                    icon: "success"
                }).then(function () {
                    window.location.href = "/NelaNailedit/AdminDashboard";
                });
            } else {
                Swal.fire({
                    title: "Access Denied",
                    text: "Invalid Admin Credentials.",
                    icon: "error"
                });
            }
        } else {
            // Client authentication check
            var foundUser = $scope.userarray.find(function (user) {
                return user.Username && user.Username.toLowerCase() === loginPayload.Username.toLowerCase();
            });

            if (foundUser) {
                $scope.activeUser = foundUser;
                Swal.fire({
                    title: "Welcome Back, " + foundUser.FName + "!",
                    text: "Redirecting to Client Dashboard...",
                    icon: "success"
                }).then(function () {
                    window.location.href = "/NelaNailedit/ClientDashboard";
                });
            } else {
                Swal.fire({
                    title: "Login Failed",
                    text: "Invalid username or password.",
                    icon: "error"
                });
            }
        }
    };

    // Navigation Redirection Handlers
    $scope.redirectHomeFunc = function () { window.location.href = "/NelaNailedit/Index"; };
    $scope.redirectAdminFunc = function () { window.location.href = "/NelaNailedit/AdminDashboard"; };
    $scope.redirectRegistrationFunc = function () { window.location.href = "/NelaNailedit/Registration"; };
    $scope.redirectLoginFunc = function () { window.location.href = "/NelaNailedit/Login"; };
    $scope.redirectAboutFunc = function () { window.location.href = "/NelaNailedit/About"; };
    $scope.redirectContactFunc = function () { window.location.href = "/NelaNailedit/Contact"; };
});