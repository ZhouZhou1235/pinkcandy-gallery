<?php
// MySQL操作器
class MysqlOperation {
    private mysqli $db;
    public function __construct(string $hostname,string $username,string $password,string $database){
        $this->db = new mysqli($hostname,$username,$password,$database);
    }
    public function query(string $sql){
        return $this->db->query($sql);
    }
    public function queryAndList(string $sql){
        $result = $this->db->query($sql);
        $arr = [];
        if($result){while($row=$result->fetch_array()){array_push($arr,$row);}}
        return $arr;
    }
}
