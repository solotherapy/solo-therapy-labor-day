import { renderMedia, selectComposition } from 'remotion';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

async function render() {
  console.log('🎬 Starting render...');
  console.log('This will take 10-30 minutes.');
  console.log('');

  try {
    const composition = await selectComposition({
      serveUrl: 'http://localhost:3000',
      id: 'SoloTherapyLaborDay',
    });

    console.log('Composition loaded. Starting render...');

    await renderMedia({
      composition,
      serveUrl: 'http://localhost:3000',
      outputLocation: path.join(projectRoot, 'out/solo-therapy-labor-day.mp4'),
      codec: 'h264',
      crf: 18,
      pixelFormat: 'yuv420p',
      concurrency: 1,
      verbose: true,
      onProgress: (progress) => {
        const pct = ((progress.rendered / progress.total) * 100).toFixed(1);
        process.stdout.write(`\rProgress: ${pct}% (${progress.rendered}/${progress.total} frames)`);
      },
    });

    console.log('\n✅ Render complete!');
    console.log('Video saved to: out/solo-therapy-labor-day.mp4');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

render();
