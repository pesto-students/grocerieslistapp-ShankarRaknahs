let loginId = document.getElementById("login");
let registerId = document.getElementById("register");
let btn = document.getElementById('btn');

function fetchRegister() {
    loginId.style.left = '-400px';
    registerId.style.left = '50px';
    btn.style.left = '110px';
}

function fetchLogin() {
    loginId.style.left = '50px';
    registerId.style.left = '500px';
    btn.style.left = '0px';
}

//TODO - add conditions to check for existing user, validate password and username

function createUser() {
    const UserElements = document.getElementById("register").elements;

    let storeageUserInfo = JSON.parse(localStorage.getItem('userInfo')) || [];

    if (storeageUserInfo.length < 5) {
        storeageUserInfo.push({
            "name": UserElements["userNameReg"].value,
            "password": UserElements["userPassReg"].value
        });

        localStorage.setItem('userInfo', JSON.stringify(storeageUserInfo));
        localStorage.setItem('currentUser', UserElements["userNameReg"].value);
        location.href = "file:///Users/shankar/Documents/Pesto/class/assignments/groceryapp/home.html";
    } else {
        alert('Cannot register more than 5 users as we are using Local storage');
    }
    return false;

}


function findUser(userInfoArray, username, password) {
    for (let counter = 0; counter < userInfoArray.length; counter++) {
        if (userInfoArray[counter].name == username && userInfoArray[counter].password == password) {
            return true;
        }
        return false;
    }
}

function authenticateUser() {
    const UserElements = document.getElementById("login").elements;

    let storeageUserInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!storeageUserInfo) {
        alert('User not found, please register the user');
    } else if (!findUser(storeageUserInfo, UserElements["userNameReg"].value, UserElements["userPassReg"].value)) {
        alert('Username or Password is incorrect');
    }
    else {
        localStorage.setItem('currentUser', UserElements["userNameReg"].value);
        location.href = "file:///Users/shankar/Documents/Pesto/class/assignments/groceryapp/home.html";
    }
    return false;
}

function logoutUser() {
    localStorage.removeItem('currentUser');
    location.href = "file:///Users/shankar/Documents/Pesto/class/assignments/groceryapp/index.html";

}

function updateGrocery() {
    let currentUser = localStorage.getItem('currentUser');
    const groceryItem = document.getElementById("groceries").elements;
    let storageGroceryInfo = JSON.parse(localStorage.getItem('groceryInfo')) || [];
    let isExistingUser = false;

    if (storageGroceryInfo) {

        for (let counter = 0; counter < storageGroceryInfo.length; counter++) {
            if (storageGroceryInfo[counter].name == currentUser) {

                if (storageGroceryInfo[counter].groceries.length < 3) {
                    storageGroceryInfo[counter].groceries.push(groceryItem["groceryName"].value);
                    isExistingUser = true;
                } else {
                    alert('Cannot add more than 3 items per user');
                    return false;
                }
                //                localStorage.setItem('groceryInfo', JSON.stringify(storeageUserInfo));
            }
        }
        if (!isExistingUser) {
            storageGroceryInfo.push({ "name": localStorage.getItem('currentUser'), "groceries": [groceryItem["groceryName"].value] });
        }

    } else {
        storageGroceryInfo.push({ "name": currentUser, "groceries": [groceryItem["groceryName"].value] });
    }
    localStorage.setItem('groceryInfo', JSON.stringify(storageGroceryInfo));
    initBase();
    return false;

}

function readGroceryList(storageGroceryInfo, currentUser) {

    if (storageGroceryInfo) {
        for (let counter = 0; counter < storageGroceryInfo.length; counter++) {
            if (storageGroceryInfo[counter].name == currentUser) {
                return storageGroceryInfo[counter].groceries
            }
        }
    }
    return [];
}



function initBase() {

    let currentUser = localStorage.getItem('currentUser');

    if (typeof (Storage) !== undefined && currentUser) {
        let currentUser = localStorage.getItem('currentUser');

        document.getElementById("usernameHome").innerHTML = 'Hey ' + currentUser;

        let storageGroceryInfo = JSON.parse(localStorage.getItem('groceryInfo'));
        let groceryList = readGroceryList(storageGroceryInfo, currentUser);
        
        const groceryContainer = document.getElementById("groceryContainer");
        const groceryItem = document.createElement('h1');
        groceryItem.classList.add('groceryItem');

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-btn');
        deleteButton.innerHTML= "x";


        for (let counter = 0; counter < groceryList.length; counter++) {
            groceryItem.appendChild(deleteButton);
            groceryItem.innerHTML +=  groceryList[counter] + "<br>";

        }
        groceryContainer.appendChild(groceryItem);                

    }
}

initBase();


