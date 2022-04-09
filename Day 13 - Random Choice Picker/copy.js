const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

textarea.focus()

//main function here: type -> create tags -> select random tag
textarea.addEventListener('keyup', (e) => {
    createTags(e.target.value)

    if(e.key === 'Enter'){
        setTimeout(() => {
            e.target.value = ''
        }, 10);

        randomSelect()
    }
})


//here is the tags creating function
function createTags(input) {
    //we will have an array of tags, we separate them by using split, filter out empty tags and combine them back to an array without white space

    const tags = input.split(',').filter(tag => tag.trim() !== '').map(tag => tag.trim())
    
    //first clear what is already inside in the tagsEl div
    tagsEl.innerHTML = ''
    tags.forEach(tag => {
        const tagEl = document.createElement('span')
        tagEl.classList.add('tag')
        tagEl.innerText = tag
        tagsEl.appendChild(tagEl)
    })
}

//this is the function for randomly selecting a tag
function randomSelect() {
    const times = 30

    //first it shifts though all the created tags
    const interval = setInterval(() => {
        const randomTag = pickRandomTag()

        //below is the visual part
        highlightTag(randomTag)

        //and we have to remove highlighting on other tags
        setTimeout(() => {
            unHighlightTag(randomTag)
        }, 100)
    }, 100);

    //stopping and picking a tag
    setTimeout(() => {
        clearInterval(interval)

        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100)
    }, times * 100);
}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random()*tags.length)]
}

function highlightTag(tag) {
    tag.classList.add('highlight')
}

function unHighlightTag(tag) {
    tag.classList.remove('highlight')
}