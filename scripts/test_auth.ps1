try {
  $resp = Invoke-WebRequest -Uri 'http://localhost:3000/admin/events' -UseBasicParsing -MaximumRedirection 0 -ErrorAction SilentlyContinue
  Write-Host "/admin/events StatusCode: $($resp.StatusCode)"
} catch {
  Write-Host "/admin/events Status: $($_.Exception.Response.StatusCode)"
  Write-Host "/admin/events Redirect Location: $($_.Exception.Response.Headers.Location)"
}

try {
  $resp2 = Invoke-WebRequest -Uri 'http://localhost:3000/admin/login' -UseBasicParsing
  Write-Host "/admin/login StatusCode: $($resp2.StatusCode)"
} catch {
  Write-Host "/admin/login Status: $($_.Exception.Response.StatusCode)"
}
