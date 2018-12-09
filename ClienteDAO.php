<?php

class ClienteDAO extends DAO
{
    protected $pdo;
    private $resultPorPag = 8;

    public function __construct()
    {
        $this->pdo = DbManager::getInstance();
    }

    protected function convert(array $raw)
    {
        $obj = new Cliente(
            $raw['nombres'],
            $raw['apellido'],
            $raw['direccion'],
            $raw['telefono'],
            $raw['email']
        );
        $obj->setId((int) $raw['id']);

        return $obj;
    }

    public function insert(array $data)
    {
        try {
            $query = "INSERT INTO clientes ( "
                    ."nombres, apellido, direccion, telefono, email)"
                    ." VALUES (?, ?, ?, ?, ?)";  
            
            if (!parent::executeQuery($query, $data)) {
                return false;
            }

            return true;
        } catch (Exception $e) {
            return null;
        }  
    }

    public function update(array $data)
    {
        $query = "UPDATE clientes SET nombres=?, apellido=?, "
                ."direccion=?, telefono=?, email=? "
                ."WHERE id=?";

        if (!parent::executeQuery($query, $data)) {
            return false;
        }

        return true;
    }

    public function find(string $query, int $page, $count)
    {
        $data = [$query."%", $query."%"];
        $query = "";
        $response = [];

        $offset = $this->resultPorPag * ($page - 1);

        if ($count) {
            $query = "SELECT COUNT(*) AS cant_reg FROM clientes "
                    ."WHERE nombres LIKE ? OR apellido LIKE ?";
            // Añadimos a la respuesta la cant. de resultados a mostrar por página.
            array_push($response, $this->resultPorPag);

        } else {
            $query = "SELECT * FROM clientes "
                    ."WHERE nombres LIKE ? OR apellido LIKE ? "
                    ."ORDER BY apellido LIMIT ".$offset.", ".$this->resultPorPag;   
        }        
        
        $clientes = parent::getAsRaw($query, $data);
        array_push($response, $clientes);

        return $response;        
    }

    public function getAll(int $page, $count)
    {
        $response = [];


        $offset = $this->resultPorPag * ($page - 1);

        if ($count) {
            $query = "SELECT COUNT(*) AS cant_reg FROM clientes";
            // Añadimos a la respuesta la cant. de resultados a mostrar por página.
            array_push($response, $this->resultPorPag);

        } else {
            $query = "SELECT * FROM clientes 
                ORDER BY id LIMIT ".$offset.", ".$this->resultPorPag;
        } 

        $clientes = parent::getAsRaw($query);
        array_push($response, $clientes);
        return $response;
    }

    public function remove(int $id)
    {
        $query = "DELETE FROM clientes WHERE id=?";
        $data = array($id);  
        if (parent::executeQuery($query, $data)) {
            return true;
        }
        return false;
    }
}