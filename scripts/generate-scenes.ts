import 'dotenv/config';
import { SCENE_CLIPS } from '../src/services/scenePrompts';
import { getVideoProvider } from '../src/services/videoProvider';
import { PATHS } from '../src/config';
import { mkdirSync, existsSync, writeFileSync } from 'fs';

const args = process.argv.slice(2);
const forceRegenerate = args.includes('--force');

async function generateScenes() {
  console.log('\n🎬 SOLO THERAPY Labor Day Video Generator');
  console.log('='.repeat(50));

  // Create output directory
  mkdirSync(PATHS.generatedClips, { recursive: true });

  // Initialize video provider
  let provider;
  try {
    provider = await getVideoProvider();
  } catch (error) {
    console.error('❌ Failed to initialize video provider:');
    console.error(error);
    process.exit(1);
  }

  console.log(`\n📹 Provider: ${process.env.VIDEO_PROVIDER || 'fal'}`);
  console.log(`📁 Output directory: ${PATHS.generatedClips}`);
  console.log(`🎯 Clips to generate: ${SCENE_CLIPS.length}`);
  console.log('='.repeat(50));

  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;

  for (const clip of SCENE_CLIPS) {
    const outputPath = `${PATHS.generatedClips}/${clip.filename}`;

    // Check if file exists
    if (existsSync(outputPath) && !forceRegenerate) {
      console.log(`⏭️  SKIP: ${clip.id} (${clip.filename})`);
      skipCount++;
      continue;
    }

    console.log(`\n⏳ Processing: ${clip.id}`);
    console.log(`   Prompt: ${clip.prompt.substring(0, 70)}...`);

    try {
      await provider.generateClip(clip.prompt, outputPath, clip.duration);
      console.log(`✅ SUCCESS: ${clip.id}`);
      successCount++;
    } catch (error) {
      console.error(`❌ ERROR: ${clip.id}`);
      console.error(`   ${error instanceof Error ? error.message : String(error)}`);
      errorCount++;
      console.log(`   Composition will show a styled placeholder for ${clip.filename}`);
    }
  }

  // Write manifest of real clips so the composition knows what exists
  const availableClips = SCENE_CLIPS
    .map(clip => clip.filename)
    .filter(filename => existsSync(`${PATHS.generatedClips}/${filename}`));

  const manifest = {
    clips: availableClips,
    hasLogo: existsSync(PATHS.logo),
    hasMusic: existsSync(PATHS.music),
  };
  writeFileSync('src/clip-manifest.json', JSON.stringify(manifest, null, 2) + '\n');
  console.log(`\n📄 Manifest written: ${availableClips.length} real clip(s), logo: ${manifest.hasLogo}, music: ${manifest.hasMusic}`);

  console.log('\n' + '='.repeat(50));
  console.log('📊 Generation Complete');
  console.log(`   ✅ Success: ${successCount}`);
  console.log(`   ⏭️  Skipped: ${skipCount}`);
  console.log(`   ❌ Errors:  ${errorCount}`);
  console.log('='.repeat(50));

  if (errorCount === SCENE_CLIPS.length) {
    console.log(
      '\n⚠️  All clips failed. Using placeholders for composition.'
    );
    console.log(`   Check your API key and top up your FAL balance if needed.`);
  } else if (errorCount > 0) {
    console.log(
      '\n⚠️  Some clips failed. Composition will use placeholders for those.'
    );
  }

  console.log('\n✨ Ready to render! Run: npm run render');
}

generateScenes().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
