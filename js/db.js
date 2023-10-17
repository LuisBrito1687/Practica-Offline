// Crea la base de datos
let req = window.indexedDB.open('pwadb', 1);

// Si se necesita actualizar la DB haremos lo siguiente
req.onupgradeneeded = (e) => {
    console.log("DB updated");
    let db = e.target.result;
    db.createObjectStore('user', {
        keyPath: 'id',
    });
};

req.onerror = (e) => {
    console.log('BD - Error -> ', e.target.error);
};

req.onsuccess = (e) => {
    let db = e.target.result;
    let transaction = db.transaction('users', 'readwrite');

    transaction.onerror = (e) => {
        console.log('TR - Error -> ', e.target.error);
    };
    
    transaction.oncomplete = (e) => {
        console.log('TR - Done -> ');
    };

    let stored = transaction.objectStrored('users');
    stored.add({
        id: new Date().toISOString(),
        username: 'Luis',
        fullname: 'Brito',
    });

    stored.onsuccess = (e) => {
        console.log('ST - Success -> ', 'Agregado correctamente');
    };
};