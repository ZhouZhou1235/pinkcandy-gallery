<?php
// 数据对象


/**
 * 客户端发送的信息
 */
class ClientSendData {
    private string $action;
    private string $cookie;
    private mixed $data;
    public function __construct(mixed $data){
        if(json_validate($data)){
            try{
                $arr = json_decode($data,true);
                $this->action = $arr['action'];
                $this->cookie = $arr['cookie'];
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
