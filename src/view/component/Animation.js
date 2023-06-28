export default class Animation {
  /**
   * Индекс текущей картинки в массиве imglst
   */
  #currentFrame;
  /**
   * Массив для хранения последовательности картинок анимации.
   */
  #imageList;
  /**
   * Переменная для хранения состояния. Если true - то анимация завершена.
   */
  #isOver;

  /**
   * 
   * @return Возвращает ширину первой картинки в массиве imglst.
   *     Предполагается, что все картинки в массиве имеют одинаковый
   *     размер. Если imglst=null, то возвращается 0.
   */
  get width() {
    if (this.#imageList == null) {
      return 0;
    }
    return this.#imageList[0].width;
  }

  /**
   * 
   * @return Возвращает высоту первой картинки в массиве imglst.
   *     Предполагается, что все картинки в массиве имеют одинаковый
   *     размер. Если imglst=null, то возвращается 0.
   */
  get height() {
    if (this.#imageList == null) {
      return 0;
    }
    return this.#imageList[0].height;
  }

  /**
   * 
   * @return Возвращает индекс (номер) текущей картинки в массиве.
   */
  get currentFrame() {
    return this.#currentFrame;
  }

  /**
   * Конструктор по умолчанию. В текущей версии он пустой.
   */
  constructor() {
  }

  /**
   * Переход к следующей картинке.
   */
  step() {
    this.#currentFrame++;
    if (this.#currentFrame >= this.#imageList.length) {
      this.#currentFrame--;
      this.#isOver = true;
    }
  }

  /**
   * 
   * @return true - если анимация завершена, false - в противном случае.
   */
  get isOver() {
    return this.#isOver;
  }

  /**
   * Устанавливает массив картинок.
   * 
   * @param newimglst
   *      массив с новыми картинками. Внимание! Этот метод не копирует
   *      содержимое переданного массива. А лишь устанавливает ссылку
   *      внутренней переменной на него.
   */
  set imageList(newimglst) {
    this.#imageList = newimglst;
    this.#currentFrame = 0;
    this.#isOver = false;
  }

  /**
   * 
   * @return Возвращает текущую картинку.
   */
  get image() {
    return this.#imageList[this.#currentFrame];
  }

  /**
   * Производит перезапуск анимации
   */
  restart() {
    this.#currentFrame = 0;
    this.#isOver = false;
  }

  /**
   * 
   * @param g
   *      - в него будет производится вся отрисовка
   * @param x
   *      - координата по горизонтали, относительно которой будет
   *      рисоваться изображение
   * @param y
   *      - координата по вертикали, относительно которой будет
   *      рисоваться изображение.
   */
  draw(canvas, x, y) {
    canvas.drawImage(this.image, x, y);
  }
}