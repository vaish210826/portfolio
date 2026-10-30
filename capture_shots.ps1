$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
$outDir = "c:\Users\vaish\portfolio\screenshots"
$baseUrl = "http://127.0.0.1:5500/index.html"

$shots = @(
    @{ Name = "01-desktop-hero.png"; Url = "$baseUrl?theme=light&instant=true"; Size = "1280,850" },
    @{ Name = "02-projects-filtering.png"; Url = "$baseUrl?theme=light&instant=true&focus=projects&category=frontend"; Size = "1280,880" },
    @{ Name = "03-projects-search.png"; Url = "$baseUrl?theme=light&instant=true&focus=projects&search=React"; Size = "1280,880" },
    @{ Name = "04-projects-empty-state.png"; Url = "$baseUrl?theme=light&instant=true&focus=projects&search=nonexistentquery"; Size = "1280,880" },
    @{ Name = "05-project-modal.png"; Url = "$baseUrl?theme=light&instant=true&modal=examace"; Size = "1280,920" },
    @{ Name = "06-contact-validation.png"; Url = "$baseUrl?theme=light&instant=true&focus=contact&form=error"; Size = "1280,950" },
    @{ Name = "07-contact-success.png"; Url = "$baseUrl?theme=light&instant=true&focus=contact&form=success"; Size = "1280,880" },
    @{ Name = "08-mobile-view.png"; Url = "$baseUrl?theme=light&instant=true"; Size = "390,844" },
    @{ Name = "09-dark-mode.png"; Url = "$baseUrl?theme=dark&instant=true&focus=projects&category=backend"; Size = "1280,880" }
)

foreach ($s in $shots) {
    $outFile = Join-Path $outDir $s.Name
    Write-Host "Capturing $($s.Name)..."
    Start-Process -FilePath $chrome -ArgumentList @(
        "--headless=new",
        "--disable-gpu",
        "--window-size=$($s.Size)",
        "--screenshot=$outFile",
        $s.Url
    ) -Wait
    Start-Sleep -Milliseconds 300
}

Write-Host "All screenshots captured successfully!"
