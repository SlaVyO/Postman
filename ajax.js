$( document ).ready(function() {
    i = 0;
    $("#btn").click(
		function(){
            type = $( "#method option:selected" ).val();
            url = $('#url').val();
            dataTypeValue = $( "#dattype option:selected" ).val();
          
            //alert (dataTypeValue)
            let found = $(".form").find("div");
            var i = 0;
            let val=''; 
            if (dataTypeValue == "html" ){
             let val1=''; 
             alert ("1");
             while (i < found['length']) {
                getclass= found[i]['className'];
                getVal='';
                getVal+=$('.'+getclass).find(".paramName").val()+'=';
                getVal+=$('.'+getclass).find(".paramVal").val();
                val1= val1 + getVal;
                if (i+1 != found['length']) {val1+= '&';}
                i++
                 alert (i);
            }
            val =val1;
        }
          if (dataTypeValue == "json" ){
               alert ("2");
           var arr = [];
        while (i < found['length']) {
             getclass= found[i]['className'];
         key = $('.'+getclass).find(".paramName").val();
             value = $('.'+getclass).find(".paramVal").val();
            arr.push({key:value});
            i++
          }
              val =JSON.stringify(arr); 
            }//else {let val='';}
           console.log(val);
           // alert (val);
            sendAjaxForm(val, url, type, dataTypeValue, 'result_form');
			return false; 
		}
	);

   

    $('.info__add').click(function () {
        i++;
       $(this).after('<div class="inp'+i+'" >'+
        '<input type="text" class="paramName" name="paramName" size="10" placeholder="name" />'+
        '<input type="text" class="paramVal" name="paramVal" size="30" placeholder="value" />'+
        "<input type='button' class='removeBtn' value='Remove' />"
      );
    });
});



$(document).on("click", ".removeBtn", function() {
    $(this).parent('div').remove();
});

 
function sendAjaxForm( dataValue, url, type, dataTypeValue, result_form) {
    jQuery.ajax({
        url:     url, //url страницы (action_ajax_form.php)
        type:     type, //метод отправки
       // dataType: "html", //формат данных
        dataType: dataTypeValue,
        data: dataValue,//jQuery("#"+ajax_form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
        	result = jQuery.parseJSON(response);
        	document.getElementById(result_form).innerHTML = "Result1: "+result.first+"<br>Result2: "+result.second+
            "<br>Method: "+result.method+"<br>GETUrl: "+result.requrl;
    	},
    	error: function(response) { // Данные не отправлены
    		document.getElementById(result_form).innerHTML = "Ошибка. Данные не отправленны.";
    	}
 	});
}
 


