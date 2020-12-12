(function(){
    try {
        let currentUser = readData(APPCONFIG.sessionKey.activeUser);
        if(!currentUser){
            reDirect(APPCONFIG.views.login);
        }else{
            let userItems = getUserItems(currentUser);
            document.getElementById("#welcomeuser").innerHTML = 'Hey ' + currentUser;
            document.getElementById("#maxitems").innerHTML = `You can add ${APPCONFIG.dataKey.listPerUser - userItems.length} more items`
            displayItems(userItems);
        }
    } catch (error) {
        alert(error);
    }
})();


function removeUserItem(userItems, userItemIndex){
    return userItems.splice(userItemIndex,1);
}


function editItem(userItemIndex){
    let currentUser = readData(APPCONFIG.sessionKey.activeUser);
    let userItems = getUserItems(currentUser);
    alert('Apply edit on ---> ' + userItems[userItemIndex]);
}


function deleteItem(userItemIndex){
    let currentUser = readData(APPCONFIG.sessionKey.activeUser);
    let userItems = getUserItems(currentUser);
    removeUserItem(userItems,userItemIndex);
    saveUserItems(currentUser, ...userItems);
    reDirect(APPCONFIG.views.home);
}

function displayItems(userItems){
    try {
        const itemContainer = document.getElementById("#item-container");
        const itemList = document.createElement("h4");
        
        itemList.innerHTML="";

        if(userItems.length){
            for(userItem in userItems){
                itemList.innerHTML += '<div class="item-card">' + userItems[userItem] + `<button class="delete-btn" onclick=deleteItem('${userItem}')>Del</button>` + `<button class="delete-btn" onclick=editItem('${userItem}')>Edit</button>` + '<br> </div>' ;
            }
            itemContainer.appendChild(itemList)
        }else {
            itemList.innerHTML = APPCONFIG.errorMsgs.noItem;
            itemContainer.appendChild(itemList);
        }

    } catch (error) {
        alert(error)
    }
}


function getUserItems(username){
    try {
        let items = readData(APPCONFIG.dataKey.activeTable) || [];
        if(items.length){
            const item = items.find(
                (item) => item.username === username
            );
            return item.useritems
        }else{
            return []
        }


    } catch (error) {
        alert(error);
    }
}

function saveUserItems(username,...userItems){
    if(username && userItems){
        let items = readData(APPCONFIG.dataKey.activeTable) || [];
        let newItem = {"username": username, "useritems": userItems}

        if(items.length < APPCONFIG.sessionKey.totalUsers){
            for(var counter=0; counter < items.length; counter++){
                if(items[counter].username == username ) {
                    items.splice(counter,1);
                    break;
                }
            }
            items.push(newItem);        
            updateData(APPCONFIG.dataKey.activeTable,items);
            reDirect(APPCONFIG.views.home);
        }else{
        pushError(APPCONFIG.errorMsgs.addItemError)
    }
} else {
    pushError(APPCONFIG.errorMsgs.addItemError)
}

}


function checkExistingUserItem(username){
    const itemList = readData(APPCONFIG.dataKey.activeTable) || [];
    if(itemList.length > 0){
        const item = itemList.find(
            (item)=> item.username == username
        );
        return item? true: false;
    }else
    return false;
        
}

function addInputItem() {
    let inputItem = document.getElementById("#inputitem").value;

    if(!inputItem){
        pushError(APPCONFIG.errorMsgs.noData)
        return
    }

    let username = readData(APPCONFIG.sessionKey.activeUser);
    let isExistingUserItem = checkExistingUserItem(username);
    if(!isExistingUserItem){
        saveUserItems(username, inputItem);
    }else{
        let userItems = getUserItems(username);
        if(userItems.length < 5){
            userItems.push(inputItem);
            saveUserItems(username, ...userItems)
        }else{
            pushError(APPCONFIG.errorMsgs.maximumItems)
        }
    }

}