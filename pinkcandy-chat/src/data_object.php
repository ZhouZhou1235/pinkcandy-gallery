<?php
// 数据对象


/**
 * 客户端发送的信息
 */
class ClientSendData {
    private string $action;
    private string $cookie;
    private mixed $data;
    public function __construct(string $data){
        if(json_validate($data)){
            try{
                $arr = json_decode($data,true);
                $this->action = $arr['action']?$arr['action']:'';
                $this->cookie = $arr['cookie']?$arr['cookie']:'';
                $this->data = $arr['data'];
                return;
            }
            catch(Exception $e){echo $e;}
        }
        $this->action = '';
        $this->cookie = '';
        $this->data = null;
    }
    public function getArrayData(){return [
        'action'=>$this->action,
        'cookie'=>$this->cookie,
        'data'=>$this->data,
    ];}
}

/**
 * 服务端发送的信息
 */
class EchoData {
    private mixed $message;
    private string $type;
    private DateTime $dateTime;
    public function __construct(mixed $message,string $type){
        $this->message = $message;
        $this->type = $type;
        $this->dateTime = new DateTime();
    }
    public function getArrayData(){return [
        'message'=>$this->message,
        'type'=>$this->type,
        'time'=>$this->dateTime,
    ];}
}

/**
 * 用户的信息
 */
class UserData {
    private string $username;
    private string $name;
    private string $jointime;
    private string $info;
    private string $headimage;
    private string $backimage;
    private string $sex;
    private string $species;
    public function __construct(string $data){
        if(json_validate($data)){
            try{
                $arr = json_decode($data,true);
                $this->username = $arr['username']?$arr['username']:'';
                $this->name = $arr['name']?$arr['name']:'';
                $this->jointime = $arr['jointime']?$arr['jointime']:'';
                $this->info = $arr['info']?$arr['info']:'';
                $this->headimage = $arr['headimage']?$arr['headimage']:'';
                $this->backimage = $arr['backimage']? $arr['backimage']:'';
                $this->sex = $arr['sex']?$arr['sex']:'';
                $this->species = $arr['species']?$arr['species']:'';
                return;
            }
            catch(Exception $e){echo $e;}
        }
        $this->action = '';
        $this->cookie = '';
        $this->data = null;
    }
    public function getArrayData(){return [
        'username'=>$this->username,
        'name'=>$this->name,
        'jointime'=>$this->jointime,
        'info'=>$this->info,
        'headimage'=>$this->headimage,
        'backimage'=>$this->backimage,
        'sex'=>$this->sex,
        'species'=>$this->species,
    ];}
}
