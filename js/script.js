// La page d'acceuil
$('#home').on('click', function() {
    // On masque la page de la musique
    document.getElementById('musicApi').style.display = 'none'
        // On masque la page de la bière
    document.getElementById('bieronomy').style.display = 'none'
})

//  On appel la page biere
$('#beer').on('click', function() {
    // appel de la fonction
    biere()
        // On masque la page de la musique
    document.getElementById('musicApi').style.display = 'none'
    document.getElementById('bieronomy').style.display = 'inherit'
})

// fonction de récupération des bières
function biere() {
    $('#bieronomy').addClass('visibl')
    $.get({
        url: "http://jihane.fr/dwmg2/api/biere/bieres.php",
        success: function(data) {
            $('#parent tbody').empty()
            for (let i = 0; i < data.length; i++) {
                $('#parent tbody').prepend('<tr><td>' + data[i].id + '</td><td>' + data[i].nom + '</td><td>' + '<button id="boutonbiere" type="button" class="btn btn-info" onclick="envoyer(' + data[i].id + ') ">voir</buton>' + '</td></tr>')
            }
            // var bier = $(data.id)
            // console.log(data[0])
        },
        dataType: "json"
    })
}


// fonctions de récupération du détail
function envoyer(id) {
    $('#exampleModal').modal('show')
    $.get({
        url: "http://jihane.fr/dwmg2/api/biere/unebiere.php",
        data: {
            id: id
        },
        success: function(data) {
            $('#idHidden').val(data.id)
            $('#named').val(data.nom)
            $('#degre').val(data.degres)
            $('#price').val(data.prix)
            $('#color').val(data.couleur)
            $('#amertume').val(data.amertume)
            $('#state').val(data.pays)
        },
        dataType: "json"
    })
}

// clic d'envoi de nouvelles données
$('#append').on('click', function() {
    $.post({
        url: "http://jihane.fr/dwmg2/api/biere/newbeer.php",
        data: {
            nom: $('#named').val(),
            degres: $('#degre').val(),
            prix: $('#price').val(),
            couleur: $('#color').val(),
            amertume: $('#amertume').val(),
            pays: $('#state').val()
        },
        success: function(data) {
            biere()
        }
    })
    $('#exampleModal').modal('hide')
})

// clic de modification des données
$('#update').on('click', function() {
    $.get({
        url: "http://jihane.fr/dwmg2/api/biere/update.php",
        data: {
            id: $('#idHidden').val(),
            nom: $('#named').val(),
            degres: $('#degre').val(),
            prix: $('#price').val(),
            couleur: $('#color').val(),
            amertume: $('#amertume').val(),
            pays: $('#state').val()
        },
        success: function(data) {
            biere()
        }
    })
    $('#exampleModal').modal('hide')
})

// clic de suppression des données
$('#remove').on('click', function() {
    $.get({
        url: "http://jihane.fr/dwmg2/api/biere/deletebiere.php",
        data: {
            id: $('#idHidden').val(),
            nom: $('#named').val(),
            degres: $('#degre').val(),
            prix: $('#price').val(),
            couleur: $('#color').val(),
            amertume: $('#amertume').val(),
            pays: $('#state').val()
        },
        success: function(data) {
            biere()
        }
    })
    $('#exampleModal').modal('hide')
})