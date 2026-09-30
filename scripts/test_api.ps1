$body = @{
  name = "Test User"
  email = "test@example.com"
  subject = "Test API"
  message = "Hello world"
  type = "contact"
} | ConvertTo-Json

try {
  $resp = Invoke-WebRequest -Uri 'http://localhost:3000/api/enquiries' -Method POST -Body $body -ContentType 'application/json' -UseBasicParsing
  Write-Host "StatusCode: $($resp.StatusCode)"
  Write-Host "Response: $($resp.Content)"
} catch {
  Write-Host "Error: $($_.Exception.Message)"
}
