<?php

class DbManager
{
    const SQLITE = 1;
    const MYSQL = 2;
    private static $instance = null;
    private static $optionfile = "db_config.xml";

    private function __construct()
    {
    }

    private static function getOptions()
    {
        try {
            
            if (! file_exists(self::$optionfile)) {
                throw new Exception("No se pudo abrir el archivo de configuración. ", 1);
            }

            $options = simplexml_load_file(self::$optionfile);

            return array(
                'driver'=>(string)$options->driver,
                'sqlite_dsn'=>(string)$options->sqlite_dsn,
                'mysql_dsn'=>(string)$options->mysql_dsn,
                'user'=>(string)$options->user, 
                'pass'=>(string)$options->pass);

        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            $dbConf = self::getOptions();
            try {     
                switch ($dbConf['driver']) {
                    case self::MYSQL:
                        self::$instance = new PDO($dbConf['mysql_dsn'], $dbConf['user'], $dbConf['pass']);
                        break;
                    case self::SQLITE:
                        self::$instance = new PDO('sqlite:'.__DIR__.$dbConf['sqlite_dsn']);
                        break;
                }
                self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            } catch (PDOException $exception) {
                printf("Falló al conectar con la base de datos: %s", $exception->getMessage());
                exit;
            }
        }

        return self::$instance;
    }
}
