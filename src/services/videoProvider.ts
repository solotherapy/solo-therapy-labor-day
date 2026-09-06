import { VideoGenerationProvider } from '../types.js';

export abstract class BaseVideoProvider implements VideoGenerationProvider {
  abstract generateClip(
    prompt: string,
    outputPath: string,
    duration?: number
  ): Promise<void>;
}

export async function getVideoProvider(): Promise<VideoGenerationProvider> {
  const provider = process.env.VIDEO_PROVIDER || 'fal';

  if (provider === 'fal') {
    const { FalProvider } = await import('./falProvider.js');
    return new FalProvider();
  }

  throw new Error(
    `Unknown video provider: ${provider}. Supported: fal`
  );
}
