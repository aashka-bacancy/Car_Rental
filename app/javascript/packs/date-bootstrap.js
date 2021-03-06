document.addEventListener("turbolinks:load", function(){
    var state = document.getElementById("address_state");
    var city = document.getElementById("address_city");

    $("#address_state").on("change", function() {
      while (city.firstChild) city.removeChild(city.firstChild);
          $.ajax({
            url: "/addresses",
            type: "GET",
            // dataType: 'html',
            // contentType: "application/html",
            data: "state=" + state.value,
            success: function (data) {
                    //remove disabled from city and change the options
                    $('select[name="address[city]"]').prop("disabled", false);
                    $('select[name="address[city]"]').html(data.response);
            }
          })
    });
  
    $("#submit_btn").on("click", function() {
      var selected_pick = $("input:radio[name=addr_pick]:checked").val()
      var selected_drop = $("input:radio[name=addr_drop]:checked").val()
      if(selected_pick == selected_drop){
        alert("Same Address Selected Please Select Different Address For Pick-Up & Drop")
        return false
      }
    });
    
    $('.startDate').datepicker({
      format: 'dd-mm-yyyy',
      autoclose: true,
      startDate: '-d',
      endDate: '+6m'
    }).on('changeDate', function (selected) {
      $(".endDate").val("");
      var minDate = new Date(selected.date.valueOf());
      $('.endDate').datepicker('setStartDate', minDate);
    });

    $(".endDate").datepicker({
      format: 'dd-mm-yyyy',
      autoclose: true,
      endDate: '+6m'
    })
      .on('changeDate', function (selected) {
        var maxDate = new Date(selected.date.valueOf());
        $('.startDate').datepicker('setEndDate', maxDate);
    });



    $('.start_graph').datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true,
      todayBtn: 'linked'
    })
    .on('changeDate', function (selected) {
      $(".end_graph").val("");
      var minDate = new Date(selected.date.valueOf());
      $('.end_graph').datepicker('setStartDate', minDate);
    });
    
    $('.end_graph').datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true,
      todayBtn: 'linked'
    })
    // .on('changeDate', function () {
    //   var endDate = $('.end_graph').val()
    //   var startDate = $('.start_graph').val()
    //   $.ajax({
    //     url: "/superadmins/index",
    //     type: "GET",
    //     data: {min_date: startDate, max_date: endDate},
    //     success: function (data) {
    //       debugger;
    //       $("#chart-booking").load(window.location.href + " #chart-booking");
    //     }
    //   })
      
      
  // });
})