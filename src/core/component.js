export class Component {
    constructor(id) { //корневой блок компонента
        this.$el = document.getElementById(id) //самый быстрый в жс по получению компонентовв
        this.init()
    }

    init() {//будет вызван после того, как компонент будет проинициализирован, когда будет доступен ел
    }

    onShow() {

    }

    onHide() {

    }

    hide() {
        this.$el.classList.add('hide')
        this.onHide()
    }

    show() {
        this.$el.classList.remove('hide')
        this.onShow()
    }
}