import AppModel from '../models/AppModel';
import AppView from '../views/AppView';


export default class App {
  constructor() {
    this.state = {
      newUrl: '',
      nextPageToken: '',
    };

    this.addEventListeners();
  }

  // слушает клики на кнопку сабмита и клавишу энтер

  addEventListeners() {
    const submit = document.querySelector('.searchsubmit');
    submit.addEventListener('click', () => this.submitFunction());

    const searchline = document.querySelector('.searchline');
    document.body.addEventListener('keydown', (e) => {
      if (e.keyCode === 13 && searchline.value) {
        e.preventDefault();
        this.submitFunction();
      }
    });
  }

  // ожидание пока модель даст данные по запросу и вызов методов отрисовки

  async submitFunction() {
    const searchline = document.querySelector('.searchline');
    const searchValue = encodeURIComponent(searchline.value);
    if (searchValue) {
      this.state.newUrl = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAXdhcX59-cN6sRj_nHOlNvNYllebYdL1U&type=video&part=snippet&maxResults=15&q='.concat(searchValue);
    }
    const model = new AppModel(this.state);
    const clipnames = await model.getClipNames();

    const clippreview = await model.getClipPreview();
    const channeltitle = await model.getChannel();
    const date = await model.getDate();
    const description = await model.getClipDescription();
    const clipid = await model.getClipId();
    const viewnumber = await model.getClipView();

    this.state.nextPageToken = await model.getNextToken();

    const view = new AppView(clipnames, clippreview, channeltitle, date, description,
      clipid, viewnumber);

    view.render();
    this.buttonControls();
  }

  // повторный метод загрузки данных с новым токеном

  async sliderNew() {
    const slider = document.querySelector('.videoContainer');
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - (slider.clientWidth * 2)) {
      const searchline = document.querySelector('.searchline');
      const searchValue = encodeURIComponent(searchline.value);
      this.state.newUrl = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyAXdhcX59-cN6sRj_nHOlNvNYllebYdL1U&type=video&part=snippet&maxResults=15&q='.concat(searchValue, `&pageToken=${this.state.nextPageToken}`);

      const model = new AppModel(this.state);

      const clipnames = await model.getClipNames();
      const clippreview = await model.getClipPreview();
      const channeltitle = await model.getChannel();
      const date = await model.getDate();
      const description = await model.getClipDescription();
      const clipid = await model.getClipId();
      const viewnumber = await model.getClipView();

      this.state.nextPageToken = await model.getNextToken();

      const view = new AppView(clipnames, clippreview, channeltitle, date, description,
        clipid, viewnumber);

      view.renderCard();
    }
  }

  // слайдер и кнопки управления

  buttonControls() {
    const slider = document.querySelector('.videoContainer');
    const prevSlider = document.querySelector('.prevButton');
    const currentButton = document.querySelector('.currentButton');
    const nextSlider = document.querySelector('.nextButton');
    const prevToolType = document.querySelector('.prevToolType');
    const nextToolType = document.querySelector('.nextToolType');
    let count = 1;
    const sliderWidth = window.getComputedStyle(slider).width.slice(0, -2) - 4;

    // кнопки управления и смена текста на тултипах

    nextSlider.addEventListener('click', () => {
      slider.scrollBy(sliderWidth, 0);
      count += 1;
      currentButton.innerHTML = count;
      prevToolType.innerHTML = count - 1;
      nextToolType.innerHTML = count + 1;
    });

    prevSlider.addEventListener('click', () => {
      slider.scrollBy(-sliderWidth, 0);
      count -= 1;
      if (count <= 0) {
        count = 1;
      }
      currentButton.innerHTML = count;
      prevToolType.innerHTML = count - 1;
      if (count === 1) {
        prevToolType.innerHTML = '';
      }
      nextToolType.innerHTML = count + 1;
    });

    // слайдер и смена текста на тултипах

    let isDown = false;
    let startX;

    slider.addEventListener('pointerdown', (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
    });

    slider.addEventListener('mouseleave', () => {
      isDown = false;
    });

    slider.addEventListener('pointerup', (e) => {
      isDown = false;

      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;

      if (walk < 0) {
        count += 1;
        currentButton.innerHTML = count;
        prevToolType.innerHTML = count - 1;
        nextToolType.innerHTML = count + 1;
      }

      if (walk > 0) {
        count -= 1;
        if (count <= 0) {
          count = 1;
        }
        currentButton.innerHTML = count;
        prevToolType.innerHTML = count - 1;
        if (count === 1) {
          prevToolType.innerHTML = '';
        }
        nextToolType.innerHTML = count + 1;
      }
    });

    slider.addEventListener('pointermove', (e) => {
      if (!isDown) return; // stop the fn from running
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;

      if (walk < 0) {
        slider.scrollBy(sliderWidth, 0);
      }

      if (walk > 0) {
        slider.scrollBy(-sliderWidth, 0);
      }
    });

    // показ тултипов по наведению мыши на prev и next кнопки

    prevSlider.addEventListener('mouseenter', () => {
      prevToolType.classList.add('activeToolType');
    });

    prevSlider.addEventListener('mouseleave', () => {
      prevToolType.classList.remove('activeToolType');
    });

    nextSlider.addEventListener('mouseenter', () => {
      nextToolType.classList.add('activeToolType');
    });

    nextSlider.addEventListener('mouseleave', () => {
      nextToolType.classList.remove('activeToolType');
    });

    // вызов нового запроса к апи

    slider.addEventListener('pointerup', () => this.sliderNew());
    nextSlider.addEventListener('click', () => this.sliderNew());
  }
}
