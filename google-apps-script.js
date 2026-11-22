/**
 * ==============================================================================
 * GROWWEZY GLOBAL TECH - GOOGLE APPS SCRIPT WEBHOOK (FAST MODE + PHONE AUTO-FIX)
 * Target Spreadsheet ID: 1tzjmFQmWiyTGFdvBsxrSt3GoPLVZvTKpTXQcbkz2I6c
 * ==============================================================================
 * 
 * 1. TO FIX ALL EXISTING #ERROR! CELLS IN YOUR SHEET RIGHT NOW:
 *    - In Apps Script toolbar at the top, select "fixAllPhoneErrorsNow" from the dropdown.
 *    - Click "Run".
 *    - Look at your Google Sheet: All the #ERROR! cells will instantly become clean phone numbers!
 * 
 * 2. TO SAVE FOR FUTURE SUBMISSIONS:
 *    - Click "Deploy" > "Manage deployments" > Edit (pencil) > Version: "New version" > Deploy.
 * ==============================================================================
 */

var SPREADSHEET_ID = "1tzjmFQmWiyTGFdvBsxrSt3GoPLVZvTKpTXQcbkz2I6c";

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "ok",
    mode: "fast",
    message: "Growwezy Leads Webhook is active.",
    spreadsheetId: SPREADSHEET_ID,
    timestamp: Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss 'IST'")
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = ss.getActiveSheet() || ss.getSheets()[0];

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = (e && e.parameter) || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var firstName = data.firstName || "";
    var lastName = data.lastName || "";
    var fullName = data.fullName || (firstName + " " + lastName).trim();
    var email = (data.email || "").toString().trim().toLowerCase();
    var countryCode = (data.countryCode || "").toString().trim();
    var phone = (data.phone || "").toString().trim().replace(/[^0-9]/g, "");
    var fullPhone = (data.fullPhone || (countryCode ? countryCode + " " + phone : phone)).toString().trim();
    var country = data.country || "";
    var city = data.city || "";
    var serviceInterest = data.serviceInterest || "Forex Signals";
    var message = data.message || "";
    var inquiryId = data.inquiryId || ("GW-" + Date.now().toString(36).toUpperCase());

    var istTimestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss 'IST'");
    var source = data.source || "Website Consultation Form";

    // Append row with blank placeholders for phone columns 7, 8, 9
    // This guarantees Google Sheets NEVER parses '+...' as a formula during appendRow
    sheet.appendRow([
      istTimestamp,
      inquiryId,
      firstName,
      lastName,
      fullName,
      email,
      "", // Col 7 (Dial Code) - set below as plain text
      "", // Col 8 (Phone) - set below as plain text
      "", // Col 9 (Full Phone) - set below as plain text
      country,
      city,
      serviceInterest,
      message,
      source
    ]);

    var newRow = sheet.getLastRow();

    // Set Plain Text (@) format BEFORE setting value so Sheets never evaluates '+' as formula
    var dialCell = sheet.getRange(newRow, 7);
    dialCell.setNumberFormat("@");
    dialCell.setValue(countryCode);

    var phoneCell = sheet.getRange(newRow, 8);
    phoneCell.setNumberFormat("@");
    phoneCell.setValue(phone);

    var fullPhoneCell = sheet.getRange(newRow, 9);
    fullPhoneCell.setNumberFormat("@");
    fullPhoneCell.setValue(fullPhone);

    return ContentService.createTextOutput(JSON.stringify({
      status: "ok",
      inquiryId: inquiryId
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * ==============================================================================
 * 1-CLICK FIX FOR ALL EXISTING #ERROR! CELLS IN YOUR SHEET
 * ==============================================================================
 * Select "fixAllPhoneErrorsNow" in the Apps Script top toolbar dropdown and click "Run".
 * It will instantly scan every row in your sheet, clear the formula error,
 * and restore the clean phone number (e.g. "+91 7987426979")!
 */
function fixAllPhoneErrorsNow() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getActiveSheet() || ss.getSheets()[0];
  var lastRow = sheet.getLastRow();
  
  if (lastRow < 2) {
    Logger.log("No data rows found to fix.");
    return;
  }

  // Set number format of columns G, H, I across the entire data range to Plain Text
  sheet.getRange(2, 7, lastRow - 1, 3).setNumberFormat("@");

  for (var r = 2; r <= lastRow; r++) {
    var dialCode = sheet.getRange(r, 7).getDisplayValue() || "+91";
    var phone = sheet.getRange(r, 8).getDisplayValue() || "";

    if (dialCode && !dialCode.startsWith("+")) {
      dialCode = "+" + dialCode;
      sheet.getRange(r, 7).setNumberFormat("@").setValue(dialCode);
    }

    var fullPhone = (dialCode + " " + phone).trim();

    var fullPhoneCell = sheet.getRange(r, 9);
    fullPhoneCell.clear({ contentsOnly: true });
    fullPhoneCell.setNumberFormat("@");
    fullPhoneCell.setValue(fullPhone);
  }

  Logger.log("SUCCESS: All existing phone rows have been restored and formatted as plain text!");
}
