app.service("NelaNaileditService", function ($http) {

    // 1. Fetch welcome notice from C# Controller
    this.getBackendWelcomeMsgFunc = function () {
        return $http.get("/NelaNailedit/GetBackendWelcomeMsg");
    };

    // 2. User Registration (Posts new user entity to C# / DB)
    this.registerUserFunc = function (userPayload) {
        return $http.post("/NelaNailedit/RegisterUser", userPayload);
    };

    // 3. User Login (Posts credentials & role to C# for validation/session)
    this.loginUserFunc = function (loginPayload) {
        return $http.post("/NelaNailedit/LoginUser", loginPayload);
    };

    // 4. Fetch User List / Active User (Retrieves records from DB)
    this.getUsersFunc = function () {
        return $http.get("/NelaNailedit/GetUsers");
    };

    // 5. Add Appointment / Update Loyalty Points in DB
    this.addAppointmentFunc = function (appointmentPayload) {
        return $http.post("/NelaNailedit/AddAppointment", appointmentPayload);
    };

});