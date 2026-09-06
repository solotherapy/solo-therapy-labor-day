import { SceneClip } from '../types.js';

export const SCENE_CLIPS: SceneClip[] = [
  // Scene 1: Opening - The day begins (0:00-0:05)
  {
    id: 'opening-1',
    prompt:
      'Cinematic close-up of hands setting an alarm clock as morning light streams through a window. Warm golden hour sunlight, soft focus, realistic textures, premium commercial film aesthetic, subtle depth of field. 4K quality.',
    filename: 'opening-alarm.mp4',
    duration: 5,
  },

  // Scene 2: Workers preparing - Different professions (0:05-0:12)
  {
    id: 'worker-nurse',
    prompt:
      'A compassionate nurse adjusting her scrubs before morning shift in soft hospital lighting. Warm cinematic lighting, focused expression, professional hospital environment, realistic human details, premium healthcare commercial style. 4K quality.',
    filename: 'worker-nurse.mp4',
    duration: 4,
  },
  {
    id: 'worker-teacher',
    prompt:
      'A dedicated teacher opening classroom door in early morning, warm natural sunlight illuminating empty desks and boards. Cinematic lighting, contemplative mood, warm earth tones, realistic classroom atmosphere. 4K quality.',
    filename: 'worker-teacher.mp4',
    duration: 4,
  },
  {
    id: 'worker-construction',
    prompt:
      'Construction worker adjusting safety helmet at sunrise on a city construction site. Warm golden hour lighting, cinematic depth, professional attire, realistic textures, determined focused expression. 4K quality.',
    filename: 'worker-construction.mp4',
    duration: 4,
  },
  {
    id: 'worker-chef',
    prompt:
      'Professional chef in elegant commercial kitchen before service begins, organizing knife roll and prep station. Warm kitchen lighting, stainless steel and wood details, focused concentration, premium culinary atmosphere. 4K quality.',
    filename: 'worker-chef.mp4',
    duration: 4,
  },

  // Scene 3: Hands working montage (0:12-0:26)
  {
    id: 'hands-farmer',
    prompt:
      'Close-up of farmer\'s hands touching soil and herbs in golden hour light, tending a garden or small farm. Earthy textures, warm lighting, realistic hands working with earth, botanical background, cinematic slow motion feel. 4K quality.',
    filename: 'hands-farmer.mp4',
    duration: 5,
  },
  {
    id: 'hands-firefighter',
    prompt:
      'Firefighter carefully preparing and checking equipment with focused precision. Hands handling tools and gear, professional equipment details, warm station lighting, cinematic documentary style. 4K quality.',
    filename: 'hands-firefighter.mp4',
    duration: 5,
  },
  {
    id: 'hands-hairstylist',
    prompt:
      'Hairstylist\'s hands carefully finishing a client\'s hair in a beautiful salon, with warm studio lighting. Precision hand movements, beautiful hair detail, professional salon environment, warm elegant aesthetic. 4K quality.',
    filename: 'hands-hairstylist.mp4',
    duration: 5,
  },
  {
    id: 'hands-delivery',
    prompt:
      'Delivery worker carrying packages through a city neighborhood, hands carefully handling packages. Natural daytime lighting, urban environment, movement through streets, realistic delivery context. 4K quality.',
    filename: 'hands-delivery.mp4',
    duration: 4,
  },
  {
    id: 'hands-business',
    prompt:
      'Small business owner opening shop door and flipping the "Open" sign at sunrise. Hands on glass door, warm golden hour light, professional shop front, peaceful morning moment. 4K quality.',
    filename: 'hands-business.mp4',
    duration: 4,
  },
  {
    id: 'hands-therapist',
    prompt:
      'Therapist preparing a calming office space with intention, arranging flowers and adjusting lighting. Gentle hands organizing peaceful environment, warm studio lighting, botanical elements, mindful atmosphere. 4K quality.',
    filename: 'hands-therapist.mp4',
    duration: 4,
  },

  // Scene 4: Human moments - Emotional section (0:26-0:35)
  {
    id: 'emotion-smile',
    prompt:
      'Worker genuinely smiling with coworkers after completing a task, natural warm moment. Professional setting, warm lighting, authentic human connection, candid joy, realistic expression. 4K quality.',
    filename: 'emotion-smile.mp4',
    duration: 4,
  },
  {
    id: 'emotion-teacher',
    prompt:
      'Teacher warmly interacting with students, genuine human connection moment. Natural classroom lighting, authentic emotional moment, warm interaction, educational environment, candid authentic feeling. 4K quality.',
    filename: 'emotion-teacher.mp4',
    duration: 4,
  },
  {
    id: 'emotion-care',
    prompt:
      'Healthcare worker pausing after helping someone, quiet moment of reflection and care. Warm professional lighting, peaceful moment, human dignity, compassionate atmosphere, calm professional setting. 4K quality.',
    filename: 'emotion-care.mp4',
    duration: 4,
  },

  // Scene 5: Closing montage - End of day (0:35-0:40)
  {
    id: 'closing-sunset',
    prompt:
      'Workers finishing their day at sunset, walking away from workplace with quiet accomplishment. Golden hour lighting, warm tones, peaceful end of workday moment, multiple workers shown, cinematic composition. 4K quality.',
    filename: 'closing-sunset.mp4',
    duration: 5,
  },
];

export function getClipById(id: string): SceneClip | undefined {
  return SCENE_CLIPS.find(clip => clip.id === id);
}

export function getClipsByScene(
  sceneStart: number,
  sceneEnd: number
): SceneClip[] {
  const totalClips = SCENE_CLIPS.length;
  const startIdx = Math.floor((sceneStart / 45) * totalClips);
  const endIdx = Math.ceil((sceneEnd / 45) * totalClips);
  return SCENE_CLIPS.slice(startIdx, endIdx);
}
