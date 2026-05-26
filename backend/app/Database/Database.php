<?php

namespace App\Database;

use Illuminate\Database\Capsule\Manager as Capsule;

class Database
{
    public static function connect(array $config)
    {
        $capsule = new Capsule;
        
        $capsule->addConnection([
            'driver' => 'mysql',
            'host' => $config['database']['mysql']['host'],
            'port' => $config['database']['mysql']['port'],
            'database' => $config['database']['mysql']['database'],
            'username' => $config['database']['mysql']['username'],
            'password' => $config['database']['mysql']['password'],
            'charset' => $config['database']['mysql']['charset'],
            'collation' => $config['database']['mysql']['collation'],
            'prefix' => $config['database']['mysql']['prefix'],
            'strict' => true,
            'engine' => null,
        ]);
        
        $capsule->setAsGlobal();
        $capsule->bootEloquent();
        
        return $capsule;
    }
}
