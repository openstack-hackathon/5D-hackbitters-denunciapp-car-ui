import * as config from './config.js'

$(function () {
  $.get(config.API_BASE + 'complaint', function( data ) {
    let $listContainer = $('#list-complaints')

    data.forEach((complaint) => {
      console.log(complaint)
      let date = new Date(Date.parse(complaint.createTime)).toLocaleString()

      // append last complaints
      $listContainer.append(`<a href="" class="collection-item" data-id="${complaint._id}">
        <div>Placa: ${complaint.plate}
          <span class="new badge blue" data-badge-caption="snapshots">${complaint.snapshots.length}</span>
        </div>
        <div>Fecha: ${date}</div>
      </a>`)

      $listContainer.find('.collection-item').click((e) => {
        e.stopPropagation()
        console.log('Hi!!')
        return false
      })
    });
  }, 'json');
})
