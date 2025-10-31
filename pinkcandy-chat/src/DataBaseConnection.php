<?php


namespace ZhouZhou\PinkCandyChat;
use mysqli;


/**
 * MySQL数据库连接者
 */
class DataBaseConnection {
    private mysqli $mysqli;
    /**
     * 初始化mysqli实例
     */
    public function __construct(){
        $this->mysqli = new mysqli(
            $GLOBALS['config']['mysqli']['hostname'],
            $GLOBALS['config']['mysqli']['username'],
            $GLOBALS['config']['mysqli']['password'],
            $GLOBALS['config']['mysqli']['database']
        );
    }
    /**
     * 查询数据
     */
    public function queryData(string $sql){
        if(!isSelectQuery($sql)){
            throw new \Exception("PINKCANDY: only allow select");
        }
        $res = $this->mysqli->query($sql);
        if(!$res){
            throw new \Exception($this->mysqli->error);
        }
        return $res->fetch_all(MYSQLI_ASSOC);
    }
    /**
     * 操作数据
     */
    public function executeData(string $sql){
        if(!isManipulationQuery($sql)){
            throw new \Exception("PINKCANDY: only allow execute");
        }
        $result = $this->mysqli->query($sql);
        if(!$result){throw new \Exception($this->mysqli->error);}
        return $result!=false;
    }
}
