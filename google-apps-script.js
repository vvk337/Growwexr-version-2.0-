/**
 * ==============================================================================
 * GROWWEZY ADVISORY - GOOGLE APPS SCRIPT WEBHOOK FOR LEADS
 * ==============================================================================
 * 
 * STEP-BY-STEP SETUP INSTRUCTIONS (Takes ~2 minutes):
 * 
 * 1. Open your Google Drive and create a new Google Sheet (e.g. named "Growwezy Leads").
 * 2. In the top menu, click on "Extensions" > "Apps Script".
 * 3. Delete any default code in Code.gs and PASTE THIS ENTIRE SCRIPT into the editor.
 * 4. Click the "Save" icon (or Ctrl+S).
 * 5. In the top right corner, click "Deploy" > "New deployment".
 * 6. Click the gear icon next to "Select type" and select "Web app".
 * 7. Fill in:
 *    - Description: Growwezy Lead Intake
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (VERY IMPORTANT: must be "Anyone" so the website can submit leads)
 * 8. Click "Deploy" (Google will ask you to authorize permissions, click Advanced > Go to Untitled project).
 * 9. Copy the "Web app URL" (it looks like https://script.google.com/macros/s/AKfycb.../exec).
 * 10. Add that URL to your environment variables:
 *     - In your local `.env`: GOOGLE_SHEETS_WEBHOOK_URL="https://script.google.com/macros/s/..."
 *     - In Vercel Project Settings > Environment Variables: add GOOGLE_SHEETS_WEBHOOK_URL
 * 
 * That's it! Every lead will now automatically append to your Google Sheet in real time.
 * ==============================================================================
 */

function setupHeadersIfBlank(sheet) {
  if (sheet.getLastRow() === 0) {
    var headers = [
      "Timestamp (IST)",
      "Inquiry ID",
      "First Name",
      "Last Name",
      "Full Name",
      "Email Address",
      "Country Dial Code",
      "Phone / WhatsApp",
      "Full Phone",
      "Country of Residence",
      "City",
      "Advisory Scope",
      "Brief Objectives / Message",
      "Submission Source"
    ];

    sheet.appendRow(headers);

    // Style the header row
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0b1836"); // Growwezy Dark Navy
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Arial");
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  try {
    // Wait up to 10 seconds for concurrent writes
    lock.waitLock(10000);

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    setupHeadersIfBlank(sheet);

    var data = {};
    if (e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (err) {
        data = e.parameter || {};
      }
    } else if (e.parameter) {
      data = e.parameter;
    }

    var firstName = data.firstName || "";
    var lastName = data.lastName || "";
    var fullName = data.fullName || (firstName + " " + lastName).trim();
    var email = data.email || "";
    var countryCode = data.countryCode || "";
    var phone = data.phone || "";
    var fullPhone = data.fullPhone || (countryCode ? countryCode + " " + phone : phone).trim();
    var country = data.country || "";
    var city = data.city || "";
    var serviceInterest = data.serviceInterest || "";
    var message = data.message || "";
    var inquiryId = data.inquiryId || ("GW-" + new Date().getTime().toString(36).toUpperCase());

    // Format IST Timestamp
    var istFormattedTime = Utilities.formatDate(
      new Date(),
      "Asia/Kolkata",
      "yyyy-MM-dd HH:mm:ss 'IST'"
    );

    var newRow = [
      istFormattedTime,
      inquiryId,
      firstName,
      lastName,
      fullName,
      email,
      countryCode,
      phone,
      fullPhone,
      country,
      city,
      serviceInterest,
      message,
      data.source || "Website Form"
    ];

    sheet.appendRow(newRow);

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        inquiryId: inquiryId,
        rowNumber: sheet.getLastRow(),
        message: "Lead recorded in Google Sheets successfully."
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "ok",
      service: "Growwezy Lead Intake Webhook",
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
