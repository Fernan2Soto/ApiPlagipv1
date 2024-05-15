
function agregarFilaTabla(run,nombres,apellidos,correo,direccion,numero){
    var retorno="<tr>"+
                    "<td>"+run+"</td>"+
                    "<td>"+nombres+" " +apellidos+"</td>"+
                    "<td>"+correo+"</td>"+
                    "<td>"+direccion+" " +numero+"</td>"+
                    "<td><i class='zmdi zmdi-edit'></i></td>"+
                    "<td><i class='zmdi zmdi-delete'></i></td>"+
                    "<td><i class='zmdi zmdi-zoom-in'></i></td>"+
                "</tr>";
    return retorno;
}



$(document).ready(function(){
    //Cuando el documento esté listo... GENERA LA CARGA.
    //Vamos a capturar diferentes tipos de eventos.
    //Primer Evento que revisaremos es el blur/keydown/keyup.

    

    $('#runPer').keydown(function(){
        var valorCaja=$(this).val(); //Capturar el Valor de la caja...
        if(valorCaja.trim().length>3){
            $('.respuestaServidor').html("Todo Ok");
        }else{
            $('.respuestaServidor').html("Ingresa más datos...");
        }
    });



    $('.formRegistro').submit(function(e){
        e.preventDefault();
        e.stopPropagation();

        var run=$('.txt_rut').val();
        var nombres=$('.txt_nombre').val();
        var apellidos=$('.txt_apellido').val();
        var correo=$('.txt_email').val();
        var direccion=$('.txt_direccion').val();
        var numero=$('.txt_numerodireccion').val();

        $('.cargarDatosTabla').append(agregarFilaTabla(run,nombres,apellidos,correo,direccion,numero));
        
        Swal.fire({
            'icon':'success',
            'title':'Correcto',
            'text':'Insertado correctamente !'
        });

        return false;
        });

});
