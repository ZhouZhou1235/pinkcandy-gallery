<?php

namespace App\Services;

use SessionHandlerInterface;

class JsonSessionHandler implements SessionHandlerInterface
{
    private string $savePath;
    private array $config;
    private ?string $currentUsername = null;
    private ?string $currentSessionId = null;
    private array $currentData = [];

    public function __construct(array $config)
    {
        $this->config = $config;
        $this->savePath = $config['files']['sessions'];
    }

    public function open(string $savePath, string $sessionName): bool
    {
        if (!is_dir($this->savePath)) {
            mkdir($this->savePath, 0755, true);
        }
        return true;
    }

    public function close(): bool
    {
        return true;
    }

    public function read(string $sessionId): string
    {
        $this->currentSessionId = $sessionId;
        $sessionFile = $this->getSessionFilePath($sessionId);
        
        if (file_exists($sessionFile)) {
            $content = file_get_contents($sessionFile);
            $data = json_decode($content, true);
            
            if ($data && isset($data['data']) && isset($data['expires']) && time() < $data['expires']) {
                $this->currentUsername = $data['username'] ?? null;
                $this->currentData = $data;
                return $data['data'];
            }
            
            @unlink($sessionFile);
        }
        
        $this->currentData = [];
        $this->currentUsername = null;
        return '';
    }

    public function write(string $sessionId, string $sessionData): bool
    {
        $this->currentSessionId = $sessionId;
        $data = $this->parseSessionData($sessionData);
        $username = $data['username'] ?? $this->currentUsername;
        
        if (!$username) {
            return true;
        }
        
        $oldFile = $this->getSessionFilePath($sessionId);
        $newFile = $this->savePath . '/session-' . $username . '.json';
        
        if ($oldFile !== $newFile && file_exists($oldFile)) {
            @unlink($oldFile);
        }
        
        $expires = time() + $this->config['session']['lifetime'];
        
        $sessionContent = [
            'session_id' => $sessionId,
            'username' => $username,
            'data' => $sessionData,
            'expires' => $expires,
            'last_access' => time()
        ];

        $this->currentUsername = $username;
        $this->currentData = $sessionContent;
        
        return file_put_contents($newFile, json_encode($sessionContent, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)) !== false;
    }

    public function destroy(string $sessionId): bool
    {
        $sessionFile = $this->getSessionFilePath($sessionId);
        
        if (file_exists($sessionFile)) {
            @unlink($sessionFile);
        }
        
        if ($this->currentUsername) {
            $userSessionFile = $this->savePath . '/session-' . $this->currentUsername . '.json';
            if (file_exists($userSessionFile)) {
                @unlink($userSessionFile);
            }
        }
        
        $this->currentUsername = null;
        $this->currentSessionId = null;
        $this->currentData = [];
        return true;
    }

    public function gc(int $maxLifetime): int|false
    {
        $count = 0;
        $files = glob($this->savePath . '/session-*.json');
        
        foreach ($files as $file) {
            if (filemtime($file) < time() - $maxLifetime) {
                @unlink($file);
                $count++;
            }
        }
        
        return $count;
    }

    private function getSessionFilePath(string $sessionId): string
    {
        if ($this->currentUsername) {
            return $this->savePath . '/session-' . $this->currentUsername . '.json';
        }
        
        $userFile = $this->findUserSessionFile($sessionId);
        if ($userFile) {
            return $userFile;
        }
        
        return $this->savePath . '/session-' . $sessionId . '.json';
    }

    private function findUserSessionFile(string $sessionId): ?string
    {
        $files = glob($this->savePath . '/session-*.json');
        
        foreach ($files as $file) {
            $content = file_get_contents($file);
            $data = json_decode($content, true);
            
            if ($data && isset($data['session_id']) && $data['session_id'] === $sessionId) {
                if (isset($data['username'])) {
                    $this->currentUsername = $data['username'];
                }
                return $file;
            }
        }
        
        return null;
    }

    private function parseSessionData(string $sessionData): array
    {
        $result = [];
        
        if (empty($sessionData)) {
            return $result;
        }
        
        $offset = 0;
        $length = strlen($sessionData);
        
        while ($offset < $length) {
            $pipePos = strpos($sessionData, '|', $offset);
            if ($pipePos === false) {
                break;
            }
            
            $varName = substr($sessionData, $offset, $pipePos - $offset);
            $offset = $pipePos + 1;
            
            $data = @unserialize(substr($sessionData, $offset));
            if ($data !== false) {
                $result[$varName] = $data;
                $offset += strlen(serialize($data));
            } else {
                break;
            }
        }
        
        return $result;
    }
}
