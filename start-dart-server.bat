@echo off
cd /d %~dp0
echo Starte Dart Server...
call npm install
start chrome --kiosk http://localhost:3000
call node server.js
pause
