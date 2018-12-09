<?php

$namespaces = function ($path) {
    if (preg_match('/\\\\/', $path)) {
        $path = __DIR__.DIRECTORY_SEPARATOR.'..'
        .DIRECTORY_SEPARATOR.str_replace('\\', DIRECTORY_SEPARATOR, $path);
    }
    if (file_exists("{$path}.php")) {
        require_once("{$path}.php");
    }
};

\spl_autoload_register($namespaces);
