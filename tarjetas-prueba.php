<!DOCTYPE html>
<html lang="en">

<?php 

session_start();

if (!isset($_SESSION['id_usuario'])) {
  session_destroy();
  header("Location: /intranet/login.php");
}

?>

  <head>
    
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    
    <title>Intranet</title>
    
    <link rel="shortcut icon" href="/intranet/img/favico_caja.ico">
    
    <link rel="stylesheet" href="/intranet/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/intranet/css/estilos.css">
    <link rel="stylesheet" href="/intranet/css/magic.css">
    <link rel="stylesheet" href="css/tarjetas.css">
    <link rel="stylesheet" type="text/css" media="screen" href="/intranet/jqgrid/css/ui.jqgrid-bootstrap.css" />

    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" ></script>
    <script type="text/ecmascript" src="/intranet/jqgrid/js/i18n/grid.locale-es.js"></script>
    <script type="text/ecmascript" src="/intranet/jqgrid/js/jquery.jqGrid.min.js"></script>
    <script type="text/javascript" src="/intranet/bootstrap/js/bootstrap.min.js" ></script>
    <script type="text/javascript" src="https://www.google.com/jsapi?autoload={'modules':[{'name':'visualization','version':'1','packages':['corechart','table']}]}"></script>
    <script type="text/javascript" src="/intranet/js/script_funcs_encab.js" ></script>
    <script type="text/javascript" src="/intranet/js/script_barra_lateral.js" ></script>
    <script type="text/javascript" src="js/script_tarjetas.js" ></script>
    
    
    <script>    
      $.jgrid.defaults.responsive = true;
      $.jgrid.defaults.styleUI = 'Bootstrap';    
    </script>

  </head>

  <body>

    <header>
      
      <?php include('../encabezado.php'); ?>          

    </header> 
    
    <section class="container-fluid contenedor-principal menu-tarjetas">
      <div class="col-md-11 col-xs-12 row contenedor-tarjetas-altas">
        
        <div>        	
	        <form method="post" id="tar_datos_formulario">
	            <div class="form-group" style="width: 13%; float: left; margin-right: 5%;">
	              <label>Tipo de pago</label>
	              <select class="form-control" onchange="tipoPago(this.value)">
	                <option value="1">Boleta Impresa</option>
	                <option value="2">Deuda</option>
	              </select>
	            </div>

	            <div class="form-group" style="width: 38%; float:left" id="tar_div_cb">
	              <label>Ingrese el Codigo de Barras</label>
	              <input type="text" class="form-control" name="tar_codigo_barras" id="tar_codigo_barras" maxlength="40">
	              <div id="tar_cb_datos" style="display:none; margin-top: 10px;">
	                <label style="font-size: 0.85em; margin-bottom: 0;">NAF</label><input type="text" class="form-control" name="tar_cb_naf" id="tar_cb_naf" style="width: 25%;">
	                <p id="tar_cb_apyno" style="margin-top: -32px; margin-left: 26%; margin-bottom: 0; font-size: 0.85em; font-weight: bold;"></p>
	                <p id="tar_cb_estado" style="margin-top: -2px; margin-left: 26%; margin-bottom: 0; font-size: 0.85em; font-weight: bold;"></p>
	                <label style="font-size: 0.85em; margin-bottom: 0;">MONTO</label><input type="text" class="form-control" name="tar_cb_monto" id="tar_cb_monto" style="width: 25%;">
	                <label style="font-size: 0.85em; margin-bottom: 0;">VENCIMIENTO BOLETA</label><input type="text" class="form-control" name="tar_cb_venc" id="tar_cb_venc" style="width: 25%;">
	                <p id="tar_cb_verif_venc"></p>

	                <div style="margin-top: 10px; margin-bottom: 20px; float:left; width: 100%;">
	                	<a class="btn btn-sm btn-info text-center" id="tar_cancelar_cb">Cancelar</a>
	                	<a class="btn btn-sm btn-info text-center" id="tar_carga_cb">Carga Boleta</a>
	              	</div>
	              </div>
	              
	            </div>

	            <div class="form-group" style="width: 10%; display:none; float:left" id="tar_div_naf">
	              <label>Afiliado</label>
	              <input type="text" class="form-control" name="tar_naf" id="tar_naf">
	            </div>           

	        </form>        
        </div> 

        <div id="tar_tabla_cb" style="float:left; width: 50%; display: none; box-shadow: grey 5px 5px 5px 5px; margin-top: 20px; margin-bottom: 50px;">
            <table id="jqGrid-Tarjetas-cb" class="fondo_blanco">
            </table>
            <div id="jqGridPager-Tarjetas-cb" class="fondo_blanco">
            </div>
        </div>

        <div>        	
	        <form method="post" id="tar_formulario">
	          <div class="form-group" style="width: 35%;">
	            <label>Numero de la Tarjeta</label>
	            <input type="text" class="form-control" placeholder="1234 5678 9012 3456" id="tar_numero" required>
	          </div>
	                      
	          <div class="form-group" style="float:left; width: 13%;">
	            <label>Mes Vencimiento</label>
	            <select class="form-control" id="tar_vencim_mes" required>
	              <option value="0" selected>Seleccione</option>
	            <?php                  

	              for ($i=1; $i <= 12 ; $i++) {                     
	                echo '<option value="'.str_pad($i, 2, '0', STR_PAD_LEFT). '">'.str_pad($i, 2, '0', STR_PAD_LEFT).'</option>';
	              } 
	            ?>
	            </select>
	          </div>                
	          
	          <div class="form-group" style="float:left; width: 13%; margin-left: 5%;">
	            <label>Año Vencimiento</label>                
	            <select class="form-control" id="tar_vencim_anio" required>
	              <option value="0" selected>Seleccione</option>
	            <?php 
	             $anio_actual= date('Y');
	              $anio_maximo= $anio_actual+15;

	              for ($i=$anio_actual; $i <= $anio_maximo ; $i++) {
	                echo '<option value="'.$i. '">'.$i.'</option>';
	              } 
	              
	            ?>
	            </select>
	          </div>                
	          
	          <div class="form-group" style="width: 13%;">
	              <label>Codigo de seguridad</label>
	              <input type="text" class="form-control" placeholder="123" maxlength="3" id="tar_cvv" required>
	          </div>                          
	          
	          <div class="form-group" style="float:left; width: 30%;">
	            <label>Nombre y apellido (Como aparece en la tarjeta)</label>
	            <input type="text" class="form-control" placeholder="" id="tar_nombre" required>
	          </div>
	          
	          <div style="margin-top: 30px; margin-bottom: 20px; float:left; width: 100%;">
	            <input class="btn btn-sm btn-info text-center" type="submit" id="tar_aceptar" value="Aceptar">                
	          </div>
	        </form>
        </div>
      </div>    
      
      <?php include('../barra_lateral.php'); ?>

    </section>
    
    <?php include('../pie.php'); ?>
    
    <div class="overlay" id="overlay">         
    </div>
    
    
  </body>
  </html>
