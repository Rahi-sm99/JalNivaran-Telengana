Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Always use the folder where this VBS script lives (not CurrentDirectory)
strCurDir = fso.GetParentFolderName(WScript.ScriptFullName)

' Check if node_modules exists, if not, attempt to install dependencies
If Not fso.FolderExists(strCurDir & "\node_modules") Then
    Dim result
    result = MsgBox("node_modules not found. Would you like to install dependencies (npm install)?", 4 + 32, "Jal-Nivaran Portal")
    If result = 6 Then ' Yes
        WshShell.Run "cmd /c cd /d """ & strCurDir & """ && npm.cmd install", 1, True
    End If
End If

' Run the development server in a visible command prompt window
WshShell.Run "cmd /c cd /d """ & strCurDir & """ && npm.cmd run dev", 1, False

' Give the server more time to initialize (10 seconds for slower machines)
WScript.Sleep 10000

' Open the web application in the default browser
WshShell.Run "http://localhost:3000"
