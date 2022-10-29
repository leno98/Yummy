let signName = $("#name")
let signEmail = $("#email")
let signPhoneNo = $("#phone-num")
let signAge = $("#age")
let signPass = $("#pass")
let signRePass = $("#rePass")
let name_valid
let age_valid
let mail_valid
let phone_valid
let password_valid1
let password_valid2

// V A L I D A T I O N    F O R   N A M E
signName.keyup(function (e) {
    var regex = /^[A-Za-z]{4,12}$/
    let valid = regex.test(e.target.value)
    if (valid | e.target.value === "") {
        // console.log("true")
        $("#name-alert").css("display", "none")
        name_valid = true

    }
    else {
        // console.log("wrong")
        $("#name-alert").css("display", "flex")
    }
})

// V A L I D A T I O N    F O R   E M A I L
signEmail.keyup(function (e) {
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let valid = regex.test(e.target.value)
    if (valid | e.target.value === "") {
        $("#email-alert").css("display", "none")
        mail_valid = true
    }
    else {
        $("#email-alert").css("display", "flex")

    }
})



// V A L I D A T I O N    F O R   P H O N E
signPhoneNo.keyup(function (e) {
    var regex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
    let valid = regex.test(e.target.value)
    if (valid | e.target.value === "") {
        // console.log("true")
        $("#phone-alert").css("display", "none")
        phone_valid = true

    }
    else {
        $("#phone-alert").css("display", "flex")
    }
})
// V A L I D A T I O N    F O R   A G E
signAge.keyup(function (e) {
    var regex = /^[1-9][0-9]?$|^100$/
    let valid = regex.test(e.target.value)
    if (valid | e.target.value === "") {
        $("#age-alert").css("display", "none")
        age_valid = true

    }
    else {
        $("#age-alert").css("display", "flex")
    }
})


// V A L I D A T I O N    F O R   P A S S W O R D
$('#pass,#rePass').keyup(function (e) {
    var regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    let valid = regex.test(e.target.value)
    if (valid | e.target.value === "") {
        // console.log("true")
        $("#pass-alert").css("display", "none")
        password_valid1 = true
    }
    else {
        // console.log("wrong")
        $("#pass-alert").css("display", "flex")
    }

    passwordValidation()
})


function passwordValidation() {
    pass1 = $('#pass').val()
    pass2 = $('#rePass').val()
    // console.log(pass1)
    // console.log(pass2)

    if (pass1 != pass2 && pass1 != "" && pass2 != "") {
        // console.log("false1")
        $("#repass-alert").css("display", "flex")
        $("#pass-alert").css("display", "none")

    }
    else {
        // console.log(true)
        if (name_valid === true && mail_valid === true && phone_valid === true && age_valid === true && pass1 === pass2) {
            console.log("yes")
            $("#submitBtn").prop("disabled", false)

        } else {
            console.log("no")

        }
        $("#repass-alert").css("display", "none")
    }

}


