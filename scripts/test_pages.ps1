try {
  $resp = Invoke-WebRequest -Uri 'http://localhost:3000/' -UseBasicParsing
  Write-Host "/ StatusCode: $($resp.StatusCode)"
} catch { Write-Host "/ Error: $($_.Exception.Message)" }

try {
  $resp = Invoke-WebRequest -Uri 'http://localhost:3000/events/sufi-mehfil-pune' -UseBasicParsing
  Write-Host "/events/[slug] StatusCode: $($resp.StatusCode)"
} catch { Write-Host "/events/[slug] Error: $($_.Exception.Message)" }

try {
  $resp = Invoke-WebRequest -Uri 'http://localhost:3000/artists/arjun-sharma' -UseBasicParsing
  Write-Host "/artists/[slug] StatusCode: $($resp.StatusCode)"
} catch { Write-Host "/artists/[slug] Error: $($_.Exception.Message)" }
