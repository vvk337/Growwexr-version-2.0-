/**
 * Authoritative Open Graph Image Validator
 * ----------------------------------------
 * IMPORTANT: The image at public/assets/og-growwezy.jpg is the final approved
 * design approved by the website owner (featuring the currency globe motif and
 * official Growwezy branding).
 *
 * This script MUST NOT regenerate, recreate, or overwrite the approved image.
 * Instead, it strictly validates that the authoritative approved image:
 *   1. Exists at public/assets/og-growwezy.jpg
 *   2. Has exact dimensions: 1200 × 630 pixels (1.91:1 aspect ratio)
 *   3. Has format: JPEG
 *   4. Has valid sRGB color profile and data integrity
 *
 * If the image is missing or invalid, it throws a fatal error to halt the build.
 */

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const OG_IMAGE_PATH = path.join(__dirname, '../public/assets/og-growwezy.jpg');

async function validateAuthoritativeOG() {
  console.log('='.repeat(65));
  console.log('GROWWEZY OG ASSET — AUTHORITATIVE VALIDATION');
  console.log('='.repeat(65));

  if (!fs.existsSync(OG_IMAGE_PATH)) {
    console.error(`\n❌ FATAL ERROR: Authoritative OG image NOT FOUND at:\n   ${OG_IMAGE_PATH}`);
    console.error('Do NOT regenerate or overwrite with an old template. Place the approved image file here.');
    process.exit(1);
  }

  const stats = fs.statSync(OG_IMAGE_PATH);
  const metadata = await sharp(OG_IMAGE_PATH).metadata();

  console.log(`✓ File located: public/assets/og-growwezy.jpg`);
  console.log(`✓ File size: ${(stats.size / 1024).toFixed(1)} KB`);
  console.log(`✓ Format: ${metadata.format.toUpperCase()} (${metadata.channels} channels, ${metadata.space})`);
  console.log(`✓ Dimensions: ${metadata.width} × ${metadata.height} px (Aspect ratio: ${(metadata.width / metadata.height).toFixed(3)}:1)`);

  let hasError = false;

  if (metadata.format !== 'jpeg') {
    console.error(`❌ INVALID FORMAT: Expected JPEG, received ${metadata.format}`);
    hasError = true;
  }

  if (metadata.width !== 1200 || metadata.height !== 630) {
    console.error(`❌ INVALID DIMENSIONS: Expected 1200×630, received ${metadata.width}×${metadata.height}`);
    hasError = true;
  }

  if (stats.size < 10000) {
    console.error(`❌ SUSPICIOUS FILE SIZE: File is only ${stats.size} bytes. Image may be corrupted.`);
    hasError = true;
  }

  if (hasError) {
    console.error('\n❌ OG Image validation failed! Build halted.');
    process.exit(1);
  }

  console.log('\n✓ Authoritative approved Growwezy OG image validated successfully.');
  console.log('='.repeat(65));
}

validateAuthoritativeOG().catch(err => {
  console.error('Fatal error during OG validation:', err);
  process.exit(1);
});
