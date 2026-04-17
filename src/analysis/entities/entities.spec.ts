import { Analysis } from './analysis.entity';
import { ImageAnalysis } from './image-analysis.entity';
import { Image } from './images.entity';

describe('Analysis entities smoke', () => {
  it('instantiates analysis entities', () => {
    const analysis = new Analysis();
    analysis.id = 1;

    const image = new Image();
    image.id = 1;
    image.imageUrl = 'https://img/1.png';
    image.fileName = '1.png';

    const imageAnalysis = new ImageAnalysis();
    imageAnalysis.id = 1;
    imageAnalysis.analysis = analysis;
    imageAnalysis.image = image;

    expect(analysis.id).toBe(1);
    expect(image.imageUrl).toContain('https://');
    expect(imageAnalysis.analysis.id).toBe(1);
  });
});
