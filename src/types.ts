export interface SceneClip {
  id: string;
  prompt: string;
  filename: string;
  duration: number;
}

export interface VideoGenerationProvider {
  generateClip(prompt: string, outputPath: string, duration?: number): Promise<void>;
}

export interface SceneSequence {
  name: string;
  startFrame: number;
  endFrame: number;
  clips: SceneClip[];
}
