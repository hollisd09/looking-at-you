$(document).ready(function() {
  $('.addButton').on('click', function() {
    const name = ($(this).parent().children('.productName').html())
    const price = ($(this).parent().children('.productPrice').html())
    const description = ($(this).parent().children('.productDesc').html())
    const url = ($(this).parent().children('.productUrl').html())
    const image = ($(this).parent().children().children('.productImage').html())

    const data = { shit: {
      name: name,
      price: price,
      description: description,
      url: url,
      image: image
    }
  }
    console.log(data)

    $.ajax({
      type: "POST",
      url: '/walmart/save',
      data: data,
      success: function() {
        console.log('SUCCESS!!!')
      }
    });
  })
})
