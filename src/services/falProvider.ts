import { BaseVideoProvider } from './videoProvider';
import { writeFileSync } from 'fs';
import { dirname } from 'path';
import { mkdirSync } from 'fs';

export class FalProvider extends BaseVideoProvider {
  private apiKey: string;

  constructor() {
    super();
    this.apiKey = process.env.FAL_API_KEY || '';
    if (!this.apiKey) {
      throw new Error(
        'FAL_API_KEY environment variable is not set. Get one at https://www.fal.ai/'
      );
    }
  }

  async generateClip(
    prompt: string,
    outputPath: string,
    duration: number = 5
  ): Promise<void> {
    console.log(`[FAL] Generating clip: ${prompt.substring(0, 60)}...`);
    console.log(`[FAL] Duration: ${duration}s, Output: ${outputPath}`);

    // Ensure output directory exists
    const dir = dirname(outputPath);
    mkdirSync(dir, { recursive: true });

    try {
      // Call FAL.ai text-to-video API
      // Using the direct model URL approach
      const modelUrl = 'https://queue.fal.run/fal-ai/luma-dream-machine';

      const response = await fetch(modelUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Key ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          duration,
          aspect_ratio: '9:16',
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`FAL API error: ${response.status} - ${error}`);
      }

      const data = (await response.json()) as {
        video?: { url?: string } | null;
        request_id?: string;
        error?: string;
      };

      if (!data.video?.url) {
        throw new Error(
          `FAL did not return a video URL. Response: ${JSON.stringify(data)}`
        );
      }

      const videoUrl = data.video.url;
      console.log(`[FAL] Video generated, downloading from: ${videoUrl}`);

      // Download video file
      const videoResponse = await fetch(videoUrl);
      if (!videoResponse.ok) {
        throw new Error(`Failed to download video: ${videoResponse.statusText}`);
      }

      const buffer = await videoResponse.arrayBuffer();
      writeFileSync(outputPath, Buffer.from(buffer));

      console.log(`[FAL] ✓ Saved to: ${outputPath}`);
    } catch (error) {
      console.error(`[FAL] Error generating clip:`, error);
      throw error;
    }
  }
}
