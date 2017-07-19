$(function () {
  const $placeSearch = $('#placeSearch')
  const apiurl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'
  const photoUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='
  const keyword = ''
  const apiKey = '&key=AIzaSyAac5L-P1iKuBTPtHBmsv_awlqI8U8iuLs'
  const $addBttn = $('.addBttn')
  var $placeList = $('.placeList')

  var $body = $('body')
  $(document).on({
    ajaxStart: function () { $body.addClass('loading') },
    ajaxStop: function () { $body.removeClass('loading') }
  })

  $placeList.on('click', '.addBttn', function (e) {
    e.preventDefault()

    const theBttn = $(this)

    var newPlace = {
      name: theBttn.data('name'),
      address: theBttn.data('address'),
      reference: theBttn.data('reference')
    }
    // send the ajax to our own server
    // $.post(url, object)
    $.post('/places', newPlace).done(function (data) {
      if(data.status === 200) {
        alert('Hurray! ' + data.message)
      }
    })
  })

  $placeSearch.on('submit', function (e) {
    e.preventDefault()
    var keywordObj = $(this).serializeArray()
    var $textChange = $('#textChange')
    $textChange.text(`Results for ${keywordObj[0].value}`)
    var qString = `query=${keywordObj[0].value}`
    var finalUrl = `https://crossorigin.me/${apiurl}${qString}${apiKey}`
    ajaxTextSearch(finalUrl)
  })
  function ajaxTextSearch (finalUrl, keyword) {
    $placeList.empty()

    $.get(finalUrl).done(function (data) {
      var placesArr = data.results

      for (var i = 0; i < placesArr.length; i++) {
        var $newLi = $('<li>')
        var $h2 = $('<h2>')
        $h2.text(placesArr[i].name)
        var $newBr = $('<br>')
        var $addBttn = $(`<button
          class='addBttn'
          data-name="${placesArr[i].name}"
          data-address="${placesArr[i].formatted_address}"
          data-reference="${placesArr[i].photos[0].photo_reference}">add</button>`)
        var $newP = $('<p>')
        $newP.text(placesArr[i].formatted_address)
        $newLi.append($h2, $newP)
        var $newImg = $('<img>')
        if (placesArr[i].photos) {
          var photoRef = placesArr[i].photos[0].photo_reference
          var photoFinalUrl = `${photoUrl}${photoRef}${apiKey}`

          $newImg.attr({
            src: photoFinalUrl
          })
          $newLi.append($newImg)
        }
        $newLi.append($newBr, $addBttn)
        $placeList.append($newLi)
      }
    })
  }
})
