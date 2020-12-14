

//As per the requirement Data is retrieved from the local storage


function createData(key, value){
    try {
        localStorage.setItem(key,JSON.stringify(value))
    } catch (error) {
        alert(error);
    }
}

function readData(key) {
    try {
        let value = localStorage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    } catch (error) {
        alert(error);
    }
}

function updateData(key, value){
    try{
        localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(value));
    } 
    catch(error){
        alert(error);
    }
}

function deleteData(key){
    try {
        localStorage.removeItem(key);
    } catch (error) {
        alert(error);
    }
}


