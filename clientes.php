<?php
require 'autoload.php';

$action = (isset($_REQUEST['action']) && $_REQUEST['action'] != NULL) ? $_REQUEST['action'] : '';

if ($action != '') {
    if (function_exists($action)) {
        $action();
    }
}

function get()
{
    // La función devuelve la cantidad de registros o los registros
    // dependiendo del parámetro count.

    $clidao = new ClienteDAO();
    $clientes = null;
    $page = (isset($_GET['p']) && !empty($_GET['p'])) ? (int) $_GET['p'] : 0;

    //determina si se desea obtener la cantidad de registros o los registros en sí.
    $count = isset($_GET['c']) ? true : false;

    if (isset($_GET['q'])) {        
        $query = $_GET['q'];
        $clientes = $clidao->find($query, $page, $count);
    } else {
        $clientes = $clidao->getAll($page, $count);        
    }

    echo json_encode($clientes);    
}

function save()
{
    $id = empty($_POST['id']) ? 0 : $_POST['id'];    
    $nombres = $_POST['nombres'];
    $apellido = $_POST['apellido'];
    $direccion = $_POST['direccion'];
    $telefono = $_POST['telefono'];
    $email = $_POST['email'];
    $clidao = new ClienteDAO();

    if ($id > 0) {
        $data = array($nombres, $apellido, $direccion, $telefono, $email, $id); 
        if ($clidao->update($data)) {
            echo "Registro actualizado.";
        } else {
            echo "Error al actualizar el registro.";
        }
        
    } else {    
        $data = array($nombres, $apellido, $direccion, $telefono, $email);
        if ($clidao->insert($data)) {
            echo "Registro insertado.";
        } else {
            echo "Error al insertar el registro.";
        }      
    }
}

function delete()
{
    if (isset($_POST['id']) && !empty($_POST['id'])) {
        $id = (int)$_POST['id'];
        $clidao = new ClienteDAO();
        if ($clidao->remove($id)) {
            echo "El registro se ha eliminado.";
        } else {
            echo "Ha ocurrido un error al eliminar el registro.";
        }  
    }
}