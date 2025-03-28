const prefix = '/assets/svg/';
const suffix = '.svg'

export const loadSvgToUrl = async (name) => {
    const path = prefix + name + suffix;

    try{
        const svg = await getSvgFromIndexedDB(name);
        return svg;
    }
    catch {
        return await saveSvgToIndexedDB(path, name);    
    }
};

const saveSvgToIndexedDB = async (url, key) => {
    const response = await fetch(url);
    const blob = await response.blob();

    const request = indexedDB.open('svg-cache-db', 2);

    request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains('images')) {
            db.createObjectStore('images', { keyPath: 'key' });
        }
    };

    const db = await new Promise((resolve, reject) => {
        request.onsuccess = (event) => resolve(event.target.result);
        request.onerror = (event) => reject('Erro ao abrir o banco de dados');
    });

    const tx = db.transaction('images', 'readwrite');
    const store = tx.objectStore('images');

    store.put({ key, blob });

    await new Promise((resolve, reject) => {
        tx.oncomplete = resolve;
        tx.onerror = (event) => reject('Erro ao salvar a imagem no banco');
    });

    return URL.createObjectURL(blob);
};

const getSvgFromIndexedDB = (key) => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('svg-cache-db', 2);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('images')) {
                db.createObjectStore('images', { keyPath: 'key' });
            }
        };

        request.onsuccess = () => {
            const db = request.result;
            const tx = db.transaction('images', 'readonly');
            const store = tx.objectStore('images');

            const storeRequest = store.get(key);

            storeRequest.onsuccess = () => {
                if (storeRequest.result) {
                    resolve(URL.createObjectURL(storeRequest.result.blob));
                } else {
                    reject(false);
                }
            };

            storeRequest.onerror = (error) => {
                reject('Erro ao recuperar a imagem: ' + error);
            };
        };

        request.onerror = (error) => {
            reject('Erro ao abrir o banco de dados: ' + error);
        };
    });
};