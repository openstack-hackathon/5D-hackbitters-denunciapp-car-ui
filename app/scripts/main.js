import * as config from './config.js'

function getComplaintDetail(e) {
  e.stopPropagation()
  let id = $(this).attr('data-id')
  $.get(`${config.API_BASE}complaint/${id}`, function(data) {
    console.log(data)
  })
  return false
}

$(function () {
  // Get the last complaints
  $.get(config.API_BASE + 'complaint', function(data) {
    let $listContainer = $('#list-complaints')

    $listContainer.find('#load-list-complaints').fadeOut(400, ()=> {
      // render last complaints
      data.forEach((complaint) => {
        let date = new Date(Date.parse(complaint.createTime)).toLocaleString()

        $listContainer.append(`<li href="" class="collection-item" >
        <div>Placa: ${complaint.plate}
        <a href="#" class="secondary-content" data-id="${complaint._id}">
        <i class="material-icons">visibility</i></a>
        </div>
        <div>Fecha: ${date}</div>
        </li>`)
      })

      // consult the detial of complaint
      let $itemsAction = $listContainer.find('.collection-item a')
      $itemsAction.click(getComplaintDetail)
    })

  }, 'json')
})
