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
         <form method="post" id="tar_formulario">

              <div class="form-group" style="width: 35%;">
                <label>Nombre de afiliado</label>
                <input type="text" class="form-control" placeholder="Juan Perez" id=""  required>
              </div>
              
              
            <!-- BUSCADOR QUE APARECE AL CLICKEAR EL AFILIADO -->
              <div id="busqueda">
                <button class="btn-dark cerrar_modal" id="btn-cerrar">✖</button>

                  <div id="buscador">
                  <label for="apell" id="l-apell" class="l-busqueda">Apellido:</label>
                  <input type="search" id="i-apellido" class="busqueda caracter">
                  <span id="s-apellido" style="margin-left: 5px; border-radius: 5px; font-size:21px"></span>
                  <input type="submit" value="Buscar" id="buscar" href="www.google.com.ar"> 
                  </div>

                  <!-- <button id='buscar' type='searc'onclick="location.href='http://www.google.com'">BUSCAR</button>-->
                  <div id="d-datos">
                      <table id="tabla" class="table table-light table-hover">
                          <tbody><tr>
                          <td id="td-afiliado">NRO AFILIADO: <span id="sp-afiliado" class="sp-buscar"></span></td>
                          <td>NOMBRE: <span id="sp-nombre" class="sp-buscar"></span></td>
                          <td>APELLIDO: <span id="sp-apellido" class="sp-buscar"></span></td>
                          <td>DNI: <span id="sp-dni" class="sp-buscar"></span></td>
                          </tr>
                      </tbody></table>
                  </div>
              </div>

              <div class="form-group" style="width: 35%;">
                <label>Numero de la Tarjeta</label>
                <input type="text" class="form-control" id="tar_numero" placeholder="**** - **** - **** - **** - ****" maxlength="24" onkeypress="return (event.charCode >= 48 && event.charCode <= 57)" required>
              </div>
                          
              <div class="form-group" style="float:left; width: 13%;">
                <label>Mes Vencimiento</label>
                <select class="form-control" id="tar_vencim_mes" onchange="FechaCaducada()" required>
                  <option value="0" selected>Seleccione</option>
                <?php                  

                  for ($i=1; $i <= 12 ; $i++) {                     
                    echo '<option value="'.str_pad($i, 1, '0', STR_PAD_LEFT). '">'.str_pad($i, 2, '0', STR_PAD_LEFT).'</option>';
                  } 
                ?>
                </select>
              </div>                
              
              <div class="form-group" style="float:left; width: 13%; margin-left: 5%;">
                <label>Año Vencimiento</label>                
                <select class="form-control" id="tar_vencim_anio" onchange='FechaCaducada()' required>
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
              
              <div class="form-group" style="width: 13%; display:none;">
                  <label>Codigo de seguridad</label>
                  <input type="text" class="form-control" placeholder="123" maxlength="3" id="tar_cvv" required>
              </div>                     <br><br><br><br>
              
              <div class="form-group" style="float:left; width: 30%;">
                <label>Nombre y apellido (Como aparece en la tarjeta)</label>
                <input type="text" class="form-control" placeholder="" onkeypress="return soloLetras(event)" id="tar_nombre" required>
              </div>
              
              <div style="margin-top: 30px; margin-bottom: 20px; float:left; width: 100%;">
                <input class="btn btn-sm btn-info text-center" type="submit" id="tar_aceptar" value="Aceptar">
              </div>

            
        </form>
      </div>    
      
      <?php include('../barra_lateral.php'); ?>

    </section>
    
    <?php include('../pie.php'); ?>
    
    <div class="overlay" id="overlay">         
    </div>
    
    
  </body>
  </html>
