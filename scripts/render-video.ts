import { spawnSync } from 'child_process';
import { PATHS, VIDEO_CONFIG } from '../src/config.js';
import { mkdirSync } from 'fs';
import { dirname } from 'path';

async function renderVideo() {
  console.log('\n🎥 SOLO THERAPY Labor Day Video Renderer');
  console.log('='.repeat(50));

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

  const result = spawnSync('npx', [
    'remotion',
    'render',
    'src/index.ts',
    'SoloTherapyLaborDay',
    PATHS.output,
    '--codec',
    'h264',
    '--crf',
    '18',
  ], {
    stdio: 'inherit',
    shell: true,
  });

  if (result.status === 0) {
    console.log('\n✅ Render complete!');
    console.log(`Video saved to: ${PATHS.output}`);
    console.log('='.repeat(50));
  } else {
    console.error('\n❌ Render failed with exit code:', result.status);
    process.exit(result.status || 1);
  }
}

renderVideo().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
