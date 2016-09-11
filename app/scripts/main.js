import * as config from './config.js'

// Show the complaint detail
function getComplaintDetail(e) {
  e.stopPropagation()
  let id = $(this).attr('data-id')
  $.get(`${config.API_BASE}complaint/${id}`, function(data) {
    console.log(data)
  })
  return false
}

// Make a complaint
function newComplaint() {
  let $this = $(this)
  if ($this.hasClass('disabled'))
    return false

  let plate = $('#plate').val().toUpperCase().trim()
  let regex = /^[A-Z0-9]{6,}$/

  if (plate == '') {
    Materialize.toast('<span>¡Ups! parece que no has indicado la placa de tu automóvil</span>', 4000);
    return false
  }

  if (plate.length < 6) {
    Materialize.toast('<span>La placa debe contener al menos 6 caracteres alfanuméricos</span>', 4000);
    return false
  }

  if (!regex.test(plate)) {
    Materialize.toast('<span>Solo se aceptan caracteres alfanuméricos</span>', 4000);
    return false
  }

  $this.addClass('disabled')

  $.ajax({
    url: `${config.API_BASE}complaint`,
    type: 'POST',
    data: JSON.stringify({ plate: plate }),
    contentType: 'application/json; charset=utf-8',
    dataType: 'json'
  })
    .success(function(data) {
      console.log(data)
      $this.removeClass('disabled')
      $('#complaint-register').openModal()
    })
    .fail(function(xhr, status, error) {
      console.log(xhr.responseText)
      $this.removeClass('disabled')
    })
}

$(function () {
  // Get the last complaints
  $.get(config.API_BASE + 'complaint', function(data) {
    let $listContainer = $('#list-complaints')

    $listContainer.find('#load-list-complaints').fadeOut(400, ()=> {
      // render last complaints
      data.forEach((complaint) => {
        let date = new Date(Date.parse(complaint.createTime)).toLocaleString()

        $listContainer.append(`<li href='' class='collection-item' >
        <div>Placa: ${complaint.plate}
        <a href='#' class='secondary-content' data-id='${complaint._id}'>
        <i class='material-icons'>visibility</i></a>
        </div>
        <div>Fecha: ${date}</div>
        </li>`)
      })

      // consult the detial of complaint
      let $itemsAction = $listContainer.find('.collection-item a')
      $itemsAction.click(getComplaintDetail)
    })
  }, 'json')

  // Initialize event click to send new complaint
  $('#new-complaint').click(newComplaint)
})
