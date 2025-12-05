function generate_password(min_length, max_length, include_uppercase, include_special) {

    let result = "";
    let characters = "abcdefghijklmnopqrstuvwxyz0123456789";

    if (include_uppercase) {
        characters += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (include_special) {
        characters += "!@#$%^&*()-_=+[]{};:\",.<>/?\\|`~";
    }

    const charactersLength = characters.length;

    const length = Math.floor(Math.random() * (max_length - min_length + 1)) + min_length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

function generate() {
    const min = parseInt(document.getElementById("minLen").value);
    const max = parseInt(document.getElementById("maxLen").value);
    const uppercase = document.getElementById("upper").checked;
    const special = document.getElementById("special").checked;

    const password = generate_password(min, max, uppercase, special);

    alert(password);
}