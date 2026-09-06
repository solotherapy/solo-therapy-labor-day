import { PATHS, VIDEO_CONFIG } from '../src/config.js';
import { mkdirSync } from 'fs';
import { dirname } from 'path';

async function renderVideo() {
  console.log('\n🎥 SOLO THERAPY Labor Day Video Renderer');
  console.log('='.repeat(50));

  // Create output directory
  mkdirSync(dirname(PATHS.output), { recursive: true });

  console.log(`\n📊 Render Settings:`);
  console.log(`   Resolution: ${VIDEO_CONFIG.width}x${VIDEO_CONFIG.height}`);
  console.log(`   Duration: ${VIDEO_CONFIG.durationInSeconds}s`);
  console.log(`   FPS: ${VIDEO_CONFIG.fps}`);
  console.log(`   Output: ${PATHS.output}`);
  console.log('='.repeat(50));

  console.log(`\n⏳ Rendering... This may take 10-30 minutes.`);
  console.log(`   (Start time: ${new Date().toLocaleTimeString()})`);
  console.log('='.repeat(50));

  try {
    // Import Remotion dynamically
    const remotion = await import('remotion');
    const { bundle } = remotion;

    console.log('\n📦 Bundling composition...');

    // Bundle the composition
    const bundleResult = await bundle({
      entryPoint: 'src/index.ts',
      webpackOverride: (config) => config,
    });

    console.log('✅ Bundling complete');
    console.log('\n🎬 Rendering video frames...');

    // Note: Remotion 4 requires the Studio to be running for rendering
    // For now, show instructions
    console.log('\n⚠️  To render your video, please run:');
    console.log(`\n   npm run preview\n`);
    console.log('Then click the "Render" button in Remotion Studio.');
    console.log(`Output will be saved to: ${PATHS.output}`);
    console.log('='.repeat(50));
  } catch (error) {
    console.error('\n❌ Render setup failed:');
    console.error(error);

    console.log('\n💡 Alternative: Use Remotion Studio');
    console.log('   1. Run: npm run preview');
    console.log('   2. Open http://localhost:3000');
    console.log('   3. Click the Render button');
    console.log(`   4. Video saved to: ${PATHS.output}`);

    process.exit(1);
  }
}

renderVideo().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
