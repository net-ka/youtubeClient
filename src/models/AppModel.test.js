import AppModel from './AppModel';

describe('AppModel.prototype async methods', () => {
  it('Should be an instance of Function', () => {
    expect(AppModel.prototype.getClipNames).toBeInstanceOf(Function);
    expect(AppModel.prototype.getClipPreview).toBeInstanceOf(Function);
    expect(AppModel.prototype.getClipDescription).toBeInstanceOf(Function);
    expect(AppModel.prototype.getChannel).toBeInstanceOf(Function);
    expect(AppModel.prototype.getDate).toBeInstanceOf(Function);
    expect(AppModel.prototype.getClipId).toBeInstanceOf(Function);
    expect(AppModel.prototype.getNextToken).toBeInstanceOf(Function);
    expect(AppModel.prototype.getClipView).toBeInstanceOf(Function);
  });
});

describe('AppModel.extractClipNames', () => {
  it('Should be an instance of Function', () => {
    expect(AppModel.extractClipNames).toBeInstanceOf(Function);
  });

  it('Should return array of string that contains clip titles', () => {
    const data = {
      items: [
        {
          snippet: {
            title: 'title 1',
          },
        },
        {
          snippet: {
            title: 'title 2',
          },
        },
        {
          snippet: {
            title: 'title 3',
          },
        },
      ],
    };

    const result = AppModel.extractClipNames(data);

    expect(result).toEqual(['title 1', 'title 2', 'title 3']);
  });
});

describe('AppModel.extractClipPreview', () => {
  it('Should be an instance of Function', () => {
    expect(AppModel.extractClipPreview).toBeInstanceOf(Function);
  });

  it('Should return array of string that contains clip preview', () => {
    const data = {
      items: [
        {
          snippet: {
            thumbnails: {
              medium: {
                url: 'image 1',
              },
            },
          },
        },
        {
          snippet: {
            thumbnails: {
              medium: {
                url: 'image 2',
              },
            },
          },
        },
        {
          snippet: {
            thumbnails: {
              medium: {
                url: 'image 3',
              },
            },
          },
        },
      ],
    };

    const result = AppModel.extractClipPreview(data);

    expect(result).toEqual(['image 1', 'image 2', 'image 3']);
  });
});

describe('AppModel.extractClipDescription', () => {
  it('Should be an instance of Function', () => {
    expect(AppModel.extractClipDescription).toBeInstanceOf(Function);
  });

  it('Should return array of string that contains clip descriptions', () => {
    const data = {
      items: [
        {
          snippet: {
            description: 'descr 1',
          },
        },
        {
          snippet: {
            description: 'descr 2',
          },
        },
        {
          snippet: {
            description: 'descr 3',
          },
        },
      ],
    };

    const result = AppModel.extractClipDescription(data);

    expect(result).toEqual(['descr 1', 'descr 2', 'descr 3']);
  });
});

describe('AppModel.extractChannel', () => {
  it('Should be an instance of Function', () => {
    expect(AppModel.extractChannel).toBeInstanceOf(Function);
  });

  it('Should return array of string that contains clip channel', () => {
    const data = {
      items: [
        {
          snippet: {
            channelTitle: 'channel 1',
          },
        },
        {
          snippet: {
            channelTitle: 'channel 2',
          },
        },
        {
          snippet: {
            channelTitle: 'channel 3',
          },
        },
      ],
    };

    const result = AppModel.extractChannel(data);

    expect(result).toEqual(['channel 1', 'channel 2', 'channel 3']);
  });
});

describe('AppModel.extractDate', () => {
  it('Should be an instance of Function', () => {
    expect(AppModel.extractDate).toBeInstanceOf(Function);
  });

  it('Should return array of string that contains clip date', () => {
    const data = {
      items: [
        {
          snippet: {
            publishedAt: 'date 1',
          },
        },
        {
          snippet: {
            publishedAt: 'date 2',
          },
        },
        {
          snippet: {
            publishedAt: 'date 3',
          },
        },
      ],
    };

    const result = AppModel.extractDate(data);

    expect(result).toEqual(['date 1', 'date 2', 'date 3']);
  });
});

describe('AppModel.extractClipId', () => {
  it('Should be an instance of Function', () => {
    expect(AppModel.extractClipId).toBeInstanceOf(Function);
  });

  it('Should return array of string that contains clip id', () => {
    const data = {
      items: [
        {
          id: {
            videoId: 'id 1',
          },
        },
        {
          id: {
            videoId: 'id 2',
          },
        },
        {
          id: {
            videoId: 'id 3',
          },
        },
      ],
    };

    const result = AppModel.extractClipId(data);

    expect(result).toEqual(['id 1', 'id 2', 'id 3']);
  });
});

describe('AppModel.nextToken', () => {
  it('Should be an instance of Function', () => {
    expect(AppModel.nextToken).toBeInstanceOf(Function);
  });

  it('Should return array of string that contains clip next page token', () => {
    const data = {
      nextPageToken: 'next token',
    };

    const result = AppModel.nextToken(data);

    expect(result).toEqual('next token');
  });
});

describe('AppModel.extractClipView', () => {
  it('Should be an instance of Function', () => {
    expect(AppModel.extractClipView).toBeInstanceOf(Function);
  });

  it('Should return array of string that contains clip views', () => {
    const data = {
      items: [
        {
          statistics: {
            viewCount: 'views 1',
          },
        },
        {
          statistics: {
            viewCount: 'views 2',
          },
        },
        {
          statistics: {
            viewCount: 'views 3',
          },
        },
      ],
    };

    const result = AppModel.extractClipView(data);

    expect(result).toEqual(['views 1', 'views 2', 'views 3']);
  });
});
