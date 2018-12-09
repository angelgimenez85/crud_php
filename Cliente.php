<?php

class Cliente
{
    private $id = null;
    private $nombres;
    private $apellido;
    private $direccion;
    private $telefono;
    private $email;


    public function __construct(
        string $nombres,
        string $apellido,
        string $direccion,
        string $telefono,
        string $email
    ) {
        $this->nombres = $nombres;
        $this->apellido = $apellido;
        $this->direccion = $direccion;
        $this->telefono = $telefono;
        $this->email = $email;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function getNombres()
    {
        return $this->nombres;
    }

    public function setNombres(string $nombres)
    {
        $this->nombres = $nombres;
    }

    public function getApellido()
    {
        return $this->apellido;
    }

    public function setApellido(string $apellido)
    {
        $this->apellido = $apellido;
    }

    public function getDireccion()
    {
        return $this->direccion;
    }

    public function setDireccion(string $direccion)
    {
        $this->direccion = $direccion;
    }

    public function getTelefono()
    {
        return $this->telefono;
    }

    public function setTelefono(string $telefono)
    {
        $this->telefono = $telefono;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail(string $email)
    {
        $this->email = $email;
    }
}
