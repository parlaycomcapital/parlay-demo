#!/usr/bin/env node

/**
 * Asset Optimization Script for Parlay Alpha
 * Optimizes logo assets by trimming transparent padding and converting to WebP
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const ASSETS_DIR = join(process.cwd(), 'public', 'assets', 'brand');
const OUTPUT_DIR = join(process.cwd(), 'public', 'assets', 'brand', 'optimized');

// Ensure output directory exists
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function optimizeLogo(inputPath, name) {
  console.log(`\n📸 Optimizing ${name}...`);

  try {
    // Read the image metadata
    const metadata = await sharp(inputPath).metadata();
    console.log(`   Original size: ${metadata.width}x${metadata.height}px`);

    // Trim transparent padding
    const trimmed = await sharp(inputPath)
      .trim({ threshold: 1 })
      .toBuffer({ resolveWithObject: true });

    console.log(`   Trimmed size: ${trimmed.info.width}x${trimmed.info.height}px`);

    // Generate different sizes for responsive loading
    const sizes = [
      { name: '1x', size: 128 },
      { name: '2x', size: 256 },
      { name: '3x', size: 512 },
    ];

    for (const { name: sizeName, size } of sizes) {
      const outputPath = join(OUTPUT_DIR, `${name}@${sizeName}.webp`);
      
      await sharp(trimmed.data)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }, // Transparent background
        })
        .webp({ 
          quality: 90,
          effort: 6,
        })
        .toFile(outputPath);

      const fileStat = await stat(outputPath);
      const fileSizeKB = (fileStat.size / 1024).toFixed(2);
      console.log(`   ✓ Created ${name}@${sizeName}.webp (${size}x${size}px, ${fileSizeKB}KB)`);
    }

    // Also create a transparent version for hero/sidebar
    if (name.includes('transparent') || name.includes('logotrans')) {
      const heroPath = join(OUTPUT_DIR, `${name}@hero.webp`);
      await sharp(trimmed.data)
        .resize(512, 512, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .webp({ 
          quality: 90,
          effort: 6,
        })
        .toFile(heroPath);

      const heroStat = await stat(heroPath);
      const heroSizeKB = (heroStat.size / 1024).toFixed(2);
      console.log(`   ✓ Created ${name}@hero.webp (512x512px, ${heroSizeKB}KB)`);
    }

    return true;
  } catch (error) {
    console.error(`   ✗ Error optimizing ${name}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Starting asset optimization...\n');

  try {
    // Check if sharp is available
    try {
      await sharp(join(ASSETS_DIR, 'logo-solid.png')).metadata();
    } catch (error) {
      console.error('❌ Sharp is not installed. Installing...');
      console.log('   Run: npm install --save-dev sharp');
      process.exit(1);
    }

    // Find all PNG files in the brand directory
    const files = await readdir(ASSETS_DIR);
    const pngFiles = files.filter(file => file.endsWith('.png'));

    if (pngFiles.length === 0) {
      console.log('⚠️  No PNG files found in assets/brand directory');
      return;
    }

    console.log(`Found ${pngFiles.length} PNG file(s) to optimize\n`);

    let successCount = 0;
    for (const file of pngFiles) {
      const inputPath = join(ASSETS_DIR, file);
      const name = file.replace('.png', '');
      const optimized = await optimizeLogo(inputPath, name);
      if (optimized) successCount++;
    }

    console.log(`\n✅ Optimization complete! ${successCount}/${pngFiles.length} files optimized.`);
    console.log(`\n📁 Optimized assets saved to: ${OUTPUT_DIR}`);
    console.log('\n💡 Next steps:');
    console.log('   1. Update Logo component to use optimized WebP images');
    console.log('   2. Update next.config.ts for image optimization');
    console.log('   3. Test logo clarity at different zoom levels');

  } catch (error) {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  }
}

main();
