init();

function init()
{
    cargarDatosTabla();
    
    $("#guardar").click(validarDatos);

    $("#limpiar").click(function() {
        limpiarFormulario();
        $("#nombres").focus();
    });

    $("#btn-nuevo").click(function() {
        $("#myModalLabel").html("Nuevo registro");
        limpiarFormulario();
    });

    $("#btn_search").click(function() {
        cargarDatosTabla();
        $("#search").focus();
    });

    var search = document.getElementById('search');
    search.onfocus = function(){
        this.selectionStart = 0;
    };

    search.onkeypress = function(e) {
        if (e.keyCode == 13) {
            cargarDatosTabla();
            $(this).focus();
            return false;
        }
    }

    //Poner foco en primer campo del form
    $('#modal-container-730561').on('shown.bs.modal', function (e) {
        $("#nombres").focus();
    });
}

function validarDatos()
{
    var id = document.getElementById("id").value;
    var nombres = document.getElementById("nombres").value;
    var apellido = document.getElementById("apellido").value;
    var direccion = document.getElementById("direccion").value;
    var telefono = document.getElementById("telefono").value;
    var email = document.getElementById("email").value;

    if (nombres.trim() == "") {
        alert("Debe ingresar un nombre");
        document.getElementById("nombres").focus();
        return;
    }

    if (apellido.trim() == "") {
        alert("Debe ingresar un apellido");
        document.getElementById("apellido").focus();
        return;
    }

    if (direccion.trim() == "") {
        alert("Debe ingresar una dirección");
        document.getElementById("direccion").focus();
        return;
    }

    if (telefono.trim() == "") {
        alert("Debe ingresar un telefono");
        document.getElementById("telefono").focus();
        return;
    }

    if (email.trim() == "") {
        alert("Debe ingresar un email");
        document.getElementById("email").focus();
        return;
    }

    var data = "action=save&id="+id+"&nombres="+nombres
                +"&apellido="+apellido+"&direccion="+direccion
                +"&telefono="+telefono+"&email="+email;

    guardarDatos(data);
}

function guardarDatos(data)
{
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "clientes.php", true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            alert(this.responseText);            
            cargarDatosTabla();
        }
    };

    xhttp.send(data);
}

function cargarDatosTabla(page = 1)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            limpiarTabla();
            var clientes = JSON.parse(this.responseText)[0];
            crearFilasTabla(clientes);
        }
    };

    var path = "clientes.php?action=get";
    var search = document.getElementById("search").value;
    if (search.trim().length > 0) {
        path += "&q=" + search;
    }

    path += "&p=" + page;

    xhttp.open("GET", path, true);
    xhttp.send();

    paginar(page);
}

function cargarCamposFormulario(e)
{
    var tds = e.getElementsByTagName("td");
    var inputs = document.forms[1].getElementsByTagName("input");
    inputs[0].value = tds[0].innerHTML;
    var apenom = tds[1].innerHTML.split(", ");
    inputs[1].value = apenom[1];
    inputs[2].value = apenom[0];
    inputs[3].value = tds[2].innerHTML;
    inputs[4].value = tds[3].innerHTML;
    inputs[5].value = tds[4].innerHTML;
    inputs[1].focus();
    inputs[1].selectionStart = 0;
}

function limpiarFormulario()
{
    document.getElementById("id").value = "";
    document.getElementById("nombres").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("email").value = ""; 
}

function limpiarTabla()
{
    var tabla = document.getElementById("tabla");
    while (tabla.firstChild) {
        tabla.removeChild(tabla.firstChild);
    }
}

function eliminar(e)
{
    var id = e.firstChild.innerHTML;
    if (id == "") {
        alert("Debe seleccionar un registro a eliminar");
    } else {
        if (confirm("¿Seguro para eliminar el registro?")) {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", "clientes.php", true);
            xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    alert(this.responseText);            
                    cargarDatosTabla();
                }
            };
            var data = "action=delete&id="+id;
            xhttp.send(data);
        }        
    }
}

function paginar(page)
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            borrarBotonesPaginacion();
            var response = JSON.parse(this.responseText);
            var resultadosPorPagina = response[0];
            var cantidadRegistros = response[1][0]["cant_reg"];

            crearBotonesPaginacion(cantidadRegistros, page, resultadosPorPagina);
        }
    }

    var path = "clientes.php?action=get";
    var search = document.getElementById("search").value;
    if (search.trim().length > 0) {
        path += "&q=" + search;
    }
    path += "&p=" + page + "&c=t";
    xhttp.open("GET", path, true);
    xhttp.send();
}

function borrarBotonesPaginacion()
{
    var pagination = document.getElementsByClassName('pagination')[0];
    while (pagination.firstChild) {
        pagination.removeChild(pagination.firstChild);
    }
}

function crearBotonesPaginacion(cantidadRegistros, pagActual, resultadosPorPagina)
{
    var pagination = document.getElementsByClassName('pagination')[0];
    var paginas = Math.ceil(cantidadRegistros / resultadosPorPagina);
    pagActual = parseInt(pagActual);
    var a = null;
    var li = null;

    if (pagActual > 1) {
        a = document.createElement("a");  
        a.setAttribute("class", "page-link");
        a.setAttribute("href", "javascript: void(0);");       
        a.setAttribute("value", pagActual - 1);
        a.innerHTML = "Anterior";
        li = document.createElement("li");
        li.setAttribute("class", "page-item");
        li.appendChild(a);
        pagination.appendChild(li);
    }

    for (var i = 1; i <= paginas; i++) {
        a = document.createElement("a");
        a.setAttribute("class", "page-link");
        a.setAttribute("href", "javascript: void(0);");        
        a.setAttribute("value", i);
        a.innerHTML = i;

        li = document.createElement("li");       

        if (i == pagActual) {
            a.setAttribute("class", "page-link");
            li.setAttribute("class", "page-item active");
        } else {
            li.setAttribute("class", "page-item");
        }
        
        li.appendChild(a);
        
        pagination.appendChild(li);
    }

    if (paginas > 1 && pagActual < paginas) {
        a = document.createElement("a");
        a.setAttribute("class", "page-link");
        a.setAttribute("href", "javascript: void(0);");        
        a.setAttribute("value", pagActual + 1);
        a.innerHTML = "Siguiente";

        li = document.createElement("li");
        li.setAttribute("class", "page-item");
        li.appendChild(a);

        pagination.appendChild(li);
    }

    var pageLinks = document.getElementsByClassName('page-link');
    for (var i in pageLinks) {
        pageLinks[i].onclick = function() {
            cargarDatosTabla(this.getAttribute("value"));
        };
    }    
}

function crearFilasTabla(clientes)
{
    for (var i in clientes) {
        var fila='<td>'+clientes[i].id
            +"</td><td>"+clientes[i].apellido + ", " + clientes[i].nombres 
            +"</td><td>"+clientes[i].direccion
            +"</td><td>"+clientes[i].telefono
            +"</td><td>"+clientes[i].email+"</td>"
            +'<td class="edit"><a data-toggle="modal" title="Editar" '
            +'role="dialog" href="#modal-container-730561"><img src="images/edit.png" /></a></td>'
            +'<td class="edit"><a id="link-delete" '
            +' href="#" title="Eliminar"><img src="images/delete.png" /></a></td>';

        var tr = document.createElement("TR");

        tr.onmouseover = function(){
            this.style.backgroundColor = "#c3e6cb";
        };

        tr.onmouseout = function(){
            this.style.backgroundColor = "white";
        };

        tr.innerHTML = fila;

        var tdEdit = tr.getElementsByClassName("edit")[0];
        tdEdit.onclick = function(){
            document.getElementById("myModalLabel").innerHTML = "Editar registro"; 
            cargarCamposFormulario(this.parentNode);
        };

        var tdDelete = tr.getElementsByClassName("edit")[1];
        tdDelete.onclick = function(){
            eliminar(this.parentNode);
        };

        document.getElementById("tabla").appendChild(tr);
    }
}