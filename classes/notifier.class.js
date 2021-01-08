export class Notifier {
  static get _granted() {
    return Notification.permission === 'granted';
  }

  static _create(title, options) {
    return new Notification(title, options);
  }

  static _request() {
    return Notification.requestPermission();
  }

  static show(title, options) {
    if (this._granted) {
      this._create(title, options);
    } else {
      this._request().then((permission) => {
        if (permission === 'granted') {
          this._create(title, options);
        }
      });
    }
  }
}
