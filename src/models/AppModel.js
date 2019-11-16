export default class AppModel {
  constructor(state) {
    this.state = state;
    this.getClipNames();
    this.getClipPreview();
    this.getClipDescription();
    this.getChannel();
    this.getDate();
  }

  // title

  static extractClipNames(data) {
    return data.items.map((clip) => {
      if (clip.snippet.title.length > 60) {
        return clip.snippet.title.substr(0, 60).concat('...');
      }
      return clip.snippet.title;
    });
  }

  async getClipNames() {
    const { newUrl } = this.state;

    const responce = await fetch(newUrl);
    const data = await responce.json();

    return AppModel.extractClipNames(data);
  }

  // preview

  static extractClipPreview(data) {
    return data.items.map(clip => clip.snippet.thumbnails.medium.url);
  }

  async getClipPreview() {
    const { newUrl } = this.state;

    const responce = await fetch(newUrl);
    const data = await responce.json();

    return AppModel.extractClipPreview(data);
  }

  // description

  static extractClipDescription(data) {
    return data.items.map(clip => clip.snippet.description);
  }

  async getClipDescription() {
    const { newUrl } = this.state;

    const responce = await fetch(newUrl);
    const data = await responce.json();

    return AppModel.extractClipDescription(data);
  }

  // channel title

  static extractChannel(data) {
    return data.items.map((clip) => {
      if (clip.snippet.channelTitle.length > 25) {
        return clip.snippet.channelTitle.substr(0, 25).concat('...');
      }
      return clip.snippet.channelTitle;
    });
  }

  async getChannel() {
    const { newUrl } = this.state;

    const responce = await fetch(newUrl);
    const data = await responce.json();

    return AppModel.extractChannel(data);
  }

  // date

  static extractDate(data) {
    return data.items.map(clip => clip.snippet.publishedAt.substr(0, 10));
  }

  async getDate() {
    const { newUrl } = this.state;

    const responce = await fetch(newUrl);
    const data = await responce.json();

    return AppModel.extractDate(data);
  }

  // clip id

  static extractClipId(data) {
    return data.items.map(clip => clip.id.videoId);
  }

  async getClipId() {
    const { newUrl } = this.state;

    const responce = await fetch(newUrl);
    const data = await responce.json();

    return AppModel.extractClipId(data);
  }

  // токены

  static nextToken(data) {
    return data.nextPageToken;
  }

  async getNextToken() {
    const { newUrl } = this.state;

    const responce = await fetch(newUrl);
    const data = await responce.json();

    return AppModel.nextToken(data);
  }

  // просмотры

  static extractClipView(data) {
    return data.items.map(clip => clip.statistics.viewCount);
  }

  async getClipView() {
    const clipId = await this.getClipId();

    const idline = clipId.join(',');
    const idurl = 'https://www.googleapis.com/youtube/v3/videos?key=AIzaSyAXdhcX59-cN6sRj_nHOlNvNYllebYdL1U&id='.concat(idline, '&part=snippet,statistics');

    const responce = await fetch(idurl);
    const data = await responce.json();

    return AppModel.extractClipView(data);
  }
}
