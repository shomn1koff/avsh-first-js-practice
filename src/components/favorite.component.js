import { Component } from '../core/component'
import { apiService } from '../services/api.service'
import { TransformService } from '../services/transform.service'
import { renderPost } from '../templates/post.template'

export class FavoriteComponent extends Component {
    constructor(id, options) {
        super(id)

        this.loader = options.loader
    }

    init() {
        this.$el.addEventListener('click', linkClickHandler.bind(this))
    }

    async onShow() {
        const favorites = JSON.parse(localStorage.getItem('favorites'))
        const html = await renderList(favorites)
        this.$el.insertAdjacentHTML('afterbegin', html)
    }

    onHide() {
        this.$el.innerHTML = ''
    }
}

async function linkClickHandler(event) {
    event.preventDefault()
    if (event.target.classList.contains('js-link')) {
        const postId = event.target.dataset.id
        console.log(postId)
        this.$el.innerHTML = ''
        this.loader.show()
        const post = await apiService.fetchPostById(postId)
        this.loader.hide()
        this.$el.insertAdjacentHTML('afterbegin', renderPost(post, {withButton: false}))
        
    }
}

async function renderList(list = []) {
    const fbData = await apiService.fetchPosts()

    console.log(fbData)

    if (list && list.length) {
        return `
            <ul>
                ${list.map(id => `<li><a href="#" class="js-link" data-id="${id}">${fbData[id].title}</a></li>`).join('')}
            </ul>
        `
    } 
    return `<p class="center">Вы пока ничего не добавили</p>`

}