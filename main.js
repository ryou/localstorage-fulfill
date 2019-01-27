const STORAGE_KEY = 'localstorage_fulfill';
let timerID = null;
const byte10 = '1234567890';

let byte100 = '';
while(byte100.length < 100) {
    byte100 += byte10;
}

let byte10k = '';
while(byte10k.length < 10000) {
    byte10k += byte10;
}

let byte100k = '';
while(byte100k.length < 100000) {
    byte100k += byte10;
}

const addData = (data, key) => {
    let currentData = localStorage.getItem(key);
    if (currentData === null) currentData = '';
    const newData = currentData + data;
    console.log('data length: ' + newData.length);
    localStorage.setItem(key, newData);
};

const massLoop = () => {
    try {
        addData(byte100k, STORAGE_KEY + '_100k');
    } catch(error) {
        if (error.name = 'QuotaExceededError') {
            clearInterval(timerID);
            timerID = setInterval(midLoop, 10);
        } else {
            throw error;
        }
    }
};

const midLoop = () => {
    try {
        addData(byte10k, STORAGE_KEY + '_10k');
    } catch(error) {
        if (error.name = 'QuotaExceededError') {
            clearInterval(timerID);
            timerID = setInterval(smallLoop, 10);
        } else {
            throw error;
        }
    }
};

const smallLoop = () => {
    try {
        addData(byte10, STORAGE_KEY + '_10');
    } catch(error) {
        if (error.name = 'QuotaExceededError') {
            console.log('fulfill complete');
            clearInterval(timerID);
        } else {
            throw error;
        }
    }
};

localStorage.clear();
timerID = setInterval(massLoop, 10);
