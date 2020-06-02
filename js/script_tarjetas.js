function limpiarNumero(e) {
    // Patron de entrada, en este caso solo acepta numeros y letras
    valor = e.value;
    var patron = /^[0-9 -]+$/i;
    if (patron.test(valor)){
      return true;
      // alert('anda');
    } else {
      alert('no andaaa');
      // valor.replace('a','');
      valor.substring(0, valor.length() - 2);

      }
}

// function limpiarNumero(e){
//   var charCode = (e.which) ? e.which : e.keyCode
//   if (charCode > 31 && (charCode < 48 || charCode > 57)){
//       return false;
//   }
//   return true;
// }


function soloLetras(e){
  key = e.keyCode || e.which;
  tecla = String.fromCharCode(key).toLowerCase();
  letras = " áéíóúabcdefghijklmnñopqrstuvwxyz`'`-";
  especiales = "8-37-39-46";

  tecla_especial = false
  for(var i in especiales){
       if(key == especiales[i]){
           tecla_especial = true;
           break;
       }
   }

   if(letras.indexOf(tecla)==-1 && !tecla_especial){
       return false;
   }
}

function guionesTarjeta(e) {
  var contador = $('#tar_numero').val();

  if(contador.length == 4 || contador.length == 9 || contador.length == 14) {
  //   alert('Hola!')
    $('#tar_numero').val(contador + '-')
  }
}

function FechaCaducada() {
  var f = new Date();
  var mes = f.getMonth() + 1;
  var anio = f.getFullYear();
  // if(mes >= $('#tar_vencim_mes').val()){
  //   alert('Hola')
  // }
  // alert(anio);
  // alert($('#tar_vencim_mes').val());
  // alert('hola')    

  if($('#tar_vencim_mes').val() <= mes && $('#tar_vencim_mes').val() >= 1 && $('#tar_vencim_anio').val() >= anio && $('#tar_vencim_anio').val() <= anio) {
    alert('Esta fecha se encuentra VENCIDA!');
  }
}
function jqGridTarjetasEstados(datos)  {
  
  $.jgrid.gridUnload('#jqGrid-Tarjetas-estados');    
  var pageWidth = $("#jqGrid-Tarjetas-estados").parent().width()-20;
  var cantRows = datos.length;

  $('#jqGrid-Tarjetas-estados').jqGrid({
    datatype: "local",
    data: datos,      
    colModel: [        
      { label: 'NUMERO', name: 'NUMERO', width:10 ,align: 'center', key: true},
      { label: 'FECHA', name: 'FECMOV', width: 12, align: 'center', sorttype:'date', formatter: 'date',
          formatoptions: {srcformat: "d/m/Y", newformat: "d/m/Y"}},
      { label: 'TERMINAL', name: 'TERMINAL', width:10 ,align: 'center'},
      { label: 'TARJETA', name: 'TARJETA', width:18 ,align: 'center'},
      { label: 'CUOTARJ', name: 'CUOTARJ', width:10 ,align: 'center'},
      { label: 'IMPCUPON', name: 'IMPCUPON', align: 'center', width:14, sorttype:'integer', formatter: 'currency',
            formatoptions: {prefix: "$ ", decimalSeparator:",", thousandsSeparator: ".", decimalPlaces: 2}},
      { label: 'IMPTOTBOL', name: 'IMPTOTBOL', align: 'center', width:14, sorttype:'integer', formatter: 'currency',
            formatoptions: {prefix: "$ ", decimalSeparator:",", thousandsSeparator: ".", decimalPlaces: 2}},    
      { label: 'NROEB_ET', name: 'NROEB_ET', width:15 ,align: 'center'},
      { label: 'EMISOR_TAR', name: 'EMISOR_TAR', width:15 ,align: 'center'},
      { label: 'ESTADO', name: 'ESTADO', width:20 ,align: 'center'}
    ],            
    
    height: 'auto',
    shrinkToFit: true,    
    width: pageWidth,    
    multiselect: true,
    rowNum: cantRows,
    loadonce: true,     
    altRows: true,
    viewrecords: true,
    pager: "#jqGridPager-Tarjetas-estados",
    footerrow: true,

    onSelectRow: function(rowId) {
        var selectedRowsIds = $('#jqGrid-Tarjetas-estados').jqGrid('getGridParam', 'selarrrow');
        var totalSum = 0;
        $.each(selectedRowsIds, function(index, selectedRowId) {
            totalSum += parseFloat($('#jqGrid-Tarjetas-estados').jqGrid('getCell', selectedRowId, 'IMPCUPON'));
        });
        $('#jqGrid-Tarjetas-estados').jqGrid('footerData', 'set', { IMPCUPON: totalSum });
    },
    
    onSelectAll: function(rowId) {
        var selectedRowsIds = $('#jqGrid-Tarjetas-estados').jqGrid('getGridParam', 'selarrrow');
        var totalSum = 0;
        $.each(selectedRowsIds, function(index, selectedRowId) {
            totalSum += parseFloat($('#jqGrid-Tarjetas-estados').jqGrid('getCell', selectedRowId, 'IMPCUPON'));
        });
        $('#jqGrid-Tarjetas-estados').jqGrid('footerData', 'set', { IMPCUPON: totalSum });
    }   
      
  });
  
  $('#jqGrid-Tarjetas-estados').jqGrid('footerData', 'set', { IMPCUPON: 0 });
  $('#jqGrid-Tarjetas-estados').jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
}


$(document).ready(function() {

  $('#tar_numero').keypress(function (e) { 
    var contador = $('#tar_numero').val();
  
    if(contador.length == 4 || contador.length == 9 || contador.length == 14 || contador.length == 19) {
    //   alert('Hola!')
      $('#tar_numero').val(contador + '-');
    }
});

  $.ajax({
    url : "/intranet/tarjetas/terminal.php",
    type : "POST",    
    dataType : "JSON",
    success : function(recibido) {

      for(j=0;j<recibido['TERMINAL'].length;j++) {

        document.getElementById("tarjetas-terminal").options[document.getElementById("tarjetas-terminal").options.length]=new Option(String(recibido['TERMINAL'][j]['TERMINAL']+' - '+recibido['TERMINAL'][j]['DESCRIP']),String(recibido['TERMINAL'][j]['TERMINAL']));
      }

       for(j=0;j<recibido['TIPO-TARJ'].length;j++) {
        
        document.getElementById("tarjetas-tipo-tarj").options[document.getElementById("tarjetas-tipo-tarj").options.length]=new Option(String(recibido['TIPO-TARJ'][j]['NROTARJ']+' - '+recibido['TIPO-TARJ'][j]['MARCA']),String(recibido['TIPO-TARJ'][j]['NROTARJ']));
      }
      
    }    
  });

  $('#boton-tarjetas-acreditar-lote').click(function() {

    var selectedRowsIds = $('#jqGrid-Tarjetas-estados').jqGrid('getGridParam', 'selarrrow');        
    $.each(selectedRowsIds, function(index, selectedRowId) {
      alert('Se acreditará el cupón Número: ' + $('#jqGrid-Tarjetas-estados').jqGrid('getCell', selectedRowId, 'NUMERO'));
    });

    $('#modal_tarjetas_acred').show();
    $('.modal_contenido').toggleClass('spaceInUp spaceOutRight');
  });

  $('#boton-tarjetas-consultar').click(function() {

    var terminal= document.getElementById('tarjetas-terminal');
    var fd=document.getElementById('tarjetas-fecha-desde').value;
    var fecha_desde= fd.substr(8,2)+'/'+fd.substr(5,2)+'/'+fd.substr(0,4);
    var fh=document.getElementById('tarjetas-fecha-hasta').value;
    var fecha_hasta= fh.substr(8,2)+'/'+fh.substr(5,2)+'/'+fh.substr(0,4);
    var tarjeta= document.getElementById('tarjetas-tipo-tarj');    
    var estado= document.getElementById('tarjetas-estado');    
    
    $.ajax({
      url : "consulta_estados_datos.php",
      type : "POST",
      data: {
              terminal: terminal.value,
              fecha_desde: fecha_desde,
              fecha_hasta: fecha_hasta,
              tarjeta: tarjeta.value,
              estado: estado.value
            },
      dataType : "JSON",
      success : function(recibido) {
        jqGridTarjetasEstados(recibido['TAR_ESTADOS']);
      }
    });          

    $('#boton-tarjetas-acreditar-lote').show();
  });  
    
  $('#tar_formulario').submit(function(e){
    e.preventDefault();
    tar_mes=$('#tar_vencim_mes').val();
    tar_anio=$('#tar_vencim_anio').val();

    if (tar_mes) {};
  })

  $('#btn-cerrar').click(function (e) { 
    $('#busqueda').fadeOut(1000);
    e.preventDefault();
  });

});
