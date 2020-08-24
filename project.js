const form = document.getElementById("film-form");
const titleElement = document.getElementById("title");
const directorElement = document.getElementById("director");
const urlElement = document.getElementById("url");
const cardBody=document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");



// UI objesini başlatma 

const ui= new UI();

// storage objesi üretme

const storage = new Storage();

// Tüm eventleri yükleme

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function(){
        let films=storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    })
    // form.addEventListener("click",deleteFilm);

    cardBody.addEventListener("click",deleteFilm);
    clear.addEventListener("click",clearAllFilms);
}
    
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title===""|| director===""|| url===""){
        // hata
        ui.displayMessages("Lütfen tüm alanları doldurunuz !","danger");
    }

    else {
        // Yeni Film
        const newFilm = new Film(title,director,url);

        ui.addFilmToUI(newFilm); // arayüze film ekleme.
        storage.addFilmToStorage(newFilm); // storage'a film ekleme ... 
        ui.displayMessages("Film Başarıyla Eklendi..","success")
    }

    ui.clearInputs(titleElement,urlElement,directorElement);


    e.preventDefault();
}

function deleteFilm(e){
    
    if (e.target.id==="delete-film"){
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        
        ui.displayMessages("Silme işlemi başarıyla gerçekleşti...","warning")
    }

}


function clearAllFilms(){
    if (confirm("Bütün Filmleri Silmek İstediğinize Emin Misiniz ?")){

    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
    ui.displayMessages("Tüm Filmler Başarıyla Silindi...","primary");
    }

    
}