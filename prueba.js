function jqGridTarjetasCB() {
  
  $.jgrid.gridUnload('#jqGrid-Tarjetas-cb');
  var pageWidth = $("#jqGrid-Tarjetas-cb").parent().width()-10;  

  $('#jqGrid-Tarjetas-cb').jqGrid({
    datatype: "local",    
    colModel: [        
      { label: 'CODIGO_BARRAS', name: 'CODIGO_BARRAS', width:20 ,align: 'center', key: true},
      { label: 'IMPORTE', name: 'IMPORTE', align: 'center', width:14, sorttype:'integer', formatter: 'currency',
            formatoptions: {prefix: "$ ", decimalSeparator:",", thousandsSeparator: ".", decimalPlaces: 2}},
    ],            
    
    height: 'auto',
    shrinkToFit: true,    
    width: pageWidth,    
    multiselect: true,
    rowNum: 10,
    loadonce: true,     
    altRows: true,
    viewrecords: true,
    pager: "#jqGridPager-Tarjetas-cb",
    footerrow: true,

    onSelectRow: function(rowId) {
        var selectedRowsIds = $('#jqGrid-Tarjetas-cb').jqGrid('getGridParam', 'selarrrow');
        var totalSum = 0;
        $.each(selectedRowsIds, function(index, selectedRowId) {
            totalSum += parseFloat($('#jqGrid-Tarjetas-cb').jqGrid('getCell', selectedRowId, 'IMPORTE'));
        });
        $('#jqGrid-Tarjetas-cb').jqGrid('footerData', 'set', { IMPORTE: totalSum });
    },
    
    onSelectAll: function(rowId) {
        var selectedRowsIds = $('#jqGrid-Tarjetas-cb').jqGrid('getGridParam', 'selarrrow');
        var totalSum = 0;
        $.each(selectedRowsIds, function(index, selectedRowId) {
            totalSum += parseFloat($('#jqGrid-Tarjetas-cb').jqGrid('getCell', selectedRowId, 'IMPORTE'));
        });
        $('#jqGrid-Tarjetas-cb').jqGrid('footerData', 'set', { IMPORTE: totalSum });
    }   
      
  });
  
  $('#jqGrid-Tarjetas-cb').jqGrid('footerData', 'set', { IMPORTE: 0 });
  //$('#jqGrid-Tarjetas-estados').jqGrid('filterToolbar', { stringResult: true, searchOnEnter: false, defaultSearch: "cn" });
}

function jqGridTarjetasEstados(datos) {
  
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

function tipoPago(valor) {
  if (valor==1) {
    $('#tar_div_naf').hide();
    $('#tar_codigo_barras').val('');
    $('#tar_cb_naf, #tar_cb_monto, #tar_cb_venc').val('');
    $('#tar_cb_datos').hide();

    
    $('#tar_div_cb').show();

  } else if (valor==2) {
    $('#tar_div_cb').hide();
    $('#tar_div_naf').show();
  } else {

  }
}

function leerCB(valor) {
    
    var codigo_barras = [];
    codigo_barras['CONV']=valor.substr(0,5); // "0-4 CONV"
    codigo_barras['NAF']=valor.substr(5,5); // "5-9 NAF"    
    codigo_barras['DIG']=valor.substr(10,1); // "11 DIG"
    codigo_barras['AA']=valor.substr(11,2); // "12-13 AA"
    codigo_barras['MM']=valor.substr(13,2); // "14-15 MM"
    codigo_barras['DD']=valor.substr(15,2); // "16-17 DD"
    codigo_barras['DIAS-VTO']=valor.substr(17,3); // "18-20 DIAS-VTO"
    codigo_barras['CAPSIE']=valor.substr(20,1); // "21-21 CAPSIE"
    codigo_barras['SECUENCIA']=valor.substr(21,5); // "22-26 SECUENCIA"
    codigo_barras['ME']=valor.substr(26,9); // "27-35 ME"
    codigo_barras['MD']=valor.substr(35,2); // "36-37 MD"
    codigo_barras['00']=valor.substr(37,2); // "38-39 00"
    codigo_barras['DIG_VER']=valor.substr(39,1); // "40-40 DIGITO VERIF"
    
    return codigo_barras;
}

$(document).ready(function() {

  var today = new Date();    
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
      dd = '0'+dd
  } 

  if(mm<10) {
      mm = '0'+mm
  } 

  today = mm + '/' + dd + '/' + yyyy;

  jqGridTarjetasCB();

  $('#tar_carga_cb').click(function() {    

    var boleta_cb = $('#tar_codigo_barras').val();
    var boleta_monto = $('#tar_cb_monto').val();
    
    var myfirstrow = {CODIGO_BARRAS:boleta_cb, IMPORTE: boleta_monto};


    var cant_registros= $('#jqGrid-Tarjetas-cb').jqGrid('getGridParam', 'records');

    $('#jqGrid-Tarjetas-cb').addRowData(cant_registros+1,myfirstrow);

    $('#tar_tabla_cb').show();  

    $('#tar_div_naf').hide();
    $('#tar_codigo_barras').val('');
    $('#tar_cb_naf, #tar_cb_monto, #tar_cb_venc').val('');
    $('#tar_cb_datos').hide();
    $('#tar_codigo_barras').prop('disabled', false);

  });

  $('#tar_cancelar_cb').click(function() {        

    $('#tar_div_naf').hide();
    $('#tar_codigo_barras').val('');
    $('#tar_cb_naf, #tar_cb_monto, #tar_cb_venc').val('');
    $('#tar_cb_datos').hide();
    $('#tar_codigo_barras').prop('disabled', false);

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
    
  $('#tar_formulario').submit(function(e) {
    e.preventDefault();
    tar_mes=$('#tar_vencim_mes').val();
    tar_anio=$('#tar_vencim_anio').val();

    if (tar_mes) {};
  })

  $('#tar_codigo_barras').focusout(function() {
    
    if (this.value.length==40) {
      codigo_barras=leerCB(this.value);      
      $('#tar_codigo_barras').prop('disabled', true);

      $('#tar_cb_naf').val(codigo_barras['NAF']);
      $('#tar_cb_naf').prop('disabled', true);

      $.ajax({
        url : "busqueda_naf.php",
        type : "POST",
        data: {
                naf: codigo_barras['NAF']
              },
        dataType : "JSON",
        success : function(recibido) {
            
            $('#tar_cb_apyno').html(recibido['DATOS_NAF']['APYNO']);

            if (recibido['DATOS_NAF']['ESTADO']>30 && recibido['DATOS_NAF']['ESTADO']<40) {              
              $('#tar_cb_estado').html(recibido['DATOS_NAF']['ESTADO_AF']);
              $('#tar_cb_estado').css('color', 'red');              
            } else {
              $('#tar_cb_estado').html(recibido['DATOS_NAF']['ESTADO_AF']);
              $('#tar_cb_estado').css('color', 'green');              
            }
        }
      });  

      var monto=parseFloat(codigo_barras['ME']+'.'+codigo_barras['MD']);
      $('#tar_cb_monto').val(monto.toFixed(2));
      $('#tar_cb_monto').prop('disabled', true);


      var fecha_bol=codigo_barras['MM']+'/'+codigo_barras['DD']+'/20'+codigo_barras['AA'];
      var venc_d = new Date(fecha_bol);
      venc_d.setDate(venc_d.getDate() + parseFloat(codigo_barras['DIAS-VTO']));
      var venc_dd= venc_d.getDate();
      var venc_mm= venc_d.getMonth()+1;      
      var venc_yyyy = venc_d.getFullYear();

      if(venc_dd<10) {
          venc_dd = '0'+venc_dd
      } 

      if(venc_mm<10) {
          venc_mm = '0'+venc_mm
      }
      
      $('#tar_cb_venc').val(venc_dd+'/'+venc_mm+'/'+venc_yyyy);
      $('#tar_cb_venc').prop('disabled', true);

      $('#tar_cb_datos').show();
    } else {

    }
  });

});


