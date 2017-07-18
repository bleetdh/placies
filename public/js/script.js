$(function () {
  const $placeSearch = $('#placeSearch')
  const apiurl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'
  const photoUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference='
  const keyword = ''
  const apiKey = '&key=AIzaSyCWSL8hBID-8YVZeCWt1MO_zFub8ngXoio'

  $placeSearch.on('submit', function (e) {
    e.preventDefault()
    var keywordObj = $(this).serializeArray()
    var $textChange = $('#textChange')
    // var $keyWord = $('input')
    // console.log($textChange.text())
    // console.log($keyWord.value)
    $textChange.text(keywordObj[0].value)
    console.log(keywordObj[0].value)
    var qString = `query=${keywordObj[0].value}`
    var finalUrl = `https://crossorigin.me/${apiurl}${qString}${apiKey}`

    var $placeList = $('.placeList')
    $placeList.empty()

    $.get(finalUrl).done(function (data) {
      var placesArr = data.results
      for (var i = 0; i < placesArr.length; i++) {
        var $newLi = $('<li>')
        var $newImg = $('<img>')
        var $newBr = $('<br>')
        var $newButton = $('<button>')
        var $new2Br = $('<br>')
        $newButton.text('Add')
        $newLi.append(placesArr[i].name)
        $placeList.append($newLi)
        $newLi.append($newBr)
        if (placesArr[i].photos) {
          var photoRef = placesArr[i].photos[0].photo_reference
          var photoFinalUrl = `${photoUrl}${photoRef}${apiKey}`

          $newImg.attr({
            src: photoFinalUrl
          })
          $newLi.append($newImg)
        }
        $newLi.append($new2Br)
        $newLi.append($newButton)
      }
    })
  })
  var $body = $('body')
  $(document).on({
    ajaxStart: function () { $body.addClass('loading') },
    ajaxStop: function () { $body.removeClass('loading') }
  })
})
