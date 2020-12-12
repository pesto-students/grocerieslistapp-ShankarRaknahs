
function getLoginView(isNewUser) {    
    let loginId = document.getElementById("login");
    let registerId = document.getElementById("register");
    let btn = document.getElementById('btn');

    if(isNewUser){
        loginId.style.left = '-600px';
        registerId.style.left = '-100px';
        btn.style.left = '110px';
    }
    else 
    {
    loginId.style.left = '-100px';
    registerId.style.left = '600px';
    btn.style.left = '0px';
    }
}


function loginUser(){
    const formElements = document.getElementById("login").elements;
    const username  = formElements["username"].value;
    const password  = formElements["password"].value;
    
    if(isExistingUser(username)){        
        if(authenticateUser(username, password)){
            updateData(APPCONFIG.sessionKey.activeUser, username);
            reDirect(APPCONFIG.views.home);
        } else {
            pushError(APPCONFIG.errorMsgs.authError)
        }

    }else {
        pushError(APPCONFIG.errorMsgs.unknownUser);
    }

    return false;
}

function registerUser(){
    const formElements = document.getElementById("register").elements;
    const username  = formElements["username"].value;
    const password  = formElements["password"].value;
    if(isExistingUser(username)){
        pushError(APPCONFIG.errorMsgs.usernameNotAvailable);
    }else {
        addUser(username,password);
        updateData(APPCONFIG.sessionKey.activeUser, username);
        reDirect(APPCONFIG.views.home);
    }
    return false;
}


// User function utilities

function authenticateUser(username, password) {
    const users = readData(APPCONFIG.sessionKey.allUsers) || [];
    const user = users.find(
        (user) => user.username === username && user.password === password
    )
    return user ? true : false;
}

function pushError(error){
    alert(error);
}

function isExistingUser(username){
    const users = readData(APPCONFIG.sessionKey.allUsers) || [];
    const user = users.find(
        (user) => user.username === username
    );
    return user ? true : false;
}


function addUser(username, passoword){
    if(username && passoword){
            let users = readData(APPCONFIG.sessionKey.allUsers) || [];
            let newUser = {"username": username, "password": passoword}
            if(users.length < APPCONFIG.sessionKey.totalUsers){
                users.push(newUser);
            }else{
                users.splice(0,1);
                users.push(newUser);
            }
            updateData(APPCONFIG.sessionKey.allUsers, users);
    } else {
        pushError(APPCONFIG.errorMsgs.userInfoError);
    }
}


function reDirect(newPage) {
    window.location.replace(newPage);
}

function logoutUser(){
    deleteData(APPCONFIG.sessionKey.activeUser);
    reDirect(APPCONFIG.views.login);
}