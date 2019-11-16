// подключение Font Awesome

const fontAwesome = document.createElement('link');
fontAwesome.type = 'text/css';
fontAwesome.rel = 'stylesheet';
fontAwesome.href = 'https://use.fontawesome.com/releases/v5.8.2/css/all.css';
fontAwesome.integrity = 'sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay';
fontAwesome.crossOrigin = 'anonymous';
document.head.appendChild(fontAwesome);

// viewport

const viewport = document.createElement('meta');
viewport.name = 'viewport';
viewport.content = 'width=device-width, initial-scale=1.0';
document.head.appendChild(viewport);

// строка поиска

const searchdiv = document.createElement('div');
searchdiv.className = 'searchdiv';
document.body.appendChild(searchdiv);

const searchlineform = document.createElement('form');
searchlineform.className = 'searchline-form';
searchdiv.appendChild(searchlineform);

const searchline = document.createElement('input');
searchline.className = 'searchline';
searchline.id = 'searchline';
searchline.setAttribute('type', 'search');
searchline.setAttribute('size', '22');
searchline.setAttribute('placeholder', 'What would you like to find?');
searchline.setAttribute('autocomplete', 'off');
searchline.setAttribute('required', '');
searchlineform.appendChild(searchline);

const searchsubmit = document.createElement('input');
searchsubmit.className = 'searchsubmit';
searchsubmit.id = 'searchsubmit';
searchsubmit.setAttribute('type', 'button');
searchsubmit.setAttribute('value', 'Search!');
searchlineform.appendChild(searchsubmit);


export default class AppView {
  constructor(titles, previews, channels, dates, descriptions, clipids, clipviews) {
    this.titles = titles;
    this.previews = previews;
    this.channels = channels;
    this.dates = dates;
    this.descriptions = descriptions;
    this.clipids = clipids;
    this.clipviews = clipviews;
  }

  // рендерит контейнер без карточек

  render() {
    if (document.querySelector('.videoContainer')) {
      document.body.removeChild(document.querySelector('.videoContainer'));
    }

    const videoContainer = document.createElement('div');
    videoContainer.className = 'videoContainer';
    document.body.appendChild(videoContainer);

    this.renderCard();
    AppView.renderscroll();
  }

  // рендерит кнопки управления и тултипы

  static renderscroll() {
    if (document.querySelector('.scrollContainer')) {
      document.body.removeChild(document.querySelector('.scrollContainer'));
    }

    const scrollContainer = document.createElement('div');
    scrollContainer.className = 'scrollContainer';
    document.body.appendChild(scrollContainer);

    const prevButton = document.createElement('button');
    prevButton.className = 'prevButton';
    prevButton.innerHTML = '⠀';
    scrollContainer.appendChild(prevButton);

    const currentButton = document.createElement('button');
    currentButton.className = 'currentButton';
    currentButton.innerHTML = 1;
    scrollContainer.appendChild(currentButton);

    const nextButton = document.createElement('button');
    nextButton.className = 'nextButton';
    nextButton.innerHTML = '⠀';
    scrollContainer.appendChild(nextButton);

    const prevToolType = document.createElement('button');
    prevToolType.className = 'prevToolType';
    prevToolType.innerHTML = '⠀';
    scrollContainer.appendChild(prevToolType);

    const nextToolType = document.createElement('button');
    nextToolType.className = 'nextToolType';
    nextToolType.innerHTML = '2';
    scrollContainer.appendChild(nextToolType);
  }

  // рендерит карточки в контейнере

  renderCard() {
    for (let i = 0; i < 15; i += 1) {
      const videoContainer = document.querySelector('.videoContainer');

      const singleVideo = document.createElement('div');
      singleVideo.className = 'singleVideo';
      videoContainer.appendChild(singleVideo);

      const videoUrl = document.createElement('a');
      videoUrl.className = 'videoUrl';
      videoUrl.innerHTML = this.titles.map(title => `${title}`)[i];
      videoUrl.setAttribute('href', this.clipids.map(videoid => `https://www.youtube.com/watch?v=${videoid}`)[i]);
      videoUrl.setAttribute('target', '_blank');
      singleVideo.appendChild(videoUrl);

      const videoPreview = document.createElement('img');
      videoPreview.className = 'videoPreview';
      videoPreview.src = this.previews.map(preview => `${preview}`)[i];
      singleVideo.appendChild(videoPreview);

      const videoChannel = document.createElement('p');
      videoChannel.className = 'videoChannel';
      videoChannel.innerHTML = this.channels.map(channel => `<i class="fa fa-tv"></i> ${channel}`)[i];
      singleVideo.appendChild(videoChannel);

      const videoDate = document.createElement('p');
      videoDate.className = 'videoDate';
      videoDate.innerHTML = this.dates.map(date => `<i class="fa fa-calendar-alt"></i> ${date}`)[i];
      singleVideo.appendChild(videoDate);

      const videoView = document.createElement('p');
      videoView.className = 'videoView';
      videoView.innerHTML = this.clipviews.map(clipview => `<i class="fa fa-eye"></i> ${clipview}`)[i];
      singleVideo.appendChild(videoView);

      const videoDescription = document.createElement('p');
      videoDescription.className = 'videoDescription';
      videoDescription.innerHTML = this.descriptions.map(description => `${description}`)[i];
      singleVideo.appendChild(videoDescription);
    }
  }
}
