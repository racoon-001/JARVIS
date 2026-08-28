Add-Type -AssemblyName System.Speech

$recognizer = New-Object System.Speech.Recognition.SpeechRecognitionEngine

# Use the default Windows microphone
$recognizer.SetInputToDefaultAudioDevice()

# Load English dictation
$grammar = New-Object System.Speech.Recognition.DictationGrammar
$recognizer.LoadGrammar($grammar)

Write-Host "JARVIS: Listening, ma'am..."

try {
    $result = $recognizer.Recognize()

    if ($result -ne $null) {
        Write-Host "You said: $($result.Text)"
    }
    else {
        Write-Host "JARVIS: I didn't hear anything."
    }
}
catch {
    Write-Host "JARVIS Speech Error: $($_.Exception.Message)"
}
finally {
    $recognizer.Dispose()
}