async function fetchFileNames() {
    const response = await fetch('/uploadedFiles');
    const names = await response.json();
    return names;
}

fetchFileNames().then(names => {
    const filesDiv = document.getElementById("files");
    while (filesDiv.firstChild) {
        filesDiv.removeChild(filesDiv.lastChild);
    }

    names.message.forEach(name => {
        let fileName = name;
        if (name.length > 35) {
            let nameParts = name.split(/\.(?=[^\.]+$)/)
            let fileNamePart = nameParts[0].substring(0, 30);
            fileName = `${fileNamePart}<gray>[...]</gray>.${nameParts[1]}`;
        }
        let html = `<div class="col" id="${fileName}"><a href="/downloadSingle/${fileName}"><div class="file"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16"><path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/></svg><br><span id="filename">${fileName}</span></div></a></div>`;
        filesDiv.insertAdjacentHTML("afterbegin", html);
    })
});

function changeSortingOldToNew() {
    const buttonDiv = document.getElementById("button-div");
    buttonDiv.replaceChildren();
    let html = `<button class="changeSorting btn btn-secondary" onclick="changeSortingNewToOld()">Sort new to old files</button>`;
    buttonDiv.insertAdjacentHTML("beforeend", html);

    fetchFileNames().then(names => {
        const filesDiv = document.getElementById("files");
        filesDiv.replaceChildren();

        names.message.forEach(name => {
            let fileName = name;
            if (name.length > 35) {
                let nameParts = name.split(/\.(?=[^\.]+$)/)
                let fileNamePart = nameParts[0].substring(0, 30);
                fileName = `${fileNamePart}<gray>[...]</gray>.${nameParts[1]}`;
            }
            let html = `<div class="col" id="${fileName}"><a href="/downloadSingle/${fileName}"><div class="file"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16"><path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/></svg><br><span id="filename">${fileName}</span></div></a></div>`;
            filesDiv.insertAdjacentHTML("beforeend", html);
        })
    });
}

function changeSortingNewToOld() {
    const buttonDiv = document.getElementById("button-div");
    buttonDiv.replaceChildren();
    let html = `<button class="changeSorting btn btn-secondary" onclick="changeSortingOldToNew()">Sort old to new files</button>`;
    buttonDiv.insertAdjacentHTML("beforeend", html);

    fetchFileNames().then(names => {
        const filesDiv = document.getElementById("files");
        filesDiv.replaceChildren();

        names.message.forEach(name => {
            let fileName = name;
            if (name.length > 35) {
                let nameParts = name.split(/\.(?=[^\.]+$)/)
                let fileNamePart = nameParts[0].substring(0, 30);
                fileName = `${fileNamePart}<gray>[...]</gray>.${nameParts[1]}`;
            }
            let html = `<div class="col" id="${fileName}"><a href="/downloadSingle/${fileName}"><div class="file"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" class="bi bi-file-earmark" viewBox="0 0 16 16"><path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/></svg><br><span id="filename">${fileName}</span></div></a></div>`;
            filesDiv.insertAdjacentHTML("afterbegin", html);
        })
    });
}