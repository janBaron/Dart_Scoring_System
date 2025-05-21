@echo off
cd /d %~dp0
echo Starte Dart Server...
call npm install
start http://localhost:3000
call node server.js
pause
