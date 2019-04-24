@echo Installing Editor...


@set PWS=powershell.exe -ExecutionPolicy Bypass -NoLogo -NonInteractive -NoProfile


@set TARGET='node.exe'
@set WORKDIR='%AppData%\npm\node_modules\mdne'
@set ICON='%AppData%\npm\node_modules\mdne\app.ico'
@set ARGS='--experimental-modules --no-warnings index.mjs'
@set SHORTCUT='%HomeDrive%%HomePath%\Desktop\MDNE.lnk'
%PWS% -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut(%SHORTCUT%); $S.TargetPath = %TARGET%; $s.Arguments = %ARGS%; $s.WorkingDirectory = %WORKDIR%; $s.IconLocation = %ICON%; $S.WindowStyle = 7; $S.Save()"


@set TARGET='node.exe'
@set WORKDIR='%AppData%\npm\node_modules\mdne'
@set ICON='%AppData%\npm\node_modules\mdne\app.ico'
@set ARGS='--experimental-modules --no-warnings index.mjs'
@set SHORTCUT='%AppData%\Microsoft\Windows\SendTo\MDNE.lnk'
%PWS% -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut(%SHORTCUT%); $S.TargetPath = %TARGET%; $s.Arguments = %ARGS%; $s.WorkingDirectory = %WORKDIR%; $s.IconLocation = %ICON%; $S.WindowStyle = 7; $S.Save()"


@pause