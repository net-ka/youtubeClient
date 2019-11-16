import AppView from './AppView';

describe('AppView.prototype.renderCard', () => {
  it('Should be an instance of Function', () => {
    expect(AppView.prototype.renderCard).toBeInstanceOf(Function);
  });
});

describe('AppView.prototype.render', () => {
  it('Should be an instance of Function', () => {
    expect(AppView.prototype.render).toBeInstanceOf(Function);
  });
});

describe('AppView.renderscroll', () => {
  it('Should be an instance of Function', () => {
    expect(AppView.renderscroll).toBeInstanceOf(Function);
  });
});

describe('AppView constructor', () => {
  it('Constructor works', () => {
    const obj = new AppView(1, 2, 3, 4, 5, 6, 7);
    expect(obj.titles).toBe(1);
    expect(obj.previews).toBe(2);
    expect(obj.channels).toBe(3);
    expect(obj.dates).toBe(4);
    expect(obj.descriptions).toBe(5);
    expect(obj.clipids).toBe(6);
    expect(obj.clipviews).toBe(7);
  });
});
