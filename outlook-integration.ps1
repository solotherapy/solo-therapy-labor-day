param(
    [string]$Action,
    [string]$To,
    [string]$Subject,
    [string]$Body,
    [int]$Count = 10,
    [int]$Days = 7
)

# Outlook Integration Script for Claude
# Requires: Outlook installed on Windows

# Initialize Outlook COM object
function Get-OutlookConnection {
    try {
        $outlook = New-Object -ComObject Outlook.Application
        return $outlook
    } catch {
        Write-Error "Failed to connect to Outlook. Make sure Outlook is installed and not running in safe mode."
        exit 1
    }
}

# Read recent emails from Inbox
function Get-RecentEmails {
    param([int]$Count = 10)

    $outlook = Get-OutlookConnection
    $namespace = $outlook.GetNamespace("MAPI")
    $inbox = $namespace.GetDefaultFolder(6)  # 6 = olFolderInbox

    $emails = @()
    $items = $inbox.Items
    $items.Sort("[ReceivedTime]", $false)  # Sort by received time, descending

    for ($i = 1; $i -le [math]::Min($Count, $items.Count); $i++) {
        $item = $items.Item($i)
        if ($item.Class -eq 43) {  # 43 = olMail
            $emails += [PSCustomObject]@{
                From      = $item.SenderName
                Subject   = $item.Subject
                Date      = $item.ReceivedTime
                Body      = $item.Body.Substring(0, [math]::Min(500, $item.Body.Length))
                HasAttachment = $item.HasAttachments
            }
        }
    }

    return $emails | ConvertTo-Json
}

# Send an email
function Send-OutlookEmail {
    param(
        [string]$To,
        [string]$Subject,
        [string]$Body,
        [string[]]$CC = @(),
        [string[]]$BCC = @()
    )

    $outlook = Get-OutlookConnection
    $mail = $outlook.CreateItem(0)  # 0 = olMailItem

    $mail.To = $To
    $mail.Subject = $Subject
    $mail.Body = $Body

    if ($CC.Count -gt 0) {
        $mail.CC = ($CC -join ";")
    }
    if ($BCC.Count -gt 0) {
        $mail.BCC = ($BCC -join ";")
    }

    $mail.Send()

    return "Email sent successfully to $To"
}

# Get calendar events
function Get-CalendarEvents {
    param([int]$Days = 7)

    $outlook = Get-OutlookConnection
    $namespace = $outlook.GetNamespace("MAPI")
    $calendar = $namespace.GetDefaultFolder(9)  # 9 = olFolderCalendar

    $events = @()
    $startDate = Get-Date
    $endDate = $startDate.AddDays($Days)

    $items = $calendar.Items
    $items.Sort("[Start]")

    foreach ($item in $items) {
        if ($item.Class -eq 26 -and $item.Start -ge $startDate -and $item.Start -le $endDate) {  # 26 = olAppointment
            $events += [PSCustomObject]@{
                Subject   = $item.Subject
                Start     = $item.Start
                End       = $item.End
                Location  = $item.Location
                IsAllDay  = $item.AllDayEvent
            }
        }
    }

    return $events | ConvertTo-Json
}

# Get unread email count
function Get-UnreadEmailCount {
    $outlook = Get-OutlookConnection
    $namespace = $outlook.GetNamespace("MAPI")
    $inbox = $namespace.GetDefaultFolder(6)

    return $inbox.UnReadItemCount
}

# Main entry point
switch ($Action) {
    "read-emails" {
        Get-RecentEmails -Count $Count
    }
    "send-email" {
        Send-OutlookEmail -To $To -Subject $Subject -Body $Body
    }
    "calendar" {
        Get-CalendarEvents -Days $Days
    }
    "unread-count" {
        Get-UnreadEmailCount
    }
    default {
        Write-Host "Usage: .\outlook-integration.ps1 -Action [read-emails|send-email|calendar|unread-count] [options]"
        Write-Host ""
        Write-Host "Examples:"
        Write-Host "  .\outlook-integration.ps1 -Action read-emails -Count 5"
        Write-Host "  .\outlook-integration.ps1 -Action send-email -To user@example.com -Subject 'Test' -Body 'Hello'"
        Write-Host "  .\outlook-integration.ps1 -Action calendar -Days 14"
        Write-Host "  .\outlook-integration.ps1 -Action unread-count"
    }
}
