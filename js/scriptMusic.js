var recup = document.getElementById('music')
recup.addEventListener('click', function() { music() })


function music() {
    $('#musicApi').addClass('visibl')
        // On masque la page de la bière
    document.getElementById('bieronomy').style.display = 'none'
    document.getElementById('musicApi').style.display = 'inherit'
        // On chercher les données pour les afficher
    fetch('http://jihane.fr/dwmg2/api/music/liste.php')
        .then(
            function(response) {
                return response.json()
            }
        )
        .then(
            function(data) {
                for (let i = 0; i < data.length; i++) {
                    var tr = document.createElement('tr')
                    var p = document.querySelector('#father tbody')
                    p.appendChild(tr)

                    var td1 = document.createElement('td')
                    td1.innerHTML = data[i].id
                    tr.appendChild(td1)

                    var td2 = document.createElement('td')
                    td2.innerHTML = data[i].Artistes
                    tr.appendChild(td2)

                    var td3 = document.createElement('td')
                    td3.innerHTML = data[i].Titres
                    tr.appendChild(td3)

                    var td4 = document.createElement('td')
                    td4.innerHTML = '<button type="button" class="btn btn-info">Voir</button>'
                    td4.addEventListener('click', function() { dex(data[i].id) })
                    tr.appendChild(td4)
                }
            }
        )
        .catch(
            function(error) {
                alert("Erreur :" + error)
            }
        )
}

// On va afficher le détail pour chaque musique
function dex(id) {
    fetch('http://jihane.fr/dwmg2/api/music/read.php?id= +id')
        .then(
            function(response) {
                return response.json()
            }
        )
        .then(
            function(data) {
                var parent = document.getElementById("modalMusic")
                parent.nodeValue = " "

                var idMu = document.createElement("idMu")
                idMu.value = data.id
                parent.appendChild(idMu)

                var artist = document.createElement("artist")
                artist.nodeValue = data.Artistes
                parent.appendChild(artist)

                var title = document.createElement("titre")
                title.nodeValue = data.Titres
                parent.appendChild(title)

                var genre = document.createElement("genre")
                genre.nodeValue = data.Genres
                parent.appendChild(genre)

                var time = document.createElement("time")
                time.nodeValue = data.Temps
                parent.appendChild(time)

                var date = document.createElement("date")
                date.nodeValue = data.Dates
                parent.appendChild(date)
            }
        )
}

// on ajoute
function append() {
    fetch('jihane.fr/dwmg2/api/music/create.php')
        .then
}