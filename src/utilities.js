

function hasNullEmptyValue(obj) {
    // Check if obj is an object or array
    if (typeof obj === 'object' && obj !== null) {
        // If obj is an array
        if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                // Recursively check each element in the array
                if (hasNullEmptyValue(obj[i])) {
                    return true;
                }
            }
        } else {
            // If obj is an object
            for (let key in obj) {
                // Recursively check each property in the object
                if (hasNullEmptyValue(obj[key])) {
                    return true;
                }
            }
        }
    } else {
        // If obj is not an object or array, check for null or empty string
        return obj === null || obj === "";
    }

    return false; // No null or empty value found
}


function optimizeImageQuality(imageDataURI, quality) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            // const quality = 0.7; 
            const optimizedImageDataURI = canvas.toDataURL('image/jpeg', quality);
            resolve(optimizedImageDataURI);
        };
        img.onerror = (err) => {
            reject(err);
        };
        img.src = imageDataURI;
    });
}

function file64(path) {
    return new Promise((yes, no) => {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(path)
            reader.onload = () => {
                yes(reader.result)
            }
        } catch (err) {
            no(err)
        }
    })
}


function openFiles() {
    return new Promise((res, rej) => {
        try {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/png, image/jpeg, image/jpg');
            // input.setAttribute('multiple', true);
            // document.appendChild(input)
            // console.log(input);
            input.click();
            input.addEventListener('change', e => {
                console.log(e.target.files);
                res(e.target.files)
            })
        } catch (err) {
            console.log(err);
            rej(500)
        }
    })
}

function getCurrentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}`;
}
function removeEmptyStringProperties(obj) {
    const result = {};

    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] !== "") {
            result[key] = obj[key];
        }
    }

    return result;
}

function getItemFromCollectionById(collections, collectionId, itemId) {
    var selectedCollection = collections.filter(coll => {
        return coll.record.id == collectionId
    })

    console.log(selectedCollection);

    return selectedCollection.items.filter(item => {
        return item.id == itemId
    })
}

export default {
    getItemFromCollectionById,
    hasNullEmptyValue,
    openFiles,
    optimizeImageQuality,
    file64,
    getCurrentDate,
    removeEmptyStringProperties
}